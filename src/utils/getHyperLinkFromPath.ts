/** @function getHyperLinkFromPath  generates the clickable link to a specific folder
 * @param {string} path  The path of a specific folder like "./src/components/reusable"
 * @returns {string} the hyperLink like [reusable](./src/components/reusable)
 */

export const getHyperLinkFromPath = (path: string): string => {
  const curDepth = path.match(/\//g)?.length ?? 0;
  /** Checks to see how many '/' is included in the address */
  const deepestDirName = curDepth ? deepestDirName : path;
  /** If there are '/'s then it sets the name of the folder as the deepestDirName */
  const hyperLink = `[${deepestDirName}](./${path})`;
  /** put the path and deepestDirName inside the hyperlink in github hyperlink format */
  return hyperLink;
};
