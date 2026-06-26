import type { Message } from '../types/message'

type MessageBubbleProps = {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-[80%] min-w-0 wrap-break-word rounded-lg bg-white px-4 py-2.5 text-stone-800 shadow-sm whitespace-pre-wrap">
        {message.text}
      </div>
    </div>
  )
}
