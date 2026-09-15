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
                className={`fixed inset-y-0 left-0 z-20 flex w-72 flex-col overflow-hidden border-r border-white/10 bg-[#18201f] p-4 text-stone-100 shadow-2xl shadow-stone-950/20 transition-transform duration-200 md:static md:w-72 md:translate-x-0 md:shadow-none ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                    }`}
            >
                <div className="mb-8 flex items-start justify-between">
                    <div>
                        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.24em] text-teal-300">Offline studio</p>
                        <h1 className="font-serif text-2xl font-semibold tracking-tight text-stone-50">Conversas</h1>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg px-2 py-1 text-xl text-stone-400 transition-colors hover:bg-white/10 hover:text-white md:hidden"
                        aria-label="Fechar menu"
                    >
                        ×
                    </button>
                </div>

                <button
                    type="button"
                    onClick={onCreateChat}
                    className="mb-5 flex items-center justify-between rounded-xl bg-teal-300 px-4 py-3 text-left text-sm font-bold text-[#18201f] shadow-lg shadow-teal-950/20 transition-transform hover:-translate-y-0.5 hover:bg-teal-200"
                    aria-label="Criar nova conversa"
                >
                    <span>Nova conversa</span>
                    <span aria-hidden="true" className="text-xl leading-none">+</span>
                </button>

                <nav aria-label="Lista de conversas" className="min-h-0 flex-1 overflow-y-auto">
                    <div className="flex flex-col gap-2">
                        {chatIds.length === 0 ? (
                            <p className="rounded-xl border border-dashed border-white/15 px-3 py-3 text-sm leading-relaxed text-stone-500">
                                Seus contextos aparecem aqui.
                            </p>
                        ) : (
                            chatIds.map((chatId) => {
                                const isActive = chatId === activeChatId

                                return (
                                    <div
                                        key={chatId}
                                        className={`flex items-center gap-2 rounded-xl border transition-colors ${isActive
                                            ? 'border-teal-300/60 bg-teal-300/10 text-white shadow-inner shadow-teal-300/5'
                                            : 'border-transparent bg-white/5 text-stone-400 hover:bg-white/8 hover:text-white'
                                            }`}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => onSelectChat(chatId)}
                                            aria-pressed={isActive}
                                            aria-label={isActive ? `Conversa ativa ${chatId}` : `Selecionar conversa ${chatId}`}
                                            className="flex-1 truncate px-3 py-2.5 text-left font-mono text-[11px]"
                                        >
                                            <span className="mr-2 text-teal-300" aria-hidden="true">{isActive ? '●' : '○'}</span>
                                            {chatId}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={(event) => {
                                                event.stopPropagation()
                                                onDeleteChat(chatId)
                                            }}
                                            className="mr-2 rounded-lg p-1.5 text-stone-500 transition-colors hover:bg-rose-400/15 hover:text-rose-200"
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