import React from "react";
import styled from "styled-components";

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

interface Props {
  content: string[];
}

const GetAlternateColorRow: React.FC<Props> = ({ content }) => {
  return (
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
  );
};

export default GetAlternateColorRow;
