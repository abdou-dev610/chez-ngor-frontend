import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios.js';
import MenuCard from '../ui/MenuCard.jsx';
import Spinner from '../ui/Spinner.jsx';
import { menuItems as fallbackItems } from '../../data/menuData.js';

export default function FeaturedMenu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/menu')
      .then(({ data }) => {
        const source = data && data.length > 0 ? data : fallbackItems;
        setItems(source.slice(0, 4));
      })
      .catch(() => {
        setItems(fallbackItems.slice(0, 4));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <div className="text-center">
        <p className="section-label">Nos Délices</p>
        <h2 className="mt-2 section-title">Menu Traditionnel</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-gray-500">
          Découvrez nos plats préparés avec des ingrédients frais et des recettes transmises
          de génération en génération.
        </p>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {items.map((item) => (
            <MenuCard key={item._id} item={item} />
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link
          to="/menu"
          className="inline-flex items-center justify-center rounded-md border-2 border-brand text-brand font-semibold px-6 py-2.5 text-sm hover:bg-brand hover:text-white transition-colors"
        >
          Voir tout le menu
        </Link>
      </div>
    </section>
  );
}
