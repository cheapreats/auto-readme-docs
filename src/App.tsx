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
                <MarkDownTextContainerLight>
                    <MarkDownText>📂📄 Lorem Ipmsum</MarkDownText>
                    <DeleteContainer />
                </MarkDownTextContainerLight>
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
  font-size: 16px;
`;


const MarkDownTextContainer = styled.div`
  height: 25px;
  padding: 0 5px;
  flex: 1 0;
  flex-direction: row;
  justify-content: space-between;
  
  &:hover {
    background-color: saddlebrown;
  }
`;

const MarkDownTextContainerLight = styled(MarkDownTextContainer)`
  background-color: white;
`;

const MarkDownTextContainerDark = styled(MarkDownTextContainer)`
  background-color: red;
`;

const DeleteContainer = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 500px;
  background-color: red;
  float: right;
  display: none;
  ${MarkDownTextContainer}:hover & {
    display: flex;
  }
`;

const Container = styled.div`
    background-color: aquamarine;
    flex: 1 0;
`;

const MarkDownDisplay = styled.div`
    width: 300px;
    flex: 1 0;
    background-color: grey;
    box-shadow: 0px 10px 5px lightgray;
    border-radius: 7px;
`;

const MarkDownTextDisplay = styled.div`
    padding: 5px 0;
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