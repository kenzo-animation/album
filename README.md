# Álbum de Figurinhas da Copa do Mundo

## Informações do Projeto

- Kenzo Ruthes dos Santos
- 3º info
- Codificar aplicações para dispositivos móveis
- 3/06/2026

## Objetivo

Desenvolver uma aplicação mobile utilizando **Ionic Framework + Vue 3 + Composition API** que simule um álbum digital de figurinhas da Copa do Mundo, com funcionalidades de autenticação, gerenciamento de coleções e interface moderna e responsiva.

## Tecnologias Utilizadas

- **Framework:** Ionic Framework
- **JavaScript Framework:** Vue 3
- **API:** Composition API
- **Linguagem:** TypeScript
- **Build Tool:** Vite
- **Roteamento:** Vue Router
- **Armazenamento:** LocalStorage (para persistência de dados)
- **Ícones:** Ionicons
- **Gerenciamento de Estado:** Composables (useAuth, useAlbum)

## Características do Projeto

### 1. Autenticação
- ✅ Tela de Login com validação de e-mail e senha
- ✅ Tela de Cadastro com validação de dados
- ✅ Recuperação de Senha simulada
- ✅ Armazenamento seguro de usuários em memória
- ✅ Persistência de sessão com LocalStorage

### 2. Gerenciamento de Figurinhas
- ✅ Álbum com 24 figurinhas de jogadores da Copa do Mundo
- ✅ Marcar/desmarcar figurinhas como coletadas
- ✅ Pesquisa em tempo real por nome do jogador ou seleção
- ✅ Filtros (Todas, Coletadas, Pendentes)
- ✅ Visualização de coleção (apenas figurinhas coletadas)

### 3. Análise e Progresso
- ✅ Total de figurinhas no álbum
- ✅ Quantidade coletadas e pendentes
- ✅ Barra de progresso visual
- ✅ Percentual de conclusão

### 4. Perfil do Usuário
- ✅ Exibição de dados do usuário
- ✅ Estatísticas de coleção
- ✅ Progresso visual do álbum
- ✅ Botão de Logout

### 5. Interface
- ✅ Design moderno com tema da Copa do Mundo
- ✅ Cores verde, amarelo e branco
- ✅ Cards responsivos com sombras suaves
- ✅ Navegação por abas (Tabs)
- ✅ Ícones do Ionic
- ✅ Gradientes visuais atraentes
- ✅ Responsivo para diferentes tamanhos de tela

## Estrutura do Projeto

```
src/
├── components/
│   ├── AppHeader.vue           # Cabeçalho com logo e logout
│   ├── LoginForm.vue           # Formulário de login
│   ├── RegisterForm.vue        # Formulário de cadastro
│   ├── ResetPasswordForm.vue   # Formulário de recuperação de senha
│   ├── StickerCard.vue         # Card individual da figurinha
│   └── StickerList.vue         # Lista de figurinhas com filtros
├── composables/
│   ├── useAuth.ts              # Lógica de autenticação
│   └── useAlbum.ts             # Lógica do álbum de figurinhas
├── data/
│   └── stickers.ts             # Lista de 24 figurinhas
├── views/
│   ├── LoginPage.vue           # Página de login
│   ├── RegisterPage.vue        # Página de cadastro
│   ├── ResetPasswordPage.vue   # Página de recuperação de senha
│   ├── HomePage.vue            # Página principal do álbum
│   ├── CollectionPage.vue      # Página de coleção
│   └── ProfilePage.vue         # Página de perfil
├── router/
│   └── index.ts                # Configuração de rotas
├── theme/
│   └── variables.css           # Variáveis de tema
├── App.vue                     # Componente raiz com tabs
└── main.ts                     # Ponto de entrada

```

## Como Executar

### Instalação das Dependências

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

O aplicativo será servido em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

### Teste E2E

```bash
npm run test:e2e
```

### Teste Unitário

```bash
npm run test:unit
```

## Fluxo de Uso

### 1. Primeiro Acesso
- Usuário é redirecionado para login
- Pode criar uma nova conta via "Criar conta"
- Ou usar credenciais de teste: `teste@email.com` / `123456`

### 2. Autenticação
- Login com validação de e-mail
- Senha obrigatória com validação
- Recuperação de senha com envio simulado
- Sessão persistida no LocalStorage

### 3. Álbum Principal
- Visualização de estatísticas (Total, Coletadas, Pendentes)
- Barra de progresso do álbum
- Grid de figurinhas com busca em tempo real
- Filtros dinâmicos

### 4. Gestão de Figurinhas
- Clicar no card para marcar como coletada
- Botão "Coletar" ou "Remover" conforme status
- Alterações salvas automaticamente no LocalStorage

### 5. Coleção
- Visualização exclusiva de figurinhas coletadas
- Cards das figurinhas coletadas
- Opção de remover da coleção

### 6. Perfil
- Dados do usuário logado
- Estatísticas completas do álbum
- Barra de progresso visual
- Logout

### 7. Navegação
- Menu de abas inferior com 3 opções
- **Álbum:** Página principal com todas as figurinhas
- **Coleção:** Apenas figurinhas coletadas
- **Perfil:** Dados do usuário e logout

## Funcionalidades Implementadas

### Composables

#### `useAuth.ts`
- `login(email, senha)` - Autentica o usuário
- `logout()` - Faz logout
- `register(nome, email, senha)` - Cadastra novo usuário
- `resetPassword(email)` - Simula envio de e-mail de recuperação
- `carregarUsuarioSalvo()` - Recupera usuário do LocalStorage
- `estaLogado()` - Verifica se usuário está autenticado
- `obterUsuarioLogado()` - Retorna dados do usuário

#### `useAlbum.ts`
- `marcarColetada(id)` - Marca figurinha como coletada
- `removerColetada(id)` - Remove figurinha das coletadas
- `pesquisar(termo)` - Pesquisa por nome ou seleção
- `filtrar(tipo)` - Filtra por status
- `calcularProgresso()` - Calcula estatísticas do álbum
- `obterFiguras()` - Retorna figurinhas filtradas
- `obterColetadas()` - Retorna apenas coletadas
- `alternarColetada(id)` - Alterna status da figurinha

### Componentes

#### `AppHeader.vue`
- Exibição de título
- Botão de logout condicional
- Estilo com gradiente

#### `LoginForm.vue`
- Campo de e-mail com validação
- Campo de senha com validação
- Links para recuperação e cadastro
- Mensagens de erro

#### `RegisterForm.vue`
- Campo de nome com validação
- Campo de e-mail com validação
- Campo de senha com validação mínima
- Toast de sucesso/erro

#### `ResetPasswordForm.vue`
- Campo de e-mail
- Simulação de envio
- Alert de confirmação

#### `StickerCard.vue`
- Exibição de foto da figurinha
- Número da figurinha
- Nome do jogador
- Seleção
- Botão para coletar/remover
- Estilo diferenciado para coletadas

#### `StickerList.vue`
- Barra de pesquisa
- Filtros (Todas, Coletadas, Pendentes)
- Grid responsivo de cards
- Atualização em tempo real

## Dados de Teste

### Usuário Padrão
- **E-mail:** `teste@email.com`
- **Senha:** `123456`

### Figurinhas Disponíveis
O sistema inclui 24 figurinhas de diferentes seleções:
- Brasil (Neymar, Vinicius Jr, Alisson, Richarlison)
- Portugal (Cristiano Ronaldo, Bruno Fernandes)
- Argentina (Messi, Di María, Montiel, Lautaro Martínez)
- França (Mbappé, Camavinga)
- Alemanha (Neuer, Gnabry)
- Inglaterra (Kane, Rice)
- Itália (Donnarumma, Chiesa)
- Espanha (Busquets, Pedri)
- Senegal (Mané)
- Egito (Salah)
- Canadá (Davies)

## Validações Implementadas

### Autenticação
- E-mail obrigatório e válido
- Senha obrigatória
- Verificação de credenciais

### Cadastro
- Nome com mínimo 3 caracteres
- E-mail válido e único
- Senha com mínimo 6 caracteres

### Recuperação de Senha
- E-mail obrigatório e válido
- Simulação de envio

## Armazenamento de Dados

- **Usuários:** Array em memória com backup no LocalStorage
- **Figurinhas:** Array em memória com persistência no LocalStorage
- **Sessão:** LocalStorage com dados do usuário logado

## Design e UX

### Paleta de Cores
- **Verde:** #1abc9c (primária)
- **Verde Escuro:** #16a085
- **Amarelo:** #ffd700 (destaque)
- **Branco:** #ffffff
- **Cinza:** #999999

### Tipografia
- Fontes padrão do Ionic
- Tamanhos adaptados para legibilidade

### Responsividade
- Grid adaptável
- Componentes mobile-first
- Touchscreen optimizado

## Observações Importantes

1. **Dados em Memória:** Todos os dados são armazenados em arrays locais, sem banco de dados externo
2. **Sem APIs Externas:** O projeto é totalmente standalone, sem dependências externas
3. **Persistência:** LocalStorage garante persistência entre sessões
4. **Segurança:** Projeto educacional, não implementa criptografia real

## Estrutura de Armazenamento Local

```typescript
// Usuário
interface User {
  id: number
  nome: string
  email: string
  senha: string
}

// Figurinha
interface Sticker {
  id: number
  numero: number
  nome: string
  selecao: string
  foto: string
  coletada: boolean
}
```

## Próximas Melhorias (Sugestões)

1. Integração com API de back-end
2. Sistema de trading de figurinhas entre usuários
3. Notificações push
4. Modo offline aprimorado
5. Suporte a múltiplos idiomas
6. Sistema de pontos e achievements
7. Compartilhamento em redes sociais
8. Backup em nuvem

## Autor

Desenvolvido como projeto educacional para [Nome da Disciplina].

---

**Desenvolvido com ❤️ usando Ionic + Vue 3**
