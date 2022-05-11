/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import Login from '../components/Login';

// https://stackoverflow.com/questions/66284286/react-jest-mock-usenavigate

const mockedUsedLink = jest.fn();
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: () => mockedUsedLink,
  useNavigate: () => mockedUsedNavigate,
}));

test('login header', () => {
  render(<Login />);
  const headerElement = screen.getByText('Login to your account');
  expect(headerElement).toBeInTheDocument();
});

// first field

test('input email', () => {
  render(<Login />);
  const input = screen.getByTestId('email/phone-input');
  fireEvent.change(input, { target: { value: 'john@gmail.com' } });
  expect(input.value).toBe('john@gmail.com');
});

test('input phone number', () => {
  render(<Login />);
  const input = screen.getByTestId('email/phone-input');
  fireEvent.change(input, { target: { value: '234-234-2345' } });
  expect(input.value).toBe('234-234-2345');
});

// password field

test('input valid password', () => {
  render(<Login />);
  const input = screen.getByTestId('password-input');
  fireEvent.change(input, { target: { value: 'Aa3#bcad' } });
  expect(input.value).toBe('Aa3#bcad');
});

test('log in with email', () => {
  render(<Login />);
  const user = screen.getByTestId('email/phone-input');
  fireEvent.change(user, { target: { value: 'john@gmail.com' } });
  expect(user.value).toBe('john@gmail.com');
  const input = screen.getByTestId('password-input');
  fireEvent.change(input, { target: { value: 'Aa3#bcad' } });
  expect(input.value).toBe('Aa3#bcad');
  expect(() => fireEvent.click(screen.getByText('login')).toThrow('Incorrect password or username not exists'));
});

test('log in with phone', () => {
  render(<Login />);
  const user = screen.getByTestId('email/phone-input');
  fireEvent.change(user, { target: { value: '1231231234' } });
  expect(user.value).toBe('1231231234');
  const input = screen.getByTestId('password-input');
  fireEvent.change(input, { target: { value: 'Aa3#bcad' } });
  expect(input.value).toBe('Aa3#bcad');
  expect(() => fireEvent.click(screen.getByText('login')).toThrow('Incorrect password or username not exists'));
});

// test('log in with email', () => {
//   render(<Login />);
//   try {
//     fireEvent.click(screen.getByText('login'));
//   } catch (e) {
//     expect(e.message).toBe('Invalid username and password. It cannot be empty');
//   }
// });

// test('log in with email', () => {
//   render(<Login />);
//   const user = screen.getByTestId('email/phone-input');
//   fireEvent.change(user, { target: { value: 'john@gmail.com' } });
//   expect(user.value).toBe('john@gmail.com');
//   const input = screen.getByTestId('password-input');
//   fireEvent.change(input, { target: { value: 'Aa3#bcad' } });
//   expect(input.value).toBe('Aa3#bcad');
//   expect(() => fireEvent.click(screen.getByText('login')).
// toThrow('Incorrect password or username not exists'));
// });

test('snapshot registration', () => {
  const component = renderer.create(<Login />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
