import React from 'react';
import './signin-page.styles.css'
import SignIn from '../../components/signin/signin.component';

const SignInPage = () => {
    return (
        <div className="sign-in-page-container">
            <div className="signin-page-form-container">
                <SignIn/>
            </div>
        </div>
    )
}

export default SignInPage;