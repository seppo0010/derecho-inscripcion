import { useState, useEffect } from 'react';
import MiniSearch from 'minisearch'

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
  const [comments, setComments] = useState(null);

  useEffect(() => {
    if (offer !== null || loading === true) return
    setLoading(true);
    fetch(`${process.env.PUBLIC_URL}/data/oferta.json`)
      .then((r) => r.json())
      .then((r) => setOffer(r))
      .then(() => setLoading(false));
    fetch(`${process.env.PUBLIC_URL}/data/comments.json`)
      .then((r) => r.json())
      .then((r) => {
        const miniSearch = new MiniSearch({
          fields: ['text'],
          storeFields: ['text', 'shortcode'],
        });
        r.forEach(({ shortcode, comments }) => {
          comments.forEach((text) => {
            miniSearch.add({ text, shortcode, id: `${shortcode}${text}` });
          });
        });
        setComments(miniSearch);
      })
  }, [loading, offer]);

  useEffect(() => {
    if (offer === null || availableFilters !== null) return;
    const materias = offer.map((o) => o.materia).filter(onlyUnique);
    const modalidades = offer.map((o) => o.modalidad).filter(onlyUnique);
    const docentes = offer.flatMap((o) => o.docente.split('-').map((d) => d.replace(/\s+.\.$/, ''))).filter(onlyUnique).sort();
    const horario = offer.map((o) => o.horario).filter(onlyUnique).sort();
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
    ).concat(
      horario.map((d) => ({
        title: `horario: ${d}`,
        docente: d,
      }))
    ));
  }, [offer, availableFilters, setAvailableFilters]);

  return (
    <div className="App">
      {loading && 'Loading...'}
      {offer && <Filters availableFilters={availableFilters} filters={filters} setFilters={setFilters} />}
      {offer && <Offer offer={offer} filters={filters} comments={comments} />}
    </div>
  );
}

export default App;
