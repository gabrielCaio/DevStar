import { useState } from 'react'
import { Container, RegisterContainer } from './styles'
import { TextInput, DefaultButton } from '../../components'
import { useNavigate } from 'react-router-dom'

import { isEmailValid } from '../../utils'

import { Logo } from '../../assets'

interface ErrorRegister {
    error: boolean,
    message: string
}

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<ErrorRegister>({ error: false, message: ""});

    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = { name, email, password, confirmPassword }

        console.log(formData);
    }

    return (
        <Container>
            <Logo width='120' />

            <RegisterContainer>
                <h1>Cadastro</h1>

                <form onSubmit={e => handleSubmit(e)} >
                    <TextInput
                        placeholder="Nome"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <TextInput
                        placeholder="Email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextInput
                        placeholder="Senha"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <TextInput
                        placeholder="Confirmar Senha"
                        required
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />

                    <DefaultButton id="bt" type="submit" >Cadastrar</DefaultButton>
                </form>

            </RegisterContainer>

            <p onClick={() => navigate('/')} >Já possui conta? <strong>Faça Login</strong></p>
        </Container>
    )}