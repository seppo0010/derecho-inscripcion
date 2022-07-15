import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';

function Offer({ offer, filters }) {
  const [filteredOffer, setFilteredOffer] = useState([]);
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
    setFilteredOffer(newOffer)
  }, [offer, filters, setFilteredOffer]);
  return (<div>
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
            <TableCell>{row.docente}</TableCell>
            <TableCell>{row.horario}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </div>);
}

export default Offer;
