import { useRef, useState } from 'react'

type ChatInputProps = {
  onSend: (text: string) => void
}

const MAX_TEXTAREA_HEIGHT = 144

export default function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const canSend = text.trim() !== ''

  function adjustTextareaHeight() {
    const textarea = textareaRef.current
    if (!textarea) return

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
    if (!canSend) return
    onSend(text)
    resetTextarea()
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key.toLowerCase() === 'enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="px-4 pb-4">
      <div className="rounded-lg border border-stone-200 bg-white p-3 shadow-md">
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(event) => {
              setText(event.target.value)
              adjustTextareaHeight()
            }}
            onKeyDown={handleKeyDown}
            placeholder="Digite uma mensagem..."
            rows={1}
            className="max-h-36 min-h-10 flex-1 resize-none bg-transparent px-1 py-2 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            className="rounded bg-stone-800 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}
