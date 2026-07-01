# Álbum de Figurinhas da Copa do Mundo

## Informações do Projeto

- **Aluno:** Kenzo Ruthes dos Santos
- **Curso:** 3º Informática
- **Disciplina:** Codificar aplicações para dispositivos móveis
- **Data:** 3/06/2026

---

## Objetivo

Desenvolver uma aplicação mobile utilizando **Ionic Framework + Vue 3 + Composition API** que simule um álbum digital de figurinhas da Copa do Mundo, com funcionalidades de autenticação, gerenciamento de coleções e interface moderna e responsiva.

---

## Tecnologias Utilizadas

- **Framework:** Ionic Framework 7.x
- **JavaScript Framework:** Vue 3
- **API:** Composition API (useAlbum, useAuth)
- **Linguagem:** TypeScript
- **Build Tool:** Vite
- **Roteamento:** Vue Router
- **Armazenamento:** LocalStorage (persistência de dados)
- **Ícones:** Ionicons
- **Gerenciamento de Estado:** Composables

---

## Características Principais

✅ **Autenticação**
- Login com e-mail e senha
- Cadastro com validação de campos
- Recuperação de senha (simulada)
- Logout seguro

✅ **Gerenciamento de Álbum**
- 24 figurinhas com dados reais de jogadores
- Marcar/desmarcar figurinhas coletadas
- Visualizar progresso em tempo real
- Pesquisa por nome ou seleção
- Filtros: todas, coletadas, pendentes

✅ **Interface**
- Design responsivo e moderno
- Paleta de cores profissional
- Transições e animações
- Header reutilizável
- Componentes bem organizados

✅ **Dados**
- Persistência em LocalStorage
- Armazenamento em memória (vetores)
- Sem dependências de APIs externas

---

## Estrutura do Projeto

```
src/
├── components/              # Componentes Vue reutilizáveis
│   ├── AppHeader.vue       # Cabeçalho com logout e contato
│   ├── LoginForm.vue       # Formulário de login
│   ├── RegisterForm.vue    # Formulário de cadastro
│   ├── ResetPasswordForm.vue # Formulário de recuperação
│   ├── ContatoForm.vue     # Formulário de contato
│   ├── StickerCard.vue     # Card individual da figurinha
│   ├── StickerList.vue     # Lista com filtros e busca
│   ├── ContatoList.vue     # Lista de contatos
│   ├── Tab1Page.vue        # Página de aba 1
│   ├── Tab2Page.vue        # Página de aba 2
│   └── Tab3Page.vue        # Página de aba 3
│
├── composables/             # Lógica reutilizável (Composition API)
│   ├── useAuth.ts          # Autenticação e gestão de usuários
│   └── useAlbum.ts         # Gerenciar figurinhas e filtros
│
├── data/                    # Dados estáticos
│   └── stickers.ts         # Lista de 24 figurinhas
│
├── views/                   # Páginas completas
│   ├── LoginPage.vue       # Página de login
│   ├── RegisterPage.vue    # Página de cadastro
│   ├── ResetPasswordPage.vue # Página de recuperação
│   ├── HomePage.vue        # Página principal (álbum)
│   ├── CollectionPage.vue  # Página de coleção
│   └── ProfilePage.vue     # Página de perfil
│
├── router/
│   └── index.ts            # Configuração de rotas e guards
│
├── theme/
│   └── variables.css       # Variáveis de tema global
│
├── App.vue                 # Componente raiz
└── main.ts                 # Ponto de entrada
```

---

## Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

---

## Funcionalidades Implementadas

### 1. Composables

#### `useAuth.ts`
**Gerencia toda a autenticação e usuários**

```typescript
// Funções disponíveis:
- login(email, senha)           // Autentica usuário
- logout()                      // Desconecta usuário
- register(nome, email, senha)  // Registra novo usuário
- resetPassword(email)          // Simula recuperação de senha
- estaLogado()                  // Verifica se logado
- obterUsuarioLogado()          // Retorna dados do usuário
- carregarUsuarioSalvo()        // Carrega de localStorage
```

**Dados armazenados:**
- Array de usuários em memória
- Usuário logado em ref reativa
- Persistência em localStorage

#### `useAlbum.ts`
**Gerencia o álbum e figurinhas**

```typescript
// Funções disponíveis:
- marcarColetada(id)            // Marca figurinha como coletada
- removerColetada(id)           // Remove de coletadas
- alternarColetada(id)          // Alterna status
- pesquisar(termo)              // Busca por nome/seleção
- filtrar(tipo)                 // Filtra por status
- calcularProgresso()           // Retorna stats do álbum
- obterColetadas()              // Retorna only coletadas
- carregarDoLocalStorage()       // Carrega dados salvos
- salvarNoLocalStorage()         // Persiste dados
- resetarAlbum()                // Reset para estado inicial
```

**Dados gerenciados:**
- Array de figurinhas com status coletada
- Filtro atual (todas, coletadas, pendentes)
- Termo de busca atual

### 2. Componentes

#### `AppHeader.vue`
- Exibe título configurável
- Botão de contato
- Botão de logout
- Emite eventos para ações

#### `StickerCard.vue`
- Exibe imagem, número e nome da figurinha
- Mostra badge "Coletada" quando marcada
- Botão para marcar/desmarcar
- Emite evento ao alternar

#### `StickerList.vue`
- Grid responsivo de figurinhas
- Searchbar para busca em tempo real
- Filtros (todas, coletadas, pendentes)
- Integração completa com useAlbum

#### Formulários
- `LoginForm.vue`: Validação de email e senha
- `RegisterForm.vue`: Cadastro com validação
- `ResetPasswordForm.vue`: Recuperação de senha
- `ContatoForm.vue`: Formulário para contato

### 3. Páginas

#### `HomePage.vue`
- Exibe resumo do álbum (total, coletadas, pendentes)
- Barra de progresso visual
- Lista de figurinhas com filtros

#### `CollectionPage.vue`
- Mostra apenas figurinhas coletadas
- Permite remover de coletadas
- Navegação para voltar ao álbum

#### `ProfilePage.vue`
- Dados do usuário logado
- Estatísticas de coleção
- Barra de progresso
- Botão de logout

#### `LoginPage.vue` / `RegisterPage.vue` / `ResetPasswordPage.vue`
- Interfaces de autenticação
- Validação de campos
- Toast com mensagens

---

## Validações Implementadas

### Autenticação
✓ Email: formato obrigatório e validado com regex
✓ Senha: mínimo 6 caracteres
✓ Email único: não permite duplicatas
✓ Campos obrigatórios: sempre validados

### Figuri nhas
✓ Toggle status: apenas figurinhas válidas
✓ Persistência: salva em localStorage
✓ Filtro: valida tipos (todas, coletadas, pendentes)
✓ Busca: case-insensitive

---

## Dados de Teste

**Usuário padrão:**
- Email: `teste@email.com`
- Senha: `123456`

**Figurinhas:** 24 jogadores de diferentes seleções
- Brasil: Neymar, Vinicius Jr, Alisson
- Portugal: Cristiano Ronaldo, Bruno Fernandes
- Argentina: Messi, Di Maria, Montiel
- França: Mbappé, Camavinga
- Alemanha: Neuer, Kimmich, Kroos
- E mais...

---

## Armazenamento de Dados

### LocalStorage
```javascript
// Usuário logado
localStorage.setItem('usuarioLogado', JSON.stringify(user))

// Álbum (figurinhas com status)
localStorage.setItem('album', JSON.stringify(stickers))
```

### Em Memória
- Array de usuários cadastrados
- Array de figurinhas
- Estado reativo via refs e computed

---

## Fluxo de Uso

1. **Login/Registro**
   - Usuário acessa aplicação
   - Faz login ou cria conta
   - Dados salvos em memória e localStorage

2. **Álbum Principal**
   - Visualiza resumo de progresso
   - Vê grid de figurinhas
   - Pode filtrar e buscar
   - Marca figurinhas coletadas

3. **Coleção**
   - Página dedicada às figurinhas coletadas
   - Opção de remover
   - Voltar ao álbum completo

4. **Perfil**
   - Visualiza dados do usuário
   - Vê estatísticas
   - Faz logout

5. **Contato**
   - Formulário para enviar contato
   - Dados salvos em localStorage

---

## Design e UX

### Paleta de Cores
- **Verde Primário:** #1abc9c
- **Verde Escuro:** #16a085
- **Amarelo (Destaque):** #ffd700
- **Branco:** #ffffff
- **Cinza:** #999999

### Tipografia
- Fontes padrão do Ionic
- Tamanhos adaptados para legibilidade
- Hierarchy clara

### Responsividade
- Grid adaptável (minmax 120-150px)
- Componentes mobile-first
- Touchscreen otimizado
- Funciona em tablets e desktops

### Animações
- Hover effects nos cards
- Transições suaves (0.3s)
- Badge animada para "Coletada"
- Progressbar animada

---

## Segurança e Limitações

⚠️ **Projeto Educacional**
- Senhas sem criptografia real
- Validação apenas front-end
- Sem HTTPS/API backend
- Apenas localStorage local

✓ **O que foi feito:**
- Validação de campos
- Logout seguro
- Separação de responsabilidades
- Sem hardcoding de dados sensíveis

---

## Próximas Melhorias (Sugestões)

🔮 **Possíveis Expansões**
- Backend Node.js/Express com banco de dados
- Criptografia de senhas (bcrypt)
- Temas dark/light mode
- Modo offline com Service Workers
- Exportar/importar dados
- Sistema de badges e conquistas
- Compartilhar coleção
- Multiplayer trading
- Notificações push
- Sistema de pontos/ranking

---

## Observações Importantes

1. **Dados em Memória:** Todos os dados são armazenados em arrays locais, sem banco de dados externo
2. **Sem APIs Externas:** O projeto é totalmente standalone, sem dependências externas
3. **Persistência:** LocalStorage garante persistência entre sessões do navegador
4. **Segurança:** Projeto educacional, não implementa criptografia real
5. **Comentários:** Todo o código possui comentários explicativos

---

## Autor

**Kenzo Ruthes dos Santos**  
Curso: Informática  
Disciplina: Codificar aplicações para dispositivos móveis  
Data: 3 de junho de 2026

---

## Licença

Projeto educacional - Livre para uso e modificação

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
