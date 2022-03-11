import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../client/src/components/agentInterface/Login';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
     rest.get('/login', (req, res, ctx) => {
          return res(ctx.json({ greeting: 'hello there' }));
     })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('login component testing', async () => {
     render(<Login />);

     fireEvent.click(screen.getByText('Load Greeting'));

     await waitFor(() => screen.getByRole('heading'));

     expect(screen.getByRole('heading')).toHaveTextContent('hello there');
     expect(screen.getByRole('button')).toBeDisabled();
});

test('handles server error', async () => {
     server.use(
          rest.get('/greeting', (req, res, ctx) => {
               return res(ctx.status(500));
          })
     );

     render(<Login url="/greeting" />);

     fireEvent.click(screen.getByText('Load Greeting'));

     await waitFor(() => screen.getByRole('alert'));

     expect(screen.getByRole('alert')).toHaveTextContent(
          'Oops, failed to fetch!'
     );
     expect(screen.getByRole('button')).not.toBeDisabled();
});
