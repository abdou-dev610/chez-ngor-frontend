import { useEffect, useState } from 'react';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import MenuCard from '../components/ui/MenuCard.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import api from '../api/axios.js';
import { menuItems as fallbackItems } from '../data/menuData.js';

export default function Specialites() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/menu')
      .then(({ data }) => {
        const source = data && data.length > 0 ? data : fallbackItems;
        setItems(source.filter((i) => i.badge));
      })
      .catch(() => {
        setItems(fallbackItems.filter((i) => i.badge));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="bg-brand text-white py-14 md:py-20 text-center px-4">
          <p className="section-label text-primary">À la Carte</p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Nos Spécialités
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/70">
            Les plats incontournables qui ont fait la réputation de Chez Ngor.
          </p>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {loading ? (
            <Spinner />
          ) : items.length === 0 ? (
            <p className="text-center text-gray-500 py-12">Aucune spécialité disponible.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
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
