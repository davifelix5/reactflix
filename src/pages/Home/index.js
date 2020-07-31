import React, { useState, useEffect } from "react";
import BannerMain from "./components/BannerMain";
import Carousel from "./components/Carousel";
import EmbedIframe from "./components/VideoIframeEmbed";
import Loader from '../../components/Loader'

import TemplatePage from "../../components/TemplatePage";

function Home() {
  const [playVideo, setPlayVideo] = useState("");
  const [categoriesData, setCategoriesData] = useState([])
  useEffect(() => {
    const URL = "http://localhost:8080/categories?_embed=videos"
    fetch(URL)
      .then(res => res.json())
      .then(data => setCategoriesData(data))
  }, [])

  if (!categoriesData.length) {
    return (
      <TemplatePage buttonText="Novo vídeo" buttonPath="/cadastro/video">
        <Loader />
      </TemplatePage>
    )
  }

  return (
    <TemplatePage buttonText="Novo vídeo" buttonPath="/cadastro/video">
      {playVideo.length > 0 && (
        <EmbedIframe
          title="Titulo do Iframe"
          src={`https://www.youtube.com/embed/${playVideo}?autoplay=1&mute=0`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          setPlayVideo={setPlayVideo}
        />
      )}

      <BannerMain
        videoTitle={categoriesData[0].videos[0].title}
        url={categoriesData[0].videos[0].url}
        videoDescription={categoriesData[0].videos[0].description}
      />

      <Carousel
        setPlayVideo={setPlayVideo}
        ignoreFirstVideo
        category={categoriesData[0]}
      />

      {categoriesData && categoriesData.slice(1).map(category => {
        if (!category.videos.length) return
        return (
          <Carousel
            key={category.id}
            setPlayVideo={setPlayVideo}
            category={category}
          />
        )
      })}

    </TemplatePage>
  );
}

export default Home;
