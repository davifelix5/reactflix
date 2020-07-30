import styled from "styled-components";

export const AppWrapper = styled.div`
  background-color: black;
  padding-top: 94px;
  color: white;
  flex: 1;

  h1 {
    text-align: center;
    margin: 30px 0;
    font-weight: normal;
  }

  @media (max-width: 800px) {
    padding-top: 55px;
  }
`;
