/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import UserSettingsPassword from '../components/UserSettingsPassword';

// https://stackoverflow.com/questions/66284286/react-jest-mock-usenavigate

const mockedUsedLink = jest.fn();
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: () => mockedUsedLink,
  useNavigate: () => mockedUsedNavigate,
}));

test('user settings for password content (header)', () => {
  render(<UserSettingsPassword />);
  const headerElement = screen.getByText('Password');
  expect(headerElement).toBeInTheDocument();
});

test('change old password', () => {
  render(<UserSettingsPassword />);
  const oldPassword = screen.getByTestId('old-pw-input');
  fireEvent.change(oldPassword, { target: { value: 'asdf!234BD3' } });
  expect(oldPassword.value).toBe('asdf!234BD3');
  const newPassword = screen.getByTestId('new-pw-input');
  fireEvent.change(newPassword, { target: { value: '34321CKJF!kda' } });
  expect(newPassword.value).toBe('34321CKJF!kda');
  const confirmNewPassword = screen.getByTestId('confirm-new-pw-input');
  fireEvent.change(confirmNewPassword, { target: { value: '34321CKJF!kda' } });
  expect(confirmNewPassword.value).toBe('34321CKJF!kda');
  fireEvent.click(screen.getByText('Change Password'));
});

test('snapshot user settings for password', () => {
  const component = renderer.create(<UserSettingsPassword />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
