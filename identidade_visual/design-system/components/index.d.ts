/**
 * The Synthwave Horizon — tipos dos componentes.
 *
 * O bundle é um script clássico: ele lê `window.React` e publica
 * `window.SynthwaveHorizon`. Estes tipos servem de documentação da API; não
 * há build step nem pacote npm.
 */

import type { CSSProperties, ReactNode } from 'react';

/** Cor de série. Define a borda e a etiqueta de um KPI, o traço de uma linha. */
export type SeriesColor = 'cyan' | 'pink';

/** Cor de preenchimento de barra. `orange` é o terceiro grupo de categorias. */
export type BarSeriesColor = 'cyan' | 'pink' | 'orange';

export interface KpiCardProps {
  /** Nome da métrica, em uma linha curta. Vai em caixa alta pelo CSS. */
  label?: ReactNode;
  /** O número já formatado, com unidade colada: `100%`, `R$ 1,2 mi`. */
  value: ReactNode;
  /** Cor da etiqueta e da borda. Padrão: `cyan`. */
  series?: SeriesColor;
  className?: string;
  style?: CSSProperties;
}

export interface BarDatum {
  /** Rótulo da categoria, à esquerda da barra. */
  label: ReactNode;
  /** Valor na mesma unidade de `max`. */
  value: number;
  /** Cor da barra. Padrão: `cyan`. */
  series?: BarSeriesColor;
  /**
   * Força (`true`) ou impede (`false`) o destaque de recorde em
   * `yellow-accent`. Sem isso, o maior valor é o recorde.
   */
  record?: boolean;
}

export interface BarChartProps {
  /** Título do painel. */
  title?: ReactNode;
  data: BarDatum[];
  /** Topo da escala. Padrão: 100. O eixo sempre começa em zero. */
  max?: number;
  /** Sufixo escrito junto de cada valor: `%`, ` un`. */
  unit?: string;
  /** Número de intervalos do eixo. Padrão: 5. */
  ticks?: number;
  /** Rótulo do eixo de valor: `Proficiência (%)`. */
  axisTitle?: ReactNode;
  /** `false` desliga o destaque automático do maior valor. */
  highlightRecord?: boolean;
  /** Descrição do gráfico para leitor de tela. Sem isso, usa `title`. */
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}

export interface TrendDatum {
  /** Rótulo do período: `Jan`, `2026-Q1`. */
  label: ReactNode;
  value: number;
  /**
   * Marca o ponto como queda de tendência ou desvio de meta: o marcador vai
   * para `sunset-orange` e o rótulo de valor desce, para não tocar a linha.
   */
  alert?: boolean;
}

export interface TrendLineProps {
  title?: ReactNode;
  data: TrendDatum[];
  /** Topo da escala. Padrão: 100. O eixo sempre começa em zero. */
  max?: number;
  /** Número de intervalos do eixo vertical. Padrão: 8. */
  ticks?: number;
  /** Cor da série. Padrão: `pink`. */
  series?: SeriesColor;
  unit?: string;
  /** Rótulo do eixo de tempo: `Meses de 2026`. */
  axisTitle?: ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}

export declare const KpiCard: (props: KpiCardProps) => JSX.Element;
export declare const BarChart: (props: BarChartProps) => JSX.Element;
export declare const TrendLine: (props: TrendLineProps) => JSX.Element;
export declare const version: string;
