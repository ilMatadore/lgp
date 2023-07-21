import React from 'react';
import Intro from '../../components/intro/intro.component';
import Products from '../../components/products/products.components';

const Homepage = () => {
    return (
        <React.Fragment>
            <Intro/>
            <Products/>
        </React.Fragment>
    )
}

export default Homepage;