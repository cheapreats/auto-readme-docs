import { GithubAPIResponseBody, GithubAPIFileObject } from './types';
import { symbols, commonDirComments } from './constants';

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

// formatDirName returns a Markdown relative link for the provided path, and sticks a folder emoji
// at the beginning of the provided dirname.
//
// Helper func for generateTree().
const formatDirName = (path: string, dirName: string): string => {
  let output = `📂 [${dirName}](./${path})`;
  if (commonDirComments.hasOwnProperty(path)) {
    output += ` ${commonDirComments[path]}`;
  }

  return output;
};

// generateTree returns a list of strings --- one string for each line of the output ---
// representing the "tree printout" of a file system made up of the provided paths.
const generateTree = (paths: string[]): string[] => {
  const outputAsLines: string[] = [];
  paths.forEach((path) => {
    // Find the number of '/' chars in the path
    const curDepth = path.match(/\//g)?.length ?? 0;
    // If there are no '/' chars in the path, then this directory is at the root
    // of the project. We don't have to decorate this line of the output with
    // any │ or ├── symbols
    if (curDepth === 0) {
      // Add a folder emoji before the directory name
      outputAsLines.push(formatDirName(path, path));
      return;
    }

    // Build the current line in the overall output
    let curLine = '';
    // For all nested "levels" except for the deepest one, add a │ vertical bar
    for (let i = 0; i < curDepth - 1; i += 1) {
      curLine += symbols.vertical;
    }
    // Add a ├── symbol
    curLine += symbols.branch;
    // Add the name of the deepest directory
    const deepestDirName = path.substring(path.lastIndexOf('/') + 1);
    curLine += formatDirName(path, deepestDirName);

    outputAsLines.push(curLine);
  });

  return outputAsLines;
};

export { ripOutPaths, generateTree };
