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
  numero?: number; // Número da figurinha no álbum
  stickerId?: number;
  nome: string; // Nome do jogador
  selecao: string; // Seleção (Brasil, Portugal, França, etc)
  foto: string; // URL da imagem
  coletada: boolean; // Se já foi coletada pelo usuário
  userId?: number;
}

/**
 * Array com todas as figurinhas disponíveis
 * Total de 24 figurinhas de diferentes seleções da Copa
 */
export const stickersList: Sticker[] = [
  {
    id: 1,
    numero: 13,
    nome: "Nanami",
    selecao: "Caribe",
    foto: "https://br.pinterest.com/pin/489273947041407205/",
    coletada: false,
  },  
  {
    id: 2,
    numero: 10,
    nome: "Reaper",
    selecao: "Noruega",
    foto: "https://www.google.com/imgres?q=reaper%20overwatc&imgurl=https%3A%2F%2Fstatic.wikia.nocookie.net%2Foverwatch_gamepedia%2Fimages%2Fa%2Fac%2FReaper_Hero.png%2Frevision%2Flatest%2Fscale-to-width-down%2F250%3Fcb%3D20260227153424&imgrefurl=https%3A%2F%2Foverwatch.fandom.com%2Fwiki%2FReaper&docid=-HVFvHfT8oM5mM&tbnid=TU4UvbygxJ0gzM&vet=12ahUKEwjLi_a3x8OVAxW3PbkGHc-WMQkQnPAOegUIigIQAA..i&w=250&h=250&hcb=2&ved=2ahUKEwjLi_a3x8OVAxW3PbkGHc-WMQkQnPAOegUIigIQAA",
    coletada: false,
  },
  {
    id: 3,
    numero: 0,
    nome: "Gojo",
    selecao: "Brasil",
    foto: "https://www.google.com/imgres?q=Gojo&imgurl=https%3A%2F%2Fpreview.redd.it%2Fvery-hot-take-gojo-could-have-revived-himself-but-decided-v0-wajmhzb4uaue1.jpeg%3Fwidth%3D640%26crop%3Dsmart%26auto%3Dwebp%26s%3Da486498a8b674eb60e8c79d369105c5951b964aa&imgrefurl=https%3A%2F%2Fwww.reddit.com%2Fr%2FJujutsufolk%2Fcomments%2F1jx4yee%2Fvery_hot_take_gojo_could_have_revived_himself_but%2F%3Ftl%3Dpt-br&docid=KW65FfWzWag9YM&tbnid=Hmnn4wMuPF7H-M&vet=12ahUKEwjMlLTLx8OVAxVPH7kGHblcOaAQnPAOegUIlAEQAA..i&w=640&h=467&hcb=2&ved=2ahUKEwjMlLTLx8OVAxVPH7kGHblcOaAQnPAOegUIlAEQAA",
    coletada: false,
  },
  {
    id: 4,
    numero: 1,
    nome: "Kris",
    selecao: "EUA",
    foto: "https://www.google.com/imgres?q=kris%20delta%20rune&imgurl=https%3A%2F%2Fstatic.wikia.nocookie.net%2Fdeltarunebrasil%2Fimages%2F3%2F34%2FKris.png%2Frevision%2Flatest%3Fcb%3D20181106233841%26path-prefix%3Dpt-br&imgrefurl=https%3A%2F%2Fdeltarunebrasil.fandom.com%2Fpt-br%2Fwiki%2FKris&docid=MadgiYYy2YMPnM&tbnid=6F6FCWgjVi9SWM&vet=12ahUKEwiAi7DXx8OVAxUzDbkGHSO3LYcQnPAOegQIOxAA..i&w=152&h=296&hcb=2&ved=2ahUKEwiAi7DXx8OVAxUzDbkGHSO3LYcQnPAOegQIOxAA",
    coletada: false,
  },
  {
    id: 5,
    numero: 18,
    nome: "Hoemem de ferro",
    selecao: "Espanha",
    foto: "https://www.google.com/imgres?q=homem%20de%20ferro&imgurl=https%3A%2F%2Fstatic.wikia.nocookie.net%2Funiversocinematograficomarvel%2Fimages%2Fc%2Fcb%2FStark_Ultimato.jpg%2Frevision%2Flatest%2Fscale-to-width%2F360%3Fcb%3D20211230004015%26path-prefix%3Dpt&imgrefurl=https%3A%2F%2Funiversocinematograficomarvel.fandom.com%2Fpt-br%2Fwiki%2FHomem_de_Ferro&docid=KDsPof7Hzv8WoM&tbnid=iRieklkC9Mq7QM&vet=12ahUKEwjg8-7gx8OVAxXHIbkGHYgwKUUQnPAOegQIOBAA..i&w=360&h=508&hcb=2&ved=2ahUKEwjg8-7gx8OVAxXHIbkGHYgwKUUQnPAOegQIOBAA",
    coletada: false,
  },
  {
    id: 6,
    numero: 123,
    nome: "Bacon",
    selecao: "ROBLOX",
    foto: "https://www.google.com/imgres?q=bacon%20roblox&imgurl=https%3A%2F%2Fi.pinimg.com%2F736x%2Fcf%2F78%2Fd9%2Fcf78d92ba18dced32a9be29cb54a0b96.jpg&imgrefurl=https%3A%2F%2Fbr.pinterest.com%2Famandaaaari%2Froblox-bacon-hair%2F&docid=dQp1dhpr6Z_yiM&tbnid=NiAa6zjNgnGXdM&vet=12ahUKEwjohtjsx8OVAxVggGEGHYKrEnEQnPAOegUIpwIQAA..i&w=300&h=300&hcb=2&ved=2ahUKEwjohtjsx8OVAxVggGEGHYKrEnEQnPAOegUIpwIQAA",
    coletada: false,
  },
  {
    id: 7,
    numero: 8,
    nome: "Bachira",
    selecao: "Japão",
    foto: "https://www.google.com/imgres?q=bachira&imgurl=https%3A%2F%2Fovicio.com.br%2Fwp-content%2Fuploads%2F2026%2F01%2F20260127-blue-lock-meguru-bachira-ovicio-555x555.webp&imgrefurl=https%3A%2F%2Fovicio.com.br%2Fblue-lock-revela-visual-de-meguru-bachira-no-filme-em-live-action%2F&docid=NELzLyA2gM9mlM&tbnid=EOtLyN-I2cdcbM&vet=12ahUKEwj8wrL4x8OVAxW6B7kGHUpfJWAQnPAOegUIsAIQAA..i&w=555&h=555&hcb=2&ved=2ahUKEwj8wrL4x8OVAxW6B7kGHUpfJWAQnPAOegUIsAIQAA",
    coletada: false,
  },
];
