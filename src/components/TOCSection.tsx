import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Card from "./reusable/Card";
import CenteredCol from "./reusable/CenteredCol";
import CustomSecondaryButton from "./reusable/CustomSecondaryButton";
import styled from "styled-components";

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
      <div className="row">
        <div className="col">
          {content.map((line, i) =>
            i % 2 === 1 ? (
              <DarkBGColor>
                <ContentSection>{line}</ContentSection>
              </DarkBGColor>
            ) : (
              <LightBGColor>
                <ContentSection>{line}</ContentSection>
              </LightBGColor>
            )
          )}
        </div>
      </div>
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

const LightBGColor = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.25rem;
  background: #2b303b;
  background: rgba(85, 73, 89, 0.2);
  font-family: "Source Code Pro", monospace;
`;

const DarkBGColor = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.25rem;
  background: #212428;
  font-family: "Source Code Pro", monospace;
`;

const ContentSection = styled.div``;

export default TOCSection;
