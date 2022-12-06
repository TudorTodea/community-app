import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import dateContext from '../../store/date-context';
import LikeDislike from '../LikeDislike/LikeDislike';

export const Grid = ({ posts }) => {
    const navigate = useNavigate();
    const dateCtx = useContext(dateContext);
    return (
        <div>
            {posts && posts.map((post) => {
                return (
                    <div className='postsContainer col-md-10 col-12' key={post._id}>
                        <LikeDislike post={post} />
                        <div className='textContainer'>
                            <div className='postHeaderInfoContainer'><img alt='commAvatar' src={post && post.communityId && post.communityId.avatar} className='postComAvatar' onClick={() => navigate(`/Community/${post && post.communityId && post.communityId.Name}`)} /><div style={{ marginTop: '5px' }} className='underline-on-hover' onClick={() => navigate(`/Community/${post && post.communityId && post.communityId.Name}`)}>{post && post.communityId && post.communityId.Name}&nbsp;</div><div className='postHeaderInfo'>Posted by&nbsp;<div className='underline-on-hover' onClick={() => navigate(`/profile/${post.writer.username}`)}>{post.writer.username}</div>&nbsp;&nbsp;&nbsp;{dateCtx.dateUtc(post.createdAt)}</div></div>
                            <div style={{ cursor: 'pointer' }} onClick={() => navigate(`/Community/${post.communityId.Name}/${post._id}`)}>
                                <h5 className='postTitle h5'>{post.title}</h5>
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
