import { ref, computed } from "vue";
import { stickersList, type Sticker } from "@/data/stickers";

const figurinhas = ref<Sticker[]>(JSON.parse(JSON.stringify(stickersList)));
const filtroAtual = ref<"todas" | "coletadas" | "pendentes">("todas");
const termoBusca = ref<string>("");

export function useAlbum() {
  /**
   * Marca uma figurinha como coletada
   */
  const marcarColetada = (id: number): void => {
    const figurinha = figurinhas.value.find((f) => f.id === id);
    if (figurinha) {
      figurinha.coletada = true;
      salvarNoLocalStorage();
    }
  };

  /**
   * Remove figurinha das coletadas
   */
  const removerColetada = (id: number): void => {
    const figurinha = figurinhas.value.find((f) => f.id === id);
    if (figurinha) {
      figurinha.coletada = false;
      salvarNoLocalStorage();
    }
  };

  /**
   * Pesquisa figurinhas por nome ou seleção
   */
  const pesquisar = (termo: string): void => {
    termoBusca.value = termo.toLowerCase();
  };

  /**
   * Filtra figurinhas
   */
  const filtrar = (tipo: "todas" | "coletadas" | "pendentes"): void => {
    filtroAtual.value = tipo;
  };

  /**
   * Calcula o progresso do álbum
   */
  const calcularProgresso = (): {
    total: number;
    coletadas: number;
    pendentes: number;
    percentual: number;
  } => {
    const total = figurinhas.value.length;
    const coletadas = figurinhas.value.filter((f) => f.coletada).length;
    const pendentes = total - coletadas;
    const percentual = Math.round((coletadas / total) * 100);

    return {
      total,
      coletadas,
      pendentes,
      percentual,
    };
  };

  /**
   * Obtém figurinhas filtradas e pesquisadas
   */
  const obterFiguras = computed(() => {
    let resultado = figurinhas.value;

    // Filtro por tipo
    if (filtroAtual.value === "coletadas") {
      resultado = resultado.filter((f) => f.coletada);
    } else if (filtroAtual.value === "pendentes") {
      resultado = resultado.filter((f) => !f.coletada);
    }

    // Busca por termo
    if (termoBusca.value) {
      resultado = resultado.filter(
        (f) =>
          f.nome.toLowerCase().includes(termoBusca.value) ||
          f.selecao.toLowerCase().includes(termoBusca.value)
      );
    }

    return resultado;
  });

  /**
   * Obtém apenas figurinhas coletadas
   */
  const obterColetadas = computed(() => {
    return figurinhas.value.filter((f) => f.coletada);
  });

  /**
   * Alterna o status coletada de uma figurinha
   */
  const alternarColetada = (id: number): void => {
    const figurinha = figurinhas.value.find((f) => f.id === id);
    if (figurinha) {
      figurinha.coletada = !figurinha.coletada;
      salvarNoLocalStorage();
    }
  };

  /**
   * Salva o estado das figurinhas no localStorage
   */
  const salvarNoLocalStorage = (): void => {
    localStorage.setItem("album", JSON.stringify(figurinhas.value));
  };

  /**
   * Carrega o estado das figurinhas do localStorage
   */
  const carregarDoLocalStorage = (): void => {
    const salvo = localStorage.getItem("album");
    if (salvo) {
      figurinhas.value = JSON.parse(salvo);
    }
  };

  /**
   * Reseta o álbum para estado inicial
   */
  const resetarAlbum = (): void => {
    figurinhas.value = JSON.parse(JSON.stringify(stickersList));
    termoBusca.value = "";
    filtroAtual.value = "todas";
    salvarNoLocalStorage();
  };

  return {
    marcarColetada,
    removerColetada,
    pesquisar,
    filtrar,
    calcularProgresso,
    obterFiguras,
    obterColetadas,
    alternarColetada,
    carregarDoLocalStorage,
    resetarAlbum,
    figurinhas,
    filtroAtual,
    termoBusca,
  };
}
