import { Outlet } from 'react-router';
import AboutMe from '../../AboutMe/AboutMe';
import AllUsers from '../AllUsers/AllUsers';
const Home = () => {
    return (
        <div data-aos="zoom-in" className='bg-primary p-3'>
            <div className='grid grid-cols-4 h-screen'>
                <AllUsers></AllUsers>
                <Outlet></Outlet>
                <AboutMe></AboutMe>
            </div>
        </div >
    );
};

export default Home;