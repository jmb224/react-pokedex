import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders welcome title text', () => {
  render(<App />);

  const title = screen.getByRole('heading', { name: /Welcome to Pokemon challenge/i });

  expect(title).toBeInTheDocument();
});
