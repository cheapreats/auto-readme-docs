import React, { useState } from 'react';
import { ripOutPaths, generateTree } from './tree'
import { GithubAPIResponseBody } from './tree/types';
import styled from 'styled-components';
import MarkdownDisplay from './components/MarkdownDisplay';

// Styles

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Column = styled.div`
  flex-direction: column;
`;

// Components

const App: React.FC = () => {
  const [url, setURL] = useState('');
  const [markdownDisplayContent, setMarkdownDisplayContent] = useState(['public', 'src']);

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => setURL(e.target.value);

  const handleKeyPressed = async event => {
    if (event.key === 'Enter') {
      // Expecting a URL like 'https://github.com/${owner}/${repo}'
      let pathArray = url.split('/');
      let owner = pathArray[3];
      let repo = pathArray[4];
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
    <Container>
      <Column>
        <h1>SWEGGG</h1>
        <input placeholder="Enter a Github URL" type="text" value={url} onChange={handleURLChange} onKeyDown={handleKeyPressed}/>
        <MarkdownDisplay content={markdownDisplayContent} />
      </Column>
    </Container>
  );
};

export default App;
