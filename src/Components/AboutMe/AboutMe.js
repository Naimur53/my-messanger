import { Box, CircularProgress, IconButton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../Shared/hooks/useAuth';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { NavLink } from 'react-router-dom';
import BrushIcon from '@mui/icons-material/Brush';
const AboutMe = () => {
    const { user, userImgUpdate } = useAuth();
    const [imgLoading, setImgLoading] = useState();
    const [imgFile, setImgFile] = useState();
    const [imgLink, setImgLink] = useState('');
    useEffect(() => {
        if (imgFile?.length) {
            let body = new FormData()
            body.set('key', process.env.REACT_APP_IMAGEBB_API)
            body.append('image', imgFile[0])
            setImgLoading(true);
            axios({
                method: 'post',
                url: 'https://api.imgbb.com/1/upload',
                data: body
            }).then(res => {
                setImgLink(res.data?.data?.url)
            }).finally(() => setImgLoading(false))
        }
        else {
        }

    }, [imgFile])
    const handleChose = e => {
        setImgFile(e.target.files)
    }
    const handleCancel = () => {
        setImgFile(null)
        setImgLink('')
    }
    const handleSave = () => {
        userImgUpdate(imgLink);
        setImgFile(null)
    }
    return (
        <Box className={`border  overflow-hidden rounded-3xl bg-white`}>
            <div className='flex justify-end md:hidden py-4'>
                <IconButton component={NavLink} to='/user'><ArrowForwardIcon></ArrowForwardIcon></IconButton>
            </div>
            <div className='mt-4 flex justify-center'>
                <div className='relative '>
                    {
                        imgLoading ? <CircularProgress></CircularProgress> : imgLink.length ? <img className='rounded-full w-40 h-40' src={imgLink} alt="userPhoto" /> : <img className='rounded-full w-40 h-40' src={user?.photoURL} alt="userPhoto" />
                    }

                    <label htmlFor="userImg" title='Change Image' className='absolute bg-pink p-1 rounded-full  text-white bottom-0 right-0'><BrushIcon></BrushIcon></label>
                </div>

            </div>
            {
                imgFile?.length && <div className='justify-center flex py-5'>
                    <button onClick={handleCancel} className='mr-5 px-2 py-1 rounded-md bg-primary text-gray-900 '>Cancel</button>
                    <button onClick={handleSave} className=' px-2 py-1 rounded-md bg-pink text-white'>Save</button>

                </div>
            }
            <div className='text-center mt-4'>
                <h2 className='text-xl'>{user.displayName}</h2>
                <h2 className='text-xl'>{user.email}</h2>
            </div>
            <form >
                <input id="userImg" onChange={handleChose} accept='image/*' className='hidden' type="file" />
            </form>
        </Box>
    );
};

export default AboutMe;