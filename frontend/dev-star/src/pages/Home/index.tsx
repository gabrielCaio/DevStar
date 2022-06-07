import { Container } from './styles'

import { Header, NavBar } from '../../components'

export default function Home() {
    return (
        <Container>
            <Header />
            <NavBar />
            <h1>Home</h1>
        </Container>
    )
}