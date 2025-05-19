import ollama, { ChatRequest, Message } from "ollama";
import { ChatRequestStream, ChatRequestBase, ResponseFormat } from "./types";
import { MessageType } from "./enums";
import Messages from "./messages";

const OllamaChain = () => () => {
    let log = false;
    let transaction: Message[] | undefined = undefined;

    const params: ChatRequest & ResponseFormat = {
        model: "",
        messages: [],
        options: {},
    };

    function ensureMessages() {
        if (!params.messages) {
            params.messages = [];
        }
    }

    const api = {
        model(model: string) {
            params.model = model;

            return api;
        },
        systemMessage(message: string, overload?: boolean) {
            ensureMessages();

            const messages = params.messages!;
            const systemMessage = Messages.createSystemMessage(message);

            if (messages[0]?.role === MessageType.SYSTEM) {
                if (overload) {
                    messages[0].content = systemMessage.content;

                    return api;
                }

                messages[0].content = messages[0].content + " \n" + systemMessage.content;
            } else {
                messages.unshift(systemMessage);
            }

            return api;
        },
        userMessage(message: string) {
            ensureMessages();

            params.messages!.push(Messages.createUserMessage(message));
            return api;
        },
        assistantMessage(message: string) {
            ensureMessages();

            params.messages!.push(Messages.createAssistantMessage(message));
            return api;
        },
        trx() {
            if (transaction) {
                throw new Error("Transaction already in progress");
            }

            transaction = params.messages

            return api;
        },
        commit() {
            if (!transaction) {
                throw new Error("No transaction in progress");
            }

            transaction = undefined;

            return api;
        },
        rollback() {
            if (!transaction) {
                throw new Error("No transaction in progress");
            }

            params.messages = transaction;
            transaction = undefined;

            return api;
        },
        format(format?: ResponseFormat) {
            params.format = format;

            return api;
        },
        logger(isActive: boolean = false) {
            log = isActive;

            return api;
        },
        getHistory() {
            return params.messages;
        },
        toQuery(options: object = {}): ChatRequest {
            const query: ChatRequest = {
                model: params.model,
                messages: params.messages,
                stream: params.stream || false,
                options,
            };

            if (params.format) {
                query.format = params.format;
            }

            if (log) {
                console.log("OLLAMA QUERY:", query);
            }

            return query;
        },
        async chat(options: object = {}) {
            if (!params.model) {
                throw new Error("Model must be specified before calling chat()");
            }

            const query = api.toQuery(options) as ChatRequestBase;

            return ollama.chat(query);
        },
        async stream(options: object = {}) {
            if (!params.model) {
                throw new Error("Model must be specified before calling stream()");
            }

            const query = {
                ...api.toQuery(options),
                stream: true,
            } as ChatRequestStream;

            return ollama.chat(query);
        },
        execute: async (query: ChatRequestStream | ChatRequestBase) => {
            if (!query.model) {
                throw new Error("Model must be specified before calling execute()");
            }

            params.model = query.model;

            if (log) {
                console.log("OLLAMA QUERY:", query);
            }

            if (query.stream) {
                return ollama.chat(query as ChatRequestStream);
            }

            return ollama.chat(query);
        }
    };

    return api;
};

export default OllamaChain;