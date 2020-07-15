/* eslint-disable quotes */
import getHyperLinkFromPath from "./getHyperLinkFromPath";
import getAutoGeneratedCommentForPath from "./getAutoGeneratedCommentForPath";
import getLargestFileNameLengthInLevel from "./getLargestFileNameLengthInLevel";
import getFileIconFromFileType from "./getFileIconFromFileType";
import getFileTypeFromPath from "./getFileTypeFromPath";
import { symbols } from "../tree/constants";
import { Core } from "../tree/types";
import { deepCopyFunction } from "./deepCopyFunction";

/**  Will be the MarkDownTree without the deletedCore's (Any core with deletedOrder > -1)
 * @param {Core[]} treeCore  The whole MarkDownTree
 * @param {Function} filter  Extra Filters
 * @returns {string} the MarkDownTree without the deletedCore's
 */

export const generateMarkDownTree = (
  treeCore: Core[],
  filter: Function | null = null
): string[] => {
  let deepClonedTreeCore = deepCopyFunction(treeCore);
  const outputAsLines: string[] = [];
  if (filter) {
    deepClonedTreeCore = filter(deepClonedTreeCore);
  }
  deepClonedTreeCore.forEach((core) => {
    const { path } = core;
    const comment = core.comment
      ? core.comment
      : getAutoGeneratedCommentForPath(path);

    const hyperLink = getHyperLinkFromPath(path);
    const icon = getFileIconFromFileType(getFileTypeFromPath(path));
    // Find the number of '/' chars in the path
    const curDepth = path.match(/\//g)?.length ?? 0;

    const deepestDirName = curDepth
      ? path.substring(path.lastIndexOf("/") + 1)
      : path;
    const longestFileName = getLargestFileNameLengthInLevel(treeCore, 0);
    // Build the current line in the overall output
    let curLine = "";
    // If there are no '/' chars in the path, then this directory is at the root
    // of the project. We don't have to decorate this line of the output with
    // any │ or ├── symbols
    if (curDepth !== 0) {
      // For all nested "levels" except for the deepest one, add a │ vertical bar
      for (let i = 0; i < curDepth - 1; i += 1) {
        curLine += symbols.vertical;
      }
      // Add a ├── symbo
      curLine += symbols.branch;
    }

    const spaces = longestFileName - deepestDirName.length;
    const commentAlignment = comment ? " ".repeat(spaces) : "";
    curLine += `${icon}${hyperLink}${commentAlignment}${comment}`;
    outputAsLines.push(curLine);
    if (core.treeCore) {
      const childrenTree = generateMarkDownTree(core.treeCore);
      childrenTree.forEach((childCore) => {
        outputAsLines.push(childCore);
      });
    }
  });

  return outputAsLines;
};
export default generateMarkDownTree;
