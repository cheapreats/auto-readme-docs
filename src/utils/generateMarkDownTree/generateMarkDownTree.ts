import getHyperLinkFromPath from '../getHyperLinkFromPath/getHyperLinkFromPath';
import getAutoGeneratedCommentForPath from '../getAutoGeneratedCommentForPath/getAutoGeneratedCommentForPath';
import getLargestFileNameLengthInLevel from '../getLargestFileNameLengthInPath/getLargestFileNameLengthInLevel';
import getFileIconFromFileType from '../getFileIconFromFileType/getFileIconFromFileType';
import getFileTypeFromPath from '../getFileTypeFromPath/getFileTypeFromPath';
import { symbols } from '../../tree/constants';
import { Core, FilterType } from '../../tree/types';
import { deepCopyFunction } from '../deepCopyFunction';
import selectRootCores from '../selectRootCores/selectRootCores';

/**  Will be the MarkDownTree without the deletedCore's (Any core with deletedOrder > -1)
 * @param {Core[]} treeCore - the whole MarkDownTree
 * @param {Function} filter - extra Filters
 * @returns {string} - the MarkDownTree without the deletedCore's
 */

export const generateMarkDownTree = (
  treeCore: Core[],
  filter: FilterType = FilterType.NULL,
): string[] => {
  let deepClonedTreeCore: Core[] | null = deepCopyFunction(treeCore);
  const outputAsLines: string[] = [];
  if (filter === FilterType.ROOT_ONLY) {
    deepClonedTreeCore = selectRootCores(deepClonedTreeCore);
  }
  if (deepClonedTreeCore) {
    deepClonedTreeCore.forEach(
      (core: { comment: string; treeCore: Core[]; path: string }) => {
        const { path } = core;
        const comment = core.comment
          ? core.comment
          : getAutoGeneratedCommentForPath(path);
        const hyperLink = getHyperLinkFromPath(path);
        const icon = getFileIconFromFileType(getFileTypeFromPath(path));
        // Find the number of '/' chars in the path
        const curDepth = path.match(/\//g)?.length ?? 0;
        const deepestDirName = curDepth
          ? path.substring(path.lastIndexOf('/') + 1)
          : path;
        const longestFileName = getLargestFileNameLengthInLevel(treeCore, 0);
        // Build the current line in the overall output
        let curLine = '';
        /* If no '/' chars in path, then this directory is at the root
    of the project. Don't have to decorate this line of the output with
    │ or ├── */
        if (curDepth !== 0) {
          // For all nested "levels" except for the deepest one, add a │ vertical bar
          for (let i = 0; i < curDepth - 1; i += 1) {
            curLine += symbols.vertical;
          }
          // Add a ├── symbol
          curLine += symbols.branch;
        }
        const spaces = longestFileName - deepestDirName.length;
        const commentAlignment = comment ? ' '.repeat(spaces) : '';
        curLine += `${icon}${hyperLink} ${commentAlignment}${comment}`;
        outputAsLines.push(curLine);
        if (core.treeCore) {
          const childrenTree = generateMarkDownTree(core.treeCore);
          childrenTree.forEach((childCore) => {
            outputAsLines.push(childCore);
          });
        }
      },
    );
  }

  return outputAsLines;
};

export default generateMarkDownTree;
