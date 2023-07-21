import React from 'react';
import { Link } from 'react-router-dom';
import './footer.styles.css'

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-links-container">
                <div>
                    <Link className="OptionLink" to="/quienes">Quienes somos</Link>
                </div>
                <div>
                    <Link className="OptionLink" to="/">Productos</Link>
                </div>
                <div>
                    <Link className="OptionLink" to="/contact">Contacto</Link>
                </div>

            </div>
            <div className="footer-copyright">
                <p>Copyright © Granja Los Girasoles {new Date().getFullYear()}</p>
            </div>
        </div>
    )
}

export default Footer;