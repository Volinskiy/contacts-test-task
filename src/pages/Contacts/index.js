
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { ContentBlockUI } from '../../components/ContentBlockUI'
import { ContactsTable } from '../../components/ContactsTable'

import { useGetContacts } from '../../hooks/useGetContacts'


export function Contacts() {
  const contacts = useGetContacts()

  function getContent({isLoading, isError, data}) {
    if (isLoading) {
      return <h1>isLoading</h1>
    }
  
    if (isError) {
      return <h1>isError</h1>
    }
    
    return <ContactsTable contacts = {data}></ContactsTable>
  }

  return (
    <>
      <Container sx={{ mt: 3 }}>
        <Grid container sx={{justifyContent: 'space-between',}}>
          <Grid item sx={{alignSelf: 'center'}}>
            <Typography variant='h4' component='h1' sx={{fontWeight: 'bold'}}>
              Contacts
            </Typography>
          </Grid>
          <Grid item sx={{alignSelf: 'center'}}>
            <Button variant="outlined">a</Button>
            <Button variant="outlined">a</Button>
            <Button variant="outlined">a</Button>
          </Grid>
        </Grid>
      </Container>
      <ContentBlockUI MT='20px'>

      </ContentBlockUI>
      <ContentBlockUI MT='20px' >
        { getContent(contacts) }
      </ContentBlockUI>
    </>
  )
}