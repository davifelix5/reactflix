import styled from 'styled-components'

export const MessageWrapper = styled.div`

    background-color: var(--black);

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    position: fixed;
    top: 5%;
    right: 50%;
    z-index: 500;
    
    width: 550px;
    padding: 20px;

    transform: translateX(50%);
    
    border-radius: 4px;
    border: 3px solid var(--primary);
    @media (max-width: 800px) {
        width: 300px;
    }
`;

export const MessageContent = styled.p`
    height: 100%;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    font-size: 1.4em;
    text-align: center;
    @media (max-width: 800px) {
        font-size: 1.2em;
    }

`;

export const MessageButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`;

MessageButtons.Primary = styled.button`
    cursor: pointer;

    text-decoration: none;

    border: none;
    outline: none;
    
    padding: 10px;
    
    border-radius: 4px;
    
    background-color: var(--primary);
    color: white;
    
    &:focus {
        outline: none;
    }
    &:enabled {
        outline: none;
    }
    &:hover {
        opacity: 0.5
    }
    transition: all 0.3s;
`;

MessageButtons.Secondary = styled.button`
    cursor: pointer;

    text-decoration: none;

    border: none;
    outline: none;
    
    padding: 10px;
    margin-right: 15px;
    
    border-radius: 4px;
    
    background-color: var(--grayDark);
    color: white;
    
    &:focus {
        outline: none;
    }
    &:enabled {
        outline: none;
    }
    &:hover {
        opacity: 0.5
    }
    transition: all 0.3s;
`;