import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-black font-mono px-4">
      <main className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Bem-vindo ao
        </h1>
        <div className="flex items-center gap-2 mb-6">
          <img
            src="/logo.png"
            alt="Logo TeamsQulture"
            className="w-8 h-8 md:w-10 md:h-10"
          />
          <span className="text-2xl md:text-3xl font-bold">TeamsQulture</span>
        </div>
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
      </main>
      <Footer />
    </div>
  );
}