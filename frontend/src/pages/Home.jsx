import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center font-mono px-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Bem-vindo ao TeamsQulture
      </h1>
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/admin/login')}
          className="bg-transparent border border-gray-300 font-semibold py-2 px-4 rounded hover:bg-white hover:text-black transition"
        >
          Acessar
        </button>
        <button
          onClick={() => navigate('/user/login')}
          className="bg-transparent border border-gray-300 font-semibold py-2 px-4 rounded hover:bg-white hover:text-black transition"
        >
          Cadastrar Empresa
        </button>
      </div>
    </div>
  );
}
