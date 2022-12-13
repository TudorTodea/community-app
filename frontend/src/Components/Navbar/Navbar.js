import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../store/auth-context'
import axios from 'axios';
import './Navbar.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from '../Search/Search';
import { CreateCommunity } from './CreateCommunity';
import { getCommunitiesByUserIdRoute, getCommunitiesModeratedByUserIdRoute } from '../../Utils/Routes';

const Navbar = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext)
  const username = localStorage.getItem('username')
  const [moderatedCommunities, setModeratedCommunities] = useState([]);
  const [communities, setCommunities] = useState([]);
  const userId = localStorage.getItem('userid');
  var imageBasePath = window.location.protocol + "//" + window.location.host + "/images/";
  useEffect(() => {
    const getModeratedCommunities = async () => {
      const response = await axios.get(`${getCommunitiesModeratedByUserIdRoute}${userId}`)
      if (response.status) {
        setModeratedCommunities(response.data.communities)
      }
    }
    const getCommunities = async () => {
      const response = await axios.get(`${getCommunitiesByUserIdRoute}${userId}`)
      if (response.status) {
        setCommunities(response.data.communities)
      }
    }
    getCommunities();
    getModeratedCommunities();
  }, [authCtx.isLoggedIn])

  const logoutHandler = () => {
    authCtx.logout();
    navigate('/login')
  }

  const refreshFunction = (community) => {
    setCommunities(communities.concat(community))
    setModeratedCommunities(moderatedCommunities.concat(community))
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
          <div className="navbar-brand text-end " onClick={() => navigate('/')}><img src={imageBasePath + 'commapp_logo.png'} alt='brand' className='brandImg' /></div>
          <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown mx-auto mt-auto mb-auto">
                <button style={{ width: '200px' }} className="btn btn-dark nav-link dropdown-toggle" id="comunitiesDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  Home
                </button>
                <ul className="dropdown-menu" style={{ width: '200px', height: '400px', overflow: 'hidden', overflowY: 'scroll' }} aria-labelledby="comunitiesDropdown">
                  <li><div className='communitiesText'>Communities you moderate</div></li>
                  <li><hr className="dropdown-divider" /></li>
                  {moderatedCommunities.map((community) => {
                    return (
                      <li key={community.Name}><div className="dropdown-item " onClick={() => navigate(`/Community/${community.Name}`)} key={community.Name}><div className='d-flex'><img src={community.avatar} alt="modAvatars" className='navbarCommunitiesAvatars' /><div className='mx-auto'>{community.Name}</div></div></div></li>
                    )
                  }
                  )}
                  <hr className="dropdown-divider" />
                  <li><div className='communitiesText'>Communities you are part of</div></li>
                  {communities.map((community) => {
                    return (
                      <li key={community.Name}><div className="dropdown-item " onClick={() => navigate(`/Community/${community.Name}`)} key={community.Name}><div className='d-flex'><img src={community.avatar} alt="comAvatars" className='navbarCommunitiesAvatars' /><div className='mx-auto'>{community.Name}</div></div></div></li>
                    )
                  }
                  )}
                </ul>
              </li>
              <div className='col-md-6 col-12' style={{ paddingBottom: '10px' }}>
                <Search />
              </div>
            </ul>

            <ul className='navbar-nav'>
              <li className='nav-link mx-auto'>
                {authCtx.isLoggedIn && <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#Modal">
                  Create community
                </button>
                }
              </li>
              <div className="modal fade" id="Modal" tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden="true">

                <CreateCommunity refreshFunction={refreshFunction} />

              </div>
              {username ?
                <li className="nav-item dropdown mx-auto mb-auto mt-auto">
                  <div className="nav-link  mx-auto" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={localStorage.getItem('avatarImage')} className='navbarUserAvatar mx-auto' alt='navbarUserAvatarImg' />
                  </div>
                  <ul className="dropdown-menu dropdown-menu-end " aria-labelledby="navbarDropdown">
                    <li><div className="dropdown-item text-center" onClick={() => navigate(`/profile/${username}`)} >Profile</div></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><div onClick={logoutHandler} className="dropdown-item text-center">Log out</div></li>

                  </ul>
                </li> : <li className='nav-link'>
                  <a href='/login' className='nav-link'>Log in</a>
                </li>}

            </ul>
          </div>
        </div>
      </nav>
      <ToastContainer />
    </div>
  )
}

export default Navbar