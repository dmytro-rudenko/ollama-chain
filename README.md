# ollama-chain

A TypeScript/JavaScript library for building composable, chainable, and transactional chat flows with [Ollama](https://ollama.com/) models. ollama-chain provides a fluent API to construct, manage, and execute chat conversations, including streaming and transaction support. Based on [Ollama Javascript Library](https://www.npmjs.com/package/ollama)

## Features

- **Fluent, chainable API** for building chat prompts
- **System, user, and assistant message management**
- **Streaming and non-streaming responses**
- **Transaction support** (begin, commit, rollback message history)
- **Customizable model, options, and response format**
- **Easy integration with Ollama's API**

## Installation

```
npm install ollama-chain
```

## Usage

### Basic Streaming Example

```typescript
import OllamaChain from "ollama-chain";

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
};

main();
```

### Non-Streaming (Single Response)

```typescript
const response = await ollamachain()
    .model("gemma3:4b")
    .systemMessage("You are a helpful assistant.")
    .userMessage("Tell me a joke.")
    .chat({ temperature: 0.7 });

console.log(response.message.content);
```

### Transaction Example

```typescript
const chain = ollamachain();
chain.trx();
chain.userMessage("First message");
// ... add more messages
chain.rollback();
```
## Examples

 More examples in [ollama-chain/examples](https://github.com/dmytro-rudenko/ollama-chain/tree/main/examples)

 Tested with gemma3:4b

## API Reference

- `.model(modelName: string)` — Set the Ollama model to use
- `.systemMessage(message: string, overload?: boolean)` — Add or update a system message
- `.userMessage(message: string)` — Add a user message
- `.assistantMessage(message: string)` — Add an assistant message
- `.trx()` — Begin a transaction (message history can be rolled back)
- `.commit()` — Removing the savepoint and disable transaction
- `.rollback()` — Roll back to the state before the transaction
- `.format(format: object)` — Set response format
- `.logger(isActive: boolean)` — Enable/disable query logging
- `.getHistory()` — Get current message history
- `.toQuery(options?: object)` — Get the raw query object
- `.chat(options?: object)` — Get a single response (non-streaming)
- `.stream(options?: object)` — Get a streaming response (async iterable)
- `.execute(query)` — Execute a custom query

## License

MIT
