import { NavLink } from 'react-router-dom';
import { LayoutDashboard, UtensilsCrossed, CalendarCheck, MessageSquare, Star, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { to: '/admin/menu', label: 'Menu', Icon: UtensilsCrossed },
  { to: '/admin/reservations', label: 'Réservations', Icon: CalendarCheck },
  { to: '/admin/testimonials', label: 'Témoignages', Icon: Star },
  { to: '/admin/messages', label: 'Messages', Icon: MessageSquare },
];

export default function Sidebar() {
  const { admin, logout } = useAuth();

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-brand text-white">
      <div className="px-6 py-5 border-b border-white/10">
        <p className="font-display text-xl font-bold">Chez Ngor</p>
        <p className="text-xs text-white/60 mt-0.5">Administration</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-primary text-white' : 'text-white/70 hover:bg-white/10'
              }`
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <div className="px-4 py-2 mb-2">
          <p className="text-xs text-white/60">Connecté en tant que</p>
          <p className="text-sm font-medium truncate">{admin?.name}</p>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-white/70 hover:bg-white/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
