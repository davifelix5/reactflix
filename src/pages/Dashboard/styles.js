import styled from 'styled-components'

export const ButtonContainer = styled.div`

    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-around;
    @media (max-width: 800px) {
        flex-direction: column-reverse;
        align-items: center;
        button {
            margin-bottom: 20px;
        }
    }
`

export const DashboardWrapper = styled.div`

    justify-self: center;
    align-self: center;
`
