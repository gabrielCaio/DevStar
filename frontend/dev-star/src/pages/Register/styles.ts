import styled from 'styled-components'

import { colors } from '../../utils'

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: ${colors.black};

    p {
        cursor: pointer;
        transition: 0.5s;
        color: ${colors.white};

        &:hover {
            filter: brightness(0.7);
        }
    }
`

export const RegisterContainer = styled.div`
    width: 30%;
    height: 60%;
    padding-inline: 40px;
    padding-block: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    background-color: ${colors.white};
    border: 5px solid ${colors.orange};
    border-radius: 10px;

    h1 {
        height: 10%;
        font-size: 18px;
    }

    form {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        #bt {
            margin-top: 20px;
        }
    }
`;