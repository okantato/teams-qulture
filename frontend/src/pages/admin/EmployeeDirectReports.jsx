import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';

export default function EmployeeDirectReports() {
  const { company_id, id } = useParams();
  const [reports, setReports] = useState([]);
  const [manager, setManager] = useState(null); // 👈 Novo estado

  useEffect(() => {
    // Buscar dados do gestor
    axios
      .get(`http://localhost:3000/companies/${company_id}/employees/${id}`)
      .then((res) => setManager(res.data))
      .catch((err) => console.error('Erro ao buscar gestor:', err));

    // Buscar liderados
    axios
      .get(`http://localhost:3000/companies/${company_id}/employees/${id}/direct_reports`)
      .then((res) => setReports(res.data))
      .catch((err) => console.error('Erro ao buscar liderados diretos:', err));
  }, [company_id, id]);

  return (
    <div className="min-h-screen bg-white text-black font-mono px-4">
      <Navbar />
      <div className="max-w-2xl mx-auto pt-24">
        <h1 className="text-2xl font-bold mb-4">Liderados Diretos</h1>

        {manager && (
          <div className="mb-6 border p-4 rounded bg-gray-100">
            <p className="text-sm text-gray-600">Gestor:</p>
            <p className="font-semibold text-lg">{manager.name}</p>
            <p className="text-sm text-gray-600">{manager.email}</p>
          </div>
        )}

        {reports.length === 0 ? (
          <p className="text-gray-600">Nenhum liderado encontrado.</p>
        ) : (
          <ul className="border rounded divide-y">
            {reports.map((emp) => (
              <li key={emp.id} className="p-3">
                <p className="font-semibold">{emp.name}</p>
                <p className="text-sm text-gray-600">{emp.email}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
