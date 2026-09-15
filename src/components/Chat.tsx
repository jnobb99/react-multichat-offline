import { useState } from 'react'
import type { Message, Sender } from '../types/message'
import { useChatStore } from '../stores/chatStore'
import ChatSidebar from './ChatSidebar'
import ChatInput from './ChatInput'
import MessageList from './MessageList'

export default function Chat() {
  const [sender, setSender] = useState<Sender>('user')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { conversations, activeChatId, createConversation, selectConversation, addMessage } = useChatStore()

  const activeConversation = conversations.find((conversation) => conversation.id === activeChatId) ?? null
  const messages = activeConversation?.messages ?? []

  function handleSend(text: string) {
    const trimmedText = text.trim()

    if (!trimmedText || !activeChatId) {
      return
    }

    const message: Message = {
      id: crypto.randomUUID(),
      text: trimmedText,
      sender,
    }

    addMessage(message)
  }

  function handleToggleSender() {
    setSender((currentSender) => (currentSender === 'user' ? 'robot' : 'user'))
  }

  return (
    <div className="h-dvh overflow-hidden bg-[#eeeae1] md:grid md:grid-cols-[18rem_minmax(0,1fr)]">
      {!isSidebarOpen && (
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="fixed left-4 top-4 z-30 rounded-xl border border-white/10 bg-[#18201f] px-3 py-2 text-xl text-white shadow-xl shadow-stone-900/20 transition-transform hover:scale-105 md:hidden"
          aria-label="Abrir menu de conversas"
          aria-expanded={false}
          aria-controls="chat-sidebar"
        >
          ☰
        </button>
      )}

      <ChatSidebar
        chatIds={conversations.map((conversation) => conversation.id)}
        activeChatId={activeChatId}
        isOpen={isSidebarOpen}
        onCreateChat={() => {
          createConversation()
          setIsSidebarOpen(false)
        }}
        onSelectChat={(chatId) => {
          selectConversation(chatId)
          setIsSidebarOpen(false)
        }}
        onDeleteChat={(chatId) => {
          useChatStore.getState().deleteConversation(chatId)
        }}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="mx-auto flex h-dvh min-h-0 w-full max-w-2xl flex-col border-x border-stone-300/70 bg-[#f5f2eb] pt-20 shadow-[0_0_60px_rgba(70,63,52,0.06)] md:pt-0">
        <MessageList messages={messages} hasActiveChat={activeChatId !== null} />
        <ChatInput
          sender={sender}
          disabled={!activeChatId}
          onToggleSender={handleToggleSender}
          onSend={handleSend}
        />
      </main>
    </div>
  )
}
