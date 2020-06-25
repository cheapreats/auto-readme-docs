import React, { useState } from 'react';
import { ripOutPaths, generateTree } from './tree'
import {GithubAPIResponseBody, NpmsResponseBody} from './tree/types';
import styled from 'styled-components';
import MarkdownDisplay from './components/MarkdownDisplay';
import BadgesSection from "./components/BadgesSection";
import CustomButton from './components/reusable/CustomButton';
import URLBox from './components/URLBox';

const App: React.FC = () => {
  const [repoName, setRepoName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [isNpmBadgeVisible, setNpmBadgeVisible] = useState(false);
  const [url, setURL] = useState('');
  const [markdownDisplayContent, setMarkdownDisplayContent] = useState<string[]>([]);

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => setURL(e.target.value);

  const handleGoButtonPress = async (event: MouseEvent) => {
    // Expecting a URL like 'https://github.com/${owner}/${repo}'
    const pathArray = url.split('/');
    const owner = pathArray[3];
    const repo = pathArray[4];
    setRepoName(repo);
    setOwnerName(owner);
    await makeRequest(owner, repo);
  };

  const makeRequest = async (owner: String, repo: String) => {

    // npm badges
    try {
      const npmPackagesResponse = await fetch(`https://api.npms.io/v2/search?q=${repo}`);
      const npmPackagesResponseJSON = await npmPackagesResponse.json() as NpmsResponseBody;
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
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits/master`);
      const resJSON = await res.json();
      const treeSHA = resJSON["commit"]["tree"]["sha"]
      const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${treeSHA}?recursive=true`);
      const treeJSON = await treeRes.json();
      setMarkdownDisplayContent(generateTree(ripOutPaths(treeJSON as GithubAPIResponseBody)));
    } catch (error) {
      alert('Error' + error);
    }

    // Languages
    try {
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`);
      const resJSON = await res.json();
      console.log(resJSON);
    } catch (error) {
      alert('Error' + error);
    }

    // Contributors
    try {
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`);
      const resJSON = await res.json();
      console.log(resJSON);
    } catch (error) {
      alert('Error' + error);
    }
  }
  return (
    <div className="container container-small">
      <URLBox value={url} onChange={handleURLChange} onClick={handleGoButtonPress} />
      {repoName !== '' && isNpmBadgeVisible &&
        <BadgesSection repoName={repoName} ownerName={ownerName}/>
      }
      {markdownDisplayContent.length !== 0 &&
        <MarkdownDisplay content={markdownDisplayContent} />
      }
    </div>
  );
};

export default App;
