import React from "react";
import { VideoCardGroupContainer, Title, ExtraLink } from "./styles";
import VideoCard from "./components/VideoCard";
import Slider from "./components/Slider";
import { SliderItem } from "./components/Slider/styles";

function VideoCardGroup({ ignoreFirstVideo, category, setPlayVideo }) {
  const categoryTitle = category.name;
  const categoryColor = category.color;
  const categoryExtraLink = category.extraLink;
  const videos = category.videos;
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
                videoDescription={video.description}
                categoryColor={categoryColor}
                setPlayVideo={setPlayVideo}
              />
            </SliderItem>
          );
        })}
      </Slider>
    </VideoCardGroupContainer>
  );
}

export default VideoCardGroup;
