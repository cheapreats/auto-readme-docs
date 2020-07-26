import { commonLanguageWebsites, websiteLinkIcon } from '../tree/languageWebsites';

/** Retrieves the auto generated comments for common folders
 * @param {string} path path of the specific folder like src
 * @returns {string} The pre-defined Comment for the folder like "# Source files"
*/

export const getWebsiteForLanguage = (language: string): string => {
  const websiteLink = `${commonLanguageWebsites[language] ?? ''}`;
  const formattedWebsiteLink = `[${websiteLinkIcon}](${websiteLink}) ${language}`;
  return formattedWebsiteLink;
};

export default getWebsiteForLanguage;
