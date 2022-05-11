// /**
//  * @jest-environment jsdom
//  */

// import React from 'react';
// import '@testing-library/jest-dom';
// import renderer from 'react-test-renderer';
// import {
//   render, screen, fireEvent,
// } from '@testing-library/react';
// import Home from '../components/Home';

// // https://stackoverflow.com/questions/66284286/react-jest-mock-usenavigate

// const mockedUsedLink = jest.fn();
// const mockedUsedNavigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   Link: () => mockedUsedLink,
//   useNavigate: () => mockedUsedNavigate,
// }));

// test('Home title and content layout', () => {
//   render(<Home />);
//   const titleElement = screen.getByText('Unite and Conquer');
//   expect(titleElement).toBeInTheDocument();
// });

// test('Search feature and content layout', () => {
//   render(<Home />);
//   const titleElement = screen.getByText('Search');
//   expect(titleElement).toBeInTheDocument();
// });
// // data-testid="price-input"

// test('Search feature with keyword', () => {
//   render(<Home />);
//   const input = screen.getByTestId('search-input');
//   fireEvent.change(input, { target: { value: 'pencils' } });
//   expect(input.value).toBe('pencils');
//   fireEvent.click(screen.getByText('Search'));
// });

// test('snapshot home', () => {
//   const component = renderer.create(<Home />);
//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });
