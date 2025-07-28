import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/userStore';
import Footer from '../../components/Footer';

export default function LoginAdmin() {
  const [email, setEmail] = useState('');
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/sessions', { email });
      const data = response.data;

      setUser(data);

      if (data.superadmin) {
        navigate('/superadmin/dashboard');
      } else if (data.admin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (error) {
      alert('Login inválido');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-black font-mono">
      {/* Conteúdo principal */}
      <main className="flex flex-col items-center justify-center flex-grow px-4 py-10">
        <div className="bg-white p-6 border border-gray-300 rounded w-full max-w-lg text-center shadow">
          <h2 className="text-xl mb-4 font-bold">Bem-vindo de volta ao TeamsQulture</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            className="w-full px-3 py-2 border rounded mb-4"
          />

          <div className="flex flex-col gap-2">
            <button
              onClick={handleLogin}
              className="bg-transparent border border-gray-300 font-semibold py-2 px-4 rounded hover:bg-white hover:text-black transition"
            >
              Entrar
            </button>

            <button
              onClick={() => navigate('/')}
              className="text-sm text-gray-500 hover:underline"
            >
              ← Voltar para a Home
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
