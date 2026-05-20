const stats = [
  { value: '14+', label: "Années d'expérience" },
  { value: '5000+', label: 'Clients satisfaits' },
  { value: '4.9', label: 'Note moyenne' },
];

export default function History() {
  return (
    <section className="bg-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 grid gap-10 md:grid-cols-2 items-center">
        <img
          src="/images/history-pirogues.jpg"
          alt="Pirogues sur la plage de Ngor"
          loading="lazy"
          className="rounded-2xl object-cover shadow-md w-full aspect-[4/3]"
        />
        <div>
          <p className="section-label">Notre Histoire</p>
          <h2 className="mt-2 section-title">La Tradition de Ngor</h2>
          <p className="mt-5 text-sm md:text-base leading-relaxed text-gray-600">
            Situé sur la magnifique plage de Ngor à Dakar, notre restaurant vous accueille depuis
            2010 dans un cadre paradisiaque face à l'océan Atlantique. Chez Ngor est né de la
            passion de partager l'authenticité de la cuisine sénégalaise.
          </p>
          <p className="mt-4 text-sm md:text-base leading-relaxed text-gray-600">
            Notre chef, formé par sa grand-mère dans la tradition culinaire wolof, perpétue des
            recettes ancestrales tout en apportant une touche de créativité moderne. Chaque plat
            est une invitation au voyage au cœur de la culture sénégalaise.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-4 text-center">
                <div className="font-display text-2xl font-bold text-primary">{s.value}</div>
                <div className="mt-1 text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
