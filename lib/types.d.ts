import { ChatRequest } from "ollama";
export type ChatRequestBase = ChatRequest & {
    stream: false;
};
export type ChatRequestStream = ChatRequest & {
    stream: true;
};
export type ResponseFormat = 'json' | object;
