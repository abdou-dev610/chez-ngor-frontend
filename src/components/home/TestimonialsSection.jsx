import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../../api/axios.js';
import TestimonialCard from '../ui/TestimonialCard.jsx';
import Spinner from '../ui/Spinner.jsx';

export default function TestimonialsSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    api
      .get('/testimonials')
      .then(({ data }) => setItems(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const prev = () => setIdx((i) => (i - 1 + items.length) % items.length);
  const next = () => setIdx((i) => (i + 1) % items.length);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-20">
      <div className="text-center">
        <p className="section-label">Témoignages</p>
        <h2 className="mt-2 section-title">Ce Que Disent Nos Clients</h2>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="relative mt-12 flex items-center gap-3">
          <button
            onClick={prev}
            className="shrink-0 rounded-full border border-gray-200 bg-white p-2 shadow-sm hover:bg-gray-50 transition"
            aria-label="Précédent"
          >
            <ChevronLeft className="h-5 w-5 text-brand" />
          </button>

          {/* Desktop : tous les cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 flex-1">
            {items.map((t) => (
              <TestimonialCard key={t._id} {...t} />
            ))}
          </div>

          {/* Mobile : carousel */}
          <div className="flex-1 md:hidden">
            {items[idx] && <TestimonialCard {...items[idx]} />}
          </div>

          <button
            onClick={next}
            className="shrink-0 rounded-full border border-gray-200 bg-white p-2 shadow-sm hover:bg-gray-50 transition"
            aria-label="Suivant"
          >
            <ChevronRight className="h-5 w-5 text-brand" />
          </button>
        </div>
      )}
    </section>
  );
}
