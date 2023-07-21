import React from 'react';
import './aditional.styles.css';
import { FaCartPlus } from 'react-icons/fa';

const Aditional = ({adicional, addItem}) => {

    const { name, price } = adicional;

    

    return (
        <div className="adicional" data-aos="flip-down">
            <div className="adicional-title">
                <p style={{paddingRight: "10px",}}>{name}</p>
            </div>
            <div style={{display: "flex", float:"right", width: "30%", justifyContent: 'flex-end', alignItems: 'center', }}>
                <span className="adicional-price">${price}</span>
                <button className="adicional-button"><FaCartPlus className="adicional-cart-icon" onClick={()=>{addItem(adicional)}}/></button>
            </div>
            
        </div>
    )
}

export default Aditional;