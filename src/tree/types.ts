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
