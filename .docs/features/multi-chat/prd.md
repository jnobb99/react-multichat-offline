# PRD: Single-chat para multi-chat

## 1. Visão geral

### 1.1 Objetivo

Transformar o chat atual de conversa única em uma experiência de múltiplas conversas independentes, permitindo criar, selecionar e excluir chats sem persistência externa.

### 1.2 Problema

O sistema atual concentra todo o histórico em uma única conversa. O usuário não consegue separar contextos, alternar entre históricos ou iniciar uma conversa nova sem perder a organização do conteúdo anterior.

### 1.3 Resultado esperado

O usuário poderá:

- abrir a aplicação sem nenhuma conversa ativa;
- criar uma nova conversa com um ID único;
- alternar entre conversas existentes;
- manter um histórico independente para cada conversa enquanto a página estiver aberta;
- excluir conversas;
- usar o chat somente quando houver uma conversa ativa.

## 2. Escopo

### 2.1 Incluído

- Gerenciamento global do estado com Zustand.
- Store localizada em `src/stores`.
- Lista de conversas em sidebar à esquerda.
- Criação imediata de conversas com UUID.
- Seleção de uma conversa ativa.
- Histórico de mensagens isolado por conversa.
- Exclusão de conversas.
- Empty state inicial e após exclusão.
- Sidebar retrátil em dispositivos móveis.
- Fechamento automático do sidebar no celular após criar ou selecionar uma conversa.
- Layout desktop com sidebar fixa e chat centralizado em `max-w-2xl`.
- Input e ações de envio desabilitados quando não há conversa ativa.

### 2.2 Fora do escopo

- Persistência em `localStorage`, IndexedDB ou qualquer outro armazenamento local.
- Backend, autenticação, sincronização entre dispositivos ou chamadas de API.
- Renomeação manual de conversas.
- Busca, ordenação manual ou agrupamento de conversas.
- Exportação ou importação de históricos.

## 3. Usuário e histórias de usuário

### 3.1 Usuário

Usuário da aplicação de chat offline que precisa separar diferentes contextos de conversa durante uma mesma sessão no navegador.

### 3.2 Histórias de usuário

- Como usuário, quero abrir a aplicação sem uma conversa selecionada para escolher quando iniciar um contexto.
- Como usuário, quero criar uma conversa e torná-la ativa imediatamente para começar a enviar mensagens.
- Como usuário, quero ver minhas conversas no sidebar identificadas pelo próprio ID para distinguir os históricos.
- Como usuário, quero selecionar uma conversa para continuar seu histórico separado das demais.
- Como usuário, quero excluir uma conversa para removê-la da sessão atual.
- Como usuário, quero que a exclusão me leve ao empty state para evitar que outra conversa seja ativada sem minha ação.
- Como usuário mobile, quero fechar o sidebar automaticamente após uma ação para voltar ao conteúdo do chat.

## 4. Requisitos funcionais

### RF-01. Estado inicial

Ao carregar a aplicação:

- não deve existir conversa ativa;
- o `activeChatId` deve ser `null`;
- o chat deve exibir o empty state;
- o input e seus botões devem estar desabilitados;
- nenhuma conversa deve ser criada automaticamente.

### RF-02. Criação de conversa

Ao acionar o botão de nova conversa:

- uma conversa deve ser criada imediatamente;
- o ID deve ser gerado por UUID;
- o histórico inicial deve ser um array vazio;
- a conversa deve ser adicionada ao fim da lista, preservando a ordem de criação;
- a nova conversa deve se tornar a conversa ativa;
- no mobile, o sidebar deve ser fechado após a criação.

### RF-03. Listagem e identificação

O sidebar deve:

- listar todas as conversas criadas na sessão;
- exibir o próprio ID de cada conversa;
- exibir um botão ou ícone de excluir em cada item da lista, associado exclusivamente àquela conversa;
- ordenar as conversas da mais antiga para a mais recente;
- indicar visualmente qual conversa está ativa;
- permitir selecionar uma conversa da lista.

### RF-04. Seleção de conversa

Ao selecionar uma conversa:

- `activeChatId` deve receber o ID selecionado;
- o histórico exibido deve pertencer somente à conversa selecionada;
- mensagens de outras conversas não podem aparecer ou ser alteradas;
- no mobile, o sidebar deve ser fechado automaticamente.

### RF-05. Histórico por conversa

Cada conversa deve armazenar seu próprio histórico contendo todas as informações do tipo `Message` existente no projeto:

- `id` da mensagem;
- `text` da mensagem;
- `sender` da mensagem.

O envio de uma mensagem deve atualizar exclusivamente o histórico da conversa ativa.

### RF-06. Exclusão de conversa

Ao excluir uma conversa:

- a exclusão deve ser acionada pelo botão ou ícone de excluir exibido no item correspondente do sidebar;
- ela deve ser removida da lista;
- seu histórico deve ser removido junto com ela;
- `activeChatId` deve ser definido como `null`, independentemente de a conversa excluída estar ativa ou não;
- a interface deve voltar ao empty state;
- nenhuma outra conversa deve ser selecionada automaticamente;
- o input deve ficar desabilitado até o usuário criar ou selecionar uma conversa.

### RF-07. Empty state

O empty state deve ser exibido quando não houver conversa ativa, inclusive no carregamento inicial e após qualquer exclusão. A mensagem exibida deve ser:

> Crie ou selecione uma conversa

Quando uma conversa estiver ativa, o empty state não deve ser exibido.

### RF-08. Input desabilitado

Sem conversa ativa:

- o campo de texto deve estar desabilitado;
- o botão de envio deve estar desabilitado;
- o controle de remetente, caso exista na interface atual, deve estar desabilitado;
- os controles relacionados ao envio não devem executar ações;
- o bloco de input deve apresentar opacidade de 50%.

Com conversa ativa, os controles devem voltar ao estado normal e permitir o fluxo atual de envio de mensagens.

### RF-09. Sidebar responsivo

No desktop:

- o sidebar deve permanecer fixo no lado esquerdo;
- o conteúdo do chat deve continuar centralizado;
- a área principal do chat deve respeitar largura máxima `max-w-2xl`.

No mobile:

- o sidebar deve iniciar fechado ou retrátil;
- deve existir um botão hamburger no canto superior esquerdo;
- o hamburger deve abrir e fechar o sidebar;
- selecionar ou criar uma conversa deve fechar o sidebar automaticamente;
- o conteúdo principal não deve ficar permanentemente obstruído pelo sidebar.

## 5. Requisitos não funcionais

### RNF-01. Estado em memória

Os dados devem existir somente em memória. Ao recarregar a página, fechar a aba ou reiniciar a aplicação, todas as conversas e mensagens podem ser perdidas.

### RNF-02. Gerenciamento de estado

A implementação deve usar Zustand. A store deve ficar em `src/stores` e ser a fonte única de verdade para:

- a coleção de conversas e seus históricos;
- o ID da conversa ativa.

### RNF-03. Integridade dos dados

A aplicação deve impedir que mensagens sejam adicionadas sem uma conversa ativa e deve garantir isolamento entre os históricos.

### RNF-04. Acessibilidade

- O botão hamburger deve ter nome acessível e indicar seu estado.
- Os botões de criar, selecionar e excluir devem ter nomes acessíveis.
- O estado desabilitado deve ser expresso também semanticamente, não apenas por opacidade.
- A conversa ativa deve possuir indicação que não dependa exclusivamente de cor.

### RNF-05. Compatibilidade

A experiência deve funcionar nos breakpoints desktop e mobile já adotados pelo projeto, sem alterar o comportamento atual de mensagens quando uma conversa está ativa.

## 6. Modelo de dados e store

A store deve representar, no mínimo, os seguintes conceitos:

```ts
type Conversation = {
  id: string
  messages: Message[]
}

type ChatStore = {
  conversations: Conversation[]
  activeChatId: string | null
  createConversation: () => void
  selectConversation: (id: string) => void
  deleteConversation: (id: string) => void
  addMessage: (message: Message) => void
}
```

A ordem do array `conversations` representa a ordem de criação: a primeira conversa criada aparece no topo e novas conversas são adicionadas ao final. O UUID é o identificador exibido na interface e usado para seleção e exclusão.

A assinatura exata das ações pode ser ajustada à implementação existente, desde que preserve os comportamentos e invariantes descritos neste documento.

## 7. Estados da interface

| Estado | Sidebar | Área de chat | Input |
|---|---|---|---|
| Inicial, sem conversas | Lista vazia e ação de nova conversa | `Crie ou selecione uma conversa` | Desabilitado, opacidade 50% |
| Conversa ativa sem mensagens | Conversa ativa destacada | Estado vazio da conversa ou conteúdo atual do chat | Habilitado |
| Conversa ativa com mensagens | Conversa ativa destacada | Histórico daquela conversa | Habilitado |
| Sidebar mobile fechado | Oculto | Chat visível | Conforme conversa ativa |
| Sidebar mobile aberto | Visível sobre ou ao lado do conteúdo | Conteúdo não deve ficar inacessível | Conforme conversa ativa |
| Após exclusão | Conversas restantes listadas, sem seleção ativa | `Crie ou selecione uma conversa` | Desabilitado, opacidade 50% |

## 8. Critérios de aceite

### CA-01. Abertura sem conversa ativa

**Dado** que a aplicação foi carregada pela primeira vez, **quando** a interface for exibida, **então** não haverá conversa ativa, será mostrado `Crie ou selecione uma conversa` e o input estará desabilitado com opacidade de 50%.

### CA-02. Criar conversa

**Dado** que não há conversa ativa, **quando** o usuário clicar em nova conversa, **então** uma conversa com UUID será criada, aparecerá na lista, será selecionada e o input ficará habilitado.

### CA-03. Ordem de criação

**Dado** que existem várias conversas, **quando** a lista for exibida, **então** a conversa mais antiga estará no topo e a mais recente estará no final.

### CA-04. Isolamento de histórico

**Dado** que duas conversas possuem mensagens, **quando** o usuário alternar entre elas, **então** cada conversa exibirá apenas seu próprio histórico e novas mensagens serão salvas somente na conversa ativa.

### CA-05. Seleção no mobile

**Dado** que o sidebar mobile está aberto, **quando** o usuário selecionar uma conversa, **então** a conversa será ativada e o sidebar será fechado automaticamente.

### CA-06. Criação no mobile

**Dado** que o sidebar mobile está aberto, **quando** o usuário criar uma conversa, **então** ela será ativada e o sidebar será fechado automaticamente.

### CA-07. Exclusão

**Dado** que existe uma ou mais conversas, **quando** o usuário clicar no botão ou ícone de excluir de um item do sidebar, **então** a conversa correspondente será removida, nenhuma conversa ficará ativa e o empty state será exibido.

### CA-08. Bloqueio sem conversa ativa

**Dado** que não há conversa ativa, **quando** o usuário tentar interagir com o input ou seus botões, **então** os controles permanecerão desabilitados e nenhuma mensagem será criada.

### CA-09. Layout desktop

**Dado** que a aplicação está em viewport desktop, **quando** a interface for exibida, **então** o sidebar ficará fixo à esquerda e o chat permanecerá centralizado com largura máxima equivalente a `max-w-2xl`.

### CA-10. Perda de dados esperada

**Dado** que as conversas existem apenas em memória, **quando** a aplicação for recarregada, **então** os dados não precisarão ser restaurados e a aplicação poderá retornar ao estado inicial sem conversa ativa.

## 9. Fases e tarefas de implementação

As fases devem ser executadas em ordem. Uma fase só será considerada concluída depois que seu aceite for validado. O aceite de uma fase não substitui os critérios de aceite da funcionalidade completa.

### Checklist de execução

- [x] Fase 1. Preparação da dependência e do modelo
- [x] Fase 2. Store de conversas
- [ ] Fase 3. Integração da interface e do fluxo de mensagens
- [ ] Fase 4. Responsividade e layout
- [ ] Fase 5. Testes e validação final

Após concluir as tarefas e validar o aceite de uma fase, alterar o marcador correspondente de `[ ]` para `[x]`.

### Fase 1. Preparação da dependência e do modelo

**Tarefas**

- Instalar `zustand` como dependência do projeto.
- Confirmar o uso do tipo `Message` existente.
- Definir o tipo `Conversation`, contendo `id` e `messages`.
- Definir os tipos da store e das ações necessárias.
- Garantir que a solução não introduza persistência em `localStorage`, backend ou outro armazenamento externo.

**Aceite da fase**

- `zustand` está disponível no projeto e pode ser importado pela aplicação.
- O modelo de conversa representa um histórico independente de mensagens.
- O TypeScript compila sem erros relacionados aos tipos criados.
- Não existe middleware ou código de persistência associado à store.

### Fase 2. Store de conversas

**Tarefas**

- Criar a store em `src/stores`.
- Inicializar `conversations` como array vazio.
- Inicializar `activeChatId` como `null`.
- Implementar a criação de conversa com UUID, histórico vazio e ativação imediata.
- Implementar a seleção por ID.
- Implementar a exclusão por ID, removendo a conversa e definindo `activeChatId` como `null`.
- Implementar a inclusão de mensagens somente no histórico da conversa ativa.
- Preservar a ordem de criação no array de conversas.

**Aceite da fase**

- A store inicia sem conversas e sem conversa ativa.
- Criar uma conversa gera um UUID único, adiciona a conversa ao final da lista e a torna ativa.
- Selecionar uma conversa altera somente `activeChatId`.
- Excluir qualquer conversa remove seus dados e sempre define `activeChatId` como `null`.
- Tentar adicionar mensagem sem conversa ativa não altera nenhum histórico.
- Adicionar mensagem com conversa ativa altera somente o histórico correto.

### Fase 3. Integração da interface e do fluxo de mensagens

**Tarefas**

- Adaptar `MessageList` para exibir as mensagens da conversa ativa.
- Adaptar `ChatInput` e o fluxo de envio para usar a ação da store.
- Manter todas as propriedades do tipo `Message` (`id`, `text` e `sender`).
- Garantir que trocar de conversa atualize imediatamente o histórico exibido.
- Garantir que mensagens de uma conversa não vazem para outra.
- Criar ou adaptar o componente de sidebar.
- Adicionar o botão de nova conversa.
- Listar as conversas em ordem de criação, da mais antiga para a mais recente.
- Exibir o UUID de cada conversa.
- Indicar visualmente a conversa ativa.
- Adicionar um botão ou ícone de excluir em cada item da lista.
- Associar o botão de excluir exclusivamente à conversa do item correspondente.
- Implementar a seleção de conversa pelo item do sidebar.
- Após excluir, retornar ao estado sem conversa ativa, sem selecionar outra conversa.
- Implementar o empty state inicial e após exclusão.
- Desabilitar o campo, o botão de envio e os demais controles quando não houver conversa ativa.
- Aplicar opacidade de 50% ao bloco de input, mantendo o bloqueio semântico dos controles.

**Aceite da fase**

- Uma mensagem enviada aparece na conversa ativa.
- Ao trocar de conversa, somente o histórico selecionado é exibido.
- Uma mensagem criada em uma conversa não aparece em nenhuma outra.
- O fluxo atual de remetente e envio continua funcionando quando há conversa ativa.
- O usuário consegue criar uma conversa diretamente pelo sidebar.
- Cada conversa aparece uma única vez e na ordem correta de criação.
- O UUID exibido corresponde ao ID armazenado na store.
- O item ativo possui indicação visual e semântica clara.
- O botão de excluir de um item remove somente a conversa correspondente.
- Após qualquer exclusão, nenhuma conversa fica ativa e o empty state pode ser exibido.
- Ao abrir a aplicação, o texto `Crie ou selecione uma conversa` é exibido.
- O campo, o botão de envio e os controles relacionados não podem ser usados sem conversa ativa.
- A opacidade de 50% é visível no bloco de input.
- Depois de criar ou selecionar uma conversa, o input é habilitado.
- Depois de excluir uma conversa, o input volta a ficar desabilitado.

### Fase 4. Responsividade e layout

**Tarefas**

- Manter o sidebar fixo à esquerda em desktop.
- Manter a área de chat centralizada com `max-w-2xl` em desktop.
- Criar o botão hamburger no canto superior esquerdo para mobile.
- Implementar abertura e fechamento do sidebar mobile.
- Fechar automaticamente o sidebar ao criar uma conversa no mobile.
- Fechar automaticamente o sidebar ao selecionar uma conversa no mobile.
- Garantir que o sidebar não bloqueie permanentemente a área principal em telas pequenas.

**Aceite da fase**

- Em desktop, o sidebar permanece visível à esquerda e o chat fica centralizado com a largura máxima definida.
- Em mobile, o sidebar pode ser aberto e fechado pelo botão hamburger.
- Criar uma conversa no mobile fecha o sidebar automaticamente.
- Selecionar uma conversa no mobile fecha o sidebar automaticamente.
- O conteúdo principal permanece acessível nos estados aberto e fechado.

### Fase 5. Testes e validação final

**Tarefas**

- Criar ou atualizar testes da store para estado inicial, criação, seleção, exclusão e inclusão de mensagens.
- Validar o isolamento dos históricos.
- Validar o retorno ao empty state após exclusão.
- Validar o bloqueio do input sem conversa ativa.
- Validar o comportamento de fechamento do sidebar mobile, quando houver infraestrutura de teste disponível.
- Executar `npm run lint`.
- Executar `npm run build`.
- Revisar a implementação para confirmar que não há persistência acidental.

**Aceite da fase**

- Os testes automatizados disponíveis para a funcionalidade passam.
- `npm run lint` termina sem erros.
- `npm run build` termina sem erros.
- Os critérios de aceite CA-01 a CA-10 estão cobertos por testes ou validação manual documentada.
- Não há armazenamento persistente ou integração backend introduzida pela funcionalidade.

## 10. Riscos e decisões

- **Perda de dados:** é intencional, pois não haverá persistência nesta funcionalidade.
- **IDs longos:** como o próprio UUID será exibido, a interface deve acomodar texto extenso sem quebrar o layout; truncamento visual pode ser usado somente se o ID completo continuar acessível.
- **Exclusão sem confirmação:** este PRD não exige modal ou confirmação. A implementação pode adicionar uma confirmação se o padrão visual do projeto exigir, mas a ação final deve sempre retornar ao empty state.
- **Conversas vazias:** devem permanecer na lista normalmente, pois são conversas válidas criadas pelo usuário.

## 11. Definição de pronto

A funcionalidade estará pronta quando:

- todos os critérios de aceite forem atendidos;
- os históricos forem isolados por conversa;
- a criação, seleção e exclusão funcionarem em desktop e mobile;
- o estado inicial e o estado após exclusão forem sem conversa ativa;
- o input respeitar o estado de conversa ativa;
- a store estiver em `src/stores` e usar Zustand;
- `npm run lint` e `npm run build` forem executados com sucesso;
- não houver persistência acidental em `localStorage`, backend ou outro armazenamento externo.
