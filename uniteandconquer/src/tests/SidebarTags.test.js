/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import {
  render, screen,
} from '@testing-library/react';
import SidebarTags from '../components/SidebarTags';

// https://stackoverflow.com/questions/66284286/react-jest-mock-usenavigate

const mockedUsedLink = jest.fn();
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: () => mockedUsedLink,
  useNavigate: () => mockedUsedNavigate,
}));

test('sidebar header (main/home page) content', () => {
  render(<SidebarTags />);
  const headerElement = screen.getByTestId('home-header');
  expect(headerElement).toBeInTheDocument();
});

test('sidebar header (settings) content', () => {
  render(<SidebarTags />);
  const headerElement = screen.getByTestId('settings-header');
  expect(headerElement).toBeInTheDocument();
});

test('sidebar header (preferences) content', () => {
  render(<SidebarTags />);
  const headerElement = screen.getByTestId('preferences-header');
  expect(headerElement).toBeInTheDocument();
});

test('snapshot sidebar for tags', () => {
  const component = renderer.create(<SidebarTags />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
