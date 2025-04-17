import { render, screen } from '@testing-library/react';
import App from './App';

test('renders need hotter content link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Need hotter content?/i);
  expect(linkElement).toBeInTheDocument();
});