import React, { useState } from 'react';
import styled from 'styled-components';

const App: React.FC = () => <Input />;

const Input: React.FC = () => {
  const [url, setUrl] = useState(
    'Enter a Github Repo',
  );

  const handleChange = (event) => setUrl(event.target.value);

  return (
    <Container>
      <h1>SWEGGG</h1>
      <input type="text" value={url} onChange={handleChange} />
        <MarkDownDisplay>
            <MarkDownTextDisplay>
                <MarkDownText>📂📄 Lorem Ipmsum</MarkDownText>
            </MarkDownTextDisplay>
            <Copy>
                <CopyButton>
                    <CopyText>Copy</CopyText>
                </CopyButton>
            </Copy>
        </MarkDownDisplay>
    </Container>
  );
};

export default App;

const MarkDownText = styled.p`
  font-family: Arial;
  font-size: 22px;
`;

const Container = styled.div`
    background-color: aquamarine;
`;

const MarkDownDisplay = styled.div`
    width: 300px;
    flex: 1 0;
    background-color: grey;
    box-shadow: 0px 10px 5px lightgray;
    border-radius: 7px;
`;

const MarkDownTextDisplay = styled.div`
  padding: 5px;
`;

const Copy = styled.div`
  height: 25px;
  background-color: dimgrey;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
`;
const CopyButton = styled.div`
  height: 25px;
  margin-left: auto;
  background-color: darkgray;
  width: 50px;
  border-bottom-right-radius: 7px;
`;

const CopyText = styled.p`
  text-align: center;
  font-family: Arial;
  font-size: 16px;
  color: white;
`;