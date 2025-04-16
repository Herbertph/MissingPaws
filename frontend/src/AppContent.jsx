// AppContent.jsx
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LostPetList from './components/LostPetList';
import NewPetForm from './components/NewPetForm';
import AdminPanel from './components/AdminPanel';
import axios from 'axios';

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
    <div className="main-container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          {/*<span role="img" aria-label="paw">🐾</span>*/}
          <h1>MissingPaws</h1>
        </div>
        <button onClick={handleLogin}>Admin</button>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-text">
          <h2>Ajude a reunir pets perdidos com suas famílias</h2>
          <p>MissingPaws é uma plataforma feita com amor para facilitar o reencontro entre pets perdidos e seus donos. Qualquer pessoa pode cadastrar um pet visto ou perdido. Juntos podemos fazer a diferença.</p>
        </div>
        {/*<div className="hero-image">
          <img src="https://cdn-icons-png.flaticon.com/512/616/616408.png" alt="Ilustração de pet" />
        </div>*/}
      </section>

      {/* Pet List */}
      <section className="pet-section">
        <h2>Pets Cadastrados</h2>
        <LostPetList />
      </section>

      {/* Formulário */}
      <section className="form-section">
        <NewPetForm />
      </section>

      {/* Footer */}
      <footer className="footer">
        © 2025 MissingPaws. Todos os direitos reservados.
      </footer>

      <Routes>
        <Route path="/admin" element={isAuthenticated ? <AdminPanel /> : <Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default AppContent;