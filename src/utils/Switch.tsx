// @ts-nocheck
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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
  background-color: #e6e6e6;
  transition: background-color 300ms ease-in-out, disabled 300ms ease-in-out;
  ${({ disabled }) =>
    disabled
      ? `
        opacity: 0.7;
    `
      : ""}
  &:after {
    content: "";
    ${({ size }) => `
            width: calc(50% - ${size / 5}px);
            height: calc(100% - ${size / 5}px);
            margin: ${size / 10}px;
        `}
    border-radius: 999px;
    background-color: white;
    position: absolute;
    transform: translate3d(0, 0, 0);
    transition: transform 300ms ease-in-out;
  }
`;

export class Switch extends Component {
  state = { value: this.props.value };
  toggleState = () => this.setState(({ value }) => ({ value: !value }));

  componentDidUpdate({ value }) {
    if (value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  render() {
    const { value } = this.state;
    const { className, size = 26, name, disabled, onChange } = this.props;
    return (
      <Container size={size} className={className}>
        <Checkbox
          size={size}
          name={name}
          checked={value}
          type="checkbox"
          onChange={onChange}
          onClick={this.toggleState}
          disabled={disabled}
        />
        <Cover size={size} disabled={disabled} />
      </Container>
    );
  }
}

// @ts-ignore
Switch.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  value: PropTypes.bool,
  disabled: PropTypes.bool,
};
export default Switch;
