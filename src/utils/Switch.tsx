// @ts-nocheck
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 999px;
  display: flex;
  ${({ size }) => `
        width: ${size * 2}px;
        height: ${size}px;
    `}
`;

const Checkbox = styled.input`
  width: 100%;
  height: 200%;
  margin: 0;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  position: absolute;
  &:checked ~ div {
    &:after {
      ${({ size }) => `
                transform: translate3d(100%, 0, 0) translate3d(${
  size / 5
}px, 0, 0);
            `}
    }
  }
`;

const Cover = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  background-color: #2b303b;
  transition: background-color 300ms ease-in-out, disabled 300ms ease-in-out;
  ${({ disabled }) => (disabled
    ? `
        opacity: 0.7;
    `
    : '')}
  &:after {
    content: "";
    ${({ size }) => `
            width: calc(50% - ${size / 5}px);
            height: calc(100% - ${size / 5}px);
            margin: ${size / 10}px;
        `}
    border-radius: 999px;
    ${({ checked }) => (checked
    ? `
      background-color: yellow;
    `
    : 'background-color: #9aa2b2;')}
    position: absolute;
    transform: translate3d(0, 0, 0);
    transition: transform 300ms ease-in-out;
  }
`;

interface Props {
  className?: string;
  size?: number;
  onChange?: Function;
  name?: string;
  value?: boolean;
  disabled?: boolean;
}

export const Switch: React.FC<Props> = ({
  className,
  size,
  name,
  onChange = (): void => {},
  value,
  disabled,
}) => {
  const [theValue, setTheValue] = useState(value);
  const toggleState = () => {
    setTheValue(!theValue);
  };

  return (
    <Container size={size} className={className}>
      <Checkbox
        size={size}
        name={name}
        checked={theValue}
        type="checkbox"
        onChange={onChange}
        onClick={toggleState}
        disabled={disabled}
      />
      <Cover size={size} disabled={disabled} checked={theValue} />
    </Container>
  );
};

export default Switch;
