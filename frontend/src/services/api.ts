// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendMessage = async (message: string) => {
  try {
    const response = await api.post('/api/groq', { message });
    return response.data.response;
  } catch (error) {
    console.error('Error sending message to API:', error);
    throw error;
  }
};

export default api;
