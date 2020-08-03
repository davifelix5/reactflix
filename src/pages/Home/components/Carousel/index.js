import React from "react";
import { VideoCardGroupContainer, Title, ExtraLink, VideosNotFoundWrapper } from "./styles";
import VideoCard from "./components/VideoCard";
import Slider from "./components/Slider";
import { SliderItem } from "./components/Slider/styles";
import { Link } from 'react-router-dom';

function VideoCardGroup({ ignoreFirstVideo, category, setPlayVideo }) {
  const categoryTitle = category.name;
  const categoryColor = category.color;
  const categoryExtraLink = category.extraLink;
  const videos = category.videos;
  if (ignoreFirstVideo && videos.length === 1) {
    return null
  }
  return (
    <VideoCardGroupContainer>
      {categoryTitle && (
        <>
          <Title style={{ backgroundColor: categoryColor || "red" }}>
            {categoryTitle}
          </Title>
          {categoryExtraLink && (
            <ExtraLink href={categoryExtraLink.url} target="_blank">
              {categoryExtraLink.text}
            </ExtraLink>
          )}
        </>
      )}
      {videos.length ? (
        <Slider arrowColor={categoryColor}>
          {videos.map((video, index) => {
            if (ignoreFirstVideo && index === 0) {
              return null;
            }

            return (
              <SliderItem key={video.id}>
                <VideoCard
                  videoTitle={video.title}
                  videoURL={video.url}
                  videoImage={video.youtube_image}
                  videoDescription={video.description}
                  categoryColor={categoryColor}
                  setPlayVideo={setPlayVideo}
                />
              </SliderItem>
            );
          })}
        </Slider>
      ) : (
          <VideosNotFoundWrapper>
            <VideosNotFoundWrapper.Message>
              Não há vídeos registrados
            </VideosNotFoundWrapper.Message>
            <VideosNotFoundWrapper.Link as={Link} to="/cadastro/video">
              Registre vídeos nessa categoria
            </VideosNotFoundWrapper.Link>
          </VideosNotFoundWrapper>
        )}

    </VideoCardGroupContainer>
  );
}

export default VideoCardGroup;
