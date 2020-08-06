/** Given a github URL, returns the related Owner and Repo
 * @param {string} url - URL to get owner and Repo from
 * @returns {string[]} - An array contains of Owner and Repo names of github repository
 */

export const getOwnerAndRepoFromUrl = (url: string): string[] => {
  const pathArray = url.split("/");
  const ownerAndRepo = [pathArray[3], pathArray[4]];
  return ownerAndRepo;
};

export default getOwnerAndRepoFromUrl;
