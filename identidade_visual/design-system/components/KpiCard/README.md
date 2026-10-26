# KpiCard

Cartão que apresenta uma métrica única, com etiqueta acima e número grande abaixo.

Use-o na faixa superior de um painel, para as duas ou três métricas que respondem à pergunta do painel antes de qualquer gráfico. Acima de quatro cartões lado a lado, o olhar para de hierarquizar: corte para o essencial ou empilhe em duas fileiras.

## O que o consumidor fornece

- **Etiqueta** — o nome da métrica em caixa alta, no estilo `kicker`, em uma linha curta.
- **Valor** — o número já formatado, com unidade colada (`100%`, `15`, `R$ 1,2 mi`), no estilo `metric-xl`.
- **Cor de série** — `synthwave-cyan` ou `neon-pink`, aplicada na etiqueta e na borda de 1px. É ela que amarra o cartão ao gráfico correspondente abaixo.

O container do cartão é `deep-imperial-purple` com `radius-md` e padding `space-4`; entre cartões, `space-5`.

## Regras

- A etiqueta recebe a cor da série; o valor fica sempre em `pastel-cream`. Número em `neon-pink` sobre o fundo do cartão daria 3,9:1 — abaixo do mínimo para texto.
- Um cartão, uma métrica. Não empilhe valor principal e variação percentual dentro do mesmo cartão sem separá-los por `space-2` e rebaixar a variação para o estilo `value`.
- Nada de sombra e nada de borda em `indigo`: o cartão se separa do fundo pela diferença entre `deep-imperial-purple` e `deep-violet-space`, reforçada pela borda da série.
- Nada de ícone. O manual não define conjunto de ícones.
