import { TextField } from '@mui/material';
import React from 'react';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import useAuth from '../../Shared/hooks/useAuth';

const Login = () => {
    const { user, googleSignIn, logInWithEmail } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    if (user.email) {
        navigate('/');
    }
    const onSubmit = data => {
        console.log(data);
        logInWithEmail(data);
    }
    return (
        <div>
            <div className='h-screen flex justify-center align-center '>
                <form className="flex flex-col bg-green-300 w-1/2 " onSubmit={handleSubmit(onSubmit)}>
                    <TextField label="Email" variant="standard" type='email' {...register("email",)} />
                    {
                        errors.email && <div>This filed is required</div>
                    }
                    <TextField label="Password" name='password' variant="standard" {...register("password", { required: true, minLength: 6 })} />
                    {
                        errors.password && <div>password must be 6 length</div>
                    }
                    <input className='py-1 px-4 bg-red-700 text-white rounded' type="submit" value='Send' />

                </form>
                <button className='bg-red-500 mt-4' onClick={() => googleSignIn(location, navigate)} >googleSignIn</button>
                <NavLink to='/signup'>dont have a account </NavLink>


            </div>
        </div>
    );
};

export default Login;