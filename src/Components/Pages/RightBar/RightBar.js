import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import useAuth from '../../Shared/hooks/useAuth';


const RightBar = props => {
    const { name, photo } = props.info;
    return (
        <AppBar sx={{ boxShadow: 'none', borderRadius: 16, px: 2, }} color='transparent' position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box className='flex justify-center items-center' sx={{ flexGrow: 1 }}>
                        <IconButton sx={{ p: 0, mr: 2 }}>
                            <Avatar alt={name} src={photo} />
                        </IconButton>
                        <Typography
                            variant="body1"
                            noWrap
                            component="h6"
                            sx={{ flexGrow: 1 }}
                        >
                            {name}
                        </Typography>
                    </Box>

                    <Box className='' sx={{ flexGrow: 0 }}>
                        <i className="fas fa-ellipsis-h rounded-full text-pink-400 p-1"></i>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default RightBar;