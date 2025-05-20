import OllamaChain from "ollama-chain";

const main = async () => {
    const ollamachain = OllamaChain();

    const query = ollamachain()
        .model("gemma3:4b")
        .logger(true)
        .stepByStep()
        .systemMessage("You are a math expert.")
        .userMessage("Tell me how to solve the equation 2x + 3 = 7.")

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