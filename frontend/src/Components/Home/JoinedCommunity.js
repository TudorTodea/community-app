import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
const JoinedCommunity = ({ Name }) => {
    const [joined, setJoined] = useState(false);
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const handleCommunityJoin = async (event, communityName) => {
        if (!authCtx.isLoggedIn) {
            navigate(`/login`)
        } else {
            const response = await axios.post(`http://localhost:5000/api/community/joinCommunity/`, { communityName, userId: localStorage.getItem('userid') })
            if (response.status) {
                setJoined(!joined)
            }
        }
    }
    useEffect(() => {
        const getCommunityInfo = async () => {
            const response = await axios.get(`http://localhost:5000/api/community/getCommunityInfo/${Name}`)
            if (response.status) {
                if (response.data.community.members.includes(localStorage.getItem('userid'))) {
                    setJoined(true);
                } else {
                    setJoined(false);
                }
            }
        }
        getCommunityInfo();
    }, [])
    return (
        <div><div className='me-2'><form onSubmit={(event) => handleCommunityJoin(event, Name)}><button className='btn btn-light rounded-pill btn-sm'>{joined ? 'Leave' : 'Join'}</button></form></div></div>
    )
}

export default JoinedCommunity