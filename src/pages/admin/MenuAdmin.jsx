import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Pencil, Trash2, X, ToggleLeft, ToggleRight } from 'lucide-react';
import api from '../../api/axios.js';
import Spinner from '../../components/ui/Spinner.jsx';

const categories = ['traditionnel', 'grillade', 'boisson', 'dessert', 'entrée'];

export default function MenuAdmin() {
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
    formState: { errors, isSubmitting },
  } = useForm();

  const fetchItems = () => {
    setLoading(true);
    api
      .get('/admin/menu')
      .then(({ data }) => setItems(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => {
    setEditing(null);
    reset({});
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    Object.keys(item).forEach((k) => setValue(k, item[k]));
    setShowForm(true);
  };

  const onSubmit = async (data) => {
    try {
      if (editing) {
        await api.put(`/admin/menu/${editing._id}`, { ...data, price: Number(data.price) });
      } else {
        await api.post('/admin/menu', { ...data, price: Number(data.price) });
      }
      setShowForm(false);
      fetchItems();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/menu/${id}`);
      setDeleting(null);
      fetchItems();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur');
    }
  };

  const toggleAvailability = async (item) => {
    try {
      await api.put(`/admin/menu/${item._id}`, { isAvailable: !item.isAvailable });
      fetchItems();
    } catch (err) {
      alert('Erreur');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand">Gestion du Menu</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} plats</p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-sm py-2">
          <Plus className="h-4 w-4" /> Ajouter un plat
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-auto rounded-xl border border-gray-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Nom', 'Catégorie', 'Prix', 'Badge', 'Disponible', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
                  <td className="px-4 py-3 capitalize text-gray-500">{item.category}</td>
                  <td className="px-4 py-3 text-primary font-semibold">
                    {item.price?.toLocaleString('fr-FR')} FCFA
                  </td>
                  <td className="px-4 py-3">
                    {item.badge ? (
                      <span className="rounded-full bg-primary/10 text-primary text-xs px-2 py-0.5">
                        {item.badge}
                      </span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleAvailability(item)} className="text-gray-400 hover:text-primary">
                      {item.isAvailable ? (
                        <ToggleRight className="h-5 w-5 text-green-500" />
                      ) : (
                        <ToggleLeft className="h-5 w-5" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => openEdit(item)} className="p-1.5 rounded hover:bg-blue-50 text-blue-500">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => setDeleting(item)} className="p-1.5 rounded hover:bg-red-50 text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Formulaire modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display text-xl font-bold text-brand">
                {editing ? 'Modifier le plat' : 'Ajouter un plat'}
              </h2>
              <button onClick={() => setShowForm(false)}>
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Nom *</label>
                <input {...register('name', { required: true })} className="input-field mt-1" />
                {errors.name && <p className="text-xs text-red-500 mt-1">Champ requis</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Description *</label>
                <textarea {...register('description', { required: true })} rows={3} className="input-field mt-1 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Prix (FCFA) *</label>
                  <input {...register('price', { required: true })} type="number" className="input-field mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Catégorie *</label>
                  <select {...register('category', { required: true })} className="input-field mt-1">
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Badge</label>
                <input {...register('badge')} placeholder="Spécialité, Populaire..." className="input-field mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">URL Image</label>
                <input {...register('image')} placeholder="https://..." className="input-field mt-1" />
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input {...register('isAvailable')} type="checkbox" className="rounded" />
                Disponible
              </label>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-gray-300 rounded-md py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
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

      {/* Confirmation suppression */}
      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <Trash2 className="h-10 w-10 text-red-500 mx-auto mb-3" />
            <h3 className="font-display text-lg font-bold text-brand">Supprimer ce plat ?</h3>
            <p className="text-sm text-gray-500 mt-2">"{deleting.name}" sera définitivement supprimé.</p>
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
