import { createAccessControl } from "better-auth/plugins/access";

const statement = {
  user: [
    "create",
    "list",
    "set-role",
    "ban",
    "impersonate",
    "delete",
    "set-password",
  ],
  session: ["list", "revoke", "delete"],
  report: ["create", "list", "update", "delete"],
  category: ["create", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const aluno = ac.newRole({
  report: ["create", "list", "update", "delete"],
});

export const professor = ac.newRole({
  report: ["create", "list", "update", "delete"],
});

export const coordenador = ac.newRole({
  category: ["create", "update", "delete"],
});

export const admin = ac.newRole({
  user: [
    "create",
    "list",
    "set-role",
    "ban",
    "impersonate",
    "delete",
    "set-password",
  ],
  session: ["list", "revoke", "delete"],
  report: ["create", "list", "update", "delete"],
  category: ["create", "update", "delete"],
});
