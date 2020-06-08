import React from 'react';
import styled from 'styled-components';
// import { collapse } from '../tree';
// import { TreeCore } from '../tree/types';

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
  collapse: (index: number) => void;
  isOddNumberedLine: boolean;
  content: string;
  index: number;
  isDisplayed: boolean;
}

const MarkdownDisplayLine: React.FC<Props> = (props: Props) => {
  const handleClick = (event: MouseEvent) => {
    props.collapse(props.index);
  }
  if (props.isOddNumberedLine) {
    return (
      <DarkBGColor onClick={handleClick}>
        {props.isDisplayed ? props.content : null}
      </DarkBGColor>
    );
  }
  return (props.isDisplayed ? (
    <LightBGColor onClick={handleClick}>
      {props.isDisplayed ? props.content : null}
    </LightBGColor>
  ) : <div>{null}</div>);
};

export default MarkdownDisplayLine;
