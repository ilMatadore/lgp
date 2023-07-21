import React from 'react';
import { shallow } from 'enzyme';
import Intro from './intro.component';

it('Expect to render Intro component', () => {
    expect(shallow(<Intro />)).toMatchSnapshot();
})