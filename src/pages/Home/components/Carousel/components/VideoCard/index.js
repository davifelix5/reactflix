import React, { useState } from "react";
import { VideoCardContainer, VideoCardData } from "./styles";

function getYouTubeId(youtubeURL) {
  return youtubeURL.replace(
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
    "$7"
  );
}

function VideoCard({ videoTitle, videoDescription, videoURL, videoImage, categoryColor, setPlayVideo }) {
  const image = videoImage
  const [hoverInterval, setHoverInterval] = useState(null);
  return (
    <VideoCardContainer
      url={image}
      href={videoURL}
      target="_blank"
      style={{ borderColor: categoryColor || "red" }}
      onMouseEnter={() =>
        setHoverInterval(
          setTimeout(() => setPlayVideo(getYouTubeId(videoURL)), 5000)
        )
      }
      onMouseOut={() => clearTimeout(hoverInterval)}
      onClick={() => setPlayVideo(getYouTubeId(videoURL))}
    >
      <VideoCardData>
        <VideoCardData.Title>
          {videoTitle}
        </VideoCardData.Title>
        <VideoCardData.Description>
          {videoDescription}
        </VideoCardData.Description>
      </VideoCardData>
    </VideoCardContainer>
  );
}

export default VideoCard;
