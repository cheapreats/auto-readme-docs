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
  FOLDER = "FOLDER",
  FILE = "FILE",
  HIDDEN_FILE = "HIDDEN_FILE",
  CONFIG_FILE = "CONFIG_FILE",
  LICENSE = "LICENSE",
  MD_FILE = "MD_FILE",
}

export enum GithubData {
  TREE = "tree",
  CONTENT = "content",
  SHA = "sha",
  PATH = "path",
  COMMIT = "commit",
}

export interface Core {
  path: string;
  comment: string;
  deletedOrder: number;
  treeCore: Core[];
}

export enum FilterType {
  NULL = "NULL",
  ROOT_ONLY = "ROOT_ONLY",
  FOLDER_ONLY = "FOLDER_ONLY",
}

export enum WrapTagType {
  OPEN,
  CLOSE,
  BOTH,
}
