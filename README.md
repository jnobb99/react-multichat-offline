# Chat Offline Multiconversa

Aplicação de chat offline em React para criar e alternar entre múltiplas conversas, mantendo o histórico em armazenamento local do navegador. Cada conversa guarda suas próprias mensagens e pode ser selecionada, criada ou excluída pela sidebar.

## Visão geral

O projeto começou como um chat de um único histórico, mas a evolução recente transformou a aplicação em um painel de conversas com o seguinte fluxo:

- o usuário cria uma conversa nova;
- seleciona uma conversa ativa;
- envia mensagens alternando entre remetente usuário e robô;
- o estado é persistido em localStorage usando Zustand;
- o histórico é restaurado ao recarregar a página.

## Funcionalidades

- **Múltiplas conversas** — cada chat tem seu próprio conjunto de mensagens e ID único
- **Persistência local** — o store usa `zustand/middleware` com `persist` para salvar as conversas no navegador
- **Sidebar de navegação** — cria, seleciona e exclui conversas com visual responsivo
- **Chat ativo** — mensagens são adicionadas somente à conversa selecionada
- **Dois remetentes** — toggle alterna entre usuário e robô antes de enviar
- **Input com textarea dinâmico** — cresce até um limite visual, sem quebrar o layout
- **Enviar por teclado** — `Enter` envia; `Shift + Enter` cria quebra de linha
- **Auto-scroll** — rola automaticamente para a última mensagem do chat ativo
- **Estados vazios** — exibe mensagem apropriada quando não há conversa ou quando a conversa ainda não possui mensagens
- **Layout responsivo** — sidebar móvel e painel principal em tela grande

## Stack

| Tecnologia | Uso |
|---|---|
| [Vite](https://vite.dev/) | Build e servidor de desenvolvimento |
| [React 19](https://react.dev/) | Interface e renderização |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| [Zustand](https://zustand-demo.pmndrs.com/) | Estado global e persistência |
| [Tailwind CSS 4](https://tailwindcss.com/) | Estilização |
| [Oxlint](https://oxc.rs/docs/guide/usage/linter) | Lint |

## Como executar

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
```

## Uso

1. Abra o app e use o botão de menu para abrir a sidebar em telas menores.
2. Clique em “Nova conversa” para criar um novo chat.
3. Selecione uma conversa na lista para torná-la ativa.
4. Alterna entre usuário e robô no campo de entrada.
5. Digite a mensagem e envie com `Enter` ou pelo botão “Enviar”.
6. O histórico da conversa atual é mantido em localStorage mesmo após recarregar a página.

## Estrutura do projeto

```text
src/
├── components/
│   ├── Chat.tsx            # Orquestração geral do layout e do chat ativo
│   ├── ChatInput.tsx       # Campo de mensagem, toggle de remetente e envio
│   ├── ChatSidebar.tsx     # Navegação entre conversas e criação/exclusão
│   ├── MessageBubble.tsx   # Bolha individual da mensagem
│   ├── MessageList.tsx     # Lista de mensagens e estados vazios
│   └── SenderToggle.tsx    # Alternância entre usuário e robô
├── stores/
│   ├── chatStore.ts        # Store com persistência e operações das conversas
│   └── chatStore.test.ts   # Testes do store
├── types/
│   ├── conversation.ts     # Modelo de conversa
│   └── message.ts          # Modelo de mensagem e tipo Sender
├── App.tsx                 # Renderiza o componente principal
├── index.css               # Estilos globais e import do Tailwind
└── main.tsx                # Entrada da aplicação
```

## Modelo de dados

```ts
type Sender = 'user' | 'robot'

type Message = {
  id: string
  text: string
  sender: Sender
}

type Conversation = {
  id: string
  messages: Message[]
}
```

## Persistência

A camada de estado central é definida em `chatStore.ts` e usa `persist` do Zustand. A chave de armazenamento é `chat-storage` e o `partialize` salva apenas a lista de conversas, preservando o histórico offline no navegador.

## Regras de negócio importantes

- cada mensagem é adicionada somente à conversa ativa;
- ao excluir uma conversa, o active chat é limpo;
- conversa sem seleção exibe estado vazio em vez de lista de mensagens;
- a seleção de conversa não altera o histórico das demais conversas.

## Fora de escopo

- backend ou sincronização entre dispositivos;
- autenticação de usuários;
- edição de mensagens;
- anexos, markdown ou formatação rica;
- histórico centralizado em servidor.
