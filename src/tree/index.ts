import { GithubAPIResponseBody, GithubAPIFileObject } from "./types";

// ripOutPaths condenses the response body from a Github API call to a list of directory paths.
const ripOutPaths = (responseBody: GithubAPIResponseBody): string[] => responseBody.tree
  .map((file: GithubAPIFileObject) => file.path) // Isolate the path from each object
  .filter((path: string) => path.includes('/')) // Remove paths that don't include a directory
  .map((path: string) => path.substring(0, path.lastIndexOf('/'))) // Trim off trailing file name
  .filter((path: string) => path !== '') // Remove resulting empty strings from previous step
  .reduce(
    (finalListOfPaths: string[], path: string) => {
      // Remove duplicate elements
      if (finalListOfPaths.includes(path)) {
        return finalListOfPaths;
      }
      return [...finalListOfPaths, path];
    },
    [], // Initial value for the reducer
  );

export default ripOutPaths;
