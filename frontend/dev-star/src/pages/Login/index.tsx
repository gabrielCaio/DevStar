import { Container } from './styles'
import { DefaultButton } from '../../components'

import { TextInput } from '../../components'

export default function Login() {
    return (
        <Container>
            <h1>Login</h1>
            <TextInput placeholder='Email' />
        </Container>
    )
}