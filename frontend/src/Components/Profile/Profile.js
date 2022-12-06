import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FiSettings } from "react-icons/fi";
import { useNavigate, useParams } from 'react-router-dom';
import './Profile.css'
import { BsInstagram, BsFacebook, BsReddit } from "react-icons/bs";

const Profile = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    const [user, setUser] = useState();
    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get(`http://localhost:5000/api/auth/getUser/${username}`)
            if (response.data.status) {
                setUser(response.data.user)
            } else {
                navigate('/PageNotFound')
            }
        }
        getUser();
    }, [username])
    return (
        <>
            <div className='col-md-6 col-12 mx-auto text-center text-light'>
                <div className='profileCard col-md-6 col-12 mx-auto mt-5'>
                    <div className='communityIMG' style={{
                        background:
                            `linear-gradient(to bottom, rgba(0,0,0,0)
            39%,rgba(0,0,0,0)
            41%,rgba(0,0,0,0.65)
            100%),
            `,
                        height: '120px',
                        backgroundSize: '100%, cover',
                        backgroundPosition: 'center, center',
                        width: '100%',
                        position: 'relative',
                        backgroundColor: '#2d97e5',
                        borderTopLeftRadius: '5px',
                        borderTopRightRadius: '5px'
                    }}
                    >
                        <img className='profileAvatar mx-auto mb-auto mt-2 ' src={user && user.avatarImage} alt='avatarImage' />
                        <div className='text-light mt-2  mb-3'>{username}</div>
                    </div>
                    <div className='mt-3 mb-3'>
                        <div className='ms-4 me-4'>{user && user.description ? user.description : `This User doesn't have a description yet`}</div>
                    </div>
                    <div className='mt-3 mb-3 '>
                        <div className='mx-auto mb-2'>My Socials</div>
                        {user && user.socialMedia.instagram && <button onClick={() => navigate(`//www.instagram.com/` + user.socialMedia.instagram)}><BsInstagram size={30} color='white' className='ms-2' /></button>}
                        {user && user.socialMedia.facebook && <button onClick={() => navigate(`//www.facebook.com/` + user.socialMedia.facebook)}> <BsFacebook size={30} color='white' className='ms-2' /></button>}
                        {user && user.socialMedia.reddit && <button onClick={() => navigate(`//www.reddit.com/user/` + user.socialMedia.reddit)}> <BsReddit size={30} color='white' className='ms-2' /></button>}
                    </div>

                    <div className='mt-3 mb-3'>
                        {username === localStorage.getItem('username') ? <button onClick={() => { navigate(`/profile/edit/${username}`) }}><FiSettings size={25} color='white' className='mx-auto' /></button> : null}
                    </div>
                </div>
            </div >

        </>
    )
}

export default Profile