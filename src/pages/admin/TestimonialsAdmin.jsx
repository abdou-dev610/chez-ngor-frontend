import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Pencil, Trash2, X, Eye, EyeOff, Star } from 'lucide-react';
import api from '../../api/axios.js';
import Spinner from '../../components/ui/Spinner.jsx';

export default function TestimonialsAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  const fetchData = () => {
    setLoading(true);
    api
      .get('/admin/testimonials')
      .then(({ data }) => setItems(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => {
    setEditing(null);
    reset({ name: '', message: '', rating: 5, isVisible: true });
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    Object.keys(item).forEach((k) => setValue(k, item[k]));
    setShowForm(true);
  };

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, rating: Number(data.rating) };
      if (editing) {
        await api.put(`/admin/testimonials/${editing._id}`, payload);
      } else {
        await api.post('/admin/testimonials', payload);
      }
      setShowForm(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur');
    }
  };

  const toggleVisible = async (item) => {
    await api.put(`/admin/testimonials/${item._id}`, { isVisible: !item.isVisible });
    fetchData();
  };

  const handleDelete = async (id) => {
    await api.delete(`/admin/testimonials/${id}`);
    setDeleting(null);
    fetchData();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand">Témoignages</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} avis</p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-sm py-2">
          <Plus className="h-4 w-4" /> Ajouter un avis
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <div key={t._id} className={`card p-5 ${!t.isVisible ? 'opacity-50' : ''}`}>
              <div className="flex justify-between items-start">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => toggleVisible(t)} className="p-1 rounded hover:bg-gray-100 text-gray-400">
                    {t.isVisible ? <Eye className="h-4 w-4 text-green-500" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  <button onClick={() => openEdit(t)} className="p-1 rounded hover:bg-blue-50 text-blue-400">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => setDeleting(t)} className="p-1 rounded hover:bg-red-50 text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm italic text-gray-600">"{t.message}"</p>
              <p className="mt-3 text-sm font-semibold text-brand">— {t.name}</p>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display text-xl font-bold text-brand">
                {editing ? 'Modifier l\'avis' : 'Ajouter un avis'}
              </h2>
              <button onClick={() => setShowForm(false)}><X className="h-5 w-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Nom</label>
                <input {...register('name', { required: true })} className="input-field mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea {...register('message', { required: true })} rows={3} className="input-field mt-1 resize-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Note (1-5)</label>
                <input {...register('rating', { required: true, min: 1, max: 5 })} type="number" min="1" max="5" className="input-field mt-1" />
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input {...register('isVisible')} type="checkbox" />
                Visible publiquement
              </label>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-gray-300 rounded-md py-2.5 text-sm font-medium hover:bg-gray-50">
                  Annuler
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-1 btn-primary disabled:opacity-60">
                  {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <Trash2 className="h-10 w-10 text-red-500 mx-auto mb-3" />
            <h3 className="font-display text-lg font-bold text-brand">Supprimer cet avis ?</h3>
            <p className="text-sm text-gray-500 mt-2">Avis de {deleting.name}.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setDeleting(null)} className="flex-1 border border-gray-300 rounded-md py-2.5 text-sm font-medium hover:bg-gray-50">Annuler</button>
              <button onClick={() => handleDelete(deleting._id)} className="flex-1 bg-red-500 text-white rounded-md py-2.5 text-sm font-medium hover:bg-red-600">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
