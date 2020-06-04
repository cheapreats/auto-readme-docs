import React from 'react';
import styled from 'styled-components';

// Styles

const LightBGColor = styled.div`
  padding: 0.25rem;
  background: #2b303b;
  background: rgba(85, 73, 89, 0.2);
  font-family: 'Source Code Pro', monospace;
`;

const DarkBGColor = styled.div`
  padding: 0.25rem;
  background: #212428;
  font-family: 'Source Code Pro', monospace;
`;

// Components

interface Props {
  isOddNumberedLine: boolean;
  content: string;
}

const MarkdownDisplayLine: React.FC<Props> = (props: Props) => {
  if (props.isOddNumberedLine) {
    return (
      <DarkBGColor>
        {props.content}
      </DarkBGColor>
    );
  }
  return (
    <LightBGColor>
      {props.content}
    </LightBGColor>
  );
};

export default MarkdownDisplayLine;
