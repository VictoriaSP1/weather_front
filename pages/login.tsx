import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Input, Typography, Paper } from '@mui/material';

const SignInPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirigir si ya está logueado
  if (status === 'authenticated') {
    router.push('/cities'); // Redirige a la página principal
  }

  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      username: credentials.username,
      password: credentials.password,
    });

    if (res?.error) {
      console.log('Error:', res.error);
      setError('Credenciales incorrectas');
    } else {
      router.push('/cities'); // Redirigir a la página principal si es exitoso
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
          Iniciar sesión
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <Typography variant="body1">Usuario</Typography>
            <Input
              placeholder="Usuario"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
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
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
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
            Iniciar sesión
          </Button>
          {error && <Typography color="red" sx={{ textAlign: 'center' }}>{error}</Typography>}
        </form>
      </Paper>
    </Box>
  );
};

export default SignInPage;
