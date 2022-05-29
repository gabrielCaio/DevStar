import { Container } from './styles'

export default function Login() {
    return (
        <Container>
            <h1>Login</h1>
            <input type="email" name="login">digite seu e-mail</input>
            <input type="password" name="password">digite sua senha</input>
            <button>logar</button>
        </Container>
    )
}