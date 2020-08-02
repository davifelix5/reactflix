import React, { useState, useEffect } from "react";
import BannerMain from "./components/BannerMain";
import Carousel from "./components/Carousel";
import EmbedIframe from "./components/VideoIframeEmbed";
import Loader from '../../components/Loader'
import { NotFoundMessage } from './styles'

import api from '../../repositiories/categories'

import TemplatePage from "../../components/TemplatePage";

function Home() {
  const [playVideo, setPlayVideo] = useState("");
  const [categoriesData, setCategoriesData] = useState([])
  const [searching, setSearching] = useState(true)

  useEffect(() => {
    api.getCategoriesWithVideos()
      .then(data => {
        setCategoriesData(data)
        setSearching(false)
      })
  }, [])

  if (!categoriesData.length && !searching) {
    return (
      <TemplatePage buttonText="Nova categoria" buttonPath="/cadastro/categoria">
        <NotFoundMessage>
          <NotFoundMessage.Content>
            Não há dados cadastrados
          </NotFoundMessage.Content>
        </NotFoundMessage>
      </TemplatePage>
    )
  }

  if (!categoriesData.length) {
    return (
      <TemplatePage buttonText="Gerenciar vídeos" buttonPath="/dashboard">
        <Loader />
      </TemplatePage>
    )
  }

  return (
    <TemplatePage buttonText="Gerenciar vídeos" buttonPath="/dashboard">
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

      {categoriesData[0].videos.length ? (
        <BannerMain
          videoTitle={categoriesData[0].videos[0].title}
          url={categoriesData[0].videos[0].url}
          videoDescription={categoriesData[0].videos[0].description}
        />
      ) : null}

      <Carousel
        setPlayVideo={setPlayVideo}
        ignoreFirstVideo
        category={categoriesData[0]}
      />


      {categoriesData && categoriesData.slice(1).map(category => {
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
