import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "@/lib/database/prisma";
import { admin as adminPlugin } from "better-auth/plugins";
import { ac, admin, aluno, professor, coordenador } from "@/lib/permissions";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  appName: "TaskCheck",
  baseURL:
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`),
  basePath: "/api/auth",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  advanced: {
    useSecureCookies: process.env.VERCEL_URL ? true : false,
  },
  socialProviders: {},
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 300,
    },
  },
  plugins: [
    adminPlugin({
      ac,
      defaultRole: "aluno",
      roles: {
        admin,
        aluno,
        professor,
        coordenador,
      },
    }),
    nextCookies(),
  ],
});

export type Session = typeof auth.$Infer.Session;
