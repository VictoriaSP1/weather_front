import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useState } from 'react';
import { CITIESDATA } from '../interfaces/cities';


interface WeatherCardProps {
  city: CITIESDATA;
  currentDateString: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, currentDateString }) => {
  const [expanded, setExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric', // Año completo
      month: 'long', // Mes completo
      day: 'numeric', // Día del mes
    });
  };

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
     <Card
                key={city.id}
                sx={{
                  maxWidth: 345,
                  width: '100%',
                  marginBottom: '2rem',
                  borderWidth: 1,
                  borderColor: 'black',
                  border: 1,
                  backgroundColor: '#87CEEB', // Color de fondo (cielo azul)
                  borderRadius: '20px', // Bordes redondeados
                  cursor: 'pointer',
                }}
                onClick={() => handleClick()} 
              >
                {expanded ? (
                  // Mostrar contenido expandido solo para la tarjeta seleccionada
                  <CardContent sx={{ backgroundColor: '#f0f0f0', color: 'black', height: '100%' }}>
                    <Typography textAlign="center" variant="h6" fontWeight="bold" marginBottom={'.4rem'}>
                      Previsiones para los próximos 5 días
                    </Typography>
                    <Typography textAlign="center" fontWeight="bold" marginBottom={'.5rem'}>
                      {city.city_name}
                    </Typography>
                    {city.weather
                      .filter((item) => !item.fecha.includes(currentDateString)) // Filtrar solo las fechas que no son hoy
                      .map((item, subIndex) => (
                        <div key={city.id}>
                          <Typography textAlign="left" variant="body2" fontWeight="bold" marginBottom={'.4rem'}>
                            Fecha: {formatDate(item.fecha)}
                          </Typography>
                          <Typography textAlign="left" variant="body2" fontWeight="bold" marginBottom={'.4rem'}>
                            Temperatura máxima: {item.temperatura_maxima}°
                          </Typography>
                          <Typography textAlign="left" variant="body2" fontWeight="bold" marginBottom={'.4rem'}>
                            Temperatura mínima: {item.temperatura_minima}°
                          </Typography>
                          <Typography textAlign="left" variant="body2" fontWeight="bold" marginBottom={'1.5rem'}>
                            Pronóstico: {item.clima.charAt(0).toUpperCase() + item.clima.slice(1)}
                          </Typography>
                        </div>
                      ))}
                  </CardContent>
                ) : (
                  // Mostrar solo el contenido básico cuando la tarjeta no está expandida
                  <>
                    <CardMedia
                    key={city.id}
                      sx={{
                        flex: 1,
                        objectFit: 'initial',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 'auto',
                        width: 'auto',
                      }}
                      component="img"
                      src={city.weather.find((item) => item.fecha.includes(currentDateString))?.icon}
                      alt="weather icon"
                    />
                    <CardContent sx={{ backgroundColor: '#f0f0f0', color: 'black', height: '100%' }}>
                      <Typography textAlign="right" variant="body2" color="grey" marginBottom={'.4rem'}>
                        {(Number(city.popularity) * 100).toFixed(2)}% de popularidad
                      </Typography>
                      <Typography textAlign="center" fontWeight="bold" marginBottom={'.4rem'}>
                        {city.city_name}
                      </Typography>
                      <Typography textAlign="center" variant="body2" fontWeight="bold" marginBottom={'.4rem'}>
                        Temperatura actual: {city.weather.find((item) => item.fecha.includes(currentDateString)).temperatura_actual}°
                      </Typography>
                      <Typography textAlign="center" variant="body2" fontWeight="bold" marginBottom={'.4rem'}>
                        Pronóstico: {city.weather.find((item) => item.fecha.includes(currentDateString)).clima.charAt(0).toUpperCase() + city.weather.find((item) => item.fecha.includes(currentDateString)).clima.slice(1)}
                      </Typography>
                    </CardContent>
                  </>
                )}
              </Card>
  );
};

export default WeatherCard;
