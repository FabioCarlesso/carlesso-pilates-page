/**
 * Conteúdo que a Claudia revisa: equipe, planos, FAQ e depoimentos, em
 * src/content/*.yml. Cada arquivo é um objeto cujas chaves são os ids. O Astro
 * não preserva a ordem do arquivo: a página ordena pelo campo `ordem`.
 *
 * Campo opcional ausente = dado ainda não informado: o bloco correspondente
 * não aparece (docs/REVISAO-PLANEJAMENTO.md, 4.1). O que não pode ir ao ar sem
 * um dado — depoimento sem autorização, por exemplo — é barrado aqui, no build.
 */
import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

import { contextosWhatsApp } from './config/site';

const texto = z.string().trim().min(1);
/** Posição na página (1, 2, 3…). */
const ordem = z.number().int();

const equipe = defineCollection({
  loader: file('src/content/equipe.yml'),
  schema: z.object({
    ordem,
    nome: texto,
    /** Ex.: "Fisioterapeuta · Responsável técnica". */
    papel: texto,
    bio: texto,
    /** Registro no CREFITO-8. Pendente: exigência a confirmar (docs/context.md). */
    crefito: texto.optional()
  })
});

const planos = defineCollection({
  loader: file('src/content/planos.yml'),
  schema: z.object({
    ordem,
    nome: texto,
    titulo: texto,
    descricao: texto,
    /** Mensagem do WhatsApp (src/config/site.ts). */
    contexto: z.enum(contextosWhatsApp),
    cta: texto,
    /** Sem frequência e valor, o card pede para consultar pelo WhatsApp. */
    frequencia: texto.optional(),
    valor: texto.optional()
  })
});

const faq = defineCollection({
  loader: file('src/content/faq.yml'),
  schema: z.object({
    ordem,
    pergunta: texto,
    /** Pergunta sem resposta não aparece. `{endereco}` vira o endereço de site.ts. */
    resposta: texto.optional()
  })
});

const depoimentos = defineCollection({
  loader: file('src/content/depoimentos.yml'),
  schema: z.object({
    autor: texto,
    texto,
    /** Data da autorização por escrito do aluno (LGPD). Sem ela, o build falha. */
    autorizadoEm: z.coerce.date()
  })
});

export const collections = { equipe, planos, faq, depoimentos };
