import { useEffect, useState } from "react";
import axios from "axios";

function AdminPanel() {
  const [unapprovedPets, setUnapprovedPets] = useState([]);

  const fetchUnapproved = async () => {
    try {
      const response = await axios.get("http://localhost:5155/api/LostPets/unapproved");
      setUnapprovedPets(response.data);
    } catch (err) {
      console.error("Erro ao buscar pets não aprovados:", err);
    }
  };

  const approvePet = async (id) => {
    try {
      await axios.put(`http://localhost:5155/api/LostPets/approve/${id}`);
      fetchUnapproved();
    } catch (err) {
      console.error("Erro ao aprovar pet:", err);
    }
  };

  const deletePet = async (id) => {
    try {
      await axios.delete(`http://localhost:5155/api/LostPets/${id}`);
      fetchUnapproved();
    } catch (err) {
      console.error("Erro ao deletar pet:", err);
    }
  };

  useEffect(() => {
    fetchUnapproved();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">Painel de Aprovação de Pets</h2>

      {unapprovedPets.length === 0 ? (
        <p className="text-gray-600">Nenhum pet aguardando aprovação.</p>
      ) : (
        <div className="space-y-4">
          {unapprovedPets.map((pet) => (
            <div key={pet.id} className="bg-white p-4 shadow rounded flex items-center gap-4">
              <img src={pet.imageUrl} alt={pet.name} className="w-24 h-24 object-cover rounded" />
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{pet.name}</h3>
                <p className="text-sm text-gray-600">Visto em: {pet.lastSeenLocation}</p>
                <p className="text-sm text-gray-600">Contato: {pet.contactInfo}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => approvePet(pet.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Aprovar
                </button>
                <button
                  onClick={() => deletePet(pet.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
