import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../Shared/hooks/useAuth';
import LeftBar from '../LeftBar/LeftBar';
import UserCard from '../UserCard/UserCard';
import { CircularProgress } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
const AllUsers = (props) => {
    const { register, reset, watch, handleSubmit, formState: { errors } } = useForm();
    const [allUsers, setAllUsers] = useState([]);
    const [displayUser, setDisplayUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const { email } = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        setLoading(true)
        axios.get('https://my-messanger-server-production.up.railway.app/users')
            .then(result => {
                setAllUsers(result.data)
                setDisplayUser(result.data)
                setLoading(false);
            });
    }, [user]);
    useEffect(() => {
        if (!email && !loading) {
            if (window.screen.width <= 500) {
                navigate('/user')
            }
            else {
                navigate(`/${allUsers[0].email}`)
            }
        }
    }, [email, allUsers, loading, navigate])
    useEffect(() => {
        if (watch('searchName').length) {
            const filterUser = allUsers.filter(singleUser => singleUser.displayName.toLowerCase().includes(watch('searchName').toLowerCase()))
            setDisplayUser(filterUser);
        }
        else {
            setDisplayUser(allUsers);
        }
    }, [watch('searchName')])
    return (
        <div className={`border h-full bg-white rounded-3xl ${props.phone ? "block" : 'hidden md:block'} `}>
            <div className=" bg-white">
                <LeftBar></LeftBar>
                <div className=" w-100 py-5 md:pb-2 px-4 ">
                    <div className="bg-primary flex justify-between items-center rounded-3xl">
                        <input type="text" {...register("searchName")} className=" bg-transparent w-4/5 pl-4 placeholder-gray-500 pr-8 rounded z-0  focus:outline-none" placeholder="Search by name..." />
                        <div className=""> <i className="fa fa-search p-3 mr-2 text-gray-400 z-20 hover:text-gray-500"></i> </div>
                    </div>
                </div>
            </div>
            <div style={{ height: '78vh', overflowY: 'scroll' }} className='mt-5 md:mt-0 bg- s-700 overflow-hidden '>
                {
                    loading ? <div className='flex justify-center'><CircularProgress ></CircularProgress></div> : displayUser.length ? displayUser.filter(client => user.email !== client.email).map(client => <UserCard key={client.email} data={client}></UserCard>) : <p className='text-center'>No user found</p>
                }
            </div>


        </div>
    );
};

export default AllUsers;