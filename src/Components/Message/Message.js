import { Avatar } from '@mui/material';
import { maxWidth } from '@mui/system';
import React from 'react';

const Message = ({ message, user, client }) => {
    return (
        <div className={user.email === message.user ? "text-right " : 'text-left'}>
            <div className={`shadow rounded-2xl bg-white inline-block  my-2   ${user.email === message.user ? 'mr-2 md:mr-5' : 'ml- md:ml-5'}`}>
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
                <Avatar sx={{ height: 30, width: 30 }} alt={message.userName} src={message.userPhoto} />
            </div>


        </div>
    );
};

export default Message;