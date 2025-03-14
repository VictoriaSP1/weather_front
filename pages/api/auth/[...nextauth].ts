// pages/api/auth/[...nextauth].ts

import NextAuth, { DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    username: string;
  }
}


export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { username, password } = credentials!;

        if (username === 'admin' && password === 'admin123') {
          return { id: '1', username }; 
        }

        // Si no es válido, retorna null
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Página personalizada para el inicio de sesión
  },
  session: {
    strategy: 'jwt', // Usamos JWT para manejar las sesiones
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.username = token.username as string;
      return session;
    },
  },
});
