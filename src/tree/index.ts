import { GithubAPIResponseBody, GithubAPIFileObject, Core } from "./types";
import getBuiltinComment from "../utils/getBuiltinComment";
// import { useConfigurationContext } from "../contexts/configuration/ConfigurationContext";
// const [configState, configDispatch] = useConfigurationContext();

interface pathAndComment {
  path: string | undefined;
  comment: string | undefined;
}

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
 * @param {pathAndComment[] | null} oldTree - An array of path and comments of old treeCore if it already exists in readme file
 * @param {string} root - String of root folder for recursive search through the response body
 * @param {number} depth - Depth of the current input data for recursive search through the response body
 * @param {number} maxDepthLevel - Maximum existing depth of the whole response body to stop the process when reaching the last depth
 * @returns {Core[]} - Returns a Core array to be a part of Tree
 */
const ripOutPaths = (
  responseBody: GithubAPIResponseBody,
  oldTree: pathAndComment[] | null = null,
  builtinComments: pathAndComment[],
  regexKeyword,
  root = "",
  depth = 1,
  maxDepthLevel = 0
): Core[] => {
  const max = maxDepthLevel || findMaximumDepthLevel(responseBody);

  /** Given a path, searches through Builtin comments for existing comments
   * @param {string} path - Path of the core
   * @returns {string} - Builtin comment for the core
   */
  const findBuiltinComment = (path) => {
    let builtinComment = "";
    const foundBuiltinItem = builtinComments.find((item) => item.path === path);
    if (foundBuiltinItem?.comment) {
      builtinComment = getBuiltinComment(
        foundBuiltinItem.comment,
        regexKeyword
      );
    }
    return builtinComment;
  };

  /** Given a path, searches through old Tree for existing comments
   * @param {string} path - Path of the core
   * @returns {string} - Old comment for the core
   */
  const findOldComment = (path) => {
    let oldComment = "";
    const foundOldItem = oldTree
      ? oldTree.find((item) => item.path === path)
      : null;
    if (foundOldItem?.comment) {
      oldComment = START_OF_COMMENT + foundOldItem.comment;
    }
    return oldComment;
  };

  /** Given a path, searches through old Tree and Builtin Tree for the path
   * and returns if any comment is placed there
   * @param {string} path - Path of the core
   * @returns {string} - Default comment for the core
   */
  const setComment = (path) => {
    if (findBuiltinComment(path)) {
      return findBuiltinComment(path);
    }
    if (findOldComment(path)) {
      return findOldComment(path);
    }
    return "";
  };

  if (depth < max + 1) {
    const item = responseBody.tree
      .map((file: GithubAPIFileObject) => file.path) // Isolate the path from each object
      .filter((path: string) => path.split("/").length === depth) // Remove paths that are not in current depth
      .filter((path: string) => path.startsWith(root))
      // Remove paths that doesn't begin with the current root folder
      .map((line) => ({
        path: line,
        treeCore: ripOutPaths(
          responseBody,
          oldTree,
          builtinComments,
          regexKeyword,
          line,
          depth + 1,
          max
        ),
        deletedOrder: -1,
        comment: setComment(line),
      }));
    return item;
  }
  return [];
};

export { ripOutPaths };
