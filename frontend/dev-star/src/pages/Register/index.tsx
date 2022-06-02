import { useState } from 'react'
import { Container, InputArea, ErrorMessage, LoginText } from './styles'
import { TextInput, DefaultButton } from '../../components'

interface UserData {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

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

    function registerUser() {
        const userData: UserData = { name, email, password, confirmPassword }

        const valid = validateData(userData)

        if(valid.error) return setError(valid)

        // TODO: Send data to backend
        console.log(userData)
    }

    function handleKeyPress(e: any) {
        if(e.key === 'Enter') registerUser();
    }

    function validateData(data: UserData): ErrorRegister {
        
        if(data.password !== data.confirmPassword) return { error: true, message: "Senhas não conferem" }
        return { error: false, message: ""}
    }

    return (
        <Container>
            <h1>Cadastro</h1>

            <InputArea>
                <TextInput placeholder='Nome' onChange={e => setName(e.target.value)} />
                <TextInput placeholder='Email' onChange={e => setEmail(e.target.value)} />
                <TextInput placeholder='Senha' onChange={e => setPassword(e.target.value)} />
                <TextInput
                    placeholder='Confirmar Senha'
                    onChange={e => setConfirmPassword(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
            </InputArea>

            <div>
                <DefaultButton onClick={registerUser} >Realizar cadastro</DefaultButton>
                {error.error && <ErrorMessage>{error.message}</ErrorMessage>}
            </div>


            <LoginText>Já possui conta? <p>Faça Login</p></LoginText>
        </Container>
    )}