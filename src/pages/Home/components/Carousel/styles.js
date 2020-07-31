import styled from "styled-components";

export const Title = styled.h3`
  font-style: normal;
  font-weight: normal;
  font-size: 35px;
  line-height: 1;
  display: inline-block;
  margin: 16px 0;
  padding: 20px;
  background: red;
  line-height: 1;
  border-radius: 4px;


  @media (max-width: 800px) {
    font-size: 18px;
    padding: 10px;
  }
`;

export const ExtraLink = styled.a`
  cursor: pointer;
  margin-left: 16px;
  text-decoration: none;
  transition: opacity 0.3s;
  &:hover,
  &:focus {
    opacity: 0.5;
  }
  @media (max-width: 800px) {
    display: block;
    margin-bottom: 16px;
    margin-left: 0;
  }
`;

export const VideoCardGroupContainer = styled.section`
  color: white;
  min-height: 197px;
  margin-left: 5%;
  &:last-child {
    margin-bottom: 16px;
  }
`;

export const VideosNotFoundWrapper = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;

VideosNotFoundWrapper.Message = styled.p`
  font-size: 1.2em;
`;

VideosNotFoundWrapper.Link = styled.a`
  font-size: 1em;
`;