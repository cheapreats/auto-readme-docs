import React, { useState } from "react";
import styled from "styled-components";
import { Core } from "../tree/types";
import deleteFileFromPath from "../utils/deleteFileFromPath/deleteFileFromPath";
import setCommentForPath from "../utils/setCommentForPath/setCommentForPath";
import CommentSection from "./CommentSection";

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

const DeletionButton = styled.button`
  background: none;
  border: none;
  font-family: "Source Code Pro", monospace;
  color: #b3c3d3;
`;
const EditButton = styled.button`
  background: none;
  border: none;
  font-family: "Source Code Pro", monospace;
  color: #b3c3d3;
`;

interface Props {
  isOddNumberedLine: boolean;
  content: string;
  onChange: Function;
  treeCore: Core[];
}

const EDIT_ICON = "✏";

const MarkdownDisplayLine: React.FC<Props> = ({
  isOddNumberedLine,
  content,
  treeCore,
  onChange = (): void => {},
}) => {
  const splitParts = (hyperLink: string): Object => {
    const RIGHT_BEFORE_ADDRESS_STARTS = "(./";
    const RIGHT_AFTER_ADDRESS_ENDS = ")";

    const startOfAddress =
      content.indexOf(RIGHT_BEFORE_ADDRESS_STARTS) +
      RIGHT_BEFORE_ADDRESS_STARTS.length;

    const RIGHT_BEFORE_FILENAME_STARTS = "[";
    const RIGHT_AFTER_FILENAME_ENDS = "]";
    const fileName = content.substring(
      content.indexOf(RIGHT_BEFORE_FILENAME_STARTS) + 1,
      content.indexOf(
        RIGHT_AFTER_FILENAME_ENDS,
        startOfAddress - RIGHT_BEFORE_ADDRESS_STARTS.length - 1
      )
    );
    const endOfAddress = content.indexOf(
      fileName + RIGHT_AFTER_ADDRESS_ENDS,
      startOfAddress
    );
    return {
      startOfAddress: startOfAddress,
      endOfAddress: endOfAddress,
      fileName: fileName,
    };
  };

  const path = (hyperLink: string): string => {
    const parts = splitParts(hyperLink);
    return content.substring(
      parts["startOfAddress"],
      parts["endOfAddress"] + parts["fileName"].length
    );
  };

  const getComment = (hyperLink: string): string => {
    const commentSquare = "# ";
    const parts = splitParts(hyperLink);
    const oneCharAfterLastParathisis =
      parts["endOfAddress"] + parts["fileName"].length + 1;
    const linkEnds = content.substring(
      oneCharAfterLastParathisis,
      hyperLink.length
    );
    const withoutSpaces = linkEnds.trimStart();
    const currentComment = withoutSpaces.substring(commentSquare.length);
    return currentComment;
  };

  const [comment, setComment] = useState(getComment(content));
  const [commentVisibilty, setCommentVisibility] = useState(false);
  const changeComment = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setComment(event.currentTarget.value);
  };
  const setNewComment = (): void => {
    setCommentForPath(treeCore, path(content), comment);

    setCommentVisibility(!commentVisibilty);
    onChange(treeCore);
  };
  const handleDeletion = () => {
    deleteFileFromPath(treeCore, path(content));
    onChange(treeCore);
  };

  if (isOddNumberedLine) {
    return (
      <DarkBGColor>
        <div style={{ width: "100%" }}>
          {content}
          <div style={{ width: "100%", position: "relative", left: "-12px" }}>
            <CommentSection
              isVisible={commentVisibilty}
              value={comment}
              onChange={(e) => changeComment(e)}
              onClick={() => setNewComment()}
            ></CommentSection>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <DeletionButton onClick={() => handleDeletion()}>X</DeletionButton>
          <EditButton onClick={() => setCommentVisibility(!commentVisibilty)}>
            {EDIT_ICON}
          </EditButton>
        </div>
      </DarkBGColor>
    );
  }
  return (
    <LightBGColor>
      <div style={{ width: "100%" }}>
        {content}
        <div style={{ width: "100%", position: "relative", left: "-12px" }}>
          <CommentSection
            isVisible={commentVisibilty}
            value={comment}
            onChange={(e) => changeComment(e)}
            onClick={() => setNewComment()}
          ></CommentSection>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <DeletionButton onClick={() => handleDeletion()}>X</DeletionButton>
        <EditButton onClick={() => setCommentVisibility(!commentVisibilty)}>
          {EDIT_ICON}
        </EditButton>
      </div>
    </LightBGColor>
  );
};

export default MarkdownDisplayLine;
