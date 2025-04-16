import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LostPetList from './components/LostPetList';
import NewPetForm from './components/NewPetForm';
import AdminPanel from './components/AdminPanel';

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const password = prompt('Digite a senha de administrador:');

    try {
      await axios.post('http://localhost:5155/api/auth/admin-login', JSON.stringify(password), {
        headers: { 'Content-Type': 'application/json' }
      });

      localStorage.setItem('isAdmin', 'true');
      setIsAuthenticated(true);
      navigate('/admin');
    } catch (err) {
      alert('Senha incorreta ou erro ao autenticar.');
    }
  };

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    setIsAuthenticated(isAdmin);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🐾 MissingPaws</h1>
        <div className="flex gap-2">
          <a
            href="/"
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Página Inicial
          </a>
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Admin
          </button>
        </div>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <LostPetList />
              <NewPetForm />
            </>
          }
        />
        <Route
          path="/admin"
          element={isAuthenticated ? <AdminPanel /> : <Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
}

export default AppContent;
