import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './AddPost.css'
import axios from 'axios';
import { toastOptions } from '../../Utils/Toastify';
import { toast } from 'react-toastify';
const AddPost = () => {
  const [postData, setPostData] = useState({ title: '', content: '' });
  const { communityName } = useParams();
  const navigate = useNavigate();
  const variables = {
    Name: communityName,
    writer: localStorage.getItem('userid'),
    title: postData.title,
    content: postData.content
  }

  const addPostHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(`http://localhost:5000/api/post/createPost`, variables)
    if (response.data.status) {
      navigate(`/community/${communityName}`)
    } else {
      toast.error(response.data.msg, toastOptions)
    }
  }

  return (
    <div className='createPostContainer col-12 col-md-6'>
      <div className='createPostHeader'>
        Create a post
        <hr />
      </div>
      <div className='createPostBody col-12 col-md-12'>
        <form onSubmit={addPostHandler}>
          <div>

            <div>
              <input type="text" style={{ background: '#1A1A1B', height: '45px' }} onChange={(e) => setPostData({ ...postData, title: e.target.value })} className="addPostInput text-light col-md-11 col-10" placeholder="Add Title" id='title' maxLength={100} />
              <label htmlFor="title" className="form-label text-light ms-1 mt-2">{postData && postData.title && postData.title.length}/100</label>
            </div>
          </div>
          <div>
            <textarea
              className='text-areaStyling'
              placeholder="Text"
              onChange={(e) => setPostData({ ...postData, content: e.target.value })}
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