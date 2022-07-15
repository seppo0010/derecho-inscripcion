import { useState, useEffect } from 'react';

import './App.css';
import Offer from './Offer';
import Filters from './Filters';

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function App() {
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [availableFilters, setAvailableFilters] = useState(null);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    if (offer !== null || loading === true) return
    setLoading(true);
    fetch(`${process.env.PUBLIC_URL}/data/oferta.json`)
      .then((r) => r.json())
      .then((r) => setOffer(r))
      .then(() => setLoading(false));
  }, [loading, offer]);

  useEffect(() => {
    if (offer === null || availableFilters !== null) return;
    const materias = offer.map((o) => o.materia).filter(onlyUnique);
    const modalidades = offer.map((o) => o.modalidad).filter(onlyUnique);
    const docentes = offer.flatMap((o) => o.docente.split('-').map((d) => d.replace(/\s+.\.$/, ''))).filter(onlyUnique);
    setAvailableFilters([].concat(
      materias.map((m) => ({
        title: `materia: ${m}`,
        materia: m,
      }))
    ).concat(
      modalidades.map((m) => ({
        title: `modalidad: ${m}`,
        modalidad: m,
      }))
    ).concat(
      docentes.map((d) => ({
        title: `docente: ${d}`,
        docente: d,
      }))
    ));
  }, [offer, availableFilters, setAvailableFilters]);

  return (
    <div className="App">
      {loading && 'Loading...'}
      {offer && <Filters availableFilters={availableFilters} filters={filters} setFilters={setFilters} />}
      {offer && <Offer offer={offer} filters={filters} />}
    </div>
  );
}

export default App;
