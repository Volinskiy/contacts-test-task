import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

import { useState,useCallback } from 'react';

import { useCopyToClipboard } from 'react-use'

export function CopyToClipBoard({ text, sx }) {
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

  const onMousLive = useCallback(() => {
    setStateCopy(false)
  }, [statetCopy, setStateCopy])

  return (
    <Tooltip title={getTooltipTitle()}>
      <Button sx={{display: 'flex', alignItems: 'center', color: `${sx.color}`, textTransform: 'initial'}}
        onClick={() => onClickCopy()}
        onMouseLeave={() => onMousLive()}
      >
        <FileCopyOutlinedIcon  fontSize="small"/>
        <Typography sx={{ml: `${sx.ml}`}}>{text}</Typography>
      </Button>
    </Tooltip>
  )
}