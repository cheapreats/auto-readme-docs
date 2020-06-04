import React, { useState } from 'react';
import { ripOutPaths, generateTree } from './tree'
import { GithubAPIResponseBody } from './tree/types';
import styled from 'styled-components';
import MarkdownDisplay from './components/MarkdownDisplay';
import BadgesSection from "./components/BadgesSection";
import CustomButton from './components/reusable/CustomButton';
import URLBox from './components/URLBox';

const App: React.FC = () => {
  const [repoName, setRepoName] = useState('react-ui');
  const [url, setURL] = useState('');
  const [markdownDisplayContent, setMarkdownDisplayContent] = useState(['public', 'src']);

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => setURL(e.target.value);

  const handleKeyPressed = async event => {
    if (event.key === 'Enter') {
      // Expecting a URL like 'https://github.com/${owner}/${repo}'
      let pathArray = url.split('/');
      let owner = pathArray[3];
      let repo = pathArray[4];
      setRepoName(repo);
      await makeRequest(owner, repo);
    }
  }

  const makeRequest = async (owner: String, repo: String) => {
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
  }
  return (
    <div className="container">
      <URLBox />
      <BadgesSection repoName={repoName} />
      <input placeholder="Enter a Github URL" type="text" value={url} onChange={handleURLChange} onKeyDown={handleKeyPressed} />
      <MarkdownDisplay content={markdownDisplayContent} />
    </div>
  );
};

export default App;
