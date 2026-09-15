import { useState } from 'react'
import type { Message, Sender } from '../types/message'
import { useChatStore } from '../stores/chatStore'
import ChatSidebar from './ChatSidebar'
import ChatInput from './ChatInput'
import MessageList from './MessageList'

export default function Chat() {
  const [sender, setSender] = useState<Sender>('user')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { chats, activeChatId, createChat, selectChat, addMessage } = useChatStore()
  const messages = activeChatId ? chats[activeChatId] : []
  const chatIds = Object.keys(chats)

  function handleSend(text: string) {
    const trimmedText = text.trim()
    if (!trimmedText) return

    const message: Message = {
      id: crypto.randomUUID(),
      text: trimmedText,
      sender,
    }

    addMessage(message)
  }

  function handleToggleSender() {
    setSender(sender === 'user' ? 'robot' : 'user')
  }

  return (
    <div className="flex min-h-dvh bg-stone-200">
      <button
        type="button"
        onClick={() => setIsSidebarOpen(true)}
        className="fixed left-4 top-4 z-10 rounded-lg bg-stone-900 px-3 py-2 text-xl text-white shadow-md md:hidden"
        aria-label="Abrir menu de conversas"
      >
        ☰
      </button>
      <ChatSidebar
        chatIds={chatIds}
        activeChatId={activeChatId}
        isOpen={isSidebarOpen}
        onCreateChat={() => {
          createChat()
          setIsSidebarOpen(false)
        }}
        onSelectChat={(chatId) => {
          selectChat(chatId)
          setIsSidebarOpen(false)
        }}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="mx-auto flex h-dvh w-full max-w-2xl flex-col">
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
