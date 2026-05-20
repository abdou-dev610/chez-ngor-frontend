import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Couche 1 — image de fond propre hero-ngor.jpg */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/hero-ngor.jpg?v=2')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Couche 2 — overlay sombre pour lisibilité du texte */}
      <div className="absolute inset-0 z-[1] bg-black/60" />

      {/* Couche 3 — contenu React, seule source de texte */}
      <div className="relative z-[2] w-full max-w-4xl mx-auto px-4 sm:px-8 py-20 flex flex-col items-center text-center text-white">

        {/* Badge localisation */}
        <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur-sm">
          <MapPin className="h-3.5 w-3.5 text-primary flex-shrink-0" />
          Ngor, Dakar — Face à l'Océan
        </span>

        {/* Titre principal */}
        <h1
          className="mt-6 font-display font-bold text-white"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', lineHeight: 1.1 }}
        >
          Chez Ngor
        </h1>

        {/* Sous-titre */}
        <p
          className="mt-4 font-display text-white/90"
          style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}
        >
          La Saveur Authentique du Sénégal
        </p>

        {/* Description */}
        <p className="mt-5 max-w-2xl text-sm md:text-base text-white/75 leading-relaxed">
          Découvrez la cuisine traditionnelle sénégalaise dans un cadre paradisiaque
          face à l'océan Atlantique. Des recettes ancestrales préparées avec passion.
        </p>

        {/* Boutons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <Link
            to="/menu"
            className="w-full sm:w-auto text-center font-semibold text-sm text-white rounded-md px-8 py-3.5 transition-colors duration-200"
            style={{ backgroundColor: '#D97706' }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#B45309')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#D97706')}
          >
            Voir le Menu
          </Link>
          <Link
            to="/reservation"
            className="w-full sm:w-auto text-center font-semibold text-sm text-white rounded-md px-8 py-3.5 transition-colors duration-200 border-2"
            style={{ borderColor: 'rgba(255,255,255,0.65)', backgroundColor: 'transparent' }}
            onMouseOver={e => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = '#3E1C00';
            }}
            onMouseOut={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'white';
            }}
          >
            Réserver une Table
          </Link>
        </div>
      </div>
    </section>
  );
}
