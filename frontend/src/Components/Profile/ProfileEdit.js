import React, { useEffect, useState } from 'react'
import './ProfileEdit.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { toastOptions } from '../../Utils/Toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsInstagram, BsFacebook, BsReddit } from "react-icons/bs";
import { useDebounce } from '../../Hooks/UseDebounce';
import { useNavigate, useParams } from 'react-router-dom';

const ProfileEdit = () => {
    const [avatarImage, setAvatarImage] = useState('');
    const [url, setUrl] = useState('');
    const { username } = useParams();
    const [description, setDescription] = useState('');
    const [searchTerm, setSearchTerm] = useState({ facebook: '', instagram: '', reddit: '' });
    const [socialMedia, setSocialMedia] = useState({ facebook: '', instagram: '', reddit: '' })
    const debouncedFacebook = useDebounce(searchTerm.facebook, 1000);
    const debouncedInstagram = useDebounce(searchTerm.instagram, 1000);
    const debouncedReddit = useDebounce(searchTerm.reddit, 1000);
    const debouncedDescription = useDebounce(description, 1000);
    const navigate = useNavigate();
    const avatarHandler = async (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append("file", avatarImage)
        data.append("upload_preset", "reddit-like-community-avatar")
        data.append("cloud_name", "dle0bi4zo")
        const image = await axios.post(`https://api.cloudinary.com/v1_1/dle0bi4zo/image/upload`, data)
        if (image.statusText === 'OK') {
            setUrl(image.data.url)
            const response = await axios.put(`http://localhost:5000/api/auth/updateUserAvatar/`, { avatar: image.data.url, userId: localStorage.getItem('userid') })
            if (response.status) {
                toast.success('Succesfully updated the avatar', toastOptions)
            }
            else {
                toast.error('Error', toastOptions)
            }
        }

    }
    useEffect(() => {
        const descriptionHandler = async () => {
            if (debouncedDescription) {
                const response = await axios.post(`http://localhost:5000/api/auth/setUserDescription/`, { userId: localStorage.getItem('userid'), description })
                if (response.status) {
                    toast.success('Description succesfully updated', toastOptions)
                }
                else {
                    toast.error("Error while updating the description", toastOptions)
                }
            }
        }
        descriptionHandler();
    }, [debouncedDescription])

    useEffect(() => {
        const updateSocialMedia = async () => {
            if (debouncedFacebook) {
                const response = await axios.put(`http://localhost:5000/api/auth/updateSocialMedia/`, { userId: localStorage.getItem('userid'), facebook: searchTerm.facebook })
                if (response.status) {
                    toast.success('Facebook link updated', toastOptions)
                }
                else {
                    toast.error("Error", toastOptions)
                }
            }
            if (debouncedInstagram) {
                const response = await axios.put(`http://localhost:5000/api/auth/updateSocialMedia/`, { userId: localStorage.getItem('userid'), instagram: searchTerm.instagram })
                if (response.status) {
                    toast.success('Instagram link updated', toastOptions)
                }
                else {
                    toast.error("Error", toastOptions)
                }
            }
            if (debouncedReddit) {
                const response = await axios.put(`http://localhost:5000/api/auth/updateSocialMedia/`, { userId: localStorage.getItem('userid'), reddit: searchTerm.reddit })
                if (response.status) {
                    toast.success('Reddit link updated', toastOptions)
                }
                else {
                    toast.error("Error", toastOptions)
                }
            }
        }
        updateSocialMedia();
    },
        [debouncedFacebook, debouncedInstagram, debouncedReddit]
    );

    useEffect(() => {
        if (username !== localStorage.getItem('username')) {
            navigate('/PageNotFound')
        }
        const getUser = async () => {
            const response = await axios.get(`http://localhost:5000/api/auth/getUser/${username}`)
            if (response.status) {
                setUrl(response.data.user.avatarImage)
                setSocialMedia({ facebook: response.data.user.socialMedia.facebook, instagram: response.data.user.socialMedia.instagram, reddit: response.data.user.socialMedia.reddit })
            }
        }
        getUser();
    }, [username])
    return (
        <>
            <div className='mx-auto col-md-6 col-12 text-light mt-4 '>
                <div className='h4 textColor1'>User settings</div>
                <div className='mt-5 small text-secondary'>User information <hr /></div>

                <div className='mt-5  col-12'>
                    <label htmlFor="description" className="form-label textColor1">Description (optional)</label>
                    <div id="description" class="form-text">Number of characters : {description.length}/200</div>
                    <div className='d-flex vw-50'>
                        <textarea placeholder='Description (optional)' name='description' maxLength={200} className="form-control bg-dark text-light"
                            id="description" onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </div>
                <div className='mt-4 col-md-12 col-12'>
                    <form onSubmit={avatarHandler}>
                        <label htmlFor="avatar" className="form-label text-light">Community Avatar</label>
                        <div className='d-flex'>
                            <img className='communityAvatar' src={url && url} alt='editCommunityAvatar' />
                            <input className='form-control bg-dark text-light mt-auto mb-auto' id="avatar" type='file' onChange={(e) => setAvatarImage(e.target.files[0])} />
                            <button type='submit' className='btn btn-light rounded-pill mt-auto mb-auto' >Submit</button>
                        </div>
                    </form>
                </div>
                <div className='mt-4 col-md-12 col-12'>
                    <label htmlFor="facebook" className="form-label text-light">Add facebook username</label>
                    <button type="button" data-bs-toggle="collapse" data-bs-target="#facebookCollapse" aria-expanded="false" aria-controls="facebookCollapse">
                        <div className='showHint'>&nbsp;Show hint</div>
                    </button>
                    <div className="collapse" id="facebookCollapse">
                        <img src='https://res.cloudinary.com/dle0bi4zo/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1669618534/facebookhelp_slxjtx.jpg' alt='facebookHelp' />
                    </div>
                    <div className='d-flex mb-4 col-md-6 col-12'>
                        <BsFacebook className='mt-auto mb-auto' size={30} />
                        <input placeholder={socialMedia && socialMedia.facebook} className='form-control bg-dark text-light mt-auto mb-auto' id="facebook" type='text' onChange={(e) => setSearchTerm({ facebook: e.target.value })} />
                    </div>
                    <label htmlFor="instagram" className="form-label text-light">Add instagram username</label>
                    <button type="button" data-bs-toggle="collapse" data-bs-target="#instagramCollapse" aria-expanded="false" aria-controls="instragramCollapse">
                        <div className='showHint'>&nbsp;Show hint</div>
                    </button>
                    <div className="collapse" id="instagramCollapse">
                        <img src='https://res.cloudinary.com/dle0bi4zo/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1669618940/instagramHelp_jsohqr.jpg' alt='instagramHelp' />
                    </div>
                    <div className='d-flex mb-4 col-md-6 col-12'>
                        <BsInstagram className='mt-auto mb-auto' size={30} />
                        <input placeholder={socialMedia && socialMedia.instagram} className='form-control bg-dark text-light mt-auto mb-auto ' id="instagram" type='text' onChange={(e) => setSearchTerm({ instagram: e.target.value })} />

                    </div>
                    <label htmlFor="reddit" className="form-label text-light">Add reddit username</label>
                    <button type="button" data-bs-toggle="collapse" data-bs-target="#redditCollapse" aria-expanded="false" aria-controls="redditCollapse">
                        <div className='showHint'>&nbsp;Show hint</div>
                    </button>
                    <div className="collapse" id="redditCollapse">
                        <img src='https://res.cloudinary.com/dle0bi4zo/image/upload/v1669620091/reddithelper_dqhelj.png' alt='redditHelp' />
                    </div>
                    <div className='d-flex col-md-6 col-12 mb-4'>
                        <BsReddit className='mt-auto mb-auto' size={30} />
                        <input placeholder={socialMedia && socialMedia.reddit} className='form-control bg-dark text-light mt-auto mb-auto ' id="reddit" type='text' onChange={(e) => setSearchTerm({ reddit: e.target.value })} />

                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileEdit