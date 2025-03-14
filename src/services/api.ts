import axios from 'axios';
import { CITIESDATA } from '../interfaces/cities';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
      }
  });
  
export const getResponse = async (urlParams: string): Promise<CITIESDATA[]> => {
  try {
    const response = await api.get<CITIESDATA[]>(urlParams);
    return response.data;  
  } catch (error) {
    console.log("Ha ocurrido un error al llamar los endpoints: ", error);
    throw error;
  }
};
