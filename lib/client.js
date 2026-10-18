window.__ModuleLoader__.load({
  id: 'dsh-annotation-pro',
  factory: require => {
    const react = require('react');
    const reactDom = require('react-dom');
    const store = require('@deepseek-ai/dsh-client-store');
    const h = react.createElement;
    const ROUTE = '/plugins/dsh-annotation-pro';
    const ROW = '[data-chat-flow-kind="assistant-step"],[data-chat-flow-kind="user"]';
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
@keyframes an-blink{0%,92%{transform:scaleY(0)}94%,97%{transform:scaleY(1)}99%,100%{transform:scaleY(0)}}
@keyframes an-yay{0%{transform:translateY(0) scale(1)}35%{transform:translateY(-4px) scale(1.12)}70%{transform:translateY(0) scale(.97)}100%{transform:translateY(0) scale(1)}}

/* ── shared bits ────────────────────────────────────────────── */
.an-badge{display:inline-flex;align-items:center;justify-content:center;flex:none;min-width:19px;height:20px;padding:0 7px;border-radius:8px;background:linear-gradient(160deg,var(--an-warn-tint),transparent),var(--an-warn-tint);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--an-warn) 34%,transparent);color:var(--an-warn);font:600 11px/1 inherit;font-variant-numeric:tabular-nums;letter-spacing:.01em;white-space:nowrap}
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
/* No plate behind the trigger: a filled pill reads as a stray white bar in the light theme. */
.an-chip{position:relative;display:inline-flex;align-items:center;gap:6px;padding:2px 10px 2px 2px;border:0;border-radius:999px;background:none;box-shadow:none;color:var(--an-warn);font-size:12px;font-weight:600;letter-spacing:.01em;transition:transform .2s var(--an-spring),background .2s var(--an-ease),color .2s var(--an-ease)}
.an-chip:hover,.an-chip[aria-expanded="true"]{background:var(--an-warn-tint);transform:translateY(-1px)}
.an-avatar{display:inline-flex;align-items:center;justify-content:center;flex:none;width:26px;height:26px;border-radius:50%;background:radial-gradient(circle at 50% 40%,color-mix(in srgb,var(--an-blue) 26%,transparent),color-mix(in srgb,var(--an-blue) 4%,transparent));transition:box-shadow .2s var(--an-ease)}
.an-chip:hover .an-avatar,.an-chip[aria-expanded="true"] .an-avatar{box-shadow:0 0 0 2px color-mix(in srgb,var(--an-blue) 26%,transparent)}
.an-caret{display:inline-flex;transition:transform .26s var(--an-spring);color:currentColor;opacity:.65}
.an-chip[aria-expanded="true"] .an-caret{transform:rotate(180deg);opacity:1}
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
/* The number comes from the note itself (注释 3), not from a CSS counter: deleting note 2 must
   not silently renumber note 3, or the number in the sent text stops matching the marker. */
[data-composer-chip="dsh-annotation-pro"]{vertical-align:baseline}
[data-composer-chip="dsh-annotation-pro"]>span{padding:0 7px!important;border-radius:6px!important;background:var(--dsw-alias-state-warn-tertiary,#3a2a10)!important;color:var(--dsw-alias-state-warn-primary,#f0c16a)!important;font-weight:600;font-size:.94em;margin:0 2px;vertical-align:baseline;cursor:default;user-select:none;white-space:nowrap;box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--dsw-alias-state-warn-primary,#f0c16a) 30%,transparent)}
[data-composer-chip="dsh-annotation-pro"]>span>span:first-child{display:none!important}
[data-composer-chip="dsh-annotation-pro"]>span>span:last-child{font-variant-numeric:tabular-nums}

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
    // The mascot: indigo hair, a frilled white headband with a blue bow, one ahoge and big blue
    // eyes — the DeepSeek girl. Everything is inline SVG built once at module load, so a copy
    // costs one innerHTML and no React reconciliation per frame.
    const INK = '#2b2f47', SKIN = '#ffe6d9';
    function chibiEye(cx) {
      return `<g>
    <ellipse cx="${cx}" cy="49.4" rx="7.4" ry="7.9" fill="#ffffff"/>
    <ellipse cx="${cx}" cy="49.2" rx="6.9" ry="7.2" fill="url(#an-iris)"/>
    <ellipse cx="${cx}" cy="50" rx="4.1" ry="4.8" fill="#1d2237"/>
    <circle cx="${cx + 2.4}" cy="46.2" r="2.3" fill="#fff"/>
    <circle cx="${cx - 2.6}" cy="52.8" r="1.15" fill="#fff" opacity=".92"/>
    <path d="M${cx - 5.4} 56.6c2.9 1.2 7.4 1.2 10.3 0" stroke="#93a4e4" stroke-width=".9" fill="none" opacity=".5" stroke-linecap="round"/>
    <path d="M${cx - 6.9} 45.6Q${cx} 41.4 ${cx + 6.9} 45.6L${cx + 6.9} 33L${cx - 6.9} 33z" fill="${SKIN}"/>
    <path d="M${cx - 6.9} 45.6Q${cx} 41.4 ${cx + 6.9} 45.6" stroke="${INK}" stroke-width="1.7" stroke-linecap="round" fill="none"/>
    <path d="M${cx + 6.4} 45.4l1.6 1.4" stroke="${INK}" stroke-width="1.3" stroke-linecap="round" opacity=".9"/>
    <rect class="c-lid" x="${cx - 7.4}" y="44.2" width="14.8" height="14.2" rx="6" fill="#ffe1d2"/>
  </g>`;
    }
    const CHIBI_BODY = (() => {
      // The headband frill: 13 scallops riding the same arc as the band underneath.
      let frills = '';
      for (let i = 0; i < 13; i++) {
        const a = (198 + (144 / 12) * i) * Math.PI / 180;
        frills += `<circle cx="${(40 + Math.cos(a) * 27).toFixed(2)}" cy="${(40 + Math.sin(a) * 27).toFixed(2)}" r="3.15" fill="#fdfdff" stroke="#dde4f7" stroke-width=".45"/>`;
      }
      return `
<path class="c-hair" fill="url(#an-hair-back)" d="M40 12.4c14.6 0 25.6 10.4 25.6 24.8 0 7.4-1.2 13.6-2.8 19.4-1.4 5.2-2.2 10.8-1.4 16-4.6-1.2-7.6-4.6-8.8-9.2-1.4 3.6-2 7.6-1.8 11.3H29.2c.2-3.7-.4-7.7-1.8-11.3-1.2 4.6-4.2 8-8.8 9.2.8-5.2 0-10.8-1.4-16-1.6-5.8-2.8-12-2.8-19.4 0-14.4 11-24.8 25.6-24.8z"/>
<g class="c-body">
<path fill="#f7d2c2" d="M35.8 58.4h8.4v13.4h-8.4z"/>
<path fill="#333c72" d="M22.6 80c.5-7 7.7-11.6 17.4-11.6S56.9 73 57.4 80z"/>
<path fill="#fbfcff" stroke="#dfe4f5" stroke-width=".5" d="M40 72.4c-2.6-2.4-6.6-2.9-9.4-1.3-1.9 1-2.5 3-1.7 4.7 1 1.9 4 1.9 6.9.3 2-1.1 3.3-2.5 4.2-3.7z"/>
<path fill="#fbfcff" stroke="#dfe4f5" stroke-width=".5" d="M40 72.4c2.6-2.4 6.6-2.9 9.4-1.3 1.9 1 2.5 3 1.7 4.7-1 1.9-4 1.9-6.9.3-2-1.1-3.3-2.5-4.2-3.7z"/>
<path fill="#3f4a86" d="M27.4 78.4c3.4-2.2 8.6-3.4 12.6-3.4s9.2 1.2 12.6 3.4c-2 1-6.4 1.6-12.6 1.6s-10.6-.6-12.6-1.6z"/>
<g transform="translate(40 74.6) scale(.44)"><path fill="#232b52" d="M0 0c-3.4-2.6-7-3.6-8.6-2-1.7 1.7-.7 5.6 1.9 7.4 1.7 1.2 4 .8 6.7-1z"/><path fill="#2d3768" d="M0 0c3.4-2.6 7-3.6 8.6-2 1.7 1.7.7 5.6-1.9 7.4-1.7 1.2-4 .8-6.7-1z"/></g>
<path fill="#b9d2ff" stroke="#5f7ee0" stroke-width=".4" d="M40 72.2l1.8 2-1.8 2.3-1.8-2.3z"/>
</g>
<path fill="url(#an-skin)" d="M40 19.4c13 0 22.4 9.2 22.4 22.4 0 13.6-10 23.8-22.4 23.8S17.6 55.4 17.6 41.8C17.6 28.6 27 19.4 40 19.4z"/>
<ellipse cx="17.8" cy="44" rx="2.3" ry="3.4" fill="#ffd9ca"/><ellipse cx="62.2" cy="44" rx="2.3" ry="3.4" fill="#ffd9ca"/>
${chibiEye(30.4)}${chibiEye(49.6)}
<ellipse cx="24" cy="56.4" rx="4.4" ry="2.6" fill="#ff9db1" opacity=".34"/><ellipse cx="56" cy="56.4" rx="4.4" ry="2.6" fill="#ff9db1" opacity=".34"/>
<path d="M22.2 56l1.1 2.5M24.8 55.5l1.1 2.5" stroke="#f67f96" stroke-width=".9" stroke-linecap="round" opacity=".4"/>
<path d="M54.1 55.5l1.1 2.5M56.7 56l1.1 2.5" stroke="#f67f96" stroke-width=".9" stroke-linecap="round" opacity=".4"/>
<path d="M38.4 60.6c1.2 1.3 2.4 1.3 3.6 0" stroke="#bd5f57" stroke-width="1.3" stroke-linecap="round" fill="none"/>
<path fill="url(#an-hair)" d="M40 18.3C53.6 18.3 63.2 27.4 63.4 40.4C63.6 44.4 63.2 48.2 62.2 51.2C60.8 44.6 58.6 39.6 55.2 35.6C53 36.4 50.4 37 48.2 37.6C47 37 45.4 33.4 44.2 31.6C42.6 34.4 41.4 36.2 40.2 37.8C37 35.8 35 35.6 33.2 35.6C29.8 39.6 27.6 44.6 26.2 51.2C25.2 48 24.8 44.4 25 40.4C18.4 27.2 26.6 18.3 40 18.3z"/>
<path fill="#a6b3f7" opacity=".38" d="M21.6 31c2.6-7.4 9.8-12.2 18.4-12.2 4.6 0 8.8 1.2 12.2 3.4-4.8-1.4-9.4-2-14-2-7.8 0-14 3.4-16.6 10.8z"/>
<g>${frills}
<path d="M16.6 30A26.2 26.2 0 0 1 63.4 30" stroke="#fdfdff" stroke-width="6.2" stroke-linecap="round" fill="none"/>
<path d="M16.6 32.8A26.2 26.2 0 0 1 63.4 32.8" stroke="#dde4f7" stroke-width=".8" stroke-linecap="round" fill="none" opacity=".95"/></g>
<path fill="url(#an-hair)" d="M19.6 28.6c-2.6 4.4-3.8 9.8-3.4 15.8.4 7 2.4 12.8 3.2 20.6 2.6-1.8 3.8-4.6 3.6-8-.2-3.4.4-6.4.4-10.4 0-6.4-.8-12.2-3.8-18z"/>
<path fill="url(#an-hair)" d="M60.4 28.6c2.6 4.4 3.8 9.8 3.4 15.8-.4 7-2.4 12.8-3.2 20.6-2.6-1.8-3.8-4.6-3.6-8 .2-3.4-.4-6.4-.4-10.4 0-6.4.8-12.2 3.8-18z"/>
<g class="c-ahoge"><path d="M46 23.4C44.8 17 47.2 11.8 51.6 8.6" stroke="url(#an-hair)" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M51.6 8.6c2.2-1.3 3.9-.8 4.5 1.2" stroke="url(#an-hair)" stroke-width="3" stroke-linecap="round" fill="none"/></g>
<g transform="translate(57.6 25.6) rotate(-12)"><path d="M0 1c-2.9-2.5-5.9-3.6-7.4-2.2-1.6 1.5-.7 4.9 1.4 6.6 1.6 1.3 3.6 1 5.7-.4z" fill="#3f57c9"/><path d="M0 1c2.9-2.5 5.9-3.6 7.4-2.2 1.6 1.5.7 4.9-1.4 6.6-1.6 1.3-3.6 1-5.7-.4z" fill="#4d6bfe"/><circle cx="0" cy="1.6" r="1.9" fill="#33429c"/></g>`;
    })();
    function chibi({ size = 22, mood = 'idle', yay = false }) {
      return h('svg', {
        // Small copies crop to the face; only a large one is worth the full bust.
        className: 'an-chibi', viewBox: size >= 44 ? '0 0 80 80' : '11 13 58 58', width: size, height: size, focusable: false,
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
        '<linearGradient id="an-hair" x1=".1" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="#7f92ea"/><stop offset=".5" stop-color="#5566c4"/><stop offset="1" stop-color="#3b4788"/></linearGradient>' +
        '<linearGradient id="an-hair-back" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4e5ba8"/><stop offset="1" stop-color="#31396e"/></linearGradient>' +
        '<radialGradient id="an-skin" cx=".42" cy=".3" r=".85"><stop offset="0" stop-color="#fff7f1"/><stop offset="1" stop-color="#ffe4d5"/></radialGradient>' +
        '<linearGradient id="an-iris" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5b6cc0"/><stop offset=".62" stop-color="#3b4d9e"/><stop offset="1" stop-color="#242c50"/></linearGradient>' +
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

    // One number per note, minted once and kept with it. A CSS counter silently renumbers after
    // any deletion, which would break the promise that `注释 3` in the sent text is marker 3.
    function ordinalOf(annotation, index) {
      return Number.isSafeInteger(annotation?.ordinal) && annotation.ordinal > 0 ? annotation.ordinal : index + 1;
    }
    const noteNumber = note => (Number.isSafeInteger(note?.ordinal) && note.ordinal > 0 ? note.ordinal : 1);
    const noteLabel = note => `注释 ${noteNumber(note)}`;
    function feedbackText(note) {
      // The transcript carries the marker; repeating the quoted passage here only buried the
      // actual instruction, so the message names the note and gets straight to the comment.
      return `${noteLabel(note)}：${note.comment.trim()}`.replace(/[\uE100-\uE11D\uFFFC]/gu, '');
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
      if (note.ordinal !== undefined && !(Number.isSafeInteger(note.ordinal) && note.ordinal > 0)) throw new Error('注释编号无效，请重新添加');
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
        const ok = this.actx.bail('slash/input-insert-reference', { reference: { source: SOURCE, ref: JSON.stringify(note), label: noteLabel(note), clipboardText: noteToken(note) }, span });
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
          id: annotation?.id ?? randomUUID(), isNew: !annotation, comment: annotation?.comment ?? '', ordinal: annotation?.ordinal,
          range: selection?.range ?? null, rect: selection?.rect ?? null }, draftCollapsed: false, openId: null, error: '', bindingId: null });
      }
      // Highest number ever handed out, plus one — never the list length, which would collide
      // after any deletion.
      nextOrdinal() {
        const state = this.state.getSnapshot();
        let max = 0;
        state.annotations.forEach((a, index) => { max = Math.max(max, ordinalOf(a, index)); });
        for (const item of state.pending) if (Number.isSafeInteger(item.annotation.ordinal)) max = Math.max(max, item.annotation.ordinal);
        return max + 1;
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
          this.queue.add({ id: annotation?.id ?? state.draft.id, selectedText: text, comment: comment.trim(), ordinal: annotation?.ordinal ?? state.draft?.ordinal ?? this.nextOrdinal(), anchor: annotation?.anchor ?? state.draft?.anchor });
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
            selectedText: draft.text, comment: draft.comment, anchor: draft.anchor, ordinal: draft.ordinal ?? this.nextOrdinal(),
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
        h('div', { className: 'an-popover-head' }, icon('note'), draft.isNew ? '添加批注' : draft.ordinal ? `编辑注释 ${draft.ordinal}` : '编辑批注',
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
          h('p', { className: 'an-hint' }, '添加后输入框里会出现「注释 N」标签；发送时只带编号和批注内容，不再重复原文。Ctrl / ⌘ + Enter 可直接添加。')));
    }
    function AnnotationCard({ annotation, ordinal, state, surface, rect }) {
      return h('div', { className: 'an-popover', style: position(rect, 380), role: 'dialog', 'aria-label': `注释 ${ordinal}`, 'data-annotation-ui': true },
        h('div', { className: 'an-popover-head' }, h('span', { className: 'an-badge' }, `注释 ${ordinal}`),
          annotation.queued ? '待发送' : '已保存',
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
      // The trigger wears the note numbers themselves, so it never reads as a second, competing
      // "N 条注释" entry next to the chips in the composer.
      const ordinals = state.pending.map((item, index) => item.annotation.ordinal ?? index + 1);
      const chipLabel = ordinals.length > 3 ? `注释 ${ordinals.slice(0, 3).join('、')} 等 ${ordinals.length} 条` : `注释 ${ordinals.join('、')}`;
      return h('div', { className: 'an-root an-dock', 'data-annotation-ui': true },
        h('div', { className: 'an-toolbar' },
          state.pending.length > 0 && h('button', { className: 'an-chip', 'aria-expanded': expanded, onClick: () => setExpanded(!expanded), title: expanded ? '收起待发送注释' : '查看下一条消息携带的注释' },
            h('span', { className: 'an-avatar' }, h(chibi, { size: 22, mood: 'waiting', yay })), chipLabel, h('span', { className: 'an-caret' }, icon('down'))),
          state.draftCollapsed && h('button', { className: 'an-btn', onClick: () => surface.set({ draftCollapsed: false }) }, '继续编辑注释'),
          state.draftCollapsed && h('button', { className: 'an-icon', 'aria-label': '放弃注释草稿', onClick: () => surface.cancelDraft() }, icon('close'))),
        h('span', { className: 'an-status', role: 'status' }, state.pending.length ? `${state.pending.length} 条注释待发送` : ''),
        // Kept mounted so the unroll animates both ways; inert hides it from the tab order.
        state.pending.length > 0 && h('div', { className: `an-collapse${expanded ? ' open' : ''}`, inert: expanded ? undefined : '' },
          h('div', null, h('section', { className: 'an-panel', 'aria-label': '待发送注释' },
            h('div', { className: 'an-mascot' },
              h(chibi, { size: 44, mood: 'waiting', yay }),
              h('p', { className: 'an-say' }, '这 ', h('b', null, String(state.pending.length)), ' 条批注会跟着下一条消息一起发出去。')),
            h('ol', { className: 'an-pending' }, state.pending.map((item, index) => h('li', { key: item.occurrenceId, 'aria-label': `注释 ${item.annotation.ordinal ?? index + 1}` },
              h('div', { className: 'an-pending-head' },
                h('span', { className: 'an-badge', title: `注释 ${item.annotation.ordinal ?? index + 1}` }, `注释 ${item.annotation.ordinal ?? index + 1}`),
                h('span', { className: 'an-muted', style: { marginRight: 'auto' } }, '待发送'),
                h('button', { className: 'an-btn quiet', disabled: state.busy || item.annotation.unavailable, onClick: () => surface.beginDraft(null, item.annotation) }, '编辑'),
                h('button', { className: 'an-icon', disabled: state.busy, 'aria-label': `移除注释 ${item.annotation.ordinal ?? index + 1}`, onClick: () => surface.removePending(item.occurrenceId) }, icon('close'))),
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
              h('button', { className: 'an-jump', onClick: () => jump(annotation), title: '定位到原文' }, h('span', { className: 'an-badge' }, `注释 ${ordinalOf(annotation, index)}`)),
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
          const marks = markedNotes(current).map((annotation, index) => {
            // A live DOM Range follows the text on its own, so keep it and skip the full-text
            // search on scroll / streaming; only re-resolve when it detached or moved.
            const hit = cache.get(annotation.id);
            let range = hit && hit.text === annotation.selectedText && hit.anchor === annotation.anchor && hit.range.startContainer?.isConnected ? hit.range : null;
            if (!range) {
              range = restoreRange(annotation, env);
              if (range) cache.set(annotation.id, { range, text: annotation.selectedText, anchor: annotation.anchor });
            }
            return { id: annotation.id, comment: annotation.comment, ordinal: ordinalOf(annotation, index), rects: env.rects(range) };
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
      geometry.marks.forEach(mark => {
        mark.rects.forEach((rect, line) => children.push(h('div', { key: `hl-${mark.id}-${line}`, className: `an-highlight${state.openId === mark.id ? ' active' : ''}`, style: { left: rect.left, top: rect.top, width: rect.width, height: rect.height } })));
        const rect = mark.rects.at(-1);
        if (rect) children.push(h('button', { key: `mark-${mark.id}`, className: 'an-marker', style: { left: Math.min(rect.right + 6, window.innerWidth - 28), top: Math.max(2, rect.top - 2) }, title: `注释 ${mark.ordinal}：${String(mark.comment ?? '').slice(0, 160)}`, 'aria-label': `查看注释 ${mark.ordinal}`, 'aria-expanded': state.openId === mark.id, onClick: () => surface.openNote(mark.id) }, String(mark.ordinal)));
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
      if (open && !state.draft) children.push(h(AnnotationCard, { key: open.id, annotation: open, ordinal: ordinalOf(open, notes.findIndex(a => a.id === open.id)), state, surface,
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
          return `\n\n${feedbackText(note)}\n\n`;
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
