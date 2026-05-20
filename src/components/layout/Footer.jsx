import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand text-brand-foreground">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display text-2xl font-bold">Chez Ngor</h3>
          <p className="mt-3 text-sm text-white/70">
            Restaurant sénégalais authentique face à l'océan. Savourez la tradition depuis 2010.
          </p>
        </div>

        <div>
          <h4 className="font-display text-base font-semibold">Navigation</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {[
              { to: '/', label: 'Accueil' },
              { to: '/menu', label: 'Menu' },
              { to: '/specialites', label: 'Spécialités' },
              { to: '/a-propos', label: 'À propos' },
              { to: '/contact', label: 'Contact' },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-primary transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base font-semibold">Infos Pratiques</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>Horaires : 11h – 23h</li>
            <li>
              <Link to="/reservation" className="hover:text-primary transition-colors">
                Réservations
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary transition-colors">
                Plan d'accès
              </Link>
            </li>
            <li>Événements privés</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base font-semibold">Suivez-nous</h4>
          <div className="mt-4 flex gap-3">
            {[
              { Icon: Facebook, href: '#' },
              { Icon: Instagram, href: '#' },
              { Icon: Twitter, href: '#' },
              { Icon: MessageCircle, href: 'https://wa.me/221771234567' },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white/10 p-2.5 text-white hover:bg-primary transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="mt-4 text-sm text-white/70">@chezngor</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="max-w-7xl mx-auto px-4 md:px-6 py-5 text-center text-xs text-white/50">
          © 2026 Chez Ngor. Tous droits réservés. Fait avec ❤ à Dakar
        </p>
      </div>
    </footer>
  );
}
