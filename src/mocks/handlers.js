import { rest } from 'msw'
import { dataPeople } from './mockedData/dataPeople'

const quotesHandler = rest.get('*/people', (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(dataPeople))
})

const patchHandler = rest.get('*/people', async (req, res, ctx) => {
  // req.url.searchParams.get('id') target/perform actions based on query parameters

  const originalResponse = await ctx.fetch(req)
  const data = await originalResponse.json()

  data.results.unshift({
    uid: '11',
    name: 'A long time ago, in a galaxy far, far away...',
    url: 'https://www.swapi.tech/api/people/11',
  })

  return res(ctx.json(data))
})

const errorHandler = rest.get('*/people', (req, res, ctx) => {
  return res(ctx.status(404), ctx.json({ message: 'Page not found' }))
})

export const allHandlers = {
  quotes: quotesHandler,
  patch: patchHandler,
  error: errorHandler,
}

// choose between quotes, patch or error
export const handlers = []
