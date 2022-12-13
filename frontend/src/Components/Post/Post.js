import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BiComment } from "react-icons/bi";
import { FaComments } from "react-icons/fa";
import './Post.css'
import { toast, ToastContainer } from 'react-toastify';
import { toastOptions } from '../../Utils/Toastify';
import SingleComment from './SingleComment';
import LikeDislike from '../LikeDislike/LikeDislike';
import { BsEmojiSmileFill } from "react-icons/bs"
import Picker from "emoji-picker-react";
import ReplyComment from './ReplyComment';
import DateContext from '../../store/date-context';
import AuthContext from '../../store/auth-context';
import { addCommentRoute, getCommentsRoute, getPostByIdRoute } from '../../Utils/Routes';
const Post = () => {
  const [post, setPost] = useState();
  const { postId } = useParams()
  const [commentsList, setCommentsList] = useState()
  const [nrComments, setNrComments] = useState();
  const navigate = useNavigate();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [comment, setComment] = useState('')
  const dateCtx = useContext(DateContext);
  const authCtx = useContext(AuthContext);
  const addCommentVariables = {
    userId: localStorage.getItem('userid'),
    content: comment,
    postId,
  }
  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  }

  const handleEmojiClick = (emoji, event) => {
    let message = comment;
    message += emoji.emoji;
    setComment(message);
  }
  useEffect(() => {
    const getPostData = async () => {

      const response = await axios.get(`${getPostByIdRoute}${postId}`)

      if (response.data.status) {
        setPost(response.data.post);
      } else {
        navigate(`/PageNotFound`)
      }
    }
    const getComments = async () => {

      const response = await axios.get(`${getCommentsRoute}${postId}`)
      if (response.data.status) {
        setCommentsList(response.data.comments);
        setNrComments(response.data.count);
      }
    }
    getPostData();
    getComments();
  }, [])
  const handleSubmit = async (e) => {

    e.preventDefault()
    if (!authCtx.isLoggedIn) {
      navigate(`/login`)
    }
    if (comment.length > 0) {
      const response = await axios.post(addCommentRoute, addCommentVariables)
      if (!response.status) {
        toast.error('Error while adding the comment', toastOptions)
      } else {
        setCommentsList(commentsList.concat(response.data.comment));
        setNrComments(nrComments + 1);
        setComment('')
      }
    }
  }

  const updateComment = (newComment) => {
    setCommentsList(commentsList.concat(newComment))
  }
  return (

    <div className='postPageContainer col-md-6  col-12 mx-auto'>
      {post &&
        <div className='postContainer col-md-12  col-12'>
          <LikeDislike post={post} />
          <div className='textContainer'>
            <div className='postHeaderInfoContainer'><img alt='commAvatar' src={post && post.communityId.avatar} className='postComAvatar' onClick={() => navigate(`/Community/${post.communityId.Name}`)} /><div style={{ marginTop: '5px' }} className='underline-on-hover' onClick={() => navigate(`/Community/${post.communityId.Name}`)}>{post.communityId.Name}&nbsp;</div><div className='postHeaderInfo'>Posted by&nbsp;<div className='underline-on-hover' onClick={() => navigate(`/profile/${post.writer.username}`)}>{post.writer.username}</div>&nbsp;&nbsp;&nbsp;{dateCtx.dateUtc(post.createdAt)}</div></div>
            <div>
              <h5 className='postTitle h5'>{post.title}</h5>
              <div className='contentContainer'>
                {post.content}
              </div>
            </div>
            <div className='postFooter'>
              <BiComment color='white' size={25} />
              <div style={{ paddingLeft: '5px' }}>{nrComments && nrComments} Comments</div>

            </div>
            <div >
              {authCtx.isLoggedIn ?
                <div style={{ marginTop: '10px', marginLeft: '10px', fontSize: '12px' }}>
                  Comment as <span onClick={() => { navigate(`/profile/${localStorage.getItem('username')}`) }} style={{ color: 'aqua' }}
                    className='underline-on-hover'>{localStorage.getItem('username')}</span>
                </div> : <div style={{ marginTop: '10px', marginLeft: '10px', fontSize: '12px' }}>
                  Not logged in
                </div>
              }
              < form onSubmit={handleSubmit}>
                <textarea
                  className='postTextArea'
                  value={comment}
                  placeholder="What are your thoughts?"
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className='textAreaFooter'>
                  <div className='emoji '>
                    <BsEmojiSmileFill className='float-start ' size={25} onClick={handleEmojiPickerHideShow} />
                    {
                      showEmojiPicker && <Picker height={350} width={300} theme='dark' onEmojiClick={handleEmojiClick} />
                    }

                  </div>
                  <button type='submit' className='btn btn-light  float-end'>Comment</button>

                </div>
              </form>
              <hr />
            </div>
            <div className='commentsContainer'>
              <h3>Comments</h3>
              {commentsList && commentsList.length === 0 ?
                <div className='noComments '><div ><FaComments className='mx-auto' color='white' size={25} /></div> <div>No Comments Yet</div><div>Be the first to share what you think!</div></div>
                : <div>
                  {commentsList && commentsList.map((comment) => (
                    (!comment.responseTo &&

                      <div key={comment._id}>
                        <SingleComment
                          commentId={comment._id}
                          writerId={comment.userId._id}
                          currentUserId={localStorage.getItem('userid')}
                          author={comment.userId.username}
                          content={comment.content}
                          avatar={comment.userId.avatarImage}
                          postId={postId}
                          refreshFunction={updateComment}
                          createdAt={comment.createdAt}
                        />
                        <ReplyComment commentsList={commentsList} postId={postId} parentCommentId={comment._id} refreshFunction={updateComment} />

                      </div>
                    )
                  ))}
                </div>}
            </div>
          </div>

        </div>

      }
      <ToastContainer />
    </div>

  )
}

export default Post