import { Fish, ChefHat, Soup, Clock } from 'lucide-react';

const perks = [
  {
    Icon: Fish,
    title: 'Produits Frais',
    desc: 'Poissons et fruits de mer fraîchement pêchés chaque matin',
  },
  {
    Icon: Soup,
    title: 'Recettes Traditionnelles',
    desc: 'Cuisine authentique transmise de génération en génération',
  },
  {
    Icon: ChefHat,
    title: 'Chef Sénégalais',
    desc: 'Préparé avec passion par nos chefs experts',
  },
  {
    Icon: Clock,
    title: 'Ouvert 7j/7',
    desc: 'De 11h à 23h pour vous accueillir tous les jours',
  },
];

export default function Perks() {
  return (
    <section className="bg-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {perks.map(({ Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-semibold text-brand">{title}</h3>
              <p className="mt-1 text-sm text-gray-500">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
