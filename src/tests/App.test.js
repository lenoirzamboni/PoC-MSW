import '@testing-library/jest-dom'
import React from 'react'
import { setupServer } from 'msw/node'
import * as RTL from './setupTests'

import App from '../App'
import { allHandlers } from '../mocks/handlers'

import { rest } from 'msw'
import { dataPeople } from '../mocks/mockedData/dataPeople'

// Setup requests interception in NodeJS with the given request handlers
// const server = setupServer(
//   rest.get('*/people', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({ results: dataPeople.results }))
//   })
// )

const server = setupServer(allHandlers.quotes)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('<App />', () => {
  it('should render a list of names', async () => {
    RTL.render(<App />)

    RTL.screen.getByText('Loading...')

    await RTL.screen.findByText(/Luke Skywalker - "We're gonna have company"/i)
  })

  it('should render an error image', async () => {
    // override the initial "GET /people" request handler to return a 404 Page not found error

    // server.use(
    //   rest.get('*/people', (req, res, ctx) => {
    //     // triggers only once
    //     return res.once(
    //       ctx.status(404),
    //       ctx.json({ message: 'Page not found' })
    //     )
    //   })
    // )

    server.use(allHandlers.error)

    RTL.render(<App />)

    await RTL.screen.findByAltText(/error/i)
  })
})
