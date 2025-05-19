import OllamaChain from "../lib/ollama-chain";

const main = async () => {
    const ollamachain = OllamaChain();

    const response = await ollamachain()
        .model("gemma3:4b")
        .logger(true)
        .setLanguage("ukr")
        .systemMessage("You are a helpful assistant.")
        .userMessage("Write a short story about a cat. 2-3 sentences.")
        .stream({ temperature: 0.7, top_p: 0.9 });

    let responseText = "";

    for await (const chunk of response) {
        responseText += chunk.message?.content || "";
        console.log("responseText:", responseText);
    }

    console.log("Response finished.");

}

main()