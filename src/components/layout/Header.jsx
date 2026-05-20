import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/menu', label: 'Menu' },
  { to: '/specialites', label: 'Spécialités' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-bold text-brand">Chez Ngor</span>
          <span className="hidden sm:inline text-xs text-gray-500">Restaurant Sénégalais</span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              className={({ isActive }) =>
                `relative text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? 'text-primary' : 'text-gray-600'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {n.label}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-primary" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Actions desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+221338201234"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary"
          >
            <Phone className="h-4 w-4 text-primary" />
            +221 33 820 12 34
          </a>
          <Link to="/reservation" className="btn-primary text-sm py-2 px-4">
            Réserver
          </Link>
        </div>

        {/* Hamburger mobile */}
        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden p-2 rounded-md text-brand"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2.5 text-sm font-medium ${
                    isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <a href="tel:+221338201234" className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-600">
              <Phone className="h-4 w-4 text-primary" /> +221 33 820 12 34
            </a>
            <Link
              to="/reservation"
              onClick={() => setOpen(false)}
              className="mt-1 btn-primary text-center text-sm py-2.5"
            >
              Réserver
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
