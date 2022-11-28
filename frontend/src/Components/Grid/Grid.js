import React from 'react'
import { useNavigate } from 'react-router-dom';


export const Grid = ({ posts }) => {
    const navigate = useNavigate();
    return (
        <div>
            {posts && posts.map((post) => {
                return (
                    <div className='postsContainer col-md-10 col-12' key={post._id}>
                        <div className='textContainer'>
                            <div className='postHeaderInfoContainer'><img alt='commAvatar' src={post.communityId.avatar} className='postComAvatar' onClick={() => navigate(`/Community/${post.communityId.Name}`)} /><div style={{ marginTop: '5px' }} className='underline-on-hover' onClick={() => navigate(`/Community/${post.communityId.Name}`)}>{post.communityId.Name}&nbsp;</div><div className='postHeaderInfo'>Posted by&nbsp;<div className='underline-on-hover'>{post.writer.username}</div>&nbsp;5 hours ago</div></div>
                            <div style={{ cursor: 'pointer' }} onClick={() => navigate(`/Community/${post.communityId.Name}/${post._id}`)}>
                                <h5 className='postTitle'>{post.title}</h5>
                                <div className='contentContainer'>
                                    {post.content}
                                </div>
                            </div>
                        </div>

                    </div>
                )
            })}
        </div>
    )
}
