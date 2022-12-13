import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './CommunityEdit.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { toastOptions } from '../../Utils/Toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TiArrowBackOutline } from "react-icons/ti";
import { useDebounce } from '../../Hooks/UseDebounce';
import { communityAddDescriptionRoute, communityAddImageRoute, getCommunityInfoRoute } from '../../Utils/Routes';

const CommunityEdit = () => {
    const { communityName } = useParams();
    const navigate = useNavigate();
    const [avatarImage, setAvatarImage] = useState('');
    const [bannerImage, setBannerImage] = useState('');
    const [description, setDescription] = useState('');
    const debouncedDescription = useDebounce(description, 1000);
    const [url, setUrl] = useState({ avatar: '', banner: '' });

    const avatarHandler = async (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append("file", avatarImage)
        data.append("upload_preset", "reddit-like-community-avatar")
        data.append("cloud_name", "dle0bi4zo")
        const image = await axios.post(`https://api.cloudinary.com/v1_1/dle0bi4zo/image/upload`, data)
        if (image.statusText === 'OK') {
            setUrl({ ...url, avatar: image.data.url })
            const response = await axios.post(communityAddImageRoute, { avatar: image.data.url, communityName })
            if (response.status) {
                toast.success('Succesfully updated the avatar', toastOptions)
            }
            else {
                toast.error('Error', toastOptions)
            }
        }

    }
    const bannerHandler = async (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append("file", bannerImage)
        data.append("upload_preset", "reddit-like-community-avatar")
        data.append("cloud_name", "dle0bi4zo")
        const image = await axios.post(`https://api.cloudinary.com/v1_1/dle0bi4zo/image/upload`, data)
        if (image.statusText === 'OK') {
            setUrl({ ...url, banner: image.data.url })
            const response = await axios.post(communityAddImageRoute, { banner: image.data.url, communityName })
            console.log(response);
            if (response.status) {
                toast.success('Succesfully updated the banner', toastOptions)
            }
            else {
                toast.error('Error', toastOptions)
            }
        }

    }
    useEffect(() => {
        const descriptionHandler = async () => {
            if (debouncedDescription) {
                const response = await axios.post(communityAddDescriptionRoute, { communityName, description })
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
        const getCommunityInfo = async () => {
            const response = await axios.get(`${getCommunityInfoRoute}${communityName}`)
            if (response.data.status) {
                if (response.data.community.mods.includes(localStorage.getItem('userid'))) {
                    setUrl({ avatar: response.data.community.avatar, banner: response.data.community.banner })
                } else {
                    navigate(`/`)
                }


            }
        }
        getCommunityInfo();
    }, [])
    return (
        <>
            <div className=' col-md-6 col-12'>
                <button onClick={() => navigate(`/community/${communityName}`)}> <TiArrowBackOutline size={30} color='white' /></button>
            </div>
            <div className='d-flex'>
                <div className='mx-auto col-md-6 col-12 text-light mt-4 '>
                    <div className='h4 textColor1'>Community settings</div>
                    <div className='mt-5 small text-secondary'>Community information <hr /></div>

                    <div className='mt-5  col-12'>

                        <label htmlFor="description" className="form-label textColor1">Description (optional)</label>
                        <div id="description" class="form-text">Number of characters : {description && description.length ? description.length : '0'}/500</div>
                        <div className='d-flex vw-50'>
                            <textarea placeholder='Description (optional)' name='description' maxLength={500} className="form-control bg-dark text-light  " id="description"
                                onChange={(e) => setDescription(e.target.value)} />
                        </div>
                    </div>
                    <div className='mt-4 col-md-12 col-12'>
                        <form onSubmit={avatarHandler}>
                            <label htmlFor="avatar" className="form-label text-light">Community Avatar</label>
                            <div className='d-flex'>
                                <img className='communityAvatar' src={url.avatar && url.avatar} />
                                <input className='form-control bg-dark text-light mt-auto mb-auto ' alt='editCommunityAvatar' id="avatar" type='file' onChange={(e) => setAvatarImage(e.target.files[0])} />
                                <button type='submit' className='btn btn-light rounded-pill mt-auto mb-auto' >Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className='mt-4 col-md-12 col-12'>
                        <form onSubmit={bannerHandler}>
                            <label htmlFor="banner" className="form-label text-light">Community Banner</label>
                            <div className='d-flex'>
                                <img className='communityBanner col-md-6 col-6' src={url.banner && url.banner} alt='editCommunityBanner' />
                                <input className='form-control bg-dark text-light mt-auto mb-auto ' id="banner" type='file' onChange={(e) => setBannerImage(e.target.files[0])} />
                                <button type='submit' className='btn btn-light rounded-pill mt-auto mb-auto' >Submit</button>
                            </div>
                            <div id="banner" class="form-text">The height of the banner should be 300 pixels.</div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommunityEdit