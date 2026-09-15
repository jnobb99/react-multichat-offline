type ChatSidebarProps = {
    chatIds: string[]
    activeChatId: string | null
    isOpen: boolean
    onCreateChat: () => void
    onSelectChat: (chatId: string) => void
    onDeleteChat: (chatId: string) => void
    onClose: () => void
}

export default function ChatSidebar({
    chatIds,
    activeChatId,
    isOpen,
    onCreateChat,
    onSelectChat,
    onDeleteChat,
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
                id="chat-sidebar"
                className={`fixed inset-y-0 left-0 z-20 flex w-72 flex-col overflow-hidden bg-stone-900 p-4 text-stone-100 transition-transform duration-200 md:static md:w-72 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
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
                    className="mb-4 rounded-lg bg-stone-100 px-3 py-1.5 text-left text-sm font-medium text-stone-900 transition-colors hover:bg-white"
                    aria-label="Criar nova conversa"
                >
                    + Nova conversa
                </button>

                <nav aria-label="Lista de conversas" className="min-h-0 flex-1 overflow-y-auto">
                    <div className="flex flex-col gap-2">
                        {chatIds.length === 0 ? (
                            <p className="rounded-lg border border-dashed border-stone-700 px-3 py-2 text-sm text-stone-400">
                                Nenhuma conversa
                            </p>
                        ) : (
                            chatIds.map((chatId) => {
                                const isActive = chatId === activeChatId

                                return (
                                    <div
                                        key={chatId}
                                        className={`flex items-center gap-2 rounded-lg border transition-colors ${isActive
                                            ? 'border-stone-500 bg-stone-700 text-white'
                                            : 'border-transparent bg-stone-800/40 text-stone-300 hover:bg-stone-800 hover:text-white'
                                            }`}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => onSelectChat(chatId)}
                                            aria-pressed={isActive}
                                            aria-label={isActive ? `Conversa ativa ${chatId}` : `Selecionar conversa ${chatId}`}
                                            className="flex-1 truncate px-3 py-2 text-left text-sm"
                                        >
                                            {chatId}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={(event) => {
                                                event.stopPropagation()
                                                onDeleteChat(chatId)
                                            }}
                                            className="mr-2 rounded-md p-1.5 text-stone-300 transition-colors hover:bg-stone-700 hover:text-white"
                                            aria-label={`Excluir conversa ${chatId}`}
                                            title={`Excluir ${chatId}`}
                                        >
                                            ×
                                        </button>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </nav>
            </aside>
        </>
    )
}