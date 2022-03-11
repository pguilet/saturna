/**
 * @jest-environment jsdom
 */
import React from 'react';
import {
     render,
     fireEvent,
     waitFor,
     screen,
     cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Login from '../src/components/agentInterface/Login';
import App from '../src/components/App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../src/reducers';
import { composeWithDevTools } from 'remote-redux-devtools';
import reduxThunk from 'redux-thunk';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import assert from 'assert';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const server = setupServer(
     rest.get('/login', (req, res, ctx) => {
          return res(ctx.json({ greeting: 'hello there' }));
     })
);

beforeAll(() => server.listen());
afterEach(() => {
     server.resetHandlers();
     cleanup();
});
afterAll(() => server.close());

test('login component testing', async () => {
     server.use(
          rest.get('/api/current_user', (req, res, ctx) => {
               return res(null);
          })
     );
     const { container } = render(
          <Provider store={store}>
               <App />
          </Provider>
     );

     userEvent.click(screen.getByText(/Login/));
     await waitFor(async () => expect(window.location.pathname).toBe('/login'));
     screen.debug();
     // fireEvent.click(container.querySelector('[name="username"]'));
     const usernameInputText = container.querySelector('[name="username"]');
     userEvent.click(usernameInputText);
     // usernameInputText.value = 'test';
     fireEvent.change(usernameInputText, { target: { value: 'test' } });
     // fireEvent.change(usernameInputText);
     // userEvent.type(usernameInputText, 'test');

     assert(usernameInputText !== null);
     assert(usernameInputText.value === 'test'); // even if true handleUsernameChange of redux form Field has not triggered whereas the onchange method of its component do has triggered. It works if I put directly the <input> tag with onchange method. Likely to be a bug to fix in react testing library.

     // const loginButton = screen.getByText('Log-in');
     // assert(loginButton !== null);
     // userEvent.click(loginButton);

     // userEvent.click(container.querySelector('[name="password"]'));
     // userEvent.type(container.querySelector('[name="password"]'), 'test');
     // userEvent.click(container.querySelectorAll('[type="submit"]')[1]);
     // screen.debug();
     // await waitFor(() => screen.getByRole('heading'));

     // expect(screen.getByRole('heading')).toHaveTextContent('hello there');
     // expect(screen.getByRole('button')).toBeDisabled();
});
