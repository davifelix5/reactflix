import styled from 'styled-components';

export const SecondaryBtn = styled.button`
    background-color: var(--grayDark);
    color: var(--white);
    cursor: pointer;
    border: none;
    outline: none;
    padding: 10px 30px;
    margin-bottom: 40px;
    border-radius: 4px;
    font-size: 21px;
    margin-right: 10px;
    transition: all 0.3s;
    &:hover {
        opacity: 0.8;
    }
`;
