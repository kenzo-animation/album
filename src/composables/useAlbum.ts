import { ref, computed } from "vue";
import { createOrSeedStickerCollection, getStickersForUser, toggleSticker } from "@/service/database";
import { useAuth } from "@/composables/useAuth";

interface Sticker {
  id: number;
  stickerId: number;
  nome: string;
  selecao: string;
  foto: string;
  coletada: boolean;
  userId: number;
}

const figurinhas = ref<Sticker[]>([]);
const filtroAtual = ref<"todas" | "coletadas" | "pendentes">("todas");
const termoBusca = ref<string>("");

export function useAlbum() {
  const { obterUsuarioLogado } = useAuth();

  const carregarDoBanco = async () => {
    const user = obterUsuarioLogado();
    if (!user) return;

    const rows = await createOrSeedStickerCollection(user.id);
    figurinhas.value = rows.map((row) => ({
      id: row.id,
      stickerId: row.stickerId,
      nome: row.nome,
      selecao: row.selecao,
      foto: row.foto,
      coletada: row.coletada,
      userId: row.userId,
    }));
  };

  const carregarDoLocalStorage = async () => {
    await carregarDoBanco();
  };

  const marcarColetada = async (id: number): Promise<void> => {
    const user = obterUsuarioLogado();
    if (!user) return;
    const figurinha = figurinhas.value.find((f) => f.id === id || f.stickerId === id);
    if (!figurinha) return;
    await toggleSticker(user.id, figurinha.stickerId, true);
    figurinha.coletada = true;
  };

  const removerColetada = async (id: number): Promise<void> => {
    const user = obterUsuarioLogado();
    if (!user) return;
    const figurinha = figurinhas.value.find((f) => f.id === id || f.stickerId === id);
    if (!figurinha) return;
    await toggleSticker(user.id, figurinha.stickerId, false);
    figurinha.coletada = false;
  };

  const pesquisar = (termo: string): void => {
    termoBusca.value = termo.toLowerCase();
  };

  const filtrar = (tipo: "todas" | "coletadas" | "pendentes"): void => {
    filtroAtual.value = tipo;
  };

  const calcularProgresso = (): {
    total: number;
    coletadas: number;
    pendentes: number;
    percentual: number;
  } => {
    const total = figurinhas.value.length;
    const coletadas = figurinhas.value.filter((f) => f.coletada).length;
    const pendentes = total - coletadas;
    const percentual = total === 0 ? 0 : Math.round((coletadas / total) * 100);

    return { total, coletadas, pendentes, percentual };
  };

  const obterFiguras = computed(() => {
    let resultado = figurinhas.value;

    if (filtroAtual.value === "coletadas") {
      resultado = resultado.filter((f) => f.coletada);
    } else if (filtroAtual.value === "pendentes") {
      resultado = resultado.filter((f) => !f.coletada);
    }

    if (termoBusca.value) {
      resultado = resultado.filter(
        (f) => f.nome.toLowerCase().includes(termoBusca.value) || f.selecao.toLowerCase().includes(termoBusca.value)
      );
    }

    return resultado;
  });

  const obterColetadas = computed(() => figurinhas.value.filter((f) => f.coletada));

  const alternarColetada = async (id: number): Promise<void> => {
    const figurinha = figurinhas.value.find((f) => f.id === id || f.stickerId === id);
    if (!figurinha) return;
    await toggleSticker(obterUsuarioLogado()?.id ?? 0, figurinha.stickerId, !figurinha.coletada);
    figurinha.coletada = !figurinha.coletada;
  };

  const resetarAlbum = async (): Promise<void> => {
    const user = obterUsuarioLogado();
    if (!user) return;
    const rows = await createOrSeedStickerCollection(user.id);
    figurinhas.value = rows.map((row) => ({
      id: row.id,
      stickerId: row.stickerId,
      nome: row.nome,
      selecao: row.selecao,
      foto: row.foto,
      coletada: row.coletada,
      userId: row.userId,
    }));
    termoBusca.value = "";
    filtroAtual.value = "todas";
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
