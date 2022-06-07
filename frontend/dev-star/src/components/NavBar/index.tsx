import { useMemo } from 'react'
import { Container, NavigationItem, Separator } from './styles'
import { useNavigate, useLocation } from 'react-router-dom'

export function NavBar() {
    const navigate = useNavigate()
    const location = useLocation()
    const thisRoute = useMemo(() => location.pathname, [location])

    const navigateTo = (routeName: string) => {
        if(thisRoute === routeName) return
        navigate(routeName)
    }

    return (
        <Container>
            <NavigationItem isActive={thisRoute === "/home"} onClick={() => navigateTo("/home")} >
                <h1>Assistir</h1>
            </NavigationItem>

            <Separator />

            <NavigationItem isActive={thisRoute === "/post"} onClick={() => navigateTo("/post")} >
                <h1>Postar</h1>
            </NavigationItem>

            <Separator />

            <NavigationItem isActive={thisRoute === "/myspace"} onClick={() => navigateTo("/myspace")} >
                <h1>Meu espaço</h1>
            </NavigationItem>
        </Container>
    )
}