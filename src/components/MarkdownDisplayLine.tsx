import React, { useEffect } from "react";
import styled from "styled-components";
import { Core } from "../tree/types";
import deleteFileFromPath from "../utils/deleteFileFromPath";
// Styles

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

const DeletionButton = styled.button<Props>`
  background: none;
  border: none;
  font-family: "Source Code Pro", monospace;
  color: #b3c3d3;
`;

// Components

interface Props {
  isOddNumberedLine: boolean;
  content: string;
  onChange: Function;
  treeCore: Core[];
}

const MarkdownDisplayLine: React.FC<Props> = ({
  isOddNumberedLine,
  content,
  treeCore,
  onChange = (): void => {},
}) => {
  const path = (hyperLink: string): string => {
    const startOfAddress = content.indexOf("(./") + 3;
    const fileName = content.substring(
      content.indexOf("[") + 1,
      content.indexOf("]", startOfAddress - 4)
    );
    const endOfAddress = content.indexOf(fileName + ")", startOfAddress);
    return content.substring(startOfAddress, endOfAddress + fileName.length);
  };

  const handleDeletion = () => {
    deleteFileFromPath(treeCore, path(content));
    onChange(treeCore);
  };
  if (isOddNumberedLine) {
    return (
      <DarkBGColor>
        <ContentSection>{content}</ContentSection>
        <DeletionButton onClick={() => handleDeletion()}>X</DeletionButton>
      </DarkBGColor>
    );
  }
  return (
    <LightBGColor>
      <ContentSection>{content}</ContentSection>
      <DeletionButton onClick={() => handleDeletion()}>X</DeletionButton>
    </LightBGColor>
  );
};

export default MarkdownDisplayLine;
