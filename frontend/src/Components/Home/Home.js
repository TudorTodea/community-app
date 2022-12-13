import React, { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios';
import { Grid } from '../Grid/Grid';
import { useNavigate } from 'react-router-dom';
import JoinedCommunity from './JoinedCommunity';
import { getRandomCommunitiesRoute, getRecentPostsRoute } from '../../Utils/Routes';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [communities, setCommunities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get(getRecentPostsRoute)
      if (response.data.status) {
        setPosts(response.data.data)
      }
    }
    const getCommunities = async () => {
      const response = await axios.get(getRandomCommunitiesRoute)
      if (response.data.status) {
        setCommunities(response.data.communities)
      }
    }
    getCommunities();
    getPosts();
  }, [])
  return (
    <div className='d-flex'>
      <div className='homeContainer col-md-6 col-12'>
        <Grid posts={posts} />
      </div>
      <div className='communitiesRecommendedContainer  d-none d-lg-block mt-4'>
        <div style={{
          background:
            `linear-gradient(to bottom, rgba(0,0,0,0)
            39%,rgba(0,0,0,0)
            41%,rgba(0,0,0,0.65)
            100%),
            url(https://i.redd.it/2y2pftyz87981.png), #1c1c1c`,
          height: '100px',
          backgroundSize: '100%, cover',
          width: '100%',
          position: 'relative'
        }}
        >
          <div className='text-light ms-2 fw-bold' style={{ paddingTop: '70px' }}>Check out these communities</div>
        </div>
        {communities && communities.map((elem, index) => {
          return (
            <div key={elem.Name}>
              <div className='d-flex mt-2 mb-2'>
                <div className='ms-2 mt-auto mb-auto'>{index + 1}</div>
                <img className='randomCommunitiesAvatar ms-2' alt='randomCommunityAvatar' src={elem.avatar} onClick={() => { navigate(`/community/${elem.Name}`) }} style={{ cursor: 'pointer' }} />
                <div className='mx-auto mt-auto mb-auto fw-bold ' style={{ cursor: 'pointer' }} onClick={() => { navigate(`/community/${elem.Name}`) }}>{elem.Name}</div>
                <JoinedCommunity Name={elem.Name} />

              </div>
              {index !== 4 && <hr />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
