import { useEffect, useState } from 'react';
import axios from 'axios';
import LostPetCard from './components/LostPetCard';
import NewPetForm from './components/NewPetForm';

function App() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5155/api/LostPets')
      .then(response => setPets(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🐾 Pets Perdidos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {pets.map(pet => <LostPetCard key={pet.id} pet={pet} />)}
      </div>

      <NewPetForm />
    </div>
  );
}

export default App;
