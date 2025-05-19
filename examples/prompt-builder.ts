import OllamaChain from "../lib/ollama-chain";

const main = async () => {
    const ollamachain = OllamaChain();

    const query = ollamachain()
        .model("gemma3:4b")
        .logger(true)
        .setLanguage("ukr")
        .shortResponse()
        .systemMessage("You are a helpful assistant.")
        .userMessage("Tell me a interesting facts about England.")

    const response = await query
        .stream({ temperature: 0.7, top_p: 0.9 });

    let responseText = "";

    for await (const chunk of response) {
        responseText += chunk.message?.content || "";
        console.log("responseText:", responseText);
    }

    console.clear();
    console.log("Query:", query.toQuery());
    console.log("Final response:", responseText);

}

main()