import React from 'react';
import { shallow } from 'enzyme';
import Aditional from './aditional.component';

let wrapper;

beforeEach(() => {
    const mockProps = {
        adicional: {
            name: 'Mizuna',
            price: 20,
            id: 1,
        },
        addItem: jest.fn()         
    }
    wrapper =  shallow(<Aditional {...mockProps}/>)
})

it('Expect to render Aditional component', () => {
    expect(wrapper).toMatchSnapshot();   
})

it('Test Button', () => {
    wrapper.find(".adicional-cart-icon").simulate('click')
    expect(wrapper.length).toEqual(1)
})