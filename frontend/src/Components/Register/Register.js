import React, {useState} from 'react'
import '../Login/Login.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from '../../Utils/Routes';
import { useNavigate } from 'react-router-dom';
import { toastOptions } from '../../Utils/Toastify';
 const Register = () => {
const[credentials,setCredentials]=useState({});
const navigate=useNavigate();



const formSubmitHandler= async(e)=>{
    e.preventDefault();
    if(credentials.password!==credentials.confirmPassword){
      toast.error('Password and Confirm Passwords fields do not match',toastOptions)
    }else{
    const response = await axios.post(registerRoute,credentials);
    if(!response.data.status)
    {
      toast.error(response.data.msg,toastOptions)
    }
    else{
      navigate('/login')
    }
  }
}
  return (
    <div className="Login-form-container">
        <form className="Login-form" onSubmit={formSubmitHandler}>
          <div className="Login-form-content ">
            <h3 className="Login-form-title">Register</h3>
            <div className="text-center">
             Already registered?{" "}
              <a href='/login'className="link-primary" >
                Sign in
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
              <label>Username</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter Username"
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />

            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />

            </div>
            <div className="form-group mt-3">
              <label>Confirm password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })} />

            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
           
          </div>
        </form>
        <ToastContainer/>
      </div>
  )
}
export default Register;