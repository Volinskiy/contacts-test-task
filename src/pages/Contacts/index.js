
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { ContentBlockUI } from '../../components/ContentBlockUI'
import { Table } from '../../components/Table'

import { useGetContacts } from '../../hooks/useContacts'


export function Contacts() {
  const contacts = useGetContacts()

  if (contacts.isLoading) {
    return <h1>isLoading</h1>
  }

  if (contacts.isError) {
    return <h1>isError</h1>
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
        <Table></Table>
      </ContentBlockUI>
    </>
  )
}