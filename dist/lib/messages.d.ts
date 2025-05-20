import { MessageType } from "./enums";
declare const Messages: {
    createSystemMessage: (message: string) => {
        role: MessageType;
        content: string;
    };
    createUserMessage: (message: string) => {
        role: MessageType;
        content: string;
    };
    createAssistantMessage: (message: string) => {
        role: MessageType;
        content: string;
    };
};
export default Messages;
