interface AuthCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  curso: string;
}

interface AddUserParams {
  name: string;
  email: string;
  password: string;
  role: string;

  // Aluno fields
  matricula?: number;
  id_curso?: number;

  // Professor fields
  curso_ids?: number[];

  // Coordenador fields
  id_curso_responsavel?: number;
}
