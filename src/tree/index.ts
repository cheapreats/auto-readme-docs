import { GithubAPIResponseBody, GithubAPIFileObject, Core } from "./types";

const findMaximumDepthLevel = (responseBody) => {
  const depthLevels = responseBody.tree.map(
    (file: GithubAPIFileObject) => file.path.split("/").length
  );
  return Math.max(...depthLevels);
};
// ripOutPaths condenses the response body from a Github API call to a list of directory paths.
const ripOutPaths = (
  responseBody: GithubAPIResponseBody,
  root: string = "",
  depth: number = 1,
  maxDepthLevel: number = 0
): Core[] => {
  const max = maxDepthLevel
    ? maxDepthLevel
    : findMaximumDepthLevel(responseBody);

  if (depth < max + 1) {
    const item = responseBody.tree
      .map((file: GithubAPIFileObject) => file.path) // Isolate the path from each object
      .filter((path: string) => path.split("/").length === depth) // Remove paths that are not in current depth
      .filter((path: string) => path.startsWith(root)) // Remove paths that doesn't begin with the current root folder
      .map((line) => ({
        path: line,
        treeCore: ripOutPaths(responseBody, line, depth + 1, max),
        deletedOrder: -1,
        comment: ``,
      }));
    return item;
  } else {
    return [];
  }
};

export { ripOutPaths };
