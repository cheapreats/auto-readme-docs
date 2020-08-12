import getHyperLinkFromPath from '../getHyperLinkFromPath/getHyperLinkFromPath';
import getAutoGeneratedCommentForPath from '../getAutoGeneratedCommentForPath/getAutoGeneratedCommentForPath';
import getLargestFileNameLengthInLevel from '../getLargestFileNameLengthInPath/getLargestFileNameLengthInLevel';
import getFileIconFromFileType from '../getFileIconFromFileType/getFileIconFromFileType';
import getFileTypeFromPath from '../getFileTypeFromPath/getFileTypeFromPath';
import { Core, FilterType } from '../../tree/types';
import { deepCopyFunction } from '../deepCopyFunction';
import selectRootCores from '../selectRootCores/selectRootCores';
import getCoreFromTree from '../getCoreFromTree';

type IGetMarkDownTree = (
  treeCore: Core[],
  filter?: FilterType,
  withAutoComments?: boolean,
  motherCore?: Core[]
) => string[];

let detailsToAdd = '';

const addDetailsTag = (
  motherTreeCore: Core[],
  treeCore: Core[],
  treePath: string,
): void => {
  const splitTreePath = treePath.split('/');
  /* folder wrapping the the file/folder that need's to have </details> tag added on to */
  const folderWrappingFile = splitTreePath[splitTreePath.length - 2];

  for (let i = 0; i < treeCore.length; i += 1) {
    if (
      treeCore[i].path.split('/')[treeCore[i].path.split('/').length - 1]
      === folderWrappingFile
    ) {
      if (
        treeCore[i].treeCore[treeCore[i].treeCore.length - 1].path.split('/')[
          treeCore[i].treeCore[treeCore[i].treeCore.length - 1].path.split('/').length - 1
        ] === splitTreePath[splitTreePath.length - 1]
      ) {
        detailsToAdd += '</details>';
        addDetailsTag(motherTreeCore, motherTreeCore, treeCore[i].path);
      } else {
        break;
      }
    } else {
      addDetailsTag(motherTreeCore, treeCore[i].treeCore, treePath);
    }
  }
};

/**  Will be the MarkDownTree without the deletedCore's (Any core with deletedOrder > -1)
 * @param {Core[]} treeCore - the whole MarkDownTree
 * @param {Function} filter - extra Filters
 * @param {boolean} withAutoComments - if we want to produce automated comments or no
 * @param {Core[]} motherCore - The whole Tree Core including what is not going
 * to be shown in MarkdownTree
 * @returns {string} - the MarkDownTree without the deletedCore's
 */
export const generateMarkDownTree: IGetMarkDownTree = (
  treeCore,
  filter = FilterType.NULL,
  withAutoComments = true,
  motherCore = treeCore,
) => {
  let deepClonedTreeCore: Core[] | null = deepCopyFunction(treeCore);
  let isFile = false;
  const outputAsLines: string[] = [];
  if (filter === FilterType.ROOT_ONLY) {
    deepClonedTreeCore = selectRootCores(deepClonedTreeCore);
  }
  if (deepClonedTreeCore) {
    deepClonedTreeCore.forEach(
      (core: { comment: string; treeCore: Core[]; path: string }) => {
        const { path } = core;
        let comment = '';
        if (core.comment) {
          comment = core.comment;
        } else if (withAutoComments) {
          comment = getAutoGeneratedCommentForPath(path);
        } else {
          comment = '';
        }

        if (getCoreFromTree(motherCore, core.path).treeCore.length) {
          isFile = false;
        } else {
          isFile = true;
        }

        const hyperLink = getHyperLinkFromPath(path);
        const icon = getFileIconFromFileType(getFileTypeFromPath(path, isFile));
        // Find the number of '/' chars in the path
        const curDepth = path.match(/\//g)?.length ?? 0;
        const deepestDirName = curDepth
          ? path.substring(path.lastIndexOf('/') + 1)
          : path;
        const longestFileName = getLargestFileNameLengthInLevel(treeCore, 0);
        // Build the current line in the overall output
        let curLine = '';
        const spaces = longestFileName - deepestDirName.length;
        const commentAlignment = comment ? ' '.repeat(spaces) : '';
        if (isFile === false && core.treeCore.length > 0) {
          curLine += `<details> <summary>${icon}${hyperLink} ${commentAlignment}${comment}</summary> <blockquote>
          `;
        } else {
          curLine += `${icon}${hyperLink} ${commentAlignment}${comment}`;
          if (deepClonedTreeCore && curDepth > 0) {
            if (deepClonedTreeCore[deepClonedTreeCore.length - 1] === core) {
              addDetailsTag(
                motherCore,
                motherCore,
                deepClonedTreeCore[deepClonedTreeCore.length - 1].path,
              );
              curLine += `</blockquote>${detailsToAdd}
              `;
              detailsToAdd = '';
            }
          }
        }
        outputAsLines.push(curLine);
        if (core.treeCore) {
          const childrenTree = generateMarkDownTree(
            core.treeCore,
            filter,
            withAutoComments,
            motherCore,
          );
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
