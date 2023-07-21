import React, { useContext, useState } from 'react';
import './header.styles.css'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo3.png';
import { FaHome, FaEnvelope, FaShoppingCart,FaSignInAlt, FaSignOutAlt, FaUserAlt, FaBars, FaAddressCard } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { UserContext } from '../../context/userContext/user.context';
import { CartContext } from '../../context/cartContext/cart.context';

const Header = () => {

    const [toHide, setToHide] = useState(true);

    const userCtx = useContext(UserContext);
    const cartCtx = useContext(CartContext);

    const hide = () => {
        setToHide(!toHide)
    }

    const closeSession = () => {
        hide();
        userCtx.userLogout();
        cartCtx.clearCart();
    }
    
     return (
        <div className="HeaderContainer">
            <div className="LogoContainer">
              <img className="logo" src={logo} alt="logo"/>
              <span className="title">Los Girasoles</span>
            </div>
            { toHide ? null : 
            <div className="side-menu-container">     
                    <span className="closebtn" onClick={hide}><CgClose/></span>
                        <Link to="/" className="OptionLink" onClick={hide}>Inicio</Link>
                        <Link to="/quienes" className="OptionLink" onClick={hide}>Quienes carajo</Link>
                        <Link to="/contact" className="OptionLink" onClick={hide}>Contacto</Link>
                        <Link to="/cart" className="OptionLink" onClick={hide}>Mi Carro</Link>
                    { userCtx.id ? 
                        <React.Fragment>
                            <Link to='/profile' className="OptionLink" onClick={hide}>Mi Perfil</Link>
                            <Link to='/' className="OptionLink" onClick={closeSession}>Cerrar Sesion</Link>
                        </React.Fragment>
                        :
                         <Link to="/signin" className="OptionLink" onClick={hide}>Iniciar Sesion</Link>
                        }  
            </div> 
            }
            <div className="OptionsContainer">
                { userCtx.id ? <p className="header-user-name">Hola {userCtx.first_name}</p> : null }
                <div id="Menu" to="/" className="OptionLink" onClick={hide}><FaBars style={{ fontSize: '30px'}} /></div>
                    <Link id="Home" to="/" className="OptionLink"><FaHome style={{ fontSize: '30px'}} /></Link>
                    <Link id="Quienes" to="/quienes" className="OptionLink"><FaAddressCard style={{ fontSize: '30px'}} /></Link>
                    <Link id="Contact" to="/contact" className="OptionLink"><FaEnvelope style={{ fontSize: '30px'}} /></Link>
                    <Link id="Cart" to="/cart" className="OptionLink"><FaShoppingCart style={{ fontSize: '30px'}} />{cartCtx.cartItemsCount > 0 ? <span className="item-count">{cartCtx.cartItemsCount}</span> : null}</Link>
                { userCtx.id ? 
                    <React.Fragment>  
                        <Link id="Profile" to='/profile' className="OptionLink"><FaUserAlt style={{ fontSize: '30px' }} /></Link>
                        <Link id="SignOut" to='/' onClick={() => {userCtx.userLogout(); cartCtx.clearCart()}} className="OptionLink"><FaSignOutAlt style={{ fontSize: '30px' }} /></Link>
                    </React.Fragment>
                    :
                     <Link id="SignIn" to="/signin" className="OptionLink"><FaSignInAlt style={{ fontSize: '30px'}} /></Link>
                    }
            </div>        
        </div>
        )
    }

export default Header;