import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import MenuCard from '../components/ui/MenuCard.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import api from '../api/axios.js';
import { menuItems as fallbackItems } from '../data/menuData.js';

const CATEGORIES = ['Tous', 'traditionnel', 'grillade', 'boisson', 'dessert', 'entrée'];

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
        setItems(data && data.length > 0 ? data : fallbackItems);
      })
      .catch(() => {
        setItems(fallbackItems);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = items;
    if (category !== 'Tous') {
      result = result.filter((i) => i.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          (i.description && i.description.toLowerCase().includes(q))
      );
    }
    setFiltered(result);
  }, [category, search, items]);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-brand text-white py-14 md:py-20 text-center px-4">
          <p className="section-label text-primary">Notre Carte</p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Notre Menu
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/70">
            Des saveurs authentiques du Sénégal, préparées avec les meilleurs ingrédients frais.
          </p>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          {/* Filtres + Recherche */}
          <div className="flex flex-col gap-4 mb-8">
            {/* Boutons catégories */}
            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((c) => (
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
            {/* Recherche */}
            <div className="relative w-full sm:w-72 mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un plat..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-9 py-2 w-full"
              />
            </div>
          </div>

          {/* Contenu */}
          {loading ? (
            <Spinner />
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Aucun plat trouvé.</p>
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="mt-4 text-sm text-primary underline"
                >
                  Effacer la recherche
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
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
