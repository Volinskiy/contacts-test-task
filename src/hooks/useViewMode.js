import { useEffect, useState } from 'react'

import { STORAGE_VIEW_MODE_NAME, VIEW_MODE } from '../constants/viewMode'

function getInitialViewMode() {
	return localStorage.getItem(STORAGE_VIEW_MODE_NAME) || VIEW_MODE.TABLE
}

export function useViewMode() {
	const [viewMode, setViewMode] = useState(getInitialViewMode())

	useEffect(() => {
		localStorage.setItem(STORAGE_VIEW_MODE_NAME, viewMode)
	}, [viewMode])

	return [viewMode, setViewMode]
}