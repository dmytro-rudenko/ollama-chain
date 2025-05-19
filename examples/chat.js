"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const main = async () => {
    const ollamachain = (0, index_1.default)();
    const response = await ollamachain()
        .logger(true)
        .model("gemma3:4b")
        .format('json')
        .systemMessage("You are a helpful assistant.")
        .userMessage("What is the capital of France?")
        .chat({ temperature: 0.7 });
    console.log("Response:", response);
    // OLLAMA QUERY: {
    //   model: 'gemma3:4b',
    //   messages: [
    //     { role: 'system', content: 'You are a helpful assistant.' },
    //     { role: 'user', content: 'What is the capital of France?' }
    //   ],
    //   stream: false,
    //   options: { temperature: 0.7 },
    //   format: 'json'
    // }
    // Response: {
    //   model: 'gemma3:4b',
    //   created_at: '2025-05-15T13:43:00.753846724Z',
    //   message: { role: 'assistant', content: '{ }' },
    //   done_reason: 'stop',
    //   done: true,
    //   total_duration: 1900922948,
    //   load_duration: 49537683,
    //   prompt_eval_count: 27,
    //   prompt_eval_duration: 1232217840,
    //   eval_count: 3,
    //   eval_duration: 472445770
    // }
};
main();
//# sourceMappingURL=chat.js.map