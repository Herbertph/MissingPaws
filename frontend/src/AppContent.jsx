import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LostPetList from './components/LostPetList';
import NewPetForm from './components/NewPetForm';
import AdminPanel from './components/AdminPanel';
import axios from 'axios';
import './App.css';

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    setIsAuthenticated(isAdmin);
  }, []);

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

  return (
    <div className="container">
      <div className="container">
        <header>
          <div className="logo">
            <span style={{ fontSize: '28px' }}>🐾</span>
            <strong style={{ marginLeft: '10px', fontSize: '20px', color: '#333' }}>MissingPaws</strong>
          </div>
          <button onClick={handleLogin} className="admin-button">
            Admin
          </button>
        </header>

        <section className="hero">
          <div className="text">
            <h2>Help reunite lost pets with their families</h2>
            <p>MissingPaws is a platform made with love to help reconnect lost pets with their owners. Anyone can register a pet that has been seen or lost. Together, we can make a difference.</p>
          </div>
          <img
            src="./logo.png"
            alt="Ilustração de pet"
          />
        </section>

        <section className="pet-section">
          <h2>Lost Pets</h2>
          <div className="pet-grid">
            <LostPetList />
          </div>
        </section>

        <section>
          <NewPetForm />
        </section>

        <footer>
          © 2025 MissingPaws. Todos os direitos reservados.
        </footer>

        <Routes>
          <Route path="/admin" element={isAuthenticated ? <AdminPanel /> : <Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default AppContent;
