import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import useUserStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';

export default function AdminEmployeesPage() {
  const user = useUserStore((state) => state.user);
  const companyId = user?.company_id;
  const companyName = user?.company_name || 'sua empresa';
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    picture: '',
    manager_id: '',
  });
  const [isManager, setIsManager] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showManagersOnly, setShowManagersOnly] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    if (companyId) fetchEmployees();
  }, [companyId]);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/companies/${companyId}/employees`);
      setEmployees(res.data);
    } catch (err) {
      console.error('Erro ao buscar funcionários:', err);
    }
  };

  const handleChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post(`http://localhost:3000/companies/${companyId}/employees`, {
        employee: {
          ...newEmployee,
          manager_id: isManager ? null : newEmployee.manager_id || null,
          admin: false,
          superadmin: false,
        },
      });

      setNewEmployee({ name: '', email: '', picture: '', manager_id: '' });
      setIsManager(false);
      setShowModal(false);
      fetchEmployees();
    } catch (err) {
      console.error(err);
      setError('Erro ao criar colaborador');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/companies/${companyId}/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error('Erro ao deletar colaborador:', err);
    }
  };

  const getReportsForManager = (managerId) => {
    return employees.filter((e) => e.manager_id === managerId);
  };

  return (
    <div className="min-h-screen bg-white text-black font-mono px-4">
      <Navbar />

      <div className="max-w-3xl mx-auto pt-24 space-y-8 pb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">
          Colaboradores da Empresa ({companyName})
        </h1>

        <div className="text-center mb-4">
          <button
            onClick={() => setShowManagersOnly(!showManagersOnly)}
            className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
          >
            {showManagersOnly ? 'Mostrar todos' : 'Mostrar apenas gestores'}
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3 text-center sm:text-left">Lista:</h2>
          <ul className="border rounded divide-y">
            {(showManagersOnly
              ? employees.filter((emp) => employees.some((e) => e.manager_id === emp.id))
              : employees
            ).map((emp) => (
              <li key={emp.id} className="flex justify-between items-center p-3 flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <p className="font-semibold flex items-center gap-2 flex-wrap">
                    {emp.name}
                    {emp.admin && (
                      <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded">
                        Admin
                      </span>
                    )}
                    {employees.some((e) => e.manager_id === emp.id) && (
                      <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded">
                        Gestor
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600">{emp.email}</p>
                  {emp.manager_id && (
                    <p className="text-xs text-gray-500">
                      Gestor: {employees.find((m) => m.id === emp.manager_id)?.name || 'N/A'}
                    </p>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  {!emp.admin && employees.some((e) => e.manager_id === emp.id) && (
                    <button
                      onClick={() => {
                        setSelectedManager(emp);
                        setShowReportModal(true);
                      }}
                      className="text-sm text-green-600 hover:underline"
                    >
                      Funcionários Atribuídos
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            + Adicionar Colaborador
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white text-black rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4 text-center">Novo Colaborador</h2>
              <form onSubmit={handleCreate} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Nome"
                  value={newEmployee.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={newEmployee.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
                <input
                  type="text"
                  name="picture"
                  placeholder="URL da imagem (opcional)"
                  value={newEmployee.picture}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isManager}
                    onChange={(e) => setIsManager(e.target.checked)}
                  />
                  <span>Este colaborador será um gestor</span>
                </label>

                <select
                  name="manager_id"
                  value={newEmployee.manager_id}
                  onChange={handleChange}
                  disabled={isManager}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                >
                  <option value="">Sem gestor</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name}
                    </option>
                  ))}
                </select>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setError('');
                      setNewEmployee({ name: '', email: '', picture: '', manager_id: '' });
                      setIsManager(false);
                    }}
                    className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                  >
                    Criar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showReportModal && selectedManager && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white text-black rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4 text-center">
                Funcionários de {selectedManager.name}
              </h2>
              <ul className="divide-y">
                {getReportsForManager(selectedManager.id).map((emp) => (
                  <li key={emp.id} className="py-2">
                    <p className="font-semibold">{emp.name}</p>
                    <p className="text-sm text-gray-600">{emp.email}</p>
                  </li>
                ))}
              </ul>
              <div className="text-center mt-4">
                <button
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
