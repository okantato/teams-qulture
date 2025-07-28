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

  const getAdmins = (employees) => employees.filter((e) => e.admin);
  const getManagers = (employees) =>
    employees.filter((e) => employees.some((emp) => emp.manager_id === e.id));

  const isManager = (employee, all) =>
    all.some((e) => e.manager_id === employee.id);

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      <Navbar />

      <div className=" pt-20 flex flex-col items-center justify-start px-4 py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
          Lista de Empresas
        </h1>

        {/* Tabela para telas grandes */}
        <div className="hidden sm:block w-full max-w-4xl overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 rounded text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3 border">Nome</th>
                <th className="px-4 py-3 border">Colaboradores</th>
                <th className="px-4 py-3 border">Ações</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 border">{company.name}</td>
                  <td className="px-4 py-2 border text-center">{company.employees.length}</td>
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

        {/* Lista adaptada para mobile */}
        <div className="sm:hidden w-full max-w-md mx-auto space-y-4">
          {companies.map((company) => (
            <div key={company.id} className="border rounded p-4 shadow-sm bg-gray-50">
              <h2 className="text-base font-semibold">{company.name}</h2>
              <p className="text-sm text-gray-600 mb-2">
                Colaboradores: <strong>{company.employees.length}</strong>
              </p>
              <button
                className="w-full bg-blue-600 text-white text-sm py-2 rounded hover:bg-blue-700"
                onClick={() => handleOpenModal(company)}
              >
                Ver detalhes
              </button>
            </div>
          ))}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2 sm:px-4">
          <div className="bg-white text-black rounded-lg shadow p-4 sm:p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative font-mono">
            <h2 className="text-xl font-bold mb-4 text-center">
              Empresa: {selectedCompany.name}
            </h2>

            <div className="space-y-5 text-sm sm:text-base">
              {/* Admins */}
              <div>
                <h3 className="font-semibold">Admins:</h3>
                <ul className="list-disc list-inside">
                  {getAdmins(selectedCompany.employees).map((admin) => (
                    <li key={admin.id}>{admin.name} - {admin.email}</li>
                  ))}
                  {getAdmins(selectedCompany.employees).length === 0 && (
                    <p className="text-gray-500">Nenhum admin definido.</p>
                  )}
                </ul>
              </div>

              {/* Gestores */}
              <div>
                <h3 className="font-semibold">Gestores:</h3>
                <ul className="list-disc list-inside">
                  {getManagers(selectedCompany.employees).map((manager) => (
                    <li key={manager.id}>{manager.name} - {manager.email}</li>
                  ))}
                  {getManagers(selectedCompany.employees).length === 0 && (
                    <p className="text-gray-500">Nenhum gestor definido.</p>
                  )}
                </ul>
              </div>

              {/* Todos os Colaboradores */}
              <div>
                <h3 className="font-semibold">Todos os Colaboradores:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {selectedCompany.employees.map((emp) => (
                    <li key={emp.id}>
                      <span className="font-semibold">{emp.name}</span> - {emp.email}
                      <span className="ml-2 text-xs">
                        {emp.admin && (
                          <span className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded ml-1">Admin</span>
                        )}
                        {isManager(emp, selectedCompany.employees) && (
                          <span className="bg-green-200 text-green-800 px-2 py-0.5 rounded ml-1">Gestor</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={handleCloseModal}
                className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 w-full sm:w-auto"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
