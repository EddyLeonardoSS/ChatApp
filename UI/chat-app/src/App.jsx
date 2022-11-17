import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { ChatPage } from './Pages/ChatPage';
import {Login} from './Components/Login/Login'

export const App = () => {
  return (

      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/' element= {<ChatPage/>}></Route>

      </Routes>
    
  );
}

export default App;
