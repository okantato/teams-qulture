import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';


export default function SuperadminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex font-mono bg-white text-black">
      <Navbar />
      <main className=" pt-20 flex-1 p-10 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Painel do Super Admin</h1>
        <p className="text-center">Você tem acesso total ao sistema.</p>

        <div className="flex flex-col gap-4 mt-6">
          <button
            onClick={() => navigate('/superadmin/companies')}
            className="px-6 py-3 bg-gray-600 border border-white-600 text-white rounded hover:bg-gray-700 transition"
          >
            Ver Empresas
          </button>
        </div>
      </main>
    </div>
  );
}
