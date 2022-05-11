/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import {
  render, screen,
} from '@testing-library/react';
import SidebarSettings from '../components/SidebarSettings';

// https://stackoverflow.com/questions/66284286/react-jest-mock-usenavigate

const mockedUsedLink = jest.fn();
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: () => mockedUsedLink,
  useNavigate: () => mockedUsedNavigate,
}));

test('sidebar header (main/home page) content', () => {
  render(<SidebarSettings />);
  const headerElement = screen.getByTestId('main-page-header');
  expect(headerElement).toBeInTheDocument();
});

test('sidebar header (Personal Information) content', () => {
  render(<SidebarSettings />);
  const headerElement = screen.getByTestId('personal-information-header');
  expect(headerElement).toBeInTheDocument();
});

test('sidebar header (Password) content', () => {
  render(<SidebarSettings />);
  const headerElement = screen.getByTestId('password-header');
  expect(headerElement).toBeInTheDocument();
});

test('snapshot sidebar for settings', () => {
  const component = renderer.create(<SidebarSettings />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
