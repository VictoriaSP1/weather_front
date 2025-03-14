import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';


export const HeaderBar = () => {
  const { data: session } = useSession();


  return (
      <Box sx={{flex: 1, display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem', marginRight: '1rem'}}>
      {
        session ? (
          <>
          <Typography variant="body1" sx={{marginLeft:'1rem', flex: 1,}}>Sesión de {session.user.username}</Typography>
          <Button variant="contained" onClick={() => signOut()}>Cerrar sesión</Button>
          </>
        )
        :
        <>
        <Button href="/login" variant="contained" sx={{marginRight:'1rem'}}>Inicia sesión</Button>
        <Button href="/register" variant="contained">Registrate</Button>
        </>
      }
      </Box>
  );
}
