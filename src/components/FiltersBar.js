import { useState } from 'react'

import Grid from '@mui/material/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from "@mui/material/InputLabel";
import FormControl from '@mui/material/FormControl';

export function FiltersBar() {
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


	return (
		<>
		<Grid
			container
			justifyContent='space-between'
			spacing={4}
			sx={{maxWidth: '80%'}}
		>
			<Grid item xs={6}>
				<TextField
				labelId="d"
					variant="outlined"
					size="small"
          placeholder="Search by full name"
          fullWidth
          margin="normal"
					value={fullName}
					onChange={handleFullNameChange}
				/>
			</Grid>
			<Grid item xs={3}>
				<FormControl  fullWidth>
					<Select
						value={gender}
						onChange={handleGenderChange}
						displayEmpty
						inputProps={{ 'aria-label': 'Without label' }}
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={'M'}>Male</MenuItem>
						<MenuItem value={'F'}>Fimale</MenuItem>
						<MenuItem value={'A'}>Another</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={3}>
				<TextField
					variant="outlined"
					size="small"
          placeholder="Nationality"
          fullWidth
          margin="normal"
					value={nationality}
					onChange={handleNationalityChange}
				/>
			</Grid>
		</Grid>
		</>
	)
}