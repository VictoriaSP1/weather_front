import { NextApiRequest, NextApiResponse } from 'next';

let users: { username: string; password: string }[] = []; // Aquí guardaremos temporalmente los usuarios.

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
    }

    // Verificar si el usuario ya existe
    const userExists = users.some(user => user.username === username);
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe.' });
    }

    // Registrar nuevo usuario
    users.push({ username, password });
    return res.status(201).json({ message: 'Usuario registrado exitosamente.' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
