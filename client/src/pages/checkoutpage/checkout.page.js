import React from 'react';
import './checkout.page.styles.css'
import Checkout from '../../components/checkout/checkout.component';

const CheckoutPage = () => {
    return (
        <div className="checkout-page-container">
            <div className="checkout-page-content-container">
                <Checkout/>
            </div>
        </div>
    )
}

export default CheckoutPage; 