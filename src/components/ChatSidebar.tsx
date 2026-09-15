type ChatSidebarProps = {
    chatIds: string[]
    activeChatId: string | null
    isOpen: boolean
    onCreateChat: () => void
    onSelectChat: (chatId: string) => void
    onClose: () => void
}

export default function ChatSidebar({
    chatIds,
    activeChatId,
    isOpen,
    onCreateChat,
    onSelectChat,
    onClose,
}: ChatSidebarProps) {
    return (
        <>
            {isOpen && (
                <button
                    type="button"
                    aria-label="Fechar menu"
                    onClick={onClose}
                    className="fixed inset-0 z-10 bg-black/30 md:hidden"
                />
            )}
            <aside
                className={`fixed inset-y-0 left-0 z-20 flex w-72 flex-col bg-stone-900 p-4 text-stone-100 transition-transform duration-200 md:static md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-lg font-semibold">Conversas</h1>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md px-2 py-1 text-xl text-stone-300 hover:bg-stone-800 md:hidden"
                        aria-label="Fechar menu"
                    >
                        ×
                    </button>
                </div>

                <button
                    type="button"
                    onClick={onCreateChat}
                    className="mb-4 rounded-lg bg-stone-100 px-3 py-2 text-left font-medium text-stone-900 transition-colors hover:bg-white"
                >
                    + Nova conversa
                </button>

                <nav aria-label="Lista de conversas" className="flex flex-col gap-1 overflow-y-auto">
                    {chatIds.map((chatId) => (
                        <button
                            key={chatId}
                            type="button"
                            onClick={() => onSelectChat(chatId)}
                            className={`truncate rounded-lg px-3 py-2 text-left text-sm transition-colors ${chatId === activeChatId
                                    ? 'bg-stone-700 text-white'
                                    : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                                }`}
                        >
                            {chatId}
                        </button>
                    ))}
                </nav>
            </aside>
        </>
    )
}