/* @ds-bundle: {"format":4,"namespace":"SynthwaveHorizon","components":[{"name":"KpiCard"},{"name":"BarChart"},{"name":"TrendLine"}]} */
(function (global) {
  'use strict';

  var React = global.React;
  if (!React || typeof React.createElement !== 'function') {
    throw new Error(
      'SynthwaveHorizon: carregue o React 18 (window.React) antes de bundle.js.'
    );
  }
  var h = React.createElement;

  /* ---- geometria compartilhada ------------------------------------------
     Os dois graficos desenham num viewBox de 660 x 316. As medidas sao as do
     prototipo do manual: nada aqui e arredondado para uma grade generica. */

  var VB_W = 660;
  var VB_H = 316;

  function num(v, fallback) {
    return typeof v === 'number' && isFinite(v) ? v : fallback;
  }

  function fmt(value, unit) {
    return String(value) + (unit || '');
  }

  /* ---- KpiCard ---------------------------------------------------------- */

  function KpiCard(props) {
    var p = props || {};
    var series = p.series === 'pink' ? 'pink' : 'cyan';
    var cls = 'ds ds-kpi' + (p.className ? ' ' + p.className : '');

    return h(
      'div',
      { className: cls, 'data-series': series, style: p.style },
      p.label ? h('p', { className: 'ds-kpi__kicker' }, p.label) : null,
      h('p', { className: 'ds-kpi__value' }, p.value)
    );
  }

  /* ---- BarChart ---------------------------------------------------------
     Barras horizontais. data: [{label, value, series?, record?}]. */

  function BarChart(props) {
    var p = props || {};
    var data = Array.isArray(p.data) ? p.data : [];
    var max = num(p.max, 100);
    var unit = p.unit || '';
    var ticks = num(p.ticks, 5);

    var LABEL_END = 140;
    var PLOT_X = 150;
    var PLOT_W = 400;
    var PLOT_TOP = 18;
    var ROW_H = 50;
    var BAR_H = 26;

    var plotBottom = PLOT_TOP + data.length * ROW_H + 4;
    var axisY = plotBottom + 18;
    var titleY = plotBottom + 38;
    var vbH = plotBottom + 44;

    /* o recorde so e marcado quando pedido; por padrao, o maior valor */
    var recordIndex = -1;
    if (p.highlightRecord !== false && data.length > 1) {
      var best = -Infinity;
      data.forEach(function (d, i) {
        var v = num(d.value, 0);
        if (v > best) { best = v; recordIndex = i; }
      });
    }

    var grid = [];
    for (var t = 0; t <= ticks; t++) {
      var gx = PLOT_X + (PLOT_W / ticks) * t;
      grid.push(
        h('line', {
          key: 'g' + t,
          className: 'ds-gridline',
          x1: gx, y1: PLOT_TOP, x2: gx, y2: plotBottom
        })
      );
    }

    var axis = [];
    for (var a = 0; a <= ticks; a++) {
      axis.push(
        h(
          'text',
          {
            key: 'a' + a,
            className: 'ds-axis',
            x: PLOT_X + (PLOT_W / ticks) * a,
            y: axisY,
            textAnchor: 'middle'
          },
          String(Math.round((max / ticks) * a))
        )
      );
    }

    var rows = [];
    data.forEach(function (d, i) {
      var center = PLOT_TOP + 24 + i * ROW_H;
      var value = num(d.value, 0);
      var w = Math.max(0, (value / max) * PLOT_W);
      var isRecord = d.record === true || (d.record !== false && i === recordIndex);

      rows.push(
        h('text', {
          key: 'c' + i,
          className: 'ds-cat',
          x: LABEL_END,
          y: center + 4,
          textAnchor: 'end'
        }, d.label),
        h('rect', {
          key: 'b' + i,
          className: 'ds-bar',
          'data-series': d.series || null,
          'data-record': isRecord ? 'true' : null,
          x: PLOT_X,
          y: center - BAR_H / 2,
          width: w,
          height: BAR_H
        }),
        h('text', {
          key: 'v' + i,
          className: 'ds-value',
          x: PLOT_X + w + 6,
          y: center + 4
        }, fmt(value, unit))
      );
    });

    return h(
      'div',
      {
        className: 'ds ds-panel' + (p.className ? ' ' + p.className : ''),
        style: p.style
      },
      p.title ? h('h3', { className: 'ds-panel__title' }, p.title) : null,
      h(
        'svg',
        {
          className: 'ds-panel__plot',
          viewBox: '0 0 ' + VB_W + ' ' + vbH,
          role: 'img',
          'aria-label': p.ariaLabel || p.title || 'Gráfico de barras'
        },
        h('g', null, grid),
        rows,
        axis,
        p.axisTitle
          ? h('text', {
              className: 'ds-axis-title',
              x: PLOT_X + PLOT_W / 2,
              y: titleY,
              textAnchor: 'middle'
            }, p.axisTitle)
          : null
      )
    );
  }

  /* ---- TrendLine --------------------------------------------------------
     Serie temporal. data: [{label, value, alert?}]. */

  function TrendLine(props) {
    var p = props || {};
    var data = Array.isArray(p.data) ? p.data : [];
    var max = num(p.max, 100);
    var ticks = num(p.ticks, 8);
    var series = p.series === 'cyan' ? 'cyan' : 'pink';
    var unit = p.unit || '';

    var PLOT_L = 70;
    var PLOT_R = 630;
    var PLOT_TOP = 20;
    var PLOT_BOTTOM = 260;
    var FIRST_X = 90;
    var LAST_X = 600;
    var PLOT_H = PLOT_BOTTOM - PLOT_TOP;

    var step = data.length > 1 ? (LAST_X - FIRST_X) / (data.length - 1) : 0;

    function pointX(i) { return FIRST_X + i * step; }
    function pointY(v) { return PLOT_BOTTOM - (num(v, 0) / max) * PLOT_H; }

    var grid = [];
    var axis = [];
    for (var t = 0; t <= ticks; t++) {
      var gy = PLOT_BOTTOM - (PLOT_H / ticks) * t;
      grid.push(
        h('line', {
          key: 'g' + t,
          className: 'ds-gridline',
          x1: PLOT_L, y1: gy, x2: PLOT_R, y2: gy
        })
      );
      axis.push(
        h('text', {
          key: 'a' + t,
          className: 'ds-axis',
          x: PLOT_L - 12,
          y: gy + 4,
          textAnchor: 'end'
        }, String(Math.round((max / ticks) * t)))
      );
    }

    var line = data
      .map(function (d, i) { return pointX(i) + ',' + pointY(d.value); })
      .join(' ');

    var marks = [];
    data.forEach(function (d, i) {
      var x = pointX(i);
      var y = pointY(d.value);
      var alert = d.alert === true;

      marks.push(
        h('circle', {
          key: 'd' + i,
          className: 'ds-dot',
          'data-series': series,
          'data-alert': alert ? 'true' : null,
          cx: x, cy: y, r: 5
        }),
        /* no ponto de queda o rotulo desce, para nao colidir com a linha */
        h('text', {
          key: 'v' + i,
          className: 'ds-value',
          x: x,
          y: alert ? y + 19 : y - 14,
          textAnchor: 'middle'
        }, fmt(num(d.value, 0), unit)),
        h('text', {
          key: 'l' + i,
          className: 'ds-cat',
          x: x,
          y: PLOT_BOTTOM + 22,
          textAnchor: 'middle'
        }, d.label)
      );
    });

    return h(
      'div',
      {
        className: 'ds ds-panel' + (p.className ? ' ' + p.className : ''),
        style: p.style
      },
      p.title ? h('h3', { className: 'ds-panel__title' }, p.title) : null,
      h(
        'svg',
        {
          className: 'ds-panel__plot',
          viewBox: '0 0 ' + VB_W + ' ' + VB_H,
          role: 'img',
          'aria-label': p.ariaLabel || p.title || 'Linha de tendência'
        },
        h('g', null, grid),
        axis,
        data.length > 1
          ? h('polyline', {
              className: 'ds-series',
              'data-series': series,
              points: line
            })
          : null,
        marks,
        p.axisTitle
          ? h('text', {
              className: 'ds-axis-title',
              x: (FIRST_X + LAST_X) / 2,
              y: PLOT_BOTTOM + 46,
              textAnchor: 'middle'
            }, p.axisTitle)
          : null
      )
    );
  }

  global.SynthwaveHorizon = {
    version: '1.0.0',
    KpiCard: KpiCard,
    BarChart: BarChart,
    TrendLine: TrendLine
  };
})(typeof window !== 'undefined' ? window : this);
