# Chat Offline

Aplicação de chat em janela única onde o usuário envia mensagens alternando entre dois remetentes: **usuário** (alinhado à direita) e **robô** (alinhado à esquerda). O histórico vive apenas em memória (React state) — ao recarregar a página, as mensagens são perdidas.

## Funcionalidades

- **Histórico em memória** — mensagens ordenadas cronologicamente, sem persistência
- **Dois remetentes** — toggle no input alterna quem envia a próxima mensagem (padrão: usuário)
- **Layout responsivo** — container centralizado (`max-w-2xl`) em fundo marrom claro
- **Input fixo no rodapé** — card branco permanece visível durante o scroll do histórico
- **Textarea dinâmico** — altura ajusta conforme o conteúdo (mín. 1 linha, máx. ~6 linhas)
- **Atalhos de teclado** — `Enter` envia; `Shift + Enter` insere quebra de linha
- **Estado vazio** — mensagem indicativa quando não há mensagens
- **Auto-scroll** — rola automaticamente para a última mensagem ao enviar
- **Modo robô** — borda roxa no card de input quando o remetente ativo é o robô

## Stack

| Tecnologia | Uso |
|---|---|
| [Vite](https://vite.dev/) | Build e dev server |
| [React 19](https://react.dev/) | UI e estado |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
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

1. Digite uma mensagem no campo de texto na parte inferior da tela.
2. Use o toggle à esquerda para alternar entre **Usuário** e **Robô** antes de enviar.
3. Envie com `Enter` ou pelo botão à direita (desabilitado quando o campo está vazio).
4. Mensagens do usuário aparecem alinhadas à direita; mensagens do robô, à esquerda.

## Estrutura do projeto

```
src/
├── types/
│   └── message.ts          # Sender, Message
├── components/
│   ├── Chat.tsx            # Estado e orquestração do layout
│   ├── MessageList.tsx     # Lista, estado vazio e auto-scroll
│   ├── MessageBubble.tsx   # Bolha individual
│   ├── ChatInput.tsx       # Card fixo: toggle + textarea + enviar
│   └── SenderToggle.tsx    # Alternância usuário/robô
├── App.tsx                 # Renderiza <Chat />
└── index.css               # Import do Tailwind
```

### Modelo de dados

```ts
type Sender = 'user' | 'robot'

type Message = {
  id: string
  text: string
  sender: Sender
}
```

## Fora de escopo

- Persistência (localStorage, backend, etc.)
- Autenticação
- Edição ou exclusão de mensagens
- Horários, rótulos de remetente ou cabeçalho do chat
- Markdown, anexos ou formatação rica (apenas texto plano)

## Documentação

Especificação completa do produto: [.docs/prd.md](.docs/prd.md)
