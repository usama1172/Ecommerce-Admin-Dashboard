import axios from 'axios'
import React, { useState } from 'react'
import {backend_url} from '../App'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backend_url + '/api/user/admin', {email, password})
            if(response.data.success) {
            setToken(response.data.token);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error)
            toast.error('An error occurred while trying to login. Please try again.');   
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>

        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
            <h1 className='text-2xl mb-4 font-bold'>
                Admin Panel
            </h1>
            <form onSubmit={onSubmitHandler}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium mb-2 text-gray-700'>Email Address</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" name="email" required placeholder='your@email.com' />
                </div>
                <div>
                    <p className='text-sm font-medium mb-2 text-gray-700'>Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" name="password" required placeholder='your-password' />
                </div>
                <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type="submit">Login</button>
            </form>
        </div>
      
    </div>
  )
}

export default Login
