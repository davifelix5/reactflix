import styled from "styled-components";

export const PrimaryBtn = styled.button`
  cursor: pointer;
  margin-bottom: 40px;
  color: var(--white);
  background-color: var(--primary);
  border: none;
  outline: none;
  padding: 10px 30px;
  border-radius: 4px;
  font-size: 21px;
  transition: all 0.3s;
  &:hover {
      opacity: 0.8;
  }
  @media (max-width: 800px) {
    font-size: 1em;
  }
`;
