import { useState } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { Container, SearchBar, Logout, LogoContainer } from './styles'
import { Logo } from '../../assets'
import { useNavigate } from 'react-router-dom'


export function Header() {
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate()

    const handleLogout = async () => {
        navigate('/')
    }

    const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.code === 'Enter') alert(searchText)
    }

    return (
        <Container>
            <LogoContainer onClick={() => navigate('/home')} >
                <Logo width='100'/>
            </LogoContainer>

            <SearchBar
                placeholder='Pesquisar...'
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                onBlur={() => setSearchText("")}
                onKeyDown={e => handleSearch(e)}
            />

            <Logout onClick={handleLogout} >
                <FiLogOut />
                <p>Sair</p>
            </Logout>
        </Container>
    )
}