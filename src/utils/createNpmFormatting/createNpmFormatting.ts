/** Outputs the link of a npm badge icon produced by either extracting the
 * owner and repository name from a given string array or from package.json
 * @param {string[]} ownerAndRepo - a string array corresponding to owner and
 * repository name
 * @returns {string} - a badge.fury.io link which produces a npm icon depending
 * on whether the link is provided in package.json or not
*/

import * as pjson from '../../../package.json';

const EMPTY_STRING = 0;

export const getNpmLinkFromOwnerAndRepo = (ownerAndRepo: string[]): string => {
  if (pjson.npmPackageUrl.length !== EMPTY_STRING) {
    return pjson.npmPackageUrl;
  }
  const npmUrl = `https://badge.fury.io/js/${ownerAndRepo[0]}/${ownerAndRepo[1]}.svg`;
  return npmUrl;
};

export default getNpmLinkFromOwnerAndRepo;
