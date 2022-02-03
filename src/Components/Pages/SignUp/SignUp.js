import { TextField } from '@mui/material';
import React, { useRef } from 'react';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router';
import useAuth from '../../Shared/hooks/useAuth';

const SignUp = () => {
    const { user, signUpWithEmail } = useAuth();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    console.log(user);
    const location = useLocation();
    const navigate = useNavigate();
    const onSubmit = data => {
        console.log(data);
        signUpWithEmail({ name: data.name, email: data.email, password: data.password, location, navigate });
    }
    return (
        <div className='h-screen  flex items-center justify-center flex-col '>
            <div className='w-11/12 shadow-md md:w-1/3 md:h-11/12 px-3 py-8 rounded-lg'>
                <h2 className='font-bold text-xl mb-2'>SignUp Form</h2>
                <hr className='w-10 border-t-4 rounded-full' />
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <input className='placeholder-gray-500 bg-transparent border border-gray-300 mt-4 px-4 py-2 rounded-full' type='text' placeholder='Name' label="Name" variant="standard" {...register("name", { required: true })} />
                    {
                        errors.name && <div>This filed is required</div>
                    }
                    <input className='placeholder-gray-500 bg-transparent border border-gray-300 mt-4 px-4 py-2 rounded-full' type='email' placeholder='Enter email'{...register("email", { required: true })} />
                    {
                        errors.email && <div>This filed is required</div>
                    }
                    <input className='placeholder-gray-500 bg-transparent border border-gray-300 mt-4 px-4 py-2 rounded-full' type='password' placeholder='Password must be 6 letter or more' label="Password" name='password' variant="standard" {...register("password", { required: true, minLength: 6 })} />
                    {
                        errors.password && <div>password must be 6 length</div>
                    }
                    <input className='placeholder-gray-500 bg-transparent border border-gray-300 mt-4 px-4 py-2 rounded-full' type='password' placeholder='Confirm password' label="Confirm password" variant="standard" {...register("password2", {
                        validate: value =>
                            value === password.current || "The passwords do not match"
                    })} />
                    {
                        errors.password2 && <div>{errors.password2.message}</div>
                    }
                    <input className='my-3 cursor-pointer transition-all hover:shadow-lg text-lg py-2 font-bold px-6 border-gray-300 text-black border  rounded-full' type="submit" value='Create Account' />
                </form>
            </div>
        </div>
    );
};

export default SignUp;