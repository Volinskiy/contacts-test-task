import { rest } from 'msw'
import { users, error } from './__fixtures__'

export const handlers = [
  rest.get('https://randomuser.me/api/', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        results: users,
    }),
    )
  }),
]

export const handlerError = 
  rest.get('https://randomuser.me/api/', (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json(error),
    )
  })