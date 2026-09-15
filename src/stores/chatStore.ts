import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Conversation } from '../types/conversation'
import type { Message } from '../types/message'

type ChatStore = {
    conversations: Conversation[]
    activeChatId: string | null
    createConversation: () => void
    createChat: () => void
    selectConversation: (chatId: string) => void
    selectChat: (chatId: string) => void
    deleteConversation: (chatId: string) => void
    deleteChat: (chatId: string) => void
    addMessage: (message: Message) => void
}

export const useChatStore = create<ChatStore>()(
    persist(
        (set, get) => ({
            conversations: [],
            activeChatId: null,

            createConversation: () => {
                const conversationId = crypto.randomUUID()

                set((state) => ({
                    conversations: [...state.conversations, { id: conversationId, messages: [] }],
                    activeChatId: conversationId,
                }))
            },

            createChat: () => {
                get().createConversation()
            },

            selectConversation: (chatId) => {
                set((state) => {
                    const exists = state.conversations.some((conversation) => conversation.id === chatId)

                    if (!exists) {
                        return state
                    }

                    return { activeChatId: chatId }
                })
            },

            selectChat: (chatId) => {
                get().selectConversation(chatId)
            },

            deleteConversation: (chatId) => {
                set((state) => ({
                    conversations: state.conversations.filter((conversation) => conversation.id !== chatId),
                    activeChatId: null,
                }))
            },

            deleteChat: (chatId) => {
                get().deleteConversation(chatId)
            },

            addMessage: (message) => {
                set((state) => {
                    if (!state.activeChatId) {
                        return state
                    }

                    const conversations = state.conversations.map((conversation) => {
                        if (conversation.id !== state.activeChatId) {
                            return conversation
                        }

                        return {
                            ...conversation,
                            messages: [...conversation.messages, message],
                        }
                    })

                    return { conversations }
                })
            },
        }),
        {
            name: 'chat-storage',
            partialize: (state) => ({ conversations: state.conversations }),
        },
    ),
)