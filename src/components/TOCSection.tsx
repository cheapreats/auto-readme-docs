import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Card from "./reusable/Card";
import CenteredCol from "./reusable/CenteredCol";
import CustomSecondaryButton from "./reusable/CustomSecondaryButton";
import GetAlternateColorRow from "./reusable/getAlternateColorRow";

interface Props {
  content: string[];
}

const TOCSection: React.FC<Props> = ({ content }): React.ReactElement => {
  return (
    <Card>
      <div className="row">
        <div className="col">
          <h2>Table Of Content</h2>
        </div>
      </div>
      <div className="col" style={{ margin: "-30px 0px 10px 0px" }}></div>
      <GetAlternateColorRow content={content} />
      <div className="row">
        <CenteredCol className="col">
          <CopyToClipboard text={`\n${content.join("\n")}\n`}>
            <CustomSecondaryButton type="submit" value="Copy to Clipboard" />
          </CopyToClipboard>
        </CenteredCol>
      </div>
    </Card>
  );
};

export default TOCSection;
