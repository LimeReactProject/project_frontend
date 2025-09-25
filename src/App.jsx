import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login.jsx'
import Home from './pages/home/Home.jsx';
import EntityList from './components/EntityList';

function App() {
 

  return (
   <BrowserRouter>
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/login" element={<Login />} />
       <Route path="/" element={<EntityList/>}/>
      </Routes>
   </BrowserRouter>
  )
}

export default App;
