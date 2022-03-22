/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import {
  render, screen,
} from '@testing-library/react';
import App from '../components/App';

test('renders text', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
