import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { ChatPage } from './Pages/ChatPage';
import { Layout } from './Components/Layout/Layout';

export const App = () => {
  return (

      <Routes>
        <Route path='/' element= {<ChatPage/>}></Route>

      </Routes>
    
  );
}

export default App;
