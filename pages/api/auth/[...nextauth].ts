import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

import type { NextAuthOptions } from 'next-auth'
import type { NextApiRequest, NextApiResponse } from 'next'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 365 * 24 * 60 * 60
  },
  theme: {
    colorScheme: "light"},
};

const authHandler = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, authOptions);
};
export default authHandler;
