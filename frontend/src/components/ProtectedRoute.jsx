import {Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import {useState, useEffect} from 'react'
import api from '../api'
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants'
import Loading from './Loading'

const ProtectedRoute = ({children}) => {
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post('/api/token/refresh/', {
                refresh: refreshToken,
            })
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error)
            setIsAuthorized(false)
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token)
        const tokenExp = decoded.exp;
        const now = Date.now() / 1000

        if (tokenExp < now) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }

    }

    if (isAuthorized === null) {
        return <Loading />
    }

    return isAuthorized ? children : <Navigate to='/login' />

}

export default ProtectedRoute