import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import useUserStore from '../../store/userStore';

export default function UserDashboard() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const companyName = user?.company_name || 'sua empresa';

  return (
    <div className="min-h-screen flex font-mono bg-white text-black">
      <Navbar />

      <div className="pt-20 flex-1 p-10 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4 text-center">Painel do Usuário</h1>
        <p className="text-sm sm:text-base text-gray-700 text-center">
          Você está logado como colaborador da empresa <strong>{companyName}</strong>
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
