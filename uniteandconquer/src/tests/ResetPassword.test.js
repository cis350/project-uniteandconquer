/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import Registration from '../components/Registration';
import ResetPassword from '../components/ResetPassword';

// https://stackoverflow.com/questions/66284286/react-jest-mock-usenavigate

const mockedUsedLink = jest.fn();
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: () => mockedUsedLink,
  useNavigate: () => mockedUsedNavigate,
}));

test('reset password header', () => {
  render(<ResetPassword />);
  const headerElement = screen.getByTestId('registration-input');
  expect(headerElement).toBeInTheDocument();
});

test('reset password inputs (phone)', () => {
  render(<ResetPassword />);
  const phone = screen.getByTestId('phone-input');
  fireEvent.change(phone, { target: { value: '1231231234' } });
  expect(phone.value).toBe('1231231234');
});

test('reset password inputs (email)', () => {
  render(<ResetPassword />);
  const email = screen.getByTestId('email-input');
  fireEvent.change(email, { target: { value: 'joe12@gmail.com' } });
  expect(email.value).toBe('joe12@gmail.com');
});

test('reset password inputs (password)', () => {
  render(<ResetPassword />);
  const password = screen.getByTestId('password-input');
  fireEvent.change(password, { target: { value: 'aS34!#fdasdf32' } });
  expect(password.value).toBe('aS34!#fdasdf32');
});

test('reset password inputs (password)', () => {
  render(<ResetPassword />);
  const phone = screen.getByTestId('phone-input');
  fireEvent.change(phone, { target: { value: '1231231234' } });
  expect(phone.value).toBe('1231231234');
  const password = screen.getByTestId('password-input');
  fireEvent.change(password, { target: { value: 'aS34!#fdasdf32' } });
  expect(password.value).toBe('aS34!#fdasdf32');
  fireEvent.click(screen.getByText('Submit'));
});

test('snapshot reset password', () => {
  const component = renderer.create(<ResetPassword />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
