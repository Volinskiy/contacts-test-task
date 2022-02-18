import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { useState, useMemo } from 'react'
import { ContentBlockUI } from '../../components/ContentBlockUI'
import { ContactsTable } from '../../components/ContactsTable'
import { BottonsToggleViewMode } from '../../components/ButtonsToggleViewMode'
import { useGetContacts } from '../../hooks/useGetContacts'
import { useViewMode } from '../../hooks/useViewMode'
import { NATIONALITIES } from '../../constants/nationality'
import { VIEW_MODE } from '../../constants/viewMode'
import { FiltersBar } from '../../components/FiltersBar'
import { NATIONALITIES_HUMAN_NAME } from '../../constants/nationality'
import { GENDER } from '../../constants/gender'


function getDataSort(data, fullName, gender, nationality){
	const sortedeData = data.filter((elem) => {
		const hasFullNameMatches = elem.name.first.toLowerCase().startsWith(fullName.toLowerCase()) ||
														elem.name.last.toLowerCase().startsWith(fullName.toLowerCase())
		const hasGenderMatches = elem.gender.toLowerCase().startsWith(gender.toLowerCase())
														|| gender === GENDER.DEFAULT
		const hasNationalityMatches = NATIONALITIES_HUMAN_NAME[elem.nat].toLowerCase().startsWith(nationality.toLowerCase())
																	|| elem.nat === NATIONALITIES.DEFAULT
		return  hasFullNameMatches && hasGenderMatches && hasNationalityMatches
	})
	 return sortedeData
}

export function Contacts() {
	const [viewMode, setViewMode] = useViewMode()
	// TODO придумать говрящие имена переменным
	const [fullName, setFullName] = useState('')
	const [gender, setGender] = useState('')
	const [nationality, setNationality] = useState('')

  const handleFullNameChange = (event) => {
    setFullName(event.target.value)
  };
	
	const handleGenderChange = (event) => {
    setGender(event.target.value)
  };

	const handleNationalityChange = (event) => {
    setNationality(event.target.value)
  };

	const { isLoading, isError, data } = useGetContacts(NATIONALITIES)
	const sortedData = getDataSort(data, fullName, gender, nationality)

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
				<FiltersBar 
					// если имя пропа совпадает с именем значения, можно не повторяться?
					onFullNameChange={handleFullNameChange}
					onGenderChange={handleGenderChange}
					onNationalityChange={handleNationalityChange}
					fullName={fullName}
					gender={gender}
					nationality={nationality}
				/>
			</ContentBlockUI>
			<ContentBlockUI mt='20px' >
				{
					isLoading ? (
						<Box sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									minHeight: '300px'}}>
							<CircularProgress data-testid="contacts-loader"/>
						</Box>
					) :
					isError ? (
						<h1 data-testid="error-data-loading">isError</h1>
					) :
					(viewMode === VIEW_MODE.TABLE) ? (
						<ContactsTable contacts = {sortedData}></ContactsTable>
					) :
					(viewMode === VIEW_MODE.GRID) ? (
						<h1 data-testid="table-grid-data-view-mode">'VIEW_MODE.GRID'</h1>
					) :
					'There in no VIEW_MODE'
				}
			</ContentBlockUI>
		</>
	)
}