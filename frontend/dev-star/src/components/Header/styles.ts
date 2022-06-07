import styled, { keyframes } from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 4rem;
    background-color: #262626;
    color: #f2f2f2;

    display: flex;
    justify-content: space-between;
    align-items: center;
`
const jiggle = keyframes`
    30% { transform: rotate(5deg) }
    60% { transform: rotate(-5deg) }
    100% { transform: rotate(0deg) }
`

export const LogoContainer = styled.div`
    margin-left: 20px;
    cursor: pointer;
    
    &:hover {
        animation-name: ${jiggle};
        animation-duration: 300ms;
        filter: brightness(0.8);
    }
`


export const SearchBar = styled.input`
    width: 30%;
    border: 2px solid #D97904;
    padding: 5px;
    padding-left: 10px;
    border-radius: 3px;

    &::placeholder {
        color: #000;
    }

    &:focus {
        outline: none;
        border: 2px solid #F2C53D;
    }
`

export const Logout = styled.div`
    display: flex;
    align-items: center;
    gap: 3px;
    margin-right: 20px;
    cursor: pointer;
    transition: 0.5s;

    &:hover {
        filter: brightness(0.8);
    }
`