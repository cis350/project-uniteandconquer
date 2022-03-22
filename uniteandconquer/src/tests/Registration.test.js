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

// https://stackoverflow.com/questions/66284286/react-jest-mock-usenavigate

const mockedUsedLink = jest.fn();
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: () => mockedUsedLink,
  useNavigate: () => mockedUsedNavigate,
}));

test('registration header', () => {
  render(<Registration />);
  const headerElement = screen.getByText('Get Started');
  expect(headerElement).toBeInTheDocument();
});

test('registration requirements', () => {
  render(<Registration />);
  const pwElement = screen.getByText('Password Requires');
  expect(pwElement).toBeInTheDocument();
  const nameElement = screen.getByText('First/Last Name Requires');
  expect(nameElement).toBeInTheDocument();
});

// first name

test('input valid first name', () => {
  render(<Registration />);
  const input = screen.getByTestId('first-name-input');
  fireEvent.change(input, { target: { value: 'John' } });
  expect(input.value).toBe('John');
});

test('input invalid first name', () => {
  render(<Registration />);
  const input = screen.getByTestId('first-name-input');
  fireEvent.change(input, { target: { value: '#@' } });
  expect(input.value).toBe('#@');
});

// last name

test('input valid last name', () => {
  render(<Registration />);
  const input = screen.getByTestId('last-name-input');
  fireEvent.change(input, { target: { value: 'Doe' } });
  expect(input.value).toBe('Doe');
});

test('input invalid last name', () => {
  render(<Registration />);
  const input = screen.getByTestId('last-name-input');
  fireEvent.change(input, { target: { value: '#@' } });
  expect(input.value).toBe('#@');
});

// email

test('input valid email', () => {
  render(<Registration />);
  const input = screen.getByTestId('email-input');
  fireEvent.change(input, { target: { value: 'john@gmail.com' } });
  expect(input.value).toBe('john@gmail.com');
});

test('input invalid email', () => {
  render(<Registration />);
  const input = screen.getByTestId('email-input');
  fireEvent.change(input, { target: { value: 'johndoe' } });
  expect(input.value).toBe('johndoe');
});

// phone

test('input valid phone', () => {
  render(<Registration />);
  const input = screen.getByTestId('phone-input');
  fireEvent.change(input, { target: { value: '234-234-2345' } });
  expect(input.value).toBe('234-234-2345');
});

test('input invalid phone', () => {
  render(<Registration />);
  const input = screen.getByTestId('phone-input');
  fireEvent.change(input, { target: { value: '23432' } });
  expect(input.value).toBe('23432');
});

// password

test('input valid password', () => {
  render(<Registration />);
  const input = screen.getByTestId('password-input');
  fireEvent.change(input, { target: { value: 'aAb123#abc' } });
  expect(input.value).toBe('aAb123#abc');
});

test('input invalid password', () => {
  render(<Registration />);
  const input = screen.getByTestId('password-input');
  fireEvent.change(input, { target: { value: '234' } });
  expect(input.value).toBe('234');
});

// confirm password

test('input valid confirm password', () => {
  render(<Registration />);
  const password = screen.getByTestId('password-input');
  fireEvent.change(password, { target: { value: 'aAb123#abc' } });
  expect(password.value).toBe('aAb123#abc');
  const confirm = screen.getByTestId('confirm-password-input');
  fireEvent.change(confirm, { target: { value: 'aAb123#abc' } });
  expect(confirm.value).toBe('aAb123#abc');
});

// finish registration (complete)

test('complete registration', () => {
  render(<Registration />);
  const firstName = screen.getByTestId('first-name-input');
  fireEvent.change(firstName, { target: { value: 'John' } });
  expect(firstName.value).toBe('John');
  const lastName = screen.getByTestId('last-name-input');
  fireEvent.change(lastName, { target: { value: 'Doe' } });
  expect(lastName.value).toBe('Doe');
  const email = screen.getByTestId('email-input');
  fireEvent.change(email, { target: { value: 'john@gmail.com' } });
  expect(email.value).toBe('john@gmail.com');
  const phone = screen.getByTestId('phone-input');
  fireEvent.change(phone, { target: { value: '234-234-2345' } });
  expect(phone.value).toBe('234-234-2345');
  const password = screen.getByTestId('password-input');
  fireEvent.change(password, { target: { value: 'aAb123#abc' } });
  expect(password.value).toBe('aAb123#abc');
  const confirm = screen.getByTestId('confirm-password-input');
  fireEvent.change(confirm, { target: { value: 'aAb123#abc' } });
  expect(confirm.value).toBe('aAb123#abc');
  fireEvent.click(screen.getByText('Register'));
  // const linkElement = screen.getByText('Notifications');
  // expect(linkElement).toBeInTheDocument();
});

test('snapshot registration', () => {
  const component = renderer.create(<Registration />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
