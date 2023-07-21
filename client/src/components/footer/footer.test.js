import React from 'react';
import { shallow } from 'enzyme';
import Footer from './footer.components';

it('Expect to render Card component', () => {
    expect(shallow(<Footer />)).toMatchSnapshot();
})