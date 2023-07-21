import React, { useContext, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './cart.styles.css'

import CartItem from '../cart-item/cart-item.component';

import { CartContext } from '../../context/cartContext/cart.context';


const Cart = () => {

    const { cartItems, addItem, removeItem, cartTotal } = useContext(CartContext)
    const [ disabled, setDisabled ] = useState(false);

    useEffect(() => {
        cartItems.length === 0 ? setDisabled(true) : setDisabled(false)

    },[cartItems])
    
    return (
        <div className="cart-container">
            <h2>Mi Carro</h2>
            <div className="table-container">
                <h3>Productos</h3>
                <h3>Cantidad</h3>
                <h3>Precio x un.</h3>
            </div>
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} addItem={addItem} removeItem={removeItem}/>
                    ))}
            <div className="total-container">
                <h3>Total </h3>
                <h3>$ {cartTotal}</h3>
            </div>
            <div className="cart-button-container">
                <Link to="/"><button className="cart-back-button">Volver</button></Link>
                <Link to="/checkout"><button className="cart-button" disabled={disabled}>Continuar</button></Link>
            </div>
                        
                
                
        </div>
    )
}

export default Cart;