import { useEffect, useState } from 'react';
import axios from 'axios';
import LostPetCard from './LostPetCard';

function LostPetList() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5155/api/LostPets')
      .then(response => setPets(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
      {pets.map(pet => <LostPetCard key={pet.id} pet={pet} />)}
    </div>
  );
}

export default LostPetList;
