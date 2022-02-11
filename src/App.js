import './App.css';
import AuthProvider from './Components/Context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Pages/Home/Home';
import Login from './Components/Pages/Login/Login';
import SignUp from './Components/Pages/SignUp/SignUp';
import PrivateRoute from "./Components/Pages/PrivateRoute/PrivateRoute";
import io from 'socket.io-client'
import ChatRoom from "./Components/Pages/ChatRoom/ChatRoom";
import "tailwindcss/tailwind.css"
import AllUsers from './Components/Pages/AllUsers/AllUsers';
import AboutMe from './Components/AboutMe/AboutMe';


const socket = io.connect('https://nameless-cliffs-74237.herokuapp.com/');
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PrivateRoute><Home></Home></PrivateRoute>}>
            <Route path='/' element={<PrivateRoute><ChatRoom socket={socket}></ChatRoom></PrivateRoute>}></Route>
            <Route path='/:email' element={<PrivateRoute><ChatRoom socket={socket}></ChatRoom></PrivateRoute>}></Route>
          </Route>
          <Route path='/profile' element={<PrivateRoute><AboutMe phone></AboutMe></PrivateRoute>}></Route>
          <Route path='/user' element={<PrivateRoute><AllUsers phone></AllUsers></PrivateRoute>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/signup' element={<SignUp></SignUp>}></Route>
        </Routes>
      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;
