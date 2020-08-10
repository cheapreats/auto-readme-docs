/** Given Owner and Repo of a github repository, returns the Markdown badge
 * @param {string[]} ownerAndRepo - An array contains of Owner and Repo names of github repository
 * @returns {string} - String of the Markdown badge of certain github repository
 */

export const repoToMarkDownBadge = (ownerAndRepo: string[]): string => {
  const badgeDisplay = `[![npm version](https://badge.fury.io/js/${ownerAndRepo[0]}/${ownerAndRepo[1]}.svg)](https://badge.fury.io/js/${ownerAndRepo[0]}/${ownerAndRepo[1]})`;
  return badgeDisplay;
};

export default repoToMarkDownBadge;
