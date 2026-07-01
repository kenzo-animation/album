/**
 * stickers.ts - Base de dados de figurinhas da Copa
 * 
 * Contém:
 * - Interface Sticker com estrutura das figurinhas
 * - Array com 24 figurinhas de diferentes seleções da Copa
 * 
 * Cada figurinha possui:
 * - id: identificador único
 * - numero: número da figurinha no álbum
 * - nome: nome do jogador
 * - selecao: seleção que representa
 * - foto: URL da imagem (placeholder)
 * - coletada: boolean indicando se já foi coletada
 */

/**
 * Interface que define a estrutura de uma figurinha
 */
export interface Sticker {
  id: number; // Identificador único
  numero: number; // Número da figurinha no álbum
  nome: string; // Nome do jogador
  selecao: string; // Seleção (Brasil, Portugal, França, etc)
  foto: string; // URL da imagem
  coletada: boolean; // Se já foi coletada pelo usuário
}

/**
 * Array com todas as figurinhas disponíveis
 * Total de 24 figurinhas de diferentes seleções da Copa
 */
export const stickersList: Sticker[] = [
  {
    id: 1,
    numero: 1,
    nome: "Neymar",
    selecao: "Brasil",
    foto: "https://via.placeholder.com/150/yellow/black?text=Neymar",
    coletada: false,
  },
  {
    id: 2,
    numero: 2,
    nome: "Vinicius Jr",
    selecao: "Brasil",
    foto: "https://via.placeholder.com/150/yellow/black?text=Vinicius",
    coletada: false,
  },
  {
    id: 3,
    numero: 3,
    nome: "Alisson",
    selecao: "Brasil",
    foto: "https://via.placeholder.com/150/yellow/black?text=Alisson",
    coletada: false,
  },
  {
    id: 4,
    numero: 4,
    nome: "Cristiano Ronaldo",
    selecao: "Portugal",
    foto: "https://via.placeholder.com/150/red/white?text=Ronaldo",
    coletada: false,
  },
  {
    id: 5,
    numero: 5,
    nome: "Bruno Fernandes",
    selecao: "Portugal",
    foto: "https://via.placeholder.com/150/red/white?text=Bruno",
    coletada: false,
  },
  {
    id: 6,
    numero: 6,
    nome: "Lionel Messi",
    selecao: "Argentina",
    foto: "https://via.placeholder.com/150/cyan/white?text=Messi",
    coletada: false,
  },
  {
    id: 7,
    numero: 7,
    nome: "Angel Di Maria",
    selecao: "Argentina",
    foto: "https://via.placeholder.com/150/cyan/white?text=DiMaria",
    coletada: false,
  },
  {
    id: 8,
    numero: 8,
    nome: "Gonzalo Montiel",
    selecao: "Argentina",
    foto: "https://via.placeholder.com/150/cyan/white?text=Montiel",
    coletada: false,
  },
  {
    id: 9,
    numero: 9,
    nome: "Kylian Mbappé",
    selecao: "França",
    foto: "https://via.placeholder.com/150/blue/white?text=Mbappe",
    coletada: false,
  },
  {
    id: 10,
    numero: 10,
    nome: "Eduardo Camavinga",
    selecao: "França",
    foto: "https://via.placeholder.com/150/blue/white?text=Camavinga",
    coletada: false,
  },
  {
    id: 11,
    numero: 11,
    nome: "Manuel Neuer",
    selecao: "Alemanha",
    foto: "https://via.placeholder.com/150/black/white?text=Neuer",
    coletada: false,
  },
  {
    id: 12,
    numero: 12,
    nome: "Serge Gnabry",
    selecao: "Alemanha",
    foto: "https://via.placeholder.com/150/black/white?text=Gnabry",
    coletada: false,
  },
  {
    id: 13,
    numero: 13,
    nome: "Harry Kane",
    selecao: "Inglaterra",
    foto: "https://via.placeholder.com/150/white/red?text=Kane",
    coletada: false,
  },
  {
    id: 14,
    numero: 14,
    nome: "Declan Rice",
    selecao: "Inglaterra",
    foto: "https://via.placeholder.com/150/white/red?text=Rice",
    coletada: false,
  },
  {
    id: 15,
    numero: 15,
    nome: "Gianluigi Donnarumma",
    selecao: "Itália",
    foto: "https://via.placeholder.com/150/blue/white?text=Donnarumma",
    coletada: false,
  },
  {
    id: 16,
    numero: 16,
    nome: "Federico Chiesa",
    selecao: "Itália",
    foto: "https://via.placeholder.com/150/blue/white?text=Chiesa",
    coletada: false,
  },
  {
    id: 17,
    numero: 17,
    nome: "Sergio Busquets",
    selecao: "Espanha",
    foto: "https://via.placeholder.com/150/red/white?text=Busquets",
    coletada: false,
  },
  {
    id: 18,
    numero: 18,
    nome: "Pedri González",
    selecao: "Espanha",
    foto: "https://via.placeholder.com/150/red/white?text=Pedri",
    coletada: false,
  },
  {
    id: 19,
    numero: 19,
    nome: "Sadio Mané",
    selecao: "Senegal",
    foto: "https://via.placeholder.com/150/green/yellow?text=Mane",
    coletada: false,
  },
  {
    id: 20,
    numero: 20,
    nome: "Mohamed Salah",
    selecao: "Egito",
    foto: "https://via.placeholder.com/150/red/white?text=Salah",
    coletada: false,
  },
  {
    id: 21,
    numero: 21,
    nome: "Lautaro Martínez",
    selecao: "Argentina",
    foto: "https://via.placeholder.com/150/cyan/white?text=Lautaro",
    coletada: false,
  },
  {
    id: 22,
    numero: 22,
    nome: "Rodri Hernández",
    selecao: "Espanha",
    foto: "https://via.placeholder.com/150/red/white?text=Rodri",
    coletada: false,
  },
  {
    id: 23,
    numero: 23,
    nome: "Alphonso Davies",
    selecao: "Canadá",
    foto: "https://via.placeholder.com/150/red/white?text=Davies",
    coletada: false,
  },
  {
    id: 24,
    numero: 24,
    nome: "Richarlison",
    selecao: "Brasil",
    foto: "https://via.placeholder.com/150/yellow/black?text=Richarlison",
    coletada: false,
  },
];
