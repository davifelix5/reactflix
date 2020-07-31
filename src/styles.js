import styled from "styled-components";

export const AppWrapper = styled.div`
  background-color: black;
  padding-top: 94px;
  color: white;
  flex: 1;
  display: flex;
  flex-direction: column;

  h1 {
    text-align: center;
    margin: ${({ titleMargin }) => `${titleMargin}px`} 0;
    font-weight: normal;
  }

  @media (max-width: 800px) {
    padding-top: 55px;
  }
`;
