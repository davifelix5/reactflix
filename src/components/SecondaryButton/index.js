import React from "react";
import { SecondaryBtn } from "./styles";
import Proptypes from 'prop-types';

function SecondaryButton({ children, type, ...props }) {
  return <SecondaryBtn type={type} {...props}>{children}</SecondaryBtn>;
}

SecondaryButton.defaultProps = {
  type: "button"
}

SecondaryButton.propTypes = {
  type: Proptypes.string
}

export default SecondaryButton;
