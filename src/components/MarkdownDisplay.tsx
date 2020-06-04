import React from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CustomButton from './reusable/CustomButton';
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
    <CopyToClipboard text={props.content.join('\n')}>
      <CustomButton type="submit" value="Copy to Clipboard" />
    </CopyToClipboard>
  </Card>
);

export default MarkdownDisplay;
