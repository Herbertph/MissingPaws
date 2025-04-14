import PropTypes from 'prop-types';

function LostPetCard({ pet }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-center py-2 font-semibold">
          {pet.status || "Perdido"}
        </div>
        <img 
          src={pet.imageUrl} 
          alt={pet.name} 
          className="w-full h-64 object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{pet.name}</h3>
          <div className="flex items-center">
            <span className="text-gray-500 text-sm">
              {new Date(pet.missingDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        <p className="text-gray-600 mt-2">{pet.lastSeenLocation}</p>
        <div className="mt-4">
          <a 
            href={`tel:${pet.contactInfo}`}
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            {pet.contactInfo}
          </a>
        </div>
      </div>
    </div>
  );
}

LostPetCard.propTypes = {
  pet: PropTypes.shape({
    name: PropTypes.string.isRequired,
    status: PropTypes.string,
    imageUrl: PropTypes.string.isRequired,
    missingDate: PropTypes.string.isRequired,
    lastSeenLocation: PropTypes.string.isRequired,
    contactInfo: PropTypes.string.isRequired,
  }).isRequired,
};

export default LostPetCard;
  