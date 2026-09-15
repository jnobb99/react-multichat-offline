import type { Message } from '../types/message'

type MessageBubbleProps = {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] min-w-0 wrap-break-word rounded-2xl px-4 py-3 text-[15px] leading-6 shadow-sm whitespace-pre-wrap ${isUser
        ? 'rounded-br-md bg-[#18201f] text-stone-50 shadow-stone-900/10'
        : 'rounded-bl-md border border-stone-200 bg-white text-stone-800'
        }`}>
        {message.text}
      </div>
    </div>
  )
}
