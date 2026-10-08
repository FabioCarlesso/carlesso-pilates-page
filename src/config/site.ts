/**
 * Fonte única dos dados do estúdio. Topo, rodapé, links de WhatsApp e o JSON-LD
 * saem daqui — nenhum telefone, endereço ou URL de WhatsApp escrito à mão em
 * componente. Assim o NAP (nome, endereço, telefone) fica idêntico em todo o
 * site, como o SEO local exige (docs/ANALISE-PROJETO.md, seção 10).
 *
 * Campo `undefined` = dado ainda não informado (docs/ANALISE-PROJETO.md, seção 9).
 * Quem consome deve omitir o bloco, nunca exibir um espaço vazio.
 */

export const site = {
  nome: 'Carlesso Pilates',
  url: 'https://carlessopilates.com.br',
  /** Provisória: a frase oficial está em aberto (docs/context.md). */
  sublinha: 'Pilates Clássico',
  posicionamento: '1º Studio de Pilates Clássico · Foz do Iguaçu/PR',
  descricao:
    'Pilates Clássico em Foz do Iguaçu: aulas presenciais em dueto ou Vip class, conduzidas por fisioterapeutas.',

  telefone: {
    /** Só dígitos, com DDI e DDD: usado no WhatsApp e no `tel:`. */
    e164: '5545999191006',
    exibicao: '(45) 99919-1006'
  },
  email: 'contato.carlesso@gmail.com',

  endereco: {
    logradouro: 'R. Minas Gerais, 552',
    complemento: 'Sala 02',
    bairro: 'Vila Maracanã',
    cidade: 'Foz do Iguaçu',
    uf: 'PR',
    cep: '85852-030'
  },
  /** Pendente: coordenadas para o JSON-LD (`geo`) e o link do mapa. */
  geo: undefined as { latitude: number; longitude: number } | undefined,
  /** Pendente: formato schema.org, ex. ['Mo-Fr 07:00-20:00']. */
  horario: undefined as string[] | undefined,

  redes: {
    instagram: 'https://www.instagram.com/carlessopilates/',
    facebook: 'https://www.facebook.com/claudiacarlessopilates/'
  },

  /** Links do menu principal. Entram conforme as seções da Home forem construídas. */
  navegacao: [] as { rotulo: string; href: string }[]
} as const;

/**
 * Mensagens pré-preenchidas por contexto. O "Vim pelo site." deixa a recepção
 * contar quantos contatos chegaram pelo site (docs/REVISAO-PLANEJAMENTO.md, 4.5).
 */
const mensagensWhatsApp = {
  geral: 'Gostaria de agendar uma aula.',
  dueto: 'Gostaria de agendar uma aula em dueto.',
  vip: 'Gostaria de agendar uma Vip class.',
  profissionais: 'Gostaria de saber mais sobre mentorias e treinamentos para profissionais.'
} as const;

export type ContextoWhatsApp = keyof typeof mensagensWhatsApp;

export function linkWhatsApp(contexto: ContextoWhatsApp = 'geral'): string {
  const texto = `Olá! Vim pelo site. ${mensagensWhatsApp[contexto]}`;
  return `https://wa.me/${site.telefone.e164}?text=${encodeURIComponent(texto)}`;
}

export const linkTelefone = `tel:+${site.telefone.e164}`;
export const linkEmail = `mailto:${site.email}`;

export function enderecoEmLinhas(): string[] {
  const { logradouro, complemento, bairro, cidade, uf, cep } = site.endereco;
  return [`${logradouro} · ${complemento}`, bairro, `${cidade} · ${uf} · ${cep}`];
}
