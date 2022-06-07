import { Routes, Route } from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import Home from './Home'

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/home" element={<Home />}/>
        </Routes>
    )
}