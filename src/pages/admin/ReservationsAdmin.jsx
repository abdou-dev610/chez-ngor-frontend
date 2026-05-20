import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import api from '../../api/axios.js';
import Spinner from '../../components/ui/Spinner.jsx';

const STATUS_LABELS = {
  pending: { label: 'En attente', cls: 'bg-yellow-100 text-yellow-700' },
  confirmed: { label: 'Confirmée', cls: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Annulée', cls: 'bg-red-100 text-red-600' },
  completed: { label: 'Terminée', cls: 'bg-gray-100 text-gray-500' },
};

export default function ReservationsAdmin() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const fetchData = () => {
    setLoading(true);
    api
      .get('/admin/reservations')
      .then(({ data }) => setReservations(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/reservations/${id}/status`, { status });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/reservations/${id}`);
      setDeleting(null);
      fetchData();
    } catch (err) {
      alert('Erreur lors de la suppression');
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-brand">Réservations</h1>
        <p className="text-sm text-gray-500 mt-1">{reservations.length} réservation(s)</p>
      </div>

      {loading ? (
        <Spinner />
      ) : reservations.length === 0 ? (
        <p className="text-center text-gray-500 py-12">Aucune réservation.</p>
      ) : (
        <div className="space-y-4">
          {reservations.map((r) => (
            <div key={r._id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-800">{r.name}</h3>
                    <span className={`text-xs rounded-full px-2.5 py-0.5 font-medium ${STATUS_LABELS[r.status]?.cls}`}>
                      {STATUS_LABELS[r.status]?.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {r.phone} · {r.guests} pers. · {r.date} à {r.time}
                  </p>
                  {r.message && <p className="text-sm text-gray-400 mt-1 italic">"{r.message}"</p>}
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={r.status}
                    onChange={(e) => updateStatus(r._id, e.target.value)}
                    className="text-sm border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {Object.entries(STATUS_LABELS).map(([val, { label }]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                  <button onClick={() => setDeleting(r)} className="p-1.5 rounded hover:bg-red-50 text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <Trash2 className="h-10 w-10 text-red-500 mx-auto mb-3" />
            <h3 className="font-display text-lg font-bold text-brand">Supprimer cette réservation ?</h3>
            <p className="text-sm text-gray-500 mt-2">Réservation de {deleting.name} le {deleting.date}.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setDeleting(null)} className="flex-1 border border-gray-300 rounded-md py-2.5 text-sm font-medium hover:bg-gray-50">
                Annuler
              </button>
              <button onClick={() => handleDelete(deleting._id)} className="flex-1 bg-red-500 text-white rounded-md py-2.5 text-sm font-medium hover:bg-red-600">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
