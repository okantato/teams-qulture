import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-black font-mono flex flex-col items-center justify-center px-4">
      <Navbar />
      <h1 className=" pt-20 font-mono text-3xl font-bold mb-4">Painel do Usuário</h1>
      <p className="mb-6 text-center">Você está logado como usuário comum.</p>
      <button
        onClick={() => navigate('/')}
        className="text-sm text-gray-600 hover:underline"
      >
        ← Voltar para a Home
      </button>
    </div>
  );
}
