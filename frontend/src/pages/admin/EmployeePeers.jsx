import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';

export default function EmployeePeers() {
  const { id, company_id } = useParams();
  const navigate = useNavigate();

  const [peers, setPeers] = useState([]);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [peersRes, employeeRes] = await Promise.all([
          axios.get(`http://localhost:3000/companies/${company_id}/employees/${id}/peers`),
          axios.get(`http://localhost:3000/companies/${company_id}/employees`),
        ]);

        setPeers(peersRes.data);
        const emp = employeeRes.data.find((e) => e.id === parseInt(id));
        setEmployee(emp);
      } catch (err) {
        console.error('Erro ao buscar pares:', err);
      }
    }

    fetchData();
  }, [id, company_id]);

  return (
    <div className="min-h-screen bg-white text-black font-mono px-4">
      <Navbar />
      <div className="max-w-2xl mx-auto pt-24">
        <h1 className="text-2xl font-bold mb-4">
          Pares de {employee?.name || 'Colaborador'}
        </h1>

        {peers.length === 0 ? (
          <p className="text-gray-600">Este colaborador não possui pares.</p>
        ) : (
          <ul className="border rounded divide-y">
            {peers.map((peer) => (
              <li key={peer.id} className="p-3">
                <p className="font-semibold">{peer.name}</p>
                <p className="text-sm text-gray-600">{peer.email}</p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
