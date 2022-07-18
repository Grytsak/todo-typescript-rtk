import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useRegisterMutation } from '../../app/services/auth'

const Login =  () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const [register] = useRegisterMutation()

    const { name, email, password, password2 } = formData
    const onChange = (e: any) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }

    const onSubmit = async (e: any) => {
        e.preventDefault()
       
        try {
            const user = await register(formData).unwrap()
            if(user) {
                dispatch(setCredentials(user))
                localStorage.setItem('user', JSON.stringify(user))
                navigate('/')
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
                        type='name'
                        id='name'
                        name='name'
                        value={name}
                        placeholder='Enter your name'
                        onChange={onChange}
                    />
                </div>
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
                    <input 
                        type='password2'
                        id='password2'
                        name='password2'
                        value={password2}
                        placeholder='Confirm your password'
                        onChange={onChange}
                    />
                </div>
                <div>
                    <button type='submit'>
                        Submit
                    </button>
                    <Link to='/login'>Login</Link>
                </div>
            </form>
        </>
    )
}

export default Login