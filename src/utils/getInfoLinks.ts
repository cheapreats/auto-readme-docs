import { commonInfoLinks } from "../tree/constants";

/** Retrieves the info links for common files
 * @param {string} fileName The name of the specific file
 * @returns {string} Info link of the specific file
 */

export const getInfoLinks = (fileName: string): string => {
  const infoLink = `${commonInfoLinks[fileName] ?? ""}`;
  return infoLink;
};

export default getInfoLinks;
