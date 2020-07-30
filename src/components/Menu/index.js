import React from "react";
import Button from "../LinkButton";
import { MenuWrapper, LogoImg, HomeLink } from "./style";
import Logo from "../../assets/img/logoflix.png";

function Menu({ buttonPath, buttonText }) {
  return (
    <MenuWrapper>
      <HomeLink to="/">
        <LogoImg src={Logo} alt="Logo do DaviFlix" className="logo" />
      </HomeLink>
      <Button className="button-link" to={buttonPath}>
        {buttonText}
      </Button>
    </MenuWrapper>
  );
}

export default Menu;
