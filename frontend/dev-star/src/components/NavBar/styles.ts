import styled from 'styled-components'

interface Props {
    isActive?: boolean;
}

export const Container = styled.div`
    width: 100%;
    background-color: #262626;
    color: #f2f2f2;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-block: 10px;
    box-shadow: 0px 3px 7px rgba(255, 255, 255, 0.25);
`

export const NavigationItem = styled.div<Props>`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
        text-decoration: underline;
        font-size: 1.25rem;
        font-size: clamp(1.25rem, 1.2rem + 0.25vw, 1.5rem);
        transition: 0.5s;
        cursor: pointer;
        color: ${p => p.isActive ? "#D97904" : "#f2f2f2"};

        &:hover {
            filter: brightness(0.8);
        }
    }
`

export const Separator = styled.div`
    height: 20px;
    width: 1px;
    background-color: #f2f2f2a0;
`