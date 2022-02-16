import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { ContentBlockUI } from '../../components/ContentBlockUI'
import { ContactsTable } from '../../components/ContactsTable'
import { BottonsToggleViewMode } from '../../components/ButtonsToggleViewMode'
import { useGetContacts } from '../../hooks/useGetContacts'
import { useViewMode } from '../../hooks/useViewMode'
import { NATIONALITIES } from '../../constants/nationality'
import { VIEW_MODE } from '../../constants/viewMode'
import { FiltersBar } from '../../components/FiltersBar'


function getContent(viewMode) {
	const { isLoading, isError, data } = useGetContacts(NATIONALITIES)

	if (isLoading) {
		return (
			<Box sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						minHeight: '300px'}}>
				<CircularProgress data-testid="contacts-loader"/>
			</Box>
		)
	}
	if (isError) {
		return <h1 data-testid="error-data-loading">isError</h1>
	}
	if (viewMode === VIEW_MODE.TABLE) {
		return <ContactsTable contacts = {data}></ContactsTable>
	} 
	if (viewMode === VIEW_MODE.GRID) {
		return <h1 data-testid="table-grid-data-view-mode">'VIEW_MODE.GRID'</h1>
	}
	return 'There in no VIEW_MODE'
}

export function Contacts() {
	const [viewMode, setViewMode] = useViewMode()

	return ( 
		<>
			<Container sx={{ mt: 3 }} maxWidth='xl'>
				<Grid container justifyContent='space-between'>
					<Grid item sx={{alignSelf: 'center'}}>
						<Typography variant='h4' component='h1' sx={{fontWeight: 'bold'}}>
							Contacts
						</Typography>
					</Grid>
					<Grid item sx={{alignSelf: 'center'}}>
						<BottonsToggleViewMode setViewMode={setViewMode} viewMode={viewMode} />
					</Grid>
				</Grid>
			</Container>
			<ContentBlockUI mt='20px'>
				<FiltersBar />
			</ContentBlockUI>
			<ContentBlockUI mt='20px' >
				{ getContent(viewMode) }
			</ContentBlockUI>
		</>
	)
}