import { useCallback } from 'react';
import PropTypes from 'prop-types'; 

import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { VIEW_MODE } from '../constants/viewMode'

export function BottonsToggleViewMode({ setViewMode, viewMode }) {

	const toggleViewModeHandler = useCallback((_, newValue) => {
		if (newValue !== null) {
			setViewMode(newValue)
		}
	}, [setViewMode])
	
	return (
		<ToggleButtonGroup
			orientation="horizontal"
			value={viewMode}
			exclusive
			onChange={toggleViewModeHandler}
		>
			<ToggleButton value={VIEW_MODE.TABLE} aria-label={VIEW_MODE.TABLE}>
				<ViewListIcon />
			</ToggleButton>
			<ToggleButton value={VIEW_MODE.GRID} aria-label={VIEW_MODE.GRID}>
				<ViewModuleIcon />
			</ToggleButton>
		</ToggleButtonGroup>)
}

BottonsToggleViewMode.propTypes = {
	viewMode: PropTypes.oneOf([VIEW_MODE.TABLE, VIEW_MODE.GRID]).isRequired,
	setViewMode: PropTypes.func.isRequired
}