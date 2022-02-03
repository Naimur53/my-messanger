import { Avatar } from '@mui/material';
import { maxWidth } from '@mui/system';
import React from 'react';

const Message = ({ message, user, client }) => {
    message.pic && console.log(message);
    return (
        <div className={user.email === message.user ? "text-right " : 'text-left'}>
            <div className={`shadow rounded-2xl bg-white inline-block  my-3   ${user.email === message.user ? 'mr-5 md:mr-10' : 'ml-5 md:ml-10'}`}>
                <div className="flex flex-col">
                    <span className='break-all max-w-lg text-left p-2 px-3'>

                        {

                            message.pic && <div className='inline-block'>
                                <img src={`data:image/*;base64,${message.pic}`} alt='img'></img>
                                <br />

                            </div>
                        }
                        <span>{message.message}</span>

                        <small className='text-right block text-gray-400'>{message?.time}</small>
                    </span>

                </div>
            </div>
            <div dir='ltr' className={user.email === message.user ? "flex justify-end" : 'block'}>
                <Avatar alt={user.displayName} src={message.userPhoto} />
            </div>


        </div>
    );
};

export default Message;