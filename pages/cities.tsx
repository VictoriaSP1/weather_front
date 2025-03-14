import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { getResponse } from '../src/services/api';
import { CITIESDATA } from '../src/interfaces/cities';
import WeatherCard from '../src/components/WeatherCard';
import { HeaderBar } from '../src/components/HeaderBar';

export default function Home() {
  const { data: session } = useSession();
  const [cities, setCities] = useState<CITIESDATA[]>([]);
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split('T')[0]; // Solo año-mes-día (YYYY-MM-DD)

  const getCities = async () => {
    try {
      const url = 'api/favorite_cities/';
      const response = await getResponse(url);
      setCities(response);
      console.log('response:', response);
    } catch (error) {
      console.error('Ha ocurrido un error: ', error);
    }
  };

  useEffect(() => {
    getCities();
  }, []);

  return (
    <div>
      <HeaderBar />
      <Typography variant="h2" align="center" marginBottom={'3rem'} marginTop={'1rem'}>
        Ciudades Populares
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" padding={2}>
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
          gap={4}
          width="100%"
          sx={{ maxWidth: '1200px', margin: '0 auto' }} // Asegura que el contenido no se expanda demasiado
        >
          {cities.map((city) => (
            <WeatherCard key={city.id} city={city} currentDateString={currentDateString} />
          ))}
        </Box>
      </Box>
    </div>
  );
}
