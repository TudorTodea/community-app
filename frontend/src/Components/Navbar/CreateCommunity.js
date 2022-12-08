import React, { useState } from 'react'
import { createCommunityRoute } from '../../Utils/Routes'
import { toastOptions } from '../../Utils/Toastify';
import { toast } from 'react-toastify';
import axios from 'axios';
export const CreateCommunity = ({ refreshFunction }) => {
    const [communityName, setCommunityName] = useState('');
    const userId = localStorage.getItem('userid');
    const containsWhitespace = (str) => {
        return /\s/.test(str);
    }
    const communityCreateHandler = async (e) => {
        e.preventDefault();
        const response = await axios.post(createCommunityRoute, { creatorId: userId, Name: communityName })
        console.log(response);
        if (response.data.status) {
            setCommunityName('');
            refreshFunction(response.data.community)
            toast.success('The community was succesfully created', toastOptions)
        } else {
            toast.error(response.data.msg, toastOptions)
        }
    }
    return (
        <div className="modal-dialog ">
            <form onSubmit={communityCreateHandler}>
                <div className="modal-content bg-dark text-light">
                    <div className="modal-header">
                        <h5 className="modal-title" id="ModalLabel">Create a community</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <div>
                            Name
                        </div>
                        <div style={{ marginBottom: '10px' }} className='modalHeaderInfo'>
                            Spaces are not allowed
                        </div>

                        <div className="form-group  col-12">
                            <input onChange={(e) => setCommunityName(e.target.value)} value={communityName} maxLength={21} type="text" className="input-modal text-light  col-12" required />
                        </div>
                        <div style={{ marginTop: '10px' }} className='modalHeaderInfo'>
                            {21 - communityName.length} characters remaining
                        </div>
                        {!communityName &&
                            <div className='nameRequired'>
                                A community name is required
                            </div>}
                        {communityName && containsWhitespace(communityName) &&
                            <div className='nameRequired'>
                                Community name not valid
                            </div>}
                    </div>
                    {communityName && containsWhitespace(communityName) ?
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-secondary rounded-pill" disabled >Save changes</button>
                        </div> : <div className="modal-footer">
                            <button type="submit" className="btn btn-secondary rounded-pill" >Create community</button>
                        </div>}
                </div>
            </form>
        </div>
    )
}
