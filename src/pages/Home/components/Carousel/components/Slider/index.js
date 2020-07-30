import React from "react";
import SlickSlider from "react-slick";
import { Container } from "./styles";

function Slider({ children, arrowColor }) {
  return (
    <Container arrowColor={arrowColor}>
      <SlickSlider
        {...{
          dots: false,
          infinite: false,
          speed: 500,
          centerMode: false,
          variableWidth: true,
          adaptiveHeight: true,
          swipe: true,
          draggable: true
        }}
      >
        {children}
      </SlickSlider>
    </Container>
  );
}

export default Slider;
