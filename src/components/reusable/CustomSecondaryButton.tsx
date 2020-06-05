import styled from 'styled-components';

const CustomSecondaryButton = styled.input.attrs((props) => ({
  type: 'submit',
  value: props.value,
  onclick: props.onClick,
}))`

  position: relative;
  top: 0;
  padding: 0.5rem 1.25rem;

  color: #212428;
  background: #fdce03;
  font-family: 'Muli';
  font-size: 0.9rem;
  border: none;

  transition: all 200ms;

  &:hover {
    cursor: pointer;

    top: -4px;
    box-shadow: 0px 4px 0px -2px #212428, 0px 8px 0px -4px #fdce03;
  }
 
  &:active {
    top: 0;
    box-shadow: none;
  }
`;

export default CustomSecondaryButton;
