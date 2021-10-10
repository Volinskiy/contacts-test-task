import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

export function ContentBlockUI({children, MT}) {
  return (
    <Container sx={{mt:MT}}>
      <Paper variant="outline" square sx={{bgcolor: 'bgGrayUnderlay', p: '10px'}}>
        <Paper variant="outline" square sx={{boxShadow: '100',}}>
          { children }
        </Paper>
      </Paper>
    </Container>
  )
}