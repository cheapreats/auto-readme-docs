/**
 * generates the clickable link to a specific folder
 * This will recieve the path of a specific folder
 * Gets the number of '/' chars in the path
 * If there is no '/' then nothing changes since the path is same as deepestDirName
 * If there are '/'s then it sets the name of the folder as the deepestDirName
 * Makes a const name hyperLink put the path and deepestDirName inside the github hyperlink format
 * returns the hyperLink
 */

export const getHyperLinkFromPath = (path: string): string => {
  const curDepth = path.match(/\//g)?.length ?? 0;
  const deepestDirName = curDepth ? deepestDirName : path;
  const hyperLink = `[${deepestDirName}](./${path})`;
  return hyperLink;
};
