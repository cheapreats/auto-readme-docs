import getHyperLinkFromPath from "../getHyperLinkFromPath/getHyperLinkFromPath";
import getAutoGeneratedCommentForPath from "../getAutoGeneratedCommentForPath/getAutoGeneratedCommentForPath";
import getLargestFileNameLengthInLevel from "../getLargestFileNameLengthInPath/getLargestFileNameLengthInLevel";
import getFileIconFromFileType from "../getFileIconFromFileType/getFileIconFromFileType";
import getFileTypeFromPath from "../getFileTypeFromPath/getFileTypeFromPath";
import { Core, FilterType, WrapTagType } from "../../tree/types";
import { deepCopyFunction } from "../deepCopyFunction";
import selectRootCores from "../selectRootCores/selectRootCores";
import getCoreFromTree from "../getCoreFromTree";
import tagWrap from "../tagWrap";

type IGetMarkDownTree = (
  treeCore: Core[],
  filter?: FilterType,
  withAutoComments?: boolean,
  motherCore?: Core[]
) => string[];

let detailsToAdd = "";

const SPAN_TAG = "span";
const BLOCKQUOTE_TAG = "blockquote";
const SUMMARY_TAG = "summary";
const DETAILS_TAG = "details";

/** Finds the last item of a markdown folder and adds </blockquote> and
 * </details> to detailsToAdd string so that it can be added to curLine
 * @param {Core[]} motherTreeCore  - the original whole treeCore
 * @param {Core[]} treeCore - the treeCore being analyzed for certain treePath
 * @param {String} treePath - path of last file/folder in its wrapped folder
 * @returns - doesn't return anything, adds closing blockquote and details tag
 * to detailsToAdd
 */
const addBlockquoteDetailsTag = (
  motherTreeCore: Core[],
  treeCore: Core[],
  treePath: string
): void => {
  const SPLIT_TREE_PATH = treePath.split("/");
  /* folder wrapping the file/folder that need's to have </details> tag added on to */
  const FOLDER_WRAPPING_FILE = SPLIT_TREE_PATH[SPLIT_TREE_PATH.length - 2];

  for (let i = 0; i < treeCore.length; i += 1) {
    const SPLIT_PARENT_CORE_PATH = treeCore[i].path.split("/");
    if (
      SPLIT_PARENT_CORE_PATH[SPLIT_PARENT_CORE_PATH.length - 1] ===
      FOLDER_WRAPPING_FILE
    ) {
      const SPLIT_CHILD_CORE_PATH = treeCore[i].treeCore[
        treeCore[i].treeCore.length - 1
      ].path.split("/");
      if (
        SPLIT_CHILD_CORE_PATH[SPLIT_CHILD_CORE_PATH.length - 1] ===
        SPLIT_TREE_PATH[SPLIT_TREE_PATH.length - 1]
      ) {
        detailsToAdd += tagWrap(
          tagWrap("", BLOCKQUOTE_TAG, WrapTagType.CLOSE),
          DETAILS_TAG,
          WrapTagType.CLOSE
        );
        addBlockquoteDetailsTag(
          motherTreeCore,
          motherTreeCore,
          treeCore[i].path
        );
      } else {
        break;
      }
    } else {
      addBlockquoteDetailsTag(motherTreeCore, treeCore[i].treeCore, treePath);
    }
  }
};
/**  Will be the MarkDownTree without the deletedCore's (Any core with deletedOrder > -1)
 * @param {Core[]} treeCore - the whole MarkDownTree
 * @param {Function} filter - extra Filters
 * @param {boolean} withAutoComments - if we want to produce automated comments or no
 * @param {Core[]} motherCore - The whole Tree Core including what is not
 * going to be shown in MarkdownTree
 * @returns {string} - the MarkDownTree without the deletedCore's
 */

export const generateMarkDownTree: IGetMarkDownTree = (
  treeCore,
  filter = FilterType.NULL,
  withAutoComments = true,
  motherCore = treeCore
): string[] => {
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
        let comment = "";
        if (core.comment) {
          comment = tagWrap(core.comment, SPAN_TAG);
        } else if (withAutoComments) {
          comment = tagWrap(getAutoGeneratedCommentForPath(path), SPAN_TAG);
        } else {
          comment = "";
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
          ? path.substring(path.lastIndexOf("/") + 1)
          : path;
        const longestFileName = getLargestFileNameLengthInLevel(treeCore, 0);
        // Build the current line in the overall output
        let curLine = "";
        const spaces = longestFileName - deepestDirName.length;
        const commentAlignment = comment ? " ".repeat(spaces) : "";
        const ROOT_CURDEPTH = 0;
        if (isFile === false && core.treeCore.length > 0) {
          if (
            curDepth > ROOT_CURDEPTH &&
            deepClonedTreeCore &&
            deepClonedTreeCore[0] === core
          ) {
            curLine +=
              tagWrap("", SUMMARY_TAG, WrapTagType.CLOSE) +
              tagWrap("", BLOCKQUOTE_TAG, WrapTagType.OPEN);
          }
          curLine += tagWrap(
            tagWrap(
              `${icon}${hyperLink} ${commentAlignment}${comment}`,
              SUMMARY_TAG,
              WrapTagType.OPEN
            ),
            DETAILS_TAG,
            WrapTagType.OPEN
          );
        } else if (
          deepClonedTreeCore &&
          curDepth > ROOT_CURDEPTH &&
          deepClonedTreeCore[0] === core
        ) {
          curLine +=
            tagWrap("", SUMMARY_TAG, WrapTagType.CLOSE) +
            tagWrap(
              `${icon}${hyperLink} ${commentAlignment}${comment}`,
              BLOCKQUOTE_TAG,
              WrapTagType.OPEN
            );
          if (deepClonedTreeCore[deepClonedTreeCore.length - 1] === core) {
            addBlockquoteDetailsTag(
              motherCore,
              motherCore,
              deepClonedTreeCore[deepClonedTreeCore.length - 1].path
            );
            curLine += `${detailsToAdd}
`;
            detailsToAdd = "";
          }
        } else {
          curLine += `${icon}${hyperLink} ${commentAlignment}${comment}`;
          if (deepClonedTreeCore && curDepth > ROOT_CURDEPTH) {
            if (deepClonedTreeCore[deepClonedTreeCore.length - 1] === core) {
              addBlockquoteDetailsTag(
                motherCore,
                motherCore,
                deepClonedTreeCore[deepClonedTreeCore.length - 1].path
              );
              curLine += `${detailsToAdd}
`;
              detailsToAdd = "";
            }
          }
        }
        outputAsLines.push(curLine);
        if (core.treeCore) {
          const childrenTree = generateMarkDownTree(
            core.treeCore,
            filter,
            withAutoComments,
            motherCore
          );
          childrenTree.forEach((childCore) => {
            outputAsLines.push(childCore);
          });
        }
      }
    );
  }
  return outputAsLines;
};

export default generateMarkDownTree;
