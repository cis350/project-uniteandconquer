/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import UserSettingsPersonalInformation from '../components/UserSettingsPersonalInformation';

// https://stackoverflow.com/questions/66284286/react-jest-mock-usenavigate

const mockedUsedLink = jest.fn();
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: () => mockedUsedLink,
  useNavigate: () => mockedUsedNavigate,
}));

test('user settings for personal information content (header)', () => {
  render(<UserSettingsPersonalInformation />);
  const headerElement = screen.getByText('Personal Information');
  expect(headerElement).toBeInTheDocument();
});

test('update username', () => {
  render(<UserSettingsPersonalInformation />);
  const username = screen.getByTestId('username-input');
  fireEvent.change(username, { target: { value: 'johnnyboy0123' } });
  expect(username.value).toBe('johnnyboy0123');
  fireEvent.click(screen.getByTestId('username-update'));
});

test('update name', () => {
  render(<UserSettingsPersonalInformation />);
  const name = screen.getByTestId('name-input');
  fireEvent.change(name, { target: { value: 'johnny' } });
  expect(name.value).toBe('johnny');
  fireEvent.click(screen.getByTestId('name-update'));
});

test('update email', () => {
  render(<UserSettingsPersonalInformation />);
  const email = screen.getByTestId('email-input');
  fireEvent.change(email, { target: { value: 'johnnyboy0123@gmail.com' } });
  expect(email.value).toBe('johnnyboy0123@gmail.com');
  fireEvent.click(screen.getByTestId('email-update'));
});

// test('update ', () => {
//   render(<UserSettingsPersonalInformation />);
//   const oldPassword = screen.getByTestId('old-pw-input');
//   fireEvent.change(oldPassword, { target: { value: 'asdf!234BD3' } });
//   expect(oldPassword.value).toBe('asdf!234BD3');
//   const newPassword = screen.getByTestId('new-pw-input');
//   fireEvent.change(newPassword, { target: { value: '34321CKJF!kda' } });
//   expect(newPassword.value).toBe('34321CKJF!kda');
//   const confirmNewPassword = screen.getByTestId('confirm-new-pw-input');
//   fireEvent.change(confirmNewPassword, { target: { value: '34321CKJF!kda' } });
//   expect(confirmNewPassword.value).toBe('34321CKJF!kda');
//   fireEvent.click(screen.getByText('Change Password'));
// });

test('snapshot user settings for personal information', () => {
  const component = renderer.create(<UserSettingsPersonalInformation />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
