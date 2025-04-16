function LostPetCard({ pet }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 h-full">
      <img src={pet.imageUrl || 'https://via.placeholder.com/400x300'} 
           alt={pet.name} 
           className="w-full h-48 object-cover rounded mb-3" />
      <h2 className="text-xl font-bold text-gray-800 mb-2">{pet.name}</h2>
      <p className="text-gray-700 mb-1"><strong>Data:</strong> {new Date(pet.missingDate).toLocaleDateString()}</p>
      <p className="text-gray-700 mb-1"><strong>Última localização:</strong> {pet.lastSeenLocation}</p>
      <p className="text-gray-700"><strong>Contato:</strong> {pet.contactInfo}</p>
    </div>
  );
}

export default LostPetCard;
