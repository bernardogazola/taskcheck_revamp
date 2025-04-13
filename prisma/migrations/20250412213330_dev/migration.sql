-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'COORDENADOR', 'PROFESSOR', 'ALUNO');

-- CreateEnum
CREATE TYPE "StatusRelatorio" AS ENUM ('AGUARDANDO_VALIDACAO', 'INVALIDO', 'VALIDO', 'RECATEGORIZACAO');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT 'ALUNO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "password" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "curso" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,

    CONSTRAINT "curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aluno" (
    "id_usuario" TEXT NOT NULL,
    "matricula" INTEGER NOT NULL,
    "id_curso" INTEGER NOT NULL,

    CONSTRAINT "aluno_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "professor" (
    "id_usuario" TEXT NOT NULL,

    CONSTRAINT "professor_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "coordenador" (
    "id_usuario" TEXT NOT NULL,
    "id_curso_responsavel" INTEGER NOT NULL,

    CONSTRAINT "coordenador_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "categoria" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" TEXT NOT NULL,
    "carga_horaria" INTEGER NOT NULL,
    "id_curso" INTEGER NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relatorio_atividade" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "texto_reflexao" TEXT NOT NULL,
    "data_realizacao" DATE NOT NULL,
    "data_envio" DATE NOT NULL,
    "status" "StatusRelatorio" NOT NULL DEFAULT 'AGUARDANDO_VALIDACAO',
    "horas_validadas" INTEGER NOT NULL,
    "certificado" BYTEA NOT NULL,
    "id_aluno" TEXT NOT NULL,
    "id_categoria" INTEGER NOT NULL,

    CONSTRAINT "relatorio_atividade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" SERIAL NOT NULL,
    "texto_feedback" TEXT NOT NULL,
    "data_envio" DATE NOT NULL,
    "id_professor" TEXT NOT NULL,
    "id_relatorio" INTEGER NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback_historico" (
    "id" SERIAL NOT NULL,
    "id_feedback" INTEGER,
    "id_relatorio" INTEGER NOT NULL,
    "texto_feedback" TEXT NOT NULL,
    "data_envio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_professor" TEXT,
    "versao" INTEGER,

    CONSTRAINT "feedback_historico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historico_relatorio_atividade" (
    "id" SERIAL NOT NULL,
    "id_relatorio" INTEGER NOT NULL,
    "nome_anterior" VARCHAR(100),
    "texto_reflexao_anterior" TEXT,
    "data_realizacao_anterior" DATE,
    "status_anterior" "StatusRelatorio",
    "data_alteracao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "certificado_anterior" BYTEA,

    CONSTRAINT "historico_relatorio_atividade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professor_curso" (
    "id_professor" TEXT NOT NULL,
    "id_curso" INTEGER NOT NULL,

    CONSTRAINT "professor_curso_pkey" PRIMARY KEY ("id_professor","id_curso")
);

-- CreateTable
CREATE TABLE "reversao_validacao" (
    "id" SERIAL NOT NULL,
    "id_relatorio" INTEGER NOT NULL,
    "justificativa" TEXT NOT NULL,
    "data_reversao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_professor" TEXT NOT NULL,

    CONSTRAINT "reversao_validacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aluno" ADD CONSTRAINT "aluno_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aluno" ADD CONSTRAINT "aluno_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professor" ADD CONSTRAINT "professor_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coordenador" ADD CONSTRAINT "coordenador_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coordenador" ADD CONSTRAINT "coordenador_id_curso_responsavel_fkey" FOREIGN KEY ("id_curso_responsavel") REFERENCES "curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categoria" ADD CONSTRAINT "categoria_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relatorio_atividade" ADD CONSTRAINT "relatorio_atividade_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "aluno"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relatorio_atividade" ADD CONSTRAINT "relatorio_atividade_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "professor"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_id_relatorio_fkey" FOREIGN KEY ("id_relatorio") REFERENCES "relatorio_atividade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_historico" ADD CONSTRAINT "feedback_historico_id_feedback_fkey" FOREIGN KEY ("id_feedback") REFERENCES "feedback"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_historico" ADD CONSTRAINT "feedback_historico_id_relatorio_fkey" FOREIGN KEY ("id_relatorio") REFERENCES "relatorio_atividade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_historico" ADD CONSTRAINT "feedback_historico_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "professor"("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historico_relatorio_atividade" ADD CONSTRAINT "historico_relatorio_atividade_id_relatorio_fkey" FOREIGN KEY ("id_relatorio") REFERENCES "relatorio_atividade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professor_curso" ADD CONSTRAINT "professor_curso_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "professor"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professor_curso" ADD CONSTRAINT "professor_curso_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reversao_validacao" ADD CONSTRAINT "reversao_validacao_id_relatorio_fkey" FOREIGN KEY ("id_relatorio") REFERENCES "relatorio_atividade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reversao_validacao" ADD CONSTRAINT "reversao_validacao_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "professor"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
