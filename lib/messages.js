"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
const Messages = {
    createSystemMessage: (message) => ({
        role: enums_1.MessageType.SYSTEM,
        content: message,
    }),
    createUserMessage: (message) => ({
        role: enums_1.MessageType.USER,
        content: message,
    }),
    createAssistantMessage: (message) => ({
        role: enums_1.MessageType.ASSISTANT,
        content: message,
    }),
};
exports.default = Messages;
//# sourceMappingURL=messages.js.map