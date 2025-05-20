# ollama-chain

A TypeScript/JavaScript library for building composable, chainable, and transactional chat flows with [Ollama](https://ollama.com/) models. ollama-chain provides a fluent API to construct, manage, and execute chat conversations, including streaming and transaction support. Based on [Ollama Javascript Library](https://www.npmjs.com/package/ollama).

## Features

- **Fluent, chainable API** for building chat prompts
- **System, user, and assistant message management**
- **Streaming and non-streaming responses**
- **Transaction support** (begin, commit, rollback message history)
- **Customizable model, options, and response format**
- **Easy integration with Ollama's API**
- **Language support** for multilingual conversations
- **Short response mode** for concise answers
- **Logging capabilities** for debugging and monitoring
- **TypeScript support** with full type definitions

## Installation

```
npm install ollama-chain
```

## Usage

### Basic Streaming Example

TypeScript

```typescript
import OllamaChain from "ollama-chain";

const main = async () => {
    const ollamachain = OllamaChain();

    const response = await ollamachain()
        .model("gemma3:4b")
        .logger(true)                           // Enable logging
        .setLanguage("eng")                     // Set response language
        .shortResponse()                        // Enable short response mode
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

CommonJS

```javascript

const { OllamaChain } = require('ollama-chain')

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

## Advanced Features

### Language Support
```typescript
ollamachain()
    .setLanguage("ukr")  // Set Ukrainian language
    .userMessage("Tell me about Ukraine");
```

### Short Response Mode
```typescript
ollamachain()
    .shortResponse()  // Enable concise responses
    .userMessage("What is quantum computing?");
```

### Step-by-Step Reasoning
```typescript
ollamachain()
    .stepByStep()  // Enable step-by-step problem solving
    .userMessage("How do I solve a quadratic equation?");
```

### Thinking Mode
```typescript
ollamachain()
    .thinking()  // Instruct the model to show its thought process before answering
    .userMessage("Why is the sky blue?");
```

### Logging
```typescript
ollamachain()
    .logger(true)  // Enable logging for debugging
    .userMessage("Debug this conversation");
```

## Examples

Check out more examples in the [examples directory](https://github.com/dmytro-rudenko/ollama-chain/tree/main/examples):
- `chat.ts` - Interactive chat examples
- `prompt-builder.ts` - Advanced prompt construction
- `stream.ts` - Streaming response handling
- `transaction.ts` - Message history management
- `set-language.ts` - Multilingual conversation examples

Tested with gemma3:4b and compatible with other Ollama models.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details.

## API Reference

### Core Methods
- `.model(modelName: string)` — Set the Ollama model to use
- `.chat(options?: object)` — Get a single response (non-streaming)
- `.stream(options?: object)` — Get a streaming response (async iterable)
- `.execute(query: ChatRequestStream | ChatRequestBase)` — Execute a custom query object directly

### Message Management
- `.systemMessage(message: string, overload?: boolean)` — Add or update a system message. When `overload` is true, replaces the existing system message completely. When false (default), appends the new message to the existing system message with a newline separator
- `.userMessage(message: string)` — Add a user message to the conversation
- `.assistantMessage(message: string)` — Add an assistant message to the conversation
- `.getHistory()` — Get the current message history array

### Response Formatting
- `.setLanguage(language: string)` — Set the response language (e.g., "eng", "ukr")
- `.detailedResponse()` — Configure the model to provide detailed, comprehensive responses
- `.shortResponse()` — Configure the model to provide concise, brief responses
- `.thinking()` — Instructs the model to write its thought process and reasoning before answering the question
- `.stepByStep()` — Instructs the model to break down the problem and solve it step by step
- `.format(format?: ResponseFormat)` — Set custom response format parameters

### Transaction Support
- `.trx()` — Begin a transaction to track message history changes
- `.commit()` — Save changes and end the current transaction
- `.rollback()` — Revert message history to the state before the transaction started

### Configuration & Debugging
- `.logger(isActive: boolean)` — Enable or disable query logging for debugging
- `.keepAlive(param: string | number)` — Set how long to keep the model loaded. Accept a number (seconds) or a duration string ("300ms", "1.5h", "2h45m")
- `.toQuery(options?: object)` — Get the raw query object for inspection or custom execution

## License

MIT
