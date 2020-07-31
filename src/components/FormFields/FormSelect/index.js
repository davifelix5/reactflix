import React from "react";
import { SelectField } from "./sytles";
import Proptypes from "prop-types";

function Select({ label, name, onChange, options, value }) {
  return (
    <SelectField>
      <select id={name} name={name} onChange={onChange} value={value}>
        {options.map(category => {
          return (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          );
        })}
      </select>
      <label htmlFor={name}>{label}</label>
    </SelectField>
  );
}

Select.defaultProps = {
  type: "text",
  onChange: () => { }
};

Select.propTypes = {
  label: Proptypes.string.isRequired,
  name: Proptypes.string.isRequired,
  onChange: Proptypes.func,
  options: Proptypes.arrayOf(Proptypes.object)
};

export default Select;
