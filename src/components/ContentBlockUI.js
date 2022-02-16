import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

export function ContentBlockUI({children, mt}) {
	return (
		<Container sx={{mt:mt}} maxWidth='xl'>
			<Paper variant="outline" square sx={{bgcolor: 'bgGrayUnderlay', p: 1}}>
				<Paper variant="outline" square sx={{boxShadow: '100', p: 2}}>
					{ children }
				</Paper>
			</Paper>
		</Container>
	)
}