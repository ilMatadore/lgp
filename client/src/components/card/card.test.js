import React from 'react';
import { shallow } from 'enzyme';
import Card from './card.components';

let wrapper;

beforeEach(() => {
    const mockProps = {
        canasta: {
            name: 'Test Canasta',
            price: 200,
            description: [
                { id: 1, name: 'Perejil', cantidad: '1at'},
                { id: 2, name: 'Mizuna', cantidad: '1'}
        ]
        },
        addItem: jest.fn()         
    }
    wrapper =  shallow(<Card {...mockProps}/>)
})

it('Expect to render Card component', () => {
    expect(wrapper).toMatchSnapshot();   
})

it('Test Button', () => {
    wrapper.find(".card-cart-icon").simulate('click')
    expect(wrapper.length).toEqual(1)
})

