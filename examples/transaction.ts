import OllamaChain from "ollama-chain";

async function main() {
    const opts = {
        temperature: 0
    }

    const ollamachain = OllamaChain();

    const chain = ollamachain()
        .model("gemma3:4b")
        .systemMessage("You are a helpful assistant.")
        .userMessage("Hello!")
        .assistantMessage("Hello! How can I help you today?")
        .userMessage("What is the largest city?");

    chain.trx();

    chain.assistantMessage("The largest city in the world by population is Tokyo.");
    chain.userMessage("And what about the capital?");

    let response = await chain.chat(opts);
    console.log("First response:", response.message?.content);

    if (!response.message?.content?.toLowerCase().includes("paris")) {
        console.log("Result is unsatisfactory, rolling back and clarifying the question...");
        chain.rollback();

        chain.assistantMessage("Could you clarify which country you mean?");
        chain.userMessage("In France. What is the largest city and its capital?");

        response = await chain.chat(opts);
        console.log("Second response:", response.message?.content);
    } else {
        console.log("Result is satisfactory.");
    }

    // First response: That’s a great follow-up question! The capital of the world depends on what you’re considering. 

    // *   **For the United States:** Washington, D.C. is the capital.
    // *   **For China:** Beijing is the capital.
    // *   **For Japan:** Tokyo is the capital *and* the largest city.
    // *   **For many other countries:** The capital city is the seat of government.

    // Do you want to know the capital of a specific country, or are you just curious about capitals in general?
    // Result is unsatisfactory, rolling back and clarifying the question...
    // Second response: Okay, great question!

    // *   **Largest City:** Paris is the largest city in France.
    // *   **Capital:** Paris is also the capital of France. 

    // It’s a pretty neat coincidence that the two are the same! 😊

    // Is there anything else you’d like to know about France or Paris?
}

main().catch(console.error);
