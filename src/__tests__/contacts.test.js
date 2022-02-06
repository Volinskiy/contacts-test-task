import React from "react";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import { Contacts } from "../pages/Contacts";

test(`contacts get data saccess`, async () => {
  render(<Contacts />)
  
  const loader = screen.getByTestId('contacts-loader')
  
  expect(loader).toBeInTheDocument()
  await waitForElementToBeRemoved(loader)
  
  expect(loader).not.toBeInTheDocument()

  const table = screen.getByLabelText('Table contacts')
  expect(table).toBeInTheDocument()
  screen.debug()
})