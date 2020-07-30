import styled from "styled-components";

export const IframeEmbed = styled.iframe`
  width: 80%;
  height: 92%;
  @media (max-width: 800px) {
    width: 80%;
    height: 60%;
  }
  @media (max-width: 500px) {
    width: 80%;
    height: 30%;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  color: var(--white);
  font-size: 1.2em;
  &:hover {
    transform: scale(1.2);
  }
  &:active {
    transform: scale(1);
  }
`;

export const IframeContainer = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
`;
