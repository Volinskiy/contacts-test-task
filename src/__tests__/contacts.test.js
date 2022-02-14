import React from "react";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import userEvent from '@testing-library/user-event'

import { Contacts } from "../pages/Contacts";
import { server } from '../mock/setupMockServer'
import { handlerError } from '../mock/mockHandlers'
import { STORAGE_VIEW_MODE_NAME, VIEW_MODE } from '../constants/viewMode'

describe('contacts get data saccess', () => {
  test(`loading`, async () => {
    render(<Contacts />)
    const loader = screen.getByTestId('contacts-loader')
    expect(loader).toBeInTheDocument()
    await waitForElementToBeRemoved(loader)
  })
  
  test(`saccess`, async () => {
    render(<Contacts />)
    const loader = screen.getByTestId('contacts-loader')
    await waitForElementToBeRemoved(loader)
    expect(loader).not.toBeInTheDocument()
    const table = screen.getByTestId('table-table-data-view-mode')
    expect(table).toBeInTheDocument()
  })
  
  test(`error`, async () => {
    server.use(handlerError)
    
    render(<Contacts />)
    const loader = screen.getByTestId('contacts-loader')
    expect(loader).toBeInTheDocument()
    await waitForElementToBeRemoved(loader)
    expect(loader).not.toBeInTheDocument()
    const errorDataLoading = screen.getByTestId('error-data-loading')
    expect(errorDataLoading).toBeInTheDocument()
  })
})

describe('contacts data view mode', () => {
  afterEach(() => {window.localStorage.clear()})
  
  test(`Grid view mode after loading`, async () => {
    window.localStorage.setItem(STORAGE_VIEW_MODE_NAME, VIEW_MODE.GRID)
    render(<Contacts />)
    const loader = screen.getByTestId('contacts-loader')
    await waitForElementToBeRemoved(loader)
    const tableGrid = screen.getByTestId('table-grid-data-view-mode')
    expect(tableGrid).toBeInTheDocument()
    const buttonViewModeGrid = screen.getByTestId('button-view-mode-grid')
    const buttonViewModeTable = screen.getByTestId('button-view-mode-table')
    expect(buttonViewModeGrid).toBeInTheDocument()
    expect(buttonViewModeGrid).toHaveClass('Mui-selected')
    expect(buttonViewModeTable).not.toHaveClass('Mui-selected')
    const tableGridMode = screen.getByTestId('table-grid-data-view-mode')
    expect(tableGridMode).toBeInTheDocument()
    const tableTable = screen.queryByTestId('table-table-data-view-mode')
    expect(tableTable).not.toBeInTheDocument()
  })
 
  test(`Table view mode after loading`, async () => {
    render(<Contacts />)
    const loader = screen.getByTestId('contacts-loader')
    await waitForElementToBeRemoved(loader)
    expect(loader).not.toBeInTheDocument()
    const table = screen.getByTestId('table-table-data-view-mode')
    expect(table).toBeInTheDocument()
    const buttonViewModeGrid = screen.getByTestId('button-view-mode-grid')
    const buttonViewModeTable = screen.getByTestId('button-view-mode-table')
    expect(buttonViewModeGrid).toBeInTheDocument()
    expect(buttonViewModeGrid).not.toHaveClass('Mui-selected')
    expect(buttonViewModeTable).toHaveClass('Mui-selected')
    const tableGridMode = screen.queryByTestId('table-grid-data-view-mode')
    expect(tableGridMode).not.toBeInTheDocument()
  })


  test(`Switching to grid view mode`, async () => {
    render(<Contacts />)
    const loader = screen.getByTestId('contacts-loader')
    await waitForElementToBeRemoved(loader)
    const buttonSwitchGridDataViewMode = screen.getByTestId('button-view-mode-grid')
    userEvent.click(buttonSwitchGridDataViewMode)
    expect(buttonSwitchGridDataViewMode).toHaveClass('Mui-selected')
    const tableGridMode = screen.getByTestId('table-grid-data-view-mode')
    expect(tableGridMode).toBeInTheDocument()
    expect(window.localStorage.getItem(STORAGE_VIEW_MODE_NAME)).toEqual(VIEW_MODE.GRID)
  })

  test(`Switching to table view mode`, async () => {
    render(<Contacts />)
    const loader = screen.getByTestId('contacts-loader')
    await waitForElementToBeRemoved(loader)
    const buttonSwitchGridDataViewMode = screen.getByTestId('button-view-mode-grid')
    const buttonSwitchTableDataViewMode = screen.getByTestId('button-view-mode-table')
    userEvent.click(buttonSwitchGridDataViewMode)
    userEvent.click(buttonSwitchTableDataViewMode)
    const tableGridMode = screen.getByTestId('table-table-data-view-mode')
    expect(tableGridMode).toBeInTheDocument()
    expect(window.localStorage.getItem(STORAGE_VIEW_MODE_NAME)).toEqual(VIEW_MODE.TABLE)
    screen.debug()
  })
})
