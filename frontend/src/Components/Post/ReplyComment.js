import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

const ReplyComment = ({ commentsList, parentCommentId, refreshFunction, postId }) => {
    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)
    useEffect(() => {

        let commentNumber = 0;
        if (commentsList) {
            commentsList.map((comment) => {

                if (comment.responseTo === parentCommentId) {
                    commentNumber++
                }
            })
        }
        setChildCommentNumber(commentNumber)
    }, [commentsList, parentCommentId])


    return (
        <div>

            {ChildCommentNumber > 0 &&
                <p style={{ fontSize: '14px', marginLeft: '50px', color: 'gray', cursor: 'pointer' }}
                    onClick={() => { setOpenReplyComments(!OpenReplyComments) }} >
                    {ChildCommentNumber} more comment(s)
                </p>
            }

            {OpenReplyComments &&
                commentsList.map((comment, index) => {
                    return (
                        <div key={comment._id}>
                            {comment.responseTo === parentCommentId && (
                                <div style={{ width: '95%', marginLeft: '50px', marginBottom: '1px' }}>
                                    <SingleComment
                                        commentId={comment._id}
                                        writerId={comment.userId._id}
                                        currentUserId={localStorage.getItem('userid')}
                                        author={comment.userId.username}
                                        content={comment.content}
                                        avatar={comment.userId.avatarImage}
                                        postId={postId}
                                        refreshFunction={refreshFunction}
                                        createdAt={comment.createdAt}
                                    />
                                    <ReplyComment commentsList={commentsList} postId={postId} parentCommentId={comment._id} refreshFunction={refreshFunction} />
                                </div>)
                            }
                        </div>)
                })
            }

        </div>
    )
}

export default ReplyComment