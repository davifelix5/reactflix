import React from "react";
import Menu from "../Menu";
import Footer from "../Footer";
import { AppWrapper } from "../../styles";
import Proptypes from 'prop-types';

function TemplatePage({ children, buttonText, buttonPath }) {
  return (
    <>
      <Menu buttonText={buttonText} buttonPath={buttonPath} />
      <AppWrapper>{children}</AppWrapper>
      <Footer />
    </>
  );
}

TemplatePage.defaultProps = {
  buttonText: "Home",
  buttonPath: "/",
};

TemplatePage.propTypes = {
  buttonText: Proptypes.string,
  buttonPath: Proptypes.string,
};

export default TemplatePage;
