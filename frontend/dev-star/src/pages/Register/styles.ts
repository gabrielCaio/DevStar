import styled from 'styled-components'

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`

export const InputArea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const ErrorMessage = styled.h3`
    font-size: 0.8rem;
    color: #FC492B;
`

export const LoginText = styled.h3`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.5s;

    &:hover {
        opacity: 0.8;
    }

    p {
        margin-left: 5px;
    }
`