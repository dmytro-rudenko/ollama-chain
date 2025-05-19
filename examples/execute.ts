import { ChatRequestBase } from "ollama-chain/lib/types";
import OllamaChain from "ollama-chain";

const main = async () => {
    const ollamachain = OllamaChain();

    const query = ollamachain()
        .logger(true)
        .model("gemma3:4b")
        .format("json")
        .systemMessage("You are a helpful assistant. Please answer the question.")
        .systemMessage("Respond in JSON format.")
        .systemMessage("Do not include any other text.")
        .userMessage("What is the capital of France?")
        .toQuery({ temperature: 0.7 });

    const response = await ollamachain().execute(query as ChatRequestBase);

    console.log("Response:", response);

    // OLLAMA QUERY: {
    //     model: 'gemma3:4b',
    //     messages: [
    //         {
    //         role: 'system',
    //         content: 'You are a helpful assistant. Please answer the question. \n' +
    //             'Respond in JSON format. \n' +
    //             'Do not include any other text.'
    //         },
    //         { role: 'user', content: 'What is the capital of France?' }
    //     ],
    //     stream: false,
    //     options: { temperature: 0.7 },
    //     format: 'json'
    //     }
    //     Response: {
    //     model: 'gemma3:4b',
    //     created_at: '2025-05-19T11:56:22.427652019Z',
    //     message: { role: 'assistant', content: '{"answer": "Paris"}' },
    //     done_reason: 'stop',
    //     done: true,
    //     total_duration: 6420784293,
    //     load_duration: 1745424762,
    //     prompt_eval_count: 48,
    //     prompt_eval_duration: 3542935038,
    //     eval_count: 7,
    //     eval_duration: 958852483
    //     }
};

main();