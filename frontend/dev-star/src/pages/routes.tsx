import { Routes, Route } from 'react-router-dom'

import Login from './Login'
import Register from './Register'

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
        </Routes>
    )
}