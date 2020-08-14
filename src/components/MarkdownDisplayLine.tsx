import React, { useState } from "react";
import styled from "styled-components";
import { Core } from "../tree/types";
import deleteFileFromPath from "../utils/deleteFileFromPath/deleteFileFromPath";
import setCommentForPath from "../utils/setCommentForPath/setCommentForPath";
import extractString from "../utils/extractString";
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
const RIGHT_BEFORE_COMMENT_STARTS = "<span># ";
const RIGHT_AFTER_COMMENT_ENDS = "</span>";
const RIGHT_BEFORE_FILENAME_STARTS = '">';
const RIGHT_AFTER_FILENAME_ENDS = "</a>";
const RIGHT_BEFORE_PATH_STARTS = '<a href="./';
const RIGHT_AFTER_PATH_ENDS = '">';

const MarkdownDisplayLine: React.FC<Props> = ({
  isOddNumberedLine,
  content,
  treeCore,
  onChange = (): void => {},
}) => {
  /** Given a The string rips out the path inside The string
   * @param {string} content - The string
   * @returns {string} - Returns the path from hyperlink
   */
  const getPath = (content: string): string => {
    return extractString(
      content,
      RIGHT_BEFORE_PATH_STARTS,
      RIGHT_AFTER_PATH_ENDS
    );
  };

  /** Given a string, returns the comment inside the string
   * @param {string} content - The string
   * @returns {string} - Returns the path inside the hyperlink
   */
  const getComment = (content: string): string => {
    return extractString(
      content,
      RIGHT_BEFORE_COMMENT_STARTS,
      RIGHT_AFTER_COMMENT_ENDS
    );
  };

  const [comment, setComment] = useState(getComment(content));
  const [commentVisibilty, setCommentVisibility] = useState(false);
  const changeComment = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setComment(event.currentTarget.value);
  };
  const setNewComment = (): void => {
    setCommentForPath(treeCore, getPath(content), comment);
    setCommentVisibility(!commentVisibilty);
    onChange(treeCore);
  };
  const handleDeletion = () => {
    deleteFileFromPath(treeCore, getPath(content));
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
