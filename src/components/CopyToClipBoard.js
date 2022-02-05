import PropTypes from 'prop-types'; 

import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { useState,useCallback } from 'react';

import { useCopyToClipboard } from 'react-use'

export function CopyToClipBoard({ text, color, whiteSpace, padding, fontSize, fontWeight }) {
	const [{ value, error }, copyToClipboard] = useCopyToClipboard()
	const [statetCopy, setStateCopy] = useState(false)
	
	const getTooltipTitle = useCallback(() => {
		if (statetCopy) {
			return  error ? error.message : `Скопировано ${value}`
		} else {
			return 'Копировать'
		}
	}, [value, error, statetCopy])

	const onClickCopy = useCallback(() => {
		copyToClipboard(text)
		setStateCopy(true)
	}, [copyToClipboard, setStateCopy])

	const handleClickAway = useCallback(() => {
		setStateCopy(false)
	}, [statetCopy, setStateCopy])

	const fontSizeValue = fontSize ? fontSize : 'body2.fontSize'

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<Tooltip title={getTooltipTitle()}>
				<Button sx={{
									display: 'flex', 
									position: 'relative', 
									alignItems: 'center',  
									textTransform: 'initial', 
									whiteSpace: whiteSpace,
									justifyContent: 'flex-start',
									p: padding,}}
					onClick={onClickCopy}
				>
					<FileCopyOutlinedIcon sx={{position: 'absolute', left: '-20px'}} fontSize="small"/>
					<Typography sx={{
												ml: 1, 
												fontSize: fontSizeValue,
												fontWeight: fontWeight,
												color: color,}}
					>
						{text}
					</Typography>
				</Button>
			</Tooltip>
		</ClickAwayListener>
	)
}

CopyToClipBoard.propTypes = {
	text: PropTypes.string.isRequired,
}