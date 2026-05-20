import { useEffect, useState } from 'react';
import { Trash2, MailOpen, Mail } from 'lucide-react';
import api from '../../api/axios.js';
import Spinner from '../../components/ui/Spinner.jsx';

export default function MessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const fetchData = () => {
    setLoading(true);
    api
      .get('/admin/messages')
      .then(({ data }) => setMessages(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const markAsRead = async (id) => {
    await api.put(`/admin/messages/${id}/read`);
    fetchData();
  };

  const handleDelete = async (id) => {
    await api.delete(`/admin/messages/${id}`);
    setDeleting(null);
    fetchData();
  };

  const unread = messages.filter((m) => !m.isRead).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-brand">Messages de contact</h1>
        <p className="text-sm text-gray-500 mt-1">
          {messages.length} message(s) · {unread} non lu(s)
        </p>
      </div>

      {loading ? (
        <Spinner />
      ) : messages.length === 0 ? (
        <p className="text-center text-gray-500 py-12">Aucun message.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m._id}
              className={`card p-5 border-l-4 ${
                m.isRead ? 'border-gray-200' : 'border-primary'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-800">{m.name}</h3>
                    {!m.isRead && (
                      <span className="text-xs rounded-full bg-primary text-white px-2 py-0.5 font-medium">
                        Nouveau
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {m.email}
                    {m.phone && ` · ${m.phone}`}
                  </p>
                  <p className="mt-2 text-sm text-gray-700">{m.message}</p>
                  <p className="mt-2 text-xs text-gray-400">
                    {new Date(m.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {!m.isRead && (
                    <button
                      onClick={() => markAsRead(m._id)}
                      className="p-1.5 rounded hover:bg-blue-50 text-blue-400"
                      title="Marquer comme lu"
                    >
                      <MailOpen className="h-4 w-4" />
                    </button>
                  )}
                  {m.isRead && (
                    <span className="p-1.5 text-gray-300">
                      <Mail className="h-4 w-4" />
                    </span>
                  )}
                  <button
                    onClick={() => setDeleting(m)}
                    className="p-1.5 rounded hover:bg-red-50 text-red-400"
                  >
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
            <h3 className="font-display text-lg font-bold text-brand">Supprimer ce message ?</h3>
            <p className="text-sm text-gray-500 mt-2">Message de {deleting.name}.</p>
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
