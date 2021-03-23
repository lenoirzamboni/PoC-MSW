import '@testing-library/jest-dom'
import React from 'react'
import { setupServer } from 'msw/node'
import * as RTL from './setupTests'

import App from '../App'
import { allHandlers } from '../mocks/handlers'

/*
const server = setupServer(
  rest.get('/people', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ results: mockPeople.results }))
  })
)
*/

const server = setupServer(allHandlers.quotes)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('<App />', () => {
  it('should have a list of names', async () => {
    RTL.render(<App />)

    RTL.screen.getByText('Loading...')

    await RTL.screen.findByText(/Luke Skywalker/i)
  })

  it('should have an error message', async () => {
    // override the initial "GET /people" request handler to return a 500 Server Error

    /*
    server.use(
      rest.get('/people', (req, res, ctx) => {
        return res.once(
          ctx.status(500),
          ctx.json({ message: 'Internal server error' })
        )
      })
    )
    */

    server.use(allHandlers.error)

    RTL.render(<App />)

    await RTL.screen.findByText(/error.../i)
  })
})
