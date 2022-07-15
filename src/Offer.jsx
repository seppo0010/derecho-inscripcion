import { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function Offer({ offer, filters, comments }) {
  const [filteredOffer, setFilteredOffer] = useState([]);
  const [open, setOpen] = useState(false);
  const [commentResults, setCommentResults] = useState([]);

  useEffect(() => {
    if (!offer) return;
    let newOffer = offer.slice(0);
    const materiaFilter = filters.map((f) => f.materia).filter((f) => f !== undefined);
    if (materiaFilter.length) {
      newOffer = newOffer.filter((o) => materiaFilter.includes(o.materia))
    }
    const modalidadFilter = filters.map((f) => f.modalidad).filter((f) => f !== undefined);
    if (modalidadFilter.length) {
      newOffer = newOffer.filter((o) => modalidadFilter.includes(o.modalidad))
    }
    const docenteFilter = filters.map((f) => f.docente).filter((f) => f !== undefined);
    if (docenteFilter.length) {
      newOffer = newOffer.filter((o) => o.docente.split('-').map((d) => d.replace(/\s+.\.$/, '')).some((v) => docenteFilter.includes(v)))
    }
    const horarioFilter = filters.map((f) => f.modalidad).filter((f) => f !== undefined);
    if (horarioFilter.length) {
      newOffer = newOffer.filter((o) => horarioFilter.includes(o.horario))
    }
    setFilteredOffer(newOffer)
  }, [offer, filters, setFilteredOffer]);

  const handleClick = (docente) => {
    setOpen(true);
    const res = comments.search(docente.replace(/\s+.\.$/, ''), { combineWith: 'AND' });
    setCommentResults(res);
  }
  const handleClose = () => {
    setOpen(false);
    setCommentResults([]);
  };
  
  return (<div>
  <Dialog
    onClose={handleClose}
    open={open}
  >
    <DialogTitle onClose={handleClose}>
      Comentarios sobre la cátedra&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
    </DialogTitle>
    <DialogContent dividers>
      {commentResults.length > 0 ? (
        <ul>
          {commentResults.map((c) => (<li key={c.id}>
            {c.text}
          </li>))}
        </ul>
      ) : 'Sin resultados'}
      </DialogContent>
  </Dialog>
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Materia</TableCell>
          <TableCell>Comisión</TableCell>
          <TableCell>Modalidad</TableCell>
          <TableCell>Docente</TableCell>
          <TableCell>Horario</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredOffer.map((row) => (
          <TableRow
            key={row.comision}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.materia}
            </TableCell>
            <TableCell>{row.comision}</TableCell>
            <TableCell>{row.modalidad}</TableCell>
            <TableCell>{comments ? row.docente.split('-').map((docente, i) => (
              <Chip key={`${docente},${i}`} label={docente} onClick={() => handleClick(docente)} />
            )) : row.docente}</TableCell>
            <TableCell>{row.horario}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </div>);
}

export default Offer;
