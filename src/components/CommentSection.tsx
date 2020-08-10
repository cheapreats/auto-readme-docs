import React from "react";

import styled from "styled-components";
import { TextArea as T } from "./reusable/TextArea";

const Input = styled(T)<Props>`
  width: 100%;
  height: 100%;
`;

const Submit = styled.button`
  width: 27px;
  height: 27px;
  left: 98%;
  top: -33px;
  position: relative;
  background-color: #343a40;
  color: #b3c3d3;
  &:focus {
    color: yellow;
  }
`;

const CommentBox = styled.div<Props>`
  ${({ isVisible }): string =>
    isVisible
      ? `
    display: block;
`
      : "display:none;"}
`;

interface Props {
  isVisible: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: MouseEvent) => void;
}

export const CommentSection: React.FC<Props> = (
  props: Props
): React.ReactElement => {
  return (
    <CommentBox isVisible={props.isVisible}>
      <Input value={props.value} onChange={props.onChange}></Input>
      <Submit onClick={props.onClick}>✓</Submit>
    </CommentBox>
  );
};
export default CommentSection;
