import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import getTime from 'date-fns/getTime'

import { CopyToClipBoard } from './CopyToClipBoard'

export function ContactsTable({ contacts }) {
function calculateAge(birsday) {
  const miliSecondsInYear = 31536000000
  const lifeDuration = (Date.now()) - Math.abs(getTime(parseISO(birsday)))
  return Math.trunc(lifeDuration / miliSecondsInYear)
}

  return (
    <Table sx={{ minWidth: 650 }} aria-label="Table contacts">
      <TableHead>
        <TableRow>
          <TableCell>Avatar</TableCell>
          <TableCell>Full name</TableCell>
          <TableCell>Birthday</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Location</TableCell>
          <TableCell align="right">Nationality</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {contacts.map((contact) => (
          <TableRow
            key={contact.login.uuid}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
                <Avatar
                  alt={`${contact.name.title} ${contact.name.first} ${contact.name.last}`}
                  src={contact.picture.thumbnail}
                />
            </TableCell>
            <TableCell >
              <Link href="#" underline="none">
                {`${contact.name.title} ${contact.name.first} ${contact.name.last}`}
              </Link>
            </TableCell>
            <TableCell >
              <Typography variant="body2" sx={{fontSize: 'inherit'}}>
                {format(parseISO(contact.dob.date), "EEEE',' MM/dd/yyyy")}
              </Typography>
              <Typography variant="body2" sx={{fontSize: 'inherit', mt: '5px'}}>
                {calculateAge(contact.dob.date)} years
              </Typography>
            </TableCell>
            <TableCell >
              <CopyToClipBoard sx={{ml: '5%', color: 'primary.main'}} text={contact.email}></CopyToClipBoard>
            </TableCell>
            <TableCell >
              <Link href={`tel:${contact.phone}`} underline="none" sx={{whiteSpace: 'nowrap'}}>
                {contact.phone}
              </Link>
            </TableCell>
            <TableCell >
              <Typography variant="subtitle2">
                {`/${contact.location.state}/`}
              </Typography>
              <Typography variant="caption" >
                {`${contact.location.street.number} 
                  ${contact.location.name},  
                  ${contact.location.sity} 
                  ${contact.location.state} 
                  ${contact.location.country} 
                  ${contact.location.postcode}`}
              </Typography>
              
            </TableCell>
            <TableCell align="right">
              <span style={{padding: '4px'}}>
                {contact.nat}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}