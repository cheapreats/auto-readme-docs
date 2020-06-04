import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Card from './reusable/Card';
import CenteredCol from './reusable/CenteredCol';
import CustomButton from './reusable/CustomButton';
import MarkdownDisplayLine from './MarkdownDisplayLine';

interface Props {
  content: string[];
}

const MarkdownDisplay: React.FC<Props> = (props: Props) => (
  <Card>
    <div className="row">
      <div className="col">
        <h2>Tree</h2>
      </div>
    </div>
    <div className="row">
      <div className="col">
        {
          props.content.map((line, i) => (
            <MarkdownDisplayLine isOddNumberedLine={i % 2 === 1} content={line} />
          ))
        }
      </div>
    </div>
    <div className="row">
      <CenteredCol className="col">
        <CopyToClipboard text={props.content.join('\n')}>
          <CustomButton type="submit" value="Copy to Clipboard" />
        </CopyToClipboard>
      </CenteredCol>
    </div>
  </Card>
);

export default MarkdownDisplay;
