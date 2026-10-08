import { site } from '../config/site';

/**
 * JSON-LD do estúdio, gerado de `site` para não divergir do que a página mostra.
 * Validar no Rich Results Test a cada mudança (docs/ANALISE-PROJETO.md, seção 10).
 * Campos pendentes (`geo`, `openingHours`, `image`) só entram quando informados.
 */
export function schemaEstudio() {
  const { endereco } = site;
  return {
    '@context': 'https://schema.org',
    '@type': 'HealthClub',
    name: site.nome,
    description: site.descricao,
    url: site.url,
    telephone: `+${site.telefone.e164}`,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${endereco.logradouro} - ${endereco.complemento} - ${endereco.bairro}`,
      addressLocality: endereco.cidade,
      addressRegion: endereco.uf,
      postalCode: endereco.cep,
      addressCountry: 'BR'
    },
    sameAs: Object.values(site.redes),
    ...(site.geo && {
      geo: { '@type': 'GeoCoordinates', latitude: site.geo.latitude, longitude: site.geo.longitude }
    }),
    ...(site.horario && { openingHours: site.horario })
  };
}
