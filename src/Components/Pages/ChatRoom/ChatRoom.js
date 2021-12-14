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

const ChatRoom = ({ socket }) => {
    AOS.init();
    const [incoming, setIncoming] = useState([]);
    const [client, setClient] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [room, setRoom] = useState(null);
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { email } = useParams();
    //email of client 
    console.log('change up email', email);
    useEffect(() => {
        setIsLoading(true);
        console.log('user params', email);
        setClient({});
        axios.get(`http://localhost:5000/users/${email}`)
            .then(async result => {
                console.log('data came');
                await setClient(result)
                setIsLoading(false);
            })

    }, [email])

    // get the room 

    useEffect(() => {
        //join a room
        async function join() {
            // console.log('email', client?.data?.email, !isLoading);  
            if (!isLoading && email !== undefined && email === client?.data?.email) {
                const rooms = parseInt(user?.metadata?.createdAt) + parseInt(client?.data?.createdAt);
                console.log('my-room id is ', rooms);
                setRoom(rooms);
                await socket.emit('join', rooms);
                console.log('join room id', rooms);
            }
        }
        join()
    }, [client, user, isLoading, room, email, socket])



    console.log('the rome id is ', room);

    //get message after select user
    useEffect(() => {
        setIncoming([]);
        setIsLoading(true);
        axios.get(`http://localhost:5000/chat/${room}`)
            .then(res => {
                setIncoming(res.data)
                setIsLoading(false)
            })
        console.log('bari dise er ');
    }, [room]);
    useEffect(() => {
        //handle message come
        socket.on('receive_message', data => {
            console.log('data come your room', room);
            setIncoming(i => [...i, data]);
            console.log('if are vitoer');
        })
    }, [])
    useEffect(() => {
        socket.emit('leave', room);
    }, [email])

    const onSubmit = async data => {
        //data


        data.user = user.email;
        data.userName = user.displayName;
        data.userPhoto = user.photoURL
        data.client = client.data.email;
        data.room = room;
        data.time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        const mainData = new FormData();
        for (const key in data) {
            if (key === 'pic') {
                mainData.append(key, data[key][0])
            }
            else {
                mainData.append(key, data[key])
            }
        }
        console.log('image', data.pic[0])
        if (!data.pic[0]) {
            data.pic = undefined;
            mainData.append('pic', undefined)
        }

        // console.log('submit', data.room);
        axios.post('http://localhost:5000/chat', mainData)
        setIncoming([...incoming, data]);
        await socket.emit('message', data);
    }
    console.log(incoming);
    if (!client?.data?.displayName) {
        return <div className='col-span-2 h-screen'>
            <ChatBox client={client?.data} incoming={incoming}></ChatBox>
            Select user to chat
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
        <div className='col-span-2  h-screen px-2'>
            <div style={{ height: '90%' }} className='  flex flex-col justify-between'>
                <ChatBox client={client?.data} incoming={incoming}></ChatBox>
                <Box sx={{ flexGrow: '0' }} className='rows-span '>
                    <form className='flex ' onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="files" className="btn">Select Image</label>
                            <input id="files" accept='image/*' {...register("pic")} className='hidden' type="file" />
                        </div>
                        <input className='flex-1 py-1 rounded bg-transparent' placeholder=" write some thing" {...register("message", { required: true })} />
                        <input className='py-1 px-4 bg-red-700 text-white rounded' type="submit" value='Send' />
                    </form>
                </Box>
            </div>
        </div>
    );
};

export default ChatRoom;