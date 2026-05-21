import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import Specialites from './pages/Specialites.jsx';
import APropos from './pages/APropos.jsx';
import Contact from './pages/Contact.jsx';
import Reservation from './pages/Reservation.jsx';
import AdminLogin from './pages/admin/Login.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import MenuAdmin from './pages/admin/MenuAdmin.jsx';
import ReservationsAdmin from './pages/admin/ReservationsAdmin.jsx';
import TestimonialsAdmin from './pages/admin/TestimonialsAdmin.jsx';
import MessagesAdmin from './pages/admin/MessagesAdmin.jsx';
import ProtectedRoute from './components/admin/ProtectedRoute.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/specialites" element={<Specialites />} />
      <Route path="/a-propos" element={<APropos />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/reservation" element={<Reservation />} />

      {/* Auth admin */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Routes admin protégées */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="menu" element={<MenuAdmin />} />
        <Route path="reservations" element={<ReservationsAdmin />} />
        <Route path="testimonials" element={<TestimonialsAdmin />} />
        <Route path="messages" element={<MessagesAdmin />} />
      </Route>
      </Routes>
    </>
  );
}
