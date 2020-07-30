import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    from {
        transform: rotate(0deg)
    }
    to {
        transform: rotate(360deg)
    }
`

export const LoaderContainer = styled.div`
    width: 100%;
    height: 100%;
    height: calc(100vh - 200px);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const LoaderElement = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 8px solid var(--primary);
    border-right: 8px solid var(--blackLighter);
    animation: ${spin} 1s linear infinite;
`;
