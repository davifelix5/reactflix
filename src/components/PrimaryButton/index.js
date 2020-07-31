import React from "react";
import { PrimaryBtn } from "./styles";
import Proptypes from 'prop-types';

function PrimaryButton({ children, type, ...props }) {
  return <PrimaryBtn type={type} {...props}>{children}</PrimaryBtn>;
}

PrimaryButton.defaultProps = {
  type: "button",
}

PrimaryButton.propTypes = {
  type: Proptypes.string,
}

export default PrimaryButton;
