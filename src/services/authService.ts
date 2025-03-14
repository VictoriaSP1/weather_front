
import axios from 'axios';

const API_URL = '/api';  // Cambia esto según tu configuración

// Registro de usuario
export const register = (username: string, password: string) => {
    return new Promise<Response>((resolve, reject) => {
      // Simulamos una validación y almacenamiento en localStorage
      const existingUser = localStorage.getItem(username);
      if (existingUser) {
        reject(new Error('El usuario ya está registrado.'));
      } else {
        // Simulamos guardar el usuario en localStorage
        const user = { username, password };
        localStorage.setItem(username, JSON.stringify(user));
        resolve(new Response(JSON.stringify({ message: 'Usuario registrado exitosamente.' }), { status: 200 }));
      }
    });
  };
  

// Inicio de sesión de usuario
export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Cerrar sesión
export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
