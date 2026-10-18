window.__ModuleLoader__.load({
  id: 'dsh-annotation-pro',
  factory: require => {
    const react = require('react');
    const reactDom = require('react-dom');
    const store = require('@deepseek-ai/dsh-client-store');
    const h = react.createElement;
    const ROUTE = '/plugins/dsh-annotation-pro';
    const ROW = '[data-chat-flow-kind="assistant-step"]';
    const SOURCE = 'dsh-annotation-pro';
    const TOKEN = /⟦注释:([a-f0-9-]{36})⟧/g;
    const STORAGE = 'dsh-annotation-pro:pending:';
    const CSS = `/* ── tokens ─────────────────────────────────────────────────── */
.an-root,.an-popover,.an-selection,[data-annotation-ui]{font-family:inherit;font-size:13px;line-height:1.5;color:var(--dsw-alias-label-primary,#ececec);--an-surface:var(--dsw-alias-bg-layer-2,#252525);--an-sunken:var(--dsw-alias-bg-layer-1,#1d1d1d);--an-border:var(--dsw-alias-border-l4,#555);--an-hairline:color-mix(in srgb,var(--dsw-alias-border-l4,#555) 55%,transparent);--an-hover:var(--dsw-alias-interactive-bg-hover,#383838);--an-muted:var(--dsw-alias-label-secondary,#bcbcbc);--an-invert:var(--dsw-alias-label-primary-inverted,#1d1d1d);--an-warn:var(--dsw-alias-state-warn-primary,#f0c16a);--an-warn-tint:var(--dsw-alias-state-warn-tertiary,rgba(240,193,106,.16));--an-danger:var(--dsw-alias-state-error-primary,#f87171);--an-blue:#4d6bfe;--an-blue-deep:#3d57d9;--an-blue-soft:#a8b8ff;--an-ease:cubic-bezier(.16,1,.3,1);--an-spring:cubic-bezier(.2,1.3,.4,1);--an-shadow-card:0 16px 38px -12px rgba(6,9,20,.55),0 2px 8px rgba(6,9,20,.26);--an-shadow-soft:0 1px 2px rgba(6,9,20,.24);--an-chibi:22px}
.an-root button,.an-popover button,.an-selection{font:inherit;cursor:pointer}.an-root svg,.an-popover svg,.an-selection svg{width:16px;height:16px;flex:none}
.an-root button:focus-visible,.an-popover button:focus-visible,.an-selection:focus-visible,.an-input:focus-visible{outline:2px solid var(--an-blue);outline-offset:2px;border-radius:8px}

/* ── mascot: the DeepSeek girl ──────────────────────────────── */
.an-root svg.an-chibi,.an-popover svg.an-chibi,.an-selection svg.an-chibi{width:var(--an-chibi,22px);height:var(--an-chibi,22px);overflow:visible;flex:none}
.an-chibi .c-hair{transform-box:fill-box;animation:an-sway 4.4s cubic-bezier(.45,0,.55,1) infinite alternate}
.an-chibi .c-ahoge{transform-box:fill-box;transform-origin:50% 100%;animation:an-ahoge 2.8s cubic-bezier(.45,0,.55,1) infinite alternate}
.an-chibi .c-body{transform-box:fill-box;transform-origin:50% 100%;animation:an-breathe 4s cubic-bezier(.45,0,.55,1) infinite}
.an-chibi .c-lid{transform-box:fill-box;transform-origin:50% 0;transform:scaleY(.01);animation:an-blink 6.2s steps(1,end) infinite}
.an-chibi[data-mood="waiting"] .c-hair{animation-duration:2.6s}
.an-chibi[data-mood="waiting"] .c-ahoge{animation-duration:1.5s}
.an-chibi[data-mood="typing"] .c-body{animation-duration:2.4s}
.an-chibi[data-mood="typing"] .c-hair{animation-duration:3s}
.an-chibi[data-yay="true"]{animation:an-yay .9s var(--an-spring)}
@keyframes an-sway{from{transform:rotate(-1.1deg)}to{transform:rotate(1.1deg)}}
@keyframes an-ahoge{from{transform:rotate(-9deg)}to{transform:rotate(9deg)}}
@keyframes an-breathe{0%,100%{transform:translateY(0) scaleY(1)}50%{transform:translateY(-.4px) scaleY(1.018)}}
@keyframes an-blink{0%,92%{transform:scaleY(.01)}94%,97%{transform:scaleY(1)}99%,100%{transform:scaleY(.01)}}
@keyframes an-yay{0%{transform:translateY(0) scale(1)}35%{transform:translateY(-4px) scale(1.12)}70%{transform:translateY(0) scale(.97)}100%{transform:translateY(0) scale(1)}}

/* ── shared bits ────────────────────────────────────────────── */
.an-badge{display:inline-flex;align-items:center;justify-content:center;flex:none;min-width:19px;height:19px;padding:0 5px;border-radius:7px;background:linear-gradient(160deg,var(--an-warn-tint),transparent),var(--an-warn-tint);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--an-warn) 34%,transparent);color:var(--an-warn);font:600 11px/1 inherit;font-variant-numeric:tabular-nums;letter-spacing:.01em}
.an-muted{color:var(--an-muted);font-size:12px}.an-status{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
.an-error{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:8px;padding:7px 10px;border-radius:10px;background:color-mix(in srgb,var(--an-danger) 14%,transparent);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--an-danger) 28%,transparent);color:var(--an-danger);font-size:12px;line-height:1.5}
.an-error .an-btn{border-color:currentColor;color:inherit}

/* ── buttons ────────────────────────────────────────────────── */
.an-btn{position:relative;border:1px solid var(--an-border);border-radius:9px;padding:5px 11px;color:inherit;background:linear-gradient(180deg,color-mix(in srgb,#fff 4%,transparent),transparent);white-space:nowrap;font-size:12px;transition:background .18s var(--an-ease),border-color .18s var(--an-ease),color .18s var(--an-ease),transform .16s var(--an-spring),box-shadow .18s var(--an-ease),opacity .18s var(--an-ease)}
.an-btn:hover:not(:disabled){background:var(--an-hover);border-color:var(--an-hairline);transform:translateY(-1px)}
.an-btn:active:not(:disabled){transform:translateY(0) scale(.98)}
.an-btn:disabled{opacity:.45;cursor:default}
.an-btn.primary{border-color:transparent;background:linear-gradient(180deg,var(--an-blue),var(--an-blue-deep));color:#fff;font-weight:600;box-shadow:0 2px 10px -2px rgba(77,107,254,.55),inset 0 1px 0 rgba(255,255,255,.22)}
.an-btn.primary:hover:not(:disabled){background:linear-gradient(180deg,#5a77ff,#4560e8);box-shadow:0 6px 18px -4px rgba(77,107,254,.6),inset 0 1px 0 rgba(255,255,255,.26)}
.an-btn.quiet{border-color:transparent;background:none;color:var(--an-muted);padding:5px 7px}
.an-btn.quiet:hover:not(:disabled){color:inherit;background:var(--an-hover)}
.an-btn.danger:hover:not(:disabled){color:var(--an-danger);border-color:color-mix(in srgb,var(--an-danger) 55%,transparent);background:color-mix(in srgb,var(--an-danger) 12%,transparent)}
.an-icon{display:inline-flex;align-items:center;justify-content:center;border:0;background:none;color:var(--an-muted);padding:4px;border-radius:8px;transition:background .16s var(--an-ease),color .16s var(--an-ease),transform .16s var(--an-spring)}
.an-icon:hover:not(:disabled){background:var(--an-hover);color:inherit;transform:rotate(90deg)}
.an-icon:disabled{opacity:.45;cursor:default}

/* ── dock ───────────────────────────────────────────────────── */
.an-dock{padding:8px 0}
.an-toolbar{display:flex;align-items:center;gap:7px;flex-wrap:wrap}
.an-chip{position:relative;display:inline-flex;align-items:center;gap:7px;padding:4px 11px 4px 6px;border:1px solid var(--an-border);border-radius:999px;background:linear-gradient(180deg,color-mix(in srgb,#fff 5%,transparent),transparent),var(--an-sunken);color:inherit;font-size:12px;font-weight:600;box-shadow:var(--an-shadow-soft);transition:transform .2s var(--an-spring),border-color .2s var(--an-ease),background .2s var(--an-ease),box-shadow .2s var(--an-ease)}
.an-chip:hover,.an-chip[aria-expanded="true"]{transform:translateY(-1px);border-color:color-mix(in srgb,var(--an-blue) 55%,var(--an-border));box-shadow:0 4px 14px -4px rgba(77,107,254,.4),var(--an-shadow-soft)}
.an-caret{display:inline-flex;transition:transform .26s var(--an-spring);color:var(--an-muted)}
.an-chip[aria-expanded="true"] .an-caret{transform:rotate(180deg);color:var(--an-blue)}
.an-collapse{display:grid;grid-template-rows:0fr;transition:grid-template-rows .28s var(--an-ease),opacity .2s var(--an-ease);opacity:0;pointer-events:none}
.an-collapse.open{grid-template-rows:1fr;opacity:1;pointer-events:auto}
.an-collapse>div{min-height:0;overflow:hidden}
.an-panel{margin-top:9px;padding:10px;border:1px solid var(--an-hairline);border-radius:14px;background:linear-gradient(180deg,color-mix(in srgb,#fff 3%,transparent),transparent),var(--an-sunken);box-shadow:var(--an-shadow-card)}
.an-mascot{display:flex;align-items:flex-start;gap:9px;margin-bottom:9px}
.an-say{position:relative;flex:1;min-width:0;padding:7px 10px;border-radius:12px 12px 12px 4px;background:color-mix(in srgb,var(--an-blue) 13%,transparent);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--an-blue) 22%,transparent);font-size:12px;line-height:1.55;color:inherit}
.an-say b{color:var(--an-blue-soft);font-variant-numeric:tabular-nums}
.an-pending{margin:0;padding:0;list-style:none;max-height:300px;overflow:auto;overscroll-behavior:contain;scrollbar-width:thin;display:flex;flex-direction:column;gap:8px}
.an-pending>li{position:relative;padding:9px 11px 9px 13px;border-radius:11px;background:var(--an-surface);box-shadow:var(--an-shadow-soft);transition:transform .2s var(--an-spring),box-shadow .2s var(--an-ease)}
.an-pending>li::before{content:"";position:absolute;left:4px;top:9px;bottom:9px;width:2px;border-radius:2px;background:linear-gradient(180deg,var(--an-warn),color-mix(in srgb,var(--an-warn) 20%,transparent))}
.an-pending>li:hover{transform:translateY(-1px);box-shadow:0 6px 16px -8px rgba(6,9,20,.5)}
.an-pending-head{display:flex;align-items:center;gap:6px;margin-bottom:6px}
.an-panel-foot{display:flex;align-items:center;justify-content:flex-end;gap:6px;margin-top:10px}

/* ── the numbered chip inside the composer ──────────────────── */
[data-composer-chip="dsh-annotation-pro"]{counter-increment:an-note;vertical-align:baseline}
[data-composer-chip="dsh-annotation-pro"]>span{padding:0 7px!important;border-radius:6px!important;background:var(--dsw-alias-state-warn-tertiary,#3a2a10)!important;color:var(--dsw-alias-state-warn-primary,#f0c16a)!important;font-weight:600;font-size:.94em;margin:0 2px;vertical-align:baseline;cursor:default;user-select:none;white-space:nowrap;box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--dsw-alias-state-warn-primary,#f0c16a) 30%,transparent)}
[data-composer-chip="dsh-annotation-pro"]>span>span{display:none!important}
[data-composer-chip="dsh-annotation-pro"]>span::before{content:"注释 " counter(an-note);font-variant-numeric:tabular-nums}

/* ── archive ────────────────────────────────────────────────── */
.an-list{max-height:280px;overflow:auto;overscroll-behavior:contain;margin-top:9px;display:flex;flex-direction:column;gap:9px;scrollbar-width:thin}
.an-item{padding:10px 11px;border:1px solid var(--an-hairline);border-radius:12px;background:var(--an-sunken);transition:transform .2s var(--an-spring),box-shadow .2s var(--an-ease)}
.an-item:hover{transform:translateY(-1px);box-shadow:0 8px 20px -10px rgba(6,9,20,.5)}
.an-item-head{display:flex;align-items:center;gap:6px;margin-bottom:7px}
.an-jump{display:inline-flex;align-items:center;gap:6px;border:0;background:none;color:inherit;font-weight:600;font-size:12px;padding:0;text-align:left;transition:color .16s var(--an-ease)}
.an-jump:hover{color:var(--an-blue-soft)}.an-jump:hover .an-badge{box-shadow:inset 0 0 0 1px var(--an-warn),0 0 0 3px color-mix(in srgb,var(--an-warn) 16%,transparent)}
.an-time{margin-left:auto;color:var(--an-muted);font-size:11px;font-variant-numeric:tabular-nums}
.an-actions{display:flex;justify-content:flex-end;gap:4px;margin-top:8px;flex-wrap:wrap;align-items:center}
.an-archive{margin-top:10px;padding-top:9px;border-top:1px solid var(--an-hairline)}
.an-archive>summary,.an-original>summary{cursor:pointer;list-style:none;display:flex;align-items:center;gap:6px;color:var(--an-muted);font-size:12px;transition:color .16s var(--an-ease)}
.an-archive>summary{font-weight:600}
.an-archive>summary:hover,.an-original>summary:hover{color:inherit}
.an-archive>summary::-webkit-details-marker,.an-original>summary::-webkit-details-marker{display:none}
.an-archive>summary::before,.an-original>summary::before{content:"";flex:none;width:0;height:0;border-left:4px solid currentColor;border-top:3.5px solid transparent;border-bottom:3.5px solid transparent;opacity:.8;transition:transform .24s var(--an-spring)}
.an-archive[open]>summary::before,.an-original[open]>summary::before{transform:rotate(90deg)}
.an-original{margin-top:7px;color:var(--an-muted);font-size:12px}
.an-original>summary{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:1px 0}
.an-original .an-quote{margin-top:6px}

/* ── quote & body text ──────────────────────────────────────── */
.an-quote{margin:0;padding:7px 10px;border-left:2px solid var(--an-warn);border-radius:0 9px 9px 0;background:color-mix(in srgb,var(--an-warn) 8%,transparent);color:var(--an-muted);font-size:12px;line-height:1.6;white-space:pre-wrap;overflow-wrap:anywhere;max-height:104px;overflow:auto}
.an-comment{margin:7px 0 0;white-space:pre-wrap;overflow-wrap:anywhere;font-size:12.5px;line-height:1.65}

/* ── popovers ───────────────────────────────────────────────── */
.an-popover{position:fixed;pointer-events:auto;box-sizing:border-box;display:flex;flex-direction:column;width:min(384px,calc(100vw - 24px));max-height:min(560px,calc(100vh - 24px));overflow:hidden;padding:0;border:1px solid var(--an-hairline);border-radius:16px;background:linear-gradient(180deg,color-mix(in srgb,#fff 5%,transparent),transparent 64px),var(--an-surface);box-shadow:var(--an-shadow-card),inset 0 1px 0 rgba(255,255,255,.06);z-index:2147482803;animation:an-pop .24s var(--an-spring);will-change:transform}
@keyframes an-pop{from{transform:translateY(9px) scale(.975)}to{transform:none}}
.an-popover-head{display:flex;align-items:center;gap:8px;padding:11px 12px;font-weight:600;font-size:12.5px;border-bottom:1px solid var(--an-hairline);background:linear-gradient(180deg,color-mix(in srgb,var(--an-blue) 7%,transparent),transparent)}
.an-popover-head>svg{color:var(--an-blue)}.an-popover-head .an-icon{margin-left:auto}
.an-popover-body{padding:11px 13px 13px;overflow:auto;overscroll-behavior:contain;scrollbar-width:thin}
.an-input{display:block;box-sizing:border-box;width:100%;min-height:92px;margin-top:10px;max-height:260px;resize:vertical;padding:9px 11px;border:1px solid var(--an-border);border-radius:10px;background:var(--an-sunken);color:inherit;font:inherit;line-height:1.65;caret-color:var(--an-blue);transition:border-color .18s var(--an-ease),box-shadow .18s var(--an-ease)}
.an-input:focus{border-color:var(--an-blue);box-shadow:0 0 0 3px color-mix(in srgb,var(--an-blue) 20%,transparent)}
.an-input::placeholder{color:var(--an-muted)}
.an-footer{display:flex;align-items:center;gap:6px;margin-top:11px}
.an-footer .an-muted{margin-right:auto;font-size:11px;font-variant-numeric:tabular-nums}
.an-hint{margin:9px 0 0;color:var(--an-muted);font-size:11.5px;line-height:1.6}
.an-hint .an-btn{margin-left:4px}

/* ── overlay: highlights, markers, bubble ───────────────────── */
.an-layer{position:fixed;inset:0;z-index:2147482800;pointer-events:none}
.an-highlight{position:absolute;border-radius:3px;pointer-events:none;background:color-mix(in srgb,var(--an-warn) 20%,transparent);box-shadow:inset 0 -1px 0 var(--an-warn);transition:background .14s var(--an-ease)}
.an-highlight.active{background:color-mix(in srgb,var(--an-warn) 34%,transparent)}
.an-marker{position:absolute;pointer-events:auto;display:flex;align-items:center;justify-content:center;min-width:19px;height:19px;padding:0 4px;border-radius:7px;border:1px solid color-mix(in srgb,var(--an-warn) 75%,transparent);background:linear-gradient(180deg,var(--an-warn-tint),var(--an-warn-tint)),var(--an-sunken);color:var(--an-warn);font:600 11px/1 inherit;font-variant-numeric:tabular-nums;cursor:pointer;box-shadow:0 1px 3px rgba(6,9,20,.3);transition:transform .2s var(--an-spring),box-shadow .2s var(--an-ease),background .2s var(--an-ease)}
.an-marker:hover,.an-marker[aria-expanded="true"]{transform:translateY(-1.5px) scale(1.1);box-shadow:0 5px 14px -4px rgba(240,193,106,.5)}
.an-selection{position:fixed;pointer-events:auto;display:inline-flex;align-items:center;gap:7px;padding:6px 12px 6px 10px;border-radius:999px;border:1px solid color-mix(in srgb,#fff 24%,transparent);background:linear-gradient(180deg,#5a77ff,#4257d6);color:#fff;box-shadow:0 8px 22px -6px rgba(77,107,254,.6),inset 0 1px 0 rgba(255,255,255,.28);z-index:2147482802;font-weight:600;font-size:12px;animation:an-pop .22s var(--an-spring);transition:transform .2s var(--an-spring),box-shadow .2s var(--an-ease)}
.an-selection::after{content:"";position:absolute;left:50%;bottom:-4px;width:8px;height:8px;margin-left:-4px;border-radius:2px;background:#4257d6;transform:rotate(45deg);box-shadow:2px 2px 0 rgba(255,255,255,.06)}
.an-selection:hover{transform:translateY(-1.5px) scale(1.02);box-shadow:0 12px 26px -6px rgba(77,107,254,.7),inset 0 1px 0 rgba(255,255,255,.3)}
.an-selection svg{color:#fff}

@media(max-width:480px){.an-input{font-size:16px}.an-btn{padding:5px 9px}}
@media(prefers-reduced-motion:reduce){.an-popover,.an-selection,.an-collapse,.an-btn,.an-chip,.an-icon,.an-marker,.an-pending>li,.an-item{animation:none;transition:none}.an-chibi *{animation:none!important;transform:none!important}}
`;

    function icon(name) {
      const paths = { note: 'M4 3h12v10l-4 4H4z M7 7h6 M7 10h4 M12 17v-4h4', close: 'M5 5l10 10 M15 5L5 15', down: 'M5 8l5 5 5-5' };
      return h('svg', { viewBox: '0 0 20 20', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }, h('path', { d: paths[name] }));
    }
    // The mascot: a flat-shaded anime girl with indigo hair, a frilled headband and sleepy
    // eyes, i.e. the DeepSeek fandom look. Everything is inline SVG built once at module load,
    // so a copy costs one innerHTML and no React reconciliation per frame.
    const INK = '#2b2f47', SKIN = '#ffe6d9';
    function chibiEye(cx) {
      return `<g><ellipse cx="${cx}" cy="46.6" rx="6.5" ry="7.4" fill="#fff"/>` +
        `<ellipse cx="${cx}" cy="47.4" rx="5.5" ry="6.6" fill="url(#an-iris)"/>` +
        `<ellipse cx="${cx}" cy="48.4" rx="3.9" ry="4.8" fill="#191e33"/>` +
        `<circle cx="${cx + 1.9}" cy="44.6" r="1.9" fill="#fff"/>` +
        `<circle cx="${cx - 2.2}" cy="50.6" r="1" fill="#fff" opacity=".85"/>` +
        `<path d="M${cx - 6.5} 39.2h13v1.9c0 1.2-1 2-2.3 2h-8.4c-1.3 0-2.3-.8-2.3-2z" fill="${SKIN}"/>` +
        `<path d="M${cx - 6.3} 42.2h12.6" stroke="${INK}" stroke-width="2.05" stroke-linecap="round"/>` +
        `<rect class="c-lid" x="${cx - 7.2}" y="39.4" width="14.4" height="14.4" rx="5.6" fill="#ffe0d1"/></g>`;
    }
    const CHIBI_BODY = (() => {
      let frills = '';
      for (let i = 0; i < 9; i++) {
        const a = (208 + (124 / 8) * i) * Math.PI / 180;
        frills += `<circle cx="${(40 + Math.cos(a) * 27.8).toFixed(2)}" cy="${(46 + Math.sin(a) * 27.8).toFixed(2)}" r="2.7" fill="#f7f8ff" stroke="#dde3f7" stroke-width=".55"/>`;
      }
      return `
<path class="c-hair" fill="url(#an-hair-back)" d="M40 13.6c16.4 0 27.4 10.6 27.4 26.2v12c0 4.6-2.6 7.4-6.2 7.4H18.8c-3.6 0-6.2-2.8-6.2-7.4v-12C12.6 24.2 23.6 13.6 40 13.6z"/>
<g class="c-body">
<path fill="#f4cfc0" d="M34.6 60.4h10.8v10.2H34.6z"/>
<path fill="#f9faff" stroke="#dfe4f5" stroke-width=".6" d="M24.2 80c.6-7.6 7.4-11.8 15.8-11.8S55.2 72.4 55.8 80z"/>
<path fill="#c7d0ff" d="M32.4 68.4L40 75l7.6-6.6 1.8 2.8L40 78.8l-9.4-7.6z"/>
<path fill="url(#an-skin)" d="M40 20.2c13.6 0 23 9.4 23 22.2 0 12.8-10.2 21.4-23 21.4s-23-8.6-23-21.4C17 29.6 26.4 20.2 40 20.2z"/>
<ellipse cx="17.2" cy="44.6" rx="2.5" ry="3.8" fill="#ffd9ca"/><ellipse cx="62.8" cy="44.6" rx="2.5" ry="3.8" fill="#ffd9ca"/>
${chibiEye(29.4)}${chibiEye(50.6)}
<ellipse cx="23.4" cy="57" rx="4.6" ry="2.9" fill="#ff9db1" opacity=".38"/><ellipse cx="56.6" cy="57" rx="4.6" ry="2.9" fill="#ff9db1" opacity=".38"/>
<path d="M20.6 55.8l1.1 2.5M23 55.2l1.1 2.5M25.4 55.8l1.1 2.5" stroke="#f67f96" stroke-width=".95" stroke-linecap="round" opacity=".5"/>
<path d="M53.6 55.8l1.1 2.5M56 55.2l1.1 2.5M58.4 55.8l1.1 2.5" stroke="#f67f96" stroke-width=".95" stroke-linecap="round" opacity=".5"/>
<path d="M38 59.4c1.2 1.3 2.8 1.3 4 0" stroke="#bd5f57" stroke-width="1.35" stroke-linecap="round" fill="none"/>
<path fill="url(#an-hair)" d="M40 18.6c14.2 0 23.4 9.4 23.4 23 0 3.4-.5 6.4-1.4 9-1.4-7-3.8-12.2-7.6-16.2-1.8 4.6-4.4 7.6-7.6 9.8-.8-5.6-2.2-10.4-4.4-13.6-2.2 3.2-3.6 8-4.4 13.6-3.2-2.2-5.8-5.2-7.6-9.8-3.8 4-6.2 9.2-7.6 16.2-.9-2.6-1.4-5.6-1.4-9 0-13.6 9.2-23 23.4-23z"/>
<path fill="#9fadf5" opacity=".45" d="M19.6 32.4c2.6-8 10.8-13 20.4-13 5.2 0 9.8 1.3 13.4 3.7-5.2-1.6-10.2-2.2-15.2-2.2-8.6 0-15.4 3.8-19.4 11.4z"/>
<path class="c-ahoge" fill="url(#an-hair)" d="M42 20.4c.4-4.8 2.6-8 5.6-8.6-1.2 1.7-1.7 3.3-1.6 4.9 1.8.1 3 1.3 3.7 3.3-2.9-1.3-5.5-1.2-7.7.4z"/>
<g>${frills}
<path d="M17.4 33.4A26 26 0 0 1 62.6 33.4" stroke="#f7f8ff" stroke-width="5.4" stroke-linecap="round" fill="none"/>
<path d="M17.4 33.4A26 26 0 0 1 62.6 33.4" stroke="#dfe4f8" stroke-width=".7" stroke-linecap="round" fill="none" opacity=".9" transform="translate(0 2.4)"/></g>
<g transform="translate(54.6 25.4) rotate(-14)"><path d="M0 1c-2.8-2.4-5.6-3.4-7-2.1-1.5 1.4-.7 4.6 1.3 6.2 1.5 1.2 3.4 1 5.4-.4z" fill="#4d6bfe"/><path d="M0 1c2.8-2.4 5.6-3.4 7-2.1 1.5 1.4.7 4.6-1.3 6.2-1.5 1.2-3.4 1-5.4-.4z" fill="#5a77ff"/><circle cx="0" cy="1.6" r="1.8" fill="#3d57d9"/></g>
<g transform="translate(40 73.4) scale(.46)"><path d="M-5 0c3.6-2.2 5.8-5.4 6.4-9.6.2-1.1 1.5-1.1 1.6.2.4 3.1-.5 5.8-2 7.8 1.5 2 2.4 4.7 2 7.8-.1 1.3-1.4 1.3-1.6.2C1.8 2.2-.4-1-4 0z" fill="#4d6bfe"/></g>
</g>`;
    })();
    function chibi({ size = 22, mood = 'idle', yay = false }) {
      return h('svg', {
        // Small copies crop to the face; only a large one is worth the full bust.
        className: 'an-chibi', viewBox: size >= 44 ? '0 0 80 80' : '10 8 60 60', width: size, height: size, focusable: false,
        style: { '--an-chibi': `${size}px` }, 'data-mood': mood, 'data-yay': yay ? 'true' : 'false', 'aria-hidden': true,
        dangerouslySetInnerHTML: { __html: CHIBI_BODY },
      });
    }
    // Gradients live in one hidden sprite: per-instance <defs> would produce duplicate ids the
    // moment the chip and the panel are on screen together.
    function ensureSprite() {
      if (document.getElementById('dsh-annotation-pro-sprite')) return;
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.id = 'dsh-annotation-pro-sprite';
      svg.setAttribute('aria-hidden', 'true');
      svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';
      svg.innerHTML = '<defs>' +
        '<linearGradient id="an-hair" x1=".1" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="#7a8ce8"/><stop offset=".55" stop-color="#4f5fbe"/><stop offset="1" stop-color="#3b4689"/></linearGradient>' +
        '<linearGradient id="an-hair-back" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a569f"/><stop offset="1" stop-color="#333c73"/></linearGradient>' +
        '<radialGradient id="an-skin" cx=".42" cy=".3" r=".85"><stop offset="0" stop-color="#fff7f1"/><stop offset="1" stop-color="#ffe4d5"/></radialGradient>' +
        '<linearGradient id="an-iris" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5566b8"/><stop offset="1" stop-color="#252b49"/></linearGradient>' +
        '</defs>';
      document.body.appendChild(svg);
    }
    function ensureCss() {
      ensureSprite();
      if (document.getElementById('dsh-annotation-pro-css')) return;
      const element = document.createElement('style');
      element.id = 'dsh-annotation-pro-css';
      element.textContent = CSS;
      document.head.appendChild(element);
    }
    async function api(method, path, body) {
      const response = await fetch(path, {
        method, headers: { 'content-type': 'application/json' },
        body: body === undefined ? undefined : JSON.stringify(body), signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) {
        let message = `请求失败（${response.status}），请重试`;
        try { message = (await response.json()).error ?? message; } catch {}
        throw new Error(message);
      }
      return response.json();
    }
    function ordered(annotations) {
      return [...annotations].sort((a, b) => String(a.createdAt ?? '').localeCompare(String(b.createdAt ?? '')) || a.id.localeCompare(b.id));
    }
    function markedNotes(state) {
      const notes = new Map(state.annotations.map(note => [note.id, note]));
      for (const item of state.pending) if (!item.annotation.unavailable) notes.set(item.annotation.id, { ...item.annotation, queued: true, occurrenceId: item.occurrenceId });
      return [...notes.values()];
    }
    function randomUUID() {
      const bytes = globalThis.crypto.getRandomValues(new Uint8Array(16));
      bytes[6] = (bytes[6] & 15) | 64;
      bytes[8] = (bytes[8] & 63) | 128;
      const hex = Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
      return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
    }
    function visible(element) {
      return element.isConnected && !element.closest('[hidden]') && element.getClientRects().length > 0;
    }
    function textNodes(root) {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      return nodes;
    }
    function rangeAt(root, start, end) {
      const nodes = textNodes(root);
      const range = document.createRange();
      let offset = 0, foundStart = false;
      for (const node of nodes) {
        const next = offset + node.textContent.length;
        if (!foundStart && start < next) { range.setStart(node, start - offset); foundStart = true; }
        if (foundStart && end <= next) { range.setEnd(node, end - offset); return range; }
        offset = next;
      }
      return null;
    }
    function captureSelection(range) {
      const start = range.startContainer.nodeType === 1 ? range.startContainer : range.startContainer.parentElement;
      const end = range.endContainer.nodeType === 1 ? range.endContainer : range.endContainer.parentElement;
      const root = start?.closest(ROW);
      if (!root || end?.closest(ROW) !== root || !visible(root)) return null;
      const raw = range.toString();
      const selectedText = raw.trim();
      if (!selectedText || selectedText.length > 64000) return null;
      const before = document.createRange();
      before.selectNodeContents(root);
      before.setEnd(range.startContainer, range.startOffset);
      const offset = before.toString().length + raw.indexOf(selectedText);
      const full = root.textContent;
      const trimmedRange = rangeAt(root, offset, offset + selectedText.length);
      if (!trimmedRange || trimmedRange.toString() !== selectedText) return null;
      return { text: selectedText, range: trimmedRange, anchor: {
        nodeKey: root.getAttribute('data-chat-node-key') ?? root.getAttribute('data-chat-flow-key') ?? '',
        flowKind: root.getAttribute('data-chat-flow-kind'), turn: Number(root.getAttribute('data-chat-turn') ?? 0),
        start: offset, end: offset + selectedText.length,
        prefix: full.slice(Math.max(0, offset - 64), offset), suffix: full.slice(offset + selectedText.length, offset + selectedText.length + 64),
      } };
    }
    // Never guess between identical passages. Old notes remain accessible in the dock.
    function restoreRange(annotation, env) {
      const scope = env ?? measureScope(false);
      const anchor = annotation.anchor;
      const roots = scope.rootsFor(anchor?.nodeKey || annotation.messageId);
      if (!roots.length) return null;
      const exact = annotation.selectedText;
      const candidates = [];
      for (const root of roots) {
        const full = root.textContent;
        if (anchor && full.slice(anchor.start, anchor.end) === exact) candidates.push({ root, start: anchor.start, end: anchor.end, score: 4 });
        else {
          let index = full.indexOf(exact);
          while (exact && index >= 0) {
            const prefix = anchor?.prefix ?? '';
            const suffix = anchor?.suffix ?? '';
            const score = (prefix && full.slice(Math.max(0, index - prefix.length), index) === prefix ? 1 : 0) +
              (suffix && full.slice(index + exact.length, index + exact.length + suffix.length) === suffix ? 1 : 0);
            candidates.push({ root, start: index, end: index + exact.length, score });
            index = full.indexOf(exact, index + 1);
          }
        }
      }
      candidates.sort((a, b) => b.score - a.score);
      if (!candidates.length || (candidates.length > 1 && candidates[0].score === candidates[1].score)) return null;
      return rangeAt(candidates[0].root, candidates[0].start, candidates[0].end);
    }

    function feedbackText(selectedText, comment) {
      const quote = selectedText.replace(/\r\n?/g, '\n').split('\n').map(line => `> ${line}`).join('\n');
      return `关于这段回复：\n${quote}\n\n我的批注：\n${comment.trim()}`.replace(/[\uE100-\uE11D\uFFFC]/gu, '');
    }
    function detectOffset(state, offset) {
      let end = offset, previousEnd = 0;
      for (const occurrence of state.occurrences ?? []) {
        if (!Number.isInteger(occurrence.offset) || !Number.isInteger(occurrence.length) || occurrence.length < 0 || occurrence.offset < previousEnd || occurrence.offset + occurrence.length > state.draft.length) {
          throw new Error('无法确认输入框中的引用位置，请保留批注后重试');
        }
        previousEnd = occurrence.offset + occurrence.length;
        if (occurrence.offset + occurrence.length <= offset) end -= occurrence.length - 1;
        else if (occurrence.offset < offset) throw new Error('无法在引用内部修改注释');
      }
      return end;
    }
    function decodeNote(ref) {
      const note = JSON.parse(ref);
      if (!note || typeof note.id !== 'string' || !/^[a-f0-9-]{36}$/.test(note.tokenId) || typeof note.selectedText !== 'string' || !note.selectedText.trim() || note.selectedText.length > 64000 || typeof note.comment !== 'string' || !note.comment.trim() || note.comment.length > 24000) throw new Error('注释内容不完整，请重新添加');
      return note;
    }
    const noteToken = note => `⟦注释:${note.tokenId}⟧`;
    class AnnotationQueue {
      constructor(ctx, sessionId) {
        this.actx = ctx.sessions.scope(sessionId);
        this.input = ctx.conversation.input.for(this.actx);
        this.disposed = false;
      }
      items() {
        return (this.input.state.getSnapshot().occurrences ?? []).filter(o => o.source === SOURCE).map(o => {
          try { return { ...o, annotation: decodeNote(o.ref) }; }
          catch { return { ...o, annotation: { id: o.ref, selectedText: '', comment: '此注释的本地数据无法恢复，请移除后重新添加。', unavailable: true } }; }
        });
      }
      watch(listener, onError) {
        const update = () => {
          try { listener(this.items()); } catch (error) { onError(error); }
          if (this.restoring) return;
          this.restoring = true;
          Promise.resolve().then(() => {
            if (!this.disposed) { try { this.restore(); } catch (error) { onError(error); } }
            this.restoring = false;
          });
        };
        this.off = this.input.state.subscribe(update);
        update();
      }
      span(state, offset, length = 0) {
        return { start: detectOffset(state, offset), end: detectOffset(state, offset + length), draftRev: state.draftRev };
      }
      edit(note, state, span) {
        if (state.phase !== 'plain') throw new Error('输入框正在处理其他操作，请稍后再添加');
        const ok = this.actx.bail('slash/input-insert-reference', { reference: { source: SOURCE, ref: JSON.stringify(note), label: '注释', clipboardText: noteToken(note) }, span });
        if (ok !== true) throw new Error('输入框内容已变化，请再试一次');
      }
      add(annotation) {
        const state = this.input.state.getSnapshot();
        const note = { ...annotation, tokenId: randomUUID() };
        decodeNote(JSON.stringify(note));
        // Keep immutable records: reload, undo, copy/paste and failed-send restoration can all refer to older versions.
        try { globalThis.localStorage.setItem(STORAGE + note.tokenId, JSON.stringify(note)); }
        catch { throw new Error('无法保留待发送注释，浏览器存储已满或不可用；你的批注仍在编辑框中'); }
        const existing = this.items().find(item => item.annotation.id === note.id);
        const span = existing ? this.span(state, existing.offset, existing.length) : this.span(state, state.draft.length);
        this.edit(note, state, span);
      }
      remove(occurrenceId) {
        const state = this.input.state.getSnapshot();
        if (state.phase !== 'plain') throw new Error('输入框正在处理其他操作，请稍后再移除');
        const item = this.items().find(row => row.occurrenceId === occurrenceId);
        if (!item) return;
        if (this.actx.bail('slash/input-insert-text', { text: '', span: this.span(state, item.offset, item.length) }) !== true) throw new Error('输入框内容已变化，请再试一次');
      }
      restore() {
        for (let count = 0; count < 100; count++) {
          const state = this.input.state.getSnapshot();
          if (state.phase !== 'plain') return;
          const match = [...state.draft.matchAll(TOKEN)].find(m => !(state.occurrences ?? []).some(o => m.index >= o.offset && m.index < o.offset + o.length));
          if (!match) return;
          let note;
          try { note = decodeNote(globalThis.localStorage.getItem(STORAGE + match[1])); }
          catch {
            // Retain an unresolved reference so serialization blocks the send instead of leaking an opaque marker.
            this.edit({ tokenId: match[1], unavailable: true }, state, this.span(state, match.index, match[0].length));
            continue;
          }
          if (note.tokenId !== match[1]) throw new Error('注释标识不匹配，请重新添加');
          this.edit(note, state, this.span(state, match.index, match[0].length));
        }
      }
      focus() {
        requestAnimationFrame(() => {
          if (this.disposed) return;
          try { if (this.input.focus) this.input.focus(); else this.input.editor?.getRootElement()?.focus({ preventScroll: true }); } catch {}
        });
      }
      dispose() { this.disposed = true; this.off?.(); }
    }
    class AnnotationSurface {
      constructor(sessionId, queue) {
        this.sessionId = sessionId;
        this.queue = queue;
        this.state = store.createSnapshotStore({ annotations: [], pending: [], draft: null, draftCollapsed: false, openId: null, loaded: false, loading: false, busy: false, error: '', loadError: '', bindingId: null });
        queue?.watch(pending => this.set({ pending }), error => this.set({ error: error.message }));
      }
      set(patch) { this.state.set({ ...this.state.getSnapshot(), ...patch }); }
      async load() {
        const state = this.state.getSnapshot();
        if (state.loaded || state.loading) return;
        this.set({ loading: true, loadError: '' });
        try {
          const data = await api('GET', `${ROUTE}/annotations?sessionId=${encodeURIComponent(this.sessionId)}`);
          if (data.version !== 2) throw new Error('运行中的批注服务仍是旧版，请重启 Harness 加载更新');
          this.set({ annotations: ordered(data.annotations ?? []), loaded: true, loading: false, loadError: '' });
        } catch (error) { this.set({ loading: false, loadError: `已保存注释加载失败：${error.message}` }); }
      }
      beginDraft(selection, annotation = null) {
        if (this.state.getSnapshot().busy) return;
        const previous = this.state.getSnapshot().draft;
        if (previous?.comment.trim() && previous.id !== annotation?.id) { this.set({ draftCollapsed: false, error: '当前注释还未添加，先完成它再开始下一条' }); return; }
        // `rect` seeds the popover position so it never flashes at a guessed spot before the first measure.
        this.set({ draft: { text: selection?.text ?? annotation?.selectedText, anchor: selection?.anchor ?? annotation?.anchor ?? null,
          id: annotation?.id ?? randomUUID(), isNew: !annotation, comment: annotation?.comment ?? '', range: selection?.range ?? null, rect: selection?.rect ?? null }, draftCollapsed: false, openId: null, error: '', bindingId: null });
      }
      updateDraft(comment) { const draft = this.state.getSnapshot().draft; if (draft) this.set({ draft: { ...draft, comment } }); }
      cancelDraft() { if (!this.state.getSnapshot().busy) this.set({ draft: null, error: '' }); }
      dismissDraft() {
        if (this.state.getSnapshot().busy) return;
        if (this.state.getSnapshot().draft?.comment.trim()) this.set({ draftCollapsed: true, error: '' });
        else this.cancelDraft();
      }
      removePending(id) { try { this.queue.remove(id); this.set({ error: '' }); } catch (error) { this.set({ error: error.message }); } }
      async addToChat(annotation = null) {
        const state = this.state.getSnapshot();
        const text = annotation?.selectedText ?? state.draft?.text;
        const comment = annotation?.comment ?? state.draft?.comment;
        if (state.busy || !text || !comment?.trim()) return false;
        this.set({ busy: true, error: '' });
        try {
          this.queue.add({ id: annotation?.id ?? state.draft.id, selectedText: text, comment: comment.trim(), anchor: annotation?.anchor ?? state.draft?.anchor });
          this.set({ busy: false, draft: null, draftCollapsed: false, openId: null });
          this.queue.focus();
          return true;
        } catch (error) {
          this.set({ busy: false, error: `未添加到对话：${error.message}` });
          return false;
        }
      }
      async commitDraft() {
        const state = this.state.getSnapshot();
        if (!state.draft || state.busy || !state.loaded || !state.draft.comment.trim()) return false;
        const draft = state.draft;
        this.set({ busy: true, error: '' });
        try {
          const saved = await api('PUT', `${ROUTE}/annotations`, {
            id: draft.id, sessionId: this.sessionId,
            selectedText: draft.text, comment: draft.comment, anchor: draft.anchor,
          });
          this.set({ annotations: ordered([...this.state.getSnapshot().annotations.filter(a => a.id !== saved.id), saved]), draft: null, openId: saved.id, busy: false });
          return true;
        } catch (error) { this.set({ busy: false, error: `批注未保存：${error.message}` }); return false; }
      }
      async remove(id) {
        if (this.state.getSnapshot().busy) return;
        this.set({ busy: true, error: '' });
        try {
          await api('POST', `${ROUTE}/annotations/delete`, { sessionId: this.sessionId, id });
          const state = this.state.getSnapshot();
          this.set({ annotations: state.annotations.filter(a => a.id !== id), openId: state.openId === id ? null : state.openId, busy: false });
        } catch (error) { this.set({ busy: false, error: `批注未删除：${error.message}` }); }
      }
      openNote(id) { if (this.state.getSnapshot().busy || this.state.getSnapshot().draft?.comment.trim()) return; this.set({ openId: this.state.getSnapshot().openId === id ? null : id, draft: null, error: '' }); }
      closeNote() { if (this.state.getSnapshot().openId !== null) this.set({ openId: null }); }
      bind(id) { if (!this.state.getSnapshot().busy) this.set({ bindingId: id, openId: null, error: '' }); }
      select(selection) {
        const id = this.state.getSnapshot().bindingId;
        const annotation = id ? this.state.getSnapshot().annotations.find(a => a.id === id) : null;
        this.beginDraft(selection, annotation);
      }      async export(fmt) {
        try {
          const response = await fetch(`${ROUTE}/export?sessionId=${encodeURIComponent(this.sessionId)}&fmt=${fmt}`, { signal: AbortSignal.timeout(15000) });
          if (!response.ok) throw new Error('请重试');
          const url = URL.createObjectURL(await response.blob());
          const link = document.createElement('a');
          link.href = url; link.download = `annotations-${this.sessionId}.${fmt}`;
          document.body.appendChild(link); link.click(); link.remove();
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        } catch (error) { this.set({ error: `导出失败：${error.message}` }); }
      }
    }

    // One layout pass per frame: every getBoundingClientRect / getComputedStyle is memoised so
    // N notes cost N range lookups instead of N ancestor walks.
    function measureScope(onscreenOnly) {
      const boxes = new Map(), overflows = new Map(), bounds = new Map(), scopes = new Map(), rows = [];
      const boxOf = element => {
        let box = boxes.get(element);
        if (!box) { box = element.getBoundingClientRect(); boxes.set(element, box); }
        return box;
      };
      const overflowOf = element => {
        let value = overflows.get(element);
        if (!value) {
          const style = getComputedStyle(element);
          value = { y: /(auto|scroll|hidden|clip)/.test(style.overflowY), x: /(auto|scroll|hidden|clip)/.test(style.overflowX) };
          overflows.set(element, value);
        }
        return value;
      };
      const height = window.innerHeight;
      for (const root of document.querySelectorAll(ROW)) {
        if (!root.isConnected) continue;
        const box = boxOf(root);
        if (box.width < 1 || box.height < 1) continue;
        if (onscreenOnly && (box.bottom < -64 || box.top > height + 64)) continue;
        if (!bounds.has(root)) {
          // Clip the fixed overlays to every scrollport so they cannot cover the composer.
          const clip = { left: 0, top: 0, right: window.innerWidth, bottom: height };
          for (let element = root.parentElement; element; element = element.parentElement) {
            const overflow = overflowOf(element);
            if (!overflow.y && !overflow.x) continue;
            const parent = boxOf(element);
            if (overflow.y) { clip.top = Math.max(clip.top, parent.top); clip.bottom = Math.min(clip.bottom, parent.bottom); }
            if (overflow.x) { clip.left = Math.max(clip.left, parent.left); clip.right = Math.min(clip.right, parent.right); }
          }
          bounds.set(root, clip);
        }
        rows.push(root);
      }
      return {
        rows,
        rootsFor(key) {
          if (!key) return rows;
          if (!scopes.has(key)) scopes.set(key, rows.filter(root => (root.getAttribute('data-chat-node-key') ?? root.getAttribute('data-chat-flow-key')) === key));
          return scopes.get(key);
        },
        rects(range) {
          if (!range?.startContainer?.isConnected || !range?.endContainer?.isConnected) return [];
          const root = range.startContainer.parentElement?.closest?.(ROW);
          const clip = root ? bounds.get(root) : null;
          if (!clip) return [];
          const result = [];
          for (const rect of range.getClientRects()) {
            const left = Math.max(rect.left, clip.left), top = Math.max(rect.top, clip.top);
            const right = Math.min(rect.right, clip.right), bottom = Math.min(rect.bottom, clip.bottom);
            const width = right - left, height = bottom - top;
            if (width < 1 || height < 1) continue;
            if (!result.some(r => Math.abs(r.left - left) < 1 && Math.abs(r.top - top) < 1 && Math.abs(r.width - width) < 1 && Math.abs(r.height - height) < 1)) result.push({ left, top, right, bottom, width, height });
          }
          return result;
        },
      };
    }
    function position(rect, width = 380, height = 300) {
      const viewport = window.visualViewport;
      const leftEdge = viewport?.offsetLeft ?? 0, topEdge = viewport?.offsetTop ?? 0;
      const right = leftEdge + (viewport?.width ?? window.innerWidth), bottom = topEdge + (viewport?.height ?? window.innerHeight);
      const actual = Math.min(width, right - leftEdge - 24);
      const left = Math.max(leftEdge + 12, Math.min(rect ? rect.left : right - actual - 12, right - actual - 12));
      if (!rect) return { left, top: topEdge + 48 };
      // Open below the anchor, flip above when the lower half of the viewport has no room.
      const below = rect.bottom + 10, above = rect.top - height - 10;
      const top = below + height <= bottom - 8 ? below : above >= topEdge + 8 ? above : Math.max(topEdge + 12, bottom - height - 12);
      return { left, top: Math.max(topEdge + 12, Math.min(top, bottom - 12)) };
    }
    // Floating bubble: sits just above the first selected line, drops below when there is no room.
    function bubbleAt(rects) {
      const first = rects[0], last = rects[rects.length - 1];
      const width = 108, height = 34, gap = 8;
      const viewport = window.visualViewport;
      const leftEdge = viewport?.offsetLeft ?? 0, topEdge = viewport?.offsetTop ?? 0;
      const right = leftEdge + (viewport?.width ?? window.innerWidth), bottom = topEdge + (viewport?.height ?? window.innerHeight);
      const left = Math.max(leftEdge + 8, Math.min(last.right - width, right - width - 8));
      const above = first.top - height - gap;
      const top = above >= topEdge + 8 ? above : Math.min(last.bottom + gap, bottom - height - 8);
      return { left, top };
    }
    function ErrorNotice({ state, surface }) {
      return state.error ? h('div', { className: 'an-error', role: 'alert' }, state.error,
        !state.loaded && h('button', { className: 'an-btn', onClick: () => surface.load(), disabled: state.loading }, '重新加载')) : null;
    }
    function dateLabel(value) {
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
    }
    function DraftBox({ state, surface, rect }) {
      const draft = state.draft;
      const input = react.useRef(null);
      const panel = react.useRef(null);
      const [height, setHeight] = react.useState(280);
      react.useEffect(() => { input.current?.focus(); }, [draft.id]);
      react.useLayoutEffect(() => {
        const observer = new ResizeObserver(() => setHeight(panel.current?.getBoundingClientRect().height ?? 280));
        if (panel.current) observer.observe(panel.current);
        return () => observer.disconnect();
      }, []);
      return h('div', { ref: panel, className: 'an-popover', style: position(rect, 380, height), role: 'dialog', 'aria-label': draft.isNew ? '添加批注' : '编辑批注', 'data-annotation-ui': true },
        h('div', { className: 'an-popover-head' }, icon('note'), draft.isNew ? '添加批注' : '编辑批注',
          h('button', { className: 'an-icon', 'aria-label': '收起批注', title: '收起，保留草稿', onClick: () => surface.dismissDraft(), disabled: state.busy }, icon('close'))),
        h('div', { className: 'an-popover-body' },
          h('details', { className: 'an-original', open: true },
            h('summary', { title: draft.text }, `原文：${draft.text.slice(0, 48)}`),
            h('blockquote', { className: 'an-quote' }, draft.text)),
          h('textarea', { ref: input, className: 'an-input', placeholder: '写下你的批注，AI 会连同原文一起看到…', 'aria-label': '批注内容', maxLength: 24000, value: draft.comment, disabled: state.busy,
            onChange: event => surface.updateDraft(event.target.value),
            onKeyDown: event => {
              if (event.isComposing || event.nativeEvent?.isComposing || event.keyCode === 229) return;
              if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) { event.preventDefault(); surface.addToChat(); }
              else if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); surface.dismissDraft(); }
            } }),
          h(ErrorNotice, { state, surface }),
          h('div', { className: 'an-footer' }, h('span', { className: 'an-muted' }, `${draft.comment.length} 字`),
            h('button', { className: 'an-btn', title: state.loadError || '保存为会话备注，不插入输入框', disabled: state.busy || !state.loaded || !draft.comment.trim(), onClick: () => surface.commitDraft() }, '仅保存'),
            h('button', { className: 'an-btn primary', disabled: state.busy || !draft.comment.trim(), onClick: () => surface.addToChat() }, state.busy ? '处理中…' : '添加到对话')),
          h('p', { className: 'an-hint' }, '添加后会在输入框内插入带编号的注释块，随消息一起发送；Ctrl / ⌘ + Enter 可直接添加。')));
    }
    function AnnotationCard({ annotation, index, state, surface, rect }) {
      return h('div', { className: 'an-popover', style: position(rect, 380), role: 'dialog', 'aria-label': `批注 ${index + 1}`, 'data-annotation-ui': true },
        h('div', { className: 'an-popover-head' }, h('span', { className: 'an-badge' }, String(index + 1)),
          annotation.queued ? '待发送批注' : '已保存批注',
          h('button', { className: 'an-icon', 'aria-label': '关闭批注', onClick: () => surface.closeNote() }, icon('close'))),
        h('div', { className: 'an-popover-body' },
          h('blockquote', { className: 'an-quote' }, annotation.selectedText),
          h('p', { className: 'an-comment' }, annotation.comment),
          h(ErrorNotice, { state, surface }),
          h('div', { className: 'an-footer' }, h('time', { className: 'an-muted', dateTime: annotation.createdAt }, dateLabel(annotation.createdAt)),
            h('button', { className: 'an-btn quiet', disabled: state.busy, onClick: () => surface.beginDraft(null, annotation) }, '编辑'),
            h('button', { className: 'an-btn quiet danger', disabled: state.busy, onClick: () => annotation.queued ? surface.removePending(annotation.occurrenceId) : surface.remove(annotation.id) }, annotation.queued ? '移除' : '删除'),
            annotation.queued
              ? h('span', { className: 'an-muted' }, '已在输入框中')
              : h('button', { className: 'an-btn primary', disabled: state.busy, onClick: () => surface.addToChat(annotation) }, state.busy ? '处理中…' : '添加到对话'))));
    }
    function AnnotationsDock({ useSurface, surface }) {
      const state = useSurface(s => s);
      const [expanded, setExpanded] = react.useState(false);
      // A note landing in the queue is the one moment worth celebrating: the whale hops once.
      const [yay, setYay] = react.useState(false);
      const seen = react.useRef(state.pending.length);
      react.useLayoutEffect(() => {
        if (state.pending.length > seen.current) {
          setYay(true);
          const timer = setTimeout(() => setYay(false), 900);
          seen.current = state.pending.length;
          return () => clearTimeout(timer);
        }
        seen.current = state.pending.length;
      }, [state.pending.length]);
      react.useEffect(() => { surface.load(); }, [surface]);
      const jump = annotation => {
        const range = restoreRange(annotation);
        range?.startContainer.parentElement?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
        surface.openNote(annotation.id);
      };
      if (!state.pending.length && !state.draftCollapsed && !state.annotations.length && !state.error && !state.bindingId && !state.loadError) return null;
      return h('div', { className: 'an-root an-dock', 'data-annotation-ui': true },
        h('div', { className: 'an-toolbar' },
          state.pending.length > 0 && h('button', { className: 'an-chip', 'aria-expanded': expanded, onClick: () => setExpanded(!expanded), title: expanded ? '收起待发送注释' : '查看下一条消息携带的注释' },
            h(chibi, { size: 22, mood: 'waiting', yay }), `${state.pending.length} 条注释`, h('span', { className: 'an-caret' }, icon('down'))),
          state.draftCollapsed && h('button', { className: 'an-btn', onClick: () => surface.set({ draftCollapsed: false }) }, '继续编辑注释'),
          state.draftCollapsed && h('button', { className: 'an-icon', 'aria-label': '放弃注释草稿', onClick: () => surface.cancelDraft() }, icon('close'))),
        h('span', { className: 'an-status', role: 'status' }, state.pending.length ? `${state.pending.length} 条注释待发送` : ''),
        // Kept mounted so the unroll animates both ways; inert hides it from the tab order.
        state.pending.length > 0 && h('div', { className: `an-collapse${expanded ? ' open' : ''}`, inert: expanded ? undefined : '' },
          h('div', null, h('section', { className: 'an-panel', 'aria-label': '待发送注释' },
            h('div', { className: 'an-mascot' },
              h(chibi, { size: 44, mood: 'waiting', yay }),
              h('p', { className: 'an-say' }, '这 ', h('b', null, String(state.pending.length)), ' 条批注会跟着下一条消息一起发出去。')),
            h('ol', { className: 'an-pending' }, state.pending.map((item, index) => h('li', { key: item.occurrenceId, 'aria-label': `注释 ${index + 1}` },
              h('div', { className: 'an-pending-head' },
                h('span', { className: 'an-badge', title: `注释 ${index + 1}` }, String(index + 1)),
                h('span', { className: 'an-muted', style: { marginRight: 'auto' } }, '待发送'),
                h('button', { className: 'an-btn quiet', disabled: state.busy || item.annotation.unavailable, onClick: () => surface.beginDraft(null, item.annotation) }, '编辑'),
                h('button', { className: 'an-icon', disabled: state.busy, 'aria-label': `移除注释 ${index + 1}`, onClick: () => surface.removePending(item.occurrenceId) }, icon('close'))),
              h('p', { className: 'an-comment' }, item.annotation.comment),
              h('details', { className: 'an-original' }, h('summary', { title: item.annotation.selectedText }, `原文：${item.annotation.selectedText.slice(0, 48)}`), h('blockquote', { className: 'an-quote' }, item.annotation.selectedText))))),
            h('div', { className: 'an-panel-foot' }, h('button', { className: 'an-btn quiet', onClick: () => setExpanded(false) }, '收起'))))),
        h(ErrorNotice, { state, surface }),
        (state.annotations.length > 0 || state.loadError) && h('details', { className: 'an-archive' },
          h('summary', null, `已保存注释${state.annotations.length ? ` · ${state.annotations.length}` : ''}`),
          h(ErrorNotice, { state: { ...state, error: state.loadError }, surface }),
          state.annotations.length > 0 && h('div', { className: 'an-toolbar', style: { marginTop: '8px' } },
            h('button', { className: 'an-btn quiet', onClick: () => surface.export('md') }, '导出 Markdown'),
            h('button', { className: 'an-btn quiet', onClick: () => surface.export('json') }, 'JSON')),
          state.bindingId && h('div', { className: 'an-hint', role: 'status' }, '请先选中原文，再点击「添加批注」。',
            h('button', { className: 'an-btn quiet', onClick: () => surface.set({ bindingId: null }) }, '取消')),
          h('div', { className: 'an-list' }, state.annotations.map((annotation, index) => h('article', { className: 'an-item', key: annotation.id },
            h('div', { className: 'an-item-head' },
              h('button', { className: 'an-jump', onClick: () => jump(annotation), title: '定位到原文' }, h('span', { className: 'an-badge' }, String(index + 1)), '批注'),
              h('time', { className: 'an-time', dateTime: annotation.createdAt }, dateLabel(annotation.createdAt))),
            h('blockquote', { className: 'an-quote' }, annotation.selectedText), h('p', { className: 'an-comment' }, annotation.comment),
            h('div', { className: 'an-actions' }, h('button', { className: 'an-btn quiet', disabled: state.busy, onClick: () => surface.bind(annotation.id) }, '重新绑定'),
              h('button', { className: 'an-btn quiet', disabled: state.busy, onClick: () => surface.beginDraft(null, annotation) }, '编辑'),
              h('button', { className: 'an-btn quiet danger', disabled: state.busy, onClick: () => surface.remove(annotation.id) }, '删除'),
              h('button', { className: 'an-btn', disabled: state.busy, onClick: () => surface.addToChat(annotation) }, '添加到对话')))))));
    }

    function AnnotationOverlay({ useSurface, surface }) {
      const state = useSurface(s => s);
      const marker = react.useRef(null);
      const [host, setHost] = react.useState(null);
      const [pending, setPending] = react.useState(null);
      const pendingRef = react.useRef(null);
      const [geometry, setGeometry] = react.useState({ marks: [], draft: null, pending: null });
      const stateRef = react.useRef(state);
      const ranges = react.useRef(new Map());
      const pinned = react.useRef({ draft: { key: null, rect: null }, marks: new Map() });
      const remeasure = react.useRef(() => {});
      stateRef.current = state;
      react.useLayoutEffect(() => {
        const element = document.createElement('div');
        element.className = 'an-layer'; element.setAttribute('data-annotation-ui', 'true');
        document.body.appendChild(element); setHost(element);
        return () => element.remove();
      }, [surface]);
      react.useEffect(() => { surface.load(); }, [surface]);
      // Capture at most once per frame, and not at all while the pointer is dragging: reacting to
      // every selectionchange tick made text selection stutter on long replies.
      react.useLayoutEffect(() => {
        let raf = 0, dragging = false;
        const read = () => {
          const selection = window.getSelection();
          const capture = selection && !selection.isCollapsed && selection.rangeCount ? captureSelection(selection.getRangeAt(0)) : null;
          const previous = pendingRef.current;
          if (capture === previous) return;
          if (capture && previous && capture.text === previous.text && capture.anchor.start === previous.anchor.start && capture.anchor.nodeKey === previous.anchor.nodeKey) return;
          pendingRef.current = capture;
          setPending(capture);
        };
        const schedule = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; read(); }); };
        const pointerDown = event => {
          dragging = !event.target?.closest?.('[data-annotation-ui]');
          if (dragging) surface.closeNote();
        };
        const pointerUp = () => { dragging = false; schedule(); };
        const abort = () => { dragging = false; };
        const selectionChange = () => { if (!dragging) schedule(); };
        const key = event => {
          if (event.isComposing || event.keyCode === 229) return;
          if (event.key === 'Escape') {
            dragging = false;
            surface.dismissDraft(); surface.closeNote(); pendingRef.current = null; setPending(null);
            return;
          }
          schedule();
        };
        document.addEventListener('pointerdown', pointerDown, true); document.addEventListener('pointerup', pointerUp, true);
        document.addEventListener('pointercancel', abort, true); document.addEventListener('selectionchange', selectionChange);
        document.addEventListener('keyup', key);
        return () => {
          cancelAnimationFrame(raf);
          document.removeEventListener('pointerdown', pointerDown, true); document.removeEventListener('pointerup', pointerUp, true);
          document.removeEventListener('pointercancel', abort, true); document.removeEventListener('selectionchange', selectionChange);
          document.removeEventListener('keyup', key);
        };
      }, [surface]);
      // Mount once: observers kept alive for the whole session. The old version tore the whole
      // MutationObserver + ResizeObserver + scroll listeners down on every keystroke, because the
      // pending array and the draft object are new identities on each store update.
      react.useLayoutEffect(() => {
        let raf = 0, signature = '';
        const measure = () => {
          raf = 0;
          const current = stateRef.current;
          const env = measureScope(true);
          const cache = ranges.current;
          const marks = markedNotes(current).map(annotation => {
            // A live DOM Range follows the text on its own, so keep it and skip the full-text
            // search on scroll / streaming; only re-resolve when it detached or moved.
            const hit = cache.get(annotation.id);
            let range = hit && hit.text === annotation.selectedText && hit.anchor === annotation.anchor && hit.range.startContainer?.isConnected ? hit.range : null;
            if (!range) {
              range = restoreRange(annotation, env);
              if (range) cache.set(annotation.id, { range, text: annotation.selectedText, anchor: annotation.anchor });
            }
            return { id: annotation.id, comment: annotation.comment, rects: env.rects(range) };
          });
          const alive = new Set(marks.map(mark => mark.id));
          for (const key of pinned.current.marks.keys()) if (!alive.has(key)) pinned.current.marks.delete(key);
          for (const mark of marks) if (mark.rects.length) pinned.current.marks.set(mark.id, mark.rects.at(-1));
          const draft = current.draft;
          const draftRange = draft?.range?.startContainer?.isConnected ? draft.range : draft ? restoreRange({ selectedText: draft.text, anchor: draft.anchor }, env) : null;
          const next = { marks, draft: env.rects(draftRange), pending: env.rects(pendingRef.current?.range) };
          // Scroll the anchor out of its scrollport and the rects go empty; keeping the last one
          // is what stops the panel from snapping to a fallback spot mid-interaction.
          if (next.draft?.length) pinned.current.draft = { key: current.draft?.id ?? null, rect: next.draft.at(-1) };
          if (!next.draft?.length) next.draft = pinned.current.draft && pinned.current.draft.key === (current.draft?.id ?? null) && pinned.current.draft.rect ? [pinned.current.draft.rect] : [];
          const serialized = JSON.stringify(next);
          if (serialized === signature) return;
          signature = serialized;
          setGeometry(next);
        };
        const schedule = () => { if (!raf) raf = requestAnimationFrame(measure); };
        remeasure.current = schedule;
        const mutation = new MutationObserver(records => {
          if (records.some(record => !record.target.parentElement?.closest('[data-annotation-ui]') && !record.target.closest?.('[data-annotation-ui]'))) schedule();
        });
        mutation.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['hidden', 'style', 'class'] });
        const resize = new ResizeObserver(schedule);
        document.querySelectorAll('[data-chat-flow]').forEach(element => resize.observe(element));
        window.addEventListener('resize', schedule); document.addEventListener('scroll', schedule, true);
        window.visualViewport?.addEventListener('resize', schedule);
        schedule();
        return () => {
          cancelAnimationFrame(raf); remeasure.current = () => {};
          mutation.disconnect(); resize.disconnect();
          window.removeEventListener('resize', schedule); document.removeEventListener('scroll', schedule, true);
          window.visualViewport?.removeEventListener('resize', schedule);
        };
      }, []);
      react.useLayoutEffect(() => { remeasure.current(); }, [state, pending]);

      const children = [];
      geometry.marks.forEach((mark, index) => {
        mark.rects.forEach((rect, line) => children.push(h('div', { key: `hl-${mark.id}-${line}`, className: `an-highlight${state.openId === mark.id ? ' active' : ''}`, style: { left: rect.left, top: rect.top, width: rect.width, height: rect.height } })));
        const rect = mark.rects.at(-1);
        if (rect) children.push(h('button', { key: `mark-${mark.id}`, className: 'an-marker', style: { left: Math.min(rect.right + 6, window.innerWidth - 28), top: Math.max(2, rect.top - 2) }, title: `${index + 1}. ${String(mark.comment ?? '').slice(0, 160)}`, 'aria-label': `查看批注 ${index + 1}`, 'aria-expanded': state.openId === mark.id, onClick: () => surface.openNote(mark.id) }, String(index + 1)));
      });
      const selectedRect = geometry.pending?.at(-1);
      if (pending && selectedRect && !state.draft) children.push(h('button', { key: 'selection', className: 'an-selection', style: bubbleAt(geometry.pending),
        onPointerDown: event => event.preventDefault(), onClick: () => { surface.select({ ...pending, rect: selectedRect }); window.getSelection()?.removeAllRanges(); pendingRef.current = null; setPending(null); },
        'data-annotation-ui': true }, icon('note'), state.bindingId ? '绑定批注' : '添加批注'));
      // Seed order: measured anchor → the selection rect captured on open → the note's own marker.
      // Any of them beats position(null), which parks the dialog at the top for one frame.
      if (state.draft && !state.draftCollapsed) children.push(h(DraftBox, { key: state.draft.id ?? 'new', state, surface,
        rect: geometry.draft?.at(-1) ?? state.draft.rect ?? pinned.current.marks.get(state.draft.id) }));
      const notes = markedNotes(state);
      const open = notes.find(annotation => annotation.id === state.openId);
      if (open && !state.draft) children.push(h(AnnotationCard, { key: open.id, annotation: open, index: notes.findIndex(a => a.id === open.id), state, surface,
        rect: geometry.marks.find(mark => mark.id === open.id)?.rects.at(-1) ?? pinned.current.marks.get(open.id) }));
      return h(react.Fragment, null, h('span', { ref: marker, hidden: true }), host ? reactDom.createPortal(children, host) : null);
    }

    function apply(ctx) {
      ensureCss();
      const surfaces = new Map();
      const source = {
        trigger: '@', name: SOURCE, showGroupTitle: false,
        candidates: async () => [], onPick: () => undefined,
        // Unhydrated clipboard markers must never silently reach the model as ordinary text.
        matchEnter: async (session, line) => {
          const input = ctx.conversation.input.for(ctx.sessions.scope(session.sessionId));
          const state = input.state.getSnapshot();
          if ([...state.draft.matchAll(TOKEN)].some(m => !(state.occurrences ?? []).some(o => o.source === SOURCE && m.index >= o.offset && m.index < o.offset + o.length))) throw new Error('注释还未恢复，请稍后重试或重新添加');
          return undefined;
        },
        codec: { clipboardText: ref => noteToken(decodeNote(ref)), serialize: async (ref, signal) => {
          if (signal?.aborted) throw new Error('发送已取消');
          const note = decodeNote(ref);
          return `\n\n${feedbackText(note.selectedText, note.comment)}\n\n`;
        } },
      };
      const offSource = ctx.inputTriggers.registerSource(source);
      ctx.effect?.(() => offSource, 'annotation-pro: reference source');
      const surfaceFor = sessionId => {
        if (!surfaces.has(sessionId)) surfaces.set(sessionId, new AnnotationSurface(sessionId, new AnnotationQueue(ctx, sessionId)));
        return surfaces.get(sessionId);
      };
      const register = (name, id, component) => ctx.slots.inject(name, () => ctx.slots.register({
        name, id, order: 5, inject: sessionId => { const surface = surfaceFor(sessionId); return { hooks: { surface: surface.state }, surface }; },
      }, component));
      register('conversation.input.dock', 'annotation-pro-dock', AnnotationsDock);
      register('conversation.input.overlay', 'annotation-pro-overlay', AnnotationOverlay);
      ctx.effect?.(() => () => { for (const surface of surfaces.values()) surface.queue.dispose(); surfaces.clear(); document.getElementById('dsh-annotation-pro-css')?.remove(); document.getElementById('dsh-annotation-pro-sprite')?.remove(); }, 'annotation-pro: dispose');
    }
    return { apply, inject: ['slots', 'sessions', 'conversation', 'inputTriggers'] };
  },
});
