import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';
import { ripOutPaths } from './tree';
import {
  GithubAPIResponseBody,
  NpmsResponseBody,
  GithubData,
  Core,
} from './tree/types';
import MarkdownDisplay from './components/MarkdownDisplay';
import BadgesSection from './components/BadgesSection';
import URLBox from './components/URLBox';
import { formatLanguages } from './utils/formatLanguages/formatLanguages';
import CustomSecondaryButton from './components/reusable/CustomSecondaryButton';
import CenteredCol from './components/reusable/CenteredCol';
import Card from './components/reusable/Card';
import getPreviousTree from './utils/getPreviousTree';

interface pathAndComment {
  path: string | undefined;
  comment: string | undefined;
}

const App: React.FC = () => {
  const [repoName, setRepoName] = useState('');
  const [repoLanguages, setRepoLanguages] = useState<string[]>([]);
  const [isNpmBadgeVisible, setNpmBadgeVisible] = useState(false);
  const [url, setURL] = useState('');
  const [treeCore, setTreeCore] = useState<Core[]>([]);

  const OWNER_IN_URL = 3;
  const REPO_IN_URL = 4;
  const README_PATH = 'README.md';
  const COMMENTS_EXIST_REGEX = /(<a href=".+">.github<\/a>).+(<span># .+<\/span>)/g;
  const IS_FILE = 'blob';
  const GITHUB_API_URL_PREFIX = 'https://api.github.com/repos/';
  const GITHUB_API_COMMITS_ON_MASTER_SUFFIX = '/commits/master';
  const GITHUB_API_CONTENTS_SUFFIX = '/contents';
  const GITHUB_API_BLOBS_SUFFIX = '/git/blobs';
  const GITHUB_API_TREES_SUFFIX = '/git/trees';
  const GITHUB_API_TREES_LANGUAGES = '/languages';
  const GITHUB_API_TREES_CONTRIBUTORS = '/contributors';
  const WITH_RECURSIVE_PARAMETER = '?recursive=true';
  const NPM_API_VERSION2 = 'https://api.npms.io/v2';
  const handleExampleGoButtonPress = async () => {
    const url = 'https://github.com/cheapreats/auto-readme-docs';
    const pathArray = url.split('/');
    const owner = pathArray[OWNER_IN_URL];
    const repo = pathArray[REPO_IN_URL];
    setRepoName(repo);
    await makeRequest(owner, repo);
  };

  /** Updates the URL state when the content of URLBOX changes
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event
   */
  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => setURL(e.target.value);

  /**  Gets the owner and repository names out of url with every click
   * and pesses them into make-request function
   * @param {MouseEvent} event - The click event
   */
  const handleGoButtonPress = async (event: MouseEvent) => {
    // Expecting a URL like 'https://github.com/${owner}/${repo}'
    const pathArray = url.split('/');
    const owner = pathArray[OWNER_IN_URL];
    const repo = pathArray[REPO_IN_URL];
    setRepoName(repo);
    await makeRequest(owner, repo);
  };

  /**  Given the owner and repository names makes requests to API
   * @param {String} owner - Name of the owner of repository
   * @param {String} repo - Title of the Repository
   */

  const makeRequest = async (owner: string, repo: string) => {
    let oldTree: pathAndComment[] | null = null;
    const builtInComments: pathAndComment[] = [];

    try {
      const res = await fetch(
        `${GITHUB_API_URL_PREFIX}${owner}/${repo}${GITHUB_API_CONTENTS_SUFFIX}`,
      );
      const resJSON = await res.json();
      for (const key in resJSON) {
        const file = resJSON[key];
        const filePath = file[GithubData.PATH];
        if (filePath === README_PATH) {
          const SHA = file[GithubData.SHA];
          const blobs = await fetch(
            `${GITHUB_API_URL_PREFIX}${owner}/${repo}${GITHUB_API_BLOBS_SUFFIX}/${SHA}`,
          );
          const blobsJSON = await blobs.json();
          const decodedBlobs = atob(blobsJSON[GithubData.CONTENT]);
          const haveComments = decodedBlobs.match(COMMENTS_EXIST_REGEX);

          oldTree = getPreviousTree(haveComments);
        }
      }
    } catch (error) {
      alert(`Error${error}`);
    }

    // npm badges
    try {
      const npmPackagesResponse = await fetch(
        `${NPM_API_VERSION2}/search?q=${repo}`,
      );
      const npmPackagesResponseJSON = (await npmPackagesResponse.json()) as NpmsResponseBody;
      if (npmPackagesResponseJSON.total === 0) {
        setNpmBadgeVisible(false);
      } else {
        setNpmBadgeVisible(true);
      }
    } catch (e) {
      setNpmBadgeVisible(false);
    }

    // Tree structure
    try {
      const res = await fetch(
        `${GITHUB_API_URL_PREFIX}${owner}/${repo}${GITHUB_API_COMMITS_ON_MASTER_SUFFIX}`,
      );
      const resJSON = await res.json();
      const treeSHA = resJSON[GithubData.COMMIT][GithubData.TREE][GithubData.SHA];
      const treeRes = await fetch(
        `${GITHUB_API_URL_PREFIX}${owner}/${repo}${GITHUB_API_TREES_SUFFIX}/${treeSHA}${WITH_RECURSIVE_PARAMETER}`,
      );
      const treeJSON = await treeRes.json();

      const numberOfItems = treeJSON[GithubData.TREE].length;

      for (let index = 0; index < numberOfItems; index += 1) {
        const item = treeJSON[GithubData.TREE][index];
        if (item.type === IS_FILE) {
          const SHA = item.sha;
          const { path } = item;
          const blobs = await fetch(
            `${GITHUB_API_URL_PREFIX}${owner}/${repo}${GITHUB_API_BLOBS_SUFFIX}/${SHA}`,
          )
            .then((blobs) => blobs.json())
            .then((data) => builtInComments.push({
              path,
              comment: atob(data[GithubData.CONTENT]),
            }))
            .catch((error) => alert(`Error${error}`));
        }
      }

      setTreeCore(
        ripOutPaths(treeJSON as GithubAPIResponseBody, oldTree, builtInComments),
      );
    } catch (error) {
      alert(`Error${error}`);
    }

    // Languages
    try {
      const res = await fetch(
        `${GITHUB_API_URL_PREFIX}${owner}/${repo}${GITHUB_API_TREES_LANGUAGES}`,
      );
      const resJSON = await res.json();
      setRepoLanguages(formatLanguages(resJSON));
    } catch (error) {
      alert(`Error${error}`);
    }

    // Contributors
    try {
      const res = await fetch(
        `${GITHUB_API_URL_PREFIX}${owner}/${repo}${GITHUB_API_TREES_CONTRIBUTORS}`,
      );
      const resJSON = await res.json();
      console.log(resJSON);
    } catch (error) {
      alert(`Error${error}`);
    }
  };

  return (
    <div className="container container-small">
      <URLBox
        value={url}
        onChange={handleURLChange}
        onClick={handleGoButtonPress}
        onDefaultClick={handleExampleGoButtonPress}
      />
      {repoName !== '' && isNpmBadgeVisible && <BadgesSection url={repoName} />}
      {repoLanguages.length !== 0 && (
        <Card>
          <div className="row">
            <div className="col">
              <h2>Languages</h2>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {repoLanguages.map((line, i) => (i % 2 === 1 ? (
                <DarkBGColor>
                  <ContentSection>{line}</ContentSection>
                </DarkBGColor>
              ) : (
                <LightBGColor>
                  <ContentSection>{line}</ContentSection>
                </LightBGColor>
              )))}
            </div>
          </div>
          <div className="row">
            <CenteredCol className="col">
              <CopyToClipboard
                text={`<big><pre>\n${repoLanguages.join('\n')}\n</pre></big>`}
              >
                <CustomSecondaryButton
                  type="submit"
                  value="Copy to Clipboard"
                />
              </CopyToClipboard>
            </CenteredCol>
          </div>
        </Card>
      )}
      {treeCore.length !== 0 && <MarkdownDisplay treeCore={treeCore} />}
    </div>
  );
};

export default App;

const LightBGColor = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.25rem;
  background: #2b303b;
  background: rgba(85, 73, 89, 0.2);
  font-family: "Source Code Pro", monospace;
`;

const DarkBGColor = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.25rem;
  background: #212428;
  font-family: "Source Code Pro", monospace;
`;

const ContentSection = styled.div``;
