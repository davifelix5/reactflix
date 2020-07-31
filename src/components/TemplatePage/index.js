import React from "react";
import Menu from "../Menu";
import Footer from "../Footer";
import { AppWrapper } from "../../styles";
import Proptypes from 'prop-types';

function TemplatePage({ children, buttonText, buttonPath, titleMargin }) {
  return (
    <>
      <Menu buttonText={buttonText} buttonPath={buttonPath} />
      <AppWrapper titleMargin={titleMargin}>{children}</AppWrapper>
      <Footer />
    </>
  );
}

TemplatePage.defaultProps = {
  buttonText: "Home",
  buttonPath: "/",
  titleMargin: 30,
};

TemplatePage.propTypes = {
  buttonText: Proptypes.string,
  buttonPath: Proptypes.string,
  titleMargin: Proptypes.number
};

export default TemplatePage;
