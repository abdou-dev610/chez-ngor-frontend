import { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';

const badgeStyles = {
  Spécialité:   'bg-primary text-white',
  Populaire:    'bg-brand text-white',
  Traditionnel: 'bg-amber-700 text-white',
  Recommandé:   'bg-emerald-700 text-white',
};

export default function MenuCard({ item }) {
  const [imgError, setImgError] = useState(false);
  const hasImage = item.image && !imgError;

  return (
    <article className="card group flex flex-col hover:shadow-md transition-shadow">
      <div className="relative aspect-[4/3] bg-[#f5ede0] overflow-hidden">

        {hasImage ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <UtensilsCrossed className="h-10 w-10 text-primary/30" />
            <span className="font-display text-sm text-primary/50">{item.name}</span>
          </div>
        )}

        {item.badge && (
          <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${badgeStyles[item.badge] || 'bg-primary text-white'}`}>
            {item.badge}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-brand">{item.name}</h3>
          <span className="whitespace-nowrap font-semibold text-primary">
            {item.price?.toLocaleString('fr-FR')} FCFA
          </span>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">{item.description}</p>
        {item.category && (
          <span className="mt-3 inline-block text-xs text-gray-400 capitalize">{item.category}</span>
        )}
      </div>
    </article>
  );
}
