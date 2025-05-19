import OllamaChain from "../index";

const main = async () => {
    const ollamachain = OllamaChain();

    const response = await ollamachain()
        .model("gemma3:4b")
        .systemMessage("You are a helpful assistant.")
        .userMessage("What is the capital of France?")
        .stream({ temperature: 0.7, top_p: 0.9 });

    let responseText = "";

    for await (const chunk of response) {
        responseText += chunk.message?.content || "";
        console.log("responseText:", responseText);
    }
    console.log("Response finished.");

    // responseText: The
    // responseText: The capital
    // responseText: The capital of
    // responseText: The capital of France
    // responseText: The capital of France is
    // responseText: The capital of France is **
    // responseText: The capital of France is **Paris
    // responseText: The capital of France is **Paris**.
    // responseText: The capital of France is **Paris**. 😊
    // responseText: The capital of France is **Paris**. 😊 
    // responseText: The capital of France is **Paris**. 😊 


    // responseText: The capital of France is **Paris**. 😊 

    // Do
    // responseText: The capital of France is **Paris**. 😊 

    // Do you
    // responseText: The capital of France is **Paris**. 😊 

    // Do you want
    // responseText: The capital of France is **Paris**. 😊 

    // Do you want to
    // responseText: The capital of France is **Paris**. 😊 

    // Do you want to know
    // responseText: The capital of France is **Paris**. 😊 

    // Do you want to know anything
    // responseText: The capital of France is **Paris**. 😊 

    // Do you want to know anything more
    // responseText: The capital of France is **Paris**. 😊 

    // Do you want to know anything more about
    // responseText: The capital of France is **Paris**. 😊 

    // Do you want to know anything more about Paris
    // responseText: The capital of France is **Paris**. 😊 

    // Do you want to know anything more about Paris,
    // responseText: The capital of France is **Paris**. 😊 

    // Do you want to know anything more about Paris, or
    // responseText: The capital of France is **Paris**. 😊 

    // Do you want to know anything more about Paris, or would
    // responseText: The capital of France is **Paris**. 😊 

    // Do you want to know anything more about Paris, or would you
    // responseText: The capital of France is **Paris**. 😊 

    // Do you want to know anything more about Paris, or would you like
    // responseText: The capital of France is **Paris**. 😊 

    // Do you want to know anything more about Paris, or would you like to
    // responseText: The capital of France is **Paris**. 😊 

    // Do you want to know anything more about Paris, or would you like to ask
    // responseText: The capital of France is **Paris**. 😊 

    // Do you want to know anything more about Paris, or would you like to ask me
    // responseText: The capital of France is **Paris**. 😊 

    // Do you want to know anything more about Paris, or would you like to ask me another
    // responseText: The capital of France is **Paris**. 😊 

    // Do you want to know anything more about Paris, or would you like to ask me another question
    // responseText: The capital of France is **Paris**. 😊 

    // Do you want to know anything more about Paris, or would you like to ask me another question?
    // responseText: The capital of France is **Paris**. 😊 

    // Do you want to know anything more about Paris, or would you like to ask me another question?
    // Response finished.
};

main();