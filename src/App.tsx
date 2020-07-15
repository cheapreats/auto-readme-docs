import React, { useState } from "react";
import { ripOutPaths } from "./tree";
import { GithubAPIResponseBody, NpmsResponseBody } from "./tree/types";
import MarkdownDisplay from "./components/MarkdownDisplay";
import BadgesSection from "./components/BadgesSection";
import CustomButton from "./components/reusable/CustomButton";
import URLBox from "./components/URLBox";
import generateMarkDownTree from "./utils/generateMarkDownTree";
import { Core } from "./tree/types";
import {formatLanguages} from "./utils/formatLanguages";
import CustomSecondaryButton from "./components/reusable/CustomSecondaryButton";
import undoDeletions from "./utils/undoDeletions";
import getCopyToClipboardContents from "./utils/getCopyToClipboardContents";
import MarkdownDisplayLine from "./components/MarkdownDisplayLine";
import CenteredCol from "./components/reusable/CenteredCol";
import Card from "./components/reusable/Card";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styled from "styled-components";

const App: React.FC = () => {
  const [repoName, setRepoName] = useState("");
  const [repoLanguages, setRepoLanguages] = useState<string[]>([]);
  const [isNpmBadgeVisible, setNpmBadgeVisible] = useState(false);
  const [url, setURL] = useState("");
  const [treeCore, setTreeCore] = useState<Core[]>([]);

  const [clipboardContent, setClipboardContent] = useState<string[]>(
      getCopyToClipboardContents(treeCore)
  );
  const [markdownDisplayContent, setMarkdownDisplayContent] = useState<
    string[]
  >([]);

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setURL(e.target.value);

  const handleGoButtonPress = async (event: MouseEvent) => {
    // Expecting a URL like 'https://github.com/${owner}/${repo}'
    const pathArray = url.split("/");
    const owner = pathArray[3];
    const repo = pathArray[4];
    setRepoName(repo);
    await makeRequest(owner, repo);
  };

  const makeRequest = async (owner: String, repo: String) => {
    // npm badges
    try {
      const npmPackagesResponse = await fetch(
        `https://api.npms.io/v2/search?q=${repo}`
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
        `https://api.github.com/repos/${owner}/${repo}/commits/master`
      );
      const resJSON = await res.json();
      const treeSHA = resJSON["commit"]["tree"]["sha"];
      const treeRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/git/trees/${treeSHA}?recursive=true`
      );
      const treeJSON = await treeRes.json();
      setTreeCore(ripOutPaths(treeJSON as GithubAPIResponseBody));
    } catch (error) {
      alert("Error" + error);
    }

    // Languages
    try {
      const res = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/languages`
      );
      const resJSON = await res.json();
      setRepoLanguages(formatLanguages(resJSON));
    } catch (error) {
      alert("Error" + error);
    }

    // Contributors
    try {
      const res = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contributors`
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
      />
      {repoName !== "" && isNpmBadgeVisible && (
        <BadgesSection url={repoName} />
      )}
      {repoLanguages.length !== 0 && (
          <Card>
            <div className="row">
              <div className="col">
                <h2>Languages</h2>
              </div>
            </div>
            <div className="row">
              <div className="col">
                {repoLanguages.map((line, i) => (
                  i % 2 === 1 ? (
                    <DarkBGColor>
                    <ContentSection>{line}</ContentSection>
                    </DarkBGColor>
                  ) : (
                    <LightBGColor>
                    <ContentSection>{line}</ContentSection>
                    </LightBGColor>
                  )
                ))}
              </div>
            </div>
            <div className="row">
              <CenteredCol className="col">
                <CopyToClipboard
                    text={`<big><pre>\n${clipboardContent.join("\n")}\n</pre></big>`}
                >
                  <CustomSecondaryButton type="submit" value="Copy to Clipboard" />
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