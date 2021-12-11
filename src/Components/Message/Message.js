import { Avatar } from '@mui/material';
import React from 'react';

const Message = ({ message, user, client }) => {
    console.log(message);
    return (
        <div className={user.email === message.user ? "text-right " : 'text-left'}>
            <div className={`shadow rounded-2xl bg-white inline-block  my-3   ${user.email === message.user ? 'mr-10' : 'ml-10'}`}>
                <div className="flex flex-col">
                    <span className=' p-3'>{message.message} </span>
                </div>
            </div>
            <div dir='ltr' className={user.email === message.user ? "flex justify-end" : 'block'}>
                <Avatar alt={user.displayName} src={message.userPhoto} />

            </div>


        </div>
    );
};

export default Message;