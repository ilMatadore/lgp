import React from 'react';
import { shallow } from 'enzyme';
import Admin from './admin.component';

it('Expect to render Card component', () => {
    expect(shallow(<Admin />)).toMatchSnapshot();
})