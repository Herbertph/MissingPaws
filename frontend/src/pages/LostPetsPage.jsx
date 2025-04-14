import { useState, useEffect } from 'react';
import axios from 'axios';
import LostPetCard from '../components/LostPetCard';

function LostPetsPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get('http://localhost:5155/api/LostPets');
        setPets(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar os pets. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Achados e Perdidos</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Pets anunciados em São Paulo</span>
            <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
              Ver na minha região
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pets.map((pet) => (
            <LostPetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LostPetsPage; 