import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import './SingleComment.css'
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'antd';
import { Comment } from '@ant-design/compatible';
import DateContext from '../../store/date-context';
import AuthContext from '../../store/auth-context';
import { addCommentRoute, getLikesRoute, unDislikeRoute, unLikeRoute, upDislikeRoute, upLikeRoute } from '../../Utils/Routes';
const SingleComment = ({ commentId, author, content, currentUserId, avatar, postId, refreshFunction, createdAt }) => {

    const [likes, setLikes] = useState(0)
    const [likeAction, setLikeAction] = useState(null)
    const [dislikeAction, setDislikeAction] = useState(null)
    const [replyOpen, setReplyOpen] = useState(false);
    const [CommentValue, setCommentValue] = useState("")
    const dateCtx = useContext(DateContext);
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const onLike = async (e) => {
        e.preventDefault();
        if (authCtx.isLoggedIn) {
            if (likeAction === null) {
                const response = await axios.post(upLikeRoute, { commentId, userId: localStorage.getItem('userid') })
                if (response.status) {
                    if (dislikeAction !== null) {
                        setLikes((prev) => prev + 2)
                        setDislikeAction(null);
                        setLikeAction('liked');
                    } else {
                        setLikes((prev) => prev + 1)
                        setLikeAction('liked')
                    }
                }
            } else {
                const response = await axios.post(unLikeRoute, { commentId, userId: localStorage.getItem('userid') })
                if (response.status) {
                    setLikes((prev) => prev - 1)
                    setLikeAction(null);
                }
            }
        }
    }
    const onDislike = async (e) => {
        e.preventDefault();
        if (authCtx.isLoggedIn) {
            if (dislikeAction === null) {
                const response = await axios.post(upDislikeRoute, { commentId, userId: localStorage.getItem('userid') })
                if (response.status) {
                    if (likeAction !== null) {
                        setLikes((prev) => prev - 2)
                        setLikeAction(null)
                        setDislikeAction('disliked')
                    } else {
                        setLikes((prev) => prev - 1)
                        setDislikeAction('disliked')
                    }
                }
            } else {
                const response = await axios.post(unDislikeRoute, { commentId, userId: localStorage.getItem('userid') })
                if (response.status) {
                    setLikes((prev) => prev + 1)
                    setDislikeAction(null)
                }
            }
        }
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        if (CommentValue.length > 0) {
            if (authCtx.isLoggedIn) {
                const variables = {
                    userId: localStorage.getItem('userid'),
                    postId: postId,
                    responseTo: commentId,
                    content: CommentValue
                }


                const response = await axios.post(addCommentRoute, variables)
                if (response.status) {
                    setCommentValue("")
                    setReplyOpen(!replyOpen)
                    refreshFunction(response.data.comment)
                } else {
                    alert('Failed to save Comment')
                }
            }
            else {
                navigate(`/login`)
            }
        }
    }
    useEffect(() => {

        const getLikes = async () => {
            const response = await axios.post(getLikesRoute, { commentId })
            if (response.data.status) {
                setLikes(response.data.likeDislikeDiff);
                response.data.likes.map((e) => {
                    if (e.userId === currentUserId) {
                        setLikeAction('liked')
                    }
                })
                response.data.dislikes.map((e) => {
                    if (e.userId === currentUserId) {
                        setDislikeAction('disliked')
                    }
                })
            }
        }
        getLikes();
    }, [])


    return (
        <>
            <div>
                <Comment style={{ backgroundColor: '#1A1A1B', }}
                    author={<div onClick={() => navigate(`/profile/${author}`)} style={{ color: "#D7DADC" }} className='commentAuthor '>
                        {author}
                    </div>}
                    datetime={
                        <span style={{ color: "#D7DADC" }}>{dateCtx.dateUtc(createdAt)}</span>
                    }
                    avatar={
                        <Avatar
                            className="photoUser"
                            src={avatar && avatar}
                            alt="Anonim"
                        />
                    }

                    content={
                        <div className='textComment'>
                            <div className='commentCard'>
                                <p  >{content}</p>
                            </div>
                            <div className='commentFooter d-flex'>
                                <button className='' onClick={onLike}><BiUpvote className={likeAction ? 'likeFill' : 'upvoteButton'} size={25} /> </button>
                                <div className=''>{likes && likes}</div> <button className='' onClick={onDislike}><BiDownvote className={dislikeAction ? 'dislikeFill' : 'downvoteButton'} size={25} /> </button>
                                <span onClick={() => setReplyOpen(!replyOpen)} key="comment-basic-reply-to" className='text-light'><button className='d-flex'><FaRegComment size={20} />Reply to </button></span>
                            </div>
                            <div>
                            </div>
                        </div>
                    }
                />

                {replyOpen &&
                    <form onSubmit={onSubmit} className='d-flex'>
                        <textarea
                            className='postTextArea'
                            style={{ height: '70px' }}
                            onChange={(e) => setCommentValue(e.target.value)}
                            value={CommentValue}
                            placeholder="write some comments"
                        />
                        <br />

                        <button type='submit' className='btn btn-light btn-sm h-50 mt-auto mb-auto ms-2 float-end'>Comment</button>
                    </form>
                }


            </div>




        </>
    )
}

export default SingleComment