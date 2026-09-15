import { create } from 'zustand'
import type { Message } from '../types/message'

type ChatStore = {
    chats: Record<string, Message[]>
    activeChatId: string | null
    createChat: () => void
    selectChat: (chatId: string) => void
    addMessage: (message: Message) => void
}

export const useChatStore = create<ChatStore>((set) => ({
    chats: {},
    activeChatId: null,

    createChat: () => {
        const chatId = crypto.randomUUID()

        set((state) => ({
            chats: { ...state.chats, [chatId]: [] },
            activeChatId: chatId,
        }))
    },

    selectChat: (chatId) => {
        set((state) => {
            if (!Object.hasOwn(state.chats, chatId)) return state

            return { activeChatId: chatId }
        })
    },

    addMessage: (message) => {
        set((state) => {
            if (!state.activeChatId) return state

            return {
                chats: {
                    ...state.chats,
                    [state.activeChatId]: [...state.chats[state.activeChatId], message],
                },
            }
        })
    },
}))