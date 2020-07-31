import styled from 'styled-components';

const colorTypes = {
    edit: "green",
    delete: "red",
    watch: "var(--primary)"
}

const getColor = type => colorTypes[type]

export const VideoList = styled.ul`
    padding: 0;
    margin: 0 40px;
    list-style: none;
`;

export const VideoElement = styled.li`
    background-color: #181818;
    display: flex;
    margin-bottom: 20px;
    border: 4px solid ${({ color }) => color};
    @media (max-width: 860px) {
        flex-direction: column;
        align-items: center;
        padding-top: 15px;
        padding-bottom: 15px;
    }
`;

VideoElement.Image = styled.div`
    background-image: ${({ url }) => `url(${url})`};
    background-position: center;
    border-right: 4px solid ${({ color }) => color};
    min-width: 450px;
    height: 250px;
    @media (max-width: 860px) {
        border-right: none;
    }
    @media (max-width: 540px) {
        display: none
    }
`;

VideoElement.Info = styled.div`
    display: flex;
    flex-direction: column;
    flex: 3;
    padding: 20px;
    justify-content: space-evenly;
    width: 75%;
    text-align: center;
    @media(max-width: 860px) {
        align-items: center;
    }
`;

VideoElement.Info.Title = styled.p`
    font-size: 1.5em;
    @media(max-width: 860px) {
        font-size: 1.2em;
    }
`;

VideoElement.Info.Desc = styled.p`
    font-size: 1.2em;
    @media(max-width: 860px) {
        font-size: 0.8em;
    }
`;

VideoElement.Actions = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 10%;
    @media (max-width: 860px) {
        flex-direction: row;
    }
`;

export const Button = styled.button`
    border-radius: 4px;
    cursor: pointer;
    background: none;
    color: ${({ type }) => getColor(type)};
    padding: 15px;
    border: 1px solid ${({ type }) => getColor(type)};
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
    &:enabled {
        outline: none;
    }
    &:active {
        color: white;
        background-color: ${({ type }) => getColor(type)}
    }
    @media (max-width: 860px) {
        margin: 0 10px;
        padding: 5px;
    }
`;

