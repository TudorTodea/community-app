import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import { Home } from './Components/Home/Home';
import AddPost from './Components/AddPost/AddPost';
import Community from './Components/Community/Community';
import Post from './Components/Post/Post';
function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/add-post/:communityName" element={<AddPost />} />
        <Route path="/Community/:communityName" element={<Community />} />
        <Route path="/Community/:communityName/:postId" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
