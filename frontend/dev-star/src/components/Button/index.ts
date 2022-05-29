import styled from 'styled-components'

export const DefaultButton = styled.button`
    border: none;
    border-radius: 5px;
    padding: 1rem;
    cursor: pointer;
    transition: 0.5s;

    &:hover {
        filter: brightness(0.8);
    }
`