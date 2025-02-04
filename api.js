import axios from 'axios';

const API_URL = 'http://localhost:1337/api'; // Remplace par ton URL en prod

export const registerUser = async (email, password, username) => {
  try {
    const response = await axios.post(`${API_URL}/auth/local/register`, {
      username,
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l’inscription', error.response?.data);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/local`, {
      identifier: email, // Strapi utilise "identifier" au lieu de "email"
      password
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la connexion', error.response?.data);
    throw error;
  }
};