import getWebsiteForLanguage from "../getWebsiteForLanguage";

export const formatLanguages = (languages: object): string[] => {
    const formattedLanguages: string[] = [];
    for (const [key, value] of Object.entries(languages)) {
        const formattedLanguage = getWebsiteForLanguage(key);
        console.log("ll", key, formattedLanguages)
        formattedLanguages.push(formattedLanguage);
    }
    return formattedLanguages;
}