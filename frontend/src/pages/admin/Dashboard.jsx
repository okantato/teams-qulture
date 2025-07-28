import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import useUserStore from '../../store/userStore';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const companyName = user?.company_name || 'sua empresa';

  return (
    <div className="min-h-screen bg-white text-black font-mono px-4">
      <Navbar />

      <div className="flex flex-col items-center justify-center pt-24 space-y-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold">Painel do Admin</h1>
        <p className="text-sm sm:text-base text-gray-700 max-w-md">
          Você está logado como administrador da empresa <span className="font-semibold">{companyName}</span>.
        </p>

        <button
          onClick={() => navigate('/')}
          className="text-sm text-gray-600 hover:underline"
        >
          ← Voltar para a Home
        </button>
      </div>
    </div>
  );
}
