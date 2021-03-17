import { rest } from 'msw'
import { mockPeople } from '../mockedData/mockPeople'

const quotesHandler = rest.get('*/people', (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(mockPeople))
})

const patchHandler = rest.get('*/people', async (req, res, ctx) => {
  const originalResponse = await ctx.fetch(req)
  const data = await originalResponse.json()

  data.results.push({
    uid: '11',
    name: 'Han Solo - Smuggler. Scoundrel. Hero.',
    url: 'https://www.swapi.tech/api/people/11',
  })

  return res(ctx.json(data))
})

const errorHandler = rest.get('*/people', (req, res, ctx) => {
  return res(ctx.status(500), ctx.json({ message: 'Internal server error' }))
})

export const allHandlers = {
  quotes: quotesHandler,
  patch: patchHandler,
  error: errorHandler,
}

export const handlers = [allHandlers.error]
