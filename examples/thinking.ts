import OllamaChain from "ollama-chain";

const main = async () => {
    const ollamachain = OllamaChain();

    const query = ollamachain()
        .model("gemma3:4b")
        .logger(true)
        .thinking()
        .systemMessage("You are a senior javascript developer.")
        .userMessage("Write best practices for writing clean code.")

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