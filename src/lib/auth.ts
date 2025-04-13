import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { Role } from "@prisma/client";
import prisma from "@/lib/database/prisma";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  appName: "TaskCheck",
  baseURL: process.env.BETTER_AUTH_URL!,
  basePath: "/api/auth",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  // advanced: {
  //   cookiePrefix: "taskcheck",
  // },
  user: {
    additionalFields: {
      role: {
        type: "string",
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {},
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 300,
    },
  },
  callbacks: {
    async session({
      session,
      user,
    }: {
      session: Session;
      user: { id: string };
    }) {
      if (session.user && user) {
        session.user.id = user.id;

        const userWithRole = await prisma.user.findUnique({
          where: { id: user.id },
          select: { role: true },
        });

        if (userWithRole) {
          session.user.role = userWithRole.role as Role;
        }
      }
      return session;
    },
  },
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
