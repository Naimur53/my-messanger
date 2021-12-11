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
        <div className='h-screen flex justify-center align-center '>
            <form className="flex flex-col bg-green-300 w-1/2 " onSubmit={handleSubmit(onSubmit)}>
                <TextField label="Name" variant="standard" {...register("name", { required: true })} />
                {
                    errors.name && <div>This filed is required</div>
                }
                <TextField label="Email" variant="standard" type='email' {...register("email",)} />
                {
                    errors.email && <div>This filed is required</div>
                }
                <TextField label="Password" name='password' variant="standard" {...register("password", { required: true, minLength: 6 })} />
                {
                    errors.password && <div>password must be 6 length</div>
                }
                <TextField label="Confirm password" variant="standard" {...register("password2", {
                    validate: value =>
                        value === password.current || "The passwords do not match"
                })} />
                {
                    errors.password2 && <div>{errors.password2.message}</div>
                }
                <input className='py-1 px-4 bg-red-700 text-white rounded' type="submit" value='Send' />
            </form>
        </div>
    );
};

export default SignUp;