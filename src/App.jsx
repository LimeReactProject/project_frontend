import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login.jsx';
import Home from './pages/home/Home.jsx';
import Reservation from './components/reservation/reservation.jsx';
import FlightInfo from './pages/flight-information/FlightInfo.jsx';
import DomesticBenefit from './pages/fare/DomesticBenefit.jsx';
import InternationalBenefit from './pages/fare/InternationalBenefit.jsx';
import ViewOnOffReservationList from './pages/mypage/ViewOnOffReservationList.jsx';
import ViewReservationList from './pages/mypage/ViewReservationList.jsx';
import ReservationDetails from './pages/mypage/ReservationDetails.jsx';

function App() {
 

  return (
   <BrowserRouter>
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/login" element={<Login />} />
       <Route path="/reserv" element={<Reservation/>} />
       <Route path="/flight-info" element={<FlightInfo/>} />
       <Route path="/DomesticBenefit" element={<DomesticBenefit />} />
       <Route path="/InternationalBenefit" element={<InternationalBenefit />} />
       <Route path="/ViewOnOffReservationList" element={<ViewOnOffReservationList />} />
       <Route path="/ViewReservationList" element={<ViewReservationList />} />
       <Route path="/ReservationDetails" element={<ReservationDetails />} />
      </Routes>
   </BrowserRouter>
  )
}

export default App;
