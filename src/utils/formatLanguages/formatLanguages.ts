import getWebsiteForLanguage from '../getWebsiteForLanguage';

export const formatLanguages = (
  languages: Record<string, unknown>,
): string[] => {
  const formattedLanguages: string[] = [];
  for (const [key] of Object.entries(languages)) {
    const formattedLanguage = getWebsiteForLanguage(key);
    console.log('ll', key, formattedLanguages);
    formattedLanguages.push(formattedLanguage);
  }
  return formattedLanguages;
};

export default formatLanguages;
