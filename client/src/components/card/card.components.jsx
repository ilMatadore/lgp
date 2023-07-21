import React  from 'react';
import './card.styles.css';
import vegetables from '../../assets/vegetables.png'
import { FaCartPlus } from 'react-icons/fa';


const Card = ({canasta, addItem}) => {
    
    const {name, price, products} = canasta

    return (
        <div className="card-container" data-aos="flip-right">
            <p className="card-title">{name.toUpperCase()}</p>            
            <img src={vegetables} alt="vegetables" width="150" height="150" />            
            <div className="card-price">${price}</div>
            <div><ul>{products.map((product) => (<li key={product.id}>{product.name.toUpperCase()} <span>- {product.unity}</span></li>))}</ul></div>
            <button className="card-button"><FaCartPlus className="card-cart-icon" onClick={()=>{addItem(canasta)}}/></button>
        </div>
    )
}

export default Card;
