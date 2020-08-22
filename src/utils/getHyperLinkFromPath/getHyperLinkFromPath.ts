import getInfoLinks from "../getInfoLinks";

const INFO_ICON = "ℹ️";

/** generates the clickable link to a specific folder
 * @param {string} path - The path of a specific folder like "src/components/reusable"
 * @returns {string} - the hyperLink like "[reusable](./src/components/reusable)"
 */
export const getHyperLinkFromPath = (path: string): string => {
  const FILE_PATTERN = /^((?![<>:"/\\|?* ])(([a-z0-9\s_@\-^!#$%&+={}\\[\].]*)([/]?)))+[^/.]$/i;
  if (FILE_PATTERN.test(path)) {
    const curDepth = path.match(/\//g)?.length ?? 0;
    const deepestDirName = curDepth
      ? path.substring(path.lastIndexOf("/") + 1)
      : path;
    const info = getInfoLinks(deepestDirName)
      ? `<a class="InfoLink" href="${getInfoLinks(
          deepestDirName
        )}">${INFO_ICON}</a> `
      : "";
    const hyperLink = `${info}<a href="./${path}">${deepestDirName}</a>`;
    return hyperLink;
  }
  throw new Error("Invalid Path!");
};

export default getHyperLinkFromPath;
