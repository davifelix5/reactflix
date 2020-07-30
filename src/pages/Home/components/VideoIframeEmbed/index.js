import React from "react";
import { IframeEmbed, IframeContainer, CloseButton } from "./styles";

function EmbedIframe({ setPlayVideo, ...props }) {
  return (
    <IframeContainer>
      <CloseButton onClick={() => setPlayVideo("")}>X</CloseButton>
      <IframeEmbed {...props} />
    </IframeContainer>
  );
}

export default EmbedIframe;
