import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import { Home } from './Components/Home/Home';
import AddPost from './Components/AddPost/AddPost';
import Community from './Components/Community/Community';
import Post from './Components/Post/Post';
import Search from './Components/Search/Search';
import CommunityEdit from './Components/CommunityEdit/CommunityEdit';
import Profile from './Components/Profile/Profile';
import ProfileEdit from './Components/Profile/ProfileEdit';
import PageNotFound from './Components/PageNotFound/PageNotFound';
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
        <Route path="/search" element={<Search />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/profile/edit/:username" element={<ProfileEdit />} />
        <Route path="/community/settings/:communityName" element={<CommunityEdit />} />
        <Route path="/PageNotFound" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
