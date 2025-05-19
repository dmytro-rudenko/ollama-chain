const prompts = {
    setLanguage: (language: string) => {
        return 'Use "' + language + '" as the language for the conversation. Do not use any other language. Whatever the query language is, still respond to the query in "' + language + '" language. Do not use any other language. Do not respond in English or any other language. Just respond in "' + language + '" language.'
    },
    detailedResponse: () => {
        return 'Provide a detailed response to the user\'s query. Do not provide a short or vague response. Provide as much detail as possible.'
    },
    shortResponse: () => {
        return 'Provide a short response to the user\'s query. Do not provide a detailed or lengthy response. Provide only the most important information.'
    },
}

export default prompts;