/**
 * Valida que todo `var(--token)` de `src/` aponta para uma custom property que
 * existe de fato.
 *
 * Trazido do sistema (FabioCarlesso/carlessopilatesfe, scripts/lint-tokens.mjs)
 * e adaptado ao site: vários arquivos de tokens globais e arquivos `.astro`.
 *
 * Motivação no sistema (issue #213): `var(--inexistente)` sem fallback torna a declaração
 * inválida no momento da computação (CSS Variables 1, §3.2) — a propriedade cai
 * para o valor herdado ou inicial. Não há erro de build, aviso de lint nem falha
 * de teste: quatro telas do prontuário renderizaram por meses com fundo
 * transparente, borda em `currentColor` e cantos retos sem que nada sinalizasse.
 *
 * O nome é validado mesmo quando há fallback (`var(--x, 1rem)`). O fallback
 * evita o sintoma visual, mas congela um literal do tema claro e faz o estilo
 * escapar do `[data-theme="dark"]` — foi exatamente o que escondeu os badges de
 * `/admin/usuarios` e os espaçamentos de `/perfil/alterar-senha`.
 *
 * Um nome é válido se estiver declarado num dos `ARQUIVOS_TOKENS` (os tokens do
 * Design System e os do site) ou em qualquer arquivo da **mesma pasta** de quem
 * o usa — uma variável local declarada no `<style>` de um componente e
 * consumida por outro componente da mesma pasta, por exemplo.
 *
 * Limites conhecidos: um `var()` montado por concatenação em tempo de execução
 * (`` `var(--${nome})` ``) não é analisável estaticamente e passa sem conferência.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = fileURLToPath(new URL('..', import.meta.url));
const DIR_FONTE = join(RAIZ, 'src');
const ARQUIVOS_TOKENS = ['tokens.css', 'tokens-site.css'].map(nome => join(DIR_FONTE, 'styles', nome));
const EXTENSOES = ['.css', '.astro', '.ts', '.mdx'];

/**
 * `var(--nome` com ou sem fallback. Aplicado ao arquivo inteiro, e não linha a
 * linha, para pegar também o `var(` quebrado em várias linhas — que era
 * exatamente o formato capaz de escapar da versão anterior desta verificação.
 */
const USO = /var\(\s*(--[\w-]+)\s*([,)])/g;
/**
 * `--nome:` em posição de declaração. Além de início de linha, `;` e `{`, aceita
 * `"` e `'` para reconhecer a primeira propriedade de um `style="--x: 4px"`.
 */
const DECLARACAO = /(?:^|[;{"'])\s*(--[\w-]+)\s*:/gm;

/** Apaga um trecho preservando as quebras de linha (e com elas os offsets). */
const emBranco = trecho => trecho.replace(/[^\n]/g, ' ');

/**
 * Troca comentários por espaços, preservando offsets e quebras de linha para os
 * números de linha continuarem válidos.
 *
 * Sem isso a verificação erra nas duas direções: uma custom property escrita
 * dentro de um bloco `/* *\/` era lida como declaração e **whitelistava** o nome,
 * e uma menção a `var(--x)` em comentário era acusada como uso.
 *
 * Em SCSS/CSS/TS a varredura é caractere a caractere porque `//` também aparece
 * dentro de string — o data URI de `--select-chevron` traz
 * `http://www.w3.org/2000/svg` — e um regex ingênuo cortaria o valor no meio. As
 * strings ficam intactas: em `.ts` há uso legítimo de `var()` dentro delas. Em
 * HTML só existe `<!-- -->`, e ali não se rastreia string alguma: apóstrofo de
 * texto corrido (`aria-label`, conteúdo) engoliria o resto do arquivo.
 *
 * Um `.astro` mistura os dois: o frontmatter (entre os `---` iniciais) é
 * TypeScript e vai pela varredura de código; o resto é template, tratado como
 * HTML, mais os blocos `/* *\/` dos `<style>` removidos por regex, sem
 * rastrear strings — pelo mesmo motivo do apóstrofo.
 */
function semComentarios(conteudo, caminho) {
  if (caminho.endsWith('.astro')) {
    const frontmatter = /^---\r?\n[\s\S]*?\r?\n---/.exec(conteudo);
    const fim = frontmatter ? frontmatter[0].length : 0;
    return semComentariosDeCodigo(conteudo.slice(0, fim)) + semComentariosDeTemplate(conteudo.slice(fim));
  }
  if (caminho.endsWith('.mdx')) {
    return semComentariosDeTemplate(conteudo);
  }
  return semComentariosDeCodigo(conteudo);
}

function semComentariosDeTemplate(conteudo) {
  return conteudo.replace(/<!--[\s\S]*?-->/g, emBranco).replace(/\/\*[\s\S]*?\*\//g, emBranco);
}

function semComentariosDeCodigo(conteudo) {

  // `split('')` e não `[...conteudo]`: o spread itera por *code point* e junta o
  // par surrogate de um emoji num só elemento, enquanto o laço abaixo indexa por
  // *code unit* (`conteudo[i]`). Um único caractere fora do BMP desalinharia as
  // duas indexações e o `saida[i] = ' '` passaria a apagar a posição errada —
  // comendo o `v` de um `var(` colado a um comentário e deixando o uso passar.
  const saida = conteudo.split('');
  let estado = 'codigo';
  let aspa = '';

  for (let i = 0; i < conteudo.length; i++) {
    const atual = conteudo[i];
    const proximo = conteudo[i + 1];

    if (estado === 'codigo') {
      if (atual === '"' || atual === "'" || atual === '`') {
        estado = 'string';
        aspa = atual;
      } else if (atual === '/' && proximo === '*') {
        estado = 'bloco';
        saida[i] = saida[i + 1] = ' ';
        i++;
      } else if (atual === '/' && proximo === '/') {
        estado = 'linha';
        saida[i] = saida[i + 1] = ' ';
        i++;
      }
    } else if (estado === 'string') {
      if (atual === '\\') {
        i++;
      } else if (atual === aspa) {
        estado = 'codigo';
      }
    } else if (estado === 'bloco') {
      if (atual === '*' && proximo === '/') {
        saida[i] = saida[i + 1] = ' ';
        i++;
        estado = 'codigo';
      } else if (atual !== '\n') {
        saida[i] = ' ';
      }
    } else if (atual === '\n') {
      estado = 'codigo';
    } else {
      saida[i] = ' ';
    }
  }

  return saida.join('');
}

function listarArquivos(dir) {
  return readdirSync(dir).flatMap(nome => {
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) {
      return listarArquivos(caminho);
    }
    return EXTENSOES.some(ext => nome.endsWith(ext)) ? [caminho] : [];
  });
}

function nomesDeclarados(conteudo) {
  return Array.from(conteudo.matchAll(DECLARACAO), ([, nome]) => nome);
}

const linhaDo = (conteudo, offset) => conteudo.slice(0, offset).split('\n').length;

const tokensGlobais = new Set();
for (const arquivo of ARQUIVOS_TOKENS) {
  const nomes = nomesDeclarados(semComentarios(readFileSync(arquivo, 'utf8'), arquivo));
  if (nomes.length === 0) {
    console.error(`Nenhum token encontrado em ${relative(RAIZ, arquivo)} — verificação abortada.`);
    process.exit(1);
  }
  nomes.forEach(nome => tokensGlobais.add(nome));
}

// Uma passada só para limpar os comentários e juntar as declarações por pasta;
// a conferência dos usos vem depois, já com o escopo local completo.
const arquivos = listarArquivos(DIR_FONTE).map(caminho => ({
  caminho,
  conteudo: semComentarios(readFileSync(caminho, 'utf8'), caminho)
}));

const declaradosNaPasta = new Map();
for (const { caminho, conteudo } of arquivos) {
  const pasta = dirname(caminho);
  const nomes = declaradosNaPasta.get(pasta) ?? new Set();
  for (const nome of nomesDeclarados(conteudo)) {
    nomes.add(nome);
  }
  declaradosNaPasta.set(pasta, nomes);
}

const violacoes = [];

for (const { caminho, conteudo } of arquivos) {
  if (!conteudo.includes('var(')) {
    continue;
  }

  const locais = declaradosNaPasta.get(dirname(caminho));

  for (const achado of conteudo.matchAll(USO)) {
    const [, nome, separador] = achado;
    if (tokensGlobais.has(nome) || locais.has(nome)) {
      continue;
    }
    violacoes.push({
      arquivo: relative(RAIZ, caminho),
      linha: linhaDo(conteudo, achado.index),
      nome,
      comFallback: separador === ','
    });
  }
}

if (violacoes.length > 0) {
  console.error(`\n✗ ${violacoes.length} uso(s) de token CSS inexistente em src/:\n`);
  for (const { arquivo, linha, nome, comFallback } of violacoes) {
    const efeito = comFallback
      ? 'usa o fallback literal e ignora o tema escuro'
      : 'declaração inválida: a propriedade cai para o valor herdado/inicial';
    console.error(`  ${arquivo}:${linha}  ${nome}  — ${efeito}`);
  }
  console.error(
    '\nUse um token declarado em src/styles/tokens.css ou tokens-site.css'
    + ' (--bg-* e --tom-* para superfície, --sp-* para espaçamento, --r-* para raio)'
    + ' ou declare a variável na pasta do próprio componente.\n'
  );
  process.exit(1);
}

console.log(`✓ Todos os var(--token) de src/ apontam para tokens declarados (${tokensGlobais.size} tokens no Design System e no site).`);
