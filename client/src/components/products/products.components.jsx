import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from '../card/card.components';
import Aditional from '../aditional/aditional.component';
import './products.styles.css';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import AOS from "aos";
import { API_URL } from '../../constants/constants';

import { CartContext } from '../../context/cartContext/cart.context';

const Products = () => {
  useEffect(() => {
    getCanastas()
    getAdicionales()
    AOS.refresh();
    AOS.init({
      duration: 1000,
    });
  },[])

  const [adicionales, setAdicionales] = useState([]);
  const [canastas, setCanastas] = useState([])
  const [error, setError ] = useState(null)

  const getAdicionales = () => {
    fetch(`${API_URL}/products/`, {//https://localhost:3001/product/adicionales
      method: 'GET',
      headers: { "Content-Type": "application/json" },
  })
  .then((response) => response.json())
  .then((res) =>  res.length ? setAdicionales(res) : setError(res.error))
  .catch((err) => setError(err))
  }

  const getCanastas = () => {
    fetch(`${API_URL}/baskets/`, {//https://localhost:3001/product/canastas
      method: 'GET',
      headers: { "Content-Type": "application/json" },
  })
  .then((response) => response.json())
  .then((res) =>  res.length ? setCanastas(res) : setError(res.error))
  .catch((err) => setError(err))
  }

  const cartCtx = useContext(CartContext)

    return (
        <div id="canastas" className="products-page-container">
            <div className="products-text-top">
                <h1>Nuestras Canastas</h1>
                <p className="products-subtitle">Selecciona primero una o mas de nuestras canastas de productos organicos que mas gustes...</p>
            </div>
            <div className="products-container">
                {!error ? canastas.map((canasta) => {return (<Card key={canasta.id}  canasta={canasta} addItem={cartCtx.addItem}/>)})
                : <div style={{color: 'red', textAlign: 'center', fontSize: '30px'}}>{error}</div>}
            </div>
            <div className="products-text-bottom">
                <p className="products-subtitle">Tambien puedes agregar los siguientes productos a tu pedido..</p>
            </div>
            <div className="products-aditionals">
                {!error ? adicionales.map((adicional) => (<Aditional key={adicional.id} adicional={adicional} addItem={cartCtx.addItem}/>))
                : <div style={{color: 'red', textAlign: 'center', fontSize: '30px'}}>{error}</div>}
            </div>
            <div className="to-cart-button-container">
              <Link to="/cart" className="to-cart-button">Ir al carro</Link>
            </div>
            <div className="products-follow-us">
                <p>Seguinos en 
                  <a href="https://instagram.com/los_girasoles_uy?igshid=9oy5x7cq2tkp" 
                      target="_blank" rel="noopener noreferrer"
                      style={{'a:visited': {textDecoration: "none"}, color: 'white', paddingLeft:'10px'}}><FaInstagram/></a></p>
                <p>Por consultas 
                  <a href="https://wa.me/59899871743?text=ConsultaWeb%20Los%20Girasoles" 
                     target="_blank" rel="noopener noreferrer"
                    style={{'a:visited': {textDecoration: "none"}, color: 'white', paddingLeft:'10px'}}><FaWhatsapp /></a></p>
            </div>
            <div className="products-image-bottom-container">
                
            </div>
        </div>
    )
}

export default Products