import { ChatRequestBase } from "lib/types";
import OllamaChain from "../index";

const main = async () => {
    const ollamachain = OllamaChain();

    const query = ollamachain()
        .logger(true)
        .model("gemma3:4b")
        .format("json")
        .systemMessage("You are a helpful assistant. Please answer the question. Respond in JSON format. Do not include any other text.")
        .userMessage("What is the capital of France?")
        .toQuery({ temperature: 0.7 });

    const response = await ollamachain().execute(query as ChatRequestBase);

    console.log("Response:", response);

    // OLLAMA QUERY: {
    //   model: 'gemma3:4b',
    //   messages: [
    //     {
    //       role: 'system',
    //       content: 'You are a helpful assistant. Please answer the question. Respond in JSON format. Do not include any other text.'
    //     },
    //     { role: 'user', content: 'What is the capital of France?' }
    //   ],
    //   stream: false,
    //   options: { temperature: 0.7 },
    //   format: 'json'
    // }
    // Response: {
    //   model: 'gemma3:4b',
    //   created_at: '2025-05-15T13:41:14.449401406Z',
    //   message: { role: 'assistant', content: '{"answer": "Paris"}' },
    //   done_reason: 'stop',
    //   done: true,
    //   total_duration: 1264093886,
    //   load_duration: 47085509,
    //   prompt_eval_count: 44,
    //   prompt_eval_duration: 130557521,
    //   eval_count: 7,
    //   eval_duration: 922187520
    // }
};

main();