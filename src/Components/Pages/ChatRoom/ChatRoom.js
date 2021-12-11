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
        async function get() {

            // console.log('email', client?.data?.email, !isLoading); 

            if (!isLoading && email !== undefined && email === client?.data?.email) {
                const rooms = parseInt(user?.metadata?.createdAt) + parseInt(client?.data?.createdAt);
                console.log('my-room id is ', rooms);
                setRoom(rooms);
                await socket.emit('join', rooms);
                console.log('join room id', rooms);
                // (rooms);
            }
        }
        get()
    }, [client, user, isLoading, room, email, socket])



    console.log('the rome id is ', room);
    // useEffect(() => {

    //     console.log('roomid', room, client, user);

    //     room && socket.emit('join_chat', room)

    //     socket.on('message', msg => {
    //         console.log('its incoming message', msg);
    //         setIncoming(i => [...i, msg]);
    //     })
    // }, [client, email]);

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

        socket.on('receive_message', data => {
            // console.log('the receive message is  ', data);
            // console.log('client', client);
            // console.log(client?.data?.email === data.user);
            // console.log('client email', client?.data?.email, 'user email', data.user);
            console.log('data come your room', room);
            // if (client?.data?.email === data.user) {

            // axios.get(`http://localhost:5000/chat/${data.room}`)
            //     .then(res => {
            //         setIncoming(res.data)
            //         console.log('res', res);
            //     })
            setIncoming(i => [...i, data]);
            console.log('if are vitoer');

            // }
        })
    }, [room])
    console.log('the client ', client);
    //handle message came
    useEffect(() => {

    }, [socket])
    const onSubmit = async data => {
        // setRoom(parseInt(user?.metadata?.createdAt) + parseInt(client?.createdAt))
        // console.log(room);
        // socket.emit('message', { user: user?.displayName, email: user?.email, client: client.email, room: room, message: data.message })
        // setDisplay([...display, data.example])
        // setDisplay(data.example) 
        console.log(room);
        data.user = user.email;
        data.userName = user.displayName;
        data.userPhoto = user.photoURL
        data.client = client.email;
        data.room = room
        console.log('submit', data.room);
        axios.post('http://localhost:5000/chat', data)
        // setIncoming(i => [...i, data]);
        setIncoming([...incoming, data]);
        await socket.emit('message', data);
    }
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
                        <input className='flex-1 py-1 rounded' placeholder=" write some thing" {...register("message", { required: true })} />
                        <input className='py-1 px-4 bg-red-700 text-white rounded' type="submit" value='Send' />
                    </form>
                </Box>
            </div>
        </div>
    );
};

export default ChatRoom;