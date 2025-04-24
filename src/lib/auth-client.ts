import { createAuthClient } from "better-auth/react";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "@/lib/auth";
import { ac, admin, aluno, coordenador, professor } from "@/lib/permissions";
export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`),
  plugins: [
    adminClient({
      ac,
      defaultRole: "aluno",
      roles: {
        admin,
        aluno,
        professor,
        coordenador,
      },
    }),
    inferAdditionalFields<typeof auth>(),
  ],
});

export const { useSession, signIn, signOut, getSession } = authClient;
export type Session = typeof authClient.$Infer.Session;
export type User = (typeof authClient.$Infer.Session)["user"];
