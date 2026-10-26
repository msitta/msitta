# TrendLine

Linha de tendência para uma série temporal, com o valor escrito em cada ponto.

Use quando a pergunta do painel é "como isso mudou ao longo do tempo". Para comparar categorias sem ordem temporal, use `BarChart`.

## O que o consumidor fornece

- **Série** — pares de período e valor, em ordem cronológica. Até doze pontos; acima disso, o rótulo de valor em cada ponto começa a colidir e a série pede agregação.
- **Rótulos de período** — abreviados (`Jan`, `Fev`), no estilo `label`, em `soft-lavender`.
- **Título do eixo horizontal** — o recorte temporal (`Meses de 2026`).
- **Escala vertical** — começando em zero, com marcação no estilo `axis`.

O painel é `deep-imperial-purple` com `radius-md` e padding `space-4`.

## Regras

- A série inteira é de uma cor só: `neon-pink` por padrão, ou `synthwave-cyan` quando esta for a série primária do painel. Traço de 2,5px, pontos de `radius-full` na mesma cor.
- Marque em `sunset-orange` o ponto que representa queda de tendência ou desvio de meta — é a função que o manual dá a essa cor. Um ponto, não a linha inteira.
- O valor vai escrito a `space-1` acima do ponto, no estilo `value`, em `pastel-cream`. Num ponto de queda, o valor continua em `pastel-cream`: a cor laranja fica no marcador, não no texto.
- Grade só nas horizontais, em `indigo`, 1px.
- Sem área preenchida sob a linha e sem gradiente. O plano de fundo pertence aos 60% e não recebe cor de dado.
- Duas séries no mesmo gráfico no máximo, uma em `synthwave-cyan` e outra em `neon-pink`, cada uma com legenda nomeada.
