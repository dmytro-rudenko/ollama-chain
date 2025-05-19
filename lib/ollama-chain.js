"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ollama_1 = __importDefault(require("ollama"));
const enums_1 = require("./enums");
const messages_1 = __importDefault(require("./messages"));
const prompts_1 = __importDefault(require("./prompts"));
const OllamaChain = () => () => {
    let log = false;
    let transaction = undefined;
    const params = {
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
        model(model) {
            params.model = model;
            return api;
        },
        systemMessage(message, overload) {
            ensureMessages();
            const messages = params.messages;
            const systemMessage = messages_1.default.createSystemMessage(message);
            if (messages[0]?.role === enums_1.MessageType.SYSTEM) {
                if (overload) {
                    messages[0].content = systemMessage.content;
                    return api;
                }
                messages[0].content = messages[0].content + " \n" + systemMessage.content;
            }
            else {
                messages.unshift(systemMessage);
            }
            return api;
        },
        userMessage(message) {
            ensureMessages();
            params.messages.push(messages_1.default.createUserMessage(message));
            return api;
        },
        assistantMessage(message) {
            ensureMessages();
            params.messages.push(messages_1.default.createAssistantMessage(message));
            return api;
        },
        setLanguage(language) {
            ensureMessages();
            api.systemMessage(prompts_1.default.setLanguage(language));
            return api;
        },
        detailedResponse() {
            ensureMessages();
            api.systemMessage(prompts_1.default.detailedResponse());
            return api;
        },
        shortResponse() {
            ensureMessages();
            api.systemMessage(prompts_1.default.shortResponse());
            return api;
        },
        trx() {
            if (transaction) {
                throw new Error("Transaction already in progress");
            }
            transaction = params.messages;
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
        format(format) {
            params.format = format;
            return api;
        },
        logger(isActive = false) {
            log = isActive;
            return api;
        },
        getHistory() {
            return params.messages;
        },
        keepAlive(param) {
            params.keep_alive = param;
            return api;
        },
        toQuery(options = {}) {
            const query = {
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
        async chat(options = {}) {
            if (!params.model) {
                throw new Error("Model must be specified before calling chat()");
            }
            const query = api.toQuery(options);
            return ollama_1.default.chat(query);
        },
        async stream(options = {}) {
            if (!params.model) {
                throw new Error("Model must be specified before calling stream()");
            }
            params.stream = true;
            const query = {
                ...api.toQuery(options),
                stream: params.stream,
            };
            return ollama_1.default.chat(query);
        },
        execute: async (query) => {
            if (!query.model) {
                throw new Error("Model must be specified before calling execute()");
            }
            params.model = query.model;
            if (log) {
                console.log("OLLAMA QUERY:", query);
            }
            if (query.stream) {
                return ollama_1.default.chat(query);
            }
            return ollama_1.default.chat(query);
        }
    };
    return api;
};
exports.default = OllamaChain;
//# sourceMappingURL=ollama-chain.js.map