import React from 'react';
import './contact.page.styles.css'
import Contact from '../../components/contact/contact.component';

const ContactPage = () => {
    return (
        <div className="contact-page-container">
            <div className="contact-page-content-container">
                <Contact/>
            </div>
        </div>
    )
}

export default ContactPage; 