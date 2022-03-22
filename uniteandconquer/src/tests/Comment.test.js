/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import Comment from '../components/Comment';

// https://stackoverflow.com/questions/66284286/react-jest-mock-usenavigate

const mockedUsedLink = jest.fn();
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: () => mockedUsedLink,
  useNavigate: () => mockedUsedNavigate,
}));

test('add comment', () => {
  render(<Comment />);
  const comment = screen.getByTestId('comment-input');
  fireEvent.change(comment, { target: { value: 'Example comment text' } });
  expect(comment.value).toBe('Example comment text');
  fireEvent.click(screen.getByText('Comment'));
});

test('snapshot comments', () => {
  const component = renderer.create(<Comment />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
