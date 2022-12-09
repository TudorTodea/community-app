import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Community.css'
import { AiFillPicture } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { FaBirthdayCake } from "react-icons/fa";
import axios from 'axios';
import { Grid } from '../Grid/Grid';
import { BiUser } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import AuthContext from '../../store/auth-context';
const Community = () => {
  const { communityName } = useParams()
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [description, setDescription] = useState('');
  const [joined, setJoined] = useState(false);
  const [mod, setMod] = useState(false);
  const [nrMembers, setNrMembers] = useState(0);
  const [date, setDate] = useState()
  const [url, setUrl] = useState({ avatar: '', banner: '' });
  const authCtx = useContext(AuthContext);

  const joinCommunityHandler = async (e) => {
    e.preventDefault()
    if (!authCtx.isLoggedIn) {
      navigate(`/login`)
      return
    }
    const response = await axios.post(`http://localhost:5000/api/community/joinCommunity/`, { communityName, userId: localStorage.getItem('userid') })
    if (response.status) {
      if (joined) {
        setNrMembers(nrMembers - 1)
      } else {
        setNrMembers(nrMembers + 1)
      }
      setJoined(!joined);
    }
  }


  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get(`http://localhost:5000/api/post/getPosts/${communityName}`)
      if (response.data.status) {
        setPosts(response.data.posts)
      }
    }
    const getCommunityInfo = async () => {
      const response = await axios.get(`http://localhost:5000/api/community/getCommunityInfo/${communityName}`)
      if (response.data.status) {
        setDescription(response.data.community.description)
        setNrMembers(response.data.count);
        setDate(new Date(response.data.community.createdAt).toUTCString().slice(0, 16));
        setUrl({ avatar: response.data.community.avatar, banner: response.data.community.banner })
        if (response.data.community.mods.includes(localStorage.getItem('userid'))) {
          setMod(true);
        }
        if (response.data.community.members.includes(localStorage.getItem('userid'))) {
          setJoined(true);
        } else {
          setJoined(false);
        }
      } else {
        navigate(`/PageNotFound`)
      }

    }

    getCommunityInfo();
    getPosts();
  }, [communityName, localStorage.getItem('userid')])
  return (
    <div>
      <div className='communityIMG' style={{
        background:
          `linear-gradient(to bottom, rgba(0,0,0,0)
            39%,rgba(0,0,0,0)
            41%,rgba(0,0,0,0.65)
            100%),
            url(${url.banner}), #1c1c1c`,
        height: '300px',
        backgroundSize: '100%, cover',
        width: '100%',
        position: 'relative'
      }}
      >
      </div>

      <div className='communityHeader text-light'>
        <div className='communityHeaderInfo col-md-6 col-12'>
          <img alt='commBigAvatar' src={url.avatar && url.avatar} className='communityAvatar' />
          <div className='communityHeaderTitle'>{communityName}</div>
          <div className='communityHeaderButtonContainer d-flex'>
            <form onSubmit={joinCommunityHandler}>
              <button type="submit" className="btn btn-light rounded-pill" >{joined ? 'Leave' : 'Join'}</button>
            </form>
            {mod &&
              <form onSubmit={() => navigate(`/community/settings/${communityName}`)}>
                <button type='submit' className='ms-3'><FiEdit size={35} color='white' /></button>
              </form>}
          </div>
        </div>
      </div>
      <div className='d-flex'>
        <div className='communityContainer col-12 col-md-6'>
          <div className='addPostContainer col-md-10 col-12'>{authCtx.isLoggedIn && <img alt='userAvatar' src={localStorage.getItem('avatarImage')} className='userAvatar' />}

            <input type="text" id='#AddPost' className="form-control mt-auto mb-auto" placeholder='Add Post' onClick={() => navigate(`/add-post/${communityName}`)} required />

            <div>
              <button className='btn addPictureButton'><AiFillPicture color='white' size={25} /></button>
            </div>
          </div>
          <Grid posts={posts} />
        </div>
        <div className='communityInfoContainer    d-none d-lg-block mt-3' >
          <div className='communityInfoHeader'>
            About community
          </div>
          <div className='communityDescription ms-1 mt-1 mb-1'>
            <div>{description ? description : 'There is no description yet'}</div>
          </div>
          <hr />
          <div className='communityCreationDate'>
            <FaBirthdayCake size={20} color='white' /> Created {date}
          </div>
          <hr />
          <div className='d-flex mt-1' style={{ paddingLeft: '5px' }}>{nrMembers && nrMembers} <BiUser className='mt-1' size={17} color='white' /></div>
          <div className='communityMembers'>Members</div>
          <hr />
          <div className='mb-2 mt-2'>
            {joined ? <button className='btn btn-md btn-light rounded-pill col-12 mx-auto ' onClick={() => navigate(`/add-post/${communityName}`)}>Create post</button>
              : <button className='btn btn-md btn-light rounded-pill col-12 mx-auto ' onClick={joinCommunityHandler}>Join community</button>}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Community