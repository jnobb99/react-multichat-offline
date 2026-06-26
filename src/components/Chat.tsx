import { useState } from 'react'
import type { Message } from '../types/message'
import ChatInput from './ChatInput'
import MessageList from './MessageList'

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])

  function handleSend(text: string) {
    if (!text.trim()) return

    const message: Message = {
      id: crypto.randomUUID(),
      text,
      sender: 'user',
    }

    setMessages([...messages, message])
  }

  return (
    <div className="min-h-dvh bg-stone-200">
      <div className="mx-auto flex h-dvh max-w-2xl flex-col">
        <MessageList messages={messages} />
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  )
}
