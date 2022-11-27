import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../store/auth-context'
import './Navbar.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Navbar = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext)
  const username = localStorage.getItem('username')

  const logoutHandler = () => {
    authCtx.logout();
    navigate('/login')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
          <a className="navbar-brand text-end " onClick={() => navigate('/')}>Reddit</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown mx-auto mt-auto mb-auto">
                <button type="button" style={{ width: '200px' }} className="btn btn-dark nav-link dropdown-toggle" id="comunitiesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Home
                </button>
                <ul className="dropdown-menu" style={{ width: '200px' }} aria-labelledby="comunitiesDropdown">
                  <li><div className='communitiesText'>Communities you created</div></li>
                  <li><hr className="dropdown-divider" /></li>
                </ul>
              </li>
            </ul>

            <ul className='navbar-nav'>
              <li className='nav-link mx-auto'>
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#Modal">
                  Create community
                </button>
              </li>
              {username ?
                <li className="nav-item dropdown mx-auto mb-auto mt-auto">
                  <a className="nav-link  mx-auto" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={localStorage.getItem('avatarImage')} className='navbarUserAvatar mx-auto' />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end " aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item text-center">Profile</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a onClick={logoutHandler} className="dropdown-item text-center">Log out</a></li>

                  </ul>
                </li> : <li className='nav-link'>
                  <a href='/login' className='nav-link'>Log in</a>
                </li>}

            </ul>
            <div className="modal fade" id="Modal" tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden="true">

              <div className="modal-dialog ">
                <form >
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
                        <input maxLength={21} type="text" className="input-modal text-light" required />
                      </div>
                      <div style={{ marginTop: '10px' }} className='modalHeaderInfo'>
                        characters remaining
                      </div>

                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-secondary rounded-pill" >Create community</button>
                    </div>
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