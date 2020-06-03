import React from 'react';
import styled from 'styled-components';
import MarkdownDisplayLine from './MarkdownDisplayLine';

// Styles

const Card = styled.div`
  width: 100%;
  padding: 2rem;
  background: #212428;
  color: white;
`;

// Components

interface Props {
  content: string[];
}

const MarkdownDisplay: React.FC<Props> = (props: Props) => (
  <Card>
    {
      props.content.map((line, i) => (
        <MarkdownDisplayLine isOddNumberedLine={i % 2 === 1} content={line} />
      ))
    }
  </Card>
);

export default MarkdownDisplay;
