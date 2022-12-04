import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import axios from 'axios';
import { loginRoute } from '../../Utils/Routes';
import { toastOptions } from '../../Utils/Toastify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../store/auth-context';
export const Login = () => {
  const [credentials, setCredentials] = useState({})
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext)
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(loginRoute, credentials)
    if (response.data.status) {
      authCtx.login(response.data.user.username, response.data.user._id, response.data.user.avatarImage, response.data.token)
      navigate('/')
    } else {
      toast.error(response.data.msg, toastOptions)
    }
  }
  useEffect(() => {
    if (authCtx.isLoggedIn) {
      navigate('/')
    }
  }, [authCtx.isLoggedIn])
  return (
    <div className="Login-form-container">
      <form className="Login-form" onSubmit={formSubmitHandler}>
        <div className="Login-form-content ">
          <h3 className="Login-form-title">Sign In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <a href='/register' className="link-primary" >
              Sign Up
            </a>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>

        </div>
      </form>
      <ToastContainer />
    </div>
  )
}
export default Login;