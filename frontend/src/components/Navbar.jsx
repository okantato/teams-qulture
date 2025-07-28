import React from 'react';
import useUserStore from '../store/userStore';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isSuperadmin = user?.superadmin;
  const isAdmin = user?.admin;
  const isUser = !isSuperadmin && !isAdmin;

  return (
    <header className="fixed top-0 left-0 w-full bg-white text-black border-b border-gray-200 py-3 px-4 shadow font-mono z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Logo e Nome */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img src="/logo.png" alt="TeamsQulture Logo" className="h-8 w-8" />
          <h2 className="text-lg font-bold">TeamsQulture</h2>
        </div>

        {/* Navegação */}
        {user && (
          <nav className="flex flex-wrap items-center gap-6">
            {/* Ações por papel */}
            {isSuperadmin && (
              <>
                <button
                  onClick={() => navigate('/superadmin/dashboard')}
                  className="text-sm hover:underline"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/superadmin/companies')}
                  className="text-sm hover:underline"
                >
                  Empresas
                </button>
              </>
            )}

            {isAdmin && !isSuperadmin && (
              <>
                <button
                  onClick={() => navigate('/admin/dashboard')}
                  className="text-sm hover:underline"
                >
                  Dashboard Admin
                </button>
                <button
                  onClick={() => navigate('/admin/employees')}
                  className="text-sm hover:underline"
                >
                  Colaboradores
                </button>
              </>
            )}

            {isUser && (
              <button
                onClick={() => navigate('/user/dashboard')}
                className="text-sm hover:underline"
              >
                Meu Painel
              </button>
            )}

            {/* Perfil e logout */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">
                {user.name}
              </span>

              {user.picture ? (
                <img
                  src={user.picture}
                  alt="Foto do usuário"
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-sm">
                  {user.name?.charAt(0)}
                </div>
              )}

              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 border border-gray-300 px-3 py-1 rounded hover:bg-gray-100 hover:text-black transition"
              >
                Sair
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
