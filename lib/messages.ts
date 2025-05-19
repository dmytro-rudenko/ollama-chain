import { MessageType } from "./enums";

const Messages = {
    createSystemMessage: (message: string) => ({
        role: MessageType.SYSTEM,
        content: message,
    }),
    createUserMessage: (message: string) => ({
        role: MessageType.USER,
        content: message,
    }),
    createAssistantMessage: (message: string) => ({
        role: MessageType.ASSISTANT,
        content: message,
    }),
}

export default Messages;