import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from '../../app/services/auth'

const Login =  () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [login] = useLoginMutation()

    const { email, password } = formData
    const onChange = (e: any) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }

    const onSubmit = async (e: any) => {
        e.preventDefault()
       
        try {
            const user = await login(formData).unwrap()
            if(user) {
                dispatch(setCredentials(user))
                localStorage.setItem('user', JSON.stringify(user))
                navigate('/tasks')
            } else {
                return
            }  
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <input 
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        placeholder='Enter your email'
                        onChange={onChange}
                    />
                </div>
                <div>
                    <input 
                        type='password'
                        id='password'
                        name='password'
                        value={password}
                        placeholder='Enter your password'
                        onChange={onChange}
                    />
                </div>
                <div>
                    <button type='submit'>
                        Submit
                    </button>
                    <Link to='/register'>Register</Link>
                </div>
            </form>
        </>
    )
}

export default Login