import axios from '../utils/axios';
import { useState } from 'react'


function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [role, setRole] = useState('user');

    const [errors , seterrors] = useState({});
    console.log(errors);

    const handleformSubmit = async (e) => {
        e.preventDefault();
        const data = {
            username,
            email,
            password,
            fullname:{
                firstname: firstname,
                lastname: lastname
            },
            role
        };

        try {
            await axios.post('/api/auth/register', data);
            alert('Registration successful!');

        } catch (error) {
            if(error.response && error.response.data && error.response.data.errors ){ 
                const fieldErrors = {};
                error.response.data.errors.forEach(err => {
                    fieldErrors[err.path] = err.msg;
                });
                seterrors(fieldErrors);
            }else {
                seterrors({});
            }

            console.error('Registration failed:', error);
        }
    }

  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className='w-1/3 border rounded-2xl p-8 flex flex-col gap-6'>
            <div>
                <h1 className='w-full text-3xl font-bold'>Register</h1>
                <p className='w-full text-lg text-gray-600'>Create your account by filling in the information below.</p>
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
                <div className='flex gap-4 w-full justify-between'>
                    <div className='w-full flex flex-col '>
                        <input className='w-full border rounded-2xl px-2 py-1 text-xl font-semibold' onChange={(e) => setFirstName(e.target.value)} type="text" value={firstname} name='firstName' placeholder='First Name'/>
                        {errors.firstname && <div className="text-red-500 text-sm">{errors.firstname}</div>}
                    </div>
                    <div className='w-full flex flex-col '>
                        <input className='w-full border rounded-2xl px-2 py-1 text-xl font-semibold' onChange={(e) => setLastName(e.target.value)} type="text" value={lastname} name='lastName' placeholder='Last Name' />
                        {errors.lastname && <div className="text-red-500 text-sm">{errors.lastname}</div>}
                    </div>
                </div>
                <select onChange={(e) => setRole(e.target.value)} value={role} name="role" id="role" className='border rounded-2xl px-2 py-1 text-xl font-semibold'>
                    <option value="user">User</option>
                    <option value="seller">Seller</option>
                </select>
                <button type='submit' className='w-full bg-blue-600 text-white rounded-2xl px-2 py-1 text-xl font-bold mt-4'>Register</button>
            </form>
        </div>
    </div>
  )
}

export default Register