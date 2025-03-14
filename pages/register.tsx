import { useState } from 'react';
import { useRouter } from 'next/router';
import { register } from '../src/services/authService';
import { Box, Button, Input, Typography, Paper } from '@mui/material';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await register(username, password);
      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        router.push('/login'); // Redirige al login si el registro fue exitoso
      }
    } catch (error) {
      setError(error.message || 'Ocurrió un error al registrar.');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      padding={2}
      sx={{
        '@media (max-width:600px)': {
          padding: 1, // Reduce el padding para pantallas pequeñas
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '2rem',
          width: '100%',
          maxWidth: '400px',
          '@media (max-width:600px)': {
            maxWidth: '100%', // Deja que ocupe todo el ancho en pantallas pequeñas
            padding: '1rem', // Reduce el padding para pantallas pequeñas
          },
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: '1rem', textAlign: 'center' }}>
          Registrarse
        </Typography>
        <form onSubmit={handleRegister}>
          <Box mb={2}>
            <Typography variant="body1">Usuario</Typography>
            <Input
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
              sx={{ marginBottom: '1rem' }}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="body1">Contraseña</Typography>
            <Input
              placeholder="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              sx={{ marginBottom: '1rem' }}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginBottom: '1rem',
              '@media (max-width:600px)': {
                padding: '10px', // Ajuste en botones para pantallas pequeñas
              },
            }}
          >
            Registrar
          </Button>
          {error && <Typography color="red" sx={{ textAlign: 'center' }}>{error}</Typography>}
          {success && <Typography color="green" sx={{ textAlign: 'center' }}>{success}</Typography>}
        </form>
      </Paper>
    </Box>
  );
}
