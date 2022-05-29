import styled from 'styled-components'

export interface Props {
    height?: string,
    padding?: string,
}

export const Input = styled.input<Props>`
    border: 1px solid #0f0f0f;
    border-radius: 5px;
    background-color: #f2f2f2;
    width: 100%;
    height: ${(p) => p.height ? p.height : '30px'};
    padding: ${(p) => p.height ? p.height : '5px'};

    &:focus {
        outline: none;
    }
`;