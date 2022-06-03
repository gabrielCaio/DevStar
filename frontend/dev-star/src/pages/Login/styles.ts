import styled from 'styled-components'

import { colors } from '../../utils';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    background-color: ${colors.black};

    #area-logo {
        margin-left: 2%;
        flex: 0.2;
    }
`;

export const LoginContainer = styled.div`
    width: 30%;
    height: 50%;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    background-color: ${colors.white};
    border: 5px solid ${colors.orange};
    border-radius: 10px;

    h1 {
        font-size: 18px;
    }

    #input-area {
        width: 100%;
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    #error-message {
        color: #FF4747;
        font-weight: bold;
    }
`;

export const RedirectText = styled.div`
    flex: 0.2;
    p {
        color: ${colors.white};
        cursor: pointer;
        transition: 0.5s;

        &:hover {
            filter: brightness(0.7)
        }
    }
`;
