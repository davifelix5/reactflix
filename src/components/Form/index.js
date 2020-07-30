import React from "react";
import { FormWrapper } from "./styles";

function Form({ onSubmit, children }) {
  return <FormWrapper onSubmit={onSubmit}>{children}</FormWrapper>;
}

export default Form;
