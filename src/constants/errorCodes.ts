const ERROR_CODES = {
  // Auth/User
  USER_ALREADY_EXISTS: {
    pt_BR: "Usuário já cadastrado",
  },
  INVALID_EMAIL_OR_PASSWORD: {
    pt_BR: "Email ou senha inválidos",
  },
  USER_NOT_FOUND: {
    pt_BR: "Usuário não encontrado",
  },
  FAILED_TO_CREATE_USER: {
    pt_BR: "Falha ao criar usuário",
  },
  FAILED_TO_CREATE_SESSION: {
    pt_BR: "Falha ao criar sessão",
  },
  FAILED_TO_UPDATE_USER: {
    pt_BR: "Falha ao atualizar usuário",
  },
  FAILED_TO_GET_SESSION: {
    pt_BR: "Falha ao obter sessão",
  },
  INVALID_PASSWORD: {
    pt_BR: "Senha inválida",
  },
  INVALID_EMAIL: {
    pt_BR: "Email inválido",
  },
  SOCIAL_ACCOUNT_ALREADY_LINKED: {
    pt_BR: "Conta social já vinculada",
  },
  PROVIDER_NOT_FOUND: {
    pt_BR: "Provedor não encontrado",
  },
  INVALID_TOKEN: {
    pt_BR: "Token inválido",
  },
  ID_TOKEN_NOT_SUPPORTED: {
    pt_BR: "Token de ID não suportado",
  },
  FAILED_TO_GET_USER_INFO: {
    pt_BR: "Falha ao obter informações do usuário",
  },
  USER_EMAIL_NOT_FOUND: {
    pt_BR: "Email de usuário não encontrado",
  },
  EMAIL_NOT_VERIFIED: {
    pt_BR: "Email não verificado",
  },
  PASSWORD_TOO_SHORT: {
    pt_BR: "Senha muito curta",
  },
  PASSWORD_TOO_LONG: {
    pt_BR: "Senha muito longa",
  },
  EMAIL_CAN_NOT_BE_UPDATED: {
    pt_BR: "O email não pode ser atualizado",
  },
  CREDENTIAL_ACCOUNT_NOT_FOUND: {
    pt_BR: "Conta de credencial não encontrada",
  },
  SESSION_EXPIRED: {
    pt_BR: "Sessão expirada",
  },
  FAILED_TO_UNLINK_LAST_ACCOUNT: {
    pt_BR: "Falha ao desvincular a última conta",
  },
  ACCOUNT_NOT_FOUND: {
    pt_BR: "Conta não encontrada",
  },
  // Admin
  YOU_CANNOT_BAN_YOURSELF: {
    pt_BR: "Você não pode banir a si mesmo",
  },
  YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE: {
    pt_BR: "Você não tem permissão para alterar o papel dos usuários",
  },
  YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS: {
    pt_BR: "Você não tem permissão para criar usuários",
  },
  YOU_ARE_NOT_ALLOWED_TO_LIST_USERS: {
    pt_BR: "Você não tem permissão para listar usuários",
  },
  YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS: {
    pt_BR: "Você não tem permissão para listar sessões de usuários",
  },
  YOU_ARE_NOT_ALLOWED_TO_BAN_USERS: {
    pt_BR: "Você não tem permissão para banir usuários",
  },
  YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS: {
    pt_BR: "Você não tem permissão para personificar usuários",
  },
  YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS: {
    pt_BR: "Você não tem permissão para revogar sessões de usuários",
  },
  YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS: {
    pt_BR: "Você não tem permissão para excluir usuários",
  },
  YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD: {
    pt_BR: "Você não tem permissão para definir a senha dos usuários",
  },
  BANNED_USER: {
    pt_BR:
      "Você está banido. Por favor, contate o suporte se você acredita que isso é um erro.",
  },
};

export default ERROR_CODES;
