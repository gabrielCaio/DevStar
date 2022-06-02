import styled from 'styled-components'

import { colors } from '../../utils'

interface ButtonProps {
    backgroundColor?: string,
    fontWeight?: string,
    color?: string,
}

export const DefaultButton = styled.button<ButtonProps>`
    width: 100%;
    border: none;
    border-radius: 10px;
    padding: 1rem;
    cursor: pointer;
    transition: 0.5s;

    background-color: ${p => p.backgroundColor ? p.backgroundColor : colors.orange};
    font-weight: ${p => p.fontWeight ? p.fontWeight : "bold"};
    color: ${p => p.color ? p.color : "#f2f2f2"};
    font-size: 1em;

    &:hover {
        filter: brightness(0.8);
    }
`