import React from "react";
import { SubmitBtn } from "./styles";

function SubmitButton({ children }) {
  return <SubmitBtn type="submit">{children}</SubmitBtn>;
}

export default SubmitButton;
