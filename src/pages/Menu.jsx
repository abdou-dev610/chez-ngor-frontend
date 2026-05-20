import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import MenuCard from '../components/ui/MenuCard.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import api from '../api/axios.js';

const categories = ['Tous', 'traditionnel', 'grillade', 'boisson', 'dessert', 'entrée'];

export default function Menu() {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('Tous');
  const [search, setSearch] = useState('');

  useEffect(() => {
    api
      .get('/menu')
      .then(({ data }) => {
        setItems(data);
        setFiltered(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = items;
    if (category !== 'Tous') result = result.filter((i) => i.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [category, search, items]);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-brand text-white py-16 text-center">
          <p className="section-label text-primary">Notre Carte</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold text-white">
            Notre Menu
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/70">
            Des saveurs authentiques du Sénégal, préparées avec les meilleurs ingrédients frais.
          </p>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          {/* Filtres */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    category === c
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un plat..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-9 py-2"
              />
            </div>
          </div>

          {loading ? (
            <Spinner />
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-12">Aucun plat trouvé.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((item) => (
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
