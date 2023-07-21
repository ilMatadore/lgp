import React from 'react';
import './register-page.styles.css'
import Register from '../../components/register/register.component';

const RegisterPage= () => {
    return (
        <div className="register-page-container">
            <div className="register-page-form-container">
                <Register/>
            </div>
        </div>
    )
}

export default RegisterPage;