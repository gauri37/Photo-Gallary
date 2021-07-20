import React from 'react';
import './Photo.css';

/*
<div className="photo-info">
                <div>
                <h4>{image.user.name}</h4>
                <p>{likes} likes</p>
                </div>
                <a href={image.user.portfolio_url}>
                    <image src={image.user.profile_image.medium} alt={image.user.name} className="user-img"></image>
                </a>
                
            </div> */
const Photo=({image})=>
{
    return (
        <div className="photos-row">
            <div className="photos-column">
                 <img src={image.urls.regular} alt={image.alt_description}/>
            </div>
        </div>
    );
}

export default Photo;