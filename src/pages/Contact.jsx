import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import api from '../api/axios.js';

const contactDetails = [
  { Icon: MapPin, label: 'Adresse', value: 'Plage de Ngor, Route de la Corniche Ouest, Dakar' },
  { Icon: Phone, label: 'Téléphone', value: '+221 33 820 12 34 / +221 77 123 45 67' },
  { Icon: Mail, label: 'Email', value: 'contact@chezngor.sn' },
  { Icon: Clock, label: 'Horaires', value: 'Lundi – Dimanche : 11h00 – 23h00' },
];

export default function Contact() {
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
      await api.post('/contact', data);
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
          <p className="section-label text-primary">Nous Écrire</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold text-white">Contact</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/70">
            Besoin d'informations ? Notre équipe vous répond dans les plus brefs délais.
          </p>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 grid gap-12 md:grid-cols-2">
          {/* Infos */}
          <div>
            <h2 className="font-display text-2xl font-bold text-brand">Nos Coordonnées</h2>
            <ul className="mt-6 space-y-5">
              {contactDetails.map(({ Icon, label, value }) => (
                <li key={label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</p>
                    <p className="mt-0.5 text-sm text-gray-700">{value}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <p className="text-sm font-semibold text-brand mb-3">Réseaux sociaux</p>
              <div className="flex gap-3">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="rounded-full bg-gray-100 p-2.5 text-gray-600 hover:bg-primary hover:text-white transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div>
            <h2 className="font-display text-2xl font-bold text-brand">Envoyez un Message</h2>
            {success ? (
              <div className="mt-6 rounded-xl bg-green-50 border border-green-200 p-6 text-center">
                <p className="font-semibold text-green-700">Message envoyé avec succès !</p>
                <p className="text-sm text-green-600 mt-1">Nous vous répondrons très bientôt.</p>
                <button onClick={() => setSuccess(false)} className="mt-3 text-sm text-primary underline">
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
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
                      {...register('email', {
                        required: 'Email requis',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email invalide' },
                      })}
                      type="email"
                      placeholder="Votre email"
                      className="input-field"
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="Téléphone (optionnel)"
                  className="input-field"
                />

                <div>
                  <textarea
                    {...register('message', { required: 'Message requis' })}
                    rows={5}
                    placeholder="Votre message..."
                    className="input-field resize-none"
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
                  )}
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
                  {isSubmitting ? 'Envoi...' : 'Envoyer le Message'}
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
