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
/* One bitmap, so there are no limbs to animate: the whole frame breathes, and hops when a note
   lands. Both keyframes touch transform only, which keeps it on the compositor. */
.an-chibi{display:block;width:var(--an-chibi,22px);height:var(--an-chibi,22px);flex:none;object-fit:contain;user-select:none;-webkit-user-drag:none;pointer-events:none;transform-origin:50% 90%;animation:an-breathe 4.2s cubic-bezier(.45,0,.55,1) infinite;will-change:transform}
.an-chibi[data-mood="waiting"]{animation-duration:2.9s}
.an-chibi[data-mood="typing"]{animation-duration:2.3s}
.an-chibi[data-yay="true"]{animation:an-yay .9s var(--an-spring)}
@keyframes an-breathe{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-.5px) scale(1.022)}}
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
@media(prefers-reduced-motion:reduce){.an-popover,.an-selection,.an-collapse,.an-btn,.an-chip,.an-icon,.an-marker,.an-pending>li,.an-item{animation:none;transition:none}.an-chibi{animation:none!important;transform:none!important}}
`;

    function icon(name) {
      const paths = { note: 'M4 3h12v10l-4 4H4z M7 7h6 M7 10h4 M12 17v-4h4', close: 'M5 5l10 10 M15 5L5 15', down: 'M5 8l5 5 5-5' };
      return h('svg', { viewBox: '0 0 20 20', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }, h('path', { d: paths[name] }));
    }
    // The mascot is the drawing the owner picked — not a redraw of it. 176px square, the white
    // background flooded out at build time and inlined as a WebP data URI, so there is no asset
    // path to resolve and no request that can 404. It is one flat picture, so the motion lives on
    // the whole frame: a slow breath, and a hop when a note lands.
    const CHIBI_SRC = 'data:image/webp;base64,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';
    function chibi({ size = 22, mood = 'idle', yay = false }) {
      return h('img', {
        className: 'an-chibi', src: CHIBI_SRC, width: size, height: size, alt: '', draggable: false,
        style: { '--an-chibi': `${size}px` }, 'data-mood': mood, 'data-yay': yay ? 'true' : 'false', 'aria-hidden': true,
      });
    }
    function ensureCss() {
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
      ctx.effect?.(() => () => { for (const surface of surfaces.values()) surface.queue.dispose(); surfaces.clear(); document.getElementById('dsh-annotation-pro-css')?.remove(); }, 'annotation-pro: dispose');
    }
    return { apply, inject: ['slots', 'sessions', 'conversation', 'inputTriggers'] };
  },
});
