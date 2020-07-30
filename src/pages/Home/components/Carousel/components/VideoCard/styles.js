import styled from "styled-components";

export const VideoCardData = styled.div`
  color: var(--white);
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  transition: opacity 0.5s;
`;

VideoCardData.Title = styled.p`
  font-size: 1.2em;
`;

VideoCardData.Description = styled.p`
  font-size: 0.8em;
  font-weight: 400;
`;

export const VideoCardContainer = styled.div`
  border: 2px solid;
  border-radius: 4px;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
  color: white;
  flex: 0 0 298px;
  width: 298px;
  height: 197px;
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  position: relative;
  display: flex;
  align-items: flex-end;
  background-color: black;

  &:hover ${VideoCardData}, &:focus ${VideoCardData} {
    opacity: 1;
  }

  &:not(:first-child) {
    margin-left: 20px;
  }
`;
