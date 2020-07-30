import styled from "styled-components";

export const SelectField = styled.div`
  height: 50px;
  margin-bottom: 40px;
  position: relative;
  border-radius: 4px;
  display: flex;
  flex-direction: column-reverse;
  background-color: var(--grayDark);
  label {
    display: block;
    padding-left: 5px;
    opacity: 0.5;
  }
  select {
    padding: 3px;
    width: 100%;
    font-size: 1.2em;
    background: none;
    border: none;
  }
  select:focus ~ label {
    opacity: 1;
  }
  select:focus {
    border: none;
    outline: none;
  }
`;
