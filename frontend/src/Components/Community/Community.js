import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Community.css'
import { AiFillPicture } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Grid } from '../Grid/Grid';

const Community = () => {
  const { communityName } = useParams()
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [url, setUrl] = useState({ avatar: '', banner: '' });


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
        setUrl({ avatar: response.data.community.avatar, banner: response.data.community.banner })
        if (response.data.community.members.includes(localStorage.getItem('userid'))) {

        } else {

        }
      }
    }
    getCommunityInfo();
    getPosts();
  }, [communityName])
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
        backgroundPosition: 'center, center',
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

            <button type="submit" className="btn btn-light rounded-pill" >Join</button>

          </div>
        </div>
      </div>
      <div className='d-flex'>
        <div className='communityContainer col-12 col-md-6'>
          <div className='addPostContainer col-md-10 col-12'><img alt='userAvatar' src={localStorage.getItem('avatarImage')} className='userAvatar' />

            <input type="text" id='#AddPost' className="form-control mt-auto mb-auto" placeholder='Add Post' onClick={() => navigate(`/add-post/${communityName}`)} required />

            <div>
              <button className='btn addPictureButton'><AiFillPicture color='white' size={25} /></button>
            </div>
          </div>
          <Grid posts={posts} />
        </div>

      </div>
    </div>
  )
}

export default Community