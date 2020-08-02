import styled from "styled-components";

export const InputWrapper = styled.div`
  height: ${({ type }) => (type === "textarea" ? "150px" : "50px")};
  margin-bottom: 40px;
  position: relative;
  textarea {
    min-height: 150px;
  }
  input,
  textarea {
    background-color: var(--grayDark);
    width: 100%;
    border: none;
    resize: none;
    border-radius: 4px;
    font-size: 1em;
    height: 100%;
    padding-top: 20px;
    color: var(--white);
  }
  input:focus,
  textarea:focus {
    border-bottom: 5px solid var(--primary);
    outline: none;
  }
  label {
    cursor: text;
    opacity: 0.5;
    font-size: 1em;
    top: 15px;
    left: 10px;
    position: absolute;
    transition: all 0.1s;
    font-weight: normal;
  }
  input:not([type="color"]):focus + label,
  input:not([type="color"]):not(:placeholder-shown) + label,
  textarea:focus + label,
  textarea:not(:placeholder-shown) + label {
    font-weight: 200;
    opacity: 1;
    top: 3px;
    left: 5px;
    font-size: 0.8em;
  }
  input[type="color"] {
    padding-top: 15px;
  }
  input[type="color"] + label {
    top: 3px;
    left: 5px;
    font-size: 0.8em;
  }
  input[type="color"]:focus + label {
    opacity: 1;
  }
`;
