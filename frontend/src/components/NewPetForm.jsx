import { useState } from 'react';
import axios from 'axios';

function NewPetForm() {
  const [formData, setFormData] = useState({
    name: '',
    missingDate: '',
    lastSeenLocation: '',
    contactInfo: '',
    imageUrl: ''
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        isApproved: false,
        missingDate: new Date(formData.missingDate).toISOString() // garante UTC
      };

      // remove id caso venha por erro externo
      delete payload.id;

      await axios.post('http://localhost:5155/api/LostPets', payload);

      setSuccess(true);
      setFormData({
        name: '',
        missingDate: '',
        lastSeenLocation: '',
        contactInfo: '',
        imageUrl: ''
      });
    } catch (error) {
      console.error('Erro ao salvar pet:', error);
      alert("Erro ao enviar pet perdido.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register Lost Pet</h2>

      {success && (
        <p className="bg-green-100 text-green-800 p-2 rounded mb-4">
          Registered successfully! Wait for approval.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Nome do pet"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="missingDate"
          type="date"
          value={formData.missingDate}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="lastSeenLocation"
          placeholder="Última localização"
          value={formData.lastSeenLocation}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="contactInfo"
          placeholder="Informações de contato"
          value={formData.contactInfo}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="imageUrl"
          placeholder="URL da imagem"
          value={formData.imageUrl}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded "
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default NewPetForm;
