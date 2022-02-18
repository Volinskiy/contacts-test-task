import { useState } from 'react'

import Grid from '@mui/material/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import { GENDER_HUMAN_NAME } from '../constants/gender'

export function FiltersBar({
	fullName,
	onFullNameChange,
	gender,
	onGenderChange,
	nationality,
	onNationalityChange
}) {

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
					variant="outlined"
					size="small"
          placeholder="Search by full name"
          fullWidth
          margin="normal"
					value={fullName}
					onChange={onFullNameChange}
				/>
			</Grid>
			<Grid item xs={3}>
				<FormControl  fullWidth>
					<Select
						value={gender}
						onChange={onGenderChange}
						displayEmpty
						inputProps={{ 'aria-label': 'Without label' }}
					>
						<MenuItem value="">
							<em>Gender</em>
						</MenuItem>
						<MenuItem value={GENDER_HUMAN_NAME.M}>{GENDER_HUMAN_NAME.M}</MenuItem>
						<MenuItem value={GENDER_HUMAN_NAME.F}>{GENDER_HUMAN_NAME.F}</MenuItem>
						<MenuItem value={GENDER_HUMAN_NAME.A}>{GENDER_HUMAN_NAME.A}</MenuItem>
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
					onChange={onNationalityChange}
				/>
			</Grid>
		</Grid>
		</>
	)
}