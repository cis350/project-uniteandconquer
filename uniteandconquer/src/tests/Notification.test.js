/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import Notifications from '../components/Notifications';
import UserProfile from '../components/UserProfile';

// https://stackoverflow.com/questions/66284286/react-jest-mock-usenavigate

const mockedUsedLink = jest.fn();
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: () => mockedUsedLink,
  useNavigate: () => mockedUsedNavigate,
}));

test('open and hide notifications', () => {
  render(<UserProfile />);
  fireEvent.click(screen.getByTestId('show-notifications'));
  fireEvent.click(screen.getByTestId('hide-notifications'));
});

// test('Notifications title', () => {
//   render(<Notifications />);
//   const title = screen.getByText('Notifications');
//   expect(title).toBe('Notifications');
// });

test('snapshot notifications', () => {
  const component = renderer.create(<Notifications />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
