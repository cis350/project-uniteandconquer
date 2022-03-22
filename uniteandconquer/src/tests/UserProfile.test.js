/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import UserProfile from '../components/UserProfile';

// https://stackoverflow.com/questions/66284286/react-jest-mock-usenavigate

const mockedUsedLink = jest.fn();
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: () => mockedUsedLink,
  useNavigate: () => mockedUsedNavigate,
}));

test('profile title header', () => {
  render(<UserProfile />);
  const linkElement = screen.getByText('My Profile');
  expect(linkElement).toBeInTheDocument();
});

test('push to show notifications', () => {
  render(<UserProfile />);
  fireEvent.click(screen.getByTestId('bell-button'));
  const linkElement = screen.getByText('Notifications');
  expect(linkElement).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('notif-button'));
});

test('snapshot user-profile', () => {
  const component = renderer.create(<UserProfile />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
