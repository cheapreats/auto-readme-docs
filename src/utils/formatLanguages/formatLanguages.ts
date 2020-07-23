import getWebsiteForLanguage from '../getWebsiteForLanguage';

export const formatLanguages = (
  languages: Record<string, unknown>,
): string[] => {
  const formattedLanguages: string[] = [];

  Object.keys(languages).map((key) => {
    const formattedLanguage = getWebsiteForLanguage(key);
    console.log('ll', key, formattedLanguages);
    formattedLanguages.push(formattedLanguage);

    return formattedLanguages;
  });

  return formattedLanguages;
};

export default formatLanguages;
