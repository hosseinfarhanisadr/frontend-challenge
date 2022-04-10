import * as React from 'react';
import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProviderProps, State, TaskContext, taskReducer } from 'store';

type ProviderPropsWithInitialState = ProviderProps & { initialState?: State };

function TaskProvider({
  initialState = { tasks: [] },
  children,
}: ProviderPropsWithInitialState) {
  const [state, dispatch] = React.useReducer(taskReducer, initialState);

  const value = { state, dispatch };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

function render(
  ui: JSX.Element,
  { initialState, ...renderOptions }: { initialState?: State } = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <TaskProvider initialState={initialState}>{children}</TaskProvider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

function renderWithEventSetup(
  jsx: JSX.Element,
  options: { initialState?: State } = {}
) {
  return {
    user: userEvent.setup(),
    ...render(jsx, options),
  };
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render, renderWithEventSetup };
