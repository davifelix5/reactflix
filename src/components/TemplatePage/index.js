import React from "react";
import Menu from "../Menu";
import Footer from "../Footer";
import { AppWrapper } from "../../styles";

function TemplatePage({ children, buttonText, buttonPath }) {
  return (
    <>
      <Menu buttonText={buttonText} buttonPath={buttonPath} />
      <AppWrapper>{children}</AppWrapper>
      <Footer />
    </>
  );
}

export default TemplatePage;
