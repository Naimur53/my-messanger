import { Avatar } from '@mui/material';
import React from 'react';

const Message = ({ message, user, client }) => {
    return (
        <div className={user.email === message.user ? "text-right py-4" : 'text-left'}>
            <div className="shadow bg-white inline-block  my-3">
                <div className="flex flex-col">
                    <span className=' py-5 px-3'>{message.message} </span>
                    <Avatar alt={user.name} src={message.photoURL} />
                </div>
            </div>
        </div>
    );
};

export default Message;