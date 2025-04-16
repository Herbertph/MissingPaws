import { useEffect, useState } from 'react';
import LostPetCard from './LostPetCard';

function LostPetList() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5155/api/LostPets')
      .then(res => res.json())
      .then(data => setPets(data))
      .catch(err => console.error('Erro ao buscar pets:', err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {pets.map(pet => (
        <LostPetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
}

export default LostPetList;
