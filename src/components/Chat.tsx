import { useState } from 'react'
import type { Message } from '../types/message'
import MessageList from './MessageList'

export default function Chat() {
  const [messages] = useState<Message[]>([])

  return (
    <div className="min-h-dvh bg-stone-200">
      <div className="mx-auto flex h-dvh max-w-2xl flex-col">
        <MessageList messages={messages} />
      </div>
    </div>
  )
}
