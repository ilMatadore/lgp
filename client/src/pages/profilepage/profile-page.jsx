import React from 'react';
import './profile-page.styles.css'
import Profile from '../../components/profile/profile.component';

const ProfilePage= () => {
    return (
        <div className="profile-page-container">
            <div className="profile-page-form-container">
                <Profile/>
            </div>
        </div>
    )
}

export default ProfilePage;