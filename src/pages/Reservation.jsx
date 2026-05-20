import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import api from '../api/axios.js';

export default function Reservation() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setError('');
      await api.post('/reservations', { ...data, guests: Number(data.guests) });
      setSuccess(true);
      reset();
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue');
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="bg-brand text-white py-16 text-center">
          <p className="section-label text-primary">Votre Table</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold text-white">Réservation</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/70">
            Réservez votre table pour une expérience inoubliable face à l'océan.
          </p>
        </section>

        <section className="max-w-5xl mx-auto px-4 md:px-6 py-16 grid gap-12 md:grid-cols-2">
          {/* Infos */}
          <div>
            <h2 className="font-display text-2xl font-bold text-brand">Informations Pratiques</h2>
            <ul className="mt-6 space-y-5">
              {[
                { Icon: MapPin, text: 'Plage de Ngor, Route de la Corniche Ouest, Dakar' },
                { Icon: Phone, text: '+221 33 820 12 34 / +221 77 123 45 67' },
                { Icon: Mail, text: 'contact@chezngor.sn' },
                { Icon: Clock, text: 'Lundi – Dimanche : 11h00 – 23h00' },
              ].map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-1.5 text-sm text-gray-600">{text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Formulaire */}
          <div>
            <h2 className="font-display text-2xl font-bold text-brand">Formulaire de Réservation</h2>
            {success ? (
              <div className="mt-6 rounded-xl bg-green-50 border border-green-200 p-6 text-center">
                <div className="text-4xl mb-3">🎉</div>
                <p className="font-semibold text-green-700">Réservation envoyée !</p>
                <p className="text-sm text-green-600 mt-1">
                  Nous vous confirmons votre table très rapidement.
                </p>
                <button onClick={() => setSuccess(false)} className="mt-3 text-sm text-primary underline">
                  Nouvelle réservation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nom complet</label>
                    <input
                      {...register('name', { required: 'Nom requis' })}
                      placeholder="Votre nom"
                      className="input-field mt-1"
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Téléphone</label>
                    <input
                      {...register('phone', { required: 'Téléphone requis' })}
                      type="tel"
                      placeholder="+221 77 000 00 00"
                      className="input-field mt-1"
                    />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Nombre de personnes</label>
                  <input
                    {...register('guests', { required: 'Requis', min: { value: 1, message: 'Min 1' } })}
                    type="number"
                    min="1"
                    max="50"
                    placeholder="Ex : 4"
                    className="input-field mt-1"
                  />
                  {errors.guests && <p className="text-xs text-red-500 mt-1">{errors.guests.message}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Date</label>
                    <input
                      {...register('date', { required: 'Date requise' })}
                      type="date"
                      className="input-field mt-1"
                    />
                    {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Heure</label>
                    <input
                      {...register('time', { required: 'Heure requise' })}
                      type="time"
                      className="input-field mt-1"
                    />
                    {errors.time && <p className="text-xs text-red-500 mt-1">{errors.time.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Message (optionnel)</label>
                  <textarea
                    {...register('message')}
                    rows={3}
                    placeholder="Demande spéciale, allergies, occasion..."
                    className="input-field resize-none mt-1"
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-60"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Confirmer la Réservation'}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
