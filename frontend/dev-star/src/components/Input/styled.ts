import styled from 'styled-components'

import { colors } from '../../utils/colors'

export interface Props {
    height?: string,
    padding?: string,
    color?: string,
}

export const InputArea = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ErrorMessage = styled.h3`
    font-size: 0.8rem;
    color: #FF4747;
`;

export const Input = styled.input<Props>`
    outline: none;
    border:none;
    border-bottom: 2px solid ${colors.orange};
    background-color: ${colors.white};

    width: 100%;
    height: ${(p) => p.height ? p.height : '30px'};
    padding: ${(p) => p.padding ? p.padding : '5px'};
    color: ${(p) => p.color ? p.color : '#000'};
    padding-left: 10px;

    &::placeholder {
        color: ${(p) => p.color ? p.color : '#000'};
        font-weight: 500;
    }

    /* &:focus {
        border-bottom: 3px solid ${colors.orange};
    } */
`;