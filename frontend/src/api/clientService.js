import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1/clients'
});

export default {
  async getAll(params = {}) {
    const response = await api.get('/', { params });
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/${id}`);
    return response.data;
  },

  async create(client) {
    const response = await api.post('/', client);
    return response.data;
  },

  async update(id, client) {
    const response = await api.put(`/${id}`, client);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/${id}`);
    return response.data;
  },

  async searchCEP(cep) {
    cep = cep.replace(/\D/g, '');
    if (!cep) return null;

    const viaCepUrl = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await axios.get(viaCepUrl);
    return response.data;
  }
};
