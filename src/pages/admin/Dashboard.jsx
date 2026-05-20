import { useEffect, useState } from 'react';
import { UtensilsCrossed, CalendarCheck, Clock, MessageSquare, Star } from 'lucide-react';
import api from '../../api/axios.js';
import Spinner from '../../components/ui/Spinner.jsx';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/admin/stats')
      .then(({ data }) => setStats(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const cards = stats
    ? [
        { label: 'Plats au menu', value: stats.totalMenu, Icon: UtensilsCrossed, color: 'bg-amber-50 text-amber-600' },
        { label: 'Total réservations', value: stats.totalReservations, Icon: CalendarCheck, color: 'bg-blue-50 text-blue-600' },
        { label: 'En attente', value: stats.pendingReservations, Icon: Clock, color: 'bg-orange-50 text-orange-600' },
        { label: 'Messages reçus', value: stats.totalMessages, Icon: MessageSquare, color: 'bg-purple-50 text-purple-600' },
        { label: 'Témoignages visibles', value: stats.totalTestimonials, Icon: Star, color: 'bg-green-50 text-green-600' },
      ]
    : [];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-brand">Tableau de bord</h1>
      <p className="mt-1 text-sm text-gray-500">Vue d'ensemble du restaurant Chez Ngor</p>

      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {cards.map(({ label, value, Icon, color }) => (
            <div key={label} className="card p-6">
              <div className={`inline-flex rounded-full p-2.5 ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-3 text-2xl font-bold text-gray-800">{value}</p>
              <p className="mt-0.5 text-sm text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
