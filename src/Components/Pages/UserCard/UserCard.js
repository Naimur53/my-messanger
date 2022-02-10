import { Avatar, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import './UserCard.css'

const UserCard = props => {
    const { displayName, email, photoURL } = props?.data;
    const navigate = useNavigate();
    const handleClick = (e) => {
        navigate(`/${email}`);
    }
    const { email: routeEmail } = useParams()
    useEffect(() => {

    }, [])
    return (
        <div onClick={handleClick} className={`flex px-2 mx-2 cursor-pointer mt-2 border-transparent user-card-wrap ${routeEmail === email ? "rounded-lg bg-gray-200" : ''} py-3 bg-white items-center `}>
            <Avatar
                alt={displayName}
                className='block'
                src={photoURL}
                sx={{ width: 56, height: 56 }}
            />
            <div className='ml-2  justify-center'>
                <Typography className='capitalize' variant='h6'>{displayName}</Typography>
                <p className='m-0 text-sm'>{email}</p>
            </div>
        </div>
    );
};

export default UserCard;
