import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/companies')
      .then((res) => setCompanies(res.data))
      .catch((err) => console.error('Erro ao buscar empresas:', err));
  }, []);

  const handleOpenModal = (company) => {
    setSelectedCompany(company);
  };

  const handleCloseModal = () => {
    setSelectedCompany(null);
  };

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      <Navbar />

      <div className="flex flex-col items-center justify-start px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Lista de Empresas
        </h1>

        <div className="w-full max-w-4xl overflow-x-auto">
          <table className="w-full table-auto border border-gray-300 rounded">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3 border">ID</th>
                <th className="px-4 py-3 border">Nome</th>
                <th className="px-4 py-3 border">Funcionários</th>
                <th className="px-4 py-3 border">Ações</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 border">{company.id}</td>
                  <td className="px-4 py-2 border">{company.name}</td>
                  <td className="px-4 py-2 border">{company.employees.length}</td>
                  <td className="px-4 py-2 border">
                    <button
                      className="text-blue-600 hover:underline text-sm"
                      onClick={() => handleOpenModal(company)}
                    >
                      Ver detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={() => navigate('/superadmin/dashboard')}
          className="mt-6 text-sm text-gray-600 hover:underline"
        >
          ← Voltar para o Dashboard
        </button>
      </div>

      {/* Modal de detalhes */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg shadow p-6 w-full max-w-lg font-mono">
            <h2 className="text-xl font-bold mb-4">
              Empresa: {selectedCompany.name}
            </h2>

            <p className="mb-2">
              <strong>Admin:</strong>{' '}
              {
                selectedCompany.employees.find(
                  (e) => e.id === selectedCompany.main_manager_id
                )?.name || 'Não definido'
              }
            </p>

            <div className="mb-4">
              <h3 className="font-semibold">Funcionários:</h3>
              <ul className="list-disc list-inside">
                {selectedCompany.employees.map((e) => (
                  <li key={e.id}>
                    {e.name} - {e.email}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleCloseModal}
              className="mt-4 bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
