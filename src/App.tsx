import React, { useState } from 'react';
import { ripOutPaths, generateTree } from './tree'
import { GithubAPIResponseBody } from './tree/types';
import styled from 'styled-components';
import MarkdownDisplay from './components/MarkdownDisplay';
import BadgesSection from "./components/BadgesSection";

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

const InputText = styled.input.attrs(props => ({
  type: 'text',
  placeholder:'Enter a URL',
}))`
  padding: 0.5em;
  border-radius: 3px;
  border: 1px solid black;
  display: block;
  margin: 0 0 3px 0;

  ::placeholder {
    color: Grey;
  }
`;

const InputButton = styled.input.attrs(props => ({
  type: 'submit',
  value: "Go"
}))`
  position: relative;
  top: 0;
  border-radius: 3px;
  border: 1px solid black;
  margin: 2px 2px 2px 0;
  padding: 3px;
  color: #212428;
  background: #fdce03;

  transition: all 200ms;

  &:hover {
    cursor: pointer;

    top: -4px;
    box-shadow: 0px 3px 0px -1px #555555;
  }

  $:active {
    top: 0;
    box-shadow: none;
  }
`;

// Components

const App: React.FC = () => {
  const [repoName, setRepoName] = useState('react-ui');
  const [url, setURL] = useState('');
  const [markdownDisplayContent, setMarkdownDisplayContent] = useState(['public', 'src']);

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => setURL(e.target.value);

  const handleKeyPressed = async event => {
    if (event.key === 'Enter' || event.type === 'click') {
      event.preventDefault();
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
        <BadgesSection repoName={repoName}/>
        <InputText onChange={handleURLChange} onKeyDown={handleKeyPressed} />
        <InputButton onClick={handleKeyPressed}/>
        <MarkdownDisplay content={markdownDisplayContent} />
      </Column>
    </Container>
  );
};

export default App;
