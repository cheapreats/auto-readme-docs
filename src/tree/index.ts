import { GithubAPIResponseBody, GithubAPIFileObject, Core } from "./types";
import getBuiltinComment from "../utils/getBuiltinComment";

interface oldTree {
  path: string | undefined;
  comment: string | undefined;
}

const START_OF_PATH = "./";
const START_OF_COMMENT = "# ";

/** Given a responseBody, returns the maximum depth exist inside the tree
 * @param {GithubAPIResponseBody} responseBody - Response from the api including all the information to make a treeCore
 * @returns {number} - Maximum existing depth of the whole response body to stop the process when reaching the last depth
 */
const findMaximumDepthLevel = (responseBody: GithubAPIResponseBody): number => {
  const depthLevels = responseBody.tree.map(
    (file: GithubAPIFileObject) => file.path.split("/").length
  );
  return Math.max(...depthLevels);
};

/** Given a response, rip outs the different parts of the response and make a treeCore
 * @param {GithubAPIResponseBody} responseBody - Response from the api including all the information to make a treeCore
 * @param {oldTree[] | null} oldTree - An array of path and comments of old treeCore if it already exists in readme file
 * @param {string} root - String of root folder for recursive search through the response body
 * @param {number} depth - Depth of the current input data for recursive search through the response body
 * @param {number} maxDepthLevel - Maximum existing depth of the whole response body to stop the process when reaching the last depth
 * @returns {Core[]} - Returns a Core array to be a part of Tree
 */
const ripOutPaths = (
  responseBody: GithubAPIResponseBody,
  oldTree: oldTree[] | null = null,
  builtinComments: oldTree[],
  root: string = "",
  depth: number = 1,
  maxDepthLevel: number = 0
): Core[] => {
  const max = maxDepthLevel
    ? maxDepthLevel
    : findMaximumDepthLevel(responseBody);

  /** Given a path, searches through old Tree and Builtin Tree for the path and returns if any comment is placed there
   * @param {string} path - path of the core
   * @returns {string} - default comment for the core
   */
  const setComment = (path) => {
    let builtinComment = "";
    const foundBuiltinItem = builtinComments.find((item) => item.path == path);
    if (foundBuiltinItem?.comment) {
      builtinComment = getBuiltinComment(foundBuiltinItem.comment);
    }
    if (builtinComment) {
      return builtinComment;
    } else {
      const foundOldItem = oldTree
        ? oldTree.find((item) => item.path == START_OF_PATH + path)
        : null;
      if (foundOldItem) {
        return START_OF_COMMENT + foundOldItem.comment;
      } else {
        return "";
      }
    }
  };

  if (depth < max + 1) {
    const item = responseBody.tree
      .map((file: GithubAPIFileObject) => file.path) // Isolate the path from each object
      .filter((path: string) => path.split("/").length === depth) // Remove paths that are not in current depth
      .filter((path: string) => path.startsWith(root)) // Remove paths that doesn't begin with the current root folder
      .map((line) => ({
        path: line,
        treeCore: ripOutPaths(
          responseBody,
          oldTree,
          builtinComments,
          line,
          depth + 1,
          max
        ),
        deletedOrder: -1,
        comment: setComment(line),
      }));
    return item;
  } else {
    return [];
  }
};

export { ripOutPaths };
