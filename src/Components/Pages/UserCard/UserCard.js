import { Avatar, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import './UserCard.css'

const UserCard = props => {
    const { displayName, email, photoURL } = props?.data;
    const navigate = useNavigate();
    const handleClick = (e) => {
        navigate(`/${email}`);
        console.log('dddddddddddddddd', e)
    }
    const { email: routeEmail } = useParams()
    useEffect(() => {
        console.log(routeEmail);

    }, [])
    return (
        <div tabIndex="2" onClick={handleClick} className={`flex px-2 border-l-4 mx-2 border-transparent user-card-wrap   ${routeEmail === email ? "rounded-lg bg-gray-200" : ''} py-3 bg-white items-center `}>
            <Avatar
                alt={displayName}
                className='block'
                src={photoURL}
                sx={{ width: 56, height: 56 }}
            />
            <Typography sx={{ ml: 2 }} variant='h5'>{displayName}</Typography>
        </div>
    );
};

export default UserCard;
