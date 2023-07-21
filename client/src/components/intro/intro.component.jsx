import React, {useEffect} from 'react';
import AOS from 'aos';
import './intro.styles.css'

const Intro = () => {
  useEffect(() => {
    AOS.refresh();
    AOS.init({
      duration: 1500,
    });
  },[])

    return (
        <div className="intro-container">
            <p className="intro-text" data-aos="zoom-out">Productos Orgánicos de Nuestra Tierra a tu Hogar</p>
            <a href="#canastas" className="intro-button">HACE TU PEDIDO</a>
        </div>
    )
}

export default Intro;