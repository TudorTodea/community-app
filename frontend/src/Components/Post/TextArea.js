import React, { useState } from 'react'
import { BsEmojiSmileFill } from "react-icons/bs"
import Picker from "emoji-picker-react";
import { toastOptions } from '../../Utils/Toastify';
import { toast } from 'react-toastify';
import axios from 'axios';
const TextArea = ({ addComment, postId }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [comment, setComment] = useState('')
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
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post(`http://localhost:5000/api/comment/addComment/`, addCommentVariables)
        console.log(response);
        if (!response.status) {
            toast.error('Error while adding the comment', toastOptions)
        } else {
            addComment(response.data.comment)
        }
    }
    return (
        <div> <form onSubmit={handleSubmit}>
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
        </form></div>
    )
}

export default TextArea