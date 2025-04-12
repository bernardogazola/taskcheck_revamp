import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image','role','createdAt','updatedAt']);

export const SessionScalarFieldEnumSchema = z.enum(['id','expiresAt','token','createdAt','updatedAt','ipAddress','userAgent','userId']);

export const AccountScalarFieldEnumSchema = z.enum(['id','accountId','providerId','userId','accessToken','refreshToken','idToken','accessTokenExpiresAt','refreshTokenExpiresAt','scope','password','createdAt','updatedAt']);

export const VerificationScalarFieldEnumSchema = z.enum(['id','identifier','value','expiresAt','createdAt','updatedAt']);

export const CursoScalarFieldEnumSchema = z.enum(['id','nome']);

export const AlunoScalarFieldEnumSchema = z.enum(['idUsuario','matricula','idCurso']);

export const ProfessorScalarFieldEnumSchema = z.enum(['idUsuario']);

export const CoordenadorScalarFieldEnumSchema = z.enum(['idUsuario','idCursoResponsavel']);

export const CategoriaScalarFieldEnumSchema = z.enum(['id','nome','descricao','cargaHoraria','idCurso']);

export const RelatorioAtividadeScalarFieldEnumSchema = z.enum(['id','nome','textoReflexao','dataRealizacao','dataEnvio','status','horasValidadas','certificado','idAluno','idCategoria']);

export const FeedbackScalarFieldEnumSchema = z.enum(['id','textoFeedback','dataEnvio','idProfessor','idRelatorio']);

export const FeedbackHistoricoScalarFieldEnumSchema = z.enum(['id','idFeedback','idRelatorio','textoFeedback','dataEnvio','idProfessor','versao']);

export const HistoricoRelatorioScalarFieldEnumSchema = z.enum(['id','idRelatorio','nomeAnterior','textoReflexaoAnterior','dataRealizacaoAnterior','statusAnterior','dataAlteracao','certificadoAnterior']);

export const ReversaoValidacaoScalarFieldEnumSchema = z.enum(['id','idRelatorio','justificativa','dataReversao','idProfessor']);

export const ProfessorCursoScalarFieldEnumSchema = z.enum(['idProfessor','idCurso']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const StatusRelatorioSchema = z.enum(['AGUARDANDO_VALIDACAO','INVALIDO','VALIDO','RECATEGORIZACAO']);

export type StatusRelatorioType = `${z.infer<typeof StatusRelatorioSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  role: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  userId: z.string(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().nullable(),
  refreshToken: z.string().nullable(),
  idToken: z.string().nullable(),
  accessTokenExpiresAt: z.coerce.date().nullable(),
  refreshTokenExpiresAt: z.coerce.date().nullable(),
  scope: z.string().nullable(),
  password: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// VERIFICATION SCHEMA
/////////////////////////////////////////

export const VerificationSchema = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
})

export type Verification = z.infer<typeof VerificationSchema>

/////////////////////////////////////////
// CURSO SCHEMA
/////////////////////////////////////////

export const CursoSchema = z.object({
  id: z.number().int(),
  nome: z.string(),
})

export type Curso = z.infer<typeof CursoSchema>

/////////////////////////////////////////
// ALUNO SCHEMA
/////////////////////////////////////////

export const AlunoSchema = z.object({
  idUsuario: z.string(),
  matricula: z.number().int(),
  idCurso: z.number().int(),
})

export type Aluno = z.infer<typeof AlunoSchema>

/////////////////////////////////////////
// PROFESSOR SCHEMA
/////////////////////////////////////////

export const ProfessorSchema = z.object({
  idUsuario: z.string(),
})

export type Professor = z.infer<typeof ProfessorSchema>

/////////////////////////////////////////
// COORDENADOR SCHEMA
/////////////////////////////////////////

export const CoordenadorSchema = z.object({
  idUsuario: z.string(),
  idCursoResponsavel: z.number().int(),
})

export type Coordenador = z.infer<typeof CoordenadorSchema>

/////////////////////////////////////////
// CATEGORIA SCHEMA
/////////////////////////////////////////

export const CategoriaSchema = z.object({
  id: z.number().int(),
  nome: z.string(),
  descricao: z.string(),
  cargaHoraria: z.number().int(),
  idCurso: z.number().int(),
})

export type Categoria = z.infer<typeof CategoriaSchema>

/////////////////////////////////////////
// RELATORIO ATIVIDADE SCHEMA
/////////////////////////////////////////

export const RelatorioAtividadeSchema = z.object({
  status: StatusRelatorioSchema,
  id: z.number().int(),
  nome: z.string(),
  textoReflexao: z.string(),
  dataRealizacao: z.coerce.date(),
  dataEnvio: z.coerce.date(),
  horasValidadas: z.number().int(),
  certificado: z.instanceof(Buffer),
  idAluno: z.string(),
  idCategoria: z.number().int(),
})

export type RelatorioAtividade = z.infer<typeof RelatorioAtividadeSchema>

/////////////////////////////////////////
// FEEDBACK SCHEMA
/////////////////////////////////////////

export const FeedbackSchema = z.object({
  id: z.number().int(),
  textoFeedback: z.string(),
  dataEnvio: z.coerce.date(),
  idProfessor: z.string(),
  idRelatorio: z.number().int(),
})

export type Feedback = z.infer<typeof FeedbackSchema>

/////////////////////////////////////////
// FEEDBACK HISTORICO SCHEMA
/////////////////////////////////////////

export const FeedbackHistoricoSchema = z.object({
  id: z.number().int(),
  idFeedback: z.number().int().nullable(),
  idRelatorio: z.number().int(),
  textoFeedback: z.string(),
  dataEnvio: z.coerce.date(),
  idProfessor: z.string().nullable(),
  versao: z.number().int().nullable(),
})

export type FeedbackHistorico = z.infer<typeof FeedbackHistoricoSchema>

/////////////////////////////////////////
// HISTORICO RELATORIO SCHEMA
/////////////////////////////////////////

export const HistoricoRelatorioSchema = z.object({
  statusAnterior: StatusRelatorioSchema.nullable(),
  id: z.number().int(),
  idRelatorio: z.number().int(),
  nomeAnterior: z.string().nullable(),
  textoReflexaoAnterior: z.string().nullable(),
  dataRealizacaoAnterior: z.coerce.date().nullable(),
  dataAlteracao: z.coerce.date(),
  certificadoAnterior: z.instanceof(Buffer).nullable(),
})

export type HistoricoRelatorio = z.infer<typeof HistoricoRelatorioSchema>

/////////////////////////////////////////
// REVERSAO VALIDACAO SCHEMA
/////////////////////////////////////////

export const ReversaoValidacaoSchema = z.object({
  id: z.number().int(),
  idRelatorio: z.number().int(),
  justificativa: z.string(),
  dataReversao: z.coerce.date(),
  idProfessor: z.string(),
})

export type ReversaoValidacao = z.infer<typeof ReversaoValidacaoSchema>

/////////////////////////////////////////
// PROFESSOR CURSO SCHEMA
/////////////////////////////////////////

export const ProfessorCursoSchema = z.object({
  idProfessor: z.string(),
  idCurso: z.number().int(),
})

export type ProfessorCurso = z.infer<typeof ProfessorCursoSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  aluno: z.union([z.boolean(),z.lazy(() => AlunoArgsSchema)]).optional(),
  professor: z.union([z.boolean(),z.lazy(() => ProfessorArgsSchema)]).optional(),
  coordenador: z.union([z.boolean(),z.lazy(() => CoordenadorArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  sessions: z.boolean().optional(),
  accounts: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  role: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  aluno: z.union([z.boolean(),z.lazy(() => AlunoArgsSchema)]).optional(),
  professor: z.union([z.boolean(),z.lazy(() => ProfessorArgsSchema)]).optional(),
  coordenador: z.union([z.boolean(),z.lazy(() => CoordenadorArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  token: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  ipAddress: z.boolean().optional(),
  userAgent: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  accountId: z.boolean().optional(),
  providerId: z.boolean().optional(),
  userId: z.boolean().optional(),
  accessToken: z.boolean().optional(),
  refreshToken: z.boolean().optional(),
  idToken: z.boolean().optional(),
  accessTokenExpiresAt: z.boolean().optional(),
  refreshTokenExpiresAt: z.boolean().optional(),
  scope: z.boolean().optional(),
  password: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// VERIFICATION
//------------------------------------------------------

export const VerificationSelectSchema: z.ZodType<Prisma.VerificationSelect> = z.object({
  id: z.boolean().optional(),
  identifier: z.boolean().optional(),
  value: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// CURSO
//------------------------------------------------------

export const CursoIncludeSchema: z.ZodType<Prisma.CursoInclude> = z.object({
  alunos: z.union([z.boolean(),z.lazy(() => AlunoFindManyArgsSchema)]).optional(),
  categorias: z.union([z.boolean(),z.lazy(() => CategoriaFindManyArgsSchema)]).optional(),
  professorCursos: z.union([z.boolean(),z.lazy(() => ProfessorCursoFindManyArgsSchema)]).optional(),
  coordenadorCursos: z.union([z.boolean(),z.lazy(() => CoordenadorFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CursoCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CursoArgsSchema: z.ZodType<Prisma.CursoDefaultArgs> = z.object({
  select: z.lazy(() => CursoSelectSchema).optional(),
  include: z.lazy(() => CursoIncludeSchema).optional(),
}).strict();

export const CursoCountOutputTypeArgsSchema: z.ZodType<Prisma.CursoCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CursoCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CursoCountOutputTypeSelectSchema: z.ZodType<Prisma.CursoCountOutputTypeSelect> = z.object({
  alunos: z.boolean().optional(),
  categorias: z.boolean().optional(),
  professorCursos: z.boolean().optional(),
  coordenadorCursos: z.boolean().optional(),
}).strict();

export const CursoSelectSchema: z.ZodType<Prisma.CursoSelect> = z.object({
  id: z.boolean().optional(),
  nome: z.boolean().optional(),
  alunos: z.union([z.boolean(),z.lazy(() => AlunoFindManyArgsSchema)]).optional(),
  categorias: z.union([z.boolean(),z.lazy(() => CategoriaFindManyArgsSchema)]).optional(),
  professorCursos: z.union([z.boolean(),z.lazy(() => ProfessorCursoFindManyArgsSchema)]).optional(),
  coordenadorCursos: z.union([z.boolean(),z.lazy(() => CoordenadorFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CursoCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ALUNO
//------------------------------------------------------

export const AlunoIncludeSchema: z.ZodType<Prisma.AlunoInclude> = z.object({
  usuario: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  curso: z.union([z.boolean(),z.lazy(() => CursoArgsSchema)]).optional(),
  relatoriosAtividades: z.union([z.boolean(),z.lazy(() => RelatorioAtividadeFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AlunoCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AlunoArgsSchema: z.ZodType<Prisma.AlunoDefaultArgs> = z.object({
  select: z.lazy(() => AlunoSelectSchema).optional(),
  include: z.lazy(() => AlunoIncludeSchema).optional(),
}).strict();

export const AlunoCountOutputTypeArgsSchema: z.ZodType<Prisma.AlunoCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AlunoCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AlunoCountOutputTypeSelectSchema: z.ZodType<Prisma.AlunoCountOutputTypeSelect> = z.object({
  relatoriosAtividades: z.boolean().optional(),
}).strict();

export const AlunoSelectSchema: z.ZodType<Prisma.AlunoSelect> = z.object({
  idUsuario: z.boolean().optional(),
  matricula: z.boolean().optional(),
  idCurso: z.boolean().optional(),
  usuario: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  curso: z.union([z.boolean(),z.lazy(() => CursoArgsSchema)]).optional(),
  relatoriosAtividades: z.union([z.boolean(),z.lazy(() => RelatorioAtividadeFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AlunoCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PROFESSOR
//------------------------------------------------------

export const ProfessorIncludeSchema: z.ZodType<Prisma.ProfessorInclude> = z.object({
  usuario: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  professorCursos: z.union([z.boolean(),z.lazy(() => ProfessorCursoFindManyArgsSchema)]).optional(),
  feedbacks: z.union([z.boolean(),z.lazy(() => FeedbackFindManyArgsSchema)]).optional(),
  reversoesValidacao: z.union([z.boolean(),z.lazy(() => ReversaoValidacaoFindManyArgsSchema)]).optional(),
  feedbackHistoricos: z.union([z.boolean(),z.lazy(() => FeedbackHistoricoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProfessorCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ProfessorArgsSchema: z.ZodType<Prisma.ProfessorDefaultArgs> = z.object({
  select: z.lazy(() => ProfessorSelectSchema).optional(),
  include: z.lazy(() => ProfessorIncludeSchema).optional(),
}).strict();

export const ProfessorCountOutputTypeArgsSchema: z.ZodType<Prisma.ProfessorCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ProfessorCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ProfessorCountOutputTypeSelectSchema: z.ZodType<Prisma.ProfessorCountOutputTypeSelect> = z.object({
  professorCursos: z.boolean().optional(),
  feedbacks: z.boolean().optional(),
  reversoesValidacao: z.boolean().optional(),
  feedbackHistoricos: z.boolean().optional(),
}).strict();

export const ProfessorSelectSchema: z.ZodType<Prisma.ProfessorSelect> = z.object({
  idUsuario: z.boolean().optional(),
  usuario: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  professorCursos: z.union([z.boolean(),z.lazy(() => ProfessorCursoFindManyArgsSchema)]).optional(),
  feedbacks: z.union([z.boolean(),z.lazy(() => FeedbackFindManyArgsSchema)]).optional(),
  reversoesValidacao: z.union([z.boolean(),z.lazy(() => ReversaoValidacaoFindManyArgsSchema)]).optional(),
  feedbackHistoricos: z.union([z.boolean(),z.lazy(() => FeedbackHistoricoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProfessorCountOutputTypeArgsSchema)]).optional(),
}).strict()

// COORDENADOR
//------------------------------------------------------

export const CoordenadorIncludeSchema: z.ZodType<Prisma.CoordenadorInclude> = z.object({
  usuario: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  cursoResponsavel: z.union([z.boolean(),z.lazy(() => CursoArgsSchema)]).optional(),
}).strict()

export const CoordenadorArgsSchema: z.ZodType<Prisma.CoordenadorDefaultArgs> = z.object({
  select: z.lazy(() => CoordenadorSelectSchema).optional(),
  include: z.lazy(() => CoordenadorIncludeSchema).optional(),
}).strict();

export const CoordenadorSelectSchema: z.ZodType<Prisma.CoordenadorSelect> = z.object({
  idUsuario: z.boolean().optional(),
  idCursoResponsavel: z.boolean().optional(),
  usuario: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  cursoResponsavel: z.union([z.boolean(),z.lazy(() => CursoArgsSchema)]).optional(),
}).strict()

// CATEGORIA
//------------------------------------------------------

export const CategoriaIncludeSchema: z.ZodType<Prisma.CategoriaInclude> = z.object({
  curso: z.union([z.boolean(),z.lazy(() => CursoArgsSchema)]).optional(),
  relatoriosAtividades: z.union([z.boolean(),z.lazy(() => RelatorioAtividadeFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoriaCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CategoriaArgsSchema: z.ZodType<Prisma.CategoriaDefaultArgs> = z.object({
  select: z.lazy(() => CategoriaSelectSchema).optional(),
  include: z.lazy(() => CategoriaIncludeSchema).optional(),
}).strict();

export const CategoriaCountOutputTypeArgsSchema: z.ZodType<Prisma.CategoriaCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CategoriaCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CategoriaCountOutputTypeSelectSchema: z.ZodType<Prisma.CategoriaCountOutputTypeSelect> = z.object({
  relatoriosAtividades: z.boolean().optional(),
}).strict();

export const CategoriaSelectSchema: z.ZodType<Prisma.CategoriaSelect> = z.object({
  id: z.boolean().optional(),
  nome: z.boolean().optional(),
  descricao: z.boolean().optional(),
  cargaHoraria: z.boolean().optional(),
  idCurso: z.boolean().optional(),
  curso: z.union([z.boolean(),z.lazy(() => CursoArgsSchema)]).optional(),
  relatoriosAtividades: z.union([z.boolean(),z.lazy(() => RelatorioAtividadeFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoriaCountOutputTypeArgsSchema)]).optional(),
}).strict()

// RELATORIO ATIVIDADE
//------------------------------------------------------

export const RelatorioAtividadeIncludeSchema: z.ZodType<Prisma.RelatorioAtividadeInclude> = z.object({
  aluno: z.union([z.boolean(),z.lazy(() => AlunoArgsSchema)]).optional(),
  categoria: z.union([z.boolean(),z.lazy(() => CategoriaArgsSchema)]).optional(),
  feedbacks: z.union([z.boolean(),z.lazy(() => FeedbackFindManyArgsSchema)]).optional(),
  historicos: z.union([z.boolean(),z.lazy(() => HistoricoRelatorioFindManyArgsSchema)]).optional(),
  reversoesValidacao: z.union([z.boolean(),z.lazy(() => ReversaoValidacaoFindManyArgsSchema)]).optional(),
  feedbackHistoricos: z.union([z.boolean(),z.lazy(() => FeedbackHistoricoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RelatorioAtividadeCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RelatorioAtividadeArgsSchema: z.ZodType<Prisma.RelatorioAtividadeDefaultArgs> = z.object({
  select: z.lazy(() => RelatorioAtividadeSelectSchema).optional(),
  include: z.lazy(() => RelatorioAtividadeIncludeSchema).optional(),
}).strict();

export const RelatorioAtividadeCountOutputTypeArgsSchema: z.ZodType<Prisma.RelatorioAtividadeCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RelatorioAtividadeCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RelatorioAtividadeCountOutputTypeSelectSchema: z.ZodType<Prisma.RelatorioAtividadeCountOutputTypeSelect> = z.object({
  feedbacks: z.boolean().optional(),
  historicos: z.boolean().optional(),
  reversoesValidacao: z.boolean().optional(),
  feedbackHistoricos: z.boolean().optional(),
}).strict();

export const RelatorioAtividadeSelectSchema: z.ZodType<Prisma.RelatorioAtividadeSelect> = z.object({
  id: z.boolean().optional(),
  nome: z.boolean().optional(),
  textoReflexao: z.boolean().optional(),
  dataRealizacao: z.boolean().optional(),
  dataEnvio: z.boolean().optional(),
  status: z.boolean().optional(),
  horasValidadas: z.boolean().optional(),
  certificado: z.boolean().optional(),
  idAluno: z.boolean().optional(),
  idCategoria: z.boolean().optional(),
  aluno: z.union([z.boolean(),z.lazy(() => AlunoArgsSchema)]).optional(),
  categoria: z.union([z.boolean(),z.lazy(() => CategoriaArgsSchema)]).optional(),
  feedbacks: z.union([z.boolean(),z.lazy(() => FeedbackFindManyArgsSchema)]).optional(),
  historicos: z.union([z.boolean(),z.lazy(() => HistoricoRelatorioFindManyArgsSchema)]).optional(),
  reversoesValidacao: z.union([z.boolean(),z.lazy(() => ReversaoValidacaoFindManyArgsSchema)]).optional(),
  feedbackHistoricos: z.union([z.boolean(),z.lazy(() => FeedbackHistoricoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RelatorioAtividadeCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FEEDBACK
//------------------------------------------------------

export const FeedbackIncludeSchema: z.ZodType<Prisma.FeedbackInclude> = z.object({
  professor: z.union([z.boolean(),z.lazy(() => ProfessorArgsSchema)]).optional(),
  relatorio: z.union([z.boolean(),z.lazy(() => RelatorioAtividadeArgsSchema)]).optional(),
  historicos: z.union([z.boolean(),z.lazy(() => FeedbackHistoricoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FeedbackCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const FeedbackArgsSchema: z.ZodType<Prisma.FeedbackDefaultArgs> = z.object({
  select: z.lazy(() => FeedbackSelectSchema).optional(),
  include: z.lazy(() => FeedbackIncludeSchema).optional(),
}).strict();

export const FeedbackCountOutputTypeArgsSchema: z.ZodType<Prisma.FeedbackCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => FeedbackCountOutputTypeSelectSchema).nullish(),
}).strict();

export const FeedbackCountOutputTypeSelectSchema: z.ZodType<Prisma.FeedbackCountOutputTypeSelect> = z.object({
  historicos: z.boolean().optional(),
}).strict();

export const FeedbackSelectSchema: z.ZodType<Prisma.FeedbackSelect> = z.object({
  id: z.boolean().optional(),
  textoFeedback: z.boolean().optional(),
  dataEnvio: z.boolean().optional(),
  idProfessor: z.boolean().optional(),
  idRelatorio: z.boolean().optional(),
  professor: z.union([z.boolean(),z.lazy(() => ProfessorArgsSchema)]).optional(),
  relatorio: z.union([z.boolean(),z.lazy(() => RelatorioAtividadeArgsSchema)]).optional(),
  historicos: z.union([z.boolean(),z.lazy(() => FeedbackHistoricoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FeedbackCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FEEDBACK HISTORICO
//------------------------------------------------------

export const FeedbackHistoricoIncludeSchema: z.ZodType<Prisma.FeedbackHistoricoInclude> = z.object({
  feedback: z.union([z.boolean(),z.lazy(() => FeedbackArgsSchema)]).optional(),
  relatorio: z.union([z.boolean(),z.lazy(() => RelatorioAtividadeArgsSchema)]).optional(),
  professor: z.union([z.boolean(),z.lazy(() => ProfessorArgsSchema)]).optional(),
}).strict()

export const FeedbackHistoricoArgsSchema: z.ZodType<Prisma.FeedbackHistoricoDefaultArgs> = z.object({
  select: z.lazy(() => FeedbackHistoricoSelectSchema).optional(),
  include: z.lazy(() => FeedbackHistoricoIncludeSchema).optional(),
}).strict();

export const FeedbackHistoricoSelectSchema: z.ZodType<Prisma.FeedbackHistoricoSelect> = z.object({
  id: z.boolean().optional(),
  idFeedback: z.boolean().optional(),
  idRelatorio: z.boolean().optional(),
  textoFeedback: z.boolean().optional(),
  dataEnvio: z.boolean().optional(),
  idProfessor: z.boolean().optional(),
  versao: z.boolean().optional(),
  feedback: z.union([z.boolean(),z.lazy(() => FeedbackArgsSchema)]).optional(),
  relatorio: z.union([z.boolean(),z.lazy(() => RelatorioAtividadeArgsSchema)]).optional(),
  professor: z.union([z.boolean(),z.lazy(() => ProfessorArgsSchema)]).optional(),
}).strict()

// HISTORICO RELATORIO
//------------------------------------------------------

export const HistoricoRelatorioIncludeSchema: z.ZodType<Prisma.HistoricoRelatorioInclude> = z.object({
  relatorio: z.union([z.boolean(),z.lazy(() => RelatorioAtividadeArgsSchema)]).optional(),
}).strict()

export const HistoricoRelatorioArgsSchema: z.ZodType<Prisma.HistoricoRelatorioDefaultArgs> = z.object({
  select: z.lazy(() => HistoricoRelatorioSelectSchema).optional(),
  include: z.lazy(() => HistoricoRelatorioIncludeSchema).optional(),
}).strict();

export const HistoricoRelatorioSelectSchema: z.ZodType<Prisma.HistoricoRelatorioSelect> = z.object({
  id: z.boolean().optional(),
  idRelatorio: z.boolean().optional(),
  nomeAnterior: z.boolean().optional(),
  textoReflexaoAnterior: z.boolean().optional(),
  dataRealizacaoAnterior: z.boolean().optional(),
  statusAnterior: z.boolean().optional(),
  dataAlteracao: z.boolean().optional(),
  certificadoAnterior: z.boolean().optional(),
  relatorio: z.union([z.boolean(),z.lazy(() => RelatorioAtividadeArgsSchema)]).optional(),
}).strict()

// REVERSAO VALIDACAO
//------------------------------------------------------

export const ReversaoValidacaoIncludeSchema: z.ZodType<Prisma.ReversaoValidacaoInclude> = z.object({
  relatorio: z.union([z.boolean(),z.lazy(() => RelatorioAtividadeArgsSchema)]).optional(),
  professor: z.union([z.boolean(),z.lazy(() => ProfessorArgsSchema)]).optional(),
}).strict()

export const ReversaoValidacaoArgsSchema: z.ZodType<Prisma.ReversaoValidacaoDefaultArgs> = z.object({
  select: z.lazy(() => ReversaoValidacaoSelectSchema).optional(),
  include: z.lazy(() => ReversaoValidacaoIncludeSchema).optional(),
}).strict();

export const ReversaoValidacaoSelectSchema: z.ZodType<Prisma.ReversaoValidacaoSelect> = z.object({
  id: z.boolean().optional(),
  idRelatorio: z.boolean().optional(),
  justificativa: z.boolean().optional(),
  dataReversao: z.boolean().optional(),
  idProfessor: z.boolean().optional(),
  relatorio: z.union([z.boolean(),z.lazy(() => RelatorioAtividadeArgsSchema)]).optional(),
  professor: z.union([z.boolean(),z.lazy(() => ProfessorArgsSchema)]).optional(),
}).strict()

// PROFESSOR CURSO
//------------------------------------------------------

export const ProfessorCursoIncludeSchema: z.ZodType<Prisma.ProfessorCursoInclude> = z.object({
  professor: z.union([z.boolean(),z.lazy(() => ProfessorArgsSchema)]).optional(),
  curso: z.union([z.boolean(),z.lazy(() => CursoArgsSchema)]).optional(),
}).strict()

export const ProfessorCursoArgsSchema: z.ZodType<Prisma.ProfessorCursoDefaultArgs> = z.object({
  select: z.lazy(() => ProfessorCursoSelectSchema).optional(),
  include: z.lazy(() => ProfessorCursoIncludeSchema).optional(),
}).strict();

export const ProfessorCursoSelectSchema: z.ZodType<Prisma.ProfessorCursoSelect> = z.object({
  idProfessor: z.boolean().optional(),
  idCurso: z.boolean().optional(),
  professor: z.union([z.boolean(),z.lazy(() => ProfessorArgsSchema)]).optional(),
  curso: z.union([z.boolean(),z.lazy(() => CursoArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  aluno: z.union([ z.lazy(() => AlunoNullableScalarRelationFilterSchema),z.lazy(() => AlunoWhereInputSchema) ]).optional().nullable(),
  professor: z.union([ z.lazy(() => ProfessorNullableScalarRelationFilterSchema),z.lazy(() => ProfessorWhereInputSchema) ]).optional().nullable(),
  coordenador: z.union([ z.lazy(() => CoordenadorNullableScalarRelationFilterSchema),z.lazy(() => CoordenadorWhereInputSchema) ]).optional().nullable(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  aluno: z.lazy(() => AlunoOrderByWithRelationInputSchema).optional(),
  professor: z.lazy(() => ProfessorOrderByWithRelationInputSchema).optional(),
  coordenador: z.lazy(() => CoordenadorOrderByWithRelationInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  aluno: z.union([ z.lazy(() => AlunoNullableScalarRelationFilterSchema),z.lazy(() => AlunoWhereInputSchema) ]).optional().nullable(),
  professor: z.union([ z.lazy(() => ProfessorNullableScalarRelationFilterSchema),z.lazy(() => ProfessorWhereInputSchema) ]).optional().nullable(),
  coordenador: z.union([ z.lazy(() => CoordenadorNullableScalarRelationFilterSchema),z.lazy(() => CoordenadorWhereInputSchema) ]).optional().nullable(),
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ipAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userAgent: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    token: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    token: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  token: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ipAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userAgent: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  ipAddress: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  idToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  refreshToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  idToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accessTokenExpiresAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  idToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  refreshToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  idToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accessTokenExpiresAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  accountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  idToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationWhereInputSchema: z.ZodType<Prisma.VerificationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationWhereInputSchema),z.lazy(() => VerificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationWhereInputSchema),z.lazy(() => VerificationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const VerificationOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
}).strict();

export const VerificationWhereUniqueInputSchema: z.ZodType<Prisma.VerificationWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => VerificationWhereInputSchema),z.lazy(() => VerificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationWhereInputSchema),z.lazy(() => VerificationWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict());

export const VerificationOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => VerificationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const CursoWhereInputSchema: z.ZodType<Prisma.CursoWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CursoWhereInputSchema),z.lazy(() => CursoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CursoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CursoWhereInputSchema),z.lazy(() => CursoWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  nome: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  alunos: z.lazy(() => AlunoListRelationFilterSchema).optional(),
  categorias: z.lazy(() => CategoriaListRelationFilterSchema).optional(),
  professorCursos: z.lazy(() => ProfessorCursoListRelationFilterSchema).optional(),
  coordenadorCursos: z.lazy(() => CoordenadorListRelationFilterSchema).optional()
}).strict();

export const CursoOrderByWithRelationInputSchema: z.ZodType<Prisma.CursoOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  alunos: z.lazy(() => AlunoOrderByRelationAggregateInputSchema).optional(),
  categorias: z.lazy(() => CategoriaOrderByRelationAggregateInputSchema).optional(),
  professorCursos: z.lazy(() => ProfessorCursoOrderByRelationAggregateInputSchema).optional(),
  coordenadorCursos: z.lazy(() => CoordenadorOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CursoWhereUniqueInputSchema: z.ZodType<Prisma.CursoWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => CursoWhereInputSchema),z.lazy(() => CursoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CursoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CursoWhereInputSchema),z.lazy(() => CursoWhereInputSchema).array() ]).optional(),
  nome: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  alunos: z.lazy(() => AlunoListRelationFilterSchema).optional(),
  categorias: z.lazy(() => CategoriaListRelationFilterSchema).optional(),
  professorCursos: z.lazy(() => ProfessorCursoListRelationFilterSchema).optional(),
  coordenadorCursos: z.lazy(() => CoordenadorListRelationFilterSchema).optional()
}).strict());

export const CursoOrderByWithAggregationInputSchema: z.ZodType<Prisma.CursoOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CursoCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CursoAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CursoMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CursoMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CursoSumOrderByAggregateInputSchema).optional()
}).strict();

export const CursoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CursoScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CursoScalarWhereWithAggregatesInputSchema),z.lazy(() => CursoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CursoScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CursoScalarWhereWithAggregatesInputSchema),z.lazy(() => CursoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  nome: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AlunoWhereInputSchema: z.ZodType<Prisma.AlunoWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AlunoWhereInputSchema),z.lazy(() => AlunoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AlunoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AlunoWhereInputSchema),z.lazy(() => AlunoWhereInputSchema).array() ]).optional(),
  idUsuario: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  matricula: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  idCurso: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  usuario: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  curso: z.union([ z.lazy(() => CursoScalarRelationFilterSchema),z.lazy(() => CursoWhereInputSchema) ]).optional(),
  relatoriosAtividades: z.lazy(() => RelatorioAtividadeListRelationFilterSchema).optional()
}).strict();

export const AlunoOrderByWithRelationInputSchema: z.ZodType<Prisma.AlunoOrderByWithRelationInput> = z.object({
  idUsuario: z.lazy(() => SortOrderSchema).optional(),
  matricula: z.lazy(() => SortOrderSchema).optional(),
  idCurso: z.lazy(() => SortOrderSchema).optional(),
  usuario: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  curso: z.lazy(() => CursoOrderByWithRelationInputSchema).optional(),
  relatoriosAtividades: z.lazy(() => RelatorioAtividadeOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AlunoWhereUniqueInputSchema: z.ZodType<Prisma.AlunoWhereUniqueInput> = z.object({
  idUsuario: z.string()
})
.and(z.object({
  idUsuario: z.string().optional(),
  AND: z.union([ z.lazy(() => AlunoWhereInputSchema),z.lazy(() => AlunoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AlunoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AlunoWhereInputSchema),z.lazy(() => AlunoWhereInputSchema).array() ]).optional(),
  matricula: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  idCurso: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  usuario: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  curso: z.union([ z.lazy(() => CursoScalarRelationFilterSchema),z.lazy(() => CursoWhereInputSchema) ]).optional(),
  relatoriosAtividades: z.lazy(() => RelatorioAtividadeListRelationFilterSchema).optional()
}).strict());

export const AlunoOrderByWithAggregationInputSchema: z.ZodType<Prisma.AlunoOrderByWithAggregationInput> = z.object({
  idUsuario: z.lazy(() => SortOrderSchema).optional(),
  matricula: z.lazy(() => SortOrderSchema).optional(),
  idCurso: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AlunoCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AlunoAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AlunoMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AlunoMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AlunoSumOrderByAggregateInputSchema).optional()
}).strict();

export const AlunoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AlunoScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AlunoScalarWhereWithAggregatesInputSchema),z.lazy(() => AlunoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AlunoScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AlunoScalarWhereWithAggregatesInputSchema),z.lazy(() => AlunoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  idUsuario: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  matricula: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  idCurso: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const ProfessorWhereInputSchema: z.ZodType<Prisma.ProfessorWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProfessorWhereInputSchema),z.lazy(() => ProfessorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfessorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfessorWhereInputSchema),z.lazy(() => ProfessorWhereInputSchema).array() ]).optional(),
  idUsuario: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  usuario: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  professorCursos: z.lazy(() => ProfessorCursoListRelationFilterSchema).optional(),
  feedbacks: z.lazy(() => FeedbackListRelationFilterSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoListRelationFilterSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoListRelationFilterSchema).optional()
}).strict();

export const ProfessorOrderByWithRelationInputSchema: z.ZodType<Prisma.ProfessorOrderByWithRelationInput> = z.object({
  idUsuario: z.lazy(() => SortOrderSchema).optional(),
  usuario: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  professorCursos: z.lazy(() => ProfessorCursoOrderByRelationAggregateInputSchema).optional(),
  feedbacks: z.lazy(() => FeedbackOrderByRelationAggregateInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoOrderByRelationAggregateInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ProfessorWhereUniqueInputSchema: z.ZodType<Prisma.ProfessorWhereUniqueInput> = z.object({
  idUsuario: z.string()
})
.and(z.object({
  idUsuario: z.string().optional(),
  AND: z.union([ z.lazy(() => ProfessorWhereInputSchema),z.lazy(() => ProfessorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfessorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfessorWhereInputSchema),z.lazy(() => ProfessorWhereInputSchema).array() ]).optional(),
  usuario: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  professorCursos: z.lazy(() => ProfessorCursoListRelationFilterSchema).optional(),
  feedbacks: z.lazy(() => FeedbackListRelationFilterSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoListRelationFilterSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoListRelationFilterSchema).optional()
}).strict());

export const ProfessorOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProfessorOrderByWithAggregationInput> = z.object({
  idUsuario: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProfessorCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProfessorMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProfessorMinOrderByAggregateInputSchema).optional()
}).strict();

export const ProfessorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProfessorScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProfessorScalarWhereWithAggregatesInputSchema),z.lazy(() => ProfessorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfessorScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfessorScalarWhereWithAggregatesInputSchema),z.lazy(() => ProfessorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  idUsuario: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const CoordenadorWhereInputSchema: z.ZodType<Prisma.CoordenadorWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CoordenadorWhereInputSchema),z.lazy(() => CoordenadorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CoordenadorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CoordenadorWhereInputSchema),z.lazy(() => CoordenadorWhereInputSchema).array() ]).optional(),
  idUsuario: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  idCursoResponsavel: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  usuario: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  cursoResponsavel: z.union([ z.lazy(() => CursoScalarRelationFilterSchema),z.lazy(() => CursoWhereInputSchema) ]).optional(),
}).strict();

export const CoordenadorOrderByWithRelationInputSchema: z.ZodType<Prisma.CoordenadorOrderByWithRelationInput> = z.object({
  idUsuario: z.lazy(() => SortOrderSchema).optional(),
  idCursoResponsavel: z.lazy(() => SortOrderSchema).optional(),
  usuario: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  cursoResponsavel: z.lazy(() => CursoOrderByWithRelationInputSchema).optional()
}).strict();

export const CoordenadorWhereUniqueInputSchema: z.ZodType<Prisma.CoordenadorWhereUniqueInput> = z.object({
  idUsuario: z.string()
})
.and(z.object({
  idUsuario: z.string().optional(),
  AND: z.union([ z.lazy(() => CoordenadorWhereInputSchema),z.lazy(() => CoordenadorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CoordenadorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CoordenadorWhereInputSchema),z.lazy(() => CoordenadorWhereInputSchema).array() ]).optional(),
  idCursoResponsavel: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  usuario: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  cursoResponsavel: z.union([ z.lazy(() => CursoScalarRelationFilterSchema),z.lazy(() => CursoWhereInputSchema) ]).optional(),
}).strict());

export const CoordenadorOrderByWithAggregationInputSchema: z.ZodType<Prisma.CoordenadorOrderByWithAggregationInput> = z.object({
  idUsuario: z.lazy(() => SortOrderSchema).optional(),
  idCursoResponsavel: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CoordenadorCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CoordenadorAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CoordenadorMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CoordenadorMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CoordenadorSumOrderByAggregateInputSchema).optional()
}).strict();

export const CoordenadorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CoordenadorScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CoordenadorScalarWhereWithAggregatesInputSchema),z.lazy(() => CoordenadorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CoordenadorScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CoordenadorScalarWhereWithAggregatesInputSchema),z.lazy(() => CoordenadorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  idUsuario: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  idCursoResponsavel: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const CategoriaWhereInputSchema: z.ZodType<Prisma.CategoriaWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CategoriaWhereInputSchema),z.lazy(() => CategoriaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoriaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoriaWhereInputSchema),z.lazy(() => CategoriaWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  nome: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  descricao: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  cargaHoraria: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  idCurso: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  curso: z.union([ z.lazy(() => CursoScalarRelationFilterSchema),z.lazy(() => CursoWhereInputSchema) ]).optional(),
  relatoriosAtividades: z.lazy(() => RelatorioAtividadeListRelationFilterSchema).optional()
}).strict();

export const CategoriaOrderByWithRelationInputSchema: z.ZodType<Prisma.CategoriaOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  descricao: z.lazy(() => SortOrderSchema).optional(),
  cargaHoraria: z.lazy(() => SortOrderSchema).optional(),
  idCurso: z.lazy(() => SortOrderSchema).optional(),
  curso: z.lazy(() => CursoOrderByWithRelationInputSchema).optional(),
  relatoriosAtividades: z.lazy(() => RelatorioAtividadeOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CategoriaWhereUniqueInputSchema: z.ZodType<Prisma.CategoriaWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => CategoriaWhereInputSchema),z.lazy(() => CategoriaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoriaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoriaWhereInputSchema),z.lazy(() => CategoriaWhereInputSchema).array() ]).optional(),
  nome: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  descricao: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  cargaHoraria: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  idCurso: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  curso: z.union([ z.lazy(() => CursoScalarRelationFilterSchema),z.lazy(() => CursoWhereInputSchema) ]).optional(),
  relatoriosAtividades: z.lazy(() => RelatorioAtividadeListRelationFilterSchema).optional()
}).strict());

export const CategoriaOrderByWithAggregationInputSchema: z.ZodType<Prisma.CategoriaOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  descricao: z.lazy(() => SortOrderSchema).optional(),
  cargaHoraria: z.lazy(() => SortOrderSchema).optional(),
  idCurso: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CategoriaCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CategoriaAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CategoriaMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CategoriaMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CategoriaSumOrderByAggregateInputSchema).optional()
}).strict();

export const CategoriaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CategoriaScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CategoriaScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoriaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoriaScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoriaScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoriaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  nome: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  descricao: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  cargaHoraria: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  idCurso: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const RelatorioAtividadeWhereInputSchema: z.ZodType<Prisma.RelatorioAtividadeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RelatorioAtividadeWhereInputSchema),z.lazy(() => RelatorioAtividadeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RelatorioAtividadeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RelatorioAtividadeWhereInputSchema),z.lazy(() => RelatorioAtividadeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  nome: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  textoReflexao: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dataRealizacao: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  dataEnvio: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumStatusRelatorioFilterSchema),z.lazy(() => StatusRelatorioSchema) ]).optional(),
  horasValidadas: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  certificado: z.union([ z.lazy(() => BytesFilterSchema),z.instanceof(Buffer) ]).optional(),
  idAluno: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  idCategoria: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  aluno: z.union([ z.lazy(() => AlunoScalarRelationFilterSchema),z.lazy(() => AlunoWhereInputSchema) ]).optional(),
  categoria: z.union([ z.lazy(() => CategoriaScalarRelationFilterSchema),z.lazy(() => CategoriaWhereInputSchema) ]).optional(),
  feedbacks: z.lazy(() => FeedbackListRelationFilterSchema).optional(),
  historicos: z.lazy(() => HistoricoRelatorioListRelationFilterSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoListRelationFilterSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoListRelationFilterSchema).optional()
}).strict();

export const RelatorioAtividadeOrderByWithRelationInputSchema: z.ZodType<Prisma.RelatorioAtividadeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  textoReflexao: z.lazy(() => SortOrderSchema).optional(),
  dataRealizacao: z.lazy(() => SortOrderSchema).optional(),
  dataEnvio: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  horasValidadas: z.lazy(() => SortOrderSchema).optional(),
  certificado: z.lazy(() => SortOrderSchema).optional(),
  idAluno: z.lazy(() => SortOrderSchema).optional(),
  idCategoria: z.lazy(() => SortOrderSchema).optional(),
  aluno: z.lazy(() => AlunoOrderByWithRelationInputSchema).optional(),
  categoria: z.lazy(() => CategoriaOrderByWithRelationInputSchema).optional(),
  feedbacks: z.lazy(() => FeedbackOrderByRelationAggregateInputSchema).optional(),
  historicos: z.lazy(() => HistoricoRelatorioOrderByRelationAggregateInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoOrderByRelationAggregateInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoOrderByRelationAggregateInputSchema).optional()
}).strict();

export const RelatorioAtividadeWhereUniqueInputSchema: z.ZodType<Prisma.RelatorioAtividadeWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => RelatorioAtividadeWhereInputSchema),z.lazy(() => RelatorioAtividadeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RelatorioAtividadeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RelatorioAtividadeWhereInputSchema),z.lazy(() => RelatorioAtividadeWhereInputSchema).array() ]).optional(),
  nome: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  textoReflexao: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dataRealizacao: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  dataEnvio: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumStatusRelatorioFilterSchema),z.lazy(() => StatusRelatorioSchema) ]).optional(),
  horasValidadas: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  certificado: z.union([ z.lazy(() => BytesFilterSchema),z.instanceof(Buffer) ]).optional(),
  idAluno: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  idCategoria: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  aluno: z.union([ z.lazy(() => AlunoScalarRelationFilterSchema),z.lazy(() => AlunoWhereInputSchema) ]).optional(),
  categoria: z.union([ z.lazy(() => CategoriaScalarRelationFilterSchema),z.lazy(() => CategoriaWhereInputSchema) ]).optional(),
  feedbacks: z.lazy(() => FeedbackListRelationFilterSchema).optional(),
  historicos: z.lazy(() => HistoricoRelatorioListRelationFilterSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoListRelationFilterSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoListRelationFilterSchema).optional()
}).strict());

export const RelatorioAtividadeOrderByWithAggregationInputSchema: z.ZodType<Prisma.RelatorioAtividadeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  textoReflexao: z.lazy(() => SortOrderSchema).optional(),
  dataRealizacao: z.lazy(() => SortOrderSchema).optional(),
  dataEnvio: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  horasValidadas: z.lazy(() => SortOrderSchema).optional(),
  certificado: z.lazy(() => SortOrderSchema).optional(),
  idAluno: z.lazy(() => SortOrderSchema).optional(),
  idCategoria: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RelatorioAtividadeCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RelatorioAtividadeAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RelatorioAtividadeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RelatorioAtividadeMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RelatorioAtividadeSumOrderByAggregateInputSchema).optional()
}).strict();

export const RelatorioAtividadeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RelatorioAtividadeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RelatorioAtividadeScalarWhereWithAggregatesInputSchema),z.lazy(() => RelatorioAtividadeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RelatorioAtividadeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RelatorioAtividadeScalarWhereWithAggregatesInputSchema),z.lazy(() => RelatorioAtividadeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  nome: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  textoReflexao: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  dataRealizacao: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  dataEnvio: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumStatusRelatorioWithAggregatesFilterSchema),z.lazy(() => StatusRelatorioSchema) ]).optional(),
  horasValidadas: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  certificado: z.union([ z.lazy(() => BytesWithAggregatesFilterSchema),z.instanceof(Buffer) ]).optional(),
  idAluno: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  idCategoria: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const FeedbackWhereInputSchema: z.ZodType<Prisma.FeedbackWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FeedbackWhereInputSchema),z.lazy(() => FeedbackWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackWhereInputSchema),z.lazy(() => FeedbackWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  textoFeedback: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dataEnvio: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  idProfessor: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  idRelatorio: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  professor: z.union([ z.lazy(() => ProfessorScalarRelationFilterSchema),z.lazy(() => ProfessorWhereInputSchema) ]).optional(),
  relatorio: z.union([ z.lazy(() => RelatorioAtividadeScalarRelationFilterSchema),z.lazy(() => RelatorioAtividadeWhereInputSchema) ]).optional(),
  historicos: z.lazy(() => FeedbackHistoricoListRelationFilterSchema).optional()
}).strict();

export const FeedbackOrderByWithRelationInputSchema: z.ZodType<Prisma.FeedbackOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  textoFeedback: z.lazy(() => SortOrderSchema).optional(),
  dataEnvio: z.lazy(() => SortOrderSchema).optional(),
  idProfessor: z.lazy(() => SortOrderSchema).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional(),
  professor: z.lazy(() => ProfessorOrderByWithRelationInputSchema).optional(),
  relatorio: z.lazy(() => RelatorioAtividadeOrderByWithRelationInputSchema).optional(),
  historicos: z.lazy(() => FeedbackHistoricoOrderByRelationAggregateInputSchema).optional()
}).strict();

export const FeedbackWhereUniqueInputSchema: z.ZodType<Prisma.FeedbackWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => FeedbackWhereInputSchema),z.lazy(() => FeedbackWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackWhereInputSchema),z.lazy(() => FeedbackWhereInputSchema).array() ]).optional(),
  textoFeedback: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dataEnvio: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  idProfessor: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  idRelatorio: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  professor: z.union([ z.lazy(() => ProfessorScalarRelationFilterSchema),z.lazy(() => ProfessorWhereInputSchema) ]).optional(),
  relatorio: z.union([ z.lazy(() => RelatorioAtividadeScalarRelationFilterSchema),z.lazy(() => RelatorioAtividadeWhereInputSchema) ]).optional(),
  historicos: z.lazy(() => FeedbackHistoricoListRelationFilterSchema).optional()
}).strict());

export const FeedbackOrderByWithAggregationInputSchema: z.ZodType<Prisma.FeedbackOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  textoFeedback: z.lazy(() => SortOrderSchema).optional(),
  dataEnvio: z.lazy(() => SortOrderSchema).optional(),
  idProfessor: z.lazy(() => SortOrderSchema).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FeedbackCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => FeedbackAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FeedbackMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FeedbackMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => FeedbackSumOrderByAggregateInputSchema).optional()
}).strict();

export const FeedbackScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FeedbackScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FeedbackScalarWhereWithAggregatesInputSchema),z.lazy(() => FeedbackScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackScalarWhereWithAggregatesInputSchema),z.lazy(() => FeedbackScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  textoFeedback: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  dataEnvio: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  idProfessor: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  idRelatorio: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const FeedbackHistoricoWhereInputSchema: z.ZodType<Prisma.FeedbackHistoricoWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FeedbackHistoricoWhereInputSchema),z.lazy(() => FeedbackHistoricoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackHistoricoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackHistoricoWhereInputSchema),z.lazy(() => FeedbackHistoricoWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  idFeedback: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  idRelatorio: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  textoFeedback: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dataEnvio: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  idProfessor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  versao: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  feedback: z.union([ z.lazy(() => FeedbackNullableScalarRelationFilterSchema),z.lazy(() => FeedbackWhereInputSchema) ]).optional().nullable(),
  relatorio: z.union([ z.lazy(() => RelatorioAtividadeScalarRelationFilterSchema),z.lazy(() => RelatorioAtividadeWhereInputSchema) ]).optional(),
  professor: z.union([ z.lazy(() => ProfessorNullableScalarRelationFilterSchema),z.lazy(() => ProfessorWhereInputSchema) ]).optional().nullable(),
}).strict();

export const FeedbackHistoricoOrderByWithRelationInputSchema: z.ZodType<Prisma.FeedbackHistoricoOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idFeedback: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional(),
  textoFeedback: z.lazy(() => SortOrderSchema).optional(),
  dataEnvio: z.lazy(() => SortOrderSchema).optional(),
  idProfessor: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  versao: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  feedback: z.lazy(() => FeedbackOrderByWithRelationInputSchema).optional(),
  relatorio: z.lazy(() => RelatorioAtividadeOrderByWithRelationInputSchema).optional(),
  professor: z.lazy(() => ProfessorOrderByWithRelationInputSchema).optional()
}).strict();

export const FeedbackHistoricoWhereUniqueInputSchema: z.ZodType<Prisma.FeedbackHistoricoWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => FeedbackHistoricoWhereInputSchema),z.lazy(() => FeedbackHistoricoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackHistoricoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackHistoricoWhereInputSchema),z.lazy(() => FeedbackHistoricoWhereInputSchema).array() ]).optional(),
  idFeedback: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  idRelatorio: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  textoFeedback: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dataEnvio: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  idProfessor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  versao: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  feedback: z.union([ z.lazy(() => FeedbackNullableScalarRelationFilterSchema),z.lazy(() => FeedbackWhereInputSchema) ]).optional().nullable(),
  relatorio: z.union([ z.lazy(() => RelatorioAtividadeScalarRelationFilterSchema),z.lazy(() => RelatorioAtividadeWhereInputSchema) ]).optional(),
  professor: z.union([ z.lazy(() => ProfessorNullableScalarRelationFilterSchema),z.lazy(() => ProfessorWhereInputSchema) ]).optional().nullable(),
}).strict());

export const FeedbackHistoricoOrderByWithAggregationInputSchema: z.ZodType<Prisma.FeedbackHistoricoOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idFeedback: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional(),
  textoFeedback: z.lazy(() => SortOrderSchema).optional(),
  dataEnvio: z.lazy(() => SortOrderSchema).optional(),
  idProfessor: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  versao: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => FeedbackHistoricoCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => FeedbackHistoricoAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FeedbackHistoricoMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FeedbackHistoricoMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => FeedbackHistoricoSumOrderByAggregateInputSchema).optional()
}).strict();

export const FeedbackHistoricoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FeedbackHistoricoScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FeedbackHistoricoScalarWhereWithAggregatesInputSchema),z.lazy(() => FeedbackHistoricoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackHistoricoScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackHistoricoScalarWhereWithAggregatesInputSchema),z.lazy(() => FeedbackHistoricoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  idFeedback: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  idRelatorio: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  textoFeedback: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  dataEnvio: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  idProfessor: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  versao: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const HistoricoRelatorioWhereInputSchema: z.ZodType<Prisma.HistoricoRelatorioWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HistoricoRelatorioWhereInputSchema),z.lazy(() => HistoricoRelatorioWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HistoricoRelatorioWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HistoricoRelatorioWhereInputSchema),z.lazy(() => HistoricoRelatorioWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  idRelatorio: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  nomeAnterior: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  textoReflexaoAnterior: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  dataRealizacaoAnterior: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  statusAnterior: z.union([ z.lazy(() => EnumStatusRelatorioNullableFilterSchema),z.lazy(() => StatusRelatorioSchema) ]).optional().nullable(),
  dataAlteracao: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  certificadoAnterior: z.union([ z.lazy(() => BytesNullableFilterSchema),z.instanceof(Buffer) ]).optional().nullable(),
  relatorio: z.union([ z.lazy(() => RelatorioAtividadeScalarRelationFilterSchema),z.lazy(() => RelatorioAtividadeWhereInputSchema) ]).optional(),
}).strict();

export const HistoricoRelatorioOrderByWithRelationInputSchema: z.ZodType<Prisma.HistoricoRelatorioOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional(),
  nomeAnterior: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  textoReflexaoAnterior: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dataRealizacaoAnterior: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  statusAnterior: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dataAlteracao: z.lazy(() => SortOrderSchema).optional(),
  certificadoAnterior: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  relatorio: z.lazy(() => RelatorioAtividadeOrderByWithRelationInputSchema).optional()
}).strict();

export const HistoricoRelatorioWhereUniqueInputSchema: z.ZodType<Prisma.HistoricoRelatorioWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => HistoricoRelatorioWhereInputSchema),z.lazy(() => HistoricoRelatorioWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HistoricoRelatorioWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HistoricoRelatorioWhereInputSchema),z.lazy(() => HistoricoRelatorioWhereInputSchema).array() ]).optional(),
  idRelatorio: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  nomeAnterior: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  textoReflexaoAnterior: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  dataRealizacaoAnterior: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  statusAnterior: z.union([ z.lazy(() => EnumStatusRelatorioNullableFilterSchema),z.lazy(() => StatusRelatorioSchema) ]).optional().nullable(),
  dataAlteracao: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  certificadoAnterior: z.union([ z.lazy(() => BytesNullableFilterSchema),z.instanceof(Buffer) ]).optional().nullable(),
  relatorio: z.union([ z.lazy(() => RelatorioAtividadeScalarRelationFilterSchema),z.lazy(() => RelatorioAtividadeWhereInputSchema) ]).optional(),
}).strict());

export const HistoricoRelatorioOrderByWithAggregationInputSchema: z.ZodType<Prisma.HistoricoRelatorioOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional(),
  nomeAnterior: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  textoReflexaoAnterior: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dataRealizacaoAnterior: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  statusAnterior: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dataAlteracao: z.lazy(() => SortOrderSchema).optional(),
  certificadoAnterior: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => HistoricoRelatorioCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => HistoricoRelatorioAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => HistoricoRelatorioMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => HistoricoRelatorioMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => HistoricoRelatorioSumOrderByAggregateInputSchema).optional()
}).strict();

export const HistoricoRelatorioScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.HistoricoRelatorioScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => HistoricoRelatorioScalarWhereWithAggregatesInputSchema),z.lazy(() => HistoricoRelatorioScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => HistoricoRelatorioScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HistoricoRelatorioScalarWhereWithAggregatesInputSchema),z.lazy(() => HistoricoRelatorioScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  idRelatorio: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  nomeAnterior: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  textoReflexaoAnterior: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  dataRealizacaoAnterior: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  statusAnterior: z.union([ z.lazy(() => EnumStatusRelatorioNullableWithAggregatesFilterSchema),z.lazy(() => StatusRelatorioSchema) ]).optional().nullable(),
  dataAlteracao: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  certificadoAnterior: z.union([ z.lazy(() => BytesNullableWithAggregatesFilterSchema),z.instanceof(Buffer) ]).optional().nullable(),
}).strict();

export const ReversaoValidacaoWhereInputSchema: z.ZodType<Prisma.ReversaoValidacaoWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReversaoValidacaoWhereInputSchema),z.lazy(() => ReversaoValidacaoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReversaoValidacaoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReversaoValidacaoWhereInputSchema),z.lazy(() => ReversaoValidacaoWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  idRelatorio: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  justificativa: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dataReversao: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  idProfessor: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  relatorio: z.union([ z.lazy(() => RelatorioAtividadeScalarRelationFilterSchema),z.lazy(() => RelatorioAtividadeWhereInputSchema) ]).optional(),
  professor: z.union([ z.lazy(() => ProfessorScalarRelationFilterSchema),z.lazy(() => ProfessorWhereInputSchema) ]).optional(),
}).strict();

export const ReversaoValidacaoOrderByWithRelationInputSchema: z.ZodType<Prisma.ReversaoValidacaoOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional(),
  justificativa: z.lazy(() => SortOrderSchema).optional(),
  dataReversao: z.lazy(() => SortOrderSchema).optional(),
  idProfessor: z.lazy(() => SortOrderSchema).optional(),
  relatorio: z.lazy(() => RelatorioAtividadeOrderByWithRelationInputSchema).optional(),
  professor: z.lazy(() => ProfessorOrderByWithRelationInputSchema).optional()
}).strict();

export const ReversaoValidacaoWhereUniqueInputSchema: z.ZodType<Prisma.ReversaoValidacaoWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ReversaoValidacaoWhereInputSchema),z.lazy(() => ReversaoValidacaoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReversaoValidacaoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReversaoValidacaoWhereInputSchema),z.lazy(() => ReversaoValidacaoWhereInputSchema).array() ]).optional(),
  idRelatorio: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  justificativa: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dataReversao: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  idProfessor: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  relatorio: z.union([ z.lazy(() => RelatorioAtividadeScalarRelationFilterSchema),z.lazy(() => RelatorioAtividadeWhereInputSchema) ]).optional(),
  professor: z.union([ z.lazy(() => ProfessorScalarRelationFilterSchema),z.lazy(() => ProfessorWhereInputSchema) ]).optional(),
}).strict());

export const ReversaoValidacaoOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReversaoValidacaoOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional(),
  justificativa: z.lazy(() => SortOrderSchema).optional(),
  dataReversao: z.lazy(() => SortOrderSchema).optional(),
  idProfessor: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ReversaoValidacaoCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ReversaoValidacaoAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReversaoValidacaoMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReversaoValidacaoMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ReversaoValidacaoSumOrderByAggregateInputSchema).optional()
}).strict();

export const ReversaoValidacaoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReversaoValidacaoScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ReversaoValidacaoScalarWhereWithAggregatesInputSchema),z.lazy(() => ReversaoValidacaoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReversaoValidacaoScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReversaoValidacaoScalarWhereWithAggregatesInputSchema),z.lazy(() => ReversaoValidacaoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  idRelatorio: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  justificativa: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  dataReversao: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  idProfessor: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ProfessorCursoWhereInputSchema: z.ZodType<Prisma.ProfessorCursoWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProfessorCursoWhereInputSchema),z.lazy(() => ProfessorCursoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfessorCursoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfessorCursoWhereInputSchema),z.lazy(() => ProfessorCursoWhereInputSchema).array() ]).optional(),
  idProfessor: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  idCurso: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  professor: z.union([ z.lazy(() => ProfessorScalarRelationFilterSchema),z.lazy(() => ProfessorWhereInputSchema) ]).optional(),
  curso: z.union([ z.lazy(() => CursoScalarRelationFilterSchema),z.lazy(() => CursoWhereInputSchema) ]).optional(),
}).strict();

export const ProfessorCursoOrderByWithRelationInputSchema: z.ZodType<Prisma.ProfessorCursoOrderByWithRelationInput> = z.object({
  idProfessor: z.lazy(() => SortOrderSchema).optional(),
  idCurso: z.lazy(() => SortOrderSchema).optional(),
  professor: z.lazy(() => ProfessorOrderByWithRelationInputSchema).optional(),
  curso: z.lazy(() => CursoOrderByWithRelationInputSchema).optional()
}).strict();

export const ProfessorCursoWhereUniqueInputSchema: z.ZodType<Prisma.ProfessorCursoWhereUniqueInput> = z.object({
  idProfessor_idCurso: z.lazy(() => ProfessorCursoIdProfessorIdCursoCompoundUniqueInputSchema)
})
.and(z.object({
  idProfessor_idCurso: z.lazy(() => ProfessorCursoIdProfessorIdCursoCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ProfessorCursoWhereInputSchema),z.lazy(() => ProfessorCursoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfessorCursoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfessorCursoWhereInputSchema),z.lazy(() => ProfessorCursoWhereInputSchema).array() ]).optional(),
  idProfessor: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  idCurso: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  professor: z.union([ z.lazy(() => ProfessorScalarRelationFilterSchema),z.lazy(() => ProfessorWhereInputSchema) ]).optional(),
  curso: z.union([ z.lazy(() => CursoScalarRelationFilterSchema),z.lazy(() => CursoWhereInputSchema) ]).optional(),
}).strict());

export const ProfessorCursoOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProfessorCursoOrderByWithAggregationInput> = z.object({
  idProfessor: z.lazy(() => SortOrderSchema).optional(),
  idCurso: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProfessorCursoCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProfessorCursoAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProfessorCursoMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProfessorCursoMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProfessorCursoSumOrderByAggregateInputSchema).optional()
}).strict();

export const ProfessorCursoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProfessorCursoScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProfessorCursoScalarWhereWithAggregatesInputSchema),z.lazy(() => ProfessorCursoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfessorCursoScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfessorCursoScalarWhereWithAggregatesInputSchema),z.lazy(() => ProfessorCursoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  idProfessor: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  idCurso: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  aluno: z.lazy(() => AlunoCreateNestedOneWithoutUsuarioInputSchema).optional(),
  professor: z.lazy(() => ProfessorCreateNestedOneWithoutUsuarioInputSchema).optional(),
  coordenador: z.lazy(() => CoordenadorCreateNestedOneWithoutUsuarioInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  aluno: z.lazy(() => AlunoUncheckedCreateNestedOneWithoutUsuarioInputSchema).optional(),
  professor: z.lazy(() => ProfessorUncheckedCreateNestedOneWithoutUsuarioInputSchema).optional(),
  coordenador: z.lazy(() => CoordenadorUncheckedCreateNestedOneWithoutUsuarioInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  aluno: z.lazy(() => AlunoUpdateOneWithoutUsuarioNestedInputSchema).optional(),
  professor: z.lazy(() => ProfessorUpdateOneWithoutUsuarioNestedInputSchema).optional(),
  coordenador: z.lazy(() => CoordenadorUpdateOneWithoutUsuarioNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  aluno: z.lazy(() => AlunoUncheckedUpdateOneWithoutUsuarioNestedInputSchema).optional(),
  professor: z.lazy(() => ProfessorUncheckedUpdateOneWithoutUsuarioNestedInputSchema).optional(),
  coordenador: z.lazy(() => CoordenadorUncheckedUpdateOneWithoutUsuarioNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  userId: z.string()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  userId: z.string()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationCreateInputSchema: z.ZodType<Prisma.VerificationCreateInput> = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const VerificationUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationUncheckedCreateInput> = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const VerificationUpdateInputSchema: z.ZodType<Prisma.VerificationUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationCreateManyInputSchema: z.ZodType<Prisma.VerificationCreateManyInput> = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const VerificationUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CursoCreateInputSchema: z.ZodType<Prisma.CursoCreateInput> = z.object({
  nome: z.string(),
  alunos: z.lazy(() => AlunoCreateNestedManyWithoutCursoInputSchema).optional(),
  categorias: z.lazy(() => CategoriaCreateNestedManyWithoutCursoInputSchema).optional(),
  professorCursos: z.lazy(() => ProfessorCursoCreateNestedManyWithoutCursoInputSchema).optional(),
  coordenadorCursos: z.lazy(() => CoordenadorCreateNestedManyWithoutCursoResponsavelInputSchema).optional()
}).strict();

export const CursoUncheckedCreateInputSchema: z.ZodType<Prisma.CursoUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  nome: z.string(),
  alunos: z.lazy(() => AlunoUncheckedCreateNestedManyWithoutCursoInputSchema).optional(),
  categorias: z.lazy(() => CategoriaUncheckedCreateNestedManyWithoutCursoInputSchema).optional(),
  professorCursos: z.lazy(() => ProfessorCursoUncheckedCreateNestedManyWithoutCursoInputSchema).optional(),
  coordenadorCursos: z.lazy(() => CoordenadorUncheckedCreateNestedManyWithoutCursoResponsavelInputSchema).optional()
}).strict();

export const CursoUpdateInputSchema: z.ZodType<Prisma.CursoUpdateInput> = z.object({
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alunos: z.lazy(() => AlunoUpdateManyWithoutCursoNestedInputSchema).optional(),
  categorias: z.lazy(() => CategoriaUpdateManyWithoutCursoNestedInputSchema).optional(),
  professorCursos: z.lazy(() => ProfessorCursoUpdateManyWithoutCursoNestedInputSchema).optional(),
  coordenadorCursos: z.lazy(() => CoordenadorUpdateManyWithoutCursoResponsavelNestedInputSchema).optional()
}).strict();

export const CursoUncheckedUpdateInputSchema: z.ZodType<Prisma.CursoUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alunos: z.lazy(() => AlunoUncheckedUpdateManyWithoutCursoNestedInputSchema).optional(),
  categorias: z.lazy(() => CategoriaUncheckedUpdateManyWithoutCursoNestedInputSchema).optional(),
  professorCursos: z.lazy(() => ProfessorCursoUncheckedUpdateManyWithoutCursoNestedInputSchema).optional(),
  coordenadorCursos: z.lazy(() => CoordenadorUncheckedUpdateManyWithoutCursoResponsavelNestedInputSchema).optional()
}).strict();

export const CursoCreateManyInputSchema: z.ZodType<Prisma.CursoCreateManyInput> = z.object({
  id: z.number().int().optional(),
  nome: z.string()
}).strict();

export const CursoUpdateManyMutationInputSchema: z.ZodType<Prisma.CursoUpdateManyMutationInput> = z.object({
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CursoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CursoUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AlunoCreateInputSchema: z.ZodType<Prisma.AlunoCreateInput> = z.object({
  matricula: z.number().int(),
  usuario: z.lazy(() => UserCreateNestedOneWithoutAlunoInputSchema),
  curso: z.lazy(() => CursoCreateNestedOneWithoutAlunosInputSchema),
  relatoriosAtividades: z.lazy(() => RelatorioAtividadeCreateNestedManyWithoutAlunoInputSchema).optional()
}).strict();

export const AlunoUncheckedCreateInputSchema: z.ZodType<Prisma.AlunoUncheckedCreateInput> = z.object({
  idUsuario: z.string(),
  matricula: z.number().int(),
  idCurso: z.number().int(),
  relatoriosAtividades: z.lazy(() => RelatorioAtividadeUncheckedCreateNestedManyWithoutAlunoInputSchema).optional()
}).strict();

export const AlunoUpdateInputSchema: z.ZodType<Prisma.AlunoUpdateInput> = z.object({
  matricula: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  usuario: z.lazy(() => UserUpdateOneRequiredWithoutAlunoNestedInputSchema).optional(),
  curso: z.lazy(() => CursoUpdateOneRequiredWithoutAlunosNestedInputSchema).optional(),
  relatoriosAtividades: z.lazy(() => RelatorioAtividadeUpdateManyWithoutAlunoNestedInputSchema).optional()
}).strict();

export const AlunoUncheckedUpdateInputSchema: z.ZodType<Prisma.AlunoUncheckedUpdateInput> = z.object({
  idUsuario: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  matricula: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idCurso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  relatoriosAtividades: z.lazy(() => RelatorioAtividadeUncheckedUpdateManyWithoutAlunoNestedInputSchema).optional()
}).strict();

export const AlunoCreateManyInputSchema: z.ZodType<Prisma.AlunoCreateManyInput> = z.object({
  idUsuario: z.string(),
  matricula: z.number().int(),
  idCurso: z.number().int()
}).strict();

export const AlunoUpdateManyMutationInputSchema: z.ZodType<Prisma.AlunoUpdateManyMutationInput> = z.object({
  matricula: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AlunoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AlunoUncheckedUpdateManyInput> = z.object({
  idUsuario: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  matricula: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idCurso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfessorCreateInputSchema: z.ZodType<Prisma.ProfessorCreateInput> = z.object({
  usuario: z.lazy(() => UserCreateNestedOneWithoutProfessorInputSchema),
  professorCursos: z.lazy(() => ProfessorCursoCreateNestedManyWithoutProfessorInputSchema).optional(),
  feedbacks: z.lazy(() => FeedbackCreateNestedManyWithoutProfessorInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoCreateNestedManyWithoutProfessorInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoCreateNestedManyWithoutProfessorInputSchema).optional()
}).strict();

export const ProfessorUncheckedCreateInputSchema: z.ZodType<Prisma.ProfessorUncheckedCreateInput> = z.object({
  idUsuario: z.string(),
  professorCursos: z.lazy(() => ProfessorCursoUncheckedCreateNestedManyWithoutProfessorInputSchema).optional(),
  feedbacks: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutProfessorInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUncheckedCreateNestedManyWithoutProfessorInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUncheckedCreateNestedManyWithoutProfessorInputSchema).optional()
}).strict();

export const ProfessorUpdateInputSchema: z.ZodType<Prisma.ProfessorUpdateInput> = z.object({
  usuario: z.lazy(() => UserUpdateOneRequiredWithoutProfessorNestedInputSchema).optional(),
  professorCursos: z.lazy(() => ProfessorCursoUpdateManyWithoutProfessorNestedInputSchema).optional(),
  feedbacks: z.lazy(() => FeedbackUpdateManyWithoutProfessorNestedInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUpdateManyWithoutProfessorNestedInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUpdateManyWithoutProfessorNestedInputSchema).optional()
}).strict();

export const ProfessorUncheckedUpdateInputSchema: z.ZodType<Prisma.ProfessorUncheckedUpdateInput> = z.object({
  idUsuario: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  professorCursos: z.lazy(() => ProfessorCursoUncheckedUpdateManyWithoutProfessorNestedInputSchema).optional(),
  feedbacks: z.lazy(() => FeedbackUncheckedUpdateManyWithoutProfessorNestedInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUncheckedUpdateManyWithoutProfessorNestedInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUncheckedUpdateManyWithoutProfessorNestedInputSchema).optional()
}).strict();

export const ProfessorCreateManyInputSchema: z.ZodType<Prisma.ProfessorCreateManyInput> = z.object({
  idUsuario: z.string()
}).strict();

export const ProfessorUpdateManyMutationInputSchema: z.ZodType<Prisma.ProfessorUpdateManyMutationInput> = z.object({
}).strict();

export const ProfessorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProfessorUncheckedUpdateManyInput> = z.object({
  idUsuario: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CoordenadorCreateInputSchema: z.ZodType<Prisma.CoordenadorCreateInput> = z.object({
  usuario: z.lazy(() => UserCreateNestedOneWithoutCoordenadorInputSchema),
  cursoResponsavel: z.lazy(() => CursoCreateNestedOneWithoutCoordenadorCursosInputSchema)
}).strict();

export const CoordenadorUncheckedCreateInputSchema: z.ZodType<Prisma.CoordenadorUncheckedCreateInput> = z.object({
  idUsuario: z.string(),
  idCursoResponsavel: z.number().int()
}).strict();

export const CoordenadorUpdateInputSchema: z.ZodType<Prisma.CoordenadorUpdateInput> = z.object({
  usuario: z.lazy(() => UserUpdateOneRequiredWithoutCoordenadorNestedInputSchema).optional(),
  cursoResponsavel: z.lazy(() => CursoUpdateOneRequiredWithoutCoordenadorCursosNestedInputSchema).optional()
}).strict();

export const CoordenadorUncheckedUpdateInputSchema: z.ZodType<Prisma.CoordenadorUncheckedUpdateInput> = z.object({
  idUsuario: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idCursoResponsavel: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CoordenadorCreateManyInputSchema: z.ZodType<Prisma.CoordenadorCreateManyInput> = z.object({
  idUsuario: z.string(),
  idCursoResponsavel: z.number().int()
}).strict();

export const CoordenadorUpdateManyMutationInputSchema: z.ZodType<Prisma.CoordenadorUpdateManyMutationInput> = z.object({
}).strict();

export const CoordenadorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CoordenadorUncheckedUpdateManyInput> = z.object({
  idUsuario: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idCursoResponsavel: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoriaCreateInputSchema: z.ZodType<Prisma.CategoriaCreateInput> = z.object({
  nome: z.string(),
  descricao: z.string(),
  cargaHoraria: z.number().int(),
  curso: z.lazy(() => CursoCreateNestedOneWithoutCategoriasInputSchema),
  relatoriosAtividades: z.lazy(() => RelatorioAtividadeCreateNestedManyWithoutCategoriaInputSchema).optional()
}).strict();

export const CategoriaUncheckedCreateInputSchema: z.ZodType<Prisma.CategoriaUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  nome: z.string(),
  descricao: z.string(),
  cargaHoraria: z.number().int(),
  idCurso: z.number().int(),
  relatoriosAtividades: z.lazy(() => RelatorioAtividadeUncheckedCreateNestedManyWithoutCategoriaInputSchema).optional()
}).strict();

export const CategoriaUpdateInputSchema: z.ZodType<Prisma.CategoriaUpdateInput> = z.object({
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cargaHoraria: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  curso: z.lazy(() => CursoUpdateOneRequiredWithoutCategoriasNestedInputSchema).optional(),
  relatoriosAtividades: z.lazy(() => RelatorioAtividadeUpdateManyWithoutCategoriaNestedInputSchema).optional()
}).strict();

export const CategoriaUncheckedUpdateInputSchema: z.ZodType<Prisma.CategoriaUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cargaHoraria: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idCurso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  relatoriosAtividades: z.lazy(() => RelatorioAtividadeUncheckedUpdateManyWithoutCategoriaNestedInputSchema).optional()
}).strict();

export const CategoriaCreateManyInputSchema: z.ZodType<Prisma.CategoriaCreateManyInput> = z.object({
  id: z.number().int().optional(),
  nome: z.string(),
  descricao: z.string(),
  cargaHoraria: z.number().int(),
  idCurso: z.number().int()
}).strict();

export const CategoriaUpdateManyMutationInputSchema: z.ZodType<Prisma.CategoriaUpdateManyMutationInput> = z.object({
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cargaHoraria: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoriaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CategoriaUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cargaHoraria: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idCurso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RelatorioAtividadeCreateInputSchema: z.ZodType<Prisma.RelatorioAtividadeCreateInput> = z.object({
  nome: z.string(),
  textoReflexao: z.string(),
  dataRealizacao: z.coerce.date(),
  dataEnvio: z.coerce.date(),
  status: z.lazy(() => StatusRelatorioSchema).optional(),
  horasValidadas: z.number().int(),
  certificado: z.instanceof(Buffer),
  aluno: z.lazy(() => AlunoCreateNestedOneWithoutRelatoriosAtividadesInputSchema),
  categoria: z.lazy(() => CategoriaCreateNestedOneWithoutRelatoriosAtividadesInputSchema),
  feedbacks: z.lazy(() => FeedbackCreateNestedManyWithoutRelatorioInputSchema).optional(),
  historicos: z.lazy(() => HistoricoRelatorioCreateNestedManyWithoutRelatorioInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoCreateNestedManyWithoutRelatorioInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoCreateNestedManyWithoutRelatorioInputSchema).optional()
}).strict();

export const RelatorioAtividadeUncheckedCreateInputSchema: z.ZodType<Prisma.RelatorioAtividadeUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  nome: z.string(),
  textoReflexao: z.string(),
  dataRealizacao: z.coerce.date(),
  dataEnvio: z.coerce.date(),
  status: z.lazy(() => StatusRelatorioSchema).optional(),
  horasValidadas: z.number().int(),
  certificado: z.instanceof(Buffer),
  idAluno: z.string(),
  idCategoria: z.number().int(),
  feedbacks: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutRelatorioInputSchema).optional(),
  historicos: z.lazy(() => HistoricoRelatorioUncheckedCreateNestedManyWithoutRelatorioInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUncheckedCreateNestedManyWithoutRelatorioInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUncheckedCreateNestedManyWithoutRelatorioInputSchema).optional()
}).strict();

export const RelatorioAtividadeUpdateInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpdateInput> = z.object({
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  textoReflexao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataRealizacao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => EnumStatusRelatorioFieldUpdateOperationsInputSchema) ]).optional(),
  horasValidadas: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  certificado: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  aluno: z.lazy(() => AlunoUpdateOneRequiredWithoutRelatoriosAtividadesNestedInputSchema).optional(),
  categoria: z.lazy(() => CategoriaUpdateOneRequiredWithoutRelatoriosAtividadesNestedInputSchema).optional(),
  feedbacks: z.lazy(() => FeedbackUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  historicos: z.lazy(() => HistoricoRelatorioUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUpdateManyWithoutRelatorioNestedInputSchema).optional()
}).strict();

export const RelatorioAtividadeUncheckedUpdateInputSchema: z.ZodType<Prisma.RelatorioAtividadeUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  textoReflexao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataRealizacao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => EnumStatusRelatorioFieldUpdateOperationsInputSchema) ]).optional(),
  horasValidadas: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  certificado: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  idAluno: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idCategoria: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  feedbacks: z.lazy(() => FeedbackUncheckedUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  historicos: z.lazy(() => HistoricoRelatorioUncheckedUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUncheckedUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUncheckedUpdateManyWithoutRelatorioNestedInputSchema).optional()
}).strict();

export const RelatorioAtividadeCreateManyInputSchema: z.ZodType<Prisma.RelatorioAtividadeCreateManyInput> = z.object({
  id: z.number().int().optional(),
  nome: z.string(),
  textoReflexao: z.string(),
  dataRealizacao: z.coerce.date(),
  dataEnvio: z.coerce.date(),
  status: z.lazy(() => StatusRelatorioSchema).optional(),
  horasValidadas: z.number().int(),
  certificado: z.instanceof(Buffer),
  idAluno: z.string(),
  idCategoria: z.number().int()
}).strict();

export const RelatorioAtividadeUpdateManyMutationInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpdateManyMutationInput> = z.object({
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  textoReflexao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataRealizacao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => EnumStatusRelatorioFieldUpdateOperationsInputSchema) ]).optional(),
  horasValidadas: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  certificado: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RelatorioAtividadeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RelatorioAtividadeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  textoReflexao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataRealizacao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => EnumStatusRelatorioFieldUpdateOperationsInputSchema) ]).optional(),
  horasValidadas: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  certificado: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  idAluno: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idCategoria: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackCreateInputSchema: z.ZodType<Prisma.FeedbackCreateInput> = z.object({
  textoFeedback: z.string(),
  dataEnvio: z.coerce.date(),
  professor: z.lazy(() => ProfessorCreateNestedOneWithoutFeedbacksInputSchema),
  relatorio: z.lazy(() => RelatorioAtividadeCreateNestedOneWithoutFeedbacksInputSchema),
  historicos: z.lazy(() => FeedbackHistoricoCreateNestedManyWithoutFeedbackInputSchema).optional()
}).strict();

export const FeedbackUncheckedCreateInputSchema: z.ZodType<Prisma.FeedbackUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  textoFeedback: z.string(),
  dataEnvio: z.coerce.date(),
  idProfessor: z.string(),
  idRelatorio: z.number().int(),
  historicos: z.lazy(() => FeedbackHistoricoUncheckedCreateNestedManyWithoutFeedbackInputSchema).optional()
}).strict();

export const FeedbackUpdateInputSchema: z.ZodType<Prisma.FeedbackUpdateInput> = z.object({
  textoFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  professor: z.lazy(() => ProfessorUpdateOneRequiredWithoutFeedbacksNestedInputSchema).optional(),
  relatorio: z.lazy(() => RelatorioAtividadeUpdateOneRequiredWithoutFeedbacksNestedInputSchema).optional(),
  historicos: z.lazy(() => FeedbackHistoricoUpdateManyWithoutFeedbackNestedInputSchema).optional()
}).strict();

export const FeedbackUncheckedUpdateInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  textoFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  idProfessor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idRelatorio: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historicos: z.lazy(() => FeedbackHistoricoUncheckedUpdateManyWithoutFeedbackNestedInputSchema).optional()
}).strict();

export const FeedbackCreateManyInputSchema: z.ZodType<Prisma.FeedbackCreateManyInput> = z.object({
  id: z.number().int().optional(),
  textoFeedback: z.string(),
  dataEnvio: z.coerce.date(),
  idProfessor: z.string(),
  idRelatorio: z.number().int()
}).strict();

export const FeedbackUpdateManyMutationInputSchema: z.ZodType<Prisma.FeedbackUpdateManyMutationInput> = z.object({
  textoFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  textoFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  idProfessor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idRelatorio: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackHistoricoCreateInputSchema: z.ZodType<Prisma.FeedbackHistoricoCreateInput> = z.object({
  textoFeedback: z.string(),
  dataEnvio: z.coerce.date().optional(),
  versao: z.number().int().optional().nullable(),
  feedback: z.lazy(() => FeedbackCreateNestedOneWithoutHistoricosInputSchema).optional(),
  relatorio: z.lazy(() => RelatorioAtividadeCreateNestedOneWithoutFeedbackHistoricosInputSchema),
  professor: z.lazy(() => ProfessorCreateNestedOneWithoutFeedbackHistoricosInputSchema).optional()
}).strict();

export const FeedbackHistoricoUncheckedCreateInputSchema: z.ZodType<Prisma.FeedbackHistoricoUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  idFeedback: z.number().int().optional().nullable(),
  idRelatorio: z.number().int(),
  textoFeedback: z.string(),
  dataEnvio: z.coerce.date().optional(),
  idProfessor: z.string().optional().nullable(),
  versao: z.number().int().optional().nullable()
}).strict();

export const FeedbackHistoricoUpdateInputSchema: z.ZodType<Prisma.FeedbackHistoricoUpdateInput> = z.object({
  textoFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  versao: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  feedback: z.lazy(() => FeedbackUpdateOneWithoutHistoricosNestedInputSchema).optional(),
  relatorio: z.lazy(() => RelatorioAtividadeUpdateOneRequiredWithoutFeedbackHistoricosNestedInputSchema).optional(),
  professor: z.lazy(() => ProfessorUpdateOneWithoutFeedbackHistoricosNestedInputSchema).optional()
}).strict();

export const FeedbackHistoricoUncheckedUpdateInputSchema: z.ZodType<Prisma.FeedbackHistoricoUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idFeedback: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idRelatorio: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  textoFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  idProfessor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  versao: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FeedbackHistoricoCreateManyInputSchema: z.ZodType<Prisma.FeedbackHistoricoCreateManyInput> = z.object({
  id: z.number().int().optional(),
  idFeedback: z.number().int().optional().nullable(),
  idRelatorio: z.number().int(),
  textoFeedback: z.string(),
  dataEnvio: z.coerce.date().optional(),
  idProfessor: z.string().optional().nullable(),
  versao: z.number().int().optional().nullable()
}).strict();

export const FeedbackHistoricoUpdateManyMutationInputSchema: z.ZodType<Prisma.FeedbackHistoricoUpdateManyMutationInput> = z.object({
  textoFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  versao: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FeedbackHistoricoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FeedbackHistoricoUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idFeedback: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idRelatorio: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  textoFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  idProfessor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  versao: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const HistoricoRelatorioCreateInputSchema: z.ZodType<Prisma.HistoricoRelatorioCreateInput> = z.object({
  nomeAnterior: z.string().optional().nullable(),
  textoReflexaoAnterior: z.string().optional().nullable(),
  dataRealizacaoAnterior: z.coerce.date().optional().nullable(),
  statusAnterior: z.lazy(() => StatusRelatorioSchema).optional().nullable(),
  dataAlteracao: z.coerce.date().optional(),
  certificadoAnterior: z.instanceof(Buffer).optional().nullable(),
  relatorio: z.lazy(() => RelatorioAtividadeCreateNestedOneWithoutHistoricosInputSchema)
}).strict();

export const HistoricoRelatorioUncheckedCreateInputSchema: z.ZodType<Prisma.HistoricoRelatorioUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  idRelatorio: z.number().int(),
  nomeAnterior: z.string().optional().nullable(),
  textoReflexaoAnterior: z.string().optional().nullable(),
  dataRealizacaoAnterior: z.coerce.date().optional().nullable(),
  statusAnterior: z.lazy(() => StatusRelatorioSchema).optional().nullable(),
  dataAlteracao: z.coerce.date().optional(),
  certificadoAnterior: z.instanceof(Buffer).optional().nullable()
}).strict();

export const HistoricoRelatorioUpdateInputSchema: z.ZodType<Prisma.HistoricoRelatorioUpdateInput> = z.object({
  nomeAnterior: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  textoReflexaoAnterior: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dataRealizacaoAnterior: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statusAnterior: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => NullableEnumStatusRelatorioFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dataAlteracao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  certificadoAnterior: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  relatorio: z.lazy(() => RelatorioAtividadeUpdateOneRequiredWithoutHistoricosNestedInputSchema).optional()
}).strict();

export const HistoricoRelatorioUncheckedUpdateInputSchema: z.ZodType<Prisma.HistoricoRelatorioUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idRelatorio: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nomeAnterior: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  textoReflexaoAnterior: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dataRealizacaoAnterior: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statusAnterior: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => NullableEnumStatusRelatorioFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dataAlteracao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  certificadoAnterior: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const HistoricoRelatorioCreateManyInputSchema: z.ZodType<Prisma.HistoricoRelatorioCreateManyInput> = z.object({
  id: z.number().int().optional(),
  idRelatorio: z.number().int(),
  nomeAnterior: z.string().optional().nullable(),
  textoReflexaoAnterior: z.string().optional().nullable(),
  dataRealizacaoAnterior: z.coerce.date().optional().nullable(),
  statusAnterior: z.lazy(() => StatusRelatorioSchema).optional().nullable(),
  dataAlteracao: z.coerce.date().optional(),
  certificadoAnterior: z.instanceof(Buffer).optional().nullable()
}).strict();

export const HistoricoRelatorioUpdateManyMutationInputSchema: z.ZodType<Prisma.HistoricoRelatorioUpdateManyMutationInput> = z.object({
  nomeAnterior: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  textoReflexaoAnterior: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dataRealizacaoAnterior: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statusAnterior: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => NullableEnumStatusRelatorioFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dataAlteracao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  certificadoAnterior: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const HistoricoRelatorioUncheckedUpdateManyInputSchema: z.ZodType<Prisma.HistoricoRelatorioUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idRelatorio: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nomeAnterior: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  textoReflexaoAnterior: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dataRealizacaoAnterior: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statusAnterior: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => NullableEnumStatusRelatorioFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dataAlteracao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  certificadoAnterior: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReversaoValidacaoCreateInputSchema: z.ZodType<Prisma.ReversaoValidacaoCreateInput> = z.object({
  justificativa: z.string(),
  dataReversao: z.coerce.date().optional(),
  relatorio: z.lazy(() => RelatorioAtividadeCreateNestedOneWithoutReversoesValidacaoInputSchema),
  professor: z.lazy(() => ProfessorCreateNestedOneWithoutReversoesValidacaoInputSchema)
}).strict();

export const ReversaoValidacaoUncheckedCreateInputSchema: z.ZodType<Prisma.ReversaoValidacaoUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  idRelatorio: z.number().int(),
  justificativa: z.string(),
  dataReversao: z.coerce.date().optional(),
  idProfessor: z.string()
}).strict();

export const ReversaoValidacaoUpdateInputSchema: z.ZodType<Prisma.ReversaoValidacaoUpdateInput> = z.object({
  justificativa: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataReversao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  relatorio: z.lazy(() => RelatorioAtividadeUpdateOneRequiredWithoutReversoesValidacaoNestedInputSchema).optional(),
  professor: z.lazy(() => ProfessorUpdateOneRequiredWithoutReversoesValidacaoNestedInputSchema).optional()
}).strict();

export const ReversaoValidacaoUncheckedUpdateInputSchema: z.ZodType<Prisma.ReversaoValidacaoUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idRelatorio: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  justificativa: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataReversao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  idProfessor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReversaoValidacaoCreateManyInputSchema: z.ZodType<Prisma.ReversaoValidacaoCreateManyInput> = z.object({
  id: z.number().int().optional(),
  idRelatorio: z.number().int(),
  justificativa: z.string(),
  dataReversao: z.coerce.date().optional(),
  idProfessor: z.string()
}).strict();

export const ReversaoValidacaoUpdateManyMutationInputSchema: z.ZodType<Prisma.ReversaoValidacaoUpdateManyMutationInput> = z.object({
  justificativa: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataReversao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReversaoValidacaoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReversaoValidacaoUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idRelatorio: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  justificativa: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataReversao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  idProfessor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfessorCursoCreateInputSchema: z.ZodType<Prisma.ProfessorCursoCreateInput> = z.object({
  professor: z.lazy(() => ProfessorCreateNestedOneWithoutProfessorCursosInputSchema),
  curso: z.lazy(() => CursoCreateNestedOneWithoutProfessorCursosInputSchema)
}).strict();

export const ProfessorCursoUncheckedCreateInputSchema: z.ZodType<Prisma.ProfessorCursoUncheckedCreateInput> = z.object({
  idProfessor: z.string(),
  idCurso: z.number().int()
}).strict();

export const ProfessorCursoUpdateInputSchema: z.ZodType<Prisma.ProfessorCursoUpdateInput> = z.object({
  professor: z.lazy(() => ProfessorUpdateOneRequiredWithoutProfessorCursosNestedInputSchema).optional(),
  curso: z.lazy(() => CursoUpdateOneRequiredWithoutProfessorCursosNestedInputSchema).optional()
}).strict();

export const ProfessorCursoUncheckedUpdateInputSchema: z.ZodType<Prisma.ProfessorCursoUncheckedUpdateInput> = z.object({
  idProfessor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idCurso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfessorCursoCreateManyInputSchema: z.ZodType<Prisma.ProfessorCursoCreateManyInput> = z.object({
  idProfessor: z.string(),
  idCurso: z.number().int()
}).strict();

export const ProfessorCursoUpdateManyMutationInputSchema: z.ZodType<Prisma.ProfessorCursoUpdateManyMutationInput> = z.object({
}).strict();

export const ProfessorCursoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProfessorCursoUncheckedUpdateManyInput> = z.object({
  idProfessor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idCurso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const AlunoNullableScalarRelationFilterSchema: z.ZodType<Prisma.AlunoNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => AlunoWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AlunoWhereInputSchema).optional().nullable()
}).strict();

export const ProfessorNullableScalarRelationFilterSchema: z.ZodType<Prisma.ProfessorNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => ProfessorWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ProfessorWhereInputSchema).optional().nullable()
}).strict();

export const CoordenadorNullableScalarRelationFilterSchema: z.ZodType<Prisma.CoordenadorNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => CoordenadorWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CoordenadorWhereInputSchema).optional().nullable()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  idToken: z.lazy(() => SortOrderSchema).optional(),
  accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  idToken: z.lazy(() => SortOrderSchema).optional(),
  accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  idToken: z.lazy(() => SortOrderSchema).optional(),
  accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const VerificationCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const AlunoListRelationFilterSchema: z.ZodType<Prisma.AlunoListRelationFilter> = z.object({
  every: z.lazy(() => AlunoWhereInputSchema).optional(),
  some: z.lazy(() => AlunoWhereInputSchema).optional(),
  none: z.lazy(() => AlunoWhereInputSchema).optional()
}).strict();

export const CategoriaListRelationFilterSchema: z.ZodType<Prisma.CategoriaListRelationFilter> = z.object({
  every: z.lazy(() => CategoriaWhereInputSchema).optional(),
  some: z.lazy(() => CategoriaWhereInputSchema).optional(),
  none: z.lazy(() => CategoriaWhereInputSchema).optional()
}).strict();

export const ProfessorCursoListRelationFilterSchema: z.ZodType<Prisma.ProfessorCursoListRelationFilter> = z.object({
  every: z.lazy(() => ProfessorCursoWhereInputSchema).optional(),
  some: z.lazy(() => ProfessorCursoWhereInputSchema).optional(),
  none: z.lazy(() => ProfessorCursoWhereInputSchema).optional()
}).strict();

export const CoordenadorListRelationFilterSchema: z.ZodType<Prisma.CoordenadorListRelationFilter> = z.object({
  every: z.lazy(() => CoordenadorWhereInputSchema).optional(),
  some: z.lazy(() => CoordenadorWhereInputSchema).optional(),
  none: z.lazy(() => CoordenadorWhereInputSchema).optional()
}).strict();

export const AlunoOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AlunoOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoriaOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CategoriaOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfessorCursoOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProfessorCursoOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CoordenadorOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CoordenadorOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CursoCountOrderByAggregateInputSchema: z.ZodType<Prisma.CursoCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CursoAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CursoAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CursoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CursoMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CursoMinOrderByAggregateInputSchema: z.ZodType<Prisma.CursoMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CursoSumOrderByAggregateInputSchema: z.ZodType<Prisma.CursoSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const CursoScalarRelationFilterSchema: z.ZodType<Prisma.CursoScalarRelationFilter> = z.object({
  is: z.lazy(() => CursoWhereInputSchema).optional(),
  isNot: z.lazy(() => CursoWhereInputSchema).optional()
}).strict();

export const RelatorioAtividadeListRelationFilterSchema: z.ZodType<Prisma.RelatorioAtividadeListRelationFilter> = z.object({
  every: z.lazy(() => RelatorioAtividadeWhereInputSchema).optional(),
  some: z.lazy(() => RelatorioAtividadeWhereInputSchema).optional(),
  none: z.lazy(() => RelatorioAtividadeWhereInputSchema).optional()
}).strict();

export const RelatorioAtividadeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RelatorioAtividadeOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AlunoCountOrderByAggregateInputSchema: z.ZodType<Prisma.AlunoCountOrderByAggregateInput> = z.object({
  idUsuario: z.lazy(() => SortOrderSchema).optional(),
  matricula: z.lazy(() => SortOrderSchema).optional(),
  idCurso: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AlunoAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AlunoAvgOrderByAggregateInput> = z.object({
  matricula: z.lazy(() => SortOrderSchema).optional(),
  idCurso: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AlunoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AlunoMaxOrderByAggregateInput> = z.object({
  idUsuario: z.lazy(() => SortOrderSchema).optional(),
  matricula: z.lazy(() => SortOrderSchema).optional(),
  idCurso: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AlunoMinOrderByAggregateInputSchema: z.ZodType<Prisma.AlunoMinOrderByAggregateInput> = z.object({
  idUsuario: z.lazy(() => SortOrderSchema).optional(),
  matricula: z.lazy(() => SortOrderSchema).optional(),
  idCurso: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AlunoSumOrderByAggregateInputSchema: z.ZodType<Prisma.AlunoSumOrderByAggregateInput> = z.object({
  matricula: z.lazy(() => SortOrderSchema).optional(),
  idCurso: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackListRelationFilterSchema: z.ZodType<Prisma.FeedbackListRelationFilter> = z.object({
  every: z.lazy(() => FeedbackWhereInputSchema).optional(),
  some: z.lazy(() => FeedbackWhereInputSchema).optional(),
  none: z.lazy(() => FeedbackWhereInputSchema).optional()
}).strict();

export const ReversaoValidacaoListRelationFilterSchema: z.ZodType<Prisma.ReversaoValidacaoListRelationFilter> = z.object({
  every: z.lazy(() => ReversaoValidacaoWhereInputSchema).optional(),
  some: z.lazy(() => ReversaoValidacaoWhereInputSchema).optional(),
  none: z.lazy(() => ReversaoValidacaoWhereInputSchema).optional()
}).strict();

export const FeedbackHistoricoListRelationFilterSchema: z.ZodType<Prisma.FeedbackHistoricoListRelationFilter> = z.object({
  every: z.lazy(() => FeedbackHistoricoWhereInputSchema).optional(),
  some: z.lazy(() => FeedbackHistoricoWhereInputSchema).optional(),
  none: z.lazy(() => FeedbackHistoricoWhereInputSchema).optional()
}).strict();

export const FeedbackOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FeedbackOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReversaoValidacaoOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReversaoValidacaoOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackHistoricoOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FeedbackHistoricoOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfessorCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProfessorCountOrderByAggregateInput> = z.object({
  idUsuario: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfessorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProfessorMaxOrderByAggregateInput> = z.object({
  idUsuario: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfessorMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProfessorMinOrderByAggregateInput> = z.object({
  idUsuario: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CoordenadorCountOrderByAggregateInputSchema: z.ZodType<Prisma.CoordenadorCountOrderByAggregateInput> = z.object({
  idUsuario: z.lazy(() => SortOrderSchema).optional(),
  idCursoResponsavel: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CoordenadorAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CoordenadorAvgOrderByAggregateInput> = z.object({
  idCursoResponsavel: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CoordenadorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CoordenadorMaxOrderByAggregateInput> = z.object({
  idUsuario: z.lazy(() => SortOrderSchema).optional(),
  idCursoResponsavel: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CoordenadorMinOrderByAggregateInputSchema: z.ZodType<Prisma.CoordenadorMinOrderByAggregateInput> = z.object({
  idUsuario: z.lazy(() => SortOrderSchema).optional(),
  idCursoResponsavel: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CoordenadorSumOrderByAggregateInputSchema: z.ZodType<Prisma.CoordenadorSumOrderByAggregateInput> = z.object({
  idCursoResponsavel: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoriaCountOrderByAggregateInputSchema: z.ZodType<Prisma.CategoriaCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  descricao: z.lazy(() => SortOrderSchema).optional(),
  cargaHoraria: z.lazy(() => SortOrderSchema).optional(),
  idCurso: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoriaAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CategoriaAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  cargaHoraria: z.lazy(() => SortOrderSchema).optional(),
  idCurso: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoriaMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CategoriaMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  descricao: z.lazy(() => SortOrderSchema).optional(),
  cargaHoraria: z.lazy(() => SortOrderSchema).optional(),
  idCurso: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoriaMinOrderByAggregateInputSchema: z.ZodType<Prisma.CategoriaMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  descricao: z.lazy(() => SortOrderSchema).optional(),
  cargaHoraria: z.lazy(() => SortOrderSchema).optional(),
  idCurso: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoriaSumOrderByAggregateInputSchema: z.ZodType<Prisma.CategoriaSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  cargaHoraria: z.lazy(() => SortOrderSchema).optional(),
  idCurso: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumStatusRelatorioFilterSchema: z.ZodType<Prisma.EnumStatusRelatorioFilter> = z.object({
  equals: z.lazy(() => StatusRelatorioSchema).optional(),
  in: z.lazy(() => StatusRelatorioSchema).array().optional(),
  notIn: z.lazy(() => StatusRelatorioSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => NestedEnumStatusRelatorioFilterSchema) ]).optional(),
}).strict();

export const BytesFilterSchema: z.ZodType<Prisma.BytesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesFilterSchema) ]).optional(),
}).strict();

export const AlunoScalarRelationFilterSchema: z.ZodType<Prisma.AlunoScalarRelationFilter> = z.object({
  is: z.lazy(() => AlunoWhereInputSchema).optional(),
  isNot: z.lazy(() => AlunoWhereInputSchema).optional()
}).strict();

export const CategoriaScalarRelationFilterSchema: z.ZodType<Prisma.CategoriaScalarRelationFilter> = z.object({
  is: z.lazy(() => CategoriaWhereInputSchema).optional(),
  isNot: z.lazy(() => CategoriaWhereInputSchema).optional()
}).strict();

export const HistoricoRelatorioListRelationFilterSchema: z.ZodType<Prisma.HistoricoRelatorioListRelationFilter> = z.object({
  every: z.lazy(() => HistoricoRelatorioWhereInputSchema).optional(),
  some: z.lazy(() => HistoricoRelatorioWhereInputSchema).optional(),
  none: z.lazy(() => HistoricoRelatorioWhereInputSchema).optional()
}).strict();

export const HistoricoRelatorioOrderByRelationAggregateInputSchema: z.ZodType<Prisma.HistoricoRelatorioOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RelatorioAtividadeCountOrderByAggregateInputSchema: z.ZodType<Prisma.RelatorioAtividadeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  textoReflexao: z.lazy(() => SortOrderSchema).optional(),
  dataRealizacao: z.lazy(() => SortOrderSchema).optional(),
  dataEnvio: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  horasValidadas: z.lazy(() => SortOrderSchema).optional(),
  certificado: z.lazy(() => SortOrderSchema).optional(),
  idAluno: z.lazy(() => SortOrderSchema).optional(),
  idCategoria: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RelatorioAtividadeAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RelatorioAtividadeAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  horasValidadas: z.lazy(() => SortOrderSchema).optional(),
  idCategoria: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RelatorioAtividadeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RelatorioAtividadeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  textoReflexao: z.lazy(() => SortOrderSchema).optional(),
  dataRealizacao: z.lazy(() => SortOrderSchema).optional(),
  dataEnvio: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  horasValidadas: z.lazy(() => SortOrderSchema).optional(),
  certificado: z.lazy(() => SortOrderSchema).optional(),
  idAluno: z.lazy(() => SortOrderSchema).optional(),
  idCategoria: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RelatorioAtividadeMinOrderByAggregateInputSchema: z.ZodType<Prisma.RelatorioAtividadeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  textoReflexao: z.lazy(() => SortOrderSchema).optional(),
  dataRealizacao: z.lazy(() => SortOrderSchema).optional(),
  dataEnvio: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  horasValidadas: z.lazy(() => SortOrderSchema).optional(),
  certificado: z.lazy(() => SortOrderSchema).optional(),
  idAluno: z.lazy(() => SortOrderSchema).optional(),
  idCategoria: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RelatorioAtividadeSumOrderByAggregateInputSchema: z.ZodType<Prisma.RelatorioAtividadeSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  horasValidadas: z.lazy(() => SortOrderSchema).optional(),
  idCategoria: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumStatusRelatorioWithAggregatesFilterSchema: z.ZodType<Prisma.EnumStatusRelatorioWithAggregatesFilter> = z.object({
  equals: z.lazy(() => StatusRelatorioSchema).optional(),
  in: z.lazy(() => StatusRelatorioSchema).array().optional(),
  notIn: z.lazy(() => StatusRelatorioSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => NestedEnumStatusRelatorioWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStatusRelatorioFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStatusRelatorioFilterSchema).optional()
}).strict();

export const BytesWithAggregatesFilterSchema: z.ZodType<Prisma.BytesWithAggregatesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBytesFilterSchema).optional(),
  _max: z.lazy(() => NestedBytesFilterSchema).optional()
}).strict();

export const ProfessorScalarRelationFilterSchema: z.ZodType<Prisma.ProfessorScalarRelationFilter> = z.object({
  is: z.lazy(() => ProfessorWhereInputSchema).optional(),
  isNot: z.lazy(() => ProfessorWhereInputSchema).optional()
}).strict();

export const RelatorioAtividadeScalarRelationFilterSchema: z.ZodType<Prisma.RelatorioAtividadeScalarRelationFilter> = z.object({
  is: z.lazy(() => RelatorioAtividadeWhereInputSchema).optional(),
  isNot: z.lazy(() => RelatorioAtividadeWhereInputSchema).optional()
}).strict();

export const FeedbackCountOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  textoFeedback: z.lazy(() => SortOrderSchema).optional(),
  dataEnvio: z.lazy(() => SortOrderSchema).optional(),
  idProfessor: z.lazy(() => SortOrderSchema).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  textoFeedback: z.lazy(() => SortOrderSchema).optional(),
  dataEnvio: z.lazy(() => SortOrderSchema).optional(),
  idProfessor: z.lazy(() => SortOrderSchema).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackMinOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  textoFeedback: z.lazy(() => SortOrderSchema).optional(),
  dataEnvio: z.lazy(() => SortOrderSchema).optional(),
  idProfessor: z.lazy(() => SortOrderSchema).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackSumOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const FeedbackNullableScalarRelationFilterSchema: z.ZodType<Prisma.FeedbackNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => FeedbackWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => FeedbackWhereInputSchema).optional().nullable()
}).strict();

export const FeedbackHistoricoCountOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackHistoricoCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idFeedback: z.lazy(() => SortOrderSchema).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional(),
  textoFeedback: z.lazy(() => SortOrderSchema).optional(),
  dataEnvio: z.lazy(() => SortOrderSchema).optional(),
  idProfessor: z.lazy(() => SortOrderSchema).optional(),
  versao: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackHistoricoAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackHistoricoAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idFeedback: z.lazy(() => SortOrderSchema).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional(),
  versao: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackHistoricoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackHistoricoMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idFeedback: z.lazy(() => SortOrderSchema).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional(),
  textoFeedback: z.lazy(() => SortOrderSchema).optional(),
  dataEnvio: z.lazy(() => SortOrderSchema).optional(),
  idProfessor: z.lazy(() => SortOrderSchema).optional(),
  versao: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackHistoricoMinOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackHistoricoMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idFeedback: z.lazy(() => SortOrderSchema).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional(),
  textoFeedback: z.lazy(() => SortOrderSchema).optional(),
  dataEnvio: z.lazy(() => SortOrderSchema).optional(),
  idProfessor: z.lazy(() => SortOrderSchema).optional(),
  versao: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackHistoricoSumOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackHistoricoSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idFeedback: z.lazy(() => SortOrderSchema).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional(),
  versao: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const EnumStatusRelatorioNullableFilterSchema: z.ZodType<Prisma.EnumStatusRelatorioNullableFilter> = z.object({
  equals: z.lazy(() => StatusRelatorioSchema).optional().nullable(),
  in: z.lazy(() => StatusRelatorioSchema).array().optional().nullable(),
  notIn: z.lazy(() => StatusRelatorioSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => NestedEnumStatusRelatorioNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BytesNullableFilterSchema: z.ZodType<Prisma.BytesNullableFilter> = z.object({
  equals: z.instanceof(Buffer).optional().nullable(),
  in: z.instanceof(Buffer).array().optional().nullable(),
  notIn: z.instanceof(Buffer).array().optional().nullable(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const HistoricoRelatorioCountOrderByAggregateInputSchema: z.ZodType<Prisma.HistoricoRelatorioCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional(),
  nomeAnterior: z.lazy(() => SortOrderSchema).optional(),
  textoReflexaoAnterior: z.lazy(() => SortOrderSchema).optional(),
  dataRealizacaoAnterior: z.lazy(() => SortOrderSchema).optional(),
  statusAnterior: z.lazy(() => SortOrderSchema).optional(),
  dataAlteracao: z.lazy(() => SortOrderSchema).optional(),
  certificadoAnterior: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HistoricoRelatorioAvgOrderByAggregateInputSchema: z.ZodType<Prisma.HistoricoRelatorioAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HistoricoRelatorioMaxOrderByAggregateInputSchema: z.ZodType<Prisma.HistoricoRelatorioMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional(),
  nomeAnterior: z.lazy(() => SortOrderSchema).optional(),
  textoReflexaoAnterior: z.lazy(() => SortOrderSchema).optional(),
  dataRealizacaoAnterior: z.lazy(() => SortOrderSchema).optional(),
  statusAnterior: z.lazy(() => SortOrderSchema).optional(),
  dataAlteracao: z.lazy(() => SortOrderSchema).optional(),
  certificadoAnterior: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HistoricoRelatorioMinOrderByAggregateInputSchema: z.ZodType<Prisma.HistoricoRelatorioMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional(),
  nomeAnterior: z.lazy(() => SortOrderSchema).optional(),
  textoReflexaoAnterior: z.lazy(() => SortOrderSchema).optional(),
  dataRealizacaoAnterior: z.lazy(() => SortOrderSchema).optional(),
  statusAnterior: z.lazy(() => SortOrderSchema).optional(),
  dataAlteracao: z.lazy(() => SortOrderSchema).optional(),
  certificadoAnterior: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HistoricoRelatorioSumOrderByAggregateInputSchema: z.ZodType<Prisma.HistoricoRelatorioSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumStatusRelatorioNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumStatusRelatorioNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => StatusRelatorioSchema).optional().nullable(),
  in: z.lazy(() => StatusRelatorioSchema).array().optional().nullable(),
  notIn: z.lazy(() => StatusRelatorioSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => NestedEnumStatusRelatorioNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStatusRelatorioNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStatusRelatorioNullableFilterSchema).optional()
}).strict();

export const BytesNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BytesNullableWithAggregatesFilter> = z.object({
  equals: z.instanceof(Buffer).optional().nullable(),
  in: z.instanceof(Buffer).array().optional().nullable(),
  notIn: z.instanceof(Buffer).array().optional().nullable(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBytesNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBytesNullableFilterSchema).optional()
}).strict();

export const ReversaoValidacaoCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReversaoValidacaoCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional(),
  justificativa: z.lazy(() => SortOrderSchema).optional(),
  dataReversao: z.lazy(() => SortOrderSchema).optional(),
  idProfessor: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReversaoValidacaoAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ReversaoValidacaoAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReversaoValidacaoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReversaoValidacaoMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional(),
  justificativa: z.lazy(() => SortOrderSchema).optional(),
  dataReversao: z.lazy(() => SortOrderSchema).optional(),
  idProfessor: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReversaoValidacaoMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReversaoValidacaoMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional(),
  justificativa: z.lazy(() => SortOrderSchema).optional(),
  dataReversao: z.lazy(() => SortOrderSchema).optional(),
  idProfessor: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReversaoValidacaoSumOrderByAggregateInputSchema: z.ZodType<Prisma.ReversaoValidacaoSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idRelatorio: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfessorCursoIdProfessorIdCursoCompoundUniqueInputSchema: z.ZodType<Prisma.ProfessorCursoIdProfessorIdCursoCompoundUniqueInput> = z.object({
  idProfessor: z.string(),
  idCurso: z.number()
}).strict();

export const ProfessorCursoCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProfessorCursoCountOrderByAggregateInput> = z.object({
  idProfessor: z.lazy(() => SortOrderSchema).optional(),
  idCurso: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfessorCursoAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProfessorCursoAvgOrderByAggregateInput> = z.object({
  idCurso: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfessorCursoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProfessorCursoMaxOrderByAggregateInput> = z.object({
  idProfessor: z.lazy(() => SortOrderSchema).optional(),
  idCurso: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfessorCursoMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProfessorCursoMinOrderByAggregateInput> = z.object({
  idProfessor: z.lazy(() => SortOrderSchema).optional(),
  idCurso: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfessorCursoSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProfessorCursoSumOrderByAggregateInput> = z.object({
  idCurso: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AlunoCreateNestedOneWithoutUsuarioInputSchema: z.ZodType<Prisma.AlunoCreateNestedOneWithoutUsuarioInput> = z.object({
  create: z.union([ z.lazy(() => AlunoCreateWithoutUsuarioInputSchema),z.lazy(() => AlunoUncheckedCreateWithoutUsuarioInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AlunoCreateOrConnectWithoutUsuarioInputSchema).optional(),
  connect: z.lazy(() => AlunoWhereUniqueInputSchema).optional()
}).strict();

export const ProfessorCreateNestedOneWithoutUsuarioInputSchema: z.ZodType<Prisma.ProfessorCreateNestedOneWithoutUsuarioInput> = z.object({
  create: z.union([ z.lazy(() => ProfessorCreateWithoutUsuarioInputSchema),z.lazy(() => ProfessorUncheckedCreateWithoutUsuarioInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfessorCreateOrConnectWithoutUsuarioInputSchema).optional(),
  connect: z.lazy(() => ProfessorWhereUniqueInputSchema).optional()
}).strict();

export const CoordenadorCreateNestedOneWithoutUsuarioInputSchema: z.ZodType<Prisma.CoordenadorCreateNestedOneWithoutUsuarioInput> = z.object({
  create: z.union([ z.lazy(() => CoordenadorCreateWithoutUsuarioInputSchema),z.lazy(() => CoordenadorUncheckedCreateWithoutUsuarioInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CoordenadorCreateOrConnectWithoutUsuarioInputSchema).optional(),
  connect: z.lazy(() => CoordenadorWhereUniqueInputSchema).optional()
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AlunoUncheckedCreateNestedOneWithoutUsuarioInputSchema: z.ZodType<Prisma.AlunoUncheckedCreateNestedOneWithoutUsuarioInput> = z.object({
  create: z.union([ z.lazy(() => AlunoCreateWithoutUsuarioInputSchema),z.lazy(() => AlunoUncheckedCreateWithoutUsuarioInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AlunoCreateOrConnectWithoutUsuarioInputSchema).optional(),
  connect: z.lazy(() => AlunoWhereUniqueInputSchema).optional()
}).strict();

export const ProfessorUncheckedCreateNestedOneWithoutUsuarioInputSchema: z.ZodType<Prisma.ProfessorUncheckedCreateNestedOneWithoutUsuarioInput> = z.object({
  create: z.union([ z.lazy(() => ProfessorCreateWithoutUsuarioInputSchema),z.lazy(() => ProfessorUncheckedCreateWithoutUsuarioInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfessorCreateOrConnectWithoutUsuarioInputSchema).optional(),
  connect: z.lazy(() => ProfessorWhereUniqueInputSchema).optional()
}).strict();

export const CoordenadorUncheckedCreateNestedOneWithoutUsuarioInputSchema: z.ZodType<Prisma.CoordenadorUncheckedCreateNestedOneWithoutUsuarioInput> = z.object({
  create: z.union([ z.lazy(() => CoordenadorCreateWithoutUsuarioInputSchema),z.lazy(() => CoordenadorUncheckedCreateWithoutUsuarioInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CoordenadorCreateOrConnectWithoutUsuarioInputSchema).optional(),
  connect: z.lazy(() => CoordenadorWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AlunoUpdateOneWithoutUsuarioNestedInputSchema: z.ZodType<Prisma.AlunoUpdateOneWithoutUsuarioNestedInput> = z.object({
  create: z.union([ z.lazy(() => AlunoCreateWithoutUsuarioInputSchema),z.lazy(() => AlunoUncheckedCreateWithoutUsuarioInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AlunoCreateOrConnectWithoutUsuarioInputSchema).optional(),
  upsert: z.lazy(() => AlunoUpsertWithoutUsuarioInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AlunoWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AlunoWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AlunoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AlunoUpdateToOneWithWhereWithoutUsuarioInputSchema),z.lazy(() => AlunoUpdateWithoutUsuarioInputSchema),z.lazy(() => AlunoUncheckedUpdateWithoutUsuarioInputSchema) ]).optional(),
}).strict();

export const ProfessorUpdateOneWithoutUsuarioNestedInputSchema: z.ZodType<Prisma.ProfessorUpdateOneWithoutUsuarioNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfessorCreateWithoutUsuarioInputSchema),z.lazy(() => ProfessorUncheckedCreateWithoutUsuarioInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfessorCreateOrConnectWithoutUsuarioInputSchema).optional(),
  upsert: z.lazy(() => ProfessorUpsertWithoutUsuarioInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ProfessorWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ProfessorWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ProfessorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfessorUpdateToOneWithWhereWithoutUsuarioInputSchema),z.lazy(() => ProfessorUpdateWithoutUsuarioInputSchema),z.lazy(() => ProfessorUncheckedUpdateWithoutUsuarioInputSchema) ]).optional(),
}).strict();

export const CoordenadorUpdateOneWithoutUsuarioNestedInputSchema: z.ZodType<Prisma.CoordenadorUpdateOneWithoutUsuarioNestedInput> = z.object({
  create: z.union([ z.lazy(() => CoordenadorCreateWithoutUsuarioInputSchema),z.lazy(() => CoordenadorUncheckedCreateWithoutUsuarioInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CoordenadorCreateOrConnectWithoutUsuarioInputSchema).optional(),
  upsert: z.lazy(() => CoordenadorUpsertWithoutUsuarioInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CoordenadorWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CoordenadorWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CoordenadorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CoordenadorUpdateToOneWithWhereWithoutUsuarioInputSchema),z.lazy(() => CoordenadorUpdateWithoutUsuarioInputSchema),z.lazy(() => CoordenadorUncheckedUpdateWithoutUsuarioInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AlunoUncheckedUpdateOneWithoutUsuarioNestedInputSchema: z.ZodType<Prisma.AlunoUncheckedUpdateOneWithoutUsuarioNestedInput> = z.object({
  create: z.union([ z.lazy(() => AlunoCreateWithoutUsuarioInputSchema),z.lazy(() => AlunoUncheckedCreateWithoutUsuarioInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AlunoCreateOrConnectWithoutUsuarioInputSchema).optional(),
  upsert: z.lazy(() => AlunoUpsertWithoutUsuarioInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AlunoWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AlunoWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AlunoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AlunoUpdateToOneWithWhereWithoutUsuarioInputSchema),z.lazy(() => AlunoUpdateWithoutUsuarioInputSchema),z.lazy(() => AlunoUncheckedUpdateWithoutUsuarioInputSchema) ]).optional(),
}).strict();

export const ProfessorUncheckedUpdateOneWithoutUsuarioNestedInputSchema: z.ZodType<Prisma.ProfessorUncheckedUpdateOneWithoutUsuarioNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfessorCreateWithoutUsuarioInputSchema),z.lazy(() => ProfessorUncheckedCreateWithoutUsuarioInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfessorCreateOrConnectWithoutUsuarioInputSchema).optional(),
  upsert: z.lazy(() => ProfessorUpsertWithoutUsuarioInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ProfessorWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ProfessorWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ProfessorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfessorUpdateToOneWithWhereWithoutUsuarioInputSchema),z.lazy(() => ProfessorUpdateWithoutUsuarioInputSchema),z.lazy(() => ProfessorUncheckedUpdateWithoutUsuarioInputSchema) ]).optional(),
}).strict();

export const CoordenadorUncheckedUpdateOneWithoutUsuarioNestedInputSchema: z.ZodType<Prisma.CoordenadorUncheckedUpdateOneWithoutUsuarioNestedInput> = z.object({
  create: z.union([ z.lazy(() => CoordenadorCreateWithoutUsuarioInputSchema),z.lazy(() => CoordenadorUncheckedCreateWithoutUsuarioInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CoordenadorCreateOrConnectWithoutUsuarioInputSchema).optional(),
  upsert: z.lazy(() => CoordenadorUpsertWithoutUsuarioInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CoordenadorWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CoordenadorWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CoordenadorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CoordenadorUpdateToOneWithWhereWithoutUsuarioInputSchema),z.lazy(() => CoordenadorUpdateWithoutUsuarioInputSchema),z.lazy(() => CoordenadorUncheckedUpdateWithoutUsuarioInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const AlunoCreateNestedManyWithoutCursoInputSchema: z.ZodType<Prisma.AlunoCreateNestedManyWithoutCursoInput> = z.object({
  create: z.union([ z.lazy(() => AlunoCreateWithoutCursoInputSchema),z.lazy(() => AlunoCreateWithoutCursoInputSchema).array(),z.lazy(() => AlunoUncheckedCreateWithoutCursoInputSchema),z.lazy(() => AlunoUncheckedCreateWithoutCursoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AlunoCreateOrConnectWithoutCursoInputSchema),z.lazy(() => AlunoCreateOrConnectWithoutCursoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AlunoCreateManyCursoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AlunoWhereUniqueInputSchema),z.lazy(() => AlunoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CategoriaCreateNestedManyWithoutCursoInputSchema: z.ZodType<Prisma.CategoriaCreateNestedManyWithoutCursoInput> = z.object({
  create: z.union([ z.lazy(() => CategoriaCreateWithoutCursoInputSchema),z.lazy(() => CategoriaCreateWithoutCursoInputSchema).array(),z.lazy(() => CategoriaUncheckedCreateWithoutCursoInputSchema),z.lazy(() => CategoriaUncheckedCreateWithoutCursoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CategoriaCreateOrConnectWithoutCursoInputSchema),z.lazy(() => CategoriaCreateOrConnectWithoutCursoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CategoriaCreateManyCursoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CategoriaWhereUniqueInputSchema),z.lazy(() => CategoriaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProfessorCursoCreateNestedManyWithoutCursoInputSchema: z.ZodType<Prisma.ProfessorCursoCreateNestedManyWithoutCursoInput> = z.object({
  create: z.union([ z.lazy(() => ProfessorCursoCreateWithoutCursoInputSchema),z.lazy(() => ProfessorCursoCreateWithoutCursoInputSchema).array(),z.lazy(() => ProfessorCursoUncheckedCreateWithoutCursoInputSchema),z.lazy(() => ProfessorCursoUncheckedCreateWithoutCursoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfessorCursoCreateOrConnectWithoutCursoInputSchema),z.lazy(() => ProfessorCursoCreateOrConnectWithoutCursoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfessorCursoCreateManyCursoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProfessorCursoWhereUniqueInputSchema),z.lazy(() => ProfessorCursoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CoordenadorCreateNestedManyWithoutCursoResponsavelInputSchema: z.ZodType<Prisma.CoordenadorCreateNestedManyWithoutCursoResponsavelInput> = z.object({
  create: z.union([ z.lazy(() => CoordenadorCreateWithoutCursoResponsavelInputSchema),z.lazy(() => CoordenadorCreateWithoutCursoResponsavelInputSchema).array(),z.lazy(() => CoordenadorUncheckedCreateWithoutCursoResponsavelInputSchema),z.lazy(() => CoordenadorUncheckedCreateWithoutCursoResponsavelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CoordenadorCreateOrConnectWithoutCursoResponsavelInputSchema),z.lazy(() => CoordenadorCreateOrConnectWithoutCursoResponsavelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CoordenadorCreateManyCursoResponsavelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CoordenadorWhereUniqueInputSchema),z.lazy(() => CoordenadorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AlunoUncheckedCreateNestedManyWithoutCursoInputSchema: z.ZodType<Prisma.AlunoUncheckedCreateNestedManyWithoutCursoInput> = z.object({
  create: z.union([ z.lazy(() => AlunoCreateWithoutCursoInputSchema),z.lazy(() => AlunoCreateWithoutCursoInputSchema).array(),z.lazy(() => AlunoUncheckedCreateWithoutCursoInputSchema),z.lazy(() => AlunoUncheckedCreateWithoutCursoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AlunoCreateOrConnectWithoutCursoInputSchema),z.lazy(() => AlunoCreateOrConnectWithoutCursoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AlunoCreateManyCursoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AlunoWhereUniqueInputSchema),z.lazy(() => AlunoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CategoriaUncheckedCreateNestedManyWithoutCursoInputSchema: z.ZodType<Prisma.CategoriaUncheckedCreateNestedManyWithoutCursoInput> = z.object({
  create: z.union([ z.lazy(() => CategoriaCreateWithoutCursoInputSchema),z.lazy(() => CategoriaCreateWithoutCursoInputSchema).array(),z.lazy(() => CategoriaUncheckedCreateWithoutCursoInputSchema),z.lazy(() => CategoriaUncheckedCreateWithoutCursoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CategoriaCreateOrConnectWithoutCursoInputSchema),z.lazy(() => CategoriaCreateOrConnectWithoutCursoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CategoriaCreateManyCursoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CategoriaWhereUniqueInputSchema),z.lazy(() => CategoriaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProfessorCursoUncheckedCreateNestedManyWithoutCursoInputSchema: z.ZodType<Prisma.ProfessorCursoUncheckedCreateNestedManyWithoutCursoInput> = z.object({
  create: z.union([ z.lazy(() => ProfessorCursoCreateWithoutCursoInputSchema),z.lazy(() => ProfessorCursoCreateWithoutCursoInputSchema).array(),z.lazy(() => ProfessorCursoUncheckedCreateWithoutCursoInputSchema),z.lazy(() => ProfessorCursoUncheckedCreateWithoutCursoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfessorCursoCreateOrConnectWithoutCursoInputSchema),z.lazy(() => ProfessorCursoCreateOrConnectWithoutCursoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfessorCursoCreateManyCursoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProfessorCursoWhereUniqueInputSchema),z.lazy(() => ProfessorCursoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CoordenadorUncheckedCreateNestedManyWithoutCursoResponsavelInputSchema: z.ZodType<Prisma.CoordenadorUncheckedCreateNestedManyWithoutCursoResponsavelInput> = z.object({
  create: z.union([ z.lazy(() => CoordenadorCreateWithoutCursoResponsavelInputSchema),z.lazy(() => CoordenadorCreateWithoutCursoResponsavelInputSchema).array(),z.lazy(() => CoordenadorUncheckedCreateWithoutCursoResponsavelInputSchema),z.lazy(() => CoordenadorUncheckedCreateWithoutCursoResponsavelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CoordenadorCreateOrConnectWithoutCursoResponsavelInputSchema),z.lazy(() => CoordenadorCreateOrConnectWithoutCursoResponsavelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CoordenadorCreateManyCursoResponsavelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CoordenadorWhereUniqueInputSchema),z.lazy(() => CoordenadorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AlunoUpdateManyWithoutCursoNestedInputSchema: z.ZodType<Prisma.AlunoUpdateManyWithoutCursoNestedInput> = z.object({
  create: z.union([ z.lazy(() => AlunoCreateWithoutCursoInputSchema),z.lazy(() => AlunoCreateWithoutCursoInputSchema).array(),z.lazy(() => AlunoUncheckedCreateWithoutCursoInputSchema),z.lazy(() => AlunoUncheckedCreateWithoutCursoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AlunoCreateOrConnectWithoutCursoInputSchema),z.lazy(() => AlunoCreateOrConnectWithoutCursoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AlunoUpsertWithWhereUniqueWithoutCursoInputSchema),z.lazy(() => AlunoUpsertWithWhereUniqueWithoutCursoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AlunoCreateManyCursoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AlunoWhereUniqueInputSchema),z.lazy(() => AlunoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AlunoWhereUniqueInputSchema),z.lazy(() => AlunoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AlunoWhereUniqueInputSchema),z.lazy(() => AlunoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AlunoWhereUniqueInputSchema),z.lazy(() => AlunoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AlunoUpdateWithWhereUniqueWithoutCursoInputSchema),z.lazy(() => AlunoUpdateWithWhereUniqueWithoutCursoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AlunoUpdateManyWithWhereWithoutCursoInputSchema),z.lazy(() => AlunoUpdateManyWithWhereWithoutCursoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AlunoScalarWhereInputSchema),z.lazy(() => AlunoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CategoriaUpdateManyWithoutCursoNestedInputSchema: z.ZodType<Prisma.CategoriaUpdateManyWithoutCursoNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoriaCreateWithoutCursoInputSchema),z.lazy(() => CategoriaCreateWithoutCursoInputSchema).array(),z.lazy(() => CategoriaUncheckedCreateWithoutCursoInputSchema),z.lazy(() => CategoriaUncheckedCreateWithoutCursoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CategoriaCreateOrConnectWithoutCursoInputSchema),z.lazy(() => CategoriaCreateOrConnectWithoutCursoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CategoriaUpsertWithWhereUniqueWithoutCursoInputSchema),z.lazy(() => CategoriaUpsertWithWhereUniqueWithoutCursoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CategoriaCreateManyCursoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CategoriaWhereUniqueInputSchema),z.lazy(() => CategoriaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CategoriaWhereUniqueInputSchema),z.lazy(() => CategoriaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CategoriaWhereUniqueInputSchema),z.lazy(() => CategoriaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CategoriaWhereUniqueInputSchema),z.lazy(() => CategoriaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CategoriaUpdateWithWhereUniqueWithoutCursoInputSchema),z.lazy(() => CategoriaUpdateWithWhereUniqueWithoutCursoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CategoriaUpdateManyWithWhereWithoutCursoInputSchema),z.lazy(() => CategoriaUpdateManyWithWhereWithoutCursoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CategoriaScalarWhereInputSchema),z.lazy(() => CategoriaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProfessorCursoUpdateManyWithoutCursoNestedInputSchema: z.ZodType<Prisma.ProfessorCursoUpdateManyWithoutCursoNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfessorCursoCreateWithoutCursoInputSchema),z.lazy(() => ProfessorCursoCreateWithoutCursoInputSchema).array(),z.lazy(() => ProfessorCursoUncheckedCreateWithoutCursoInputSchema),z.lazy(() => ProfessorCursoUncheckedCreateWithoutCursoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfessorCursoCreateOrConnectWithoutCursoInputSchema),z.lazy(() => ProfessorCursoCreateOrConnectWithoutCursoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProfessorCursoUpsertWithWhereUniqueWithoutCursoInputSchema),z.lazy(() => ProfessorCursoUpsertWithWhereUniqueWithoutCursoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfessorCursoCreateManyCursoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProfessorCursoWhereUniqueInputSchema),z.lazy(() => ProfessorCursoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProfessorCursoWhereUniqueInputSchema),z.lazy(() => ProfessorCursoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProfessorCursoWhereUniqueInputSchema),z.lazy(() => ProfessorCursoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProfessorCursoWhereUniqueInputSchema),z.lazy(() => ProfessorCursoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProfessorCursoUpdateWithWhereUniqueWithoutCursoInputSchema),z.lazy(() => ProfessorCursoUpdateWithWhereUniqueWithoutCursoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProfessorCursoUpdateManyWithWhereWithoutCursoInputSchema),z.lazy(() => ProfessorCursoUpdateManyWithWhereWithoutCursoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProfessorCursoScalarWhereInputSchema),z.lazy(() => ProfessorCursoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CoordenadorUpdateManyWithoutCursoResponsavelNestedInputSchema: z.ZodType<Prisma.CoordenadorUpdateManyWithoutCursoResponsavelNestedInput> = z.object({
  create: z.union([ z.lazy(() => CoordenadorCreateWithoutCursoResponsavelInputSchema),z.lazy(() => CoordenadorCreateWithoutCursoResponsavelInputSchema).array(),z.lazy(() => CoordenadorUncheckedCreateWithoutCursoResponsavelInputSchema),z.lazy(() => CoordenadorUncheckedCreateWithoutCursoResponsavelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CoordenadorCreateOrConnectWithoutCursoResponsavelInputSchema),z.lazy(() => CoordenadorCreateOrConnectWithoutCursoResponsavelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CoordenadorUpsertWithWhereUniqueWithoutCursoResponsavelInputSchema),z.lazy(() => CoordenadorUpsertWithWhereUniqueWithoutCursoResponsavelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CoordenadorCreateManyCursoResponsavelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CoordenadorWhereUniqueInputSchema),z.lazy(() => CoordenadorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CoordenadorWhereUniqueInputSchema),z.lazy(() => CoordenadorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CoordenadorWhereUniqueInputSchema),z.lazy(() => CoordenadorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CoordenadorWhereUniqueInputSchema),z.lazy(() => CoordenadorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CoordenadorUpdateWithWhereUniqueWithoutCursoResponsavelInputSchema),z.lazy(() => CoordenadorUpdateWithWhereUniqueWithoutCursoResponsavelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CoordenadorUpdateManyWithWhereWithoutCursoResponsavelInputSchema),z.lazy(() => CoordenadorUpdateManyWithWhereWithoutCursoResponsavelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CoordenadorScalarWhereInputSchema),z.lazy(() => CoordenadorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const AlunoUncheckedUpdateManyWithoutCursoNestedInputSchema: z.ZodType<Prisma.AlunoUncheckedUpdateManyWithoutCursoNestedInput> = z.object({
  create: z.union([ z.lazy(() => AlunoCreateWithoutCursoInputSchema),z.lazy(() => AlunoCreateWithoutCursoInputSchema).array(),z.lazy(() => AlunoUncheckedCreateWithoutCursoInputSchema),z.lazy(() => AlunoUncheckedCreateWithoutCursoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AlunoCreateOrConnectWithoutCursoInputSchema),z.lazy(() => AlunoCreateOrConnectWithoutCursoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AlunoUpsertWithWhereUniqueWithoutCursoInputSchema),z.lazy(() => AlunoUpsertWithWhereUniqueWithoutCursoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AlunoCreateManyCursoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AlunoWhereUniqueInputSchema),z.lazy(() => AlunoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AlunoWhereUniqueInputSchema),z.lazy(() => AlunoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AlunoWhereUniqueInputSchema),z.lazy(() => AlunoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AlunoWhereUniqueInputSchema),z.lazy(() => AlunoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AlunoUpdateWithWhereUniqueWithoutCursoInputSchema),z.lazy(() => AlunoUpdateWithWhereUniqueWithoutCursoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AlunoUpdateManyWithWhereWithoutCursoInputSchema),z.lazy(() => AlunoUpdateManyWithWhereWithoutCursoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AlunoScalarWhereInputSchema),z.lazy(() => AlunoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CategoriaUncheckedUpdateManyWithoutCursoNestedInputSchema: z.ZodType<Prisma.CategoriaUncheckedUpdateManyWithoutCursoNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoriaCreateWithoutCursoInputSchema),z.lazy(() => CategoriaCreateWithoutCursoInputSchema).array(),z.lazy(() => CategoriaUncheckedCreateWithoutCursoInputSchema),z.lazy(() => CategoriaUncheckedCreateWithoutCursoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CategoriaCreateOrConnectWithoutCursoInputSchema),z.lazy(() => CategoriaCreateOrConnectWithoutCursoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CategoriaUpsertWithWhereUniqueWithoutCursoInputSchema),z.lazy(() => CategoriaUpsertWithWhereUniqueWithoutCursoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CategoriaCreateManyCursoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CategoriaWhereUniqueInputSchema),z.lazy(() => CategoriaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CategoriaWhereUniqueInputSchema),z.lazy(() => CategoriaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CategoriaWhereUniqueInputSchema),z.lazy(() => CategoriaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CategoriaWhereUniqueInputSchema),z.lazy(() => CategoriaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CategoriaUpdateWithWhereUniqueWithoutCursoInputSchema),z.lazy(() => CategoriaUpdateWithWhereUniqueWithoutCursoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CategoriaUpdateManyWithWhereWithoutCursoInputSchema),z.lazy(() => CategoriaUpdateManyWithWhereWithoutCursoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CategoriaScalarWhereInputSchema),z.lazy(() => CategoriaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProfessorCursoUncheckedUpdateManyWithoutCursoNestedInputSchema: z.ZodType<Prisma.ProfessorCursoUncheckedUpdateManyWithoutCursoNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfessorCursoCreateWithoutCursoInputSchema),z.lazy(() => ProfessorCursoCreateWithoutCursoInputSchema).array(),z.lazy(() => ProfessorCursoUncheckedCreateWithoutCursoInputSchema),z.lazy(() => ProfessorCursoUncheckedCreateWithoutCursoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfessorCursoCreateOrConnectWithoutCursoInputSchema),z.lazy(() => ProfessorCursoCreateOrConnectWithoutCursoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProfessorCursoUpsertWithWhereUniqueWithoutCursoInputSchema),z.lazy(() => ProfessorCursoUpsertWithWhereUniqueWithoutCursoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfessorCursoCreateManyCursoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProfessorCursoWhereUniqueInputSchema),z.lazy(() => ProfessorCursoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProfessorCursoWhereUniqueInputSchema),z.lazy(() => ProfessorCursoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProfessorCursoWhereUniqueInputSchema),z.lazy(() => ProfessorCursoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProfessorCursoWhereUniqueInputSchema),z.lazy(() => ProfessorCursoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProfessorCursoUpdateWithWhereUniqueWithoutCursoInputSchema),z.lazy(() => ProfessorCursoUpdateWithWhereUniqueWithoutCursoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProfessorCursoUpdateManyWithWhereWithoutCursoInputSchema),z.lazy(() => ProfessorCursoUpdateManyWithWhereWithoutCursoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProfessorCursoScalarWhereInputSchema),z.lazy(() => ProfessorCursoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CoordenadorUncheckedUpdateManyWithoutCursoResponsavelNestedInputSchema: z.ZodType<Prisma.CoordenadorUncheckedUpdateManyWithoutCursoResponsavelNestedInput> = z.object({
  create: z.union([ z.lazy(() => CoordenadorCreateWithoutCursoResponsavelInputSchema),z.lazy(() => CoordenadorCreateWithoutCursoResponsavelInputSchema).array(),z.lazy(() => CoordenadorUncheckedCreateWithoutCursoResponsavelInputSchema),z.lazy(() => CoordenadorUncheckedCreateWithoutCursoResponsavelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CoordenadorCreateOrConnectWithoutCursoResponsavelInputSchema),z.lazy(() => CoordenadorCreateOrConnectWithoutCursoResponsavelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CoordenadorUpsertWithWhereUniqueWithoutCursoResponsavelInputSchema),z.lazy(() => CoordenadorUpsertWithWhereUniqueWithoutCursoResponsavelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CoordenadorCreateManyCursoResponsavelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CoordenadorWhereUniqueInputSchema),z.lazy(() => CoordenadorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CoordenadorWhereUniqueInputSchema),z.lazy(() => CoordenadorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CoordenadorWhereUniqueInputSchema),z.lazy(() => CoordenadorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CoordenadorWhereUniqueInputSchema),z.lazy(() => CoordenadorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CoordenadorUpdateWithWhereUniqueWithoutCursoResponsavelInputSchema),z.lazy(() => CoordenadorUpdateWithWhereUniqueWithoutCursoResponsavelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CoordenadorUpdateManyWithWhereWithoutCursoResponsavelInputSchema),z.lazy(() => CoordenadorUpdateManyWithWhereWithoutCursoResponsavelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CoordenadorScalarWhereInputSchema),z.lazy(() => CoordenadorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAlunoInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAlunoInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAlunoInputSchema),z.lazy(() => UserUncheckedCreateWithoutAlunoInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAlunoInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const CursoCreateNestedOneWithoutAlunosInputSchema: z.ZodType<Prisma.CursoCreateNestedOneWithoutAlunosInput> = z.object({
  create: z.union([ z.lazy(() => CursoCreateWithoutAlunosInputSchema),z.lazy(() => CursoUncheckedCreateWithoutAlunosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CursoCreateOrConnectWithoutAlunosInputSchema).optional(),
  connect: z.lazy(() => CursoWhereUniqueInputSchema).optional()
}).strict();

export const RelatorioAtividadeCreateNestedManyWithoutAlunoInputSchema: z.ZodType<Prisma.RelatorioAtividadeCreateNestedManyWithoutAlunoInput> = z.object({
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutAlunoInputSchema),z.lazy(() => RelatorioAtividadeCreateWithoutAlunoInputSchema).array(),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutAlunoInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutAlunoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RelatorioAtividadeCreateOrConnectWithoutAlunoInputSchema),z.lazy(() => RelatorioAtividadeCreateOrConnectWithoutAlunoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RelatorioAtividadeCreateManyAlunoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RelatorioAtividadeUncheckedCreateNestedManyWithoutAlunoInputSchema: z.ZodType<Prisma.RelatorioAtividadeUncheckedCreateNestedManyWithoutAlunoInput> = z.object({
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutAlunoInputSchema),z.lazy(() => RelatorioAtividadeCreateWithoutAlunoInputSchema).array(),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutAlunoInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutAlunoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RelatorioAtividadeCreateOrConnectWithoutAlunoInputSchema),z.lazy(() => RelatorioAtividadeCreateOrConnectWithoutAlunoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RelatorioAtividadeCreateManyAlunoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutAlunoNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAlunoNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAlunoInputSchema),z.lazy(() => UserUncheckedCreateWithoutAlunoInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAlunoInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAlunoInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAlunoInputSchema),z.lazy(() => UserUpdateWithoutAlunoInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAlunoInputSchema) ]).optional(),
}).strict();

export const CursoUpdateOneRequiredWithoutAlunosNestedInputSchema: z.ZodType<Prisma.CursoUpdateOneRequiredWithoutAlunosNestedInput> = z.object({
  create: z.union([ z.lazy(() => CursoCreateWithoutAlunosInputSchema),z.lazy(() => CursoUncheckedCreateWithoutAlunosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CursoCreateOrConnectWithoutAlunosInputSchema).optional(),
  upsert: z.lazy(() => CursoUpsertWithoutAlunosInputSchema).optional(),
  connect: z.lazy(() => CursoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CursoUpdateToOneWithWhereWithoutAlunosInputSchema),z.lazy(() => CursoUpdateWithoutAlunosInputSchema),z.lazy(() => CursoUncheckedUpdateWithoutAlunosInputSchema) ]).optional(),
}).strict();

export const RelatorioAtividadeUpdateManyWithoutAlunoNestedInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpdateManyWithoutAlunoNestedInput> = z.object({
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutAlunoInputSchema),z.lazy(() => RelatorioAtividadeCreateWithoutAlunoInputSchema).array(),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutAlunoInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutAlunoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RelatorioAtividadeCreateOrConnectWithoutAlunoInputSchema),z.lazy(() => RelatorioAtividadeCreateOrConnectWithoutAlunoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RelatorioAtividadeUpsertWithWhereUniqueWithoutAlunoInputSchema),z.lazy(() => RelatorioAtividadeUpsertWithWhereUniqueWithoutAlunoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RelatorioAtividadeCreateManyAlunoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RelatorioAtividadeUpdateWithWhereUniqueWithoutAlunoInputSchema),z.lazy(() => RelatorioAtividadeUpdateWithWhereUniqueWithoutAlunoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RelatorioAtividadeUpdateManyWithWhereWithoutAlunoInputSchema),z.lazy(() => RelatorioAtividadeUpdateManyWithWhereWithoutAlunoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RelatorioAtividadeScalarWhereInputSchema),z.lazy(() => RelatorioAtividadeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RelatorioAtividadeUncheckedUpdateManyWithoutAlunoNestedInputSchema: z.ZodType<Prisma.RelatorioAtividadeUncheckedUpdateManyWithoutAlunoNestedInput> = z.object({
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutAlunoInputSchema),z.lazy(() => RelatorioAtividadeCreateWithoutAlunoInputSchema).array(),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutAlunoInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutAlunoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RelatorioAtividadeCreateOrConnectWithoutAlunoInputSchema),z.lazy(() => RelatorioAtividadeCreateOrConnectWithoutAlunoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RelatorioAtividadeUpsertWithWhereUniqueWithoutAlunoInputSchema),z.lazy(() => RelatorioAtividadeUpsertWithWhereUniqueWithoutAlunoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RelatorioAtividadeCreateManyAlunoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RelatorioAtividadeUpdateWithWhereUniqueWithoutAlunoInputSchema),z.lazy(() => RelatorioAtividadeUpdateWithWhereUniqueWithoutAlunoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RelatorioAtividadeUpdateManyWithWhereWithoutAlunoInputSchema),z.lazy(() => RelatorioAtividadeUpdateManyWithWhereWithoutAlunoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RelatorioAtividadeScalarWhereInputSchema),z.lazy(() => RelatorioAtividadeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutProfessorInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutProfessorInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProfessorInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfessorInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProfessorInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ProfessorCursoCreateNestedManyWithoutProfessorInputSchema: z.ZodType<Prisma.ProfessorCursoCreateNestedManyWithoutProfessorInput> = z.object({
  create: z.union([ z.lazy(() => ProfessorCursoCreateWithoutProfessorInputSchema),z.lazy(() => ProfessorCursoCreateWithoutProfessorInputSchema).array(),z.lazy(() => ProfessorCursoUncheckedCreateWithoutProfessorInputSchema),z.lazy(() => ProfessorCursoUncheckedCreateWithoutProfessorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfessorCursoCreateOrConnectWithoutProfessorInputSchema),z.lazy(() => ProfessorCursoCreateOrConnectWithoutProfessorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfessorCursoCreateManyProfessorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProfessorCursoWhereUniqueInputSchema),z.lazy(() => ProfessorCursoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FeedbackCreateNestedManyWithoutProfessorInputSchema: z.ZodType<Prisma.FeedbackCreateNestedManyWithoutProfessorInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutProfessorInputSchema),z.lazy(() => FeedbackCreateWithoutProfessorInputSchema).array(),z.lazy(() => FeedbackUncheckedCreateWithoutProfessorInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutProfessorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCreateOrConnectWithoutProfessorInputSchema),z.lazy(() => FeedbackCreateOrConnectWithoutProfessorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCreateManyProfessorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReversaoValidacaoCreateNestedManyWithoutProfessorInputSchema: z.ZodType<Prisma.ReversaoValidacaoCreateNestedManyWithoutProfessorInput> = z.object({
  create: z.union([ z.lazy(() => ReversaoValidacaoCreateWithoutProfessorInputSchema),z.lazy(() => ReversaoValidacaoCreateWithoutProfessorInputSchema).array(),z.lazy(() => ReversaoValidacaoUncheckedCreateWithoutProfessorInputSchema),z.lazy(() => ReversaoValidacaoUncheckedCreateWithoutProfessorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReversaoValidacaoCreateOrConnectWithoutProfessorInputSchema),z.lazy(() => ReversaoValidacaoCreateOrConnectWithoutProfessorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReversaoValidacaoCreateManyProfessorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema),z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FeedbackHistoricoCreateNestedManyWithoutProfessorInputSchema: z.ZodType<Prisma.FeedbackHistoricoCreateNestedManyWithoutProfessorInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackHistoricoCreateWithoutProfessorInputSchema),z.lazy(() => FeedbackHistoricoCreateWithoutProfessorInputSchema).array(),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutProfessorInputSchema),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutProfessorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackHistoricoCreateOrConnectWithoutProfessorInputSchema),z.lazy(() => FeedbackHistoricoCreateOrConnectWithoutProfessorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackHistoricoCreateManyProfessorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProfessorCursoUncheckedCreateNestedManyWithoutProfessorInputSchema: z.ZodType<Prisma.ProfessorCursoUncheckedCreateNestedManyWithoutProfessorInput> = z.object({
  create: z.union([ z.lazy(() => ProfessorCursoCreateWithoutProfessorInputSchema),z.lazy(() => ProfessorCursoCreateWithoutProfessorInputSchema).array(),z.lazy(() => ProfessorCursoUncheckedCreateWithoutProfessorInputSchema),z.lazy(() => ProfessorCursoUncheckedCreateWithoutProfessorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfessorCursoCreateOrConnectWithoutProfessorInputSchema),z.lazy(() => ProfessorCursoCreateOrConnectWithoutProfessorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfessorCursoCreateManyProfessorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProfessorCursoWhereUniqueInputSchema),z.lazy(() => ProfessorCursoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FeedbackUncheckedCreateNestedManyWithoutProfessorInputSchema: z.ZodType<Prisma.FeedbackUncheckedCreateNestedManyWithoutProfessorInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutProfessorInputSchema),z.lazy(() => FeedbackCreateWithoutProfessorInputSchema).array(),z.lazy(() => FeedbackUncheckedCreateWithoutProfessorInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutProfessorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCreateOrConnectWithoutProfessorInputSchema),z.lazy(() => FeedbackCreateOrConnectWithoutProfessorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCreateManyProfessorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReversaoValidacaoUncheckedCreateNestedManyWithoutProfessorInputSchema: z.ZodType<Prisma.ReversaoValidacaoUncheckedCreateNestedManyWithoutProfessorInput> = z.object({
  create: z.union([ z.lazy(() => ReversaoValidacaoCreateWithoutProfessorInputSchema),z.lazy(() => ReversaoValidacaoCreateWithoutProfessorInputSchema).array(),z.lazy(() => ReversaoValidacaoUncheckedCreateWithoutProfessorInputSchema),z.lazy(() => ReversaoValidacaoUncheckedCreateWithoutProfessorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReversaoValidacaoCreateOrConnectWithoutProfessorInputSchema),z.lazy(() => ReversaoValidacaoCreateOrConnectWithoutProfessorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReversaoValidacaoCreateManyProfessorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema),z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FeedbackHistoricoUncheckedCreateNestedManyWithoutProfessorInputSchema: z.ZodType<Prisma.FeedbackHistoricoUncheckedCreateNestedManyWithoutProfessorInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackHistoricoCreateWithoutProfessorInputSchema),z.lazy(() => FeedbackHistoricoCreateWithoutProfessorInputSchema).array(),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutProfessorInputSchema),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutProfessorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackHistoricoCreateOrConnectWithoutProfessorInputSchema),z.lazy(() => FeedbackHistoricoCreateOrConnectWithoutProfessorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackHistoricoCreateManyProfessorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutProfessorNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutProfessorNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProfessorInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfessorInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProfessorInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutProfessorInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutProfessorInputSchema),z.lazy(() => UserUpdateWithoutProfessorInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProfessorInputSchema) ]).optional(),
}).strict();

export const ProfessorCursoUpdateManyWithoutProfessorNestedInputSchema: z.ZodType<Prisma.ProfessorCursoUpdateManyWithoutProfessorNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfessorCursoCreateWithoutProfessorInputSchema),z.lazy(() => ProfessorCursoCreateWithoutProfessorInputSchema).array(),z.lazy(() => ProfessorCursoUncheckedCreateWithoutProfessorInputSchema),z.lazy(() => ProfessorCursoUncheckedCreateWithoutProfessorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfessorCursoCreateOrConnectWithoutProfessorInputSchema),z.lazy(() => ProfessorCursoCreateOrConnectWithoutProfessorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProfessorCursoUpsertWithWhereUniqueWithoutProfessorInputSchema),z.lazy(() => ProfessorCursoUpsertWithWhereUniqueWithoutProfessorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfessorCursoCreateManyProfessorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProfessorCursoWhereUniqueInputSchema),z.lazy(() => ProfessorCursoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProfessorCursoWhereUniqueInputSchema),z.lazy(() => ProfessorCursoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProfessorCursoWhereUniqueInputSchema),z.lazy(() => ProfessorCursoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProfessorCursoWhereUniqueInputSchema),z.lazy(() => ProfessorCursoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProfessorCursoUpdateWithWhereUniqueWithoutProfessorInputSchema),z.lazy(() => ProfessorCursoUpdateWithWhereUniqueWithoutProfessorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProfessorCursoUpdateManyWithWhereWithoutProfessorInputSchema),z.lazy(() => ProfessorCursoUpdateManyWithWhereWithoutProfessorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProfessorCursoScalarWhereInputSchema),z.lazy(() => ProfessorCursoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FeedbackUpdateManyWithoutProfessorNestedInputSchema: z.ZodType<Prisma.FeedbackUpdateManyWithoutProfessorNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutProfessorInputSchema),z.lazy(() => FeedbackCreateWithoutProfessorInputSchema).array(),z.lazy(() => FeedbackUncheckedCreateWithoutProfessorInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutProfessorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCreateOrConnectWithoutProfessorInputSchema),z.lazy(() => FeedbackCreateOrConnectWithoutProfessorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeedbackUpsertWithWhereUniqueWithoutProfessorInputSchema),z.lazy(() => FeedbackUpsertWithWhereUniqueWithoutProfessorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCreateManyProfessorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeedbackUpdateWithWhereUniqueWithoutProfessorInputSchema),z.lazy(() => FeedbackUpdateWithWhereUniqueWithoutProfessorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeedbackUpdateManyWithWhereWithoutProfessorInputSchema),z.lazy(() => FeedbackUpdateManyWithWhereWithoutProfessorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeedbackScalarWhereInputSchema),z.lazy(() => FeedbackScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReversaoValidacaoUpdateManyWithoutProfessorNestedInputSchema: z.ZodType<Prisma.ReversaoValidacaoUpdateManyWithoutProfessorNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReversaoValidacaoCreateWithoutProfessorInputSchema),z.lazy(() => ReversaoValidacaoCreateWithoutProfessorInputSchema).array(),z.lazy(() => ReversaoValidacaoUncheckedCreateWithoutProfessorInputSchema),z.lazy(() => ReversaoValidacaoUncheckedCreateWithoutProfessorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReversaoValidacaoCreateOrConnectWithoutProfessorInputSchema),z.lazy(() => ReversaoValidacaoCreateOrConnectWithoutProfessorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReversaoValidacaoUpsertWithWhereUniqueWithoutProfessorInputSchema),z.lazy(() => ReversaoValidacaoUpsertWithWhereUniqueWithoutProfessorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReversaoValidacaoCreateManyProfessorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema),z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema),z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema),z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema),z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReversaoValidacaoUpdateWithWhereUniqueWithoutProfessorInputSchema),z.lazy(() => ReversaoValidacaoUpdateWithWhereUniqueWithoutProfessorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReversaoValidacaoUpdateManyWithWhereWithoutProfessorInputSchema),z.lazy(() => ReversaoValidacaoUpdateManyWithWhereWithoutProfessorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReversaoValidacaoScalarWhereInputSchema),z.lazy(() => ReversaoValidacaoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FeedbackHistoricoUpdateManyWithoutProfessorNestedInputSchema: z.ZodType<Prisma.FeedbackHistoricoUpdateManyWithoutProfessorNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackHistoricoCreateWithoutProfessorInputSchema),z.lazy(() => FeedbackHistoricoCreateWithoutProfessorInputSchema).array(),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutProfessorInputSchema),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutProfessorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackHistoricoCreateOrConnectWithoutProfessorInputSchema),z.lazy(() => FeedbackHistoricoCreateOrConnectWithoutProfessorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeedbackHistoricoUpsertWithWhereUniqueWithoutProfessorInputSchema),z.lazy(() => FeedbackHistoricoUpsertWithWhereUniqueWithoutProfessorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackHistoricoCreateManyProfessorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeedbackHistoricoUpdateWithWhereUniqueWithoutProfessorInputSchema),z.lazy(() => FeedbackHistoricoUpdateWithWhereUniqueWithoutProfessorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeedbackHistoricoUpdateManyWithWhereWithoutProfessorInputSchema),z.lazy(() => FeedbackHistoricoUpdateManyWithWhereWithoutProfessorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeedbackHistoricoScalarWhereInputSchema),z.lazy(() => FeedbackHistoricoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProfessorCursoUncheckedUpdateManyWithoutProfessorNestedInputSchema: z.ZodType<Prisma.ProfessorCursoUncheckedUpdateManyWithoutProfessorNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfessorCursoCreateWithoutProfessorInputSchema),z.lazy(() => ProfessorCursoCreateWithoutProfessorInputSchema).array(),z.lazy(() => ProfessorCursoUncheckedCreateWithoutProfessorInputSchema),z.lazy(() => ProfessorCursoUncheckedCreateWithoutProfessorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfessorCursoCreateOrConnectWithoutProfessorInputSchema),z.lazy(() => ProfessorCursoCreateOrConnectWithoutProfessorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProfessorCursoUpsertWithWhereUniqueWithoutProfessorInputSchema),z.lazy(() => ProfessorCursoUpsertWithWhereUniqueWithoutProfessorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfessorCursoCreateManyProfessorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProfessorCursoWhereUniqueInputSchema),z.lazy(() => ProfessorCursoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProfessorCursoWhereUniqueInputSchema),z.lazy(() => ProfessorCursoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProfessorCursoWhereUniqueInputSchema),z.lazy(() => ProfessorCursoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProfessorCursoWhereUniqueInputSchema),z.lazy(() => ProfessorCursoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProfessorCursoUpdateWithWhereUniqueWithoutProfessorInputSchema),z.lazy(() => ProfessorCursoUpdateWithWhereUniqueWithoutProfessorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProfessorCursoUpdateManyWithWhereWithoutProfessorInputSchema),z.lazy(() => ProfessorCursoUpdateManyWithWhereWithoutProfessorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProfessorCursoScalarWhereInputSchema),z.lazy(() => ProfessorCursoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FeedbackUncheckedUpdateManyWithoutProfessorNestedInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateManyWithoutProfessorNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutProfessorInputSchema),z.lazy(() => FeedbackCreateWithoutProfessorInputSchema).array(),z.lazy(() => FeedbackUncheckedCreateWithoutProfessorInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutProfessorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCreateOrConnectWithoutProfessorInputSchema),z.lazy(() => FeedbackCreateOrConnectWithoutProfessorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeedbackUpsertWithWhereUniqueWithoutProfessorInputSchema),z.lazy(() => FeedbackUpsertWithWhereUniqueWithoutProfessorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCreateManyProfessorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeedbackUpdateWithWhereUniqueWithoutProfessorInputSchema),z.lazy(() => FeedbackUpdateWithWhereUniqueWithoutProfessorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeedbackUpdateManyWithWhereWithoutProfessorInputSchema),z.lazy(() => FeedbackUpdateManyWithWhereWithoutProfessorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeedbackScalarWhereInputSchema),z.lazy(() => FeedbackScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReversaoValidacaoUncheckedUpdateManyWithoutProfessorNestedInputSchema: z.ZodType<Prisma.ReversaoValidacaoUncheckedUpdateManyWithoutProfessorNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReversaoValidacaoCreateWithoutProfessorInputSchema),z.lazy(() => ReversaoValidacaoCreateWithoutProfessorInputSchema).array(),z.lazy(() => ReversaoValidacaoUncheckedCreateWithoutProfessorInputSchema),z.lazy(() => ReversaoValidacaoUncheckedCreateWithoutProfessorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReversaoValidacaoCreateOrConnectWithoutProfessorInputSchema),z.lazy(() => ReversaoValidacaoCreateOrConnectWithoutProfessorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReversaoValidacaoUpsertWithWhereUniqueWithoutProfessorInputSchema),z.lazy(() => ReversaoValidacaoUpsertWithWhereUniqueWithoutProfessorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReversaoValidacaoCreateManyProfessorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema),z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema),z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema),z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema),z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReversaoValidacaoUpdateWithWhereUniqueWithoutProfessorInputSchema),z.lazy(() => ReversaoValidacaoUpdateWithWhereUniqueWithoutProfessorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReversaoValidacaoUpdateManyWithWhereWithoutProfessorInputSchema),z.lazy(() => ReversaoValidacaoUpdateManyWithWhereWithoutProfessorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReversaoValidacaoScalarWhereInputSchema),z.lazy(() => ReversaoValidacaoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FeedbackHistoricoUncheckedUpdateManyWithoutProfessorNestedInputSchema: z.ZodType<Prisma.FeedbackHistoricoUncheckedUpdateManyWithoutProfessorNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackHistoricoCreateWithoutProfessorInputSchema),z.lazy(() => FeedbackHistoricoCreateWithoutProfessorInputSchema).array(),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutProfessorInputSchema),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutProfessorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackHistoricoCreateOrConnectWithoutProfessorInputSchema),z.lazy(() => FeedbackHistoricoCreateOrConnectWithoutProfessorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeedbackHistoricoUpsertWithWhereUniqueWithoutProfessorInputSchema),z.lazy(() => FeedbackHistoricoUpsertWithWhereUniqueWithoutProfessorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackHistoricoCreateManyProfessorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeedbackHistoricoUpdateWithWhereUniqueWithoutProfessorInputSchema),z.lazy(() => FeedbackHistoricoUpdateWithWhereUniqueWithoutProfessorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeedbackHistoricoUpdateManyWithWhereWithoutProfessorInputSchema),z.lazy(() => FeedbackHistoricoUpdateManyWithWhereWithoutProfessorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeedbackHistoricoScalarWhereInputSchema),z.lazy(() => FeedbackHistoricoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutCoordenadorInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCoordenadorInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCoordenadorInputSchema),z.lazy(() => UserUncheckedCreateWithoutCoordenadorInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCoordenadorInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const CursoCreateNestedOneWithoutCoordenadorCursosInputSchema: z.ZodType<Prisma.CursoCreateNestedOneWithoutCoordenadorCursosInput> = z.object({
  create: z.union([ z.lazy(() => CursoCreateWithoutCoordenadorCursosInputSchema),z.lazy(() => CursoUncheckedCreateWithoutCoordenadorCursosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CursoCreateOrConnectWithoutCoordenadorCursosInputSchema).optional(),
  connect: z.lazy(() => CursoWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutCoordenadorNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCoordenadorNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCoordenadorInputSchema),z.lazy(() => UserUncheckedCreateWithoutCoordenadorInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCoordenadorInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCoordenadorInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCoordenadorInputSchema),z.lazy(() => UserUpdateWithoutCoordenadorInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCoordenadorInputSchema) ]).optional(),
}).strict();

export const CursoUpdateOneRequiredWithoutCoordenadorCursosNestedInputSchema: z.ZodType<Prisma.CursoUpdateOneRequiredWithoutCoordenadorCursosNestedInput> = z.object({
  create: z.union([ z.lazy(() => CursoCreateWithoutCoordenadorCursosInputSchema),z.lazy(() => CursoUncheckedCreateWithoutCoordenadorCursosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CursoCreateOrConnectWithoutCoordenadorCursosInputSchema).optional(),
  upsert: z.lazy(() => CursoUpsertWithoutCoordenadorCursosInputSchema).optional(),
  connect: z.lazy(() => CursoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CursoUpdateToOneWithWhereWithoutCoordenadorCursosInputSchema),z.lazy(() => CursoUpdateWithoutCoordenadorCursosInputSchema),z.lazy(() => CursoUncheckedUpdateWithoutCoordenadorCursosInputSchema) ]).optional(),
}).strict();

export const CursoCreateNestedOneWithoutCategoriasInputSchema: z.ZodType<Prisma.CursoCreateNestedOneWithoutCategoriasInput> = z.object({
  create: z.union([ z.lazy(() => CursoCreateWithoutCategoriasInputSchema),z.lazy(() => CursoUncheckedCreateWithoutCategoriasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CursoCreateOrConnectWithoutCategoriasInputSchema).optional(),
  connect: z.lazy(() => CursoWhereUniqueInputSchema).optional()
}).strict();

export const RelatorioAtividadeCreateNestedManyWithoutCategoriaInputSchema: z.ZodType<Prisma.RelatorioAtividadeCreateNestedManyWithoutCategoriaInput> = z.object({
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutCategoriaInputSchema),z.lazy(() => RelatorioAtividadeCreateWithoutCategoriaInputSchema).array(),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutCategoriaInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutCategoriaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RelatorioAtividadeCreateOrConnectWithoutCategoriaInputSchema),z.lazy(() => RelatorioAtividadeCreateOrConnectWithoutCategoriaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RelatorioAtividadeCreateManyCategoriaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RelatorioAtividadeUncheckedCreateNestedManyWithoutCategoriaInputSchema: z.ZodType<Prisma.RelatorioAtividadeUncheckedCreateNestedManyWithoutCategoriaInput> = z.object({
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutCategoriaInputSchema),z.lazy(() => RelatorioAtividadeCreateWithoutCategoriaInputSchema).array(),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutCategoriaInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutCategoriaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RelatorioAtividadeCreateOrConnectWithoutCategoriaInputSchema),z.lazy(() => RelatorioAtividadeCreateOrConnectWithoutCategoriaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RelatorioAtividadeCreateManyCategoriaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CursoUpdateOneRequiredWithoutCategoriasNestedInputSchema: z.ZodType<Prisma.CursoUpdateOneRequiredWithoutCategoriasNestedInput> = z.object({
  create: z.union([ z.lazy(() => CursoCreateWithoutCategoriasInputSchema),z.lazy(() => CursoUncheckedCreateWithoutCategoriasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CursoCreateOrConnectWithoutCategoriasInputSchema).optional(),
  upsert: z.lazy(() => CursoUpsertWithoutCategoriasInputSchema).optional(),
  connect: z.lazy(() => CursoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CursoUpdateToOneWithWhereWithoutCategoriasInputSchema),z.lazy(() => CursoUpdateWithoutCategoriasInputSchema),z.lazy(() => CursoUncheckedUpdateWithoutCategoriasInputSchema) ]).optional(),
}).strict();

export const RelatorioAtividadeUpdateManyWithoutCategoriaNestedInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpdateManyWithoutCategoriaNestedInput> = z.object({
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutCategoriaInputSchema),z.lazy(() => RelatorioAtividadeCreateWithoutCategoriaInputSchema).array(),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutCategoriaInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutCategoriaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RelatorioAtividadeCreateOrConnectWithoutCategoriaInputSchema),z.lazy(() => RelatorioAtividadeCreateOrConnectWithoutCategoriaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RelatorioAtividadeUpsertWithWhereUniqueWithoutCategoriaInputSchema),z.lazy(() => RelatorioAtividadeUpsertWithWhereUniqueWithoutCategoriaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RelatorioAtividadeCreateManyCategoriaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RelatorioAtividadeUpdateWithWhereUniqueWithoutCategoriaInputSchema),z.lazy(() => RelatorioAtividadeUpdateWithWhereUniqueWithoutCategoriaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RelatorioAtividadeUpdateManyWithWhereWithoutCategoriaInputSchema),z.lazy(() => RelatorioAtividadeUpdateManyWithWhereWithoutCategoriaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RelatorioAtividadeScalarWhereInputSchema),z.lazy(() => RelatorioAtividadeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RelatorioAtividadeUncheckedUpdateManyWithoutCategoriaNestedInputSchema: z.ZodType<Prisma.RelatorioAtividadeUncheckedUpdateManyWithoutCategoriaNestedInput> = z.object({
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutCategoriaInputSchema),z.lazy(() => RelatorioAtividadeCreateWithoutCategoriaInputSchema).array(),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutCategoriaInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutCategoriaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RelatorioAtividadeCreateOrConnectWithoutCategoriaInputSchema),z.lazy(() => RelatorioAtividadeCreateOrConnectWithoutCategoriaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RelatorioAtividadeUpsertWithWhereUniqueWithoutCategoriaInputSchema),z.lazy(() => RelatorioAtividadeUpsertWithWhereUniqueWithoutCategoriaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RelatorioAtividadeCreateManyCategoriaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RelatorioAtividadeUpdateWithWhereUniqueWithoutCategoriaInputSchema),z.lazy(() => RelatorioAtividadeUpdateWithWhereUniqueWithoutCategoriaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RelatorioAtividadeUpdateManyWithWhereWithoutCategoriaInputSchema),z.lazy(() => RelatorioAtividadeUpdateManyWithWhereWithoutCategoriaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RelatorioAtividadeScalarWhereInputSchema),z.lazy(() => RelatorioAtividadeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AlunoCreateNestedOneWithoutRelatoriosAtividadesInputSchema: z.ZodType<Prisma.AlunoCreateNestedOneWithoutRelatoriosAtividadesInput> = z.object({
  create: z.union([ z.lazy(() => AlunoCreateWithoutRelatoriosAtividadesInputSchema),z.lazy(() => AlunoUncheckedCreateWithoutRelatoriosAtividadesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AlunoCreateOrConnectWithoutRelatoriosAtividadesInputSchema).optional(),
  connect: z.lazy(() => AlunoWhereUniqueInputSchema).optional()
}).strict();

export const CategoriaCreateNestedOneWithoutRelatoriosAtividadesInputSchema: z.ZodType<Prisma.CategoriaCreateNestedOneWithoutRelatoriosAtividadesInput> = z.object({
  create: z.union([ z.lazy(() => CategoriaCreateWithoutRelatoriosAtividadesInputSchema),z.lazy(() => CategoriaUncheckedCreateWithoutRelatoriosAtividadesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoriaCreateOrConnectWithoutRelatoriosAtividadesInputSchema).optional(),
  connect: z.lazy(() => CategoriaWhereUniqueInputSchema).optional()
}).strict();

export const FeedbackCreateNestedManyWithoutRelatorioInputSchema: z.ZodType<Prisma.FeedbackCreateNestedManyWithoutRelatorioInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutRelatorioInputSchema),z.lazy(() => FeedbackCreateWithoutRelatorioInputSchema).array(),z.lazy(() => FeedbackUncheckedCreateWithoutRelatorioInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutRelatorioInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCreateOrConnectWithoutRelatorioInputSchema),z.lazy(() => FeedbackCreateOrConnectWithoutRelatorioInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCreateManyRelatorioInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HistoricoRelatorioCreateNestedManyWithoutRelatorioInputSchema: z.ZodType<Prisma.HistoricoRelatorioCreateNestedManyWithoutRelatorioInput> = z.object({
  create: z.union([ z.lazy(() => HistoricoRelatorioCreateWithoutRelatorioInputSchema),z.lazy(() => HistoricoRelatorioCreateWithoutRelatorioInputSchema).array(),z.lazy(() => HistoricoRelatorioUncheckedCreateWithoutRelatorioInputSchema),z.lazy(() => HistoricoRelatorioUncheckedCreateWithoutRelatorioInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HistoricoRelatorioCreateOrConnectWithoutRelatorioInputSchema),z.lazy(() => HistoricoRelatorioCreateOrConnectWithoutRelatorioInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HistoricoRelatorioCreateManyRelatorioInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HistoricoRelatorioWhereUniqueInputSchema),z.lazy(() => HistoricoRelatorioWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReversaoValidacaoCreateNestedManyWithoutRelatorioInputSchema: z.ZodType<Prisma.ReversaoValidacaoCreateNestedManyWithoutRelatorioInput> = z.object({
  create: z.union([ z.lazy(() => ReversaoValidacaoCreateWithoutRelatorioInputSchema),z.lazy(() => ReversaoValidacaoCreateWithoutRelatorioInputSchema).array(),z.lazy(() => ReversaoValidacaoUncheckedCreateWithoutRelatorioInputSchema),z.lazy(() => ReversaoValidacaoUncheckedCreateWithoutRelatorioInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReversaoValidacaoCreateOrConnectWithoutRelatorioInputSchema),z.lazy(() => ReversaoValidacaoCreateOrConnectWithoutRelatorioInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReversaoValidacaoCreateManyRelatorioInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema),z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FeedbackHistoricoCreateNestedManyWithoutRelatorioInputSchema: z.ZodType<Prisma.FeedbackHistoricoCreateNestedManyWithoutRelatorioInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackHistoricoCreateWithoutRelatorioInputSchema),z.lazy(() => FeedbackHistoricoCreateWithoutRelatorioInputSchema).array(),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutRelatorioInputSchema),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutRelatorioInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackHistoricoCreateOrConnectWithoutRelatorioInputSchema),z.lazy(() => FeedbackHistoricoCreateOrConnectWithoutRelatorioInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackHistoricoCreateManyRelatorioInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FeedbackUncheckedCreateNestedManyWithoutRelatorioInputSchema: z.ZodType<Prisma.FeedbackUncheckedCreateNestedManyWithoutRelatorioInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutRelatorioInputSchema),z.lazy(() => FeedbackCreateWithoutRelatorioInputSchema).array(),z.lazy(() => FeedbackUncheckedCreateWithoutRelatorioInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutRelatorioInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCreateOrConnectWithoutRelatorioInputSchema),z.lazy(() => FeedbackCreateOrConnectWithoutRelatorioInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCreateManyRelatorioInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HistoricoRelatorioUncheckedCreateNestedManyWithoutRelatorioInputSchema: z.ZodType<Prisma.HistoricoRelatorioUncheckedCreateNestedManyWithoutRelatorioInput> = z.object({
  create: z.union([ z.lazy(() => HistoricoRelatorioCreateWithoutRelatorioInputSchema),z.lazy(() => HistoricoRelatorioCreateWithoutRelatorioInputSchema).array(),z.lazy(() => HistoricoRelatorioUncheckedCreateWithoutRelatorioInputSchema),z.lazy(() => HistoricoRelatorioUncheckedCreateWithoutRelatorioInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HistoricoRelatorioCreateOrConnectWithoutRelatorioInputSchema),z.lazy(() => HistoricoRelatorioCreateOrConnectWithoutRelatorioInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HistoricoRelatorioCreateManyRelatorioInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HistoricoRelatorioWhereUniqueInputSchema),z.lazy(() => HistoricoRelatorioWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReversaoValidacaoUncheckedCreateNestedManyWithoutRelatorioInputSchema: z.ZodType<Prisma.ReversaoValidacaoUncheckedCreateNestedManyWithoutRelatorioInput> = z.object({
  create: z.union([ z.lazy(() => ReversaoValidacaoCreateWithoutRelatorioInputSchema),z.lazy(() => ReversaoValidacaoCreateWithoutRelatorioInputSchema).array(),z.lazy(() => ReversaoValidacaoUncheckedCreateWithoutRelatorioInputSchema),z.lazy(() => ReversaoValidacaoUncheckedCreateWithoutRelatorioInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReversaoValidacaoCreateOrConnectWithoutRelatorioInputSchema),z.lazy(() => ReversaoValidacaoCreateOrConnectWithoutRelatorioInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReversaoValidacaoCreateManyRelatorioInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema),z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FeedbackHistoricoUncheckedCreateNestedManyWithoutRelatorioInputSchema: z.ZodType<Prisma.FeedbackHistoricoUncheckedCreateNestedManyWithoutRelatorioInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackHistoricoCreateWithoutRelatorioInputSchema),z.lazy(() => FeedbackHistoricoCreateWithoutRelatorioInputSchema).array(),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutRelatorioInputSchema),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutRelatorioInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackHistoricoCreateOrConnectWithoutRelatorioInputSchema),z.lazy(() => FeedbackHistoricoCreateOrConnectWithoutRelatorioInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackHistoricoCreateManyRelatorioInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumStatusRelatorioFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumStatusRelatorioFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => StatusRelatorioSchema).optional()
}).strict();

export const BytesFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BytesFieldUpdateOperationsInput> = z.object({
  set: z.instanceof(Buffer).optional()
}).strict();

export const AlunoUpdateOneRequiredWithoutRelatoriosAtividadesNestedInputSchema: z.ZodType<Prisma.AlunoUpdateOneRequiredWithoutRelatoriosAtividadesNestedInput> = z.object({
  create: z.union([ z.lazy(() => AlunoCreateWithoutRelatoriosAtividadesInputSchema),z.lazy(() => AlunoUncheckedCreateWithoutRelatoriosAtividadesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AlunoCreateOrConnectWithoutRelatoriosAtividadesInputSchema).optional(),
  upsert: z.lazy(() => AlunoUpsertWithoutRelatoriosAtividadesInputSchema).optional(),
  connect: z.lazy(() => AlunoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AlunoUpdateToOneWithWhereWithoutRelatoriosAtividadesInputSchema),z.lazy(() => AlunoUpdateWithoutRelatoriosAtividadesInputSchema),z.lazy(() => AlunoUncheckedUpdateWithoutRelatoriosAtividadesInputSchema) ]).optional(),
}).strict();

export const CategoriaUpdateOneRequiredWithoutRelatoriosAtividadesNestedInputSchema: z.ZodType<Prisma.CategoriaUpdateOneRequiredWithoutRelatoriosAtividadesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoriaCreateWithoutRelatoriosAtividadesInputSchema),z.lazy(() => CategoriaUncheckedCreateWithoutRelatoriosAtividadesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoriaCreateOrConnectWithoutRelatoriosAtividadesInputSchema).optional(),
  upsert: z.lazy(() => CategoriaUpsertWithoutRelatoriosAtividadesInputSchema).optional(),
  connect: z.lazy(() => CategoriaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CategoriaUpdateToOneWithWhereWithoutRelatoriosAtividadesInputSchema),z.lazy(() => CategoriaUpdateWithoutRelatoriosAtividadesInputSchema),z.lazy(() => CategoriaUncheckedUpdateWithoutRelatoriosAtividadesInputSchema) ]).optional(),
}).strict();

export const FeedbackUpdateManyWithoutRelatorioNestedInputSchema: z.ZodType<Prisma.FeedbackUpdateManyWithoutRelatorioNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutRelatorioInputSchema),z.lazy(() => FeedbackCreateWithoutRelatorioInputSchema).array(),z.lazy(() => FeedbackUncheckedCreateWithoutRelatorioInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutRelatorioInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCreateOrConnectWithoutRelatorioInputSchema),z.lazy(() => FeedbackCreateOrConnectWithoutRelatorioInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeedbackUpsertWithWhereUniqueWithoutRelatorioInputSchema),z.lazy(() => FeedbackUpsertWithWhereUniqueWithoutRelatorioInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCreateManyRelatorioInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeedbackUpdateWithWhereUniqueWithoutRelatorioInputSchema),z.lazy(() => FeedbackUpdateWithWhereUniqueWithoutRelatorioInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeedbackUpdateManyWithWhereWithoutRelatorioInputSchema),z.lazy(() => FeedbackUpdateManyWithWhereWithoutRelatorioInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeedbackScalarWhereInputSchema),z.lazy(() => FeedbackScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const HistoricoRelatorioUpdateManyWithoutRelatorioNestedInputSchema: z.ZodType<Prisma.HistoricoRelatorioUpdateManyWithoutRelatorioNestedInput> = z.object({
  create: z.union([ z.lazy(() => HistoricoRelatorioCreateWithoutRelatorioInputSchema),z.lazy(() => HistoricoRelatorioCreateWithoutRelatorioInputSchema).array(),z.lazy(() => HistoricoRelatorioUncheckedCreateWithoutRelatorioInputSchema),z.lazy(() => HistoricoRelatorioUncheckedCreateWithoutRelatorioInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HistoricoRelatorioCreateOrConnectWithoutRelatorioInputSchema),z.lazy(() => HistoricoRelatorioCreateOrConnectWithoutRelatorioInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HistoricoRelatorioUpsertWithWhereUniqueWithoutRelatorioInputSchema),z.lazy(() => HistoricoRelatorioUpsertWithWhereUniqueWithoutRelatorioInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HistoricoRelatorioCreateManyRelatorioInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HistoricoRelatorioWhereUniqueInputSchema),z.lazy(() => HistoricoRelatorioWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HistoricoRelatorioWhereUniqueInputSchema),z.lazy(() => HistoricoRelatorioWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HistoricoRelatorioWhereUniqueInputSchema),z.lazy(() => HistoricoRelatorioWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HistoricoRelatorioWhereUniqueInputSchema),z.lazy(() => HistoricoRelatorioWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HistoricoRelatorioUpdateWithWhereUniqueWithoutRelatorioInputSchema),z.lazy(() => HistoricoRelatorioUpdateWithWhereUniqueWithoutRelatorioInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HistoricoRelatorioUpdateManyWithWhereWithoutRelatorioInputSchema),z.lazy(() => HistoricoRelatorioUpdateManyWithWhereWithoutRelatorioInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HistoricoRelatorioScalarWhereInputSchema),z.lazy(() => HistoricoRelatorioScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReversaoValidacaoUpdateManyWithoutRelatorioNestedInputSchema: z.ZodType<Prisma.ReversaoValidacaoUpdateManyWithoutRelatorioNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReversaoValidacaoCreateWithoutRelatorioInputSchema),z.lazy(() => ReversaoValidacaoCreateWithoutRelatorioInputSchema).array(),z.lazy(() => ReversaoValidacaoUncheckedCreateWithoutRelatorioInputSchema),z.lazy(() => ReversaoValidacaoUncheckedCreateWithoutRelatorioInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReversaoValidacaoCreateOrConnectWithoutRelatorioInputSchema),z.lazy(() => ReversaoValidacaoCreateOrConnectWithoutRelatorioInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReversaoValidacaoUpsertWithWhereUniqueWithoutRelatorioInputSchema),z.lazy(() => ReversaoValidacaoUpsertWithWhereUniqueWithoutRelatorioInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReversaoValidacaoCreateManyRelatorioInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema),z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema),z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema),z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema),z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReversaoValidacaoUpdateWithWhereUniqueWithoutRelatorioInputSchema),z.lazy(() => ReversaoValidacaoUpdateWithWhereUniqueWithoutRelatorioInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReversaoValidacaoUpdateManyWithWhereWithoutRelatorioInputSchema),z.lazy(() => ReversaoValidacaoUpdateManyWithWhereWithoutRelatorioInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReversaoValidacaoScalarWhereInputSchema),z.lazy(() => ReversaoValidacaoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FeedbackHistoricoUpdateManyWithoutRelatorioNestedInputSchema: z.ZodType<Prisma.FeedbackHistoricoUpdateManyWithoutRelatorioNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackHistoricoCreateWithoutRelatorioInputSchema),z.lazy(() => FeedbackHistoricoCreateWithoutRelatorioInputSchema).array(),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutRelatorioInputSchema),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutRelatorioInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackHistoricoCreateOrConnectWithoutRelatorioInputSchema),z.lazy(() => FeedbackHistoricoCreateOrConnectWithoutRelatorioInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeedbackHistoricoUpsertWithWhereUniqueWithoutRelatorioInputSchema),z.lazy(() => FeedbackHistoricoUpsertWithWhereUniqueWithoutRelatorioInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackHistoricoCreateManyRelatorioInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeedbackHistoricoUpdateWithWhereUniqueWithoutRelatorioInputSchema),z.lazy(() => FeedbackHistoricoUpdateWithWhereUniqueWithoutRelatorioInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeedbackHistoricoUpdateManyWithWhereWithoutRelatorioInputSchema),z.lazy(() => FeedbackHistoricoUpdateManyWithWhereWithoutRelatorioInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeedbackHistoricoScalarWhereInputSchema),z.lazy(() => FeedbackHistoricoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FeedbackUncheckedUpdateManyWithoutRelatorioNestedInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateManyWithoutRelatorioNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutRelatorioInputSchema),z.lazy(() => FeedbackCreateWithoutRelatorioInputSchema).array(),z.lazy(() => FeedbackUncheckedCreateWithoutRelatorioInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutRelatorioInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCreateOrConnectWithoutRelatorioInputSchema),z.lazy(() => FeedbackCreateOrConnectWithoutRelatorioInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeedbackUpsertWithWhereUniqueWithoutRelatorioInputSchema),z.lazy(() => FeedbackUpsertWithWhereUniqueWithoutRelatorioInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCreateManyRelatorioInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeedbackUpdateWithWhereUniqueWithoutRelatorioInputSchema),z.lazy(() => FeedbackUpdateWithWhereUniqueWithoutRelatorioInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeedbackUpdateManyWithWhereWithoutRelatorioInputSchema),z.lazy(() => FeedbackUpdateManyWithWhereWithoutRelatorioInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeedbackScalarWhereInputSchema),z.lazy(() => FeedbackScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const HistoricoRelatorioUncheckedUpdateManyWithoutRelatorioNestedInputSchema: z.ZodType<Prisma.HistoricoRelatorioUncheckedUpdateManyWithoutRelatorioNestedInput> = z.object({
  create: z.union([ z.lazy(() => HistoricoRelatorioCreateWithoutRelatorioInputSchema),z.lazy(() => HistoricoRelatorioCreateWithoutRelatorioInputSchema).array(),z.lazy(() => HistoricoRelatorioUncheckedCreateWithoutRelatorioInputSchema),z.lazy(() => HistoricoRelatorioUncheckedCreateWithoutRelatorioInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HistoricoRelatorioCreateOrConnectWithoutRelatorioInputSchema),z.lazy(() => HistoricoRelatorioCreateOrConnectWithoutRelatorioInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HistoricoRelatorioUpsertWithWhereUniqueWithoutRelatorioInputSchema),z.lazy(() => HistoricoRelatorioUpsertWithWhereUniqueWithoutRelatorioInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HistoricoRelatorioCreateManyRelatorioInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HistoricoRelatorioWhereUniqueInputSchema),z.lazy(() => HistoricoRelatorioWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HistoricoRelatorioWhereUniqueInputSchema),z.lazy(() => HistoricoRelatorioWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HistoricoRelatorioWhereUniqueInputSchema),z.lazy(() => HistoricoRelatorioWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HistoricoRelatorioWhereUniqueInputSchema),z.lazy(() => HistoricoRelatorioWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HistoricoRelatorioUpdateWithWhereUniqueWithoutRelatorioInputSchema),z.lazy(() => HistoricoRelatorioUpdateWithWhereUniqueWithoutRelatorioInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HistoricoRelatorioUpdateManyWithWhereWithoutRelatorioInputSchema),z.lazy(() => HistoricoRelatorioUpdateManyWithWhereWithoutRelatorioInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HistoricoRelatorioScalarWhereInputSchema),z.lazy(() => HistoricoRelatorioScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReversaoValidacaoUncheckedUpdateManyWithoutRelatorioNestedInputSchema: z.ZodType<Prisma.ReversaoValidacaoUncheckedUpdateManyWithoutRelatorioNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReversaoValidacaoCreateWithoutRelatorioInputSchema),z.lazy(() => ReversaoValidacaoCreateWithoutRelatorioInputSchema).array(),z.lazy(() => ReversaoValidacaoUncheckedCreateWithoutRelatorioInputSchema),z.lazy(() => ReversaoValidacaoUncheckedCreateWithoutRelatorioInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReversaoValidacaoCreateOrConnectWithoutRelatorioInputSchema),z.lazy(() => ReversaoValidacaoCreateOrConnectWithoutRelatorioInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReversaoValidacaoUpsertWithWhereUniqueWithoutRelatorioInputSchema),z.lazy(() => ReversaoValidacaoUpsertWithWhereUniqueWithoutRelatorioInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReversaoValidacaoCreateManyRelatorioInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema),z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema),z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema),z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema),z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReversaoValidacaoUpdateWithWhereUniqueWithoutRelatorioInputSchema),z.lazy(() => ReversaoValidacaoUpdateWithWhereUniqueWithoutRelatorioInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReversaoValidacaoUpdateManyWithWhereWithoutRelatorioInputSchema),z.lazy(() => ReversaoValidacaoUpdateManyWithWhereWithoutRelatorioInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReversaoValidacaoScalarWhereInputSchema),z.lazy(() => ReversaoValidacaoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FeedbackHistoricoUncheckedUpdateManyWithoutRelatorioNestedInputSchema: z.ZodType<Prisma.FeedbackHistoricoUncheckedUpdateManyWithoutRelatorioNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackHistoricoCreateWithoutRelatorioInputSchema),z.lazy(() => FeedbackHistoricoCreateWithoutRelatorioInputSchema).array(),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutRelatorioInputSchema),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutRelatorioInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackHistoricoCreateOrConnectWithoutRelatorioInputSchema),z.lazy(() => FeedbackHistoricoCreateOrConnectWithoutRelatorioInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeedbackHistoricoUpsertWithWhereUniqueWithoutRelatorioInputSchema),z.lazy(() => FeedbackHistoricoUpsertWithWhereUniqueWithoutRelatorioInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackHistoricoCreateManyRelatorioInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeedbackHistoricoUpdateWithWhereUniqueWithoutRelatorioInputSchema),z.lazy(() => FeedbackHistoricoUpdateWithWhereUniqueWithoutRelatorioInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeedbackHistoricoUpdateManyWithWhereWithoutRelatorioInputSchema),z.lazy(() => FeedbackHistoricoUpdateManyWithWhereWithoutRelatorioInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeedbackHistoricoScalarWhereInputSchema),z.lazy(() => FeedbackHistoricoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProfessorCreateNestedOneWithoutFeedbacksInputSchema: z.ZodType<Prisma.ProfessorCreateNestedOneWithoutFeedbacksInput> = z.object({
  create: z.union([ z.lazy(() => ProfessorCreateWithoutFeedbacksInputSchema),z.lazy(() => ProfessorUncheckedCreateWithoutFeedbacksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfessorCreateOrConnectWithoutFeedbacksInputSchema).optional(),
  connect: z.lazy(() => ProfessorWhereUniqueInputSchema).optional()
}).strict();

export const RelatorioAtividadeCreateNestedOneWithoutFeedbacksInputSchema: z.ZodType<Prisma.RelatorioAtividadeCreateNestedOneWithoutFeedbacksInput> = z.object({
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutFeedbacksInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutFeedbacksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RelatorioAtividadeCreateOrConnectWithoutFeedbacksInputSchema).optional(),
  connect: z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).optional()
}).strict();

export const FeedbackHistoricoCreateNestedManyWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackHistoricoCreateNestedManyWithoutFeedbackInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackHistoricoCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackHistoricoCreateWithoutFeedbackInputSchema).array(),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutFeedbackInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackHistoricoCreateOrConnectWithoutFeedbackInputSchema),z.lazy(() => FeedbackHistoricoCreateOrConnectWithoutFeedbackInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackHistoricoCreateManyFeedbackInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FeedbackHistoricoUncheckedCreateNestedManyWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackHistoricoUncheckedCreateNestedManyWithoutFeedbackInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackHistoricoCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackHistoricoCreateWithoutFeedbackInputSchema).array(),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutFeedbackInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackHistoricoCreateOrConnectWithoutFeedbackInputSchema),z.lazy(() => FeedbackHistoricoCreateOrConnectWithoutFeedbackInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackHistoricoCreateManyFeedbackInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProfessorUpdateOneRequiredWithoutFeedbacksNestedInputSchema: z.ZodType<Prisma.ProfessorUpdateOneRequiredWithoutFeedbacksNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfessorCreateWithoutFeedbacksInputSchema),z.lazy(() => ProfessorUncheckedCreateWithoutFeedbacksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfessorCreateOrConnectWithoutFeedbacksInputSchema).optional(),
  upsert: z.lazy(() => ProfessorUpsertWithoutFeedbacksInputSchema).optional(),
  connect: z.lazy(() => ProfessorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfessorUpdateToOneWithWhereWithoutFeedbacksInputSchema),z.lazy(() => ProfessorUpdateWithoutFeedbacksInputSchema),z.lazy(() => ProfessorUncheckedUpdateWithoutFeedbacksInputSchema) ]).optional(),
}).strict();

export const RelatorioAtividadeUpdateOneRequiredWithoutFeedbacksNestedInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpdateOneRequiredWithoutFeedbacksNestedInput> = z.object({
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutFeedbacksInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutFeedbacksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RelatorioAtividadeCreateOrConnectWithoutFeedbacksInputSchema).optional(),
  upsert: z.lazy(() => RelatorioAtividadeUpsertWithoutFeedbacksInputSchema).optional(),
  connect: z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RelatorioAtividadeUpdateToOneWithWhereWithoutFeedbacksInputSchema),z.lazy(() => RelatorioAtividadeUpdateWithoutFeedbacksInputSchema),z.lazy(() => RelatorioAtividadeUncheckedUpdateWithoutFeedbacksInputSchema) ]).optional(),
}).strict();

export const FeedbackHistoricoUpdateManyWithoutFeedbackNestedInputSchema: z.ZodType<Prisma.FeedbackHistoricoUpdateManyWithoutFeedbackNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackHistoricoCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackHistoricoCreateWithoutFeedbackInputSchema).array(),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutFeedbackInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackHistoricoCreateOrConnectWithoutFeedbackInputSchema),z.lazy(() => FeedbackHistoricoCreateOrConnectWithoutFeedbackInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeedbackHistoricoUpsertWithWhereUniqueWithoutFeedbackInputSchema),z.lazy(() => FeedbackHistoricoUpsertWithWhereUniqueWithoutFeedbackInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackHistoricoCreateManyFeedbackInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeedbackHistoricoUpdateWithWhereUniqueWithoutFeedbackInputSchema),z.lazy(() => FeedbackHistoricoUpdateWithWhereUniqueWithoutFeedbackInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeedbackHistoricoUpdateManyWithWhereWithoutFeedbackInputSchema),z.lazy(() => FeedbackHistoricoUpdateManyWithWhereWithoutFeedbackInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeedbackHistoricoScalarWhereInputSchema),z.lazy(() => FeedbackHistoricoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FeedbackHistoricoUncheckedUpdateManyWithoutFeedbackNestedInputSchema: z.ZodType<Prisma.FeedbackHistoricoUncheckedUpdateManyWithoutFeedbackNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackHistoricoCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackHistoricoCreateWithoutFeedbackInputSchema).array(),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutFeedbackInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackHistoricoCreateOrConnectWithoutFeedbackInputSchema),z.lazy(() => FeedbackHistoricoCreateOrConnectWithoutFeedbackInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeedbackHistoricoUpsertWithWhereUniqueWithoutFeedbackInputSchema),z.lazy(() => FeedbackHistoricoUpsertWithWhereUniqueWithoutFeedbackInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackHistoricoCreateManyFeedbackInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeedbackHistoricoUpdateWithWhereUniqueWithoutFeedbackInputSchema),z.lazy(() => FeedbackHistoricoUpdateWithWhereUniqueWithoutFeedbackInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeedbackHistoricoUpdateManyWithWhereWithoutFeedbackInputSchema),z.lazy(() => FeedbackHistoricoUpdateManyWithWhereWithoutFeedbackInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeedbackHistoricoScalarWhereInputSchema),z.lazy(() => FeedbackHistoricoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FeedbackCreateNestedOneWithoutHistoricosInputSchema: z.ZodType<Prisma.FeedbackCreateNestedOneWithoutHistoricosInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutHistoricosInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutHistoricosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FeedbackCreateOrConnectWithoutHistoricosInputSchema).optional(),
  connect: z.lazy(() => FeedbackWhereUniqueInputSchema).optional()
}).strict();

export const RelatorioAtividadeCreateNestedOneWithoutFeedbackHistoricosInputSchema: z.ZodType<Prisma.RelatorioAtividadeCreateNestedOneWithoutFeedbackHistoricosInput> = z.object({
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutFeedbackHistoricosInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutFeedbackHistoricosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RelatorioAtividadeCreateOrConnectWithoutFeedbackHistoricosInputSchema).optional(),
  connect: z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).optional()
}).strict();

export const ProfessorCreateNestedOneWithoutFeedbackHistoricosInputSchema: z.ZodType<Prisma.ProfessorCreateNestedOneWithoutFeedbackHistoricosInput> = z.object({
  create: z.union([ z.lazy(() => ProfessorCreateWithoutFeedbackHistoricosInputSchema),z.lazy(() => ProfessorUncheckedCreateWithoutFeedbackHistoricosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfessorCreateOrConnectWithoutFeedbackHistoricosInputSchema).optional(),
  connect: z.lazy(() => ProfessorWhereUniqueInputSchema).optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const FeedbackUpdateOneWithoutHistoricosNestedInputSchema: z.ZodType<Prisma.FeedbackUpdateOneWithoutHistoricosNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutHistoricosInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutHistoricosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FeedbackCreateOrConnectWithoutHistoricosInputSchema).optional(),
  upsert: z.lazy(() => FeedbackUpsertWithoutHistoricosInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => FeedbackWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => FeedbackWhereInputSchema) ]).optional(),
  connect: z.lazy(() => FeedbackWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FeedbackUpdateToOneWithWhereWithoutHistoricosInputSchema),z.lazy(() => FeedbackUpdateWithoutHistoricosInputSchema),z.lazy(() => FeedbackUncheckedUpdateWithoutHistoricosInputSchema) ]).optional(),
}).strict();

export const RelatorioAtividadeUpdateOneRequiredWithoutFeedbackHistoricosNestedInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpdateOneRequiredWithoutFeedbackHistoricosNestedInput> = z.object({
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutFeedbackHistoricosInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutFeedbackHistoricosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RelatorioAtividadeCreateOrConnectWithoutFeedbackHistoricosInputSchema).optional(),
  upsert: z.lazy(() => RelatorioAtividadeUpsertWithoutFeedbackHistoricosInputSchema).optional(),
  connect: z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RelatorioAtividadeUpdateToOneWithWhereWithoutFeedbackHistoricosInputSchema),z.lazy(() => RelatorioAtividadeUpdateWithoutFeedbackHistoricosInputSchema),z.lazy(() => RelatorioAtividadeUncheckedUpdateWithoutFeedbackHistoricosInputSchema) ]).optional(),
}).strict();

export const ProfessorUpdateOneWithoutFeedbackHistoricosNestedInputSchema: z.ZodType<Prisma.ProfessorUpdateOneWithoutFeedbackHistoricosNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfessorCreateWithoutFeedbackHistoricosInputSchema),z.lazy(() => ProfessorUncheckedCreateWithoutFeedbackHistoricosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfessorCreateOrConnectWithoutFeedbackHistoricosInputSchema).optional(),
  upsert: z.lazy(() => ProfessorUpsertWithoutFeedbackHistoricosInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ProfessorWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ProfessorWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ProfessorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfessorUpdateToOneWithWhereWithoutFeedbackHistoricosInputSchema),z.lazy(() => ProfessorUpdateWithoutFeedbackHistoricosInputSchema),z.lazy(() => ProfessorUncheckedUpdateWithoutFeedbackHistoricosInputSchema) ]).optional(),
}).strict();

export const RelatorioAtividadeCreateNestedOneWithoutHistoricosInputSchema: z.ZodType<Prisma.RelatorioAtividadeCreateNestedOneWithoutHistoricosInput> = z.object({
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutHistoricosInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutHistoricosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RelatorioAtividadeCreateOrConnectWithoutHistoricosInputSchema).optional(),
  connect: z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).optional()
}).strict();

export const NullableEnumStatusRelatorioFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumStatusRelatorioFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => StatusRelatorioSchema).optional().nullable()
}).strict();

export const NullableBytesFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBytesFieldUpdateOperationsInput> = z.object({
  set: z.instanceof(Buffer).optional().nullable()
}).strict();

export const RelatorioAtividadeUpdateOneRequiredWithoutHistoricosNestedInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpdateOneRequiredWithoutHistoricosNestedInput> = z.object({
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutHistoricosInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutHistoricosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RelatorioAtividadeCreateOrConnectWithoutHistoricosInputSchema).optional(),
  upsert: z.lazy(() => RelatorioAtividadeUpsertWithoutHistoricosInputSchema).optional(),
  connect: z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RelatorioAtividadeUpdateToOneWithWhereWithoutHistoricosInputSchema),z.lazy(() => RelatorioAtividadeUpdateWithoutHistoricosInputSchema),z.lazy(() => RelatorioAtividadeUncheckedUpdateWithoutHistoricosInputSchema) ]).optional(),
}).strict();

export const RelatorioAtividadeCreateNestedOneWithoutReversoesValidacaoInputSchema: z.ZodType<Prisma.RelatorioAtividadeCreateNestedOneWithoutReversoesValidacaoInput> = z.object({
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutReversoesValidacaoInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutReversoesValidacaoInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RelatorioAtividadeCreateOrConnectWithoutReversoesValidacaoInputSchema).optional(),
  connect: z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).optional()
}).strict();

export const ProfessorCreateNestedOneWithoutReversoesValidacaoInputSchema: z.ZodType<Prisma.ProfessorCreateNestedOneWithoutReversoesValidacaoInput> = z.object({
  create: z.union([ z.lazy(() => ProfessorCreateWithoutReversoesValidacaoInputSchema),z.lazy(() => ProfessorUncheckedCreateWithoutReversoesValidacaoInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfessorCreateOrConnectWithoutReversoesValidacaoInputSchema).optional(),
  connect: z.lazy(() => ProfessorWhereUniqueInputSchema).optional()
}).strict();

export const RelatorioAtividadeUpdateOneRequiredWithoutReversoesValidacaoNestedInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpdateOneRequiredWithoutReversoesValidacaoNestedInput> = z.object({
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutReversoesValidacaoInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutReversoesValidacaoInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RelatorioAtividadeCreateOrConnectWithoutReversoesValidacaoInputSchema).optional(),
  upsert: z.lazy(() => RelatorioAtividadeUpsertWithoutReversoesValidacaoInputSchema).optional(),
  connect: z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RelatorioAtividadeUpdateToOneWithWhereWithoutReversoesValidacaoInputSchema),z.lazy(() => RelatorioAtividadeUpdateWithoutReversoesValidacaoInputSchema),z.lazy(() => RelatorioAtividadeUncheckedUpdateWithoutReversoesValidacaoInputSchema) ]).optional(),
}).strict();

export const ProfessorUpdateOneRequiredWithoutReversoesValidacaoNestedInputSchema: z.ZodType<Prisma.ProfessorUpdateOneRequiredWithoutReversoesValidacaoNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfessorCreateWithoutReversoesValidacaoInputSchema),z.lazy(() => ProfessorUncheckedCreateWithoutReversoesValidacaoInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfessorCreateOrConnectWithoutReversoesValidacaoInputSchema).optional(),
  upsert: z.lazy(() => ProfessorUpsertWithoutReversoesValidacaoInputSchema).optional(),
  connect: z.lazy(() => ProfessorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfessorUpdateToOneWithWhereWithoutReversoesValidacaoInputSchema),z.lazy(() => ProfessorUpdateWithoutReversoesValidacaoInputSchema),z.lazy(() => ProfessorUncheckedUpdateWithoutReversoesValidacaoInputSchema) ]).optional(),
}).strict();

export const ProfessorCreateNestedOneWithoutProfessorCursosInputSchema: z.ZodType<Prisma.ProfessorCreateNestedOneWithoutProfessorCursosInput> = z.object({
  create: z.union([ z.lazy(() => ProfessorCreateWithoutProfessorCursosInputSchema),z.lazy(() => ProfessorUncheckedCreateWithoutProfessorCursosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfessorCreateOrConnectWithoutProfessorCursosInputSchema).optional(),
  connect: z.lazy(() => ProfessorWhereUniqueInputSchema).optional()
}).strict();

export const CursoCreateNestedOneWithoutProfessorCursosInputSchema: z.ZodType<Prisma.CursoCreateNestedOneWithoutProfessorCursosInput> = z.object({
  create: z.union([ z.lazy(() => CursoCreateWithoutProfessorCursosInputSchema),z.lazy(() => CursoUncheckedCreateWithoutProfessorCursosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CursoCreateOrConnectWithoutProfessorCursosInputSchema).optional(),
  connect: z.lazy(() => CursoWhereUniqueInputSchema).optional()
}).strict();

export const ProfessorUpdateOneRequiredWithoutProfessorCursosNestedInputSchema: z.ZodType<Prisma.ProfessorUpdateOneRequiredWithoutProfessorCursosNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfessorCreateWithoutProfessorCursosInputSchema),z.lazy(() => ProfessorUncheckedCreateWithoutProfessorCursosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfessorCreateOrConnectWithoutProfessorCursosInputSchema).optional(),
  upsert: z.lazy(() => ProfessorUpsertWithoutProfessorCursosInputSchema).optional(),
  connect: z.lazy(() => ProfessorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfessorUpdateToOneWithWhereWithoutProfessorCursosInputSchema),z.lazy(() => ProfessorUpdateWithoutProfessorCursosInputSchema),z.lazy(() => ProfessorUncheckedUpdateWithoutProfessorCursosInputSchema) ]).optional(),
}).strict();

export const CursoUpdateOneRequiredWithoutProfessorCursosNestedInputSchema: z.ZodType<Prisma.CursoUpdateOneRequiredWithoutProfessorCursosNestedInput> = z.object({
  create: z.union([ z.lazy(() => CursoCreateWithoutProfessorCursosInputSchema),z.lazy(() => CursoUncheckedCreateWithoutProfessorCursosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CursoCreateOrConnectWithoutProfessorCursosInputSchema).optional(),
  upsert: z.lazy(() => CursoUpsertWithoutProfessorCursosInputSchema).optional(),
  connect: z.lazy(() => CursoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CursoUpdateToOneWithWhereWithoutProfessorCursosInputSchema),z.lazy(() => CursoUpdateWithoutProfessorCursosInputSchema),z.lazy(() => CursoUncheckedUpdateWithoutProfessorCursosInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedEnumStatusRelatorioFilterSchema: z.ZodType<Prisma.NestedEnumStatusRelatorioFilter> = z.object({
  equals: z.lazy(() => StatusRelatorioSchema).optional(),
  in: z.lazy(() => StatusRelatorioSchema).array().optional(),
  notIn: z.lazy(() => StatusRelatorioSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => NestedEnumStatusRelatorioFilterSchema) ]).optional(),
}).strict();

export const NestedBytesFilterSchema: z.ZodType<Prisma.NestedBytesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesFilterSchema) ]).optional(),
}).strict();

export const NestedEnumStatusRelatorioWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumStatusRelatorioWithAggregatesFilter> = z.object({
  equals: z.lazy(() => StatusRelatorioSchema).optional(),
  in: z.lazy(() => StatusRelatorioSchema).array().optional(),
  notIn: z.lazy(() => StatusRelatorioSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => NestedEnumStatusRelatorioWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStatusRelatorioFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStatusRelatorioFilterSchema).optional()
}).strict();

export const NestedBytesWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBytesWithAggregatesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBytesFilterSchema).optional(),
  _max: z.lazy(() => NestedBytesFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumStatusRelatorioNullableFilterSchema: z.ZodType<Prisma.NestedEnumStatusRelatorioNullableFilter> = z.object({
  equals: z.lazy(() => StatusRelatorioSchema).optional().nullable(),
  in: z.lazy(() => StatusRelatorioSchema).array().optional().nullable(),
  notIn: z.lazy(() => StatusRelatorioSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => NestedEnumStatusRelatorioNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBytesNullableFilterSchema: z.ZodType<Prisma.NestedBytesNullableFilter> = z.object({
  equals: z.instanceof(Buffer).optional().nullable(),
  in: z.instanceof(Buffer).array().optional().nullable(),
  notIn: z.instanceof(Buffer).array().optional().nullable(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumStatusRelatorioNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumStatusRelatorioNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => StatusRelatorioSchema).optional().nullable(),
  in: z.lazy(() => StatusRelatorioSchema).array().optional().nullable(),
  notIn: z.lazy(() => StatusRelatorioSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => NestedEnumStatusRelatorioNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStatusRelatorioNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStatusRelatorioNullableFilterSchema).optional()
}).strict();

export const NestedBytesNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBytesNullableWithAggregatesFilter> = z.object({
  equals: z.instanceof(Buffer).optional().nullable(),
  in: z.instanceof(Buffer).array().optional().nullable(),
  notIn: z.instanceof(Buffer).array().optional().nullable(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBytesNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBytesNullableFilterSchema).optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AlunoCreateWithoutUsuarioInputSchema: z.ZodType<Prisma.AlunoCreateWithoutUsuarioInput> = z.object({
  matricula: z.number().int(),
  curso: z.lazy(() => CursoCreateNestedOneWithoutAlunosInputSchema),
  relatoriosAtividades: z.lazy(() => RelatorioAtividadeCreateNestedManyWithoutAlunoInputSchema).optional()
}).strict();

export const AlunoUncheckedCreateWithoutUsuarioInputSchema: z.ZodType<Prisma.AlunoUncheckedCreateWithoutUsuarioInput> = z.object({
  matricula: z.number().int(),
  idCurso: z.number().int(),
  relatoriosAtividades: z.lazy(() => RelatorioAtividadeUncheckedCreateNestedManyWithoutAlunoInputSchema).optional()
}).strict();

export const AlunoCreateOrConnectWithoutUsuarioInputSchema: z.ZodType<Prisma.AlunoCreateOrConnectWithoutUsuarioInput> = z.object({
  where: z.lazy(() => AlunoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AlunoCreateWithoutUsuarioInputSchema),z.lazy(() => AlunoUncheckedCreateWithoutUsuarioInputSchema) ]),
}).strict();

export const ProfessorCreateWithoutUsuarioInputSchema: z.ZodType<Prisma.ProfessorCreateWithoutUsuarioInput> = z.object({
  professorCursos: z.lazy(() => ProfessorCursoCreateNestedManyWithoutProfessorInputSchema).optional(),
  feedbacks: z.lazy(() => FeedbackCreateNestedManyWithoutProfessorInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoCreateNestedManyWithoutProfessorInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoCreateNestedManyWithoutProfessorInputSchema).optional()
}).strict();

export const ProfessorUncheckedCreateWithoutUsuarioInputSchema: z.ZodType<Prisma.ProfessorUncheckedCreateWithoutUsuarioInput> = z.object({
  professorCursos: z.lazy(() => ProfessorCursoUncheckedCreateNestedManyWithoutProfessorInputSchema).optional(),
  feedbacks: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutProfessorInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUncheckedCreateNestedManyWithoutProfessorInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUncheckedCreateNestedManyWithoutProfessorInputSchema).optional()
}).strict();

export const ProfessorCreateOrConnectWithoutUsuarioInputSchema: z.ZodType<Prisma.ProfessorCreateOrConnectWithoutUsuarioInput> = z.object({
  where: z.lazy(() => ProfessorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfessorCreateWithoutUsuarioInputSchema),z.lazy(() => ProfessorUncheckedCreateWithoutUsuarioInputSchema) ]),
}).strict();

export const CoordenadorCreateWithoutUsuarioInputSchema: z.ZodType<Prisma.CoordenadorCreateWithoutUsuarioInput> = z.object({
  cursoResponsavel: z.lazy(() => CursoCreateNestedOneWithoutCoordenadorCursosInputSchema)
}).strict();

export const CoordenadorUncheckedCreateWithoutUsuarioInputSchema: z.ZodType<Prisma.CoordenadorUncheckedCreateWithoutUsuarioInput> = z.object({
  idCursoResponsavel: z.number().int()
}).strict();

export const CoordenadorCreateOrConnectWithoutUsuarioInputSchema: z.ZodType<Prisma.CoordenadorCreateOrConnectWithoutUsuarioInput> = z.object({
  where: z.lazy(() => CoordenadorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CoordenadorCreateWithoutUsuarioInputSchema),z.lazy(() => CoordenadorUncheckedCreateWithoutUsuarioInputSchema) ]),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ipAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  idToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AlunoUpsertWithoutUsuarioInputSchema: z.ZodType<Prisma.AlunoUpsertWithoutUsuarioInput> = z.object({
  update: z.union([ z.lazy(() => AlunoUpdateWithoutUsuarioInputSchema),z.lazy(() => AlunoUncheckedUpdateWithoutUsuarioInputSchema) ]),
  create: z.union([ z.lazy(() => AlunoCreateWithoutUsuarioInputSchema),z.lazy(() => AlunoUncheckedCreateWithoutUsuarioInputSchema) ]),
  where: z.lazy(() => AlunoWhereInputSchema).optional()
}).strict();

export const AlunoUpdateToOneWithWhereWithoutUsuarioInputSchema: z.ZodType<Prisma.AlunoUpdateToOneWithWhereWithoutUsuarioInput> = z.object({
  where: z.lazy(() => AlunoWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AlunoUpdateWithoutUsuarioInputSchema),z.lazy(() => AlunoUncheckedUpdateWithoutUsuarioInputSchema) ]),
}).strict();

export const AlunoUpdateWithoutUsuarioInputSchema: z.ZodType<Prisma.AlunoUpdateWithoutUsuarioInput> = z.object({
  matricula: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  curso: z.lazy(() => CursoUpdateOneRequiredWithoutAlunosNestedInputSchema).optional(),
  relatoriosAtividades: z.lazy(() => RelatorioAtividadeUpdateManyWithoutAlunoNestedInputSchema).optional()
}).strict();

export const AlunoUncheckedUpdateWithoutUsuarioInputSchema: z.ZodType<Prisma.AlunoUncheckedUpdateWithoutUsuarioInput> = z.object({
  matricula: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idCurso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  relatoriosAtividades: z.lazy(() => RelatorioAtividadeUncheckedUpdateManyWithoutAlunoNestedInputSchema).optional()
}).strict();

export const ProfessorUpsertWithoutUsuarioInputSchema: z.ZodType<Prisma.ProfessorUpsertWithoutUsuarioInput> = z.object({
  update: z.union([ z.lazy(() => ProfessorUpdateWithoutUsuarioInputSchema),z.lazy(() => ProfessorUncheckedUpdateWithoutUsuarioInputSchema) ]),
  create: z.union([ z.lazy(() => ProfessorCreateWithoutUsuarioInputSchema),z.lazy(() => ProfessorUncheckedCreateWithoutUsuarioInputSchema) ]),
  where: z.lazy(() => ProfessorWhereInputSchema).optional()
}).strict();

export const ProfessorUpdateToOneWithWhereWithoutUsuarioInputSchema: z.ZodType<Prisma.ProfessorUpdateToOneWithWhereWithoutUsuarioInput> = z.object({
  where: z.lazy(() => ProfessorWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProfessorUpdateWithoutUsuarioInputSchema),z.lazy(() => ProfessorUncheckedUpdateWithoutUsuarioInputSchema) ]),
}).strict();

export const ProfessorUpdateWithoutUsuarioInputSchema: z.ZodType<Prisma.ProfessorUpdateWithoutUsuarioInput> = z.object({
  professorCursos: z.lazy(() => ProfessorCursoUpdateManyWithoutProfessorNestedInputSchema).optional(),
  feedbacks: z.lazy(() => FeedbackUpdateManyWithoutProfessorNestedInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUpdateManyWithoutProfessorNestedInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUpdateManyWithoutProfessorNestedInputSchema).optional()
}).strict();

export const ProfessorUncheckedUpdateWithoutUsuarioInputSchema: z.ZodType<Prisma.ProfessorUncheckedUpdateWithoutUsuarioInput> = z.object({
  professorCursos: z.lazy(() => ProfessorCursoUncheckedUpdateManyWithoutProfessorNestedInputSchema).optional(),
  feedbacks: z.lazy(() => FeedbackUncheckedUpdateManyWithoutProfessorNestedInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUncheckedUpdateManyWithoutProfessorNestedInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUncheckedUpdateManyWithoutProfessorNestedInputSchema).optional()
}).strict();

export const CoordenadorUpsertWithoutUsuarioInputSchema: z.ZodType<Prisma.CoordenadorUpsertWithoutUsuarioInput> = z.object({
  update: z.union([ z.lazy(() => CoordenadorUpdateWithoutUsuarioInputSchema),z.lazy(() => CoordenadorUncheckedUpdateWithoutUsuarioInputSchema) ]),
  create: z.union([ z.lazy(() => CoordenadorCreateWithoutUsuarioInputSchema),z.lazy(() => CoordenadorUncheckedCreateWithoutUsuarioInputSchema) ]),
  where: z.lazy(() => CoordenadorWhereInputSchema).optional()
}).strict();

export const CoordenadorUpdateToOneWithWhereWithoutUsuarioInputSchema: z.ZodType<Prisma.CoordenadorUpdateToOneWithWhereWithoutUsuarioInput> = z.object({
  where: z.lazy(() => CoordenadorWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CoordenadorUpdateWithoutUsuarioInputSchema),z.lazy(() => CoordenadorUncheckedUpdateWithoutUsuarioInputSchema) ]),
}).strict();

export const CoordenadorUpdateWithoutUsuarioInputSchema: z.ZodType<Prisma.CoordenadorUpdateWithoutUsuarioInput> = z.object({
  cursoResponsavel: z.lazy(() => CursoUpdateOneRequiredWithoutCoordenadorCursosNestedInputSchema).optional()
}).strict();

export const CoordenadorUncheckedUpdateWithoutUsuarioInputSchema: z.ZodType<Prisma.CoordenadorUncheckedUpdateWithoutUsuarioInput> = z.object({
  idCursoResponsavel: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  aluno: z.lazy(() => AlunoCreateNestedOneWithoutUsuarioInputSchema).optional(),
  professor: z.lazy(() => ProfessorCreateNestedOneWithoutUsuarioInputSchema).optional(),
  coordenador: z.lazy(() => CoordenadorCreateNestedOneWithoutUsuarioInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  aluno: z.lazy(() => AlunoUncheckedCreateNestedOneWithoutUsuarioInputSchema).optional(),
  professor: z.lazy(() => ProfessorUncheckedCreateNestedOneWithoutUsuarioInputSchema).optional(),
  coordenador: z.lazy(() => CoordenadorUncheckedCreateNestedOneWithoutUsuarioInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  aluno: z.lazy(() => AlunoUpdateOneWithoutUsuarioNestedInputSchema).optional(),
  professor: z.lazy(() => ProfessorUpdateOneWithoutUsuarioNestedInputSchema).optional(),
  coordenador: z.lazy(() => CoordenadorUpdateOneWithoutUsuarioNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  aluno: z.lazy(() => AlunoUncheckedUpdateOneWithoutUsuarioNestedInputSchema).optional(),
  professor: z.lazy(() => ProfessorUncheckedUpdateOneWithoutUsuarioNestedInputSchema).optional(),
  coordenador: z.lazy(() => CoordenadorUncheckedUpdateOneWithoutUsuarioNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  aluno: z.lazy(() => AlunoCreateNestedOneWithoutUsuarioInputSchema).optional(),
  professor: z.lazy(() => ProfessorCreateNestedOneWithoutUsuarioInputSchema).optional(),
  coordenador: z.lazy(() => CoordenadorCreateNestedOneWithoutUsuarioInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  aluno: z.lazy(() => AlunoUncheckedCreateNestedOneWithoutUsuarioInputSchema).optional(),
  professor: z.lazy(() => ProfessorUncheckedCreateNestedOneWithoutUsuarioInputSchema).optional(),
  coordenador: z.lazy(() => CoordenadorUncheckedCreateNestedOneWithoutUsuarioInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  aluno: z.lazy(() => AlunoUpdateOneWithoutUsuarioNestedInputSchema).optional(),
  professor: z.lazy(() => ProfessorUpdateOneWithoutUsuarioNestedInputSchema).optional(),
  coordenador: z.lazy(() => CoordenadorUpdateOneWithoutUsuarioNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  aluno: z.lazy(() => AlunoUncheckedUpdateOneWithoutUsuarioNestedInputSchema).optional(),
  professor: z.lazy(() => ProfessorUncheckedUpdateOneWithoutUsuarioNestedInputSchema).optional(),
  coordenador: z.lazy(() => CoordenadorUncheckedUpdateOneWithoutUsuarioNestedInputSchema).optional()
}).strict();

export const AlunoCreateWithoutCursoInputSchema: z.ZodType<Prisma.AlunoCreateWithoutCursoInput> = z.object({
  matricula: z.number().int(),
  usuario: z.lazy(() => UserCreateNestedOneWithoutAlunoInputSchema),
  relatoriosAtividades: z.lazy(() => RelatorioAtividadeCreateNestedManyWithoutAlunoInputSchema).optional()
}).strict();

export const AlunoUncheckedCreateWithoutCursoInputSchema: z.ZodType<Prisma.AlunoUncheckedCreateWithoutCursoInput> = z.object({
  idUsuario: z.string(),
  matricula: z.number().int(),
  relatoriosAtividades: z.lazy(() => RelatorioAtividadeUncheckedCreateNestedManyWithoutAlunoInputSchema).optional()
}).strict();

export const AlunoCreateOrConnectWithoutCursoInputSchema: z.ZodType<Prisma.AlunoCreateOrConnectWithoutCursoInput> = z.object({
  where: z.lazy(() => AlunoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AlunoCreateWithoutCursoInputSchema),z.lazy(() => AlunoUncheckedCreateWithoutCursoInputSchema) ]),
}).strict();

export const AlunoCreateManyCursoInputEnvelopeSchema: z.ZodType<Prisma.AlunoCreateManyCursoInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AlunoCreateManyCursoInputSchema),z.lazy(() => AlunoCreateManyCursoInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CategoriaCreateWithoutCursoInputSchema: z.ZodType<Prisma.CategoriaCreateWithoutCursoInput> = z.object({
  nome: z.string(),
  descricao: z.string(),
  cargaHoraria: z.number().int(),
  relatoriosAtividades: z.lazy(() => RelatorioAtividadeCreateNestedManyWithoutCategoriaInputSchema).optional()
}).strict();

export const CategoriaUncheckedCreateWithoutCursoInputSchema: z.ZodType<Prisma.CategoriaUncheckedCreateWithoutCursoInput> = z.object({
  id: z.number().int().optional(),
  nome: z.string(),
  descricao: z.string(),
  cargaHoraria: z.number().int(),
  relatoriosAtividades: z.lazy(() => RelatorioAtividadeUncheckedCreateNestedManyWithoutCategoriaInputSchema).optional()
}).strict();

export const CategoriaCreateOrConnectWithoutCursoInputSchema: z.ZodType<Prisma.CategoriaCreateOrConnectWithoutCursoInput> = z.object({
  where: z.lazy(() => CategoriaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CategoriaCreateWithoutCursoInputSchema),z.lazy(() => CategoriaUncheckedCreateWithoutCursoInputSchema) ]),
}).strict();

export const CategoriaCreateManyCursoInputEnvelopeSchema: z.ZodType<Prisma.CategoriaCreateManyCursoInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CategoriaCreateManyCursoInputSchema),z.lazy(() => CategoriaCreateManyCursoInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProfessorCursoCreateWithoutCursoInputSchema: z.ZodType<Prisma.ProfessorCursoCreateWithoutCursoInput> = z.object({
  professor: z.lazy(() => ProfessorCreateNestedOneWithoutProfessorCursosInputSchema)
}).strict();

export const ProfessorCursoUncheckedCreateWithoutCursoInputSchema: z.ZodType<Prisma.ProfessorCursoUncheckedCreateWithoutCursoInput> = z.object({
  idProfessor: z.string()
}).strict();

export const ProfessorCursoCreateOrConnectWithoutCursoInputSchema: z.ZodType<Prisma.ProfessorCursoCreateOrConnectWithoutCursoInput> = z.object({
  where: z.lazy(() => ProfessorCursoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfessorCursoCreateWithoutCursoInputSchema),z.lazy(() => ProfessorCursoUncheckedCreateWithoutCursoInputSchema) ]),
}).strict();

export const ProfessorCursoCreateManyCursoInputEnvelopeSchema: z.ZodType<Prisma.ProfessorCursoCreateManyCursoInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProfessorCursoCreateManyCursoInputSchema),z.lazy(() => ProfessorCursoCreateManyCursoInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CoordenadorCreateWithoutCursoResponsavelInputSchema: z.ZodType<Prisma.CoordenadorCreateWithoutCursoResponsavelInput> = z.object({
  usuario: z.lazy(() => UserCreateNestedOneWithoutCoordenadorInputSchema)
}).strict();

export const CoordenadorUncheckedCreateWithoutCursoResponsavelInputSchema: z.ZodType<Prisma.CoordenadorUncheckedCreateWithoutCursoResponsavelInput> = z.object({
  idUsuario: z.string()
}).strict();

export const CoordenadorCreateOrConnectWithoutCursoResponsavelInputSchema: z.ZodType<Prisma.CoordenadorCreateOrConnectWithoutCursoResponsavelInput> = z.object({
  where: z.lazy(() => CoordenadorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CoordenadorCreateWithoutCursoResponsavelInputSchema),z.lazy(() => CoordenadorUncheckedCreateWithoutCursoResponsavelInputSchema) ]),
}).strict();

export const CoordenadorCreateManyCursoResponsavelInputEnvelopeSchema: z.ZodType<Prisma.CoordenadorCreateManyCursoResponsavelInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CoordenadorCreateManyCursoResponsavelInputSchema),z.lazy(() => CoordenadorCreateManyCursoResponsavelInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AlunoUpsertWithWhereUniqueWithoutCursoInputSchema: z.ZodType<Prisma.AlunoUpsertWithWhereUniqueWithoutCursoInput> = z.object({
  where: z.lazy(() => AlunoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AlunoUpdateWithoutCursoInputSchema),z.lazy(() => AlunoUncheckedUpdateWithoutCursoInputSchema) ]),
  create: z.union([ z.lazy(() => AlunoCreateWithoutCursoInputSchema),z.lazy(() => AlunoUncheckedCreateWithoutCursoInputSchema) ]),
}).strict();

export const AlunoUpdateWithWhereUniqueWithoutCursoInputSchema: z.ZodType<Prisma.AlunoUpdateWithWhereUniqueWithoutCursoInput> = z.object({
  where: z.lazy(() => AlunoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AlunoUpdateWithoutCursoInputSchema),z.lazy(() => AlunoUncheckedUpdateWithoutCursoInputSchema) ]),
}).strict();

export const AlunoUpdateManyWithWhereWithoutCursoInputSchema: z.ZodType<Prisma.AlunoUpdateManyWithWhereWithoutCursoInput> = z.object({
  where: z.lazy(() => AlunoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AlunoUpdateManyMutationInputSchema),z.lazy(() => AlunoUncheckedUpdateManyWithoutCursoInputSchema) ]),
}).strict();

export const AlunoScalarWhereInputSchema: z.ZodType<Prisma.AlunoScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AlunoScalarWhereInputSchema),z.lazy(() => AlunoScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AlunoScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AlunoScalarWhereInputSchema),z.lazy(() => AlunoScalarWhereInputSchema).array() ]).optional(),
  idUsuario: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  matricula: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  idCurso: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const CategoriaUpsertWithWhereUniqueWithoutCursoInputSchema: z.ZodType<Prisma.CategoriaUpsertWithWhereUniqueWithoutCursoInput> = z.object({
  where: z.lazy(() => CategoriaWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CategoriaUpdateWithoutCursoInputSchema),z.lazy(() => CategoriaUncheckedUpdateWithoutCursoInputSchema) ]),
  create: z.union([ z.lazy(() => CategoriaCreateWithoutCursoInputSchema),z.lazy(() => CategoriaUncheckedCreateWithoutCursoInputSchema) ]),
}).strict();

export const CategoriaUpdateWithWhereUniqueWithoutCursoInputSchema: z.ZodType<Prisma.CategoriaUpdateWithWhereUniqueWithoutCursoInput> = z.object({
  where: z.lazy(() => CategoriaWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CategoriaUpdateWithoutCursoInputSchema),z.lazy(() => CategoriaUncheckedUpdateWithoutCursoInputSchema) ]),
}).strict();

export const CategoriaUpdateManyWithWhereWithoutCursoInputSchema: z.ZodType<Prisma.CategoriaUpdateManyWithWhereWithoutCursoInput> = z.object({
  where: z.lazy(() => CategoriaScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CategoriaUpdateManyMutationInputSchema),z.lazy(() => CategoriaUncheckedUpdateManyWithoutCursoInputSchema) ]),
}).strict();

export const CategoriaScalarWhereInputSchema: z.ZodType<Prisma.CategoriaScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CategoriaScalarWhereInputSchema),z.lazy(() => CategoriaScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoriaScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoriaScalarWhereInputSchema),z.lazy(() => CategoriaScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  nome: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  descricao: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  cargaHoraria: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  idCurso: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const ProfessorCursoUpsertWithWhereUniqueWithoutCursoInputSchema: z.ZodType<Prisma.ProfessorCursoUpsertWithWhereUniqueWithoutCursoInput> = z.object({
  where: z.lazy(() => ProfessorCursoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProfessorCursoUpdateWithoutCursoInputSchema),z.lazy(() => ProfessorCursoUncheckedUpdateWithoutCursoInputSchema) ]),
  create: z.union([ z.lazy(() => ProfessorCursoCreateWithoutCursoInputSchema),z.lazy(() => ProfessorCursoUncheckedCreateWithoutCursoInputSchema) ]),
}).strict();

export const ProfessorCursoUpdateWithWhereUniqueWithoutCursoInputSchema: z.ZodType<Prisma.ProfessorCursoUpdateWithWhereUniqueWithoutCursoInput> = z.object({
  where: z.lazy(() => ProfessorCursoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProfessorCursoUpdateWithoutCursoInputSchema),z.lazy(() => ProfessorCursoUncheckedUpdateWithoutCursoInputSchema) ]),
}).strict();

export const ProfessorCursoUpdateManyWithWhereWithoutCursoInputSchema: z.ZodType<Prisma.ProfessorCursoUpdateManyWithWhereWithoutCursoInput> = z.object({
  where: z.lazy(() => ProfessorCursoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProfessorCursoUpdateManyMutationInputSchema),z.lazy(() => ProfessorCursoUncheckedUpdateManyWithoutCursoInputSchema) ]),
}).strict();

export const ProfessorCursoScalarWhereInputSchema: z.ZodType<Prisma.ProfessorCursoScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProfessorCursoScalarWhereInputSchema),z.lazy(() => ProfessorCursoScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfessorCursoScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfessorCursoScalarWhereInputSchema),z.lazy(() => ProfessorCursoScalarWhereInputSchema).array() ]).optional(),
  idProfessor: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  idCurso: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const CoordenadorUpsertWithWhereUniqueWithoutCursoResponsavelInputSchema: z.ZodType<Prisma.CoordenadorUpsertWithWhereUniqueWithoutCursoResponsavelInput> = z.object({
  where: z.lazy(() => CoordenadorWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CoordenadorUpdateWithoutCursoResponsavelInputSchema),z.lazy(() => CoordenadorUncheckedUpdateWithoutCursoResponsavelInputSchema) ]),
  create: z.union([ z.lazy(() => CoordenadorCreateWithoutCursoResponsavelInputSchema),z.lazy(() => CoordenadorUncheckedCreateWithoutCursoResponsavelInputSchema) ]),
}).strict();

export const CoordenadorUpdateWithWhereUniqueWithoutCursoResponsavelInputSchema: z.ZodType<Prisma.CoordenadorUpdateWithWhereUniqueWithoutCursoResponsavelInput> = z.object({
  where: z.lazy(() => CoordenadorWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CoordenadorUpdateWithoutCursoResponsavelInputSchema),z.lazy(() => CoordenadorUncheckedUpdateWithoutCursoResponsavelInputSchema) ]),
}).strict();

export const CoordenadorUpdateManyWithWhereWithoutCursoResponsavelInputSchema: z.ZodType<Prisma.CoordenadorUpdateManyWithWhereWithoutCursoResponsavelInput> = z.object({
  where: z.lazy(() => CoordenadorScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CoordenadorUpdateManyMutationInputSchema),z.lazy(() => CoordenadorUncheckedUpdateManyWithoutCursoResponsavelInputSchema) ]),
}).strict();

export const CoordenadorScalarWhereInputSchema: z.ZodType<Prisma.CoordenadorScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CoordenadorScalarWhereInputSchema),z.lazy(() => CoordenadorScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CoordenadorScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CoordenadorScalarWhereInputSchema),z.lazy(() => CoordenadorScalarWhereInputSchema).array() ]).optional(),
  idUsuario: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  idCursoResponsavel: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const UserCreateWithoutAlunoInputSchema: z.ZodType<Prisma.UserCreateWithoutAlunoInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  professor: z.lazy(() => ProfessorCreateNestedOneWithoutUsuarioInputSchema).optional(),
  coordenador: z.lazy(() => CoordenadorCreateNestedOneWithoutUsuarioInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAlunoInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAlunoInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  professor: z.lazy(() => ProfessorUncheckedCreateNestedOneWithoutUsuarioInputSchema).optional(),
  coordenador: z.lazy(() => CoordenadorUncheckedCreateNestedOneWithoutUsuarioInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAlunoInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAlunoInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAlunoInputSchema),z.lazy(() => UserUncheckedCreateWithoutAlunoInputSchema) ]),
}).strict();

export const CursoCreateWithoutAlunosInputSchema: z.ZodType<Prisma.CursoCreateWithoutAlunosInput> = z.object({
  nome: z.string(),
  categorias: z.lazy(() => CategoriaCreateNestedManyWithoutCursoInputSchema).optional(),
  professorCursos: z.lazy(() => ProfessorCursoCreateNestedManyWithoutCursoInputSchema).optional(),
  coordenadorCursos: z.lazy(() => CoordenadorCreateNestedManyWithoutCursoResponsavelInputSchema).optional()
}).strict();

export const CursoUncheckedCreateWithoutAlunosInputSchema: z.ZodType<Prisma.CursoUncheckedCreateWithoutAlunosInput> = z.object({
  id: z.number().int().optional(),
  nome: z.string(),
  categorias: z.lazy(() => CategoriaUncheckedCreateNestedManyWithoutCursoInputSchema).optional(),
  professorCursos: z.lazy(() => ProfessorCursoUncheckedCreateNestedManyWithoutCursoInputSchema).optional(),
  coordenadorCursos: z.lazy(() => CoordenadorUncheckedCreateNestedManyWithoutCursoResponsavelInputSchema).optional()
}).strict();

export const CursoCreateOrConnectWithoutAlunosInputSchema: z.ZodType<Prisma.CursoCreateOrConnectWithoutAlunosInput> = z.object({
  where: z.lazy(() => CursoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CursoCreateWithoutAlunosInputSchema),z.lazy(() => CursoUncheckedCreateWithoutAlunosInputSchema) ]),
}).strict();

export const RelatorioAtividadeCreateWithoutAlunoInputSchema: z.ZodType<Prisma.RelatorioAtividadeCreateWithoutAlunoInput> = z.object({
  nome: z.string(),
  textoReflexao: z.string(),
  dataRealizacao: z.coerce.date(),
  dataEnvio: z.coerce.date(),
  status: z.lazy(() => StatusRelatorioSchema).optional(),
  horasValidadas: z.number().int(),
  certificado: z.instanceof(Buffer),
  categoria: z.lazy(() => CategoriaCreateNestedOneWithoutRelatoriosAtividadesInputSchema),
  feedbacks: z.lazy(() => FeedbackCreateNestedManyWithoutRelatorioInputSchema).optional(),
  historicos: z.lazy(() => HistoricoRelatorioCreateNestedManyWithoutRelatorioInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoCreateNestedManyWithoutRelatorioInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoCreateNestedManyWithoutRelatorioInputSchema).optional()
}).strict();

export const RelatorioAtividadeUncheckedCreateWithoutAlunoInputSchema: z.ZodType<Prisma.RelatorioAtividadeUncheckedCreateWithoutAlunoInput> = z.object({
  id: z.number().int().optional(),
  nome: z.string(),
  textoReflexao: z.string(),
  dataRealizacao: z.coerce.date(),
  dataEnvio: z.coerce.date(),
  status: z.lazy(() => StatusRelatorioSchema).optional(),
  horasValidadas: z.number().int(),
  certificado: z.instanceof(Buffer),
  idCategoria: z.number().int(),
  feedbacks: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutRelatorioInputSchema).optional(),
  historicos: z.lazy(() => HistoricoRelatorioUncheckedCreateNestedManyWithoutRelatorioInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUncheckedCreateNestedManyWithoutRelatorioInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUncheckedCreateNestedManyWithoutRelatorioInputSchema).optional()
}).strict();

export const RelatorioAtividadeCreateOrConnectWithoutAlunoInputSchema: z.ZodType<Prisma.RelatorioAtividadeCreateOrConnectWithoutAlunoInput> = z.object({
  where: z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutAlunoInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutAlunoInputSchema) ]),
}).strict();

export const RelatorioAtividadeCreateManyAlunoInputEnvelopeSchema: z.ZodType<Prisma.RelatorioAtividadeCreateManyAlunoInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RelatorioAtividadeCreateManyAlunoInputSchema),z.lazy(() => RelatorioAtividadeCreateManyAlunoInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutAlunoInputSchema: z.ZodType<Prisma.UserUpsertWithoutAlunoInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAlunoInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAlunoInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAlunoInputSchema),z.lazy(() => UserUncheckedCreateWithoutAlunoInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAlunoInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAlunoInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAlunoInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAlunoInputSchema) ]),
}).strict();

export const UserUpdateWithoutAlunoInputSchema: z.ZodType<Prisma.UserUpdateWithoutAlunoInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  professor: z.lazy(() => ProfessorUpdateOneWithoutUsuarioNestedInputSchema).optional(),
  coordenador: z.lazy(() => CoordenadorUpdateOneWithoutUsuarioNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAlunoInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAlunoInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  professor: z.lazy(() => ProfessorUncheckedUpdateOneWithoutUsuarioNestedInputSchema).optional(),
  coordenador: z.lazy(() => CoordenadorUncheckedUpdateOneWithoutUsuarioNestedInputSchema).optional()
}).strict();

export const CursoUpsertWithoutAlunosInputSchema: z.ZodType<Prisma.CursoUpsertWithoutAlunosInput> = z.object({
  update: z.union([ z.lazy(() => CursoUpdateWithoutAlunosInputSchema),z.lazy(() => CursoUncheckedUpdateWithoutAlunosInputSchema) ]),
  create: z.union([ z.lazy(() => CursoCreateWithoutAlunosInputSchema),z.lazy(() => CursoUncheckedCreateWithoutAlunosInputSchema) ]),
  where: z.lazy(() => CursoWhereInputSchema).optional()
}).strict();

export const CursoUpdateToOneWithWhereWithoutAlunosInputSchema: z.ZodType<Prisma.CursoUpdateToOneWithWhereWithoutAlunosInput> = z.object({
  where: z.lazy(() => CursoWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CursoUpdateWithoutAlunosInputSchema),z.lazy(() => CursoUncheckedUpdateWithoutAlunosInputSchema) ]),
}).strict();

export const CursoUpdateWithoutAlunosInputSchema: z.ZodType<Prisma.CursoUpdateWithoutAlunosInput> = z.object({
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categorias: z.lazy(() => CategoriaUpdateManyWithoutCursoNestedInputSchema).optional(),
  professorCursos: z.lazy(() => ProfessorCursoUpdateManyWithoutCursoNestedInputSchema).optional(),
  coordenadorCursos: z.lazy(() => CoordenadorUpdateManyWithoutCursoResponsavelNestedInputSchema).optional()
}).strict();

export const CursoUncheckedUpdateWithoutAlunosInputSchema: z.ZodType<Prisma.CursoUncheckedUpdateWithoutAlunosInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categorias: z.lazy(() => CategoriaUncheckedUpdateManyWithoutCursoNestedInputSchema).optional(),
  professorCursos: z.lazy(() => ProfessorCursoUncheckedUpdateManyWithoutCursoNestedInputSchema).optional(),
  coordenadorCursos: z.lazy(() => CoordenadorUncheckedUpdateManyWithoutCursoResponsavelNestedInputSchema).optional()
}).strict();

export const RelatorioAtividadeUpsertWithWhereUniqueWithoutAlunoInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpsertWithWhereUniqueWithoutAlunoInput> = z.object({
  where: z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RelatorioAtividadeUpdateWithoutAlunoInputSchema),z.lazy(() => RelatorioAtividadeUncheckedUpdateWithoutAlunoInputSchema) ]),
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutAlunoInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutAlunoInputSchema) ]),
}).strict();

export const RelatorioAtividadeUpdateWithWhereUniqueWithoutAlunoInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpdateWithWhereUniqueWithoutAlunoInput> = z.object({
  where: z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RelatorioAtividadeUpdateWithoutAlunoInputSchema),z.lazy(() => RelatorioAtividadeUncheckedUpdateWithoutAlunoInputSchema) ]),
}).strict();

export const RelatorioAtividadeUpdateManyWithWhereWithoutAlunoInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpdateManyWithWhereWithoutAlunoInput> = z.object({
  where: z.lazy(() => RelatorioAtividadeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RelatorioAtividadeUpdateManyMutationInputSchema),z.lazy(() => RelatorioAtividadeUncheckedUpdateManyWithoutAlunoInputSchema) ]),
}).strict();

export const RelatorioAtividadeScalarWhereInputSchema: z.ZodType<Prisma.RelatorioAtividadeScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RelatorioAtividadeScalarWhereInputSchema),z.lazy(() => RelatorioAtividadeScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RelatorioAtividadeScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RelatorioAtividadeScalarWhereInputSchema),z.lazy(() => RelatorioAtividadeScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  nome: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  textoReflexao: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dataRealizacao: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  dataEnvio: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumStatusRelatorioFilterSchema),z.lazy(() => StatusRelatorioSchema) ]).optional(),
  horasValidadas: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  certificado: z.union([ z.lazy(() => BytesFilterSchema),z.instanceof(Buffer) ]).optional(),
  idAluno: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  idCategoria: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const UserCreateWithoutProfessorInputSchema: z.ZodType<Prisma.UserCreateWithoutProfessorInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  aluno: z.lazy(() => AlunoCreateNestedOneWithoutUsuarioInputSchema).optional(),
  coordenador: z.lazy(() => CoordenadorCreateNestedOneWithoutUsuarioInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutProfessorInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutProfessorInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  aluno: z.lazy(() => AlunoUncheckedCreateNestedOneWithoutUsuarioInputSchema).optional(),
  coordenador: z.lazy(() => CoordenadorUncheckedCreateNestedOneWithoutUsuarioInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutProfessorInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutProfessorInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutProfessorInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfessorInputSchema) ]),
}).strict();

export const ProfessorCursoCreateWithoutProfessorInputSchema: z.ZodType<Prisma.ProfessorCursoCreateWithoutProfessorInput> = z.object({
  curso: z.lazy(() => CursoCreateNestedOneWithoutProfessorCursosInputSchema)
}).strict();

export const ProfessorCursoUncheckedCreateWithoutProfessorInputSchema: z.ZodType<Prisma.ProfessorCursoUncheckedCreateWithoutProfessorInput> = z.object({
  idCurso: z.number().int()
}).strict();

export const ProfessorCursoCreateOrConnectWithoutProfessorInputSchema: z.ZodType<Prisma.ProfessorCursoCreateOrConnectWithoutProfessorInput> = z.object({
  where: z.lazy(() => ProfessorCursoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfessorCursoCreateWithoutProfessorInputSchema),z.lazy(() => ProfessorCursoUncheckedCreateWithoutProfessorInputSchema) ]),
}).strict();

export const ProfessorCursoCreateManyProfessorInputEnvelopeSchema: z.ZodType<Prisma.ProfessorCursoCreateManyProfessorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProfessorCursoCreateManyProfessorInputSchema),z.lazy(() => ProfessorCursoCreateManyProfessorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FeedbackCreateWithoutProfessorInputSchema: z.ZodType<Prisma.FeedbackCreateWithoutProfessorInput> = z.object({
  textoFeedback: z.string(),
  dataEnvio: z.coerce.date(),
  relatorio: z.lazy(() => RelatorioAtividadeCreateNestedOneWithoutFeedbacksInputSchema),
  historicos: z.lazy(() => FeedbackHistoricoCreateNestedManyWithoutFeedbackInputSchema).optional()
}).strict();

export const FeedbackUncheckedCreateWithoutProfessorInputSchema: z.ZodType<Prisma.FeedbackUncheckedCreateWithoutProfessorInput> = z.object({
  id: z.number().int().optional(),
  textoFeedback: z.string(),
  dataEnvio: z.coerce.date(),
  idRelatorio: z.number().int(),
  historicos: z.lazy(() => FeedbackHistoricoUncheckedCreateNestedManyWithoutFeedbackInputSchema).optional()
}).strict();

export const FeedbackCreateOrConnectWithoutProfessorInputSchema: z.ZodType<Prisma.FeedbackCreateOrConnectWithoutProfessorInput> = z.object({
  where: z.lazy(() => FeedbackWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FeedbackCreateWithoutProfessorInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutProfessorInputSchema) ]),
}).strict();

export const FeedbackCreateManyProfessorInputEnvelopeSchema: z.ZodType<Prisma.FeedbackCreateManyProfessorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FeedbackCreateManyProfessorInputSchema),z.lazy(() => FeedbackCreateManyProfessorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ReversaoValidacaoCreateWithoutProfessorInputSchema: z.ZodType<Prisma.ReversaoValidacaoCreateWithoutProfessorInput> = z.object({
  justificativa: z.string(),
  dataReversao: z.coerce.date().optional(),
  relatorio: z.lazy(() => RelatorioAtividadeCreateNestedOneWithoutReversoesValidacaoInputSchema)
}).strict();

export const ReversaoValidacaoUncheckedCreateWithoutProfessorInputSchema: z.ZodType<Prisma.ReversaoValidacaoUncheckedCreateWithoutProfessorInput> = z.object({
  id: z.number().int().optional(),
  idRelatorio: z.number().int(),
  justificativa: z.string(),
  dataReversao: z.coerce.date().optional()
}).strict();

export const ReversaoValidacaoCreateOrConnectWithoutProfessorInputSchema: z.ZodType<Prisma.ReversaoValidacaoCreateOrConnectWithoutProfessorInput> = z.object({
  where: z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReversaoValidacaoCreateWithoutProfessorInputSchema),z.lazy(() => ReversaoValidacaoUncheckedCreateWithoutProfessorInputSchema) ]),
}).strict();

export const ReversaoValidacaoCreateManyProfessorInputEnvelopeSchema: z.ZodType<Prisma.ReversaoValidacaoCreateManyProfessorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReversaoValidacaoCreateManyProfessorInputSchema),z.lazy(() => ReversaoValidacaoCreateManyProfessorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FeedbackHistoricoCreateWithoutProfessorInputSchema: z.ZodType<Prisma.FeedbackHistoricoCreateWithoutProfessorInput> = z.object({
  textoFeedback: z.string(),
  dataEnvio: z.coerce.date().optional(),
  versao: z.number().int().optional().nullable(),
  feedback: z.lazy(() => FeedbackCreateNestedOneWithoutHistoricosInputSchema).optional(),
  relatorio: z.lazy(() => RelatorioAtividadeCreateNestedOneWithoutFeedbackHistoricosInputSchema)
}).strict();

export const FeedbackHistoricoUncheckedCreateWithoutProfessorInputSchema: z.ZodType<Prisma.FeedbackHistoricoUncheckedCreateWithoutProfessorInput> = z.object({
  id: z.number().int().optional(),
  idFeedback: z.number().int().optional().nullable(),
  idRelatorio: z.number().int(),
  textoFeedback: z.string(),
  dataEnvio: z.coerce.date().optional(),
  versao: z.number().int().optional().nullable()
}).strict();

export const FeedbackHistoricoCreateOrConnectWithoutProfessorInputSchema: z.ZodType<Prisma.FeedbackHistoricoCreateOrConnectWithoutProfessorInput> = z.object({
  where: z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FeedbackHistoricoCreateWithoutProfessorInputSchema),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutProfessorInputSchema) ]),
}).strict();

export const FeedbackHistoricoCreateManyProfessorInputEnvelopeSchema: z.ZodType<Prisma.FeedbackHistoricoCreateManyProfessorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FeedbackHistoricoCreateManyProfessorInputSchema),z.lazy(() => FeedbackHistoricoCreateManyProfessorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutProfessorInputSchema: z.ZodType<Prisma.UserUpsertWithoutProfessorInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutProfessorInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProfessorInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutProfessorInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfessorInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutProfessorInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutProfessorInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutProfessorInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProfessorInputSchema) ]),
}).strict();

export const UserUpdateWithoutProfessorInputSchema: z.ZodType<Prisma.UserUpdateWithoutProfessorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  aluno: z.lazy(() => AlunoUpdateOneWithoutUsuarioNestedInputSchema).optional(),
  coordenador: z.lazy(() => CoordenadorUpdateOneWithoutUsuarioNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutProfessorInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutProfessorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  aluno: z.lazy(() => AlunoUncheckedUpdateOneWithoutUsuarioNestedInputSchema).optional(),
  coordenador: z.lazy(() => CoordenadorUncheckedUpdateOneWithoutUsuarioNestedInputSchema).optional()
}).strict();

export const ProfessorCursoUpsertWithWhereUniqueWithoutProfessorInputSchema: z.ZodType<Prisma.ProfessorCursoUpsertWithWhereUniqueWithoutProfessorInput> = z.object({
  where: z.lazy(() => ProfessorCursoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProfessorCursoUpdateWithoutProfessorInputSchema),z.lazy(() => ProfessorCursoUncheckedUpdateWithoutProfessorInputSchema) ]),
  create: z.union([ z.lazy(() => ProfessorCursoCreateWithoutProfessorInputSchema),z.lazy(() => ProfessorCursoUncheckedCreateWithoutProfessorInputSchema) ]),
}).strict();

export const ProfessorCursoUpdateWithWhereUniqueWithoutProfessorInputSchema: z.ZodType<Prisma.ProfessorCursoUpdateWithWhereUniqueWithoutProfessorInput> = z.object({
  where: z.lazy(() => ProfessorCursoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProfessorCursoUpdateWithoutProfessorInputSchema),z.lazy(() => ProfessorCursoUncheckedUpdateWithoutProfessorInputSchema) ]),
}).strict();

export const ProfessorCursoUpdateManyWithWhereWithoutProfessorInputSchema: z.ZodType<Prisma.ProfessorCursoUpdateManyWithWhereWithoutProfessorInput> = z.object({
  where: z.lazy(() => ProfessorCursoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProfessorCursoUpdateManyMutationInputSchema),z.lazy(() => ProfessorCursoUncheckedUpdateManyWithoutProfessorInputSchema) ]),
}).strict();

export const FeedbackUpsertWithWhereUniqueWithoutProfessorInputSchema: z.ZodType<Prisma.FeedbackUpsertWithWhereUniqueWithoutProfessorInput> = z.object({
  where: z.lazy(() => FeedbackWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FeedbackUpdateWithoutProfessorInputSchema),z.lazy(() => FeedbackUncheckedUpdateWithoutProfessorInputSchema) ]),
  create: z.union([ z.lazy(() => FeedbackCreateWithoutProfessorInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutProfessorInputSchema) ]),
}).strict();

export const FeedbackUpdateWithWhereUniqueWithoutProfessorInputSchema: z.ZodType<Prisma.FeedbackUpdateWithWhereUniqueWithoutProfessorInput> = z.object({
  where: z.lazy(() => FeedbackWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FeedbackUpdateWithoutProfessorInputSchema),z.lazy(() => FeedbackUncheckedUpdateWithoutProfessorInputSchema) ]),
}).strict();

export const FeedbackUpdateManyWithWhereWithoutProfessorInputSchema: z.ZodType<Prisma.FeedbackUpdateManyWithWhereWithoutProfessorInput> = z.object({
  where: z.lazy(() => FeedbackScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FeedbackUpdateManyMutationInputSchema),z.lazy(() => FeedbackUncheckedUpdateManyWithoutProfessorInputSchema) ]),
}).strict();

export const FeedbackScalarWhereInputSchema: z.ZodType<Prisma.FeedbackScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FeedbackScalarWhereInputSchema),z.lazy(() => FeedbackScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackScalarWhereInputSchema),z.lazy(() => FeedbackScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  textoFeedback: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dataEnvio: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  idProfessor: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  idRelatorio: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const ReversaoValidacaoUpsertWithWhereUniqueWithoutProfessorInputSchema: z.ZodType<Prisma.ReversaoValidacaoUpsertWithWhereUniqueWithoutProfessorInput> = z.object({
  where: z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReversaoValidacaoUpdateWithoutProfessorInputSchema),z.lazy(() => ReversaoValidacaoUncheckedUpdateWithoutProfessorInputSchema) ]),
  create: z.union([ z.lazy(() => ReversaoValidacaoCreateWithoutProfessorInputSchema),z.lazy(() => ReversaoValidacaoUncheckedCreateWithoutProfessorInputSchema) ]),
}).strict();

export const ReversaoValidacaoUpdateWithWhereUniqueWithoutProfessorInputSchema: z.ZodType<Prisma.ReversaoValidacaoUpdateWithWhereUniqueWithoutProfessorInput> = z.object({
  where: z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReversaoValidacaoUpdateWithoutProfessorInputSchema),z.lazy(() => ReversaoValidacaoUncheckedUpdateWithoutProfessorInputSchema) ]),
}).strict();

export const ReversaoValidacaoUpdateManyWithWhereWithoutProfessorInputSchema: z.ZodType<Prisma.ReversaoValidacaoUpdateManyWithWhereWithoutProfessorInput> = z.object({
  where: z.lazy(() => ReversaoValidacaoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReversaoValidacaoUpdateManyMutationInputSchema),z.lazy(() => ReversaoValidacaoUncheckedUpdateManyWithoutProfessorInputSchema) ]),
}).strict();

export const ReversaoValidacaoScalarWhereInputSchema: z.ZodType<Prisma.ReversaoValidacaoScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReversaoValidacaoScalarWhereInputSchema),z.lazy(() => ReversaoValidacaoScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReversaoValidacaoScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReversaoValidacaoScalarWhereInputSchema),z.lazy(() => ReversaoValidacaoScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  idRelatorio: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  justificativa: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dataReversao: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  idProfessor: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const FeedbackHistoricoUpsertWithWhereUniqueWithoutProfessorInputSchema: z.ZodType<Prisma.FeedbackHistoricoUpsertWithWhereUniqueWithoutProfessorInput> = z.object({
  where: z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FeedbackHistoricoUpdateWithoutProfessorInputSchema),z.lazy(() => FeedbackHistoricoUncheckedUpdateWithoutProfessorInputSchema) ]),
  create: z.union([ z.lazy(() => FeedbackHistoricoCreateWithoutProfessorInputSchema),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutProfessorInputSchema) ]),
}).strict();

export const FeedbackHistoricoUpdateWithWhereUniqueWithoutProfessorInputSchema: z.ZodType<Prisma.FeedbackHistoricoUpdateWithWhereUniqueWithoutProfessorInput> = z.object({
  where: z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FeedbackHistoricoUpdateWithoutProfessorInputSchema),z.lazy(() => FeedbackHistoricoUncheckedUpdateWithoutProfessorInputSchema) ]),
}).strict();

export const FeedbackHistoricoUpdateManyWithWhereWithoutProfessorInputSchema: z.ZodType<Prisma.FeedbackHistoricoUpdateManyWithWhereWithoutProfessorInput> = z.object({
  where: z.lazy(() => FeedbackHistoricoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FeedbackHistoricoUpdateManyMutationInputSchema),z.lazy(() => FeedbackHistoricoUncheckedUpdateManyWithoutProfessorInputSchema) ]),
}).strict();

export const FeedbackHistoricoScalarWhereInputSchema: z.ZodType<Prisma.FeedbackHistoricoScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FeedbackHistoricoScalarWhereInputSchema),z.lazy(() => FeedbackHistoricoScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackHistoricoScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackHistoricoScalarWhereInputSchema),z.lazy(() => FeedbackHistoricoScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  idFeedback: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  idRelatorio: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  textoFeedback: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dataEnvio: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  idProfessor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  versao: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const UserCreateWithoutCoordenadorInputSchema: z.ZodType<Prisma.UserCreateWithoutCoordenadorInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  aluno: z.lazy(() => AlunoCreateNestedOneWithoutUsuarioInputSchema).optional(),
  professor: z.lazy(() => ProfessorCreateNestedOneWithoutUsuarioInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCoordenadorInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCoordenadorInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  aluno: z.lazy(() => AlunoUncheckedCreateNestedOneWithoutUsuarioInputSchema).optional(),
  professor: z.lazy(() => ProfessorUncheckedCreateNestedOneWithoutUsuarioInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCoordenadorInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCoordenadorInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCoordenadorInputSchema),z.lazy(() => UserUncheckedCreateWithoutCoordenadorInputSchema) ]),
}).strict();

export const CursoCreateWithoutCoordenadorCursosInputSchema: z.ZodType<Prisma.CursoCreateWithoutCoordenadorCursosInput> = z.object({
  nome: z.string(),
  alunos: z.lazy(() => AlunoCreateNestedManyWithoutCursoInputSchema).optional(),
  categorias: z.lazy(() => CategoriaCreateNestedManyWithoutCursoInputSchema).optional(),
  professorCursos: z.lazy(() => ProfessorCursoCreateNestedManyWithoutCursoInputSchema).optional()
}).strict();

export const CursoUncheckedCreateWithoutCoordenadorCursosInputSchema: z.ZodType<Prisma.CursoUncheckedCreateWithoutCoordenadorCursosInput> = z.object({
  id: z.number().int().optional(),
  nome: z.string(),
  alunos: z.lazy(() => AlunoUncheckedCreateNestedManyWithoutCursoInputSchema).optional(),
  categorias: z.lazy(() => CategoriaUncheckedCreateNestedManyWithoutCursoInputSchema).optional(),
  professorCursos: z.lazy(() => ProfessorCursoUncheckedCreateNestedManyWithoutCursoInputSchema).optional()
}).strict();

export const CursoCreateOrConnectWithoutCoordenadorCursosInputSchema: z.ZodType<Prisma.CursoCreateOrConnectWithoutCoordenadorCursosInput> = z.object({
  where: z.lazy(() => CursoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CursoCreateWithoutCoordenadorCursosInputSchema),z.lazy(() => CursoUncheckedCreateWithoutCoordenadorCursosInputSchema) ]),
}).strict();

export const UserUpsertWithoutCoordenadorInputSchema: z.ZodType<Prisma.UserUpsertWithoutCoordenadorInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCoordenadorInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCoordenadorInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCoordenadorInputSchema),z.lazy(() => UserUncheckedCreateWithoutCoordenadorInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutCoordenadorInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCoordenadorInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCoordenadorInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCoordenadorInputSchema) ]),
}).strict();

export const UserUpdateWithoutCoordenadorInputSchema: z.ZodType<Prisma.UserUpdateWithoutCoordenadorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  aluno: z.lazy(() => AlunoUpdateOneWithoutUsuarioNestedInputSchema).optional(),
  professor: z.lazy(() => ProfessorUpdateOneWithoutUsuarioNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCoordenadorInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCoordenadorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  aluno: z.lazy(() => AlunoUncheckedUpdateOneWithoutUsuarioNestedInputSchema).optional(),
  professor: z.lazy(() => ProfessorUncheckedUpdateOneWithoutUsuarioNestedInputSchema).optional()
}).strict();

export const CursoUpsertWithoutCoordenadorCursosInputSchema: z.ZodType<Prisma.CursoUpsertWithoutCoordenadorCursosInput> = z.object({
  update: z.union([ z.lazy(() => CursoUpdateWithoutCoordenadorCursosInputSchema),z.lazy(() => CursoUncheckedUpdateWithoutCoordenadorCursosInputSchema) ]),
  create: z.union([ z.lazy(() => CursoCreateWithoutCoordenadorCursosInputSchema),z.lazy(() => CursoUncheckedCreateWithoutCoordenadorCursosInputSchema) ]),
  where: z.lazy(() => CursoWhereInputSchema).optional()
}).strict();

export const CursoUpdateToOneWithWhereWithoutCoordenadorCursosInputSchema: z.ZodType<Prisma.CursoUpdateToOneWithWhereWithoutCoordenadorCursosInput> = z.object({
  where: z.lazy(() => CursoWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CursoUpdateWithoutCoordenadorCursosInputSchema),z.lazy(() => CursoUncheckedUpdateWithoutCoordenadorCursosInputSchema) ]),
}).strict();

export const CursoUpdateWithoutCoordenadorCursosInputSchema: z.ZodType<Prisma.CursoUpdateWithoutCoordenadorCursosInput> = z.object({
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alunos: z.lazy(() => AlunoUpdateManyWithoutCursoNestedInputSchema).optional(),
  categorias: z.lazy(() => CategoriaUpdateManyWithoutCursoNestedInputSchema).optional(),
  professorCursos: z.lazy(() => ProfessorCursoUpdateManyWithoutCursoNestedInputSchema).optional()
}).strict();

export const CursoUncheckedUpdateWithoutCoordenadorCursosInputSchema: z.ZodType<Prisma.CursoUncheckedUpdateWithoutCoordenadorCursosInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alunos: z.lazy(() => AlunoUncheckedUpdateManyWithoutCursoNestedInputSchema).optional(),
  categorias: z.lazy(() => CategoriaUncheckedUpdateManyWithoutCursoNestedInputSchema).optional(),
  professorCursos: z.lazy(() => ProfessorCursoUncheckedUpdateManyWithoutCursoNestedInputSchema).optional()
}).strict();

export const CursoCreateWithoutCategoriasInputSchema: z.ZodType<Prisma.CursoCreateWithoutCategoriasInput> = z.object({
  nome: z.string(),
  alunos: z.lazy(() => AlunoCreateNestedManyWithoutCursoInputSchema).optional(),
  professorCursos: z.lazy(() => ProfessorCursoCreateNestedManyWithoutCursoInputSchema).optional(),
  coordenadorCursos: z.lazy(() => CoordenadorCreateNestedManyWithoutCursoResponsavelInputSchema).optional()
}).strict();

export const CursoUncheckedCreateWithoutCategoriasInputSchema: z.ZodType<Prisma.CursoUncheckedCreateWithoutCategoriasInput> = z.object({
  id: z.number().int().optional(),
  nome: z.string(),
  alunos: z.lazy(() => AlunoUncheckedCreateNestedManyWithoutCursoInputSchema).optional(),
  professorCursos: z.lazy(() => ProfessorCursoUncheckedCreateNestedManyWithoutCursoInputSchema).optional(),
  coordenadorCursos: z.lazy(() => CoordenadorUncheckedCreateNestedManyWithoutCursoResponsavelInputSchema).optional()
}).strict();

export const CursoCreateOrConnectWithoutCategoriasInputSchema: z.ZodType<Prisma.CursoCreateOrConnectWithoutCategoriasInput> = z.object({
  where: z.lazy(() => CursoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CursoCreateWithoutCategoriasInputSchema),z.lazy(() => CursoUncheckedCreateWithoutCategoriasInputSchema) ]),
}).strict();

export const RelatorioAtividadeCreateWithoutCategoriaInputSchema: z.ZodType<Prisma.RelatorioAtividadeCreateWithoutCategoriaInput> = z.object({
  nome: z.string(),
  textoReflexao: z.string(),
  dataRealizacao: z.coerce.date(),
  dataEnvio: z.coerce.date(),
  status: z.lazy(() => StatusRelatorioSchema).optional(),
  horasValidadas: z.number().int(),
  certificado: z.instanceof(Buffer),
  aluno: z.lazy(() => AlunoCreateNestedOneWithoutRelatoriosAtividadesInputSchema),
  feedbacks: z.lazy(() => FeedbackCreateNestedManyWithoutRelatorioInputSchema).optional(),
  historicos: z.lazy(() => HistoricoRelatorioCreateNestedManyWithoutRelatorioInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoCreateNestedManyWithoutRelatorioInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoCreateNestedManyWithoutRelatorioInputSchema).optional()
}).strict();

export const RelatorioAtividadeUncheckedCreateWithoutCategoriaInputSchema: z.ZodType<Prisma.RelatorioAtividadeUncheckedCreateWithoutCategoriaInput> = z.object({
  id: z.number().int().optional(),
  nome: z.string(),
  textoReflexao: z.string(),
  dataRealizacao: z.coerce.date(),
  dataEnvio: z.coerce.date(),
  status: z.lazy(() => StatusRelatorioSchema).optional(),
  horasValidadas: z.number().int(),
  certificado: z.instanceof(Buffer),
  idAluno: z.string(),
  feedbacks: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutRelatorioInputSchema).optional(),
  historicos: z.lazy(() => HistoricoRelatorioUncheckedCreateNestedManyWithoutRelatorioInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUncheckedCreateNestedManyWithoutRelatorioInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUncheckedCreateNestedManyWithoutRelatorioInputSchema).optional()
}).strict();

export const RelatorioAtividadeCreateOrConnectWithoutCategoriaInputSchema: z.ZodType<Prisma.RelatorioAtividadeCreateOrConnectWithoutCategoriaInput> = z.object({
  where: z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutCategoriaInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutCategoriaInputSchema) ]),
}).strict();

export const RelatorioAtividadeCreateManyCategoriaInputEnvelopeSchema: z.ZodType<Prisma.RelatorioAtividadeCreateManyCategoriaInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RelatorioAtividadeCreateManyCategoriaInputSchema),z.lazy(() => RelatorioAtividadeCreateManyCategoriaInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CursoUpsertWithoutCategoriasInputSchema: z.ZodType<Prisma.CursoUpsertWithoutCategoriasInput> = z.object({
  update: z.union([ z.lazy(() => CursoUpdateWithoutCategoriasInputSchema),z.lazy(() => CursoUncheckedUpdateWithoutCategoriasInputSchema) ]),
  create: z.union([ z.lazy(() => CursoCreateWithoutCategoriasInputSchema),z.lazy(() => CursoUncheckedCreateWithoutCategoriasInputSchema) ]),
  where: z.lazy(() => CursoWhereInputSchema).optional()
}).strict();

export const CursoUpdateToOneWithWhereWithoutCategoriasInputSchema: z.ZodType<Prisma.CursoUpdateToOneWithWhereWithoutCategoriasInput> = z.object({
  where: z.lazy(() => CursoWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CursoUpdateWithoutCategoriasInputSchema),z.lazy(() => CursoUncheckedUpdateWithoutCategoriasInputSchema) ]),
}).strict();

export const CursoUpdateWithoutCategoriasInputSchema: z.ZodType<Prisma.CursoUpdateWithoutCategoriasInput> = z.object({
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alunos: z.lazy(() => AlunoUpdateManyWithoutCursoNestedInputSchema).optional(),
  professorCursos: z.lazy(() => ProfessorCursoUpdateManyWithoutCursoNestedInputSchema).optional(),
  coordenadorCursos: z.lazy(() => CoordenadorUpdateManyWithoutCursoResponsavelNestedInputSchema).optional()
}).strict();

export const CursoUncheckedUpdateWithoutCategoriasInputSchema: z.ZodType<Prisma.CursoUncheckedUpdateWithoutCategoriasInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alunos: z.lazy(() => AlunoUncheckedUpdateManyWithoutCursoNestedInputSchema).optional(),
  professorCursos: z.lazy(() => ProfessorCursoUncheckedUpdateManyWithoutCursoNestedInputSchema).optional(),
  coordenadorCursos: z.lazy(() => CoordenadorUncheckedUpdateManyWithoutCursoResponsavelNestedInputSchema).optional()
}).strict();

export const RelatorioAtividadeUpsertWithWhereUniqueWithoutCategoriaInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpsertWithWhereUniqueWithoutCategoriaInput> = z.object({
  where: z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RelatorioAtividadeUpdateWithoutCategoriaInputSchema),z.lazy(() => RelatorioAtividadeUncheckedUpdateWithoutCategoriaInputSchema) ]),
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutCategoriaInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutCategoriaInputSchema) ]),
}).strict();

export const RelatorioAtividadeUpdateWithWhereUniqueWithoutCategoriaInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpdateWithWhereUniqueWithoutCategoriaInput> = z.object({
  where: z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RelatorioAtividadeUpdateWithoutCategoriaInputSchema),z.lazy(() => RelatorioAtividadeUncheckedUpdateWithoutCategoriaInputSchema) ]),
}).strict();

export const RelatorioAtividadeUpdateManyWithWhereWithoutCategoriaInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpdateManyWithWhereWithoutCategoriaInput> = z.object({
  where: z.lazy(() => RelatorioAtividadeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RelatorioAtividadeUpdateManyMutationInputSchema),z.lazy(() => RelatorioAtividadeUncheckedUpdateManyWithoutCategoriaInputSchema) ]),
}).strict();

export const AlunoCreateWithoutRelatoriosAtividadesInputSchema: z.ZodType<Prisma.AlunoCreateWithoutRelatoriosAtividadesInput> = z.object({
  matricula: z.number().int(),
  usuario: z.lazy(() => UserCreateNestedOneWithoutAlunoInputSchema),
  curso: z.lazy(() => CursoCreateNestedOneWithoutAlunosInputSchema)
}).strict();

export const AlunoUncheckedCreateWithoutRelatoriosAtividadesInputSchema: z.ZodType<Prisma.AlunoUncheckedCreateWithoutRelatoriosAtividadesInput> = z.object({
  idUsuario: z.string(),
  matricula: z.number().int(),
  idCurso: z.number().int()
}).strict();

export const AlunoCreateOrConnectWithoutRelatoriosAtividadesInputSchema: z.ZodType<Prisma.AlunoCreateOrConnectWithoutRelatoriosAtividadesInput> = z.object({
  where: z.lazy(() => AlunoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AlunoCreateWithoutRelatoriosAtividadesInputSchema),z.lazy(() => AlunoUncheckedCreateWithoutRelatoriosAtividadesInputSchema) ]),
}).strict();

export const CategoriaCreateWithoutRelatoriosAtividadesInputSchema: z.ZodType<Prisma.CategoriaCreateWithoutRelatoriosAtividadesInput> = z.object({
  nome: z.string(),
  descricao: z.string(),
  cargaHoraria: z.number().int(),
  curso: z.lazy(() => CursoCreateNestedOneWithoutCategoriasInputSchema)
}).strict();

export const CategoriaUncheckedCreateWithoutRelatoriosAtividadesInputSchema: z.ZodType<Prisma.CategoriaUncheckedCreateWithoutRelatoriosAtividadesInput> = z.object({
  id: z.number().int().optional(),
  nome: z.string(),
  descricao: z.string(),
  cargaHoraria: z.number().int(),
  idCurso: z.number().int()
}).strict();

export const CategoriaCreateOrConnectWithoutRelatoriosAtividadesInputSchema: z.ZodType<Prisma.CategoriaCreateOrConnectWithoutRelatoriosAtividadesInput> = z.object({
  where: z.lazy(() => CategoriaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CategoriaCreateWithoutRelatoriosAtividadesInputSchema),z.lazy(() => CategoriaUncheckedCreateWithoutRelatoriosAtividadesInputSchema) ]),
}).strict();

export const FeedbackCreateWithoutRelatorioInputSchema: z.ZodType<Prisma.FeedbackCreateWithoutRelatorioInput> = z.object({
  textoFeedback: z.string(),
  dataEnvio: z.coerce.date(),
  professor: z.lazy(() => ProfessorCreateNestedOneWithoutFeedbacksInputSchema),
  historicos: z.lazy(() => FeedbackHistoricoCreateNestedManyWithoutFeedbackInputSchema).optional()
}).strict();

export const FeedbackUncheckedCreateWithoutRelatorioInputSchema: z.ZodType<Prisma.FeedbackUncheckedCreateWithoutRelatorioInput> = z.object({
  id: z.number().int().optional(),
  textoFeedback: z.string(),
  dataEnvio: z.coerce.date(),
  idProfessor: z.string(),
  historicos: z.lazy(() => FeedbackHistoricoUncheckedCreateNestedManyWithoutFeedbackInputSchema).optional()
}).strict();

export const FeedbackCreateOrConnectWithoutRelatorioInputSchema: z.ZodType<Prisma.FeedbackCreateOrConnectWithoutRelatorioInput> = z.object({
  where: z.lazy(() => FeedbackWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FeedbackCreateWithoutRelatorioInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutRelatorioInputSchema) ]),
}).strict();

export const FeedbackCreateManyRelatorioInputEnvelopeSchema: z.ZodType<Prisma.FeedbackCreateManyRelatorioInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FeedbackCreateManyRelatorioInputSchema),z.lazy(() => FeedbackCreateManyRelatorioInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const HistoricoRelatorioCreateWithoutRelatorioInputSchema: z.ZodType<Prisma.HistoricoRelatorioCreateWithoutRelatorioInput> = z.object({
  nomeAnterior: z.string().optional().nullable(),
  textoReflexaoAnterior: z.string().optional().nullable(),
  dataRealizacaoAnterior: z.coerce.date().optional().nullable(),
  statusAnterior: z.lazy(() => StatusRelatorioSchema).optional().nullable(),
  dataAlteracao: z.coerce.date().optional(),
  certificadoAnterior: z.instanceof(Buffer).optional().nullable()
}).strict();

export const HistoricoRelatorioUncheckedCreateWithoutRelatorioInputSchema: z.ZodType<Prisma.HistoricoRelatorioUncheckedCreateWithoutRelatorioInput> = z.object({
  id: z.number().int().optional(),
  nomeAnterior: z.string().optional().nullable(),
  textoReflexaoAnterior: z.string().optional().nullable(),
  dataRealizacaoAnterior: z.coerce.date().optional().nullable(),
  statusAnterior: z.lazy(() => StatusRelatorioSchema).optional().nullable(),
  dataAlteracao: z.coerce.date().optional(),
  certificadoAnterior: z.instanceof(Buffer).optional().nullable()
}).strict();

export const HistoricoRelatorioCreateOrConnectWithoutRelatorioInputSchema: z.ZodType<Prisma.HistoricoRelatorioCreateOrConnectWithoutRelatorioInput> = z.object({
  where: z.lazy(() => HistoricoRelatorioWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HistoricoRelatorioCreateWithoutRelatorioInputSchema),z.lazy(() => HistoricoRelatorioUncheckedCreateWithoutRelatorioInputSchema) ]),
}).strict();

export const HistoricoRelatorioCreateManyRelatorioInputEnvelopeSchema: z.ZodType<Prisma.HistoricoRelatorioCreateManyRelatorioInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => HistoricoRelatorioCreateManyRelatorioInputSchema),z.lazy(() => HistoricoRelatorioCreateManyRelatorioInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ReversaoValidacaoCreateWithoutRelatorioInputSchema: z.ZodType<Prisma.ReversaoValidacaoCreateWithoutRelatorioInput> = z.object({
  justificativa: z.string(),
  dataReversao: z.coerce.date().optional(),
  professor: z.lazy(() => ProfessorCreateNestedOneWithoutReversoesValidacaoInputSchema)
}).strict();

export const ReversaoValidacaoUncheckedCreateWithoutRelatorioInputSchema: z.ZodType<Prisma.ReversaoValidacaoUncheckedCreateWithoutRelatorioInput> = z.object({
  id: z.number().int().optional(),
  justificativa: z.string(),
  dataReversao: z.coerce.date().optional(),
  idProfessor: z.string()
}).strict();

export const ReversaoValidacaoCreateOrConnectWithoutRelatorioInputSchema: z.ZodType<Prisma.ReversaoValidacaoCreateOrConnectWithoutRelatorioInput> = z.object({
  where: z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReversaoValidacaoCreateWithoutRelatorioInputSchema),z.lazy(() => ReversaoValidacaoUncheckedCreateWithoutRelatorioInputSchema) ]),
}).strict();

export const ReversaoValidacaoCreateManyRelatorioInputEnvelopeSchema: z.ZodType<Prisma.ReversaoValidacaoCreateManyRelatorioInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReversaoValidacaoCreateManyRelatorioInputSchema),z.lazy(() => ReversaoValidacaoCreateManyRelatorioInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FeedbackHistoricoCreateWithoutRelatorioInputSchema: z.ZodType<Prisma.FeedbackHistoricoCreateWithoutRelatorioInput> = z.object({
  textoFeedback: z.string(),
  dataEnvio: z.coerce.date().optional(),
  versao: z.number().int().optional().nullable(),
  feedback: z.lazy(() => FeedbackCreateNestedOneWithoutHistoricosInputSchema).optional(),
  professor: z.lazy(() => ProfessorCreateNestedOneWithoutFeedbackHistoricosInputSchema).optional()
}).strict();

export const FeedbackHistoricoUncheckedCreateWithoutRelatorioInputSchema: z.ZodType<Prisma.FeedbackHistoricoUncheckedCreateWithoutRelatorioInput> = z.object({
  id: z.number().int().optional(),
  idFeedback: z.number().int().optional().nullable(),
  textoFeedback: z.string(),
  dataEnvio: z.coerce.date().optional(),
  idProfessor: z.string().optional().nullable(),
  versao: z.number().int().optional().nullable()
}).strict();

export const FeedbackHistoricoCreateOrConnectWithoutRelatorioInputSchema: z.ZodType<Prisma.FeedbackHistoricoCreateOrConnectWithoutRelatorioInput> = z.object({
  where: z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FeedbackHistoricoCreateWithoutRelatorioInputSchema),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutRelatorioInputSchema) ]),
}).strict();

export const FeedbackHistoricoCreateManyRelatorioInputEnvelopeSchema: z.ZodType<Prisma.FeedbackHistoricoCreateManyRelatorioInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FeedbackHistoricoCreateManyRelatorioInputSchema),z.lazy(() => FeedbackHistoricoCreateManyRelatorioInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AlunoUpsertWithoutRelatoriosAtividadesInputSchema: z.ZodType<Prisma.AlunoUpsertWithoutRelatoriosAtividadesInput> = z.object({
  update: z.union([ z.lazy(() => AlunoUpdateWithoutRelatoriosAtividadesInputSchema),z.lazy(() => AlunoUncheckedUpdateWithoutRelatoriosAtividadesInputSchema) ]),
  create: z.union([ z.lazy(() => AlunoCreateWithoutRelatoriosAtividadesInputSchema),z.lazy(() => AlunoUncheckedCreateWithoutRelatoriosAtividadesInputSchema) ]),
  where: z.lazy(() => AlunoWhereInputSchema).optional()
}).strict();

export const AlunoUpdateToOneWithWhereWithoutRelatoriosAtividadesInputSchema: z.ZodType<Prisma.AlunoUpdateToOneWithWhereWithoutRelatoriosAtividadesInput> = z.object({
  where: z.lazy(() => AlunoWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AlunoUpdateWithoutRelatoriosAtividadesInputSchema),z.lazy(() => AlunoUncheckedUpdateWithoutRelatoriosAtividadesInputSchema) ]),
}).strict();

export const AlunoUpdateWithoutRelatoriosAtividadesInputSchema: z.ZodType<Prisma.AlunoUpdateWithoutRelatoriosAtividadesInput> = z.object({
  matricula: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  usuario: z.lazy(() => UserUpdateOneRequiredWithoutAlunoNestedInputSchema).optional(),
  curso: z.lazy(() => CursoUpdateOneRequiredWithoutAlunosNestedInputSchema).optional()
}).strict();

export const AlunoUncheckedUpdateWithoutRelatoriosAtividadesInputSchema: z.ZodType<Prisma.AlunoUncheckedUpdateWithoutRelatoriosAtividadesInput> = z.object({
  idUsuario: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  matricula: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idCurso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoriaUpsertWithoutRelatoriosAtividadesInputSchema: z.ZodType<Prisma.CategoriaUpsertWithoutRelatoriosAtividadesInput> = z.object({
  update: z.union([ z.lazy(() => CategoriaUpdateWithoutRelatoriosAtividadesInputSchema),z.lazy(() => CategoriaUncheckedUpdateWithoutRelatoriosAtividadesInputSchema) ]),
  create: z.union([ z.lazy(() => CategoriaCreateWithoutRelatoriosAtividadesInputSchema),z.lazy(() => CategoriaUncheckedCreateWithoutRelatoriosAtividadesInputSchema) ]),
  where: z.lazy(() => CategoriaWhereInputSchema).optional()
}).strict();

export const CategoriaUpdateToOneWithWhereWithoutRelatoriosAtividadesInputSchema: z.ZodType<Prisma.CategoriaUpdateToOneWithWhereWithoutRelatoriosAtividadesInput> = z.object({
  where: z.lazy(() => CategoriaWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CategoriaUpdateWithoutRelatoriosAtividadesInputSchema),z.lazy(() => CategoriaUncheckedUpdateWithoutRelatoriosAtividadesInputSchema) ]),
}).strict();

export const CategoriaUpdateWithoutRelatoriosAtividadesInputSchema: z.ZodType<Prisma.CategoriaUpdateWithoutRelatoriosAtividadesInput> = z.object({
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cargaHoraria: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  curso: z.lazy(() => CursoUpdateOneRequiredWithoutCategoriasNestedInputSchema).optional()
}).strict();

export const CategoriaUncheckedUpdateWithoutRelatoriosAtividadesInputSchema: z.ZodType<Prisma.CategoriaUncheckedUpdateWithoutRelatoriosAtividadesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cargaHoraria: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idCurso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackUpsertWithWhereUniqueWithoutRelatorioInputSchema: z.ZodType<Prisma.FeedbackUpsertWithWhereUniqueWithoutRelatorioInput> = z.object({
  where: z.lazy(() => FeedbackWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FeedbackUpdateWithoutRelatorioInputSchema),z.lazy(() => FeedbackUncheckedUpdateWithoutRelatorioInputSchema) ]),
  create: z.union([ z.lazy(() => FeedbackCreateWithoutRelatorioInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutRelatorioInputSchema) ]),
}).strict();

export const FeedbackUpdateWithWhereUniqueWithoutRelatorioInputSchema: z.ZodType<Prisma.FeedbackUpdateWithWhereUniqueWithoutRelatorioInput> = z.object({
  where: z.lazy(() => FeedbackWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FeedbackUpdateWithoutRelatorioInputSchema),z.lazy(() => FeedbackUncheckedUpdateWithoutRelatorioInputSchema) ]),
}).strict();

export const FeedbackUpdateManyWithWhereWithoutRelatorioInputSchema: z.ZodType<Prisma.FeedbackUpdateManyWithWhereWithoutRelatorioInput> = z.object({
  where: z.lazy(() => FeedbackScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FeedbackUpdateManyMutationInputSchema),z.lazy(() => FeedbackUncheckedUpdateManyWithoutRelatorioInputSchema) ]),
}).strict();

export const HistoricoRelatorioUpsertWithWhereUniqueWithoutRelatorioInputSchema: z.ZodType<Prisma.HistoricoRelatorioUpsertWithWhereUniqueWithoutRelatorioInput> = z.object({
  where: z.lazy(() => HistoricoRelatorioWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => HistoricoRelatorioUpdateWithoutRelatorioInputSchema),z.lazy(() => HistoricoRelatorioUncheckedUpdateWithoutRelatorioInputSchema) ]),
  create: z.union([ z.lazy(() => HistoricoRelatorioCreateWithoutRelatorioInputSchema),z.lazy(() => HistoricoRelatorioUncheckedCreateWithoutRelatorioInputSchema) ]),
}).strict();

export const HistoricoRelatorioUpdateWithWhereUniqueWithoutRelatorioInputSchema: z.ZodType<Prisma.HistoricoRelatorioUpdateWithWhereUniqueWithoutRelatorioInput> = z.object({
  where: z.lazy(() => HistoricoRelatorioWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => HistoricoRelatorioUpdateWithoutRelatorioInputSchema),z.lazy(() => HistoricoRelatorioUncheckedUpdateWithoutRelatorioInputSchema) ]),
}).strict();

export const HistoricoRelatorioUpdateManyWithWhereWithoutRelatorioInputSchema: z.ZodType<Prisma.HistoricoRelatorioUpdateManyWithWhereWithoutRelatorioInput> = z.object({
  where: z.lazy(() => HistoricoRelatorioScalarWhereInputSchema),
  data: z.union([ z.lazy(() => HistoricoRelatorioUpdateManyMutationInputSchema),z.lazy(() => HistoricoRelatorioUncheckedUpdateManyWithoutRelatorioInputSchema) ]),
}).strict();

export const HistoricoRelatorioScalarWhereInputSchema: z.ZodType<Prisma.HistoricoRelatorioScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HistoricoRelatorioScalarWhereInputSchema),z.lazy(() => HistoricoRelatorioScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HistoricoRelatorioScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HistoricoRelatorioScalarWhereInputSchema),z.lazy(() => HistoricoRelatorioScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  idRelatorio: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  nomeAnterior: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  textoReflexaoAnterior: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  dataRealizacaoAnterior: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  statusAnterior: z.union([ z.lazy(() => EnumStatusRelatorioNullableFilterSchema),z.lazy(() => StatusRelatorioSchema) ]).optional().nullable(),
  dataAlteracao: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  certificadoAnterior: z.union([ z.lazy(() => BytesNullableFilterSchema),z.instanceof(Buffer) ]).optional().nullable(),
}).strict();

export const ReversaoValidacaoUpsertWithWhereUniqueWithoutRelatorioInputSchema: z.ZodType<Prisma.ReversaoValidacaoUpsertWithWhereUniqueWithoutRelatorioInput> = z.object({
  where: z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReversaoValidacaoUpdateWithoutRelatorioInputSchema),z.lazy(() => ReversaoValidacaoUncheckedUpdateWithoutRelatorioInputSchema) ]),
  create: z.union([ z.lazy(() => ReversaoValidacaoCreateWithoutRelatorioInputSchema),z.lazy(() => ReversaoValidacaoUncheckedCreateWithoutRelatorioInputSchema) ]),
}).strict();

export const ReversaoValidacaoUpdateWithWhereUniqueWithoutRelatorioInputSchema: z.ZodType<Prisma.ReversaoValidacaoUpdateWithWhereUniqueWithoutRelatorioInput> = z.object({
  where: z.lazy(() => ReversaoValidacaoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReversaoValidacaoUpdateWithoutRelatorioInputSchema),z.lazy(() => ReversaoValidacaoUncheckedUpdateWithoutRelatorioInputSchema) ]),
}).strict();

export const ReversaoValidacaoUpdateManyWithWhereWithoutRelatorioInputSchema: z.ZodType<Prisma.ReversaoValidacaoUpdateManyWithWhereWithoutRelatorioInput> = z.object({
  where: z.lazy(() => ReversaoValidacaoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReversaoValidacaoUpdateManyMutationInputSchema),z.lazy(() => ReversaoValidacaoUncheckedUpdateManyWithoutRelatorioInputSchema) ]),
}).strict();

export const FeedbackHistoricoUpsertWithWhereUniqueWithoutRelatorioInputSchema: z.ZodType<Prisma.FeedbackHistoricoUpsertWithWhereUniqueWithoutRelatorioInput> = z.object({
  where: z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FeedbackHistoricoUpdateWithoutRelatorioInputSchema),z.lazy(() => FeedbackHistoricoUncheckedUpdateWithoutRelatorioInputSchema) ]),
  create: z.union([ z.lazy(() => FeedbackHistoricoCreateWithoutRelatorioInputSchema),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutRelatorioInputSchema) ]),
}).strict();

export const FeedbackHistoricoUpdateWithWhereUniqueWithoutRelatorioInputSchema: z.ZodType<Prisma.FeedbackHistoricoUpdateWithWhereUniqueWithoutRelatorioInput> = z.object({
  where: z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FeedbackHistoricoUpdateWithoutRelatorioInputSchema),z.lazy(() => FeedbackHistoricoUncheckedUpdateWithoutRelatorioInputSchema) ]),
}).strict();

export const FeedbackHistoricoUpdateManyWithWhereWithoutRelatorioInputSchema: z.ZodType<Prisma.FeedbackHistoricoUpdateManyWithWhereWithoutRelatorioInput> = z.object({
  where: z.lazy(() => FeedbackHistoricoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FeedbackHistoricoUpdateManyMutationInputSchema),z.lazy(() => FeedbackHistoricoUncheckedUpdateManyWithoutRelatorioInputSchema) ]),
}).strict();

export const ProfessorCreateWithoutFeedbacksInputSchema: z.ZodType<Prisma.ProfessorCreateWithoutFeedbacksInput> = z.object({
  usuario: z.lazy(() => UserCreateNestedOneWithoutProfessorInputSchema),
  professorCursos: z.lazy(() => ProfessorCursoCreateNestedManyWithoutProfessorInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoCreateNestedManyWithoutProfessorInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoCreateNestedManyWithoutProfessorInputSchema).optional()
}).strict();

export const ProfessorUncheckedCreateWithoutFeedbacksInputSchema: z.ZodType<Prisma.ProfessorUncheckedCreateWithoutFeedbacksInput> = z.object({
  idUsuario: z.string(),
  professorCursos: z.lazy(() => ProfessorCursoUncheckedCreateNestedManyWithoutProfessorInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUncheckedCreateNestedManyWithoutProfessorInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUncheckedCreateNestedManyWithoutProfessorInputSchema).optional()
}).strict();

export const ProfessorCreateOrConnectWithoutFeedbacksInputSchema: z.ZodType<Prisma.ProfessorCreateOrConnectWithoutFeedbacksInput> = z.object({
  where: z.lazy(() => ProfessorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfessorCreateWithoutFeedbacksInputSchema),z.lazy(() => ProfessorUncheckedCreateWithoutFeedbacksInputSchema) ]),
}).strict();

export const RelatorioAtividadeCreateWithoutFeedbacksInputSchema: z.ZodType<Prisma.RelatorioAtividadeCreateWithoutFeedbacksInput> = z.object({
  nome: z.string(),
  textoReflexao: z.string(),
  dataRealizacao: z.coerce.date(),
  dataEnvio: z.coerce.date(),
  status: z.lazy(() => StatusRelatorioSchema).optional(),
  horasValidadas: z.number().int(),
  certificado: z.instanceof(Buffer),
  aluno: z.lazy(() => AlunoCreateNestedOneWithoutRelatoriosAtividadesInputSchema),
  categoria: z.lazy(() => CategoriaCreateNestedOneWithoutRelatoriosAtividadesInputSchema),
  historicos: z.lazy(() => HistoricoRelatorioCreateNestedManyWithoutRelatorioInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoCreateNestedManyWithoutRelatorioInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoCreateNestedManyWithoutRelatorioInputSchema).optional()
}).strict();

export const RelatorioAtividadeUncheckedCreateWithoutFeedbacksInputSchema: z.ZodType<Prisma.RelatorioAtividadeUncheckedCreateWithoutFeedbacksInput> = z.object({
  id: z.number().int().optional(),
  nome: z.string(),
  textoReflexao: z.string(),
  dataRealizacao: z.coerce.date(),
  dataEnvio: z.coerce.date(),
  status: z.lazy(() => StatusRelatorioSchema).optional(),
  horasValidadas: z.number().int(),
  certificado: z.instanceof(Buffer),
  idAluno: z.string(),
  idCategoria: z.number().int(),
  historicos: z.lazy(() => HistoricoRelatorioUncheckedCreateNestedManyWithoutRelatorioInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUncheckedCreateNestedManyWithoutRelatorioInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUncheckedCreateNestedManyWithoutRelatorioInputSchema).optional()
}).strict();

export const RelatorioAtividadeCreateOrConnectWithoutFeedbacksInputSchema: z.ZodType<Prisma.RelatorioAtividadeCreateOrConnectWithoutFeedbacksInput> = z.object({
  where: z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutFeedbacksInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutFeedbacksInputSchema) ]),
}).strict();

export const FeedbackHistoricoCreateWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackHistoricoCreateWithoutFeedbackInput> = z.object({
  textoFeedback: z.string(),
  dataEnvio: z.coerce.date().optional(),
  versao: z.number().int().optional().nullable(),
  relatorio: z.lazy(() => RelatorioAtividadeCreateNestedOneWithoutFeedbackHistoricosInputSchema),
  professor: z.lazy(() => ProfessorCreateNestedOneWithoutFeedbackHistoricosInputSchema).optional()
}).strict();

export const FeedbackHistoricoUncheckedCreateWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackHistoricoUncheckedCreateWithoutFeedbackInput> = z.object({
  id: z.number().int().optional(),
  idRelatorio: z.number().int(),
  textoFeedback: z.string(),
  dataEnvio: z.coerce.date().optional(),
  idProfessor: z.string().optional().nullable(),
  versao: z.number().int().optional().nullable()
}).strict();

export const FeedbackHistoricoCreateOrConnectWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackHistoricoCreateOrConnectWithoutFeedbackInput> = z.object({
  where: z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FeedbackHistoricoCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutFeedbackInputSchema) ]),
}).strict();

export const FeedbackHistoricoCreateManyFeedbackInputEnvelopeSchema: z.ZodType<Prisma.FeedbackHistoricoCreateManyFeedbackInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FeedbackHistoricoCreateManyFeedbackInputSchema),z.lazy(() => FeedbackHistoricoCreateManyFeedbackInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProfessorUpsertWithoutFeedbacksInputSchema: z.ZodType<Prisma.ProfessorUpsertWithoutFeedbacksInput> = z.object({
  update: z.union([ z.lazy(() => ProfessorUpdateWithoutFeedbacksInputSchema),z.lazy(() => ProfessorUncheckedUpdateWithoutFeedbacksInputSchema) ]),
  create: z.union([ z.lazy(() => ProfessorCreateWithoutFeedbacksInputSchema),z.lazy(() => ProfessorUncheckedCreateWithoutFeedbacksInputSchema) ]),
  where: z.lazy(() => ProfessorWhereInputSchema).optional()
}).strict();

export const ProfessorUpdateToOneWithWhereWithoutFeedbacksInputSchema: z.ZodType<Prisma.ProfessorUpdateToOneWithWhereWithoutFeedbacksInput> = z.object({
  where: z.lazy(() => ProfessorWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProfessorUpdateWithoutFeedbacksInputSchema),z.lazy(() => ProfessorUncheckedUpdateWithoutFeedbacksInputSchema) ]),
}).strict();

export const ProfessorUpdateWithoutFeedbacksInputSchema: z.ZodType<Prisma.ProfessorUpdateWithoutFeedbacksInput> = z.object({
  usuario: z.lazy(() => UserUpdateOneRequiredWithoutProfessorNestedInputSchema).optional(),
  professorCursos: z.lazy(() => ProfessorCursoUpdateManyWithoutProfessorNestedInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUpdateManyWithoutProfessorNestedInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUpdateManyWithoutProfessorNestedInputSchema).optional()
}).strict();

export const ProfessorUncheckedUpdateWithoutFeedbacksInputSchema: z.ZodType<Prisma.ProfessorUncheckedUpdateWithoutFeedbacksInput> = z.object({
  idUsuario: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  professorCursos: z.lazy(() => ProfessorCursoUncheckedUpdateManyWithoutProfessorNestedInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUncheckedUpdateManyWithoutProfessorNestedInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUncheckedUpdateManyWithoutProfessorNestedInputSchema).optional()
}).strict();

export const RelatorioAtividadeUpsertWithoutFeedbacksInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpsertWithoutFeedbacksInput> = z.object({
  update: z.union([ z.lazy(() => RelatorioAtividadeUpdateWithoutFeedbacksInputSchema),z.lazy(() => RelatorioAtividadeUncheckedUpdateWithoutFeedbacksInputSchema) ]),
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutFeedbacksInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutFeedbacksInputSchema) ]),
  where: z.lazy(() => RelatorioAtividadeWhereInputSchema).optional()
}).strict();

export const RelatorioAtividadeUpdateToOneWithWhereWithoutFeedbacksInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpdateToOneWithWhereWithoutFeedbacksInput> = z.object({
  where: z.lazy(() => RelatorioAtividadeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RelatorioAtividadeUpdateWithoutFeedbacksInputSchema),z.lazy(() => RelatorioAtividadeUncheckedUpdateWithoutFeedbacksInputSchema) ]),
}).strict();

export const RelatorioAtividadeUpdateWithoutFeedbacksInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpdateWithoutFeedbacksInput> = z.object({
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  textoReflexao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataRealizacao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => EnumStatusRelatorioFieldUpdateOperationsInputSchema) ]).optional(),
  horasValidadas: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  certificado: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  aluno: z.lazy(() => AlunoUpdateOneRequiredWithoutRelatoriosAtividadesNestedInputSchema).optional(),
  categoria: z.lazy(() => CategoriaUpdateOneRequiredWithoutRelatoriosAtividadesNestedInputSchema).optional(),
  historicos: z.lazy(() => HistoricoRelatorioUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUpdateManyWithoutRelatorioNestedInputSchema).optional()
}).strict();

export const RelatorioAtividadeUncheckedUpdateWithoutFeedbacksInputSchema: z.ZodType<Prisma.RelatorioAtividadeUncheckedUpdateWithoutFeedbacksInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  textoReflexao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataRealizacao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => EnumStatusRelatorioFieldUpdateOperationsInputSchema) ]).optional(),
  horasValidadas: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  certificado: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  idAluno: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idCategoria: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historicos: z.lazy(() => HistoricoRelatorioUncheckedUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUncheckedUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUncheckedUpdateManyWithoutRelatorioNestedInputSchema).optional()
}).strict();

export const FeedbackHistoricoUpsertWithWhereUniqueWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackHistoricoUpsertWithWhereUniqueWithoutFeedbackInput> = z.object({
  where: z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FeedbackHistoricoUpdateWithoutFeedbackInputSchema),z.lazy(() => FeedbackHistoricoUncheckedUpdateWithoutFeedbackInputSchema) ]),
  create: z.union([ z.lazy(() => FeedbackHistoricoCreateWithoutFeedbackInputSchema),z.lazy(() => FeedbackHistoricoUncheckedCreateWithoutFeedbackInputSchema) ]),
}).strict();

export const FeedbackHistoricoUpdateWithWhereUniqueWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackHistoricoUpdateWithWhereUniqueWithoutFeedbackInput> = z.object({
  where: z.lazy(() => FeedbackHistoricoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FeedbackHistoricoUpdateWithoutFeedbackInputSchema),z.lazy(() => FeedbackHistoricoUncheckedUpdateWithoutFeedbackInputSchema) ]),
}).strict();

export const FeedbackHistoricoUpdateManyWithWhereWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackHistoricoUpdateManyWithWhereWithoutFeedbackInput> = z.object({
  where: z.lazy(() => FeedbackHistoricoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FeedbackHistoricoUpdateManyMutationInputSchema),z.lazy(() => FeedbackHistoricoUncheckedUpdateManyWithoutFeedbackInputSchema) ]),
}).strict();

export const FeedbackCreateWithoutHistoricosInputSchema: z.ZodType<Prisma.FeedbackCreateWithoutHistoricosInput> = z.object({
  textoFeedback: z.string(),
  dataEnvio: z.coerce.date(),
  professor: z.lazy(() => ProfessorCreateNestedOneWithoutFeedbacksInputSchema),
  relatorio: z.lazy(() => RelatorioAtividadeCreateNestedOneWithoutFeedbacksInputSchema)
}).strict();

export const FeedbackUncheckedCreateWithoutHistoricosInputSchema: z.ZodType<Prisma.FeedbackUncheckedCreateWithoutHistoricosInput> = z.object({
  id: z.number().int().optional(),
  textoFeedback: z.string(),
  dataEnvio: z.coerce.date(),
  idProfessor: z.string(),
  idRelatorio: z.number().int()
}).strict();

export const FeedbackCreateOrConnectWithoutHistoricosInputSchema: z.ZodType<Prisma.FeedbackCreateOrConnectWithoutHistoricosInput> = z.object({
  where: z.lazy(() => FeedbackWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FeedbackCreateWithoutHistoricosInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutHistoricosInputSchema) ]),
}).strict();

export const RelatorioAtividadeCreateWithoutFeedbackHistoricosInputSchema: z.ZodType<Prisma.RelatorioAtividadeCreateWithoutFeedbackHistoricosInput> = z.object({
  nome: z.string(),
  textoReflexao: z.string(),
  dataRealizacao: z.coerce.date(),
  dataEnvio: z.coerce.date(),
  status: z.lazy(() => StatusRelatorioSchema).optional(),
  horasValidadas: z.number().int(),
  certificado: z.instanceof(Buffer),
  aluno: z.lazy(() => AlunoCreateNestedOneWithoutRelatoriosAtividadesInputSchema),
  categoria: z.lazy(() => CategoriaCreateNestedOneWithoutRelatoriosAtividadesInputSchema),
  feedbacks: z.lazy(() => FeedbackCreateNestedManyWithoutRelatorioInputSchema).optional(),
  historicos: z.lazy(() => HistoricoRelatorioCreateNestedManyWithoutRelatorioInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoCreateNestedManyWithoutRelatorioInputSchema).optional()
}).strict();

export const RelatorioAtividadeUncheckedCreateWithoutFeedbackHistoricosInputSchema: z.ZodType<Prisma.RelatorioAtividadeUncheckedCreateWithoutFeedbackHistoricosInput> = z.object({
  id: z.number().int().optional(),
  nome: z.string(),
  textoReflexao: z.string(),
  dataRealizacao: z.coerce.date(),
  dataEnvio: z.coerce.date(),
  status: z.lazy(() => StatusRelatorioSchema).optional(),
  horasValidadas: z.number().int(),
  certificado: z.instanceof(Buffer),
  idAluno: z.string(),
  idCategoria: z.number().int(),
  feedbacks: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutRelatorioInputSchema).optional(),
  historicos: z.lazy(() => HistoricoRelatorioUncheckedCreateNestedManyWithoutRelatorioInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUncheckedCreateNestedManyWithoutRelatorioInputSchema).optional()
}).strict();

export const RelatorioAtividadeCreateOrConnectWithoutFeedbackHistoricosInputSchema: z.ZodType<Prisma.RelatorioAtividadeCreateOrConnectWithoutFeedbackHistoricosInput> = z.object({
  where: z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutFeedbackHistoricosInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutFeedbackHistoricosInputSchema) ]),
}).strict();

export const ProfessorCreateWithoutFeedbackHistoricosInputSchema: z.ZodType<Prisma.ProfessorCreateWithoutFeedbackHistoricosInput> = z.object({
  usuario: z.lazy(() => UserCreateNestedOneWithoutProfessorInputSchema),
  professorCursos: z.lazy(() => ProfessorCursoCreateNestedManyWithoutProfessorInputSchema).optional(),
  feedbacks: z.lazy(() => FeedbackCreateNestedManyWithoutProfessorInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoCreateNestedManyWithoutProfessorInputSchema).optional()
}).strict();

export const ProfessorUncheckedCreateWithoutFeedbackHistoricosInputSchema: z.ZodType<Prisma.ProfessorUncheckedCreateWithoutFeedbackHistoricosInput> = z.object({
  idUsuario: z.string(),
  professorCursos: z.lazy(() => ProfessorCursoUncheckedCreateNestedManyWithoutProfessorInputSchema).optional(),
  feedbacks: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutProfessorInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUncheckedCreateNestedManyWithoutProfessorInputSchema).optional()
}).strict();

export const ProfessorCreateOrConnectWithoutFeedbackHistoricosInputSchema: z.ZodType<Prisma.ProfessorCreateOrConnectWithoutFeedbackHistoricosInput> = z.object({
  where: z.lazy(() => ProfessorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfessorCreateWithoutFeedbackHistoricosInputSchema),z.lazy(() => ProfessorUncheckedCreateWithoutFeedbackHistoricosInputSchema) ]),
}).strict();

export const FeedbackUpsertWithoutHistoricosInputSchema: z.ZodType<Prisma.FeedbackUpsertWithoutHistoricosInput> = z.object({
  update: z.union([ z.lazy(() => FeedbackUpdateWithoutHistoricosInputSchema),z.lazy(() => FeedbackUncheckedUpdateWithoutHistoricosInputSchema) ]),
  create: z.union([ z.lazy(() => FeedbackCreateWithoutHistoricosInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutHistoricosInputSchema) ]),
  where: z.lazy(() => FeedbackWhereInputSchema).optional()
}).strict();

export const FeedbackUpdateToOneWithWhereWithoutHistoricosInputSchema: z.ZodType<Prisma.FeedbackUpdateToOneWithWhereWithoutHistoricosInput> = z.object({
  where: z.lazy(() => FeedbackWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => FeedbackUpdateWithoutHistoricosInputSchema),z.lazy(() => FeedbackUncheckedUpdateWithoutHistoricosInputSchema) ]),
}).strict();

export const FeedbackUpdateWithoutHistoricosInputSchema: z.ZodType<Prisma.FeedbackUpdateWithoutHistoricosInput> = z.object({
  textoFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  professor: z.lazy(() => ProfessorUpdateOneRequiredWithoutFeedbacksNestedInputSchema).optional(),
  relatorio: z.lazy(() => RelatorioAtividadeUpdateOneRequiredWithoutFeedbacksNestedInputSchema).optional()
}).strict();

export const FeedbackUncheckedUpdateWithoutHistoricosInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateWithoutHistoricosInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  textoFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  idProfessor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idRelatorio: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RelatorioAtividadeUpsertWithoutFeedbackHistoricosInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpsertWithoutFeedbackHistoricosInput> = z.object({
  update: z.union([ z.lazy(() => RelatorioAtividadeUpdateWithoutFeedbackHistoricosInputSchema),z.lazy(() => RelatorioAtividadeUncheckedUpdateWithoutFeedbackHistoricosInputSchema) ]),
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutFeedbackHistoricosInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutFeedbackHistoricosInputSchema) ]),
  where: z.lazy(() => RelatorioAtividadeWhereInputSchema).optional()
}).strict();

export const RelatorioAtividadeUpdateToOneWithWhereWithoutFeedbackHistoricosInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpdateToOneWithWhereWithoutFeedbackHistoricosInput> = z.object({
  where: z.lazy(() => RelatorioAtividadeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RelatorioAtividadeUpdateWithoutFeedbackHistoricosInputSchema),z.lazy(() => RelatorioAtividadeUncheckedUpdateWithoutFeedbackHistoricosInputSchema) ]),
}).strict();

export const RelatorioAtividadeUpdateWithoutFeedbackHistoricosInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpdateWithoutFeedbackHistoricosInput> = z.object({
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  textoReflexao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataRealizacao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => EnumStatusRelatorioFieldUpdateOperationsInputSchema) ]).optional(),
  horasValidadas: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  certificado: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  aluno: z.lazy(() => AlunoUpdateOneRequiredWithoutRelatoriosAtividadesNestedInputSchema).optional(),
  categoria: z.lazy(() => CategoriaUpdateOneRequiredWithoutRelatoriosAtividadesNestedInputSchema).optional(),
  feedbacks: z.lazy(() => FeedbackUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  historicos: z.lazy(() => HistoricoRelatorioUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUpdateManyWithoutRelatorioNestedInputSchema).optional()
}).strict();

export const RelatorioAtividadeUncheckedUpdateWithoutFeedbackHistoricosInputSchema: z.ZodType<Prisma.RelatorioAtividadeUncheckedUpdateWithoutFeedbackHistoricosInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  textoReflexao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataRealizacao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => EnumStatusRelatorioFieldUpdateOperationsInputSchema) ]).optional(),
  horasValidadas: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  certificado: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  idAluno: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idCategoria: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  feedbacks: z.lazy(() => FeedbackUncheckedUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  historicos: z.lazy(() => HistoricoRelatorioUncheckedUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUncheckedUpdateManyWithoutRelatorioNestedInputSchema).optional()
}).strict();

export const ProfessorUpsertWithoutFeedbackHistoricosInputSchema: z.ZodType<Prisma.ProfessorUpsertWithoutFeedbackHistoricosInput> = z.object({
  update: z.union([ z.lazy(() => ProfessorUpdateWithoutFeedbackHistoricosInputSchema),z.lazy(() => ProfessorUncheckedUpdateWithoutFeedbackHistoricosInputSchema) ]),
  create: z.union([ z.lazy(() => ProfessorCreateWithoutFeedbackHistoricosInputSchema),z.lazy(() => ProfessorUncheckedCreateWithoutFeedbackHistoricosInputSchema) ]),
  where: z.lazy(() => ProfessorWhereInputSchema).optional()
}).strict();

export const ProfessorUpdateToOneWithWhereWithoutFeedbackHistoricosInputSchema: z.ZodType<Prisma.ProfessorUpdateToOneWithWhereWithoutFeedbackHistoricosInput> = z.object({
  where: z.lazy(() => ProfessorWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProfessorUpdateWithoutFeedbackHistoricosInputSchema),z.lazy(() => ProfessorUncheckedUpdateWithoutFeedbackHistoricosInputSchema) ]),
}).strict();

export const ProfessorUpdateWithoutFeedbackHistoricosInputSchema: z.ZodType<Prisma.ProfessorUpdateWithoutFeedbackHistoricosInput> = z.object({
  usuario: z.lazy(() => UserUpdateOneRequiredWithoutProfessorNestedInputSchema).optional(),
  professorCursos: z.lazy(() => ProfessorCursoUpdateManyWithoutProfessorNestedInputSchema).optional(),
  feedbacks: z.lazy(() => FeedbackUpdateManyWithoutProfessorNestedInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUpdateManyWithoutProfessorNestedInputSchema).optional()
}).strict();

export const ProfessorUncheckedUpdateWithoutFeedbackHistoricosInputSchema: z.ZodType<Prisma.ProfessorUncheckedUpdateWithoutFeedbackHistoricosInput> = z.object({
  idUsuario: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  professorCursos: z.lazy(() => ProfessorCursoUncheckedUpdateManyWithoutProfessorNestedInputSchema).optional(),
  feedbacks: z.lazy(() => FeedbackUncheckedUpdateManyWithoutProfessorNestedInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUncheckedUpdateManyWithoutProfessorNestedInputSchema).optional()
}).strict();

export const RelatorioAtividadeCreateWithoutHistoricosInputSchema: z.ZodType<Prisma.RelatorioAtividadeCreateWithoutHistoricosInput> = z.object({
  nome: z.string(),
  textoReflexao: z.string(),
  dataRealizacao: z.coerce.date(),
  dataEnvio: z.coerce.date(),
  status: z.lazy(() => StatusRelatorioSchema).optional(),
  horasValidadas: z.number().int(),
  certificado: z.instanceof(Buffer),
  aluno: z.lazy(() => AlunoCreateNestedOneWithoutRelatoriosAtividadesInputSchema),
  categoria: z.lazy(() => CategoriaCreateNestedOneWithoutRelatoriosAtividadesInputSchema),
  feedbacks: z.lazy(() => FeedbackCreateNestedManyWithoutRelatorioInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoCreateNestedManyWithoutRelatorioInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoCreateNestedManyWithoutRelatorioInputSchema).optional()
}).strict();

export const RelatorioAtividadeUncheckedCreateWithoutHistoricosInputSchema: z.ZodType<Prisma.RelatorioAtividadeUncheckedCreateWithoutHistoricosInput> = z.object({
  id: z.number().int().optional(),
  nome: z.string(),
  textoReflexao: z.string(),
  dataRealizacao: z.coerce.date(),
  dataEnvio: z.coerce.date(),
  status: z.lazy(() => StatusRelatorioSchema).optional(),
  horasValidadas: z.number().int(),
  certificado: z.instanceof(Buffer),
  idAluno: z.string(),
  idCategoria: z.number().int(),
  feedbacks: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutRelatorioInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUncheckedCreateNestedManyWithoutRelatorioInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUncheckedCreateNestedManyWithoutRelatorioInputSchema).optional()
}).strict();

export const RelatorioAtividadeCreateOrConnectWithoutHistoricosInputSchema: z.ZodType<Prisma.RelatorioAtividadeCreateOrConnectWithoutHistoricosInput> = z.object({
  where: z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutHistoricosInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutHistoricosInputSchema) ]),
}).strict();

export const RelatorioAtividadeUpsertWithoutHistoricosInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpsertWithoutHistoricosInput> = z.object({
  update: z.union([ z.lazy(() => RelatorioAtividadeUpdateWithoutHistoricosInputSchema),z.lazy(() => RelatorioAtividadeUncheckedUpdateWithoutHistoricosInputSchema) ]),
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutHistoricosInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutHistoricosInputSchema) ]),
  where: z.lazy(() => RelatorioAtividadeWhereInputSchema).optional()
}).strict();

export const RelatorioAtividadeUpdateToOneWithWhereWithoutHistoricosInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpdateToOneWithWhereWithoutHistoricosInput> = z.object({
  where: z.lazy(() => RelatorioAtividadeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RelatorioAtividadeUpdateWithoutHistoricosInputSchema),z.lazy(() => RelatorioAtividadeUncheckedUpdateWithoutHistoricosInputSchema) ]),
}).strict();

export const RelatorioAtividadeUpdateWithoutHistoricosInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpdateWithoutHistoricosInput> = z.object({
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  textoReflexao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataRealizacao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => EnumStatusRelatorioFieldUpdateOperationsInputSchema) ]).optional(),
  horasValidadas: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  certificado: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  aluno: z.lazy(() => AlunoUpdateOneRequiredWithoutRelatoriosAtividadesNestedInputSchema).optional(),
  categoria: z.lazy(() => CategoriaUpdateOneRequiredWithoutRelatoriosAtividadesNestedInputSchema).optional(),
  feedbacks: z.lazy(() => FeedbackUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUpdateManyWithoutRelatorioNestedInputSchema).optional()
}).strict();

export const RelatorioAtividadeUncheckedUpdateWithoutHistoricosInputSchema: z.ZodType<Prisma.RelatorioAtividadeUncheckedUpdateWithoutHistoricosInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  textoReflexao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataRealizacao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => EnumStatusRelatorioFieldUpdateOperationsInputSchema) ]).optional(),
  horasValidadas: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  certificado: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  idAluno: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idCategoria: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  feedbacks: z.lazy(() => FeedbackUncheckedUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUncheckedUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUncheckedUpdateManyWithoutRelatorioNestedInputSchema).optional()
}).strict();

export const RelatorioAtividadeCreateWithoutReversoesValidacaoInputSchema: z.ZodType<Prisma.RelatorioAtividadeCreateWithoutReversoesValidacaoInput> = z.object({
  nome: z.string(),
  textoReflexao: z.string(),
  dataRealizacao: z.coerce.date(),
  dataEnvio: z.coerce.date(),
  status: z.lazy(() => StatusRelatorioSchema).optional(),
  horasValidadas: z.number().int(),
  certificado: z.instanceof(Buffer),
  aluno: z.lazy(() => AlunoCreateNestedOneWithoutRelatoriosAtividadesInputSchema),
  categoria: z.lazy(() => CategoriaCreateNestedOneWithoutRelatoriosAtividadesInputSchema),
  feedbacks: z.lazy(() => FeedbackCreateNestedManyWithoutRelatorioInputSchema).optional(),
  historicos: z.lazy(() => HistoricoRelatorioCreateNestedManyWithoutRelatorioInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoCreateNestedManyWithoutRelatorioInputSchema).optional()
}).strict();

export const RelatorioAtividadeUncheckedCreateWithoutReversoesValidacaoInputSchema: z.ZodType<Prisma.RelatorioAtividadeUncheckedCreateWithoutReversoesValidacaoInput> = z.object({
  id: z.number().int().optional(),
  nome: z.string(),
  textoReflexao: z.string(),
  dataRealizacao: z.coerce.date(),
  dataEnvio: z.coerce.date(),
  status: z.lazy(() => StatusRelatorioSchema).optional(),
  horasValidadas: z.number().int(),
  certificado: z.instanceof(Buffer),
  idAluno: z.string(),
  idCategoria: z.number().int(),
  feedbacks: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutRelatorioInputSchema).optional(),
  historicos: z.lazy(() => HistoricoRelatorioUncheckedCreateNestedManyWithoutRelatorioInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUncheckedCreateNestedManyWithoutRelatorioInputSchema).optional()
}).strict();

export const RelatorioAtividadeCreateOrConnectWithoutReversoesValidacaoInputSchema: z.ZodType<Prisma.RelatorioAtividadeCreateOrConnectWithoutReversoesValidacaoInput> = z.object({
  where: z.lazy(() => RelatorioAtividadeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutReversoesValidacaoInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutReversoesValidacaoInputSchema) ]),
}).strict();

export const ProfessorCreateWithoutReversoesValidacaoInputSchema: z.ZodType<Prisma.ProfessorCreateWithoutReversoesValidacaoInput> = z.object({
  usuario: z.lazy(() => UserCreateNestedOneWithoutProfessorInputSchema),
  professorCursos: z.lazy(() => ProfessorCursoCreateNestedManyWithoutProfessorInputSchema).optional(),
  feedbacks: z.lazy(() => FeedbackCreateNestedManyWithoutProfessorInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoCreateNestedManyWithoutProfessorInputSchema).optional()
}).strict();

export const ProfessorUncheckedCreateWithoutReversoesValidacaoInputSchema: z.ZodType<Prisma.ProfessorUncheckedCreateWithoutReversoesValidacaoInput> = z.object({
  idUsuario: z.string(),
  professorCursos: z.lazy(() => ProfessorCursoUncheckedCreateNestedManyWithoutProfessorInputSchema).optional(),
  feedbacks: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutProfessorInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUncheckedCreateNestedManyWithoutProfessorInputSchema).optional()
}).strict();

export const ProfessorCreateOrConnectWithoutReversoesValidacaoInputSchema: z.ZodType<Prisma.ProfessorCreateOrConnectWithoutReversoesValidacaoInput> = z.object({
  where: z.lazy(() => ProfessorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfessorCreateWithoutReversoesValidacaoInputSchema),z.lazy(() => ProfessorUncheckedCreateWithoutReversoesValidacaoInputSchema) ]),
}).strict();

export const RelatorioAtividadeUpsertWithoutReversoesValidacaoInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpsertWithoutReversoesValidacaoInput> = z.object({
  update: z.union([ z.lazy(() => RelatorioAtividadeUpdateWithoutReversoesValidacaoInputSchema),z.lazy(() => RelatorioAtividadeUncheckedUpdateWithoutReversoesValidacaoInputSchema) ]),
  create: z.union([ z.lazy(() => RelatorioAtividadeCreateWithoutReversoesValidacaoInputSchema),z.lazy(() => RelatorioAtividadeUncheckedCreateWithoutReversoesValidacaoInputSchema) ]),
  where: z.lazy(() => RelatorioAtividadeWhereInputSchema).optional()
}).strict();

export const RelatorioAtividadeUpdateToOneWithWhereWithoutReversoesValidacaoInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpdateToOneWithWhereWithoutReversoesValidacaoInput> = z.object({
  where: z.lazy(() => RelatorioAtividadeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RelatorioAtividadeUpdateWithoutReversoesValidacaoInputSchema),z.lazy(() => RelatorioAtividadeUncheckedUpdateWithoutReversoesValidacaoInputSchema) ]),
}).strict();

export const RelatorioAtividadeUpdateWithoutReversoesValidacaoInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpdateWithoutReversoesValidacaoInput> = z.object({
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  textoReflexao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataRealizacao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => EnumStatusRelatorioFieldUpdateOperationsInputSchema) ]).optional(),
  horasValidadas: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  certificado: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  aluno: z.lazy(() => AlunoUpdateOneRequiredWithoutRelatoriosAtividadesNestedInputSchema).optional(),
  categoria: z.lazy(() => CategoriaUpdateOneRequiredWithoutRelatoriosAtividadesNestedInputSchema).optional(),
  feedbacks: z.lazy(() => FeedbackUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  historicos: z.lazy(() => HistoricoRelatorioUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUpdateManyWithoutRelatorioNestedInputSchema).optional()
}).strict();

export const RelatorioAtividadeUncheckedUpdateWithoutReversoesValidacaoInputSchema: z.ZodType<Prisma.RelatorioAtividadeUncheckedUpdateWithoutReversoesValidacaoInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  textoReflexao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataRealizacao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => EnumStatusRelatorioFieldUpdateOperationsInputSchema) ]).optional(),
  horasValidadas: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  certificado: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  idAluno: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idCategoria: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  feedbacks: z.lazy(() => FeedbackUncheckedUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  historicos: z.lazy(() => HistoricoRelatorioUncheckedUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUncheckedUpdateManyWithoutRelatorioNestedInputSchema).optional()
}).strict();

export const ProfessorUpsertWithoutReversoesValidacaoInputSchema: z.ZodType<Prisma.ProfessorUpsertWithoutReversoesValidacaoInput> = z.object({
  update: z.union([ z.lazy(() => ProfessorUpdateWithoutReversoesValidacaoInputSchema),z.lazy(() => ProfessorUncheckedUpdateWithoutReversoesValidacaoInputSchema) ]),
  create: z.union([ z.lazy(() => ProfessorCreateWithoutReversoesValidacaoInputSchema),z.lazy(() => ProfessorUncheckedCreateWithoutReversoesValidacaoInputSchema) ]),
  where: z.lazy(() => ProfessorWhereInputSchema).optional()
}).strict();

export const ProfessorUpdateToOneWithWhereWithoutReversoesValidacaoInputSchema: z.ZodType<Prisma.ProfessorUpdateToOneWithWhereWithoutReversoesValidacaoInput> = z.object({
  where: z.lazy(() => ProfessorWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProfessorUpdateWithoutReversoesValidacaoInputSchema),z.lazy(() => ProfessorUncheckedUpdateWithoutReversoesValidacaoInputSchema) ]),
}).strict();

export const ProfessorUpdateWithoutReversoesValidacaoInputSchema: z.ZodType<Prisma.ProfessorUpdateWithoutReversoesValidacaoInput> = z.object({
  usuario: z.lazy(() => UserUpdateOneRequiredWithoutProfessorNestedInputSchema).optional(),
  professorCursos: z.lazy(() => ProfessorCursoUpdateManyWithoutProfessorNestedInputSchema).optional(),
  feedbacks: z.lazy(() => FeedbackUpdateManyWithoutProfessorNestedInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUpdateManyWithoutProfessorNestedInputSchema).optional()
}).strict();

export const ProfessorUncheckedUpdateWithoutReversoesValidacaoInputSchema: z.ZodType<Prisma.ProfessorUncheckedUpdateWithoutReversoesValidacaoInput> = z.object({
  idUsuario: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  professorCursos: z.lazy(() => ProfessorCursoUncheckedUpdateManyWithoutProfessorNestedInputSchema).optional(),
  feedbacks: z.lazy(() => FeedbackUncheckedUpdateManyWithoutProfessorNestedInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUncheckedUpdateManyWithoutProfessorNestedInputSchema).optional()
}).strict();

export const ProfessorCreateWithoutProfessorCursosInputSchema: z.ZodType<Prisma.ProfessorCreateWithoutProfessorCursosInput> = z.object({
  usuario: z.lazy(() => UserCreateNestedOneWithoutProfessorInputSchema),
  feedbacks: z.lazy(() => FeedbackCreateNestedManyWithoutProfessorInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoCreateNestedManyWithoutProfessorInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoCreateNestedManyWithoutProfessorInputSchema).optional()
}).strict();

export const ProfessorUncheckedCreateWithoutProfessorCursosInputSchema: z.ZodType<Prisma.ProfessorUncheckedCreateWithoutProfessorCursosInput> = z.object({
  idUsuario: z.string(),
  feedbacks: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutProfessorInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUncheckedCreateNestedManyWithoutProfessorInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUncheckedCreateNestedManyWithoutProfessorInputSchema).optional()
}).strict();

export const ProfessorCreateOrConnectWithoutProfessorCursosInputSchema: z.ZodType<Prisma.ProfessorCreateOrConnectWithoutProfessorCursosInput> = z.object({
  where: z.lazy(() => ProfessorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfessorCreateWithoutProfessorCursosInputSchema),z.lazy(() => ProfessorUncheckedCreateWithoutProfessorCursosInputSchema) ]),
}).strict();

export const CursoCreateWithoutProfessorCursosInputSchema: z.ZodType<Prisma.CursoCreateWithoutProfessorCursosInput> = z.object({
  nome: z.string(),
  alunos: z.lazy(() => AlunoCreateNestedManyWithoutCursoInputSchema).optional(),
  categorias: z.lazy(() => CategoriaCreateNestedManyWithoutCursoInputSchema).optional(),
  coordenadorCursos: z.lazy(() => CoordenadorCreateNestedManyWithoutCursoResponsavelInputSchema).optional()
}).strict();

export const CursoUncheckedCreateWithoutProfessorCursosInputSchema: z.ZodType<Prisma.CursoUncheckedCreateWithoutProfessorCursosInput> = z.object({
  id: z.number().int().optional(),
  nome: z.string(),
  alunos: z.lazy(() => AlunoUncheckedCreateNestedManyWithoutCursoInputSchema).optional(),
  categorias: z.lazy(() => CategoriaUncheckedCreateNestedManyWithoutCursoInputSchema).optional(),
  coordenadorCursos: z.lazy(() => CoordenadorUncheckedCreateNestedManyWithoutCursoResponsavelInputSchema).optional()
}).strict();

export const CursoCreateOrConnectWithoutProfessorCursosInputSchema: z.ZodType<Prisma.CursoCreateOrConnectWithoutProfessorCursosInput> = z.object({
  where: z.lazy(() => CursoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CursoCreateWithoutProfessorCursosInputSchema),z.lazy(() => CursoUncheckedCreateWithoutProfessorCursosInputSchema) ]),
}).strict();

export const ProfessorUpsertWithoutProfessorCursosInputSchema: z.ZodType<Prisma.ProfessorUpsertWithoutProfessorCursosInput> = z.object({
  update: z.union([ z.lazy(() => ProfessorUpdateWithoutProfessorCursosInputSchema),z.lazy(() => ProfessorUncheckedUpdateWithoutProfessorCursosInputSchema) ]),
  create: z.union([ z.lazy(() => ProfessorCreateWithoutProfessorCursosInputSchema),z.lazy(() => ProfessorUncheckedCreateWithoutProfessorCursosInputSchema) ]),
  where: z.lazy(() => ProfessorWhereInputSchema).optional()
}).strict();

export const ProfessorUpdateToOneWithWhereWithoutProfessorCursosInputSchema: z.ZodType<Prisma.ProfessorUpdateToOneWithWhereWithoutProfessorCursosInput> = z.object({
  where: z.lazy(() => ProfessorWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProfessorUpdateWithoutProfessorCursosInputSchema),z.lazy(() => ProfessorUncheckedUpdateWithoutProfessorCursosInputSchema) ]),
}).strict();

export const ProfessorUpdateWithoutProfessorCursosInputSchema: z.ZodType<Prisma.ProfessorUpdateWithoutProfessorCursosInput> = z.object({
  usuario: z.lazy(() => UserUpdateOneRequiredWithoutProfessorNestedInputSchema).optional(),
  feedbacks: z.lazy(() => FeedbackUpdateManyWithoutProfessorNestedInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUpdateManyWithoutProfessorNestedInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUpdateManyWithoutProfessorNestedInputSchema).optional()
}).strict();

export const ProfessorUncheckedUpdateWithoutProfessorCursosInputSchema: z.ZodType<Prisma.ProfessorUncheckedUpdateWithoutProfessorCursosInput> = z.object({
  idUsuario: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feedbacks: z.lazy(() => FeedbackUncheckedUpdateManyWithoutProfessorNestedInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUncheckedUpdateManyWithoutProfessorNestedInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUncheckedUpdateManyWithoutProfessorNestedInputSchema).optional()
}).strict();

export const CursoUpsertWithoutProfessorCursosInputSchema: z.ZodType<Prisma.CursoUpsertWithoutProfessorCursosInput> = z.object({
  update: z.union([ z.lazy(() => CursoUpdateWithoutProfessorCursosInputSchema),z.lazy(() => CursoUncheckedUpdateWithoutProfessorCursosInputSchema) ]),
  create: z.union([ z.lazy(() => CursoCreateWithoutProfessorCursosInputSchema),z.lazy(() => CursoUncheckedCreateWithoutProfessorCursosInputSchema) ]),
  where: z.lazy(() => CursoWhereInputSchema).optional()
}).strict();

export const CursoUpdateToOneWithWhereWithoutProfessorCursosInputSchema: z.ZodType<Prisma.CursoUpdateToOneWithWhereWithoutProfessorCursosInput> = z.object({
  where: z.lazy(() => CursoWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CursoUpdateWithoutProfessorCursosInputSchema),z.lazy(() => CursoUncheckedUpdateWithoutProfessorCursosInputSchema) ]),
}).strict();

export const CursoUpdateWithoutProfessorCursosInputSchema: z.ZodType<Prisma.CursoUpdateWithoutProfessorCursosInput> = z.object({
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alunos: z.lazy(() => AlunoUpdateManyWithoutCursoNestedInputSchema).optional(),
  categorias: z.lazy(() => CategoriaUpdateManyWithoutCursoNestedInputSchema).optional(),
  coordenadorCursos: z.lazy(() => CoordenadorUpdateManyWithoutCursoResponsavelNestedInputSchema).optional()
}).strict();

export const CursoUncheckedUpdateWithoutProfessorCursosInputSchema: z.ZodType<Prisma.CursoUncheckedUpdateWithoutProfessorCursosInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alunos: z.lazy(() => AlunoUncheckedUpdateManyWithoutCursoNestedInputSchema).optional(),
  categorias: z.lazy(() => CategoriaUncheckedUpdateManyWithoutCursoNestedInputSchema).optional(),
  coordenadorCursos: z.lazy(() => CoordenadorUncheckedUpdateManyWithoutCursoResponsavelNestedInputSchema).optional()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable()
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AlunoCreateManyCursoInputSchema: z.ZodType<Prisma.AlunoCreateManyCursoInput> = z.object({
  idUsuario: z.string(),
  matricula: z.number().int()
}).strict();

export const CategoriaCreateManyCursoInputSchema: z.ZodType<Prisma.CategoriaCreateManyCursoInput> = z.object({
  id: z.number().int().optional(),
  nome: z.string(),
  descricao: z.string(),
  cargaHoraria: z.number().int()
}).strict();

export const ProfessorCursoCreateManyCursoInputSchema: z.ZodType<Prisma.ProfessorCursoCreateManyCursoInput> = z.object({
  idProfessor: z.string()
}).strict();

export const CoordenadorCreateManyCursoResponsavelInputSchema: z.ZodType<Prisma.CoordenadorCreateManyCursoResponsavelInput> = z.object({
  idUsuario: z.string()
}).strict();

export const AlunoUpdateWithoutCursoInputSchema: z.ZodType<Prisma.AlunoUpdateWithoutCursoInput> = z.object({
  matricula: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  usuario: z.lazy(() => UserUpdateOneRequiredWithoutAlunoNestedInputSchema).optional(),
  relatoriosAtividades: z.lazy(() => RelatorioAtividadeUpdateManyWithoutAlunoNestedInputSchema).optional()
}).strict();

export const AlunoUncheckedUpdateWithoutCursoInputSchema: z.ZodType<Prisma.AlunoUncheckedUpdateWithoutCursoInput> = z.object({
  idUsuario: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  matricula: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  relatoriosAtividades: z.lazy(() => RelatorioAtividadeUncheckedUpdateManyWithoutAlunoNestedInputSchema).optional()
}).strict();

export const AlunoUncheckedUpdateManyWithoutCursoInputSchema: z.ZodType<Prisma.AlunoUncheckedUpdateManyWithoutCursoInput> = z.object({
  idUsuario: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  matricula: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoriaUpdateWithoutCursoInputSchema: z.ZodType<Prisma.CategoriaUpdateWithoutCursoInput> = z.object({
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cargaHoraria: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  relatoriosAtividades: z.lazy(() => RelatorioAtividadeUpdateManyWithoutCategoriaNestedInputSchema).optional()
}).strict();

export const CategoriaUncheckedUpdateWithoutCursoInputSchema: z.ZodType<Prisma.CategoriaUncheckedUpdateWithoutCursoInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cargaHoraria: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  relatoriosAtividades: z.lazy(() => RelatorioAtividadeUncheckedUpdateManyWithoutCategoriaNestedInputSchema).optional()
}).strict();

export const CategoriaUncheckedUpdateManyWithoutCursoInputSchema: z.ZodType<Prisma.CategoriaUncheckedUpdateManyWithoutCursoInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  descricao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cargaHoraria: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfessorCursoUpdateWithoutCursoInputSchema: z.ZodType<Prisma.ProfessorCursoUpdateWithoutCursoInput> = z.object({
  professor: z.lazy(() => ProfessorUpdateOneRequiredWithoutProfessorCursosNestedInputSchema).optional()
}).strict();

export const ProfessorCursoUncheckedUpdateWithoutCursoInputSchema: z.ZodType<Prisma.ProfessorCursoUncheckedUpdateWithoutCursoInput> = z.object({
  idProfessor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfessorCursoUncheckedUpdateManyWithoutCursoInputSchema: z.ZodType<Prisma.ProfessorCursoUncheckedUpdateManyWithoutCursoInput> = z.object({
  idProfessor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CoordenadorUpdateWithoutCursoResponsavelInputSchema: z.ZodType<Prisma.CoordenadorUpdateWithoutCursoResponsavelInput> = z.object({
  usuario: z.lazy(() => UserUpdateOneRequiredWithoutCoordenadorNestedInputSchema).optional()
}).strict();

export const CoordenadorUncheckedUpdateWithoutCursoResponsavelInputSchema: z.ZodType<Prisma.CoordenadorUncheckedUpdateWithoutCursoResponsavelInput> = z.object({
  idUsuario: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CoordenadorUncheckedUpdateManyWithoutCursoResponsavelInputSchema: z.ZodType<Prisma.CoordenadorUncheckedUpdateManyWithoutCursoResponsavelInput> = z.object({
  idUsuario: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RelatorioAtividadeCreateManyAlunoInputSchema: z.ZodType<Prisma.RelatorioAtividadeCreateManyAlunoInput> = z.object({
  id: z.number().int().optional(),
  nome: z.string(),
  textoReflexao: z.string(),
  dataRealizacao: z.coerce.date(),
  dataEnvio: z.coerce.date(),
  status: z.lazy(() => StatusRelatorioSchema).optional(),
  horasValidadas: z.number().int(),
  certificado: z.instanceof(Buffer),
  idCategoria: z.number().int()
}).strict();

export const RelatorioAtividadeUpdateWithoutAlunoInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpdateWithoutAlunoInput> = z.object({
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  textoReflexao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataRealizacao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => EnumStatusRelatorioFieldUpdateOperationsInputSchema) ]).optional(),
  horasValidadas: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  certificado: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  categoria: z.lazy(() => CategoriaUpdateOneRequiredWithoutRelatoriosAtividadesNestedInputSchema).optional(),
  feedbacks: z.lazy(() => FeedbackUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  historicos: z.lazy(() => HistoricoRelatorioUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUpdateManyWithoutRelatorioNestedInputSchema).optional()
}).strict();

export const RelatorioAtividadeUncheckedUpdateWithoutAlunoInputSchema: z.ZodType<Prisma.RelatorioAtividadeUncheckedUpdateWithoutAlunoInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  textoReflexao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataRealizacao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => EnumStatusRelatorioFieldUpdateOperationsInputSchema) ]).optional(),
  horasValidadas: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  certificado: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  idCategoria: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  feedbacks: z.lazy(() => FeedbackUncheckedUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  historicos: z.lazy(() => HistoricoRelatorioUncheckedUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUncheckedUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUncheckedUpdateManyWithoutRelatorioNestedInputSchema).optional()
}).strict();

export const RelatorioAtividadeUncheckedUpdateManyWithoutAlunoInputSchema: z.ZodType<Prisma.RelatorioAtividadeUncheckedUpdateManyWithoutAlunoInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  textoReflexao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataRealizacao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => EnumStatusRelatorioFieldUpdateOperationsInputSchema) ]).optional(),
  horasValidadas: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  certificado: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  idCategoria: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfessorCursoCreateManyProfessorInputSchema: z.ZodType<Prisma.ProfessorCursoCreateManyProfessorInput> = z.object({
  idCurso: z.number().int()
}).strict();

export const FeedbackCreateManyProfessorInputSchema: z.ZodType<Prisma.FeedbackCreateManyProfessorInput> = z.object({
  id: z.number().int().optional(),
  textoFeedback: z.string(),
  dataEnvio: z.coerce.date(),
  idRelatorio: z.number().int()
}).strict();

export const ReversaoValidacaoCreateManyProfessorInputSchema: z.ZodType<Prisma.ReversaoValidacaoCreateManyProfessorInput> = z.object({
  id: z.number().int().optional(),
  idRelatorio: z.number().int(),
  justificativa: z.string(),
  dataReversao: z.coerce.date().optional()
}).strict();

export const FeedbackHistoricoCreateManyProfessorInputSchema: z.ZodType<Prisma.FeedbackHistoricoCreateManyProfessorInput> = z.object({
  id: z.number().int().optional(),
  idFeedback: z.number().int().optional().nullable(),
  idRelatorio: z.number().int(),
  textoFeedback: z.string(),
  dataEnvio: z.coerce.date().optional(),
  versao: z.number().int().optional().nullable()
}).strict();

export const ProfessorCursoUpdateWithoutProfessorInputSchema: z.ZodType<Prisma.ProfessorCursoUpdateWithoutProfessorInput> = z.object({
  curso: z.lazy(() => CursoUpdateOneRequiredWithoutProfessorCursosNestedInputSchema).optional()
}).strict();

export const ProfessorCursoUncheckedUpdateWithoutProfessorInputSchema: z.ZodType<Prisma.ProfessorCursoUncheckedUpdateWithoutProfessorInput> = z.object({
  idCurso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfessorCursoUncheckedUpdateManyWithoutProfessorInputSchema: z.ZodType<Prisma.ProfessorCursoUncheckedUpdateManyWithoutProfessorInput> = z.object({
  idCurso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackUpdateWithoutProfessorInputSchema: z.ZodType<Prisma.FeedbackUpdateWithoutProfessorInput> = z.object({
  textoFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  relatorio: z.lazy(() => RelatorioAtividadeUpdateOneRequiredWithoutFeedbacksNestedInputSchema).optional(),
  historicos: z.lazy(() => FeedbackHistoricoUpdateManyWithoutFeedbackNestedInputSchema).optional()
}).strict();

export const FeedbackUncheckedUpdateWithoutProfessorInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateWithoutProfessorInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  textoFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  idRelatorio: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historicos: z.lazy(() => FeedbackHistoricoUncheckedUpdateManyWithoutFeedbackNestedInputSchema).optional()
}).strict();

export const FeedbackUncheckedUpdateManyWithoutProfessorInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateManyWithoutProfessorInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  textoFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  idRelatorio: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReversaoValidacaoUpdateWithoutProfessorInputSchema: z.ZodType<Prisma.ReversaoValidacaoUpdateWithoutProfessorInput> = z.object({
  justificativa: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataReversao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  relatorio: z.lazy(() => RelatorioAtividadeUpdateOneRequiredWithoutReversoesValidacaoNestedInputSchema).optional()
}).strict();

export const ReversaoValidacaoUncheckedUpdateWithoutProfessorInputSchema: z.ZodType<Prisma.ReversaoValidacaoUncheckedUpdateWithoutProfessorInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idRelatorio: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  justificativa: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataReversao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReversaoValidacaoUncheckedUpdateManyWithoutProfessorInputSchema: z.ZodType<Prisma.ReversaoValidacaoUncheckedUpdateManyWithoutProfessorInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idRelatorio: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  justificativa: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataReversao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackHistoricoUpdateWithoutProfessorInputSchema: z.ZodType<Prisma.FeedbackHistoricoUpdateWithoutProfessorInput> = z.object({
  textoFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  versao: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  feedback: z.lazy(() => FeedbackUpdateOneWithoutHistoricosNestedInputSchema).optional(),
  relatorio: z.lazy(() => RelatorioAtividadeUpdateOneRequiredWithoutFeedbackHistoricosNestedInputSchema).optional()
}).strict();

export const FeedbackHistoricoUncheckedUpdateWithoutProfessorInputSchema: z.ZodType<Prisma.FeedbackHistoricoUncheckedUpdateWithoutProfessorInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idFeedback: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idRelatorio: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  textoFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  versao: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FeedbackHistoricoUncheckedUpdateManyWithoutProfessorInputSchema: z.ZodType<Prisma.FeedbackHistoricoUncheckedUpdateManyWithoutProfessorInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idFeedback: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idRelatorio: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  textoFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  versao: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RelatorioAtividadeCreateManyCategoriaInputSchema: z.ZodType<Prisma.RelatorioAtividadeCreateManyCategoriaInput> = z.object({
  id: z.number().int().optional(),
  nome: z.string(),
  textoReflexao: z.string(),
  dataRealizacao: z.coerce.date(),
  dataEnvio: z.coerce.date(),
  status: z.lazy(() => StatusRelatorioSchema).optional(),
  horasValidadas: z.number().int(),
  certificado: z.instanceof(Buffer),
  idAluno: z.string()
}).strict();

export const RelatorioAtividadeUpdateWithoutCategoriaInputSchema: z.ZodType<Prisma.RelatorioAtividadeUpdateWithoutCategoriaInput> = z.object({
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  textoReflexao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataRealizacao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => EnumStatusRelatorioFieldUpdateOperationsInputSchema) ]).optional(),
  horasValidadas: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  certificado: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  aluno: z.lazy(() => AlunoUpdateOneRequiredWithoutRelatoriosAtividadesNestedInputSchema).optional(),
  feedbacks: z.lazy(() => FeedbackUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  historicos: z.lazy(() => HistoricoRelatorioUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUpdateManyWithoutRelatorioNestedInputSchema).optional()
}).strict();

export const RelatorioAtividadeUncheckedUpdateWithoutCategoriaInputSchema: z.ZodType<Prisma.RelatorioAtividadeUncheckedUpdateWithoutCategoriaInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  textoReflexao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataRealizacao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => EnumStatusRelatorioFieldUpdateOperationsInputSchema) ]).optional(),
  horasValidadas: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  certificado: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  idAluno: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feedbacks: z.lazy(() => FeedbackUncheckedUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  historicos: z.lazy(() => HistoricoRelatorioUncheckedUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  reversoesValidacao: z.lazy(() => ReversaoValidacaoUncheckedUpdateManyWithoutRelatorioNestedInputSchema).optional(),
  feedbackHistoricos: z.lazy(() => FeedbackHistoricoUncheckedUpdateManyWithoutRelatorioNestedInputSchema).optional()
}).strict();

export const RelatorioAtividadeUncheckedUpdateManyWithoutCategoriaInputSchema: z.ZodType<Prisma.RelatorioAtividadeUncheckedUpdateManyWithoutCategoriaInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  textoReflexao: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataRealizacao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => EnumStatusRelatorioFieldUpdateOperationsInputSchema) ]).optional(),
  horasValidadas: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  certificado: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  idAluno: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackCreateManyRelatorioInputSchema: z.ZodType<Prisma.FeedbackCreateManyRelatorioInput> = z.object({
  id: z.number().int().optional(),
  textoFeedback: z.string(),
  dataEnvio: z.coerce.date(),
  idProfessor: z.string()
}).strict();

export const HistoricoRelatorioCreateManyRelatorioInputSchema: z.ZodType<Prisma.HistoricoRelatorioCreateManyRelatorioInput> = z.object({
  id: z.number().int().optional(),
  nomeAnterior: z.string().optional().nullable(),
  textoReflexaoAnterior: z.string().optional().nullable(),
  dataRealizacaoAnterior: z.coerce.date().optional().nullable(),
  statusAnterior: z.lazy(() => StatusRelatorioSchema).optional().nullable(),
  dataAlteracao: z.coerce.date().optional(),
  certificadoAnterior: z.instanceof(Buffer).optional().nullable()
}).strict();

export const ReversaoValidacaoCreateManyRelatorioInputSchema: z.ZodType<Prisma.ReversaoValidacaoCreateManyRelatorioInput> = z.object({
  id: z.number().int().optional(),
  justificativa: z.string(),
  dataReversao: z.coerce.date().optional(),
  idProfessor: z.string()
}).strict();

export const FeedbackHistoricoCreateManyRelatorioInputSchema: z.ZodType<Prisma.FeedbackHistoricoCreateManyRelatorioInput> = z.object({
  id: z.number().int().optional(),
  idFeedback: z.number().int().optional().nullable(),
  textoFeedback: z.string(),
  dataEnvio: z.coerce.date().optional(),
  idProfessor: z.string().optional().nullable(),
  versao: z.number().int().optional().nullable()
}).strict();

export const FeedbackUpdateWithoutRelatorioInputSchema: z.ZodType<Prisma.FeedbackUpdateWithoutRelatorioInput> = z.object({
  textoFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  professor: z.lazy(() => ProfessorUpdateOneRequiredWithoutFeedbacksNestedInputSchema).optional(),
  historicos: z.lazy(() => FeedbackHistoricoUpdateManyWithoutFeedbackNestedInputSchema).optional()
}).strict();

export const FeedbackUncheckedUpdateWithoutRelatorioInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateWithoutRelatorioInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  textoFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  idProfessor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  historicos: z.lazy(() => FeedbackHistoricoUncheckedUpdateManyWithoutFeedbackNestedInputSchema).optional()
}).strict();

export const FeedbackUncheckedUpdateManyWithoutRelatorioInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateManyWithoutRelatorioInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  textoFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  idProfessor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HistoricoRelatorioUpdateWithoutRelatorioInputSchema: z.ZodType<Prisma.HistoricoRelatorioUpdateWithoutRelatorioInput> = z.object({
  nomeAnterior: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  textoReflexaoAnterior: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dataRealizacaoAnterior: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statusAnterior: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => NullableEnumStatusRelatorioFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dataAlteracao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  certificadoAnterior: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const HistoricoRelatorioUncheckedUpdateWithoutRelatorioInputSchema: z.ZodType<Prisma.HistoricoRelatorioUncheckedUpdateWithoutRelatorioInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nomeAnterior: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  textoReflexaoAnterior: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dataRealizacaoAnterior: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statusAnterior: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => NullableEnumStatusRelatorioFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dataAlteracao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  certificadoAnterior: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const HistoricoRelatorioUncheckedUpdateManyWithoutRelatorioInputSchema: z.ZodType<Prisma.HistoricoRelatorioUncheckedUpdateManyWithoutRelatorioInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nomeAnterior: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  textoReflexaoAnterior: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dataRealizacaoAnterior: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statusAnterior: z.union([ z.lazy(() => StatusRelatorioSchema),z.lazy(() => NullableEnumStatusRelatorioFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dataAlteracao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  certificadoAnterior: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReversaoValidacaoUpdateWithoutRelatorioInputSchema: z.ZodType<Prisma.ReversaoValidacaoUpdateWithoutRelatorioInput> = z.object({
  justificativa: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataReversao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  professor: z.lazy(() => ProfessorUpdateOneRequiredWithoutReversoesValidacaoNestedInputSchema).optional()
}).strict();

export const ReversaoValidacaoUncheckedUpdateWithoutRelatorioInputSchema: z.ZodType<Prisma.ReversaoValidacaoUncheckedUpdateWithoutRelatorioInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  justificativa: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataReversao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  idProfessor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReversaoValidacaoUncheckedUpdateManyWithoutRelatorioInputSchema: z.ZodType<Prisma.ReversaoValidacaoUncheckedUpdateManyWithoutRelatorioInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  justificativa: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataReversao: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  idProfessor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackHistoricoUpdateWithoutRelatorioInputSchema: z.ZodType<Prisma.FeedbackHistoricoUpdateWithoutRelatorioInput> = z.object({
  textoFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  versao: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  feedback: z.lazy(() => FeedbackUpdateOneWithoutHistoricosNestedInputSchema).optional(),
  professor: z.lazy(() => ProfessorUpdateOneWithoutFeedbackHistoricosNestedInputSchema).optional()
}).strict();

export const FeedbackHistoricoUncheckedUpdateWithoutRelatorioInputSchema: z.ZodType<Prisma.FeedbackHistoricoUncheckedUpdateWithoutRelatorioInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idFeedback: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  textoFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  idProfessor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  versao: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FeedbackHistoricoUncheckedUpdateManyWithoutRelatorioInputSchema: z.ZodType<Prisma.FeedbackHistoricoUncheckedUpdateManyWithoutRelatorioInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idFeedback: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  textoFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  idProfessor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  versao: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FeedbackHistoricoCreateManyFeedbackInputSchema: z.ZodType<Prisma.FeedbackHistoricoCreateManyFeedbackInput> = z.object({
  id: z.number().int().optional(),
  idRelatorio: z.number().int(),
  textoFeedback: z.string(),
  dataEnvio: z.coerce.date().optional(),
  idProfessor: z.string().optional().nullable(),
  versao: z.number().int().optional().nullable()
}).strict();

export const FeedbackHistoricoUpdateWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackHistoricoUpdateWithoutFeedbackInput> = z.object({
  textoFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  versao: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  relatorio: z.lazy(() => RelatorioAtividadeUpdateOneRequiredWithoutFeedbackHistoricosNestedInputSchema).optional(),
  professor: z.lazy(() => ProfessorUpdateOneWithoutFeedbackHistoricosNestedInputSchema).optional()
}).strict();

export const FeedbackHistoricoUncheckedUpdateWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackHistoricoUncheckedUpdateWithoutFeedbackInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idRelatorio: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  textoFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  idProfessor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  versao: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FeedbackHistoricoUncheckedUpdateManyWithoutFeedbackInputSchema: z.ZodType<Prisma.FeedbackHistoricoUncheckedUpdateManyWithoutFeedbackInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  idRelatorio: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  textoFeedback: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dataEnvio: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  idProfessor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  versao: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const VerificationFindFirstArgsSchema: z.ZodType<Prisma.VerificationFindFirstArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithRelationInputSchema.array(),VerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationScalarFieldEnumSchema,VerificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationFindFirstOrThrowArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithRelationInputSchema.array(),VerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationScalarFieldEnumSchema,VerificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationFindManyArgsSchema: z.ZodType<Prisma.VerificationFindManyArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithRelationInputSchema.array(),VerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationScalarFieldEnumSchema,VerificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationAggregateArgsSchema: z.ZodType<Prisma.VerificationAggregateArgs> = z.object({
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithRelationInputSchema.array(),VerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationGroupByArgsSchema: z.ZodType<Prisma.VerificationGroupByArgs> = z.object({
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithAggregationInputSchema.array(),VerificationOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationScalarFieldEnumSchema.array(),
  having: VerificationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationFindUniqueArgsSchema: z.ZodType<Prisma.VerificationFindUniqueArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereUniqueInputSchema,
}).strict() ;

export const VerificationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationFindUniqueOrThrowArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereUniqueInputSchema,
}).strict() ;

export const CursoFindFirstArgsSchema: z.ZodType<Prisma.CursoFindFirstArgs> = z.object({
  select: CursoSelectSchema.optional(),
  include: CursoIncludeSchema.optional(),
  where: CursoWhereInputSchema.optional(),
  orderBy: z.union([ CursoOrderByWithRelationInputSchema.array(),CursoOrderByWithRelationInputSchema ]).optional(),
  cursor: CursoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CursoScalarFieldEnumSchema,CursoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CursoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CursoFindFirstOrThrowArgs> = z.object({
  select: CursoSelectSchema.optional(),
  include: CursoIncludeSchema.optional(),
  where: CursoWhereInputSchema.optional(),
  orderBy: z.union([ CursoOrderByWithRelationInputSchema.array(),CursoOrderByWithRelationInputSchema ]).optional(),
  cursor: CursoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CursoScalarFieldEnumSchema,CursoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CursoFindManyArgsSchema: z.ZodType<Prisma.CursoFindManyArgs> = z.object({
  select: CursoSelectSchema.optional(),
  include: CursoIncludeSchema.optional(),
  where: CursoWhereInputSchema.optional(),
  orderBy: z.union([ CursoOrderByWithRelationInputSchema.array(),CursoOrderByWithRelationInputSchema ]).optional(),
  cursor: CursoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CursoScalarFieldEnumSchema,CursoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CursoAggregateArgsSchema: z.ZodType<Prisma.CursoAggregateArgs> = z.object({
  where: CursoWhereInputSchema.optional(),
  orderBy: z.union([ CursoOrderByWithRelationInputSchema.array(),CursoOrderByWithRelationInputSchema ]).optional(),
  cursor: CursoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CursoGroupByArgsSchema: z.ZodType<Prisma.CursoGroupByArgs> = z.object({
  where: CursoWhereInputSchema.optional(),
  orderBy: z.union([ CursoOrderByWithAggregationInputSchema.array(),CursoOrderByWithAggregationInputSchema ]).optional(),
  by: CursoScalarFieldEnumSchema.array(),
  having: CursoScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CursoFindUniqueArgsSchema: z.ZodType<Prisma.CursoFindUniqueArgs> = z.object({
  select: CursoSelectSchema.optional(),
  include: CursoIncludeSchema.optional(),
  where: CursoWhereUniqueInputSchema,
}).strict() ;

export const CursoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CursoFindUniqueOrThrowArgs> = z.object({
  select: CursoSelectSchema.optional(),
  include: CursoIncludeSchema.optional(),
  where: CursoWhereUniqueInputSchema,
}).strict() ;

export const AlunoFindFirstArgsSchema: z.ZodType<Prisma.AlunoFindFirstArgs> = z.object({
  select: AlunoSelectSchema.optional(),
  include: AlunoIncludeSchema.optional(),
  where: AlunoWhereInputSchema.optional(),
  orderBy: z.union([ AlunoOrderByWithRelationInputSchema.array(),AlunoOrderByWithRelationInputSchema ]).optional(),
  cursor: AlunoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AlunoScalarFieldEnumSchema,AlunoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AlunoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AlunoFindFirstOrThrowArgs> = z.object({
  select: AlunoSelectSchema.optional(),
  include: AlunoIncludeSchema.optional(),
  where: AlunoWhereInputSchema.optional(),
  orderBy: z.union([ AlunoOrderByWithRelationInputSchema.array(),AlunoOrderByWithRelationInputSchema ]).optional(),
  cursor: AlunoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AlunoScalarFieldEnumSchema,AlunoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AlunoFindManyArgsSchema: z.ZodType<Prisma.AlunoFindManyArgs> = z.object({
  select: AlunoSelectSchema.optional(),
  include: AlunoIncludeSchema.optional(),
  where: AlunoWhereInputSchema.optional(),
  orderBy: z.union([ AlunoOrderByWithRelationInputSchema.array(),AlunoOrderByWithRelationInputSchema ]).optional(),
  cursor: AlunoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AlunoScalarFieldEnumSchema,AlunoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AlunoAggregateArgsSchema: z.ZodType<Prisma.AlunoAggregateArgs> = z.object({
  where: AlunoWhereInputSchema.optional(),
  orderBy: z.union([ AlunoOrderByWithRelationInputSchema.array(),AlunoOrderByWithRelationInputSchema ]).optional(),
  cursor: AlunoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AlunoGroupByArgsSchema: z.ZodType<Prisma.AlunoGroupByArgs> = z.object({
  where: AlunoWhereInputSchema.optional(),
  orderBy: z.union([ AlunoOrderByWithAggregationInputSchema.array(),AlunoOrderByWithAggregationInputSchema ]).optional(),
  by: AlunoScalarFieldEnumSchema.array(),
  having: AlunoScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AlunoFindUniqueArgsSchema: z.ZodType<Prisma.AlunoFindUniqueArgs> = z.object({
  select: AlunoSelectSchema.optional(),
  include: AlunoIncludeSchema.optional(),
  where: AlunoWhereUniqueInputSchema,
}).strict() ;

export const AlunoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AlunoFindUniqueOrThrowArgs> = z.object({
  select: AlunoSelectSchema.optional(),
  include: AlunoIncludeSchema.optional(),
  where: AlunoWhereUniqueInputSchema,
}).strict() ;

export const ProfessorFindFirstArgsSchema: z.ZodType<Prisma.ProfessorFindFirstArgs> = z.object({
  select: ProfessorSelectSchema.optional(),
  include: ProfessorIncludeSchema.optional(),
  where: ProfessorWhereInputSchema.optional(),
  orderBy: z.union([ ProfessorOrderByWithRelationInputSchema.array(),ProfessorOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfessorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfessorScalarFieldEnumSchema,ProfessorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProfessorFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProfessorFindFirstOrThrowArgs> = z.object({
  select: ProfessorSelectSchema.optional(),
  include: ProfessorIncludeSchema.optional(),
  where: ProfessorWhereInputSchema.optional(),
  orderBy: z.union([ ProfessorOrderByWithRelationInputSchema.array(),ProfessorOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfessorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfessorScalarFieldEnumSchema,ProfessorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProfessorFindManyArgsSchema: z.ZodType<Prisma.ProfessorFindManyArgs> = z.object({
  select: ProfessorSelectSchema.optional(),
  include: ProfessorIncludeSchema.optional(),
  where: ProfessorWhereInputSchema.optional(),
  orderBy: z.union([ ProfessorOrderByWithRelationInputSchema.array(),ProfessorOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfessorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfessorScalarFieldEnumSchema,ProfessorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProfessorAggregateArgsSchema: z.ZodType<Prisma.ProfessorAggregateArgs> = z.object({
  where: ProfessorWhereInputSchema.optional(),
  orderBy: z.union([ ProfessorOrderByWithRelationInputSchema.array(),ProfessorOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfessorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProfessorGroupByArgsSchema: z.ZodType<Prisma.ProfessorGroupByArgs> = z.object({
  where: ProfessorWhereInputSchema.optional(),
  orderBy: z.union([ ProfessorOrderByWithAggregationInputSchema.array(),ProfessorOrderByWithAggregationInputSchema ]).optional(),
  by: ProfessorScalarFieldEnumSchema.array(),
  having: ProfessorScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProfessorFindUniqueArgsSchema: z.ZodType<Prisma.ProfessorFindUniqueArgs> = z.object({
  select: ProfessorSelectSchema.optional(),
  include: ProfessorIncludeSchema.optional(),
  where: ProfessorWhereUniqueInputSchema,
}).strict() ;

export const ProfessorFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProfessorFindUniqueOrThrowArgs> = z.object({
  select: ProfessorSelectSchema.optional(),
  include: ProfessorIncludeSchema.optional(),
  where: ProfessorWhereUniqueInputSchema,
}).strict() ;

export const CoordenadorFindFirstArgsSchema: z.ZodType<Prisma.CoordenadorFindFirstArgs> = z.object({
  select: CoordenadorSelectSchema.optional(),
  include: CoordenadorIncludeSchema.optional(),
  where: CoordenadorWhereInputSchema.optional(),
  orderBy: z.union([ CoordenadorOrderByWithRelationInputSchema.array(),CoordenadorOrderByWithRelationInputSchema ]).optional(),
  cursor: CoordenadorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CoordenadorScalarFieldEnumSchema,CoordenadorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CoordenadorFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CoordenadorFindFirstOrThrowArgs> = z.object({
  select: CoordenadorSelectSchema.optional(),
  include: CoordenadorIncludeSchema.optional(),
  where: CoordenadorWhereInputSchema.optional(),
  orderBy: z.union([ CoordenadorOrderByWithRelationInputSchema.array(),CoordenadorOrderByWithRelationInputSchema ]).optional(),
  cursor: CoordenadorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CoordenadorScalarFieldEnumSchema,CoordenadorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CoordenadorFindManyArgsSchema: z.ZodType<Prisma.CoordenadorFindManyArgs> = z.object({
  select: CoordenadorSelectSchema.optional(),
  include: CoordenadorIncludeSchema.optional(),
  where: CoordenadorWhereInputSchema.optional(),
  orderBy: z.union([ CoordenadorOrderByWithRelationInputSchema.array(),CoordenadorOrderByWithRelationInputSchema ]).optional(),
  cursor: CoordenadorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CoordenadorScalarFieldEnumSchema,CoordenadorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CoordenadorAggregateArgsSchema: z.ZodType<Prisma.CoordenadorAggregateArgs> = z.object({
  where: CoordenadorWhereInputSchema.optional(),
  orderBy: z.union([ CoordenadorOrderByWithRelationInputSchema.array(),CoordenadorOrderByWithRelationInputSchema ]).optional(),
  cursor: CoordenadorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CoordenadorGroupByArgsSchema: z.ZodType<Prisma.CoordenadorGroupByArgs> = z.object({
  where: CoordenadorWhereInputSchema.optional(),
  orderBy: z.union([ CoordenadorOrderByWithAggregationInputSchema.array(),CoordenadorOrderByWithAggregationInputSchema ]).optional(),
  by: CoordenadorScalarFieldEnumSchema.array(),
  having: CoordenadorScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CoordenadorFindUniqueArgsSchema: z.ZodType<Prisma.CoordenadorFindUniqueArgs> = z.object({
  select: CoordenadorSelectSchema.optional(),
  include: CoordenadorIncludeSchema.optional(),
  where: CoordenadorWhereUniqueInputSchema,
}).strict() ;

export const CoordenadorFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CoordenadorFindUniqueOrThrowArgs> = z.object({
  select: CoordenadorSelectSchema.optional(),
  include: CoordenadorIncludeSchema.optional(),
  where: CoordenadorWhereUniqueInputSchema,
}).strict() ;

export const CategoriaFindFirstArgsSchema: z.ZodType<Prisma.CategoriaFindFirstArgs> = z.object({
  select: CategoriaSelectSchema.optional(),
  include: CategoriaIncludeSchema.optional(),
  where: CategoriaWhereInputSchema.optional(),
  orderBy: z.union([ CategoriaOrderByWithRelationInputSchema.array(),CategoriaOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoriaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoriaScalarFieldEnumSchema,CategoriaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoriaFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CategoriaFindFirstOrThrowArgs> = z.object({
  select: CategoriaSelectSchema.optional(),
  include: CategoriaIncludeSchema.optional(),
  where: CategoriaWhereInputSchema.optional(),
  orderBy: z.union([ CategoriaOrderByWithRelationInputSchema.array(),CategoriaOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoriaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoriaScalarFieldEnumSchema,CategoriaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoriaFindManyArgsSchema: z.ZodType<Prisma.CategoriaFindManyArgs> = z.object({
  select: CategoriaSelectSchema.optional(),
  include: CategoriaIncludeSchema.optional(),
  where: CategoriaWhereInputSchema.optional(),
  orderBy: z.union([ CategoriaOrderByWithRelationInputSchema.array(),CategoriaOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoriaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoriaScalarFieldEnumSchema,CategoriaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoriaAggregateArgsSchema: z.ZodType<Prisma.CategoriaAggregateArgs> = z.object({
  where: CategoriaWhereInputSchema.optional(),
  orderBy: z.union([ CategoriaOrderByWithRelationInputSchema.array(),CategoriaOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoriaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CategoriaGroupByArgsSchema: z.ZodType<Prisma.CategoriaGroupByArgs> = z.object({
  where: CategoriaWhereInputSchema.optional(),
  orderBy: z.union([ CategoriaOrderByWithAggregationInputSchema.array(),CategoriaOrderByWithAggregationInputSchema ]).optional(),
  by: CategoriaScalarFieldEnumSchema.array(),
  having: CategoriaScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CategoriaFindUniqueArgsSchema: z.ZodType<Prisma.CategoriaFindUniqueArgs> = z.object({
  select: CategoriaSelectSchema.optional(),
  include: CategoriaIncludeSchema.optional(),
  where: CategoriaWhereUniqueInputSchema,
}).strict() ;

export const CategoriaFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CategoriaFindUniqueOrThrowArgs> = z.object({
  select: CategoriaSelectSchema.optional(),
  include: CategoriaIncludeSchema.optional(),
  where: CategoriaWhereUniqueInputSchema,
}).strict() ;

export const RelatorioAtividadeFindFirstArgsSchema: z.ZodType<Prisma.RelatorioAtividadeFindFirstArgs> = z.object({
  select: RelatorioAtividadeSelectSchema.optional(),
  include: RelatorioAtividadeIncludeSchema.optional(),
  where: RelatorioAtividadeWhereInputSchema.optional(),
  orderBy: z.union([ RelatorioAtividadeOrderByWithRelationInputSchema.array(),RelatorioAtividadeOrderByWithRelationInputSchema ]).optional(),
  cursor: RelatorioAtividadeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RelatorioAtividadeScalarFieldEnumSchema,RelatorioAtividadeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RelatorioAtividadeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RelatorioAtividadeFindFirstOrThrowArgs> = z.object({
  select: RelatorioAtividadeSelectSchema.optional(),
  include: RelatorioAtividadeIncludeSchema.optional(),
  where: RelatorioAtividadeWhereInputSchema.optional(),
  orderBy: z.union([ RelatorioAtividadeOrderByWithRelationInputSchema.array(),RelatorioAtividadeOrderByWithRelationInputSchema ]).optional(),
  cursor: RelatorioAtividadeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RelatorioAtividadeScalarFieldEnumSchema,RelatorioAtividadeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RelatorioAtividadeFindManyArgsSchema: z.ZodType<Prisma.RelatorioAtividadeFindManyArgs> = z.object({
  select: RelatorioAtividadeSelectSchema.optional(),
  include: RelatorioAtividadeIncludeSchema.optional(),
  where: RelatorioAtividadeWhereInputSchema.optional(),
  orderBy: z.union([ RelatorioAtividadeOrderByWithRelationInputSchema.array(),RelatorioAtividadeOrderByWithRelationInputSchema ]).optional(),
  cursor: RelatorioAtividadeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RelatorioAtividadeScalarFieldEnumSchema,RelatorioAtividadeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RelatorioAtividadeAggregateArgsSchema: z.ZodType<Prisma.RelatorioAtividadeAggregateArgs> = z.object({
  where: RelatorioAtividadeWhereInputSchema.optional(),
  orderBy: z.union([ RelatorioAtividadeOrderByWithRelationInputSchema.array(),RelatorioAtividadeOrderByWithRelationInputSchema ]).optional(),
  cursor: RelatorioAtividadeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RelatorioAtividadeGroupByArgsSchema: z.ZodType<Prisma.RelatorioAtividadeGroupByArgs> = z.object({
  where: RelatorioAtividadeWhereInputSchema.optional(),
  orderBy: z.union([ RelatorioAtividadeOrderByWithAggregationInputSchema.array(),RelatorioAtividadeOrderByWithAggregationInputSchema ]).optional(),
  by: RelatorioAtividadeScalarFieldEnumSchema.array(),
  having: RelatorioAtividadeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RelatorioAtividadeFindUniqueArgsSchema: z.ZodType<Prisma.RelatorioAtividadeFindUniqueArgs> = z.object({
  select: RelatorioAtividadeSelectSchema.optional(),
  include: RelatorioAtividadeIncludeSchema.optional(),
  where: RelatorioAtividadeWhereUniqueInputSchema,
}).strict() ;

export const RelatorioAtividadeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RelatorioAtividadeFindUniqueOrThrowArgs> = z.object({
  select: RelatorioAtividadeSelectSchema.optional(),
  include: RelatorioAtividadeIncludeSchema.optional(),
  where: RelatorioAtividadeWhereUniqueInputSchema,
}).strict() ;

export const FeedbackFindFirstArgsSchema: z.ZodType<Prisma.FeedbackFindFirstArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackOrderByWithRelationInputSchema.array(),FeedbackOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FeedbackScalarFieldEnumSchema,FeedbackScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FeedbackFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FeedbackFindFirstOrThrowArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackOrderByWithRelationInputSchema.array(),FeedbackOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FeedbackScalarFieldEnumSchema,FeedbackScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FeedbackFindManyArgsSchema: z.ZodType<Prisma.FeedbackFindManyArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackOrderByWithRelationInputSchema.array(),FeedbackOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FeedbackScalarFieldEnumSchema,FeedbackScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FeedbackAggregateArgsSchema: z.ZodType<Prisma.FeedbackAggregateArgs> = z.object({
  where: FeedbackWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackOrderByWithRelationInputSchema.array(),FeedbackOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FeedbackGroupByArgsSchema: z.ZodType<Prisma.FeedbackGroupByArgs> = z.object({
  where: FeedbackWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackOrderByWithAggregationInputSchema.array(),FeedbackOrderByWithAggregationInputSchema ]).optional(),
  by: FeedbackScalarFieldEnumSchema.array(),
  having: FeedbackScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FeedbackFindUniqueArgsSchema: z.ZodType<Prisma.FeedbackFindUniqueArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereUniqueInputSchema,
}).strict() ;

export const FeedbackFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FeedbackFindUniqueOrThrowArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereUniqueInputSchema,
}).strict() ;

export const FeedbackHistoricoFindFirstArgsSchema: z.ZodType<Prisma.FeedbackHistoricoFindFirstArgs> = z.object({
  select: FeedbackHistoricoSelectSchema.optional(),
  include: FeedbackHistoricoIncludeSchema.optional(),
  where: FeedbackHistoricoWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackHistoricoOrderByWithRelationInputSchema.array(),FeedbackHistoricoOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackHistoricoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FeedbackHistoricoScalarFieldEnumSchema,FeedbackHistoricoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FeedbackHistoricoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FeedbackHistoricoFindFirstOrThrowArgs> = z.object({
  select: FeedbackHistoricoSelectSchema.optional(),
  include: FeedbackHistoricoIncludeSchema.optional(),
  where: FeedbackHistoricoWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackHistoricoOrderByWithRelationInputSchema.array(),FeedbackHistoricoOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackHistoricoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FeedbackHistoricoScalarFieldEnumSchema,FeedbackHistoricoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FeedbackHistoricoFindManyArgsSchema: z.ZodType<Prisma.FeedbackHistoricoFindManyArgs> = z.object({
  select: FeedbackHistoricoSelectSchema.optional(),
  include: FeedbackHistoricoIncludeSchema.optional(),
  where: FeedbackHistoricoWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackHistoricoOrderByWithRelationInputSchema.array(),FeedbackHistoricoOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackHistoricoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FeedbackHistoricoScalarFieldEnumSchema,FeedbackHistoricoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FeedbackHistoricoAggregateArgsSchema: z.ZodType<Prisma.FeedbackHistoricoAggregateArgs> = z.object({
  where: FeedbackHistoricoWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackHistoricoOrderByWithRelationInputSchema.array(),FeedbackHistoricoOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackHistoricoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FeedbackHistoricoGroupByArgsSchema: z.ZodType<Prisma.FeedbackHistoricoGroupByArgs> = z.object({
  where: FeedbackHistoricoWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackHistoricoOrderByWithAggregationInputSchema.array(),FeedbackHistoricoOrderByWithAggregationInputSchema ]).optional(),
  by: FeedbackHistoricoScalarFieldEnumSchema.array(),
  having: FeedbackHistoricoScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FeedbackHistoricoFindUniqueArgsSchema: z.ZodType<Prisma.FeedbackHistoricoFindUniqueArgs> = z.object({
  select: FeedbackHistoricoSelectSchema.optional(),
  include: FeedbackHistoricoIncludeSchema.optional(),
  where: FeedbackHistoricoWhereUniqueInputSchema,
}).strict() ;

export const FeedbackHistoricoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FeedbackHistoricoFindUniqueOrThrowArgs> = z.object({
  select: FeedbackHistoricoSelectSchema.optional(),
  include: FeedbackHistoricoIncludeSchema.optional(),
  where: FeedbackHistoricoWhereUniqueInputSchema,
}).strict() ;

export const HistoricoRelatorioFindFirstArgsSchema: z.ZodType<Prisma.HistoricoRelatorioFindFirstArgs> = z.object({
  select: HistoricoRelatorioSelectSchema.optional(),
  include: HistoricoRelatorioIncludeSchema.optional(),
  where: HistoricoRelatorioWhereInputSchema.optional(),
  orderBy: z.union([ HistoricoRelatorioOrderByWithRelationInputSchema.array(),HistoricoRelatorioOrderByWithRelationInputSchema ]).optional(),
  cursor: HistoricoRelatorioWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HistoricoRelatorioScalarFieldEnumSchema,HistoricoRelatorioScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const HistoricoRelatorioFindFirstOrThrowArgsSchema: z.ZodType<Prisma.HistoricoRelatorioFindFirstOrThrowArgs> = z.object({
  select: HistoricoRelatorioSelectSchema.optional(),
  include: HistoricoRelatorioIncludeSchema.optional(),
  where: HistoricoRelatorioWhereInputSchema.optional(),
  orderBy: z.union([ HistoricoRelatorioOrderByWithRelationInputSchema.array(),HistoricoRelatorioOrderByWithRelationInputSchema ]).optional(),
  cursor: HistoricoRelatorioWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HistoricoRelatorioScalarFieldEnumSchema,HistoricoRelatorioScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const HistoricoRelatorioFindManyArgsSchema: z.ZodType<Prisma.HistoricoRelatorioFindManyArgs> = z.object({
  select: HistoricoRelatorioSelectSchema.optional(),
  include: HistoricoRelatorioIncludeSchema.optional(),
  where: HistoricoRelatorioWhereInputSchema.optional(),
  orderBy: z.union([ HistoricoRelatorioOrderByWithRelationInputSchema.array(),HistoricoRelatorioOrderByWithRelationInputSchema ]).optional(),
  cursor: HistoricoRelatorioWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HistoricoRelatorioScalarFieldEnumSchema,HistoricoRelatorioScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const HistoricoRelatorioAggregateArgsSchema: z.ZodType<Prisma.HistoricoRelatorioAggregateArgs> = z.object({
  where: HistoricoRelatorioWhereInputSchema.optional(),
  orderBy: z.union([ HistoricoRelatorioOrderByWithRelationInputSchema.array(),HistoricoRelatorioOrderByWithRelationInputSchema ]).optional(),
  cursor: HistoricoRelatorioWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const HistoricoRelatorioGroupByArgsSchema: z.ZodType<Prisma.HistoricoRelatorioGroupByArgs> = z.object({
  where: HistoricoRelatorioWhereInputSchema.optional(),
  orderBy: z.union([ HistoricoRelatorioOrderByWithAggregationInputSchema.array(),HistoricoRelatorioOrderByWithAggregationInputSchema ]).optional(),
  by: HistoricoRelatorioScalarFieldEnumSchema.array(),
  having: HistoricoRelatorioScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const HistoricoRelatorioFindUniqueArgsSchema: z.ZodType<Prisma.HistoricoRelatorioFindUniqueArgs> = z.object({
  select: HistoricoRelatorioSelectSchema.optional(),
  include: HistoricoRelatorioIncludeSchema.optional(),
  where: HistoricoRelatorioWhereUniqueInputSchema,
}).strict() ;

export const HistoricoRelatorioFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.HistoricoRelatorioFindUniqueOrThrowArgs> = z.object({
  select: HistoricoRelatorioSelectSchema.optional(),
  include: HistoricoRelatorioIncludeSchema.optional(),
  where: HistoricoRelatorioWhereUniqueInputSchema,
}).strict() ;

export const ReversaoValidacaoFindFirstArgsSchema: z.ZodType<Prisma.ReversaoValidacaoFindFirstArgs> = z.object({
  select: ReversaoValidacaoSelectSchema.optional(),
  include: ReversaoValidacaoIncludeSchema.optional(),
  where: ReversaoValidacaoWhereInputSchema.optional(),
  orderBy: z.union([ ReversaoValidacaoOrderByWithRelationInputSchema.array(),ReversaoValidacaoOrderByWithRelationInputSchema ]).optional(),
  cursor: ReversaoValidacaoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReversaoValidacaoScalarFieldEnumSchema,ReversaoValidacaoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReversaoValidacaoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReversaoValidacaoFindFirstOrThrowArgs> = z.object({
  select: ReversaoValidacaoSelectSchema.optional(),
  include: ReversaoValidacaoIncludeSchema.optional(),
  where: ReversaoValidacaoWhereInputSchema.optional(),
  orderBy: z.union([ ReversaoValidacaoOrderByWithRelationInputSchema.array(),ReversaoValidacaoOrderByWithRelationInputSchema ]).optional(),
  cursor: ReversaoValidacaoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReversaoValidacaoScalarFieldEnumSchema,ReversaoValidacaoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReversaoValidacaoFindManyArgsSchema: z.ZodType<Prisma.ReversaoValidacaoFindManyArgs> = z.object({
  select: ReversaoValidacaoSelectSchema.optional(),
  include: ReversaoValidacaoIncludeSchema.optional(),
  where: ReversaoValidacaoWhereInputSchema.optional(),
  orderBy: z.union([ ReversaoValidacaoOrderByWithRelationInputSchema.array(),ReversaoValidacaoOrderByWithRelationInputSchema ]).optional(),
  cursor: ReversaoValidacaoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReversaoValidacaoScalarFieldEnumSchema,ReversaoValidacaoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReversaoValidacaoAggregateArgsSchema: z.ZodType<Prisma.ReversaoValidacaoAggregateArgs> = z.object({
  where: ReversaoValidacaoWhereInputSchema.optional(),
  orderBy: z.union([ ReversaoValidacaoOrderByWithRelationInputSchema.array(),ReversaoValidacaoOrderByWithRelationInputSchema ]).optional(),
  cursor: ReversaoValidacaoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReversaoValidacaoGroupByArgsSchema: z.ZodType<Prisma.ReversaoValidacaoGroupByArgs> = z.object({
  where: ReversaoValidacaoWhereInputSchema.optional(),
  orderBy: z.union([ ReversaoValidacaoOrderByWithAggregationInputSchema.array(),ReversaoValidacaoOrderByWithAggregationInputSchema ]).optional(),
  by: ReversaoValidacaoScalarFieldEnumSchema.array(),
  having: ReversaoValidacaoScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReversaoValidacaoFindUniqueArgsSchema: z.ZodType<Prisma.ReversaoValidacaoFindUniqueArgs> = z.object({
  select: ReversaoValidacaoSelectSchema.optional(),
  include: ReversaoValidacaoIncludeSchema.optional(),
  where: ReversaoValidacaoWhereUniqueInputSchema,
}).strict() ;

export const ReversaoValidacaoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReversaoValidacaoFindUniqueOrThrowArgs> = z.object({
  select: ReversaoValidacaoSelectSchema.optional(),
  include: ReversaoValidacaoIncludeSchema.optional(),
  where: ReversaoValidacaoWhereUniqueInputSchema,
}).strict() ;

export const ProfessorCursoFindFirstArgsSchema: z.ZodType<Prisma.ProfessorCursoFindFirstArgs> = z.object({
  select: ProfessorCursoSelectSchema.optional(),
  include: ProfessorCursoIncludeSchema.optional(),
  where: ProfessorCursoWhereInputSchema.optional(),
  orderBy: z.union([ ProfessorCursoOrderByWithRelationInputSchema.array(),ProfessorCursoOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfessorCursoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfessorCursoScalarFieldEnumSchema,ProfessorCursoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProfessorCursoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProfessorCursoFindFirstOrThrowArgs> = z.object({
  select: ProfessorCursoSelectSchema.optional(),
  include: ProfessorCursoIncludeSchema.optional(),
  where: ProfessorCursoWhereInputSchema.optional(),
  orderBy: z.union([ ProfessorCursoOrderByWithRelationInputSchema.array(),ProfessorCursoOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfessorCursoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfessorCursoScalarFieldEnumSchema,ProfessorCursoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProfessorCursoFindManyArgsSchema: z.ZodType<Prisma.ProfessorCursoFindManyArgs> = z.object({
  select: ProfessorCursoSelectSchema.optional(),
  include: ProfessorCursoIncludeSchema.optional(),
  where: ProfessorCursoWhereInputSchema.optional(),
  orderBy: z.union([ ProfessorCursoOrderByWithRelationInputSchema.array(),ProfessorCursoOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfessorCursoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfessorCursoScalarFieldEnumSchema,ProfessorCursoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProfessorCursoAggregateArgsSchema: z.ZodType<Prisma.ProfessorCursoAggregateArgs> = z.object({
  where: ProfessorCursoWhereInputSchema.optional(),
  orderBy: z.union([ ProfessorCursoOrderByWithRelationInputSchema.array(),ProfessorCursoOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfessorCursoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProfessorCursoGroupByArgsSchema: z.ZodType<Prisma.ProfessorCursoGroupByArgs> = z.object({
  where: ProfessorCursoWhereInputSchema.optional(),
  orderBy: z.union([ ProfessorCursoOrderByWithAggregationInputSchema.array(),ProfessorCursoOrderByWithAggregationInputSchema ]).optional(),
  by: ProfessorCursoScalarFieldEnumSchema.array(),
  having: ProfessorCursoScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProfessorCursoFindUniqueArgsSchema: z.ZodType<Prisma.ProfessorCursoFindUniqueArgs> = z.object({
  select: ProfessorCursoSelectSchema.optional(),
  include: ProfessorCursoIncludeSchema.optional(),
  where: ProfessorCursoWhereUniqueInputSchema,
}).strict() ;

export const ProfessorCursoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProfessorCursoFindUniqueOrThrowArgs> = z.object({
  select: ProfessorCursoSelectSchema.optional(),
  include: ProfessorCursoIncludeSchema.optional(),
  where: ProfessorCursoWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionCreateManyAndReturnArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountCreateManyAndReturnArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationCreateArgsSchema: z.ZodType<Prisma.VerificationCreateArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  data: z.union([ VerificationCreateInputSchema,VerificationUncheckedCreateInputSchema ]),
}).strict() ;

export const VerificationUpsertArgsSchema: z.ZodType<Prisma.VerificationUpsertArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereUniqueInputSchema,
  create: z.union([ VerificationCreateInputSchema,VerificationUncheckedCreateInputSchema ]),
  update: z.union([ VerificationUpdateInputSchema,VerificationUncheckedUpdateInputSchema ]),
}).strict() ;

export const VerificationCreateManyArgsSchema: z.ZodType<Prisma.VerificationCreateManyArgs> = z.object({
  data: z.union([ VerificationCreateManyInputSchema,VerificationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VerificationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationCreateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationCreateManyInputSchema,VerificationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VerificationDeleteArgsSchema: z.ZodType<Prisma.VerificationDeleteArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereUniqueInputSchema,
}).strict() ;

export const VerificationUpdateArgsSchema: z.ZodType<Prisma.VerificationUpdateArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  data: z.union([ VerificationUpdateInputSchema,VerificationUncheckedUpdateInputSchema ]),
  where: VerificationWhereUniqueInputSchema,
}).strict() ;

export const VerificationUpdateManyArgsSchema: z.ZodType<Prisma.VerificationUpdateManyArgs> = z.object({
  data: z.union([ VerificationUpdateManyMutationInputSchema,VerificationUncheckedUpdateManyInputSchema ]),
  where: VerificationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationUpdateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationUpdateManyMutationInputSchema,VerificationUncheckedUpdateManyInputSchema ]),
  where: VerificationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationDeleteManyArgsSchema: z.ZodType<Prisma.VerificationDeleteManyArgs> = z.object({
  where: VerificationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CursoCreateArgsSchema: z.ZodType<Prisma.CursoCreateArgs> = z.object({
  select: CursoSelectSchema.optional(),
  include: CursoIncludeSchema.optional(),
  data: z.union([ CursoCreateInputSchema,CursoUncheckedCreateInputSchema ]),
}).strict() ;

export const CursoUpsertArgsSchema: z.ZodType<Prisma.CursoUpsertArgs> = z.object({
  select: CursoSelectSchema.optional(),
  include: CursoIncludeSchema.optional(),
  where: CursoWhereUniqueInputSchema,
  create: z.union([ CursoCreateInputSchema,CursoUncheckedCreateInputSchema ]),
  update: z.union([ CursoUpdateInputSchema,CursoUncheckedUpdateInputSchema ]),
}).strict() ;

export const CursoCreateManyArgsSchema: z.ZodType<Prisma.CursoCreateManyArgs> = z.object({
  data: z.union([ CursoCreateManyInputSchema,CursoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CursoCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CursoCreateManyAndReturnArgs> = z.object({
  data: z.union([ CursoCreateManyInputSchema,CursoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CursoDeleteArgsSchema: z.ZodType<Prisma.CursoDeleteArgs> = z.object({
  select: CursoSelectSchema.optional(),
  include: CursoIncludeSchema.optional(),
  where: CursoWhereUniqueInputSchema,
}).strict() ;

export const CursoUpdateArgsSchema: z.ZodType<Prisma.CursoUpdateArgs> = z.object({
  select: CursoSelectSchema.optional(),
  include: CursoIncludeSchema.optional(),
  data: z.union([ CursoUpdateInputSchema,CursoUncheckedUpdateInputSchema ]),
  where: CursoWhereUniqueInputSchema,
}).strict() ;

export const CursoUpdateManyArgsSchema: z.ZodType<Prisma.CursoUpdateManyArgs> = z.object({
  data: z.union([ CursoUpdateManyMutationInputSchema,CursoUncheckedUpdateManyInputSchema ]),
  where: CursoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CursoUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CursoUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CursoUpdateManyMutationInputSchema,CursoUncheckedUpdateManyInputSchema ]),
  where: CursoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CursoDeleteManyArgsSchema: z.ZodType<Prisma.CursoDeleteManyArgs> = z.object({
  where: CursoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AlunoCreateArgsSchema: z.ZodType<Prisma.AlunoCreateArgs> = z.object({
  select: AlunoSelectSchema.optional(),
  include: AlunoIncludeSchema.optional(),
  data: z.union([ AlunoCreateInputSchema,AlunoUncheckedCreateInputSchema ]),
}).strict() ;

export const AlunoUpsertArgsSchema: z.ZodType<Prisma.AlunoUpsertArgs> = z.object({
  select: AlunoSelectSchema.optional(),
  include: AlunoIncludeSchema.optional(),
  where: AlunoWhereUniqueInputSchema,
  create: z.union([ AlunoCreateInputSchema,AlunoUncheckedCreateInputSchema ]),
  update: z.union([ AlunoUpdateInputSchema,AlunoUncheckedUpdateInputSchema ]),
}).strict() ;

export const AlunoCreateManyArgsSchema: z.ZodType<Prisma.AlunoCreateManyArgs> = z.object({
  data: z.union([ AlunoCreateManyInputSchema,AlunoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AlunoCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AlunoCreateManyAndReturnArgs> = z.object({
  data: z.union([ AlunoCreateManyInputSchema,AlunoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AlunoDeleteArgsSchema: z.ZodType<Prisma.AlunoDeleteArgs> = z.object({
  select: AlunoSelectSchema.optional(),
  include: AlunoIncludeSchema.optional(),
  where: AlunoWhereUniqueInputSchema,
}).strict() ;

export const AlunoUpdateArgsSchema: z.ZodType<Prisma.AlunoUpdateArgs> = z.object({
  select: AlunoSelectSchema.optional(),
  include: AlunoIncludeSchema.optional(),
  data: z.union([ AlunoUpdateInputSchema,AlunoUncheckedUpdateInputSchema ]),
  where: AlunoWhereUniqueInputSchema,
}).strict() ;

export const AlunoUpdateManyArgsSchema: z.ZodType<Prisma.AlunoUpdateManyArgs> = z.object({
  data: z.union([ AlunoUpdateManyMutationInputSchema,AlunoUncheckedUpdateManyInputSchema ]),
  where: AlunoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AlunoUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AlunoUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AlunoUpdateManyMutationInputSchema,AlunoUncheckedUpdateManyInputSchema ]),
  where: AlunoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AlunoDeleteManyArgsSchema: z.ZodType<Prisma.AlunoDeleteManyArgs> = z.object({
  where: AlunoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProfessorCreateArgsSchema: z.ZodType<Prisma.ProfessorCreateArgs> = z.object({
  select: ProfessorSelectSchema.optional(),
  include: ProfessorIncludeSchema.optional(),
  data: z.union([ ProfessorCreateInputSchema,ProfessorUncheckedCreateInputSchema ]),
}).strict() ;

export const ProfessorUpsertArgsSchema: z.ZodType<Prisma.ProfessorUpsertArgs> = z.object({
  select: ProfessorSelectSchema.optional(),
  include: ProfessorIncludeSchema.optional(),
  where: ProfessorWhereUniqueInputSchema,
  create: z.union([ ProfessorCreateInputSchema,ProfessorUncheckedCreateInputSchema ]),
  update: z.union([ ProfessorUpdateInputSchema,ProfessorUncheckedUpdateInputSchema ]),
}).strict() ;

export const ProfessorCreateManyArgsSchema: z.ZodType<Prisma.ProfessorCreateManyArgs> = z.object({
  data: z.union([ ProfessorCreateManyInputSchema,ProfessorCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProfessorCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProfessorCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProfessorCreateManyInputSchema,ProfessorCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProfessorDeleteArgsSchema: z.ZodType<Prisma.ProfessorDeleteArgs> = z.object({
  select: ProfessorSelectSchema.optional(),
  include: ProfessorIncludeSchema.optional(),
  where: ProfessorWhereUniqueInputSchema,
}).strict() ;

export const ProfessorUpdateArgsSchema: z.ZodType<Prisma.ProfessorUpdateArgs> = z.object({
  select: ProfessorSelectSchema.optional(),
  include: ProfessorIncludeSchema.optional(),
  data: z.union([ ProfessorUpdateInputSchema,ProfessorUncheckedUpdateInputSchema ]),
  where: ProfessorWhereUniqueInputSchema,
}).strict() ;

export const ProfessorUpdateManyArgsSchema: z.ZodType<Prisma.ProfessorUpdateManyArgs> = z.object({
  data: z.union([ ProfessorUpdateManyMutationInputSchema,ProfessorUncheckedUpdateManyInputSchema ]),
  where: ProfessorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProfessorUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ProfessorUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ProfessorUpdateManyMutationInputSchema,ProfessorUncheckedUpdateManyInputSchema ]),
  where: ProfessorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProfessorDeleteManyArgsSchema: z.ZodType<Prisma.ProfessorDeleteManyArgs> = z.object({
  where: ProfessorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CoordenadorCreateArgsSchema: z.ZodType<Prisma.CoordenadorCreateArgs> = z.object({
  select: CoordenadorSelectSchema.optional(),
  include: CoordenadorIncludeSchema.optional(),
  data: z.union([ CoordenadorCreateInputSchema,CoordenadorUncheckedCreateInputSchema ]),
}).strict() ;

export const CoordenadorUpsertArgsSchema: z.ZodType<Prisma.CoordenadorUpsertArgs> = z.object({
  select: CoordenadorSelectSchema.optional(),
  include: CoordenadorIncludeSchema.optional(),
  where: CoordenadorWhereUniqueInputSchema,
  create: z.union([ CoordenadorCreateInputSchema,CoordenadorUncheckedCreateInputSchema ]),
  update: z.union([ CoordenadorUpdateInputSchema,CoordenadorUncheckedUpdateInputSchema ]),
}).strict() ;

export const CoordenadorCreateManyArgsSchema: z.ZodType<Prisma.CoordenadorCreateManyArgs> = z.object({
  data: z.union([ CoordenadorCreateManyInputSchema,CoordenadorCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CoordenadorCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CoordenadorCreateManyAndReturnArgs> = z.object({
  data: z.union([ CoordenadorCreateManyInputSchema,CoordenadorCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CoordenadorDeleteArgsSchema: z.ZodType<Prisma.CoordenadorDeleteArgs> = z.object({
  select: CoordenadorSelectSchema.optional(),
  include: CoordenadorIncludeSchema.optional(),
  where: CoordenadorWhereUniqueInputSchema,
}).strict() ;

export const CoordenadorUpdateArgsSchema: z.ZodType<Prisma.CoordenadorUpdateArgs> = z.object({
  select: CoordenadorSelectSchema.optional(),
  include: CoordenadorIncludeSchema.optional(),
  data: z.union([ CoordenadorUpdateInputSchema,CoordenadorUncheckedUpdateInputSchema ]),
  where: CoordenadorWhereUniqueInputSchema,
}).strict() ;

export const CoordenadorUpdateManyArgsSchema: z.ZodType<Prisma.CoordenadorUpdateManyArgs> = z.object({
  data: z.union([ CoordenadorUpdateManyMutationInputSchema,CoordenadorUncheckedUpdateManyInputSchema ]),
  where: CoordenadorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CoordenadorUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CoordenadorUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CoordenadorUpdateManyMutationInputSchema,CoordenadorUncheckedUpdateManyInputSchema ]),
  where: CoordenadorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CoordenadorDeleteManyArgsSchema: z.ZodType<Prisma.CoordenadorDeleteManyArgs> = z.object({
  where: CoordenadorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CategoriaCreateArgsSchema: z.ZodType<Prisma.CategoriaCreateArgs> = z.object({
  select: CategoriaSelectSchema.optional(),
  include: CategoriaIncludeSchema.optional(),
  data: z.union([ CategoriaCreateInputSchema,CategoriaUncheckedCreateInputSchema ]),
}).strict() ;

export const CategoriaUpsertArgsSchema: z.ZodType<Prisma.CategoriaUpsertArgs> = z.object({
  select: CategoriaSelectSchema.optional(),
  include: CategoriaIncludeSchema.optional(),
  where: CategoriaWhereUniqueInputSchema,
  create: z.union([ CategoriaCreateInputSchema,CategoriaUncheckedCreateInputSchema ]),
  update: z.union([ CategoriaUpdateInputSchema,CategoriaUncheckedUpdateInputSchema ]),
}).strict() ;

export const CategoriaCreateManyArgsSchema: z.ZodType<Prisma.CategoriaCreateManyArgs> = z.object({
  data: z.union([ CategoriaCreateManyInputSchema,CategoriaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CategoriaCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CategoriaCreateManyAndReturnArgs> = z.object({
  data: z.union([ CategoriaCreateManyInputSchema,CategoriaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CategoriaDeleteArgsSchema: z.ZodType<Prisma.CategoriaDeleteArgs> = z.object({
  select: CategoriaSelectSchema.optional(),
  include: CategoriaIncludeSchema.optional(),
  where: CategoriaWhereUniqueInputSchema,
}).strict() ;

export const CategoriaUpdateArgsSchema: z.ZodType<Prisma.CategoriaUpdateArgs> = z.object({
  select: CategoriaSelectSchema.optional(),
  include: CategoriaIncludeSchema.optional(),
  data: z.union([ CategoriaUpdateInputSchema,CategoriaUncheckedUpdateInputSchema ]),
  where: CategoriaWhereUniqueInputSchema,
}).strict() ;

export const CategoriaUpdateManyArgsSchema: z.ZodType<Prisma.CategoriaUpdateManyArgs> = z.object({
  data: z.union([ CategoriaUpdateManyMutationInputSchema,CategoriaUncheckedUpdateManyInputSchema ]),
  where: CategoriaWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CategoriaUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CategoriaUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CategoriaUpdateManyMutationInputSchema,CategoriaUncheckedUpdateManyInputSchema ]),
  where: CategoriaWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CategoriaDeleteManyArgsSchema: z.ZodType<Prisma.CategoriaDeleteManyArgs> = z.object({
  where: CategoriaWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RelatorioAtividadeCreateArgsSchema: z.ZodType<Prisma.RelatorioAtividadeCreateArgs> = z.object({
  select: RelatorioAtividadeSelectSchema.optional(),
  include: RelatorioAtividadeIncludeSchema.optional(),
  data: z.union([ RelatorioAtividadeCreateInputSchema,RelatorioAtividadeUncheckedCreateInputSchema ]),
}).strict() ;

export const RelatorioAtividadeUpsertArgsSchema: z.ZodType<Prisma.RelatorioAtividadeUpsertArgs> = z.object({
  select: RelatorioAtividadeSelectSchema.optional(),
  include: RelatorioAtividadeIncludeSchema.optional(),
  where: RelatorioAtividadeWhereUniqueInputSchema,
  create: z.union([ RelatorioAtividadeCreateInputSchema,RelatorioAtividadeUncheckedCreateInputSchema ]),
  update: z.union([ RelatorioAtividadeUpdateInputSchema,RelatorioAtividadeUncheckedUpdateInputSchema ]),
}).strict() ;

export const RelatorioAtividadeCreateManyArgsSchema: z.ZodType<Prisma.RelatorioAtividadeCreateManyArgs> = z.object({
  data: z.union([ RelatorioAtividadeCreateManyInputSchema,RelatorioAtividadeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RelatorioAtividadeCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RelatorioAtividadeCreateManyAndReturnArgs> = z.object({
  data: z.union([ RelatorioAtividadeCreateManyInputSchema,RelatorioAtividadeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RelatorioAtividadeDeleteArgsSchema: z.ZodType<Prisma.RelatorioAtividadeDeleteArgs> = z.object({
  select: RelatorioAtividadeSelectSchema.optional(),
  include: RelatorioAtividadeIncludeSchema.optional(),
  where: RelatorioAtividadeWhereUniqueInputSchema,
}).strict() ;

export const RelatorioAtividadeUpdateArgsSchema: z.ZodType<Prisma.RelatorioAtividadeUpdateArgs> = z.object({
  select: RelatorioAtividadeSelectSchema.optional(),
  include: RelatorioAtividadeIncludeSchema.optional(),
  data: z.union([ RelatorioAtividadeUpdateInputSchema,RelatorioAtividadeUncheckedUpdateInputSchema ]),
  where: RelatorioAtividadeWhereUniqueInputSchema,
}).strict() ;

export const RelatorioAtividadeUpdateManyArgsSchema: z.ZodType<Prisma.RelatorioAtividadeUpdateManyArgs> = z.object({
  data: z.union([ RelatorioAtividadeUpdateManyMutationInputSchema,RelatorioAtividadeUncheckedUpdateManyInputSchema ]),
  where: RelatorioAtividadeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RelatorioAtividadeUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.RelatorioAtividadeUpdateManyAndReturnArgs> = z.object({
  data: z.union([ RelatorioAtividadeUpdateManyMutationInputSchema,RelatorioAtividadeUncheckedUpdateManyInputSchema ]),
  where: RelatorioAtividadeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RelatorioAtividadeDeleteManyArgsSchema: z.ZodType<Prisma.RelatorioAtividadeDeleteManyArgs> = z.object({
  where: RelatorioAtividadeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FeedbackCreateArgsSchema: z.ZodType<Prisma.FeedbackCreateArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  data: z.union([ FeedbackCreateInputSchema,FeedbackUncheckedCreateInputSchema ]),
}).strict() ;

export const FeedbackUpsertArgsSchema: z.ZodType<Prisma.FeedbackUpsertArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereUniqueInputSchema,
  create: z.union([ FeedbackCreateInputSchema,FeedbackUncheckedCreateInputSchema ]),
  update: z.union([ FeedbackUpdateInputSchema,FeedbackUncheckedUpdateInputSchema ]),
}).strict() ;

export const FeedbackCreateManyArgsSchema: z.ZodType<Prisma.FeedbackCreateManyArgs> = z.object({
  data: z.union([ FeedbackCreateManyInputSchema,FeedbackCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FeedbackCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FeedbackCreateManyAndReturnArgs> = z.object({
  data: z.union([ FeedbackCreateManyInputSchema,FeedbackCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FeedbackDeleteArgsSchema: z.ZodType<Prisma.FeedbackDeleteArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereUniqueInputSchema,
}).strict() ;

export const FeedbackUpdateArgsSchema: z.ZodType<Prisma.FeedbackUpdateArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  data: z.union([ FeedbackUpdateInputSchema,FeedbackUncheckedUpdateInputSchema ]),
  where: FeedbackWhereUniqueInputSchema,
}).strict() ;

export const FeedbackUpdateManyArgsSchema: z.ZodType<Prisma.FeedbackUpdateManyArgs> = z.object({
  data: z.union([ FeedbackUpdateManyMutationInputSchema,FeedbackUncheckedUpdateManyInputSchema ]),
  where: FeedbackWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FeedbackUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.FeedbackUpdateManyAndReturnArgs> = z.object({
  data: z.union([ FeedbackUpdateManyMutationInputSchema,FeedbackUncheckedUpdateManyInputSchema ]),
  where: FeedbackWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FeedbackDeleteManyArgsSchema: z.ZodType<Prisma.FeedbackDeleteManyArgs> = z.object({
  where: FeedbackWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FeedbackHistoricoCreateArgsSchema: z.ZodType<Prisma.FeedbackHistoricoCreateArgs> = z.object({
  select: FeedbackHistoricoSelectSchema.optional(),
  include: FeedbackHistoricoIncludeSchema.optional(),
  data: z.union([ FeedbackHistoricoCreateInputSchema,FeedbackHistoricoUncheckedCreateInputSchema ]),
}).strict() ;

export const FeedbackHistoricoUpsertArgsSchema: z.ZodType<Prisma.FeedbackHistoricoUpsertArgs> = z.object({
  select: FeedbackHistoricoSelectSchema.optional(),
  include: FeedbackHistoricoIncludeSchema.optional(),
  where: FeedbackHistoricoWhereUniqueInputSchema,
  create: z.union([ FeedbackHistoricoCreateInputSchema,FeedbackHistoricoUncheckedCreateInputSchema ]),
  update: z.union([ FeedbackHistoricoUpdateInputSchema,FeedbackHistoricoUncheckedUpdateInputSchema ]),
}).strict() ;

export const FeedbackHistoricoCreateManyArgsSchema: z.ZodType<Prisma.FeedbackHistoricoCreateManyArgs> = z.object({
  data: z.union([ FeedbackHistoricoCreateManyInputSchema,FeedbackHistoricoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FeedbackHistoricoCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FeedbackHistoricoCreateManyAndReturnArgs> = z.object({
  data: z.union([ FeedbackHistoricoCreateManyInputSchema,FeedbackHistoricoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FeedbackHistoricoDeleteArgsSchema: z.ZodType<Prisma.FeedbackHistoricoDeleteArgs> = z.object({
  select: FeedbackHistoricoSelectSchema.optional(),
  include: FeedbackHistoricoIncludeSchema.optional(),
  where: FeedbackHistoricoWhereUniqueInputSchema,
}).strict() ;

export const FeedbackHistoricoUpdateArgsSchema: z.ZodType<Prisma.FeedbackHistoricoUpdateArgs> = z.object({
  select: FeedbackHistoricoSelectSchema.optional(),
  include: FeedbackHistoricoIncludeSchema.optional(),
  data: z.union([ FeedbackHistoricoUpdateInputSchema,FeedbackHistoricoUncheckedUpdateInputSchema ]),
  where: FeedbackHistoricoWhereUniqueInputSchema,
}).strict() ;

export const FeedbackHistoricoUpdateManyArgsSchema: z.ZodType<Prisma.FeedbackHistoricoUpdateManyArgs> = z.object({
  data: z.union([ FeedbackHistoricoUpdateManyMutationInputSchema,FeedbackHistoricoUncheckedUpdateManyInputSchema ]),
  where: FeedbackHistoricoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FeedbackHistoricoUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.FeedbackHistoricoUpdateManyAndReturnArgs> = z.object({
  data: z.union([ FeedbackHistoricoUpdateManyMutationInputSchema,FeedbackHistoricoUncheckedUpdateManyInputSchema ]),
  where: FeedbackHistoricoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FeedbackHistoricoDeleteManyArgsSchema: z.ZodType<Prisma.FeedbackHistoricoDeleteManyArgs> = z.object({
  where: FeedbackHistoricoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const HistoricoRelatorioCreateArgsSchema: z.ZodType<Prisma.HistoricoRelatorioCreateArgs> = z.object({
  select: HistoricoRelatorioSelectSchema.optional(),
  include: HistoricoRelatorioIncludeSchema.optional(),
  data: z.union([ HistoricoRelatorioCreateInputSchema,HistoricoRelatorioUncheckedCreateInputSchema ]),
}).strict() ;

export const HistoricoRelatorioUpsertArgsSchema: z.ZodType<Prisma.HistoricoRelatorioUpsertArgs> = z.object({
  select: HistoricoRelatorioSelectSchema.optional(),
  include: HistoricoRelatorioIncludeSchema.optional(),
  where: HistoricoRelatorioWhereUniqueInputSchema,
  create: z.union([ HistoricoRelatorioCreateInputSchema,HistoricoRelatorioUncheckedCreateInputSchema ]),
  update: z.union([ HistoricoRelatorioUpdateInputSchema,HistoricoRelatorioUncheckedUpdateInputSchema ]),
}).strict() ;

export const HistoricoRelatorioCreateManyArgsSchema: z.ZodType<Prisma.HistoricoRelatorioCreateManyArgs> = z.object({
  data: z.union([ HistoricoRelatorioCreateManyInputSchema,HistoricoRelatorioCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const HistoricoRelatorioCreateManyAndReturnArgsSchema: z.ZodType<Prisma.HistoricoRelatorioCreateManyAndReturnArgs> = z.object({
  data: z.union([ HistoricoRelatorioCreateManyInputSchema,HistoricoRelatorioCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const HistoricoRelatorioDeleteArgsSchema: z.ZodType<Prisma.HistoricoRelatorioDeleteArgs> = z.object({
  select: HistoricoRelatorioSelectSchema.optional(),
  include: HistoricoRelatorioIncludeSchema.optional(),
  where: HistoricoRelatorioWhereUniqueInputSchema,
}).strict() ;

export const HistoricoRelatorioUpdateArgsSchema: z.ZodType<Prisma.HistoricoRelatorioUpdateArgs> = z.object({
  select: HistoricoRelatorioSelectSchema.optional(),
  include: HistoricoRelatorioIncludeSchema.optional(),
  data: z.union([ HistoricoRelatorioUpdateInputSchema,HistoricoRelatorioUncheckedUpdateInputSchema ]),
  where: HistoricoRelatorioWhereUniqueInputSchema,
}).strict() ;

export const HistoricoRelatorioUpdateManyArgsSchema: z.ZodType<Prisma.HistoricoRelatorioUpdateManyArgs> = z.object({
  data: z.union([ HistoricoRelatorioUpdateManyMutationInputSchema,HistoricoRelatorioUncheckedUpdateManyInputSchema ]),
  where: HistoricoRelatorioWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const HistoricoRelatorioUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.HistoricoRelatorioUpdateManyAndReturnArgs> = z.object({
  data: z.union([ HistoricoRelatorioUpdateManyMutationInputSchema,HistoricoRelatorioUncheckedUpdateManyInputSchema ]),
  where: HistoricoRelatorioWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const HistoricoRelatorioDeleteManyArgsSchema: z.ZodType<Prisma.HistoricoRelatorioDeleteManyArgs> = z.object({
  where: HistoricoRelatorioWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ReversaoValidacaoCreateArgsSchema: z.ZodType<Prisma.ReversaoValidacaoCreateArgs> = z.object({
  select: ReversaoValidacaoSelectSchema.optional(),
  include: ReversaoValidacaoIncludeSchema.optional(),
  data: z.union([ ReversaoValidacaoCreateInputSchema,ReversaoValidacaoUncheckedCreateInputSchema ]),
}).strict() ;

export const ReversaoValidacaoUpsertArgsSchema: z.ZodType<Prisma.ReversaoValidacaoUpsertArgs> = z.object({
  select: ReversaoValidacaoSelectSchema.optional(),
  include: ReversaoValidacaoIncludeSchema.optional(),
  where: ReversaoValidacaoWhereUniqueInputSchema,
  create: z.union([ ReversaoValidacaoCreateInputSchema,ReversaoValidacaoUncheckedCreateInputSchema ]),
  update: z.union([ ReversaoValidacaoUpdateInputSchema,ReversaoValidacaoUncheckedUpdateInputSchema ]),
}).strict() ;

export const ReversaoValidacaoCreateManyArgsSchema: z.ZodType<Prisma.ReversaoValidacaoCreateManyArgs> = z.object({
  data: z.union([ ReversaoValidacaoCreateManyInputSchema,ReversaoValidacaoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ReversaoValidacaoCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ReversaoValidacaoCreateManyAndReturnArgs> = z.object({
  data: z.union([ ReversaoValidacaoCreateManyInputSchema,ReversaoValidacaoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ReversaoValidacaoDeleteArgsSchema: z.ZodType<Prisma.ReversaoValidacaoDeleteArgs> = z.object({
  select: ReversaoValidacaoSelectSchema.optional(),
  include: ReversaoValidacaoIncludeSchema.optional(),
  where: ReversaoValidacaoWhereUniqueInputSchema,
}).strict() ;

export const ReversaoValidacaoUpdateArgsSchema: z.ZodType<Prisma.ReversaoValidacaoUpdateArgs> = z.object({
  select: ReversaoValidacaoSelectSchema.optional(),
  include: ReversaoValidacaoIncludeSchema.optional(),
  data: z.union([ ReversaoValidacaoUpdateInputSchema,ReversaoValidacaoUncheckedUpdateInputSchema ]),
  where: ReversaoValidacaoWhereUniqueInputSchema,
}).strict() ;

export const ReversaoValidacaoUpdateManyArgsSchema: z.ZodType<Prisma.ReversaoValidacaoUpdateManyArgs> = z.object({
  data: z.union([ ReversaoValidacaoUpdateManyMutationInputSchema,ReversaoValidacaoUncheckedUpdateManyInputSchema ]),
  where: ReversaoValidacaoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ReversaoValidacaoUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ReversaoValidacaoUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ReversaoValidacaoUpdateManyMutationInputSchema,ReversaoValidacaoUncheckedUpdateManyInputSchema ]),
  where: ReversaoValidacaoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ReversaoValidacaoDeleteManyArgsSchema: z.ZodType<Prisma.ReversaoValidacaoDeleteManyArgs> = z.object({
  where: ReversaoValidacaoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProfessorCursoCreateArgsSchema: z.ZodType<Prisma.ProfessorCursoCreateArgs> = z.object({
  select: ProfessorCursoSelectSchema.optional(),
  include: ProfessorCursoIncludeSchema.optional(),
  data: z.union([ ProfessorCursoCreateInputSchema,ProfessorCursoUncheckedCreateInputSchema ]),
}).strict() ;

export const ProfessorCursoUpsertArgsSchema: z.ZodType<Prisma.ProfessorCursoUpsertArgs> = z.object({
  select: ProfessorCursoSelectSchema.optional(),
  include: ProfessorCursoIncludeSchema.optional(),
  where: ProfessorCursoWhereUniqueInputSchema,
  create: z.union([ ProfessorCursoCreateInputSchema,ProfessorCursoUncheckedCreateInputSchema ]),
  update: z.union([ ProfessorCursoUpdateInputSchema,ProfessorCursoUncheckedUpdateInputSchema ]),
}).strict() ;

export const ProfessorCursoCreateManyArgsSchema: z.ZodType<Prisma.ProfessorCursoCreateManyArgs> = z.object({
  data: z.union([ ProfessorCursoCreateManyInputSchema,ProfessorCursoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProfessorCursoCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProfessorCursoCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProfessorCursoCreateManyInputSchema,ProfessorCursoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProfessorCursoDeleteArgsSchema: z.ZodType<Prisma.ProfessorCursoDeleteArgs> = z.object({
  select: ProfessorCursoSelectSchema.optional(),
  include: ProfessorCursoIncludeSchema.optional(),
  where: ProfessorCursoWhereUniqueInputSchema,
}).strict() ;

export const ProfessorCursoUpdateArgsSchema: z.ZodType<Prisma.ProfessorCursoUpdateArgs> = z.object({
  select: ProfessorCursoSelectSchema.optional(),
  include: ProfessorCursoIncludeSchema.optional(),
  data: z.union([ ProfessorCursoUpdateInputSchema,ProfessorCursoUncheckedUpdateInputSchema ]),
  where: ProfessorCursoWhereUniqueInputSchema,
}).strict() ;

export const ProfessorCursoUpdateManyArgsSchema: z.ZodType<Prisma.ProfessorCursoUpdateManyArgs> = z.object({
  data: z.union([ ProfessorCursoUpdateManyMutationInputSchema,ProfessorCursoUncheckedUpdateManyInputSchema ]),
  where: ProfessorCursoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProfessorCursoUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ProfessorCursoUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ProfessorCursoUpdateManyMutationInputSchema,ProfessorCursoUncheckedUpdateManyInputSchema ]),
  where: ProfessorCursoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProfessorCursoDeleteManyArgsSchema: z.ZodType<Prisma.ProfessorCursoDeleteManyArgs> = z.object({
  where: ProfessorCursoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;