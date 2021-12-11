import React from 'react';
import useAuth from '../../Shared/hooks/useAuth';
import RightBar from '../RightBar/RightBar';
import ReactScrollableFeed from 'react-scrollable-feed'
import { Box } from '@mui/system';
import Message from '../../Message/Message';

const ChatBox = (props) => {
    const { user } = useAuth();
    const incoming = props.incoming;
    const client = props.client;
    return (
        <Box sx={{ height: ' ', flexGrow: '1' }}>
            <RightBar info={{ name: client?.displayName, photo: client?.photoURL }}></RightBar>
            <div style={{ height: '85%' }} className=' overflow-hidden'>
                <ReactScrollableFeed>
                    {
                        incoming?.map(ims => <Message key={ims._id} message={ims} client={client} user={user}></Message>)
                    }
                </ReactScrollableFeed>
            </div>
        </Box>
    );
};

export default ChatBox;