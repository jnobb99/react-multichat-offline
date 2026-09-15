import { useRef, useState, type KeyboardEvent } from 'react'
import type { Sender } from '../types/message'
import SenderToggle from './SenderToggle'

type ChatInputProps = {
  sender: Sender
  disabled?: boolean
  onToggleSender: () => void
  onSend: (text: string) => void
}

const MAX_TEXTAREA_HEIGHT = 144

export default function ChatInput({ sender, disabled = false, onToggleSender, onSend }: ChatInputProps) {
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const canSend = !disabled && text.trim() !== ''

  function adjustTextareaHeight() {
    const textarea = textareaRef.current

    if (!textarea) {
      return
    }

    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`
  }

  function resetTextarea() {
    setText('')

    const textarea = textareaRef.current

    if (textarea) {
      textarea.style.height = 'auto'
    }
  }

  function handleSend() {
    if (!canSend) {
      return
    }

    onSend(text)
    resetTextarea()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  const isUser = sender === 'user'

  return (
    <div className={`px-4 pb-5 transition-opacity ${disabled ? 'opacity-50' : ''}`} aria-disabled={disabled}>
      <div
        className={`rounded-2xl border bg-white p-3 shadow-[0_12px_30px_rgba(70,63,52,0.08)] transition-colors duration-200 ${isUser ? 'border-stone-300' : 'border-teal-400'
          }`}
      >
        <div className="flex items-end gap-3">
          <SenderToggle sender={sender} onToggle={onToggleSender} disabled={disabled} />

          <textarea
            ref={textareaRef}
            value={text}
            onChange={(event) => {
              setText(event.target.value)
              adjustTextareaHeight()
            }}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Digite uma mensagem..."
            rows={1}
            className="max-h-36 min-h-10 flex-1 resize-none bg-transparent px-1 py-2 text-[15px] leading-6 text-stone-800 placeholder:text-stone-400 focus:outline-none disabled:cursor-not-allowed"
          />

          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            className="rounded-xl bg-[#18201f] px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Enviar mensagem"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}
