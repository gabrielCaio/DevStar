import { useState } from 'react'
import { Container, LoginContainer, RedirectText } from './styles'
import { DefaultButton, TextInput } from '../../components'
import { useNavigate } from 'react-router-dom'

import { isEmailValid } from '../../utils'

import { Logo } from '../../assets'

interface LoginError {
    error: boolean,
    message: string
}

export default function Login() {
    const [error, setError] = useState<LoginError>({ error: false, message: "" });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const redirectToRegister = () => navigate('/register')

    // TODO: Implement this function
    async function logUser() {
        alert('logado')
    }

    const handleLogin = async () => {
        if(password === "") return setError({ error: true, message: "Senha não informada"})
        if(isEmailValid(email) === false) return setError({ error: true, message: "Email invalido"})

        await logUser()
    }

    return (
        <Container>
            <div id="area-logo" >
                <Logo width='80%' />
            </div>

            <LoginContainer>
                <h1>Login</h1>

                <div id="input-area">
                    <TextInput
                        placeholder="Email"
                        type='email'
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextInput
                        placeholder="Senha"
                        type='password'
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                {error.error && <p id="error-message" >{error.message}</p>}

                <DefaultButton onClick={handleLogin} >Entrar</DefaultButton>
            </LoginContainer>

            <RedirectText>
                <p onClick={redirectToRegister} >Não possui conta? <strong>Cadastre-se</strong></p>
            </RedirectText>
        </Container>
    )
}