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
import Membership from './pages/membership/Membership.jsx';
import UserAgreement from './pages/membership/UserAgreement.jsx';
import ScheduleDetail from './pages/flight-information/ScheduleDetail.jsx';
import FlightTracking from './pages/flight-information/FlightTracking.jsx';

import NoticeList from './pages/notice/NoticeList.jsx';
import NoticeEdit from './pages/notice/NoticeEdit.jsx';
import NoticeDetail from './pages/notice/NoticeDetail.jsx';
import NoticeNew from './pages/notice/NoticeNew.jsx';

import MyPage from './pages/mypage/MyPage.jsx';
import PaymentComplete from './components/reservation/PaymentComplete.jsx';
import FareOption from './pages/fareoption/FareOption.jsx';


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
       <Route path="/membership" element={<Membership/>} />
       <Route path="/user-agreement" element={<UserAgreement/>} />
       <Route path='/ScheduleDetail' element={<ScheduleDetail/>}/>
       <Route path='/flight-tracking' element={<FlightTracking/>}/>

       <Route path='/noticeList' element={<NoticeList/>}/>
       <Route path='/noticeEdit/:id' element={<NoticeEdit/>}/>
       <Route path='/noticeDetail/:id' element={<NoticeDetail/>}/>
       <Route path='/noticeNew' element={<NoticeNew/>}/>
       <Route path='/mypage' element={<MyPage/>}/>
       <Route path="/payment/success" element={<PaymentComplete />} />
   
        <Route path="/fare-option" element={<FareOption />} />
      </Routes>
   </BrowserRouter>
  )
}

export default App;
