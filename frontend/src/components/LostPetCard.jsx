function LostPetCard({ pet }) {
    return (
      <div className="bg-white shadow-md rounded p-4 mb-4 max-w-md">
        <img src={pet.imageUrl} alt={pet.name} className="w-full h-48 object-cover rounded mb-2" />
        <h2 className="text-xl font-bold">{pet.name}</h2>
        <p><strong>Data:</strong> {new Date(pet.missingDate).toLocaleDateString()}</p>
        <p><strong>Última localização:</strong> {pet.lastSeenLocation}</p>
        <p><strong>Contato:</strong> {pet.contactInfo}</p>
      </div>
    );
  }
  
  export default LostPetCard;
  