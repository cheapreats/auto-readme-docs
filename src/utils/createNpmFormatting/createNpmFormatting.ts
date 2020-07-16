/** Outputs the link of a npm badge icon produced by extracting the owner and
 * repository name from a given string array
 * @param {string[]} ownerAndRepo - a string array corresponding to owner and
 * repository name
 * @returns {string} - a badge.fury.io link which produces a npm icon
*/

export const getNpmLinkFromOwnerAndRepo = (ownerAndRepo: string[]): string => {
  const npmUrl = `https://badge.fury.io/js/${ownerAndRepo[0]}/${ownerAndRepo[1]}.svg`;
  return npmUrl;
};

export default getNpmLinkFromOwnerAndRepo;
