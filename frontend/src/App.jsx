import { useEffect, useState } from 'react';
import axios from 'axios';
import LostPetCard from './components/LostPetCard';

function App() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7006/api/LostPets') // troque PORT pela porta real da sua API
      .then(response => setPets(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">🐾 Pets Perdidos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pets.map(pet => <LostPetCard key={pet.id} pet={pet} />)}
      </div>
    </div>
  );
}

export default App;
