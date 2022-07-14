import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useState, useEffect } from 'react';

function Offer() {
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (offer === null && loading === false) {
      setLoading(true);
      fetch(`${process.env.PUBLIC_URL}/data/oferta.json`)
        .then((r) => r.json())
        .then((r) => setOffer(r))
        .then(() => setLoading(false))
    }
  }, [loading, offer]);

  return (<div>
    {loading && 'Loading...'}
    {offer &&
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
          {offer.map((row) => (
            <TableRow
              key={row.materia}
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
  }
  </div>);
}

export default Offer;
