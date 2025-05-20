declare const prompts: {
    setLanguage: (language: string) => string;
    detailedResponse: () => string;
    shortResponse: () => string;
    stepByStep: () => string;
    thinking: () => string;
};
export default prompts;
