import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CompanyRegistration() {
  const [companyName, setCompanyName] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeePicture, setEmployeePicture] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Cria empresa
      const companyRes = await axios.post('http://localhost:3000/companies', {
        company: { name: companyName }
      });

      const companyId = companyRes.data.id;

      // 2. Cria colaborador admin vinculado à empresa
      await axios.post(`http://localhost:3000/companies/${companyId}/employees`, {
        employee: {
          name: employeeName,
          email: employeeEmail,
          picture: employeePicture,
          admin: true,
          superadmin: false
        }
      });

      // 3. Redireciona para dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError('Erro ao cadastrar empresa ou colaborador. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center font-mono px-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Cadastrar nova empresa
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="Nome da empresa"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />
        <input
          type="text"
          placeholder="Nome do colaborador"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />
        <input
          type="email"
          placeholder="Email do colaborador"
          value={employeeEmail}
          onChange={(e) => setEmployeeEmail(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />
        <input
          type="text"
          placeholder="URL da foto (opcional)"
          value={employeePicture}
          onChange={(e) => setEmployeePicture(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Cadastrar
        </button>

      <div>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Já tem uma conta?{' '}
          <a href="/admin/login" className="text-blue-600 hover:underline">
            Fazer login
          </a>
        </p>
      </div>
      </form>
    </div>
  );
}
