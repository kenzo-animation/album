import { ref } from "vue";

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

const users = ref<User[]>([
  {
    id: 1,
    nome: "Usuário Teste",
    email: "teste@email.com",
    senha: "123456",
  },
]);

const usuarioLogado = ref<User | null>(null);

export function useAuth() {
  /**
   * Realiza login do usuário
   */
  const login = (email: string, senha: string): AuthResponse => {
    const usuario = users.value.find(
      (u) => u.email === email && u.senha === senha
    );

    if (usuario) {
      usuarioLogado.value = usuario;
      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
      return {
        success: true,
        message: "Login realizado com sucesso!",
        user: usuario,
      };
    }

    return {
      success: false,
      message: "E-mail ou senha inválidos",
    };
  };

  /**
   * Realiza logout do usuário
   */
  const logout = (): void => {
    usuarioLogado.value = null;
    localStorage.removeItem("usuarioLogado");
  };

  /**
   * Registra um novo usuário
   */
  const register = (
    nome: string,
    email: string,
    senha: string
  ): AuthResponse => {
    const usuarioExistente = users.value.find((u) => u.email === email);

    if (usuarioExistente) {
      return {
        success: false,
        message: "Este e-mail já está cadastrado",
      };
    }

    if (senha.length < 6) {
      return {
        success: false,
        message: "Senha deve ter no mínimo 6 caracteres",
      };
    }

    const novoUsuario: User = {
      id: users.value.length + 1,
      nome,
      email,
      senha,
    };

    users.value.push(novoUsuario);
    usuarioLogado.value = novoUsuario;
    localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));

    return {
      success: true,
      message: "Cadastro realizado com sucesso!",
      user: novoUsuario,
    };
  };

  /**
   * Recuperação de senha (simulado)
   */
  const resetPassword = (email: string): AuthResponse => {
    const usuario = users.value.find((u) => u.email === email);

    if (usuario) {
      return {
        success: true,
        message: `E-mail de recuperação enviado para ${email}`,
      };
    }

    return {
      success: false,
      message: "E-mail não encontrado no sistema",
    };
  };

  /**
   * Carrega usuário do localStorage ao iniciar
   */
  const carregarUsuarioSalvo = (): void => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    if (usuarioSalvo) {
      usuarioLogado.value = JSON.parse(usuarioSalvo);
    }
  };

  /**
   * Verifica se o usuário está logado
   */
  const estaLogado = (): boolean => {
    return usuarioLogado.value !== null;
  };

  /**
   * Obtém o usuário logado
   */
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
