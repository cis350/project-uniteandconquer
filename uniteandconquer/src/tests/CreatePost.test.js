/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import CreatePost from '../components/CreatePost';

// https://stackoverflow.com/questions/66284286/react-jest-mock-usenavigate

const mockedUsedLink = jest.fn();
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: () => mockedUsedLink,
  useNavigate: () => mockedUsedNavigate,
}));

test('create post header', () => {
  render(<CreatePost />);
  const headerElement = screen.getByText('Create a Post');
  expect(headerElement).toBeInTheDocument();
});

// item name

test('input item name', () => {
  render(<CreatePost />);
  const input = screen.getByTestId('item-name-input');
  fireEvent.change(input, { target: { value: 'Lights' } });
  expect(input.value).toBe('Lights');
});

// quantity

test('input item quantity', () => {
  render(<CreatePost />);
  const input = screen.getByTestId('quantity-input');
  fireEvent.change(input, { target: { value: '32' } });
  expect(input.value).toBe('32');
});

// link

test('input item link', () => {
  render(<CreatePost />);
  const input = screen.getByTestId('link-input');
  fireEvent.change(input, { target: { value: 'exampleurl.com/item' } });
  expect(input.value).toBe('exampleurl.com/item');
});

// description

test('input item description', () => {
  render(<CreatePost />);
  const input = screen.getByTestId('description-input');
  fireEvent.change(input, { target: { value: 'this item is great' } });
  expect(input.value).toBe('this item is great');
});

test('cancel post', () => {
  render(<CreatePost />);
  const name = screen.getByTestId('item-name-input');
  fireEvent.change(name, { target: { value: 'Lights' } });
  expect(name.value).toBe('Lights');
  const price = screen.getByTestId('price-input');
  fireEvent.change(price, { target: { value: '34' } });
  expect(price.value).toBe('34');
  const quantity = screen.getByTestId('quantity-input');
  fireEvent.change(quantity, { target: { value: '32' } });
  expect(quantity.value).toBe('32');
  const link = screen.getByTestId('link-input');
  fireEvent.change(link, { target: { value: 'exampleurl.com/item' } });
  expect(link.value).toBe('exampleurl.com/item');
  const input = screen.getByTestId('description-input');
  fireEvent.change(input, { target: { value: 'this item is great' } });
  expect(input.value).toBe('this item is great');
  fireEvent.click(screen.getByText('Cancel'));
});

// test('create post', () => {
//   render(<CreatePost />);
//   const name = screen.getByTestId('item-name-input');
//   fireEvent.change(name, { target: { value: 'Lights' } });
//   expect(name.value).toBe('Lights');
//   const price = screen.getByTestId('price-input');
//   fireEvent.change(price, { target: { value: '34' } });
//   expect(price.value).toBe('34');
//   const quantity = screen.getByTestId('quantity-input');
//   fireEvent.change(quantity, { target: { value: '32' } });
//   expect(quantity.value).toBe('32');
//   const link = screen.getByTestId('link-input');
//   fireEvent.change(link, { target: { value: 'exampleurl.com/item' } });
//   expect(link.value).toBe('exampleurl.com/item');
//   const input = screen.getByTestId('description-input');
//   fireEvent.change(input, { target: { value: 'this item is great' } });
//   expect(input.value).toBe('this item is great');
//   fireEvent.click(screen.getByText('Post'));
// });

test('create post but incomplete fields', () => {
  render(<CreatePost />);
  expect(() => fireEvent.click(screen.getByText('Post')).toThrow('You need to fill in all the blank'));
});

// snapshot test

test('snapshot create-post', () => {
  const component = renderer.create(<CreatePost />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
