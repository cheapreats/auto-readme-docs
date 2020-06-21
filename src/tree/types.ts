export interface GithubAPIFileObject {
  path: string;
  mode: string;
  type: string;
  sha: string;
  size: number;
  url: string;
}

export interface GithubAPIResponseBody {
  sha: string;
  url: string;
  tree: GithubAPIFileObject[];
}

export interface NpmsResponseBody {
  total: number;
}

export enum FileType {
  FOLDER = 'FOLDER',
  FILE = 'FILE',
  HIDDEN_FILE = 'HIDDEN_FILE',
  CONFIG_FILE = 'CONFIG_FILE',
}

export enum Icon {
  /* Added one space after emoji so that it doesn't stick together
  with the next phrase or delete a character */
  FOLDER = '📂 ',
  FILE = '📄 ',
  CONFIG_FILE = '📜 ',
}

export interface Core {
  path: string;
  comment: string;
  deletedOrder: number;
  treeCore: Core[];
}
