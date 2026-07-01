import { ref } from "vue";
import { createUser, findUserByEmail, findUserByEmailAndPassword, initDatabase } from "@/service/database";

export interface User {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

const usuarioLogado = ref<User | null>(null);

export function useAuth() {
  const login = async (email: string, senha: string): Promise<AuthResponse> => {
    await initDatabase();
    const usuario = await findUserByEmailAndPassword(email, senha);

    if (usuario) {
      const user: User = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha,
      };
      usuarioLogado.value = user;
      localStorage.setItem("usuarioLogado", JSON.stringify(user));
      return { success: true, message: "Login realizado com sucesso!", user };
    }

    return { success: false, message: "E-mail ou senha inválidos" };
  };

  const logout = (): void => {
    usuarioLogado.value = null;
    localStorage.removeItem("usuarioLogado");
  };

  const register = async (nome: string, email: string, senha: string): Promise<AuthResponse> => {
    await initDatabase();

    if (senha.length < 6) {
      return { success: false, message: "Senha deve ter no mínimo 6 caracteres" };
    }

    const existente = await findUserByEmail(email);
    if (existente) {
      return { success: false, message: "Este e-mail já está cadastrado" };
    }

    const novoUsuario = await createUser({ nome, email, senha });
    const user: User = {
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      senha: novoUsuario.senha,
    };
    usuarioLogado.value = user;
    localStorage.setItem("usuarioLogado", JSON.stringify(user));

    return { success: true, message: "Cadastro realizado com sucesso!", user };
  };

  const resetPassword = async (email: string): Promise<AuthResponse> => {
    await initDatabase();
    const usuario = await findUserByEmail(email);

    if (usuario) {
      return { success: true, message: `E-mail de recuperação enviado para ${email}` };
    }

    return { success: false, message: "E-mail não encontrado no sistema" };
  };

  const carregarUsuarioSalvo = (): void => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    if (usuarioSalvo) {
      usuarioLogado.value = JSON.parse(usuarioSalvo);
    }
  };

  const estaLogado = (): boolean => {
    return usuarioLogado.value !== null;
  };

  const obterUsuarioLogado = (): User | null => {
    return usuarioLogado.value;
  };

  return {
    login,
    logout,
    register,
    resetPassword,
    carregarUsuarioSalvo,
    estaLogado,
    obterUsuarioLogado,
    usuarioLogado,
  };
}
