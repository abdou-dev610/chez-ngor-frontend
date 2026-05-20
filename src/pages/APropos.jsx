import { Link } from 'react-router-dom';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import { Heart, Leaf, Users, Award, ChefHat, MapPin, Clock, Star } from 'lucide-react';

const values = [
  {
    Icon: Heart,
    title: 'Passion',
    desc: "Chaque plat est préparé avec amour et dévouement envers la cuisine sénégalaise.",
    color: 'from-rose-50 to-white',
    iconBg: 'bg-rose-100 text-rose-600',
  },
  {
    Icon: Leaf,
    title: 'Fraîcheur',
    desc: "Nous utilisons uniquement des produits frais, pêchés ou récoltés chaque matin.",
    color: 'from-emerald-50 to-white',
    iconBg: 'bg-emerald-100 text-emerald-600',
  },
  {
    Icon: Users,
    title: 'Hospitalité',
    desc: "L'accueil chaleureux est au cœur de notre culture. Vous êtes chez vous ici.",
    color: 'from-amber-50 to-white',
    iconBg: 'bg-amber-100 text-amber-600',
  },
  {
    Icon: Award,
    title: 'Excellence',
    desc: "Nous visons la perfection dans chaque assiette, chaque service, chaque moment.",
    color: 'from-blue-50 to-white',
    iconBg: 'bg-blue-100 text-blue-600',
  },
];

const stats = [
  { Icon: Clock,  value: '14+', label: "Années d'expérience" },
  { Icon: Users,  value: '5 000+', label: 'Clients satisfaits' },
  { Icon: Star,   value: '4.9 / 5', label: 'Note moyenne' },
  { Icon: ChefHat, value: '20+', label: 'Recettes ancestrales' },
];

const timeline = [
  { year: '2010', text: "Ouverture du restaurant sur la plage de Ngor par la famille Diallo." },
  { year: '2014', text: "Reconnaissance nationale — primé meilleur restaurant traditionnel de Dakar." },
  { year: '2018', text: "Agrandissement de la terrasse pour accueillir encore plus de convives face à l'océan." },
  { year: '2024', text: "Lancement de notre carte gastronomique alliant tradition et modernité." },
];

export default function APropos() {
  return (
    <>
      <Header />
      <main>

        {/* ── HERO ── */}
        <section className="relative min-h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">
          <img
            src="/images/history-pirogues.jpg"
            alt="Plage de Ngor"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/70" />
          <div className="relative z-10 px-4 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm mb-6">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              Ngor, Dakar
            </span>
            <h1
              className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(2.8rem, 8vw, 5.5rem)', lineHeight: 1.08 }}
            >
              Notre Histoire
            </h1>
            <div className="mx-auto mt-5 h-0.5 w-16 rounded-full bg-primary" />
            <p className="mx-auto mt-6 max-w-xl text-base md:text-lg text-white/75 leading-relaxed">
              Depuis 2010, Chez Ngor incarne l'âme de la cuisine sénégalaise dans un cadre unique face à l'Atlantique.
            </p>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 divide-y-2 md:divide-y-0 md:divide-x divide-gray-100">
            {stats.map(({ Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center text-center px-6 py-4 md:py-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-display text-3xl font-bold text-brand">{value}</span>
                <span className="mt-1 text-xs text-gray-500 uppercase tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── HISTOIRE ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-24 grid gap-16 md:grid-cols-2 items-center">
          <div className="relative">
            <img
              src="/images/hero-ngor.jpg"
              alt="Chez Ngor vue de la mer"
              className="rounded-3xl object-cover shadow-xl w-full aspect-[4/3]"
            />
            <div className="absolute -bottom-5 -right-5 hidden md:flex flex-col items-center justify-center h-28 w-28 rounded-2xl bg-primary text-white shadow-lg">
              <span className="font-display text-3xl font-bold leading-none">14</span>
              <span className="text-[10px] uppercase tracking-wider mt-1 text-center leading-tight">ans de<br />passion</span>
            </div>
          </div>

          <div>
            <p className="section-label">Notre Histoire</p>
            <h2 className="mt-3 section-title leading-tight">La Tradition<br />de Ngor</h2>
            <div className="mt-4 h-1 w-12 rounded-full bg-primary" />
            <p className="mt-6 text-sm md:text-base leading-relaxed text-gray-600">
              Situé sur la magnifique plage de Ngor à Dakar, notre restaurant vous accueille depuis
              2010 dans un cadre paradisiaque face à l'océan Atlantique. Chez Ngor est né de la
              passion de partager l'authenticité de la cuisine sénégalaise.
            </p>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-gray-600">
              Notre chef, formé par sa grand-mère dans la tradition culinaire wolof, perpétue des
              recettes ancestrales tout en apportant une touche de créativité moderne. Chaque plat
              est une invitation au voyage au cœur de la culture sénégalaise.
            </p>

            {/* Quote */}
            <blockquote className="mt-8 border-l-4 border-primary pl-5 italic text-gray-700 text-sm md:text-base">
              "Cuisiner, c'est partager une part de soi. Ici, chaque plat raconte une histoire."
              <footer className="mt-2 not-italic text-xs text-gray-400 font-semibold uppercase tracking-wider">
                — Amadou Diallo, Chef fondateur
              </footer>
            </blockquote>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="bg-[#FFFBF5] py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center mb-14">
              <p className="section-label">Notre parcours</p>
              <h2 className="mt-3 section-title">Les grandes étapes</h2>
            </div>
            <ol className="relative border-l-2 border-primary/30 ml-4 md:ml-8 space-y-10">
              {timeline.map(({ year, text }) => (
                <li key={year} className="relative pl-8">
                  <span className="absolute -left-[11px] flex h-5 w-5 items-center justify-center rounded-full bg-primary ring-4 ring-white">
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </span>
                  <span className="inline-block mb-1 text-xs font-bold uppercase tracking-widest text-primary">{year}</span>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── VALEURS ── */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-14">
              <p className="section-label">Ce qui nous définit</p>
              <h2 className="mt-3 section-title">Nos Valeurs</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-gray-500">
                Les principes qui guident chacune de nos décisions, du choix des ingrédients à l'accueil de nos hôtes.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map(({ Icon, title, desc, color, iconBg }) => (
                <div
                  key={title}
                  className={`rounded-3xl bg-gradient-to-b ${color} border border-gray-100 p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300`}
                >
                  <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-brand">{title}</h3>
                  <p className="mt-3 text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section
          className="relative overflow-hidden py-28 text-center text-white"
          style={{ backgroundColor: '#3E1C00' }}
        >
          <div className="relative z-10 max-w-2xl mx-auto px-4">
            <p className="section-label text-primary">Venez nous rendre visite</p>
            <h2
              className="mt-4 font-display font-bold text-white"
              style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}
            >
              Vivez l'Expérience Chez Ngor
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-sm md:text-base text-white/70 leading-relaxed">
              Une table face à l'océan, des saveurs authentiques et une hospitalité sénégalaise sans égal. Réservez dès maintenant.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/reservation"
                className="w-full sm:w-auto text-center font-semibold text-sm text-white rounded-md px-8 py-3.5 transition-colors duration-200"
                style={{ backgroundColor: '#D97706' }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = '#B45309')}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = '#D97706')}
              >
                Réserver une Table
              </Link>
              <Link
                to="/menu"
                className="w-full sm:w-auto text-center font-semibold text-sm text-white rounded-md px-8 py-3.5 border-2 transition-colors duration-200"
                style={{ borderColor: 'rgba(255,255,255,0.5)', backgroundColor: 'transparent' }}
                onMouseOver={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#3E1C00'; }}
                onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'white'; }}
              >
                Voir le Menu
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
