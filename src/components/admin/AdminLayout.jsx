import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Sidebar from './Sidebar.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminLayout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/admin/login');
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
