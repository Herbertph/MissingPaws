import { useEffect, useState } from 'react';
import axios from 'axios';
import LostPetCard from './components/LostPetCard';
import NewPetForm from './components/NewPetForm';
import AdminPanel from './components/AdminPanel';

function App() {
  const [pets, setPets] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // 👈 controle da tela

  useEffect(() => {
    if (!isAdmin) {
      axios.get('http://localhost:5155/api/LostPets')
        .then(response => setPets(response.data))
        .catch(err => console.error(err));
    }
  }, [isAdmin]); // 👈 recarrega apenas se for tela pública

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🐾 MissingPaws</h1>
        <button
          onClick={() => setIsAdmin(prev => !prev)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isAdmin ? 'Voltar ao site público' : 'Acessar Admin'}
        </button>
      </header>

      {isAdmin ? (
        <AdminPanel />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {pets.map(pet => <LostPetCard key={pet.id} pet={pet} />)}
          </div>

          <NewPetForm />
        </>
      )}
    </div>
  );
}

export default App;
