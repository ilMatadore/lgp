// import { render, screen } from '@testing-library/react';
import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/girasoles/i);
//   expect(linkElement).toBeInTheDocument();
// });

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/"
  })
}));

it('Expect to render App component', () => {
  expect(shallow(<App />).length).toMatchSnapshot();
})
