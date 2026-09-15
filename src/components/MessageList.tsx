import { useEffect, useRef } from 'react'
import type { Message } from '../types/message'
import MessageBubble from './MessageBubble'

type MessageListProps = {
  messages: Message[]
  hasActiveChat?: boolean
}

export default function MessageList({ messages, hasActiveChat = true }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!hasActiveChat) {
    return (
      <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-6">
        <div className="flex min-h-full items-center justify-center">
          <p className="text-center text-stone-600">Crie ou selecione uma conversa</p>
        </div>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-6">
        <div className="flex min-h-full items-center justify-center">
          <p className="text-center text-stone-600">Nenhuma mensagem ainda. Envie a primeira!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto p-4 pb-6">
      <div className="flex flex-col gap-2">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
