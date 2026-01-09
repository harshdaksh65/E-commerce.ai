import axios from '../utils/axios';
import React, { useState } from 'react'

function Login() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors , seterrors] = useState({});
    
    const handleformSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/auth/login', {username, email, password});
            setEmail("");
            setPassword("");
            setUsername("");
            alert('Login successful!');
        } catch (error) {
            
            if(error.response && error.response.data && error.response.data.errors){ 
                const fieldErrors = {};
                error.response.data.errors.forEach(err => {
                    fieldErrors[err.path] = err.msg;
                });
                seterrors(fieldErrors);
                console.log(errors);
            } 
            else {
                console.error('Login failed:');
                alert('An unexpected error occurred during login.');
            }
        }
        
    }

  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className='w-1/3 border rounded-2xl p-8 flex flex-col gap-6'>
            <div>
                <h1 className='w-full text-3xl font-bold'>Login</h1>
                <p className='w-full text-lg text-gray-600'>Please enter your credentials to log in.</p>
            </div>
            <form onSubmit={handleformSubmit} className='flex flex-col gap-4'>
                <div className='w-full flex flex-col '>
                    <input className='w-full border rounded-2xl px-2 py-1 text-xl font-semibold' onChange={(e) => setUsername(e.target.value)} type="text" value={username} name='username' placeholder='Username' />
                    {errors.username && <div className="text-red-500 text-sm">{errors.username}</div>}
                </div>
                <div className='w-full flex flex-col '>
                    <input className='w-full border rounded-2xl px-2 py-1 text-xl font-semibold' onChange={(e) => setEmail(e.target.value)} type="text" value={email} name='email' placeholder='Email' />
                    {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                </div>
                <div className='w-full flex flex-col '>
                    <input className='w-full border rounded-2xl px-2 py-1 text-xl font-semibold' onChange={(e) => setPassword(e.target.value)} type="text" value={password} name='password' placeholder='Password'/>
                    {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                </div>
                <button type='submit' className='w-full bg-blue-600 cursor-pointer text-white rounded-2xl px-2 py-1 text-xl font-bold mt-4'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login