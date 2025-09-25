import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login.jsx'
import Home from './pages/home/Home.jsx';
import Reservation from './components/reservation/reservation.jsx';


function App() {
 

  return (
   <BrowserRouter>
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/login" element={<Login />} />
       <Route path="/reserv" element={<Reservation/>} />
       
      </Routes>
   </BrowserRouter>
  )
}

export default App;
