import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login.JSX'
import EntityList from './components/EntityList';
import Reservation from './components/reservation/reservation.jsx';

function App() {
 

  return (
   <BrowserRouter>
      <Routes>
       <Route path="/login" element={<Login />} /> 
       <Route path="/" element={<EntityList/>}/>
       <Route path="/reserv" element={<Reservation/>} />
       
      </Routes>
   </BrowserRouter>
  )
}

export default App;
