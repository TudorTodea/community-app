import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BiComment } from "react-icons/bi";
import { FaComments } from "react-icons/fa";
import './Post.css'
import { ToastContainer } from 'react-toastify';
import TextArea from './TextArea';
const Post = () => {
  const [post, setPost] = useState();
  const { postId } = useParams()
  const [commentsList, setCommentsList] = useState()
  const navigate = useNavigate();


  useEffect(() => {
    const getPostData = async () => {

      const response = await axios.get(`http://localhost:5000/api/post/getPostById/${postId}`)
      if (response.data.status) {
        setPost(response.data.post);
      }
    }
    getPostData();
  }, [])


  const addComment = (comment) => {
    setCommentsList(commentsList.concat(comment));
  }

  return (

    <div className='postPageContainer col-md-6  col-12 mx-auto'>
      {post &&
        <div className='postContainer col-md-12  col-12'>
          <div className='textContainer'>
            <div className='postHeaderInfoContainer'><img alt='commAvatar' src={post && post.communityId.avatar} className='postComAvatar' onClick={() => navigate(`/Community/${post.communityId.Name}`)} /><div style={{ marginTop: '5px' }} className='underline-on-hover' onClick={() => navigate(`/Community/${post.communityId.Name}`)}>{post.communityId.Name}&nbsp;</div><div className='postHeaderInfo'>Posted by&nbsp;<div className='underline-on-hover'>{post.writer.username}</div>&nbsp;5 hours ago</div></div>
            <div>
              <h5 className='postTitle'>{post.title}</h5>
              <div className='contentContainer'>
                {post.content}
              </div>
            </div>
            <div className='postFooter'>
              <BiComment color='white' size={25} />
              <div style={{ paddingLeft: '5px' }}> Comments</div>

            </div>
            <div >
              <div style={{ marginTop: '10px', marginLeft: '10px', fontSize: '12px' }}>
                Comment as <span onClick={() => { navigate(`/profile/${localStorage.getItem('username')}`) }} style={{ color: 'aqua' }} className='underline-on-hover'>{localStorage.getItem('username')}</span>
              </div>
              <TextArea addComment={addComment} postId={postId} />
              <hr />
            </div>
            <div className='commentsContainer'>
              <h3>Comments</h3>

            </div>
          </div>

        </div>

      }
      <ToastContainer />
    </div>

  )
}

export default Post