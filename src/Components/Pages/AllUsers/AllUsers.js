import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../Shared/hooks/useAuth';
import LeftBar from '../LeftBar/LeftBar';
import UserCard from '../UserCard/UserCard';
const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const { user } = useAuth();
    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then(result => setAllUsers(result.data));
    }, [user])
    return (
        <Box sx={{ height: '90%' }} className=' overflow-hidden rounded-3xl '>
            <div className="h-1/5 bg-white">
                <LeftBar></LeftBar>
                <div className=" w-100 pb-2 px-4 ">
                    <div className="bg-primary flex justify-between items-center rounded-3xl">
                        <input type="text" className="py-2 bg-transparent w-4/5 pl-4 placeholder-gray-500 pr-8 rounded z-0   focus:outline-none" placeholder="Search by name..." />
                        <div className=""> <i className="fa fa-search p-3 mr-2 text-gray-400 z-20 hover:text-gray-500"></i> </div>
                    </div>
                </div>
            </div>
            <div className='h-4/5 overflow-y-scroll  '>
                {
                    allUsers.filter(client => user.email !== client.email).map(client => <UserCard key={client.email} data={client}></UserCard>)
                }

                <UserCard data={{ displayName: 'dfdfdf', email: 'dfdf', photoURL: 'dfdfdf' }}></UserCard>
                <UserCard data={{ displayName: 'dfdfdf', email: 'dfdf', photoURL: 'dfdfdf' }}></UserCard>
                <UserCard data={{ displayName: 'dfdfdf', email: 'dfdf', photoURL: 'dfdfdf' }}></UserCard>
                <UserCard data={{ displayName: 'dfdfdf', email: 'dfdf', photoURL: 'dfdfdf' }}></UserCard>
                <UserCard data={{ displayName: 'dfdfdf', email: 'dfdf', photoURL: 'dfdfdf' }}></UserCard>
            </div>


        </Box>
    );
};

export default AllUsers;