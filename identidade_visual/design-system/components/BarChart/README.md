# BarChart

Barras horizontais para comparar categorias nomeadas, com o valor escrito ao lado de cada barra.

Use quando os rótulos de categoria são palavras — nomes de ferramenta, de produto, de região — e não cabem embaixo de barras verticais sem girar o texto. Barra girada é o atalho que produz sobreposição; aqui não existe.

## O que o consumidor fornece

- **Categorias** — uma linha de texto por barra, no estilo `label`, em `soft-lavender`, alinhada à direita contra a área do gráfico.
- **Valores** — já formatados com unidade, no estilo `value`, em `pastel-cream`, a `space-1` da ponta da barra.
- **Título do eixo** — a unidade da medida (`Proficiência (%)`), quando o valor por si não a declara.
- **Ordenação** — do maior para o menor, salvo quando a categoria tem ordem própria (meses, faixas etárias).

O painel é `deep-imperial-purple` com `radius-md` e padding `space-4`; as barras têm `radius-sm` e ficam a `space-3` uma da outra.

## Regras

- Série única em `synthwave-cyan`. O recorde — maior valor, meta batida — vai em `yellow-accent`: é a função que o manual dá a essa cor, e é o que mantém a proporção de 10% de acento.
- Para uma segunda série no mesmo gráfico, use `neon-pink`; uma terceira, `sunset-orange`. Não passe disso: quatro cores de dados num só gráfico apagam a hierarquia.
- Grade só nas verticais, em `indigo`, 1px, por trás das barras.
- Escreva o valor em toda barra. O eixo numérico fica como referência secundária, nunca como única forma de ler o dado.
- O eixo de valor começa em zero. Barra truncada mente sobre a proporção.
