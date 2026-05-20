import { useEffect, useState } from 'react';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import MenuCard from '../components/ui/MenuCard.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import api from '../api/axios.js';

export default function Specialites() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/menu')
      .then(({ data }) => setItems(data.filter((i) => i.badge)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="bg-brand text-white py-16 text-center">
          <p className="section-label text-primary">À la Carte</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold text-white">
            Nos Spécialités
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/70">
            Les plats incontournables qui ont fait la réputation de Chez Ngor.
          </p>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
          {loading ? (
            <Spinner />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((item) => (
                <MenuCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
