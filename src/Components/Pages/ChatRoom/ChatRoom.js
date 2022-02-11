import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import useAuth from '../../Shared/hooks/useAuth';
import ChatBox from '../ChatBox/ChatBox';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useParams } from 'react-router';
import axios from 'axios'
import { CircularProgress, LinearProgress, Stack } from '@mui/material';
import { Box } from '@mui/system';
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';

const ChatRoom = ({ socket }) => {
    AOS.init();
    const [incoming, setIncoming] = useState([]);
    const [client, setClient] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [room, setRoom] = useState(null);
    const { user } = useAuth();
    const { register, reset, watch, setValue, handleSubmit, formState: { errors } } = useForm();
    const { email } = useParams();
    const [imgLoading, setImgLoading] = useState(false);
    //email of client  
    useEffect(() => {
        setIsLoading(true);
        setIncoming([]);
        setClient({});
        axios.get(`https://nameless-cliffs-74237.herokuapp.com/users/${email}`)
            .then(async result => {
                await setClient(result)
                setIsLoading(false)
            })

    }, [email])

    // get the room 

    useEffect(() => {
        //join a room
        async function join() {
            // console.log('email', client?.data?.email, !isLoading);  
            if (!isLoading && email !== undefined && email === client?.data?.email) {
                const rooms = parseInt(user?.metadata?.createdAt) + parseInt(client?.data?.createdAt);
                setRoom(rooms);
                await socket.emit('join', rooms);
            }
        }
        join()
    }, [client, user, isLoading, room, email, socket])

    //get message after select user 
    useEffect(() => {
        setIsLoading(true);
        if (room) {
            axios.get(`https://nameless-cliffs-74237.herokuapp.com/chat/${room}`)
                .then(res => {
                    setIncoming(res.data)
                    setIsLoading(false)
                })
                .catch(error => { console.log(error); })
        }
    }, [room]);
    useEffect(() => {
        //handle message come
        socket.on('receive_message', data => {
            setIncoming(i => [...i, data]);
        })
    }, [])
    useEffect(() => {
        socket.emit('leave', room);
    }, [email]);
    useEffect(() => {
        const imgFile = watch('picFile');
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
                console.log(res.data.data.url);
                setValue('pic', res.data.data.url)
            }).finally(() => setImgLoading(false))
        }
        else {
        }

    }, [watch('picFile')]);

    const onSubmit = async data => {
        // delete data 
        delete data.picFile
        //data 
        data.user = user.email;
        data.userName = user.displayName;
        data.userPhoto = user.photoURL
        data.client = client.data.email;
        data.room = room;
        data.time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        axios.post('https://nameless-cliffs-74237.herokuapp.com/chat', data)
        setIncoming([...incoming, data]);
        await socket.emit('message', data);
        reset()
    }
    if (!isLoading && !client?.data?.displayName) {
        return <div className='col-span-2 h-screen'>
            <div className='h-full flex justify-center items-center'>
                <div className='text-center'>
                    <h2 className='text-lg'>User not found</h2>
                    <p>Please Select a exist user</p>
                </div>
            </div>
        </div>
    }
    if (isLoading) {
        return <>
            <div className='absolute top-0 left-0 w-full'>
                <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                    <LinearProgress color="secondary" />
                </Stack>
            </div>
            <div className='col-span-2 h-screen'>
                <ChatBox client={client?.data} incoming={incoming}></ChatBox>
            </div>
        </>
    }
    return (
        <div className='col-span-2 h-screen px-2'>
            <div className='h-full flex flex-col   '>
                <ChatBox client={client?.data} incoming={incoming}></ChatBox>
                <Box sx={{ flexGrow: '0' }} className='rows-span   mt-10 bg-primary  w-full   flex '>
                    <form className='flex items-center  w-full mb-5' onSubmit={handleSubmit(onSubmit)}>
                        <div className='relative'>
                            <label htmlFor="files" className="btn bg-white p-2 rounded-full inline-flex justify-center"><ImageIcon  ></ImageIcon></label>
                            <input id="files" accept='image/*' {...register("picFile")} className='hidden' type="file" />
                            {
                                imgLoading ? <span className=' absolute top-0 right-0 font-semibold'><CircularProgress size={15}></CircularProgress></span> : watch('pic')?.length ? <span className='text-red-800  absolute top-0 right-0 font-semibold'>1</span> : ''
                            }
                        </div>
                        <input type='text' className='flex-1 bg-white rounded-lg pl-2 py-1 mx-2 md:mx-4' placeholder=" write some thing" {...register("message", { required: watch('pic')?.length ? false : true })} />
                        <div>
                            {
                                imgLoading ? <button disabled={imgLoading} className='bg-gray-100 text-gray-500 opacity-75  rounded-full p-2 inline-flex justify-center' type='submit'><SendIcon></SendIcon></button> : <button className='bg-white rounded-full p-2 inline-flex justify-center' type='submit'><SendIcon></SendIcon></button>
                            }
                        </div>
                    </form>
                </Box>
            </div>
        </div>
    );
};

export default ChatRoom;