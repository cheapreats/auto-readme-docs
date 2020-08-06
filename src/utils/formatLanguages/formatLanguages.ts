import getWebsiteForLanguage from "../getWebsiteForLanguage";

/** Given the api response of languages, returns it in a string arraya format
 * @param {Record<string, unknown>} languages - the api response of languages
 * @returns {string[]} - Returns languages in an array of strings
 */

export const formatLanguages = (
  languages: Record<string, unknown>
): string[] => {
  const formattedLanguages: string[] = [];

  Object.keys(languages).map((key) => {
    const formattedLanguage = getWebsiteForLanguage(key);
    console.log("ll", key, formattedLanguages);
    formattedLanguages.push(formattedLanguage);

    return formattedLanguages;
  });

  return formattedLanguages;
};

export default formatLanguages;
