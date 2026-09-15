## Feature: Single-chat to multi-chat

Preciso transformar o chat de conversa única para múltiplas conversas.

### Aspectos técnicos 

Vamos usar a biblioteca zustand para gerenciamento de estado.

Store na biblioteca Zustand armazenando duas informações: 
- Histórico em cada conversa individualmente (com todas as informações do type Message).
- Qual chat está ativo (com um ID).

A store do zustand deve ficar no src/stores.

### Fluxo de informações 

Ao abrir o site, não estará em nennhuma conversa (empty state).

### Aspectos visuais

O sidebar ficará do lado esquerdo, sendo retrátil no celular (botão hamburger no canto superior esquerdo)

A identificação do chat no sidebar é exibindo o próprio ID dele.

No sidebar teremos a lista das conversas e um botão para criar uma nova conversa.

O input fica desabilitado quando não há conversas ativas (opacidade 50% e botões não funcionam)