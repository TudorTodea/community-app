import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../store/auth-context'
import { createCommunityRoute } from '../../Utils/Routes'
import axios from 'axios';
import './Navbar.css'
import { toastOptions } from '../../Utils/Toastify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from '../Search/Search';

const Navbar = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext)
  const [communityName, setCommunityName] = useState('');
  const username = localStorage.getItem('username')
  const [communities, setCommunities] = useState([]);
  const userId = localStorage.getItem('userid');
  const variables = {
    creatorId: userId,
    Name: communityName
  };

  const containsWhitespace = (str) => {
    return /\s/.test(str);
  }
  const communityCreateHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(createCommunityRoute, variables)
    if (response.data.status) {
      setCommunityName('');
      toast.success('The community was succesfully created', toastOptions)
    } else {
      toast.error(response.data.msg, toastOptions)
    }
  }

  useEffect(() => {
    const getCommunities = async () => {
      const response = await axios.get(`http://localhost:5000/api/community/getCommunitiesByUserId/${userId}`)
      if (response.status) {
        setCommunities(response.data.communities)
      }
    }
    getCommunities();
  }, [])

  const logoutHandler = () => {
    authCtx.logout();
    navigate('/login')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
          <div className="navbar-brand text-end " onClick={() => navigate('/')}>Reddit</div>
          <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown mx-auto mt-auto mb-auto">
                <button style={{ width: '200px' }} className="btn btn-dark nav-link dropdown-toggle" id="comunitiesDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  Home
                </button>
                <ul className="dropdown-menu" style={{ width: '200px' }} aria-labelledby="comunitiesDropdown">
                  <li><div className='communitiesText'>Communities you moderate</div></li>
                  <li><hr className="dropdown-divider" /></li>
                  {communities.map((community) => {
                    return (
                      <li key={community.Name}><div className="dropdown-item " onClick={() => navigate(`/Community/${community.Name}`)} key={community.Name}><div className='d-flex'><img src={community.avatar} alt="modAvatars" className='navbarCommunitiesAvatars' /><div className='mx-auto'>{community.Name}</div></div></div></li>
                    )
                  }
                  )}
                  <hr className="dropdown-divider" />
                  <li><div className='communitiesText'>Communities you are part of</div></li>
                </ul>
              </li>
              <div className='col-md-6 col-12' style={{ paddingBottom: '10px' }}>
                <Search />
              </div>
            </ul>

            <ul className='navbar-nav'>
              <li className='nav-link mx-auto'>
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#Modal">
                  Create community
                </button>
              </li>
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
                </li> : <li className='nav-item'>
                  <a href='/login' className='nav-link'>Log in</a>
                </li>}

            </ul>
            <div className="modal fade" id="Modal" tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden="true">

              <div className="modal-dialog ">
                <form onSubmit={communityCreateHandler}>
                  <div className="modal-content bg-dark text-light">
                    <div className="modal-header">
                      <h5 className="modal-title" id="ModalLabel">Create a community</h5>
                      <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <div className=''>
                        Name
                      </div>
                      <div style={{ marginBottom: '10px' }} className='modalHeaderInfo'>
                        Spaces are not allowed
                      </div>

                      <div className="form-group">
                        <input onChange={(e) => setCommunityName(e.target.value)} value={communityName} maxLength={21} type="text" className="input-modal text-light" required />
                      </div>
                      <div style={{ marginTop: '10px' }} className='modalHeaderInfo'>
                        {21 - communityName.length} characters remaining
                      </div>
                      {!communityName &&
                        <div className='nameRequired'>
                          A community name is required
                        </div>}
                      {communityName && containsWhitespace(communityName) &&
                        <div className='nameRequired'>
                          Community name not valid
                        </div>}
                    </div>
                    {communityName && containsWhitespace(communityName) ?
                      <div className="modal-footer">
                        <button type="submit" className="btn btn-secondary rounded-pill" disabled >Save changes</button>
                      </div> : <div className="modal-footer">
                        <button type="submit" className="btn btn-secondary rounded-pill" >Create community</button>
                      </div>}
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </nav>
      <ToastContainer />
    </div>
  )
}

export default Navbar