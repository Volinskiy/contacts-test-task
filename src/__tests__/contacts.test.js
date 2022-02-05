import React from "react";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import { Contacts } from "../pages/Contacts";

import { rest } from 'msw'
import { setupServer } from 'msw/node'

const users = [
  {
      "gender": "male",
      "name": {
          "title": "Monsieur",
          "first": "Nicolas",
          "last": "Charles"
      },
      "location": {
          "street": {
              "number": 4243,
              "name": "Rue Paul Bert"
          },
          "city": "Kaiserstuhl",
          "state": "Zürich",
          "country": "Switzerland",
          "postcode": 4849,
          "coordinates": {
              "latitude": "-57.8306",
              "longitude": "-43.6049"
          },
          "timezone": {
              "offset": "+1:00",
              "description": "Brussels, Copenhagen, Madrid, Paris"
          }
      },
      "email": "nicolas.charles@example.com",
      "login": {
          "uuid": "b276f6f7-9f01-4845-9c71-b205658bbebd",
          "username": "heavycat744",
          "password": "review",
          "salt": "J8deGsw2",
          "md5": "ba7b7937b608c4156cc69604d9bae1c8",
          "sha1": "a21443127096754c7eabe2dff24e69a35237cc46",
          "sha256": "0fc53c03c6e324a9f7f6be251c1315e18141d2ce44ed31fff20fc6d7c7f6da58"
      },
      "dob": {
          "date": "1953-08-31T02:18:20.892Z",
          "age": 69
      },
      "registered": {
          "date": "2002-05-29T11:38:36.211Z",
          "age": 20
      },
      "phone": "076 577 86 82",
      "cell": "078 975 67 80",
      "id": {
          "name": "AVS",
          "value": "756.5271.2876.78"
      },
      "picture": {
          "large": "https://randomuser.me/api/portraits/men/33.jpg",
          "medium": "https://randomuser.me/api/portraits/med/men/33.jpg",
          "thumbnail": "https://randomuser.me/api/portraits/thumb/men/33.jpg"
      },
      "nat": "CH"
  },
]

const handlers = [
  rest.get('https://randomuser.me/api/', (req, res, ctx) => {
    // const results = req.url.searchParams.get('results')
    // console.log('req.url.searchParams')
    // console.log(results)
    return res(
      ctx.status(200),
      ctx.json({
        results: users,
    }),
    )
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

test(`contacts get data saccess`, async () => {
  render(<Contacts />)
  
  const loader = screen.getByTestId('contacts-loader')
  
  expect(loader).toBeInTheDocument()
  await waitForElementToBeRemoved(loader)
  
  expect(loader).not.toBeInTheDocument()

  const table = screen.getByLabelText('Table contacts')
  expect(table).toBeInTheDocument()
  // screen.debug()
})