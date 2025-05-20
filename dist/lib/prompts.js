"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prompts = {
    setLanguage: (language) => {
        return 'Use "' + language + '" as the language for the conversation. Do not use any other language. Whatever the query language is, still respond to the query in "' + language + '" language. Do not use any other language. Do not respond in English or any other language. Just respond in "' + language + '" language.';
    },
    detailedResponse: () => {
        return 'Provide a detailed response to the user\'s query. Do not provide a short or vague response. Provide as much detail as possible.';
    },
    shortResponse: () => {
        return 'Provide a short response to the user\'s query. Do not provide a detailed or lengthy response. Provide only the most important information.';
    },
    stepByStep: () => {
        return `Let's think step by step. Break down the problem into smaller parts and solve each part one by one. This will help us understand the problem better and find a solution more easily.`;
    },
    thinking: () => {
        return 'Write your thought process. Do not answer the question directly. Just write your thought process and reasoning. Then answer the question.';
    }
};
exports.default = prompts;
//# sourceMappingURL=prompts.js.map