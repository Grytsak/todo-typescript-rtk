import React, { useEffect } from 'react'
import { Link, useNavigate  } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { logOut, selectCurrentUser } from '../features/auth/authSlice'

const Navigation = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(selectCurrentUser)

    useEffect(() => {
        
        if(!user.name) {
            console.log('test')
            navigate('/login')
        }
    }, [])

    const onLogout = () => {
        dispatch(logOut())
        navigate('/login')
    }

    return (
        <div>
            <ul>
                <li><Link to='/register'>Register</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><span onClick={onLogout}>Logout</span></li>
            </ul>
        </div>
    )
}

export default Navigation