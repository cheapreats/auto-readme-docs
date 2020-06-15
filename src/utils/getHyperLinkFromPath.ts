/** generates the clickable link to a specific folder
 * @param {string} path - The path of a specific folder like "src/components/reusable"
 * @returns {string} - the hyperLink like "[reusable](./src/components/reusable)"
 */

export const getHyperLinkFromPath = (path: string): string => {
  const pattern = /^((?![<>:"/\\|?* .])(([a-z0-9\s_@\-^!#$%&+={}\[\].]*)([/]?)))+[^/.]$/i;
  if (pattern.test(path)) {
    const curDepth = path.match(/\//g)?.length ?? 0;
    const deepestDirName = curDepth
      ? path.substring(path.lastIndexOf("/") + 1)
      : path;
    const hyperLink = `[${deepestDirName}](./${path})`;
    return hyperLink;
  } else {
    throw new Error("Invalid Path!");
  }
};

export default getHyperLinkFromPath;
