import { render, RenderOptions } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { GlobalContext } from '../context';

let initialState = Object.create({});

export function MockProviders({ children }: { children: React.ReactNode }) {
  return (
    <MemoryRouter>
      <GlobalContext.Provider value={initialState}>{children}</GlobalContext.Provider>
    </MemoryRouter>
  );
}

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: MockProviders, ...options });

export { customRender as render };
