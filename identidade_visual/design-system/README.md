Este sistema veste painéis e gráficos de análise de dados. A estética é retro-futurista — a computação pessoal dos anos 80 — e ela existe para um fim prático: o contraste vivo puxa o olhar na primeira fração de segundo, e a disciplina com que as cores são distribuídas é o que separa um painel de portfólio de um painel amador.

Use este sistema para dashboards, estudos de caso e peças de portfólio em modo escuro. Não o use para documento corrido, formulário denso ou qualquer superfície clara: não existe tema claro aqui, e inventar um quebra a identidade.

## Fundamentos de conteúdo

Escreva em português do Brasil, direto e sem adjetivo de venda. Um título nomeia o recorte, não o sentimento: `ANALISTA DE DADOS — DASHBOARD DE PERFORMANCE (PORTFÓLIO)`, `Proficiência em Tecnologias de Dados`, `Tráfego do Portfólio (Mensal)`.

Títulos de painel e etiquetas de KPI vão em CAIXA ALTA, no estilo `display-lg` e `display-sm`. Títulos de gráfico vão em caixa normal, no estilo `heading` — a face pixel em frase longa fica ilegível.

Toda unidade aparece junto do número: `82%`, `720`, `15`. Toda etiqueta de KPI diz o que a métrica é antes de o número aparecer (`MÉTRICA CHAVE`, `PROJETOS DE PORTFÓLIO`), no estilo `kicker`.

Rode uma nota de origem dos dados no rodapé de todo painel, no estilo `caption`, e diga quando o dado é simulado: `Fonte: Métricas de Portfólio Simuladas (2026) | Projeto de Identidade Synthwave`. Dado inventado sem essa etiqueta compromete o painel inteiro.

Nada de emoji. Nada de ícone decorativo.

## Fundamentos visuais

### A regra proporcional — 60 / 30 / 10

É a regra central do sistema. Toda tela se divide assim:

- **60% dominante, o plano de fundo.** `deep-violet-space` no fundo do painel e `deep-imperial-purple` nos cartões, cabeçalhos de tabela e cards. Essa dupla dá o contraste máximo sem ofuscar o dado.
- **30% estrutura de trabalho, os dados.** `synthwave-cyan` na série primária e `neon-pink` na secundária. Elas diferenciam categorias concorrentes; não as misture dentro de uma mesma série.
- **10% acento crítico, a atenção.** `yellow-accent` em recorde de meta e alerta crítico, `sunset-orange` em ponto de atenção, queda de tendência ou terceiro grupo. Fora disso, não use nenhuma das duas — um painel que pinta tudo de amarelo não destaca nada.

### Cor

Texto principal, título e rótulo de dado crítico em `pastel-cream`. Rótulo secundário e texto de apoio em `soft-lavender`. Linha de grade e divisor em `indigo`, e só isso: `indigo` tem 1,4:1 contra o fundo, então nunca desenhe com ele uma borda de controle, um foco ou qualquer marca que carregue significado.

Dirija o olhar por contraste, não por tamanho: a métrica principal recebe a cor mais quente ou mais brilhante, o apoio e a grade ficam em roxo de baixo brilho.

Uma série de dados é identificada por cor **e** por rótulo de valor colado ao elemento. Cor sozinha nunca é a única pista.

`neon-pink` sobre `deep-imperial-purple` dá 3,9:1 — abaixo do mínimo de texto pequeno. Sobre esse fundo use `neon-pink` só como preenchimento de barra, borda ou número de 24px ou mais; para rótulo pequeno em cima de cartão, troque por `pastel-cream`. O par vem assim do manual e foi mantido exato.

### Tipografia

Três famílias, cada uma com um trabalho:

- `display` (Press Start 2P) — só título de painel, subtítulo de seção e etiqueta de KPI. Nunca texto corrido, nunca abaixo de 10px.
- `sans` (IBM Plex Sans) — título de gráfico, texto corrido, rótulo de categoria e nota de rodapé.
- `mono` (IBM Plex Mono) — todo número: métrica de KPI, rótulo de valor e marcação de eixo. É mono para que os dígitos alinhem em coluna entre linhas da tabela e do gráfico.

As três faces são servidas pelo próprio sistema, em `fonts/`: Press Start 2P como TTF, IBM Plex Sans e IBM Plex Mono em woff2, nos pesos 400, 500 e 600. Use esses arquivos.

Não puxe Press Start 2P do Google Fonts. O arquivo servido aqui cobre todos os acentos do português — `Á`, `Ã`, `Ç`, `É` e os demais, 656 caracteres ao todo. O subconjunto `latin` que a API de CSS do Google entrega para essa família, não: o navegador troca glifo por glifo no meio da palavra e a linha quebra.

A face `display` depende de tamanho. A 24px ela é a assinatura do sistema; a 11px fica ilegível. Por isso a etiqueta de KPI (`kicker`) vive em `sans`, como no protótipo, e títulos longos em caixa alta ficam melhor em `display-sm` do que espremidos em `display-lg`.

### Espaçamento, raio e bordas

A escala de espaçamento é de 8px. Use `space-4` no padding interno de cartão, `space-5` entre cartões vizinhos e `space-6` entre blocos do painel — essa folga é o que garante zero sobreposição textual entre rótulo, eixo e legenda. Rótulo de valor fica a `space-1` do elemento que descreve.

Cartão e painel de gráfico usam `radius-md`; o container externo, `radius-lg`; barra e badge, `radius-sm`; ponto de série, `radius-full`.

O sistema separa planos por cor, não por sombra: não há token de sombra e nenhuma peça deve usar uma. Quando um cartão precisa de borda, use uma linha de 1px na cor da série que ele representa — `synthwave-cyan` ou `neon-pink` — e nunca em `indigo`.

### Gráficos

Escreva o valor ao lado de cada barra e de cada ponto, no estilo `value`, em `pastel-cream`. Eixo numérico em `axis`, categoria em `label`, ambos em `soft-lavender`. Grade só nas linhas horizontais, em `indigo`, 1px.

Em barras, cada categoria pode receber uma cor diferente da paleta de dados; em linha de tendência, a série inteira é de uma cor só, com os pontos no mesmo tom. Não aplique gradiente: o manual fala em "máximos de gradientes" como função de `neon-pink`, ou seja, o extremo de uma escala sequencial, não um degradê decorativo de fundo.

## Componentes

Os três elementos do protótipo vêm prontos no bundle, sob o global `SynthwaveHorizon`: `KpiCard` para a métrica única, `BarChart` para comparação entre categorias nomeadas e `TrendLine` para série temporal. A única dependência é o React 18.

Monte um painel novo a partir deles, não a partir de CSS escrito do zero: as regras de cor, folga e rótulo acima já estão dentro dos componentes, e refazê-las à mão é como a identidade se perde entre um projeto e outro.

Passe o dado como dado — `data: [{ label, value }]` — e deixe a formatação com o componente. Unidade vai em `unit`, nunca colada dentro de `label`.

Quando o painel pedir um gráfico que não existe aqui (dispersão, mapa de calor, pizza), use a biblioteca que preferir e puxe as cores dos tokens, respeitando a mesma regra 60/30/10. Não estenda o bundle com um gráfico de uma só vez.

Cada componente aceita `className` e `style` para posicionamento externo; largura e grade do painel são responsabilidade de quem consome. Não sobrescreva cor, fonte nem raio por fora — se um valor precisa mudar, ele muda no token.

## Iconografia

O manual não define sistema de ícones, nem traz glifo, fonte de ícones ou SVG. Até que um seja definido, não use ícone nenhum: estado e categoria se dizem por palavra e por cor. Se precisar de um, escolha um conjunto monotraço e registre a escolha aqui antes de usá-lo em peça publicada.

## Marca

O manual não traz logotipo. O nome do sistema se escreve em texto puro, `THE SYNTHWAVE HORIZON` no estilo `display-lg`, em `pastel-cream`. Não desenhe uma marca nem a reconstrua de memória.

## Assets

`assets/Prototipo/` guarda a Figura 1 do manual, o protótipo de dashboard aprovado. Consulte-a como referência de composição — proporção 60/30/10 aplicada, folga entre elementos, posição dos rótulos — e não como fonte de valores: os valores estão em `tokens.json`.
