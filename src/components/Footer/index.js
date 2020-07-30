import React from "react";
import { FooterBase } from "./styles";
import Logo from '../../assets/img/logoflix.png'

function Footer() {
  return (
    <FooterBase>
      <a href="/">
        <img
          src={Logo}
          alt="Logo Daviflix"
        />
      </a>
      <p>
        Orgulhosamente criado durante a{" "}
        <a href="https://www.alura.com.br/" target="_blank">Imersão React da Alura</a>
      </p>
    </FooterBase>
  );
}

export default Footer;
