import React from 'react';
import { shallow } from 'enzyme';
import Quienes from './quienes.component';

it('Expect to render Card component', () => {
    expect(shallow(<Quienes />)).toMatchSnapshot();
})