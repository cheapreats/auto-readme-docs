import React from 'react';

// Component

interface Props {
  content: string[];
}

const MarkdownDisplay: React.FC<Props> = (props: Props) => (
  <>
    <p>MarkdownDisplay component</p>
    {props.content.map((line) => <p>{line}</p>)}
  </>
);

export default MarkdownDisplay;
