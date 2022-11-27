import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import { Home } from './Components/Home/Home';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

      </Routes>
    </div>
  );
}

export default App;
