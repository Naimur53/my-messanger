import './App.css';
import AuthProvider from './Components/Context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Pages/Home/Home';
import Login from './Components/Pages/Login/Login';
import SignUp from './Components/Pages/SignUp/SignUp';
import PrivateRoute from "./Components/Pages/PrivateRoute/PrivateRoute";
import io from 'socket.io-client'
import ChatRoom from "./Components/Pages/ChatRoom/ChatRoom";
import { useEffect } from "react";
import "tailwindcss/tailwind.css"

const socket = io.connect('http://localhost:5000');

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PrivateRoute><Home></Home></PrivateRoute>}>
            <Route path='/' element={<ChatRoom socket={socket}></ChatRoom>}></Route>
            <Route path='/:email' element={<ChatRoom socket={socket}></ChatRoom>}></Route>
          </Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/signup' element={<SignUp></SignUp>}></Route>
        </Routes>
      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;
