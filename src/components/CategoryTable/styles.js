import styled, { css } from "styled-components";

export const TableElement = styled.table`
  width: calc(100% - 80px);
  margin-right: 40px;
  margin-left: 40px;
  margin-bottom: 40px;
  font-weight: 300;
  color: #e5e5e5;
  border: 4px solid #2a7ae4;
  @media (max-width: 800px) {
    margin-right: 0;
    margin-left: 0;
  }
`;

TableElement.Data = styled.td`
  ${props => props.isAction ? css`text-align: center;` : css`text-align: left;`}
  padding: 10px 15px;
  background: rgb(13, 13, 13);
  @media (max-width: 500px) {
    padding: 5px 7.5px;
    font-size: .8em;
  }
  ${props => props.hideOnMobile && css`
    @media(max-width: 800px) {
      display: none;
    }
  `}
`;
