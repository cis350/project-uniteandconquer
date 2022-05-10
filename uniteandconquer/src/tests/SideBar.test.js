/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import {
  render, screen,
} from '@testing-library/react';
import Sidebar from '../components/Sidebar';

// https://stackoverflow.com/questions/66284286/react-jest-mock-usenavigate

const mockedUsedLink = jest.fn();
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: () => mockedUsedLink,
  useNavigate: () => mockedUsedNavigate,
}));

test('sidebar header (profile) content', () => {
  render(<Sidebar />);
  const headerElement = screen.getByTestId('profile-header');
  expect(headerElement).toBeInTheDocument();
});

test('sidebar header (Chat) content', () => {
  render(<Sidebar />);
  const headerElement = screen.getByTestId('chat-header');
  expect(headerElement).toBeInTheDocument();
});

test('sidebar header (Logout) content', () => {
  render(<Sidebar />);
  const headerElement = screen.getByTestId('logout-header');
  expect(headerElement).toBeInTheDocument();
});

test('sidebar header (Ads) content', () => {
  render(<Sidebar />);
  const headerElement = screen.getByTestId('ads-header');
  expect(headerElement).toBeInTheDocument();
});

test('snapshot sidebar', () => {
  const component = renderer.create(<Sidebar />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
