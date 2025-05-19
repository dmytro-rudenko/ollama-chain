import { ChatRequest } from "ollama";

export type ChatRequestBase = ChatRequest & { stream: false };
export type ChatRequestStream = ChatRequest & { stream: true };
export type ResponseFormat = 'json' | object;
export type API = {
    chat: (query: ChatRequestBase) => Promise<any>;
    stream: (query: ChatRequestStream) => AsyncGenerator<any>;
    execute: (query: ChatRequestStream | ChatRequestBase) => Promise<any>;
    toQuery: (options?: object) => ChatRequest;
    setLanguage?: (language: string) => API;
    model: (modelName: string) => API;
    systemMessage: (message: string) => API;
    userMessage: (message: string) => API;
    logger: (log?: boolean) => API;
    format: (format?: ResponseFormat) => API;
    keepAlive: (param: string | number) => API;
    getHistory: () => any[];
}