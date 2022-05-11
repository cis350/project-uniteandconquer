/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import PostDetails from '../components/PostDetails';

// https://stackoverflow.com/questions/66284286/react-jest-mock-usenavigate

const mockedUsedLink = jest.fn();
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: () => mockedUsedLink,
  useNavigate: () => mockedUsedNavigate,
}));

test('post details title header', () => {
  render(<PostDetails />);
  const titleElement = screen.getByText('Item Details');
  expect(titleElement).toBeInTheDocument();
});

// test('go back and not join group', () => {
//   render(<PostDetails />);
//   fireEvent.click(screen.getByText('Back'));
// });

// test('inputting desired quantity before joining', () => {
//   render(<PostDetails />);
//   const input = screen.getByTestId('quantity-input');
//   fireEvent.change(input, { target: { value: '2' } });
//   expect(input.value).toBe('2');
// });

// test('inputting invalid format (string) desired quantity before joining', () => {
//   render(<PostDetails />);
//   const input = screen.getByTestId('quantity-input');
//   fireEvent.change(input, { target: { value: 'five' } });
//   expect(input.value).toBe('five');
// });

// test('join group', () => {
//   render(<PostDetails />);
//   const input = screen.getByTestId('quantity-input');
//   fireEvent.change(input, { target: { value: '2' } });
//   expect(input.value).toBe('2');
//   fireEvent.click(screen.getByText('Join'));
// });

// test('going back to home page', () => {
//   render(<PostDetails />);
//   fireEvent.click(screen.getByText('Back'));
// });

test('snapshot post-details', () => {
  const component = renderer.create(<PostDetails />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
