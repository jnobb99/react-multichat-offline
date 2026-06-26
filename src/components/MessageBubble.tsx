import type { Message } from '../types/message'

type MessageBubbleProps = {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] min-w-0 break-words rounded-lg px-3 py-2 whitespace-pre-wrap ${isUser ? 'bg-gray-100' : 'bg-white'}`}
      >
        {message.text}
      </div>
    </div>
  )
}
