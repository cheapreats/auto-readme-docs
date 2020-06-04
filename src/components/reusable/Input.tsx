import styled from 'styled-components';

const Input = styled.input.attrs((props) => ({
  type: 'text',
  placeholder: props.placeholder,
  value: props.value,
  onChange: props.onChange,
}))`
  color: white;
  border: none;
  flex: auto;

  margin: 0rem 1rem;
  padding: 1rem;
  // min-width: 500px;

  background: none;
  box-shadow: inset 0px -2px 0 #414959;

  transition: all 200ms;

  &:focus {
    outline: none;
    background: #414959;
  }

  &::placeholder {
    font-style: italic;
    color: #b3c3d3;
  }
`;

export default Input;
