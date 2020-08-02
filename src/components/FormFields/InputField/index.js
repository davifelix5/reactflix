import React from "react";
import { InputWrapper } from "./styles";
import Proptypes from "prop-types";

function FormField({ type, label, name, value, onChange, ...rest }) {
  const props = {
    type,
    id: name,
    label,
    name,
    value,
    onChange,
    placeholder: " ",
    ...rest
  };
  return (
    <InputWrapper type={type}>
      {type === "textarea" ? <textarea {...props} /> : <input {...props} />}
      <label htmlFor={name}>{label}</label>
    </InputWrapper>
  );
}

FormField.defaultProps = {
  type: "text",
  value: "",
  onChange: () => { }
};

FormField.propTypes = {
  label: Proptypes.string.isRequired,
  type: Proptypes.string,
  name: Proptypes.string.isRequired,
  value: Proptypes.string,
  onChange: Proptypes.func
};

export default FormField;
