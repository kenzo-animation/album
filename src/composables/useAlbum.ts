import { ref, computed } from "vue";
import { stickersList, type Sticker } from "@/data/stickers";

const stickers = ref<Sticker[]>([...stickersList]);

const termoPesquisa = ref("");
const filtroAtual = ref("todas");

const obterFiguras = computed(() => {
  return stickers.value.filter((sticker) => {

    // Pesquisa
    const pesquisa =
      sticker.nome.toLowerCase().includes(termoPesquisa.value.toLowerCase()) ||
      sticker.selecao
        .toLowerCase()
        .includes(termoPesquisa.value.toLowerCase());

    if (!pesquisa) return false;

    // Filtros
    switch (filtroAtual.value) {

      case "coletadas":
        return sticker.coletada;

      case "pendentes":
        return !sticker.coletada;

      case "favoritas":
        return sticker.favorito;

      default:
        return true;
    }
  });
});

const pesquisar = (texto: string) => {
  termoPesquisa.value = texto;
};

const filtrar = (tipo: string) => {
  filtroAtual.value = tipo;
};

const alternarColetada = (id: number) => {

  const figurinha = stickers.value.find(s => s.id === id);

  if (figurinha) {
    figurinha.coletada = !figurinha.coletada;
  }

};

const favoritar = (id: number) => {

  const figurinha = stickers.value.find(s => s.id === id);

  if (figurinha) {
    figurinha.favorito = !figurinha.favorito;
  }

};

const totalColetadas = computed(() => {

  return stickers.value.filter(s => s.coletada).length;

});

const progresso = computed(() => {

  return Math.round(
    (totalColetadas.value / stickers.value.length) * 100
  );

});

export function useAlbum() {

  return {

    obterFiguras,

    pesquisar,

    filtrar,

    alternarColetada,

    favoritar,

    totalColetadas,

    progresso,

  };

}