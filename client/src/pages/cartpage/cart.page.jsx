import React from 'react';
import './cart.page.styles.css'
import Cart from '../../components/cart/cart.component';

const CartPage = () => {
    return (
        <div className="cart-page-container">
            <div className="cart-page-content-container">
                <Cart/>
            </div>
        </div>
    )
}

export default CartPage; 