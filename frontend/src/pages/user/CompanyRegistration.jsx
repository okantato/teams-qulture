import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CompanyRegistration() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:3000/companies', {
        company: { name },
      });
      navigate('/');
    } catch (err) {
      console.error(err.response?.data); 
      setError(
        err.response?.data?.errors?.[0] || 'Erro ao criar empresa. Tente novamente.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center font-mono px-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Cadastrar nova empresa
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="text"
          placeholder="Nome da empresa"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
