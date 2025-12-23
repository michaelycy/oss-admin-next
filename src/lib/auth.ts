import 'dotenv/config';
import NextAuth, { type NextAuthOptions } from 'next-auth';
// import { PrismaAdapter } from '@auth/prisma-adapter';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
// import CredentialsProvider from 'next-auth/providers/credentials';
import GitLabProvider from 'next-auth/providers/gitlab';
import { db } from '@/server/db/db';
// import bcrypt from 'bcryptjs';
// import type { IUser } from '@/types/auth';

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  providers: [
    GitLabProvider({
      clientId: process.env.GITLAB_CLIENT_ID!,
      clientSecret: process.env.GITLAB_CLIENT_SECRET!,
    }),
    // CredentialsProvider({
    //   name: 'credentials',
    //   credentials: {
    //     username: { label: 'Username', type: 'text' },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials?.username || !credentials?.password) {
    //       return null;
    //     }

    //     // const user = await prisma.user.findUnique({
    //     //   where: {
    //     //     email: credentials.email as string,
    //     //   },
    //     // });

    //     // if (!user || !user.password) {
    //     //   return null;
    //     // }

    //     // const isPasswordValid = await bcrypt.compare(credentials.password as string, user.password);

    //     // if (!isPasswordValid) {
    //     //   return null;
    //     // }

    //     // return {
    //     //   id: user.id,
    //     //   email: user.email,
    //     //   name: user.name,
    //     //   role: user.role,
    //     //   image: user.image,
    //     // };

    //     if (credentials.username === 'sange' && credentials.password === '123456') {
    //       return null;
    //     }

    //     return {
    //       id: '1',
    //       email: 'test',
    //       username: 'sange',
    //       role: 'admin',
    //       image: 'test',
    //     };
    //   },
    // }),
  ],
  // session: {
  //   strategy: 'jwt',
  // },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       // token.role = (user as IUser).role;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     if (token) {
  //       // session.user.id = token.sub!;
  //       // session.user.role = token.role as UserRole;
  //     }
  //     return session;
  //   },
  // },
  // pages: {
  //   // signIn: '/login',
  //   // newUser: '/register',
  // },
};

const authConf = NextAuth(authOptions);

export const handlers = authConf;
