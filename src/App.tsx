import React, { useState } from "react";
import { ripOutPaths } from "./tree";
import { GithubAPIResponseBody, NpmsResponseBody } from "./tree/types";
import MarkdownDisplay from "./components/MarkdownDisplay";
import BadgesSection from "./components/BadgesSection";
import URLBox from "./components/URLBox";
import { Core } from "./tree/types";
import { formatLanguages } from "./utils/formatLanguages/formatLanguages";
import CustomSecondaryButton from "./components/reusable/CustomSecondaryButton";
import CenteredCol from "./components/reusable/CenteredCol";
import Card from "./components/reusable/Card";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styled from "styled-components";
import getPreviousTree from "./utils/getPreviousTree";

interface oldTree {
  path: string | undefined;
  comment: string | undefined;
}

const App: React.FC = () => {
  const [repoName, setRepoName] = useState("");
  const [repoLanguages, setRepoLanguages] = useState<string[]>([]);
  const [isNpmBadgeVisible, setNpmBadgeVisible] = useState(false);
  const [url, setURL] = useState("");
  const [treeCore, setTreeCore] = useState<Core[]>([]);

  const OWNER_IN_URL = 3;
  const REPO_IN_URL = 4;

  const handleExampleGoButtonPress = async () => {
    const url = "https://github.com/cheapreats/auto-readme-docs";
    const pathArray = url.split("/");
    const owner = pathArray[OWNER_IN_URL];
    const repo = pathArray[REPO_IN_URL];
    setRepoName(repo);
    await makeRequest(owner, repo);
  };

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setURL(e.target.value);

  const handleGoButtonPress = async (event: MouseEvent) => {
    // Expecting a URL like 'https://github.com/${owner}/${repo}'
    const pathArray = url.split("/");
    const owner = pathArray[OWNER_IN_URL];
    const repo = pathArray[REPO_IN_URL];
    setRepoName(repo);
    await makeRequest(owner, repo);
  };

  const makeRequest = async (owner: String, repo: String) => {
    let oldTree: oldTree[] | null = null;

    try {
      const README = "README.md";
      const res = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents`,
        {
          headers: {
            authorization: "token 977aec209319da58a965cee75eafbca4dce73fb8",
          },
        }
      );
      const resJSON = await res.json();
      const commentsExistRegex = /((\[.+)\]\(\.\/.+\)\s+# .+)/g;
      for (const key in resJSON) {
        const file = resJSON[key];
        if (file["path"] === README) {
          const SHA = file["sha"];
          const blobs = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/git/blobs/${SHA}`,
            {
              headers: {
                authorization: "token 977aec209319da58a965cee75eafbca4dce73fb8",
              },
            }
          );
          const blobsJSON = await blobs.json();
          const decodedBlobs = atob(blobsJSON["content"]);
          const haveComments = decodedBlobs.match(commentsExistRegex);

          oldTree = getPreviousTree(haveComments);
        }
      }
    } catch (error) {
      alert("Error" + error);
    }

    // npm badges
    try {
      const npmPackagesResponse = await fetch(
        `https://api.npms.io/v2/search?q=${repo}`,
        {
          headers: {
            authorization: "token 977aec209319da58a965cee75eafbca4dce73fb8",
          },
        }
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
        `https://api.github.com/repos/${owner}/${repo}/commits/master`,
        {
          headers: {
            authorization: "token 977aec209319da58a965cee75eafbca4dce73fb8",
          },
        }
      );
      const resJSON = await res.json();
      const treeSHA = resJSON["commit"]["tree"]["sha"];
      const treeRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/git/trees/${treeSHA}?recursive=true`,
        {
          headers: {
            authorization: "token 977aec209319da58a965cee75eafbca4dce73fb8",
          },
        }
      );
      const treeJSON = await treeRes.json();
      setTreeCore(ripOutPaths(treeJSON as GithubAPIResponseBody, oldTree));
    } catch (error) {
      alert("Error" + error);
    }

    // Languages
    try {
      const res = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/languages`,
        {
          headers: {
            authorization: "token 977aec209319da58a965cee75eafbca4dce73fb8",
          },
        }
      );
      const resJSON = await res.json();
      setRepoLanguages(formatLanguages(resJSON));
    } catch (error) {
      alert("Error" + error);
    }

    // Contributors
    try {
      const res = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contributors`,
        {
          headers: {
            authorization: "token 977aec209319da58a965cee75eafbca4dce73fb8",
          },
        }
      );

      const resJSON = await res.json();
      console.log(resJSON);
    } catch (error) {
      alert("Error" + error);
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
      {repoName !== "" && isNpmBadgeVisible && <BadgesSection url={repoName} />}
      {repoLanguages.length !== 0 && (
        <Card>
          <div className="row">
            <div className="col">
              <h2>Languages</h2>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {repoLanguages.map((line, i) =>
                i % 2 === 1 ? (
                  <DarkBGColor>
                    <ContentSection>{line}</ContentSection>
                  </DarkBGColor>
                ) : (
                  <LightBGColor>
                    <ContentSection>{line}</ContentSection>
                  </LightBGColor>
                )
              )}
            </div>
          </div>
          <div className="row">
            <CenteredCol className="col">
              <CopyToClipboard
                text={`<big><pre>\n${repoLanguages.join("\n")}\n</pre></big>`}
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
