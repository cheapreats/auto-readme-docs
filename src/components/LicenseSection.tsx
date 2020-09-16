import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Card from "./reusable/Card";
import CenteredCol from "./reusable/CenteredCol";
import CustomSecondaryButton from "./reusable/CustomSecondaryButton";

interface Props {
  content: string;
}

const LicenseSection: React.FC<Props> = ({ content }): React.ReactElement => {
  const generateLink = (content) => {
    return ` <a href="./LICENSE">${content}</a>`;
  };

  return (
    <Card>
      <div className="row">
        <div className="col">
          <h2>License</h2>
        </div>
      </div>
      <div className="col" style={{ margin: "-30px 0px 10px 0px" }}>
        <p>{content}</p>
      </div>
      <div className="row">
        <CenteredCol className="col">
          <CopyToClipboard text={`\n${generateLink(content)}\n`}>
            <CustomSecondaryButton type="submit" value="Copy to Clipboard" />
          </CopyToClipboard>
        </CenteredCol>
      </div>
    </Card>
  );
};

export default LicenseSection;
