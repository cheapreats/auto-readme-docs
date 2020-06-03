import React, { useState } from 'react';
import styled from 'styled-components';

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
  const [url, setURL] = useState('Enter a Github Repo');

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => setURL(e.target.value);

  return (
    <Container>
      <Column>
        <h1>SWEGGG</h1>
        <input type="text" value={url} onChange={handleURLChange} />
      </Column>
    </Container>
  );
};

export default App;
