import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Message } from '../types/message'
import { useChatStore } from './chatStore'

const firstConversationId = '11111111-1111-4111-8111-111111111111'
const secondConversationId = '22222222-2222-4222-8222-222222222222'

function message(id: string, text: string): Message {
    return { id, text, sender: 'user' }
}

describe('useChatStore', () => {
    beforeEach(() => {
        useChatStore.setState({ conversations: [], activeChatId: null })
        vi.spyOn(crypto, 'randomUUID')
            .mockReturnValueOnce(firstConversationId)
            .mockReturnValueOnce(secondConversationId)
    })

    it('starts without conversations or an active chat', () => {
        expect(useChatStore.getState()).toMatchObject({
            conversations: [],
            activeChatId: null,
        })
    })

    it('creates UUID conversations in order and activates the new one', () => {
        useChatStore.getState().createConversation()
        useChatStore.getState().createConversation()

        expect(useChatStore.getState().conversations).toEqual([
            { id: firstConversationId, messages: [] },
            { id: secondConversationId, messages: [] },
        ])
        expect(useChatStore.getState().activeChatId).toBe(secondConversationId)
    })

    it('selects an existing conversation without changing its history', () => {
        useChatStore.getState().createConversation()
        useChatStore.getState().createConversation()
        useChatStore.getState().selectConversation(firstConversationId)

        expect(useChatStore.getState().activeChatId).toBe(firstConversationId)
        expect(useChatStore.getState().conversations).toEqual([
            { id: firstConversationId, messages: [] },
            { id: secondConversationId, messages: [] },
        ])
    })

    it('adds messages only to the active conversation', () => {
        useChatStore.getState().createConversation()
        useChatStore.getState().createConversation()
        useChatStore.getState().addMessage(message('message-2', 'segunda'))
        useChatStore.getState().selectConversation(firstConversationId)
        useChatStore.getState().addMessage(message('message-1', 'primeira'))

        expect(useChatStore.getState().conversations).toEqual([
            { id: firstConversationId, messages: [message('message-1', 'primeira')] },
            { id: secondConversationId, messages: [message('message-2', 'segunda')] },
        ])
    })

    it('does not add a message without an active conversation', () => {
        const pendingMessage = message('message-1', 'sem conversa')

        useChatStore.getState().addMessage(pendingMessage)

        expect(useChatStore.getState().conversations).toEqual([])
    })

    it('deletes the requested conversation and clears the active chat', () => {
        useChatStore.getState().createConversation()
        useChatStore.getState().createConversation()
        useChatStore.getState().deleteConversation(firstConversationId)

        expect(useChatStore.getState()).toMatchObject({
            conversations: [{ id: secondConversationId, messages: [] }],
            activeChatId: null,
        })
    })
})
