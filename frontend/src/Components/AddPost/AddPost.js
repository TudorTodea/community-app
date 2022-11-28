import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './AddPost.css'
import axios from 'axios';
import { toastOptions } from '../../Utils/Toastify';
import {toast } from 'react-toastify';
const AddPost = () => {
  const[postData,setPostData]=useState({});
  const {communityName}=useParams();
  const navigate=useNavigate();
  const variables={Name:communityName,
  writer:localStorage.getItem('userid'),
  title:postData.title,
  content:postData.content
}
  const addPostHandler=async(e)=>{
e.preventDefault();
const response=await axios.post(`http://localhost:5000/api/post/createPost`,variables)
if(response.data.status){
  navigate(`/community/${communityName}`)
}else{
  toast.error(response.data.msg,toastOptions)
}
}
  
  return (
    <div className='createPostContainer'>
      <div className='createPostHeader'>
      Create a post
      <hr/>
      </div>
      <div className='createPostBody'>
      <form onSubmit={addPostHandler}>
      <div class="input-group mb-3">
  <input type="text"   onChange={(e)=>setPostData({...postData,title:e.target.value})} class="addPostInput text-light" placeholder="Add Title" aria-label="Add title" aria-describedby="basic-addon2"/>
  <span class="input-group-text text-light" id="basic-addon2">0/300</span>
</div>
  <div>
  <textarea
        className='text-areaStyling'
          placeholder="Text"
          onChange={(e)=>setPostData({...postData,content:e.target.value})}
        />
  </div>
  <div className='postButtonContainer'>
  <button type="submit" class="btn btn-light">Post</button>
  </div>
  </form>
      </div>
    
      </div>
      
  )
}

export default AddPost