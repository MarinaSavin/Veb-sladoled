import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomeScreen from './screens/HomeScreen';

jest.mock(
  'react-router-dom',
  () => ({
    Link: ({ children, to, ...props }) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
  }),
  { virtual: true },
);

const testStore = {
  getState: () => ({
    cart: { cartItems: [] },
    auth: { userInfo: null },
  }),
  subscribe: () => () => {},
  dispatch: () => {},
};

test('renders Ice Shop catalog', () => {
  render(
    <Provider store={testStore}>
      <HomeScreen />
    </Provider>,
  );

  expect(screen.getByRole('heading', { name: /^Ice Shop$/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Vanila Bourbon/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Mango Sorbet/i })).toBeInTheDocument();
});

test('filters products by search', async () => {
  render(
    <Provider store={testStore}>
      <HomeScreen />
    </Provider>,
  );

  await userEvent.type(screen.getByLabelText(/Pretraga/i), 'mango');

  expect(screen.getByRole('heading', { name: /Mango Sorbet/i })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: /Vanila Bourbon/i })).not.toBeInTheDocument();
});

test('shows out of stock ice cream', () => {
  render(
    <Provider store={testStore}>
      <HomeScreen />
    </Provider>,
  );

  expect(screen.getAllByRole('button', { name: /Dodaj u korpu/i }).length).toBeGreaterThan(0);
  expect(screen.getByText(/Nema na stanju/i)).toBeInTheDocument();
});
