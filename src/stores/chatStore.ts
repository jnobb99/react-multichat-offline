import { create } from 'zustand'
import type { Conversation } from '../types/conversation'
import type { Message } from '../types/message'

type ChatStore = {
    conversations: Conversation[]
    chats: Record<string, Message[]>
    activeChatId: string | null
    createConversation: () => void
    createChat: () => void
    selectConversation: (chatId: string) => void
    selectChat: (chatId: string) => void
    deleteConversation: (chatId: string) => void
    deleteChat: (chatId: string) => void
    addMessage: (message: Message) => void
}

const mapConversationsToChats = (conversations: Conversation[]) =>
    Object.fromEntries(conversations.map((conversation) => [conversation.id, conversation.messages]))

export const useChatStore = create<ChatStore>((set, get) => ({
    conversations: [],
    chats: {},
    activeChatId: null,

    createConversation: () => {
        const conversationId = crypto.randomUUID()

        set((state) => {
            const conversations = [...state.conversations, { id: conversationId, messages: [] }]

            return {
                conversations,
                chats: mapConversationsToChats(conversations),
                activeChatId: conversationId,
            }
        })
    },

    createChat: () => {
        get().createConversation()
    },

    selectConversation: (chatId) => {
        set((state) => {
            const exists = state.conversations.some((conversation) => conversation.id === chatId)
            if (!exists) return state

            return { activeChatId: chatId }
        })
    },

    selectChat: (chatId) => {
        get().selectConversation(chatId)
    },

    deleteConversation: (chatId) => {
        set((state) => {
            const conversations = state.conversations.filter((conversation) => conversation.id !== chatId)

            return {
                conversations,
                chats: mapConversationsToChats(conversations),
                activeChatId: null,
            }
        })
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

            return {
                conversations,
                chats: mapConversationsToChats(conversations),
            }
        })
    },
}))