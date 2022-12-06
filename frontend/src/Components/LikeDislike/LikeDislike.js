import React, { useContext, useEffect, useState } from 'react'
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import axios from 'axios';
import './LikeDislike.css'
import AuthContext from '../../store/auth-context';
const LikeDislike = ({ post }) => {
    const [likes, setLikes] = useState(0);
    const [LikeAction, setLikeAction] = useState(null);
    const [DislikeAction, setDislikeAction] = useState(null);
    const authCtx = useContext(AuthContext);
    const postId = post._id;

    const onDislike = async (e) => {
        e.preventDefault();
        if (authCtx.isLoggedIn) {
            if (DislikeAction === null) {
                const response = await axios.post(`http://localhost:5000/api/likedislike/upDislike/`, { postId, userId: localStorage.getItem('userid') })
                if (response.status) {
                    if (LikeAction !== null) {
                        setLikes((prev) => prev - 2)
                        setLikeAction(null)
                        setDislikeAction('disliked')
                    } else {
                        setLikes((prev) => prev - 1)
                        setDislikeAction('disliked')
                    }
                }
            } else {
                const response = await axios.post(`http://localhost:5000/api/likedislike/unDislike/`, { postId, userId: localStorage.getItem('userid') })
                if (response.status) {
                    setLikes((prev) => prev + 1)
                    setDislikeAction(null)
                }
            }
        }
    }
    const onLike = async (e) => {
        e.preventDefault();
        if (authCtx.isLoggedIn) {
            if (LikeAction === null) {
                const response = await axios.post(`http://localhost:5000/api/likedislike/upLike/`, { postId, userId: localStorage.getItem('userid') })
                if (response.status) {
                    if (DislikeAction !== null) {
                        setLikes((prev) => prev + 2)
                        setDislikeAction(null);
                        setLikeAction('liked');
                    } else {
                        setLikes((prev) => prev + 1)
                        setLikeAction('liked')
                    }
                }
            } else {
                const response = await axios.post(`http://localhost:5000/api/likedislike/unLike/`, { postId, userId: localStorage.getItem('userid') })
                if (response.status) {
                    setLikes((prev) => prev - 1)
                    setLikeAction(null);
                }
            }
        }
    }
    useEffect(() => {
        const getLikes = async () => {
            const response = await axios.post(`http://localhost:5000/api/likedislike/getLikes/`, { postId })
            if (response.status) {
                setLikes(response.data.likeDislikeDiff)
                response.data.likes.map((e) => {
                    if (e.userId === localStorage.getItem('userid')) {
                        setLikeAction('liked')
                    }
                })
                response.data.dislikes.map((e) => {
                    if (e.userId === localStorage.getItem('userid')) {
                        setDislikeAction('disliked')
                    }
                })
            }
        }
        getLikes();
    }, [])
    return (
        <div> <div className='likeBarContainer mt-2 '>
            <BiUpvote onClick={onLike} className={LikeAction ? 'likeFill' : 'upvoteButton'} style={{ cursor: 'pointer' }} size={20} />
            <div className='ms-1'>
                {likes && likes}
            </div>
            <BiDownvote onClick={onDislike} className={DislikeAction ? 'dislikeFill' : 'downvoteButton'} style={{ cursor: 'pointer' }} size={20} />
        </div></div>
    )
}

export default LikeDislike