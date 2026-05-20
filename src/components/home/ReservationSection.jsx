import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import api from '../../api/axios.js';

const contactInfo = [
  { Icon: MapPin, text: 'Plage de Ngor, Route de la Corniche Ouest, Dakar' },
  { Icon: Phone, text: '+221 33 820 12 34 / +221 77 123 45 67' },
  { Icon: Mail, text: 'contact@chezngor.sn' },
  { Icon: Clock, text: 'Lundi – Dimanche : 11h00 – 23h00' },
];

export default function ReservationSection() {
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
    <section id="reserver" className="bg-brand text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">Réservez Votre Table</h2>
          <p className="mt-3 text-sm text-white/80">
            Pour une expérience culinaire inoubliable face à l'océan, réservez dès maintenant.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            {contactInfo.map(({ Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-white/80">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white p-6 text-gray-800">
          {success ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center py-8">
              <div className="text-4xl">🎉</div>
              <p className="font-display text-xl font-semibold text-brand">Réservation envoyée !</p>
              <p className="text-sm text-gray-500">
                Nous vous confirmons votre table très rapidement.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-2 text-sm text-primary underline"
              >
                Nouvelle réservation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    {...register('name', { required: 'Nom requis' })}
                    placeholder="Votre nom"
                    className="input-field"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <input
                    {...register('phone', { required: 'Téléphone requis' })}
                    type="tel"
                    placeholder="Téléphone"
                    className="input-field"
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <input
                  {...register('guests', { required: 'Nombre requis', min: 1 })}
                  type="number"
                  min="1"
                  max="50"
                  placeholder="Nombre de personnes"
                  className="input-field"
                />
                {errors.guests && <p className="text-xs text-red-500 mt-1">{errors.guests.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    {...register('date', { required: 'Date requise' })}
                    type="date"
                    className="input-field"
                  />
                  {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date.message}</p>}
                </div>
                <div>
                  <input
                    {...register('time', { required: 'Heure requise' })}
                    type="time"
                    className="input-field"
                  />
                  {errors.time && <p className="text-xs text-red-500 mt-1">{errors.time.message}</p>}
                </div>
              </div>

              <textarea
                {...register('message')}
                rows={2}
                placeholder="Message (optionnel)"
                className="input-field resize-none"
              />

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-60"
              >
                {isSubmitting ? 'Envoi...' : 'Confirmer la Réservation'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
