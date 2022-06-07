import { Routes, Route } from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import Home from './Home'
import MySpace from './MySpace'
import Post from './Post'

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/myspace" element={<MySpace />}/>
            <Route path="/post" element={<Post />}/>
        </Routes>
    )
}