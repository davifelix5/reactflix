import styled from "styled-components";

import { Link } from "react-router-dom";

const Button = styled(Link)`
  color: var(--white);
  border: 1px solid var(--white);
  box-sizing: border-box;
  cursor: pointer;
  padding: 16px 24px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  outline: none;
  border-radius: 4px;
  text-decoration: none;
  display: inline-block;
  transition: opacity 0.3s;
  &:hover,
  &:focus {
    opacity: 0.5;
  }

  @media (max-width: 800px) {
    width: 100%;

    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;

    border: none;
    outline: none;
    border-radius: 0;

    background-color: var(--primary);
    &:hover,
    &:focus {
      opacity: 1;
    }
  }
`;

export default Button;
