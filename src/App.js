import './App.css'
import './App.css'
import { Contacts } from './pages/Contacts'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    bgGrayUnderlay: grey[100],
  },
})
theme.shadows[100] = '3px 5px 7px 0px rgba(158, 168, 160, 0.1), -3px 5px 7px 0px rgba(158, 168, 160, 0.1);'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Contacts />
    </ThemeProvider>
  )
}
