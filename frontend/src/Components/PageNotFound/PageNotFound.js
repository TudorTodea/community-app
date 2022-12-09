import React from 'react'
import { Link } from 'react-router-dom'
import './PageNotFound.css'
const PageNotFound = () => {
    return (
        <div className='pageNotFoundContainer col-md-6 col-12 mx-auto'>
            <img src="/404.png" alt="image" className='mx-auto image404' />
            <div className='text-light mx-auto text-center'>
                <p className='textNotFound'>PAGE NOT FOUND</p>
                <Link to={`/`}>Back to homepage</Link>
            </div>

        </div>
    )
}

export default PageNotFound