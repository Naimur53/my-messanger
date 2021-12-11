import { Avatar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

const UserCard = props => {
    const { displayName, email, photoURL } = props?.data;
    const navigate = useNavigate();
    const handleClick = (e) => {
        navigate(`/${email}`);
        console.log('dddddddddddddddd', e)
    }
    return (
        <div tabIndex="2" onClick={handleClick} className='flex px-2 border-l-4 border-transparent focus:border-pink-300 focus:bg-transparent py-3 bg-white items-center shadow-xl'>
            <Avatar
                alt="Remy Sharp"
                className='block'
                src={photoURL}
                sx={{ width: 56, height: 56 }}
            />
            <Typography sx={{ ml: 2 }} variant='h5'>{displayName}</Typography>

        </div>
    );
};

export default UserCard;
