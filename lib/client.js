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
    const CSS = `
.an-root,.an-popover,.an-selection{font-family:inherit;font-size:13px;line-height:1.5;color:var(--dsw-alias-label-primary,#ececec);--an-surface:var(--dsw-alias-bg-layer-2,#252525);--an-border:var(--dsw-alias-border-l4,#555);--an-muted:var(--dsw-alias-label-secondary,#bcbcbc);--an-accent:var(--dsw-alias-label-primary,#ececec)}
.an-root button,.an-popover button,.an-selection{font:inherit;cursor:pointer}.an-popover svg{width:16px;height:16px;flex:none}
.an-root button:focus-visible,.an-popover button:focus-visible,.an-selection:focus-visible,.an-input:focus-visible{outline:2px solid var(--an-accent,#ececec);outline-offset:3px}
.an-dock{padding:8px 0}.an-toolbar{display:flex;align-items:center;gap:8px}.an-toggle{display:flex;align-items:center;gap:7px;border:0;background:none;color:inherit;padding:4px 0;font-weight:600}.an-tools{margin-left:auto;display:flex;gap:4px}
.an-chip{display:inline-flex;align-items:center;gap:7px;padding:8px 12px;border:1px solid var(--an-border);border-radius:15px;background:var(--dsw-alias-bg-layer-1,#1d1d1d);color:inherit;font-weight:600}.an-chip svg{width:16px;height:16px;color:var(--an-muted)}.an-chip:hover,.an-chip[aria-expanded="true"]{background:var(--dsw-alias-interactive-bg-hover,#383838)}.an-pending{margin:10px 0 0;padding:0;list-style:none;max-height:320px;overflow:auto;scrollbar-width:thin}.an-pending>li{padding:12px 0;border-top:1px solid var(--an-border)}.an-pending-head{display:flex;align-items:center;gap:8px;margin-bottom:6px}.an-pending-head strong{margin-right:auto}.an-original{margin-top:8px;color:var(--an-muted);font-size:12px}.an-original summary{cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.an-original .an-quote{margin:8px 0 0}.an-archive{margin-top:10px}.an-archive>summary{cursor:pointer;color:var(--an-muted);font-size:12px}.an-resume{margin-left:8px}.an-status{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
[data-composer-chip="dsh-annotation-pro"]{display:none!important}
[data-annotation-empty][data-placeholder]::before{content:attr(data-placeholder);color:var(--dsw-alias-label-caption,#aaa);pointer-events:none;user-select:none;position:absolute;inset:4px 8px auto 14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.an-btn{border:1px solid var(--an-border);border-radius:7px;padding:5px 10px;color:inherit;background:transparent;white-space:nowrap}.an-btn:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover,#383838)}.an-btn:disabled{opacity:.55;cursor:default}.an-btn.primary{background:var(--an-accent);color:var(--an-surface);border-color:transparent}.an-icon{display:inline-flex;align-items:center;justify-content:center;border:0;background:none;color:inherit;padding:5px;border-radius:5px}.an-icon:hover{background:var(--dsw-alias-interactive-bg-hover,#383838)}.an-icon svg,.an-toggle svg,.an-selection svg{width:16px;height:16px;flex:none}
.an-list{max-height:280px;overflow:auto;margin-top:6px;scrollbar-width:thin}.an-item{padding:12px 0;border-top:1px solid var(--an-border)}.an-item-head{display:flex;gap:8px;align-items:center;margin-bottom:6px}.an-jump{border:0;background:none;color:inherit;font-weight:600;padding:0;text-align:left}.an-time{margin-left:auto;color:var(--an-muted);font-size:11px}.an-quote{margin:0 0 8px;padding:8px 10px;background:var(--dsw-alias-bg-layer-1,#1d1d1d);border-radius:6px;color:var(--an-muted);font-size:12px;white-space:pre-wrap;overflow-wrap:anywhere;max-height:96px;overflow:auto}.an-comment{margin:0;white-space:pre-wrap;overflow-wrap:anywhere}.an-actions{display:flex;justify-content:flex-end;gap:4px;margin-top:8px}.an-error{color:var(--dsw-alias-label-primary,#ececec);padding:8px 0;display:flex;align-items:center;gap:8px;flex-wrap:wrap}.an-muted{color:var(--an-muted);font-size:12px}.an-dock-hint{margin:8px 0}
.an-layer{position:fixed;inset:0;z-index:2147482800;pointer-events:none}.an-highlight{position:absolute;background:rgba(245,192,86,.19);box-shadow:inset 0 -1px rgba(245,192,86,.65);border-radius:2px;pointer-events:none}.an-highlight.active{background:rgba(245,192,86,.32)}
.an-marker{position:absolute;pointer-events:auto;display:flex;align-items:center;justify-content:center;min-width:20px;height:20px;border-radius:5px;border:1px solid #93713b;background:#ead2a7;color:#342616;cursor:pointer;font:600 11px/1 inherit;padding:0 4px}.an-marker:hover,.an-marker[aria-expanded="true"]{background:#f4dfb9}
.an-selection{position:fixed;pointer-events:auto;display:flex;align-items:center;gap:6px;padding:6px 10px;border-radius:7px;border:1px solid var(--an-border);background:var(--an-surface);box-shadow:0 5px 18px #0003;z-index:2147482802}
.an-popover{position:fixed;pointer-events:auto;box-sizing:border-box;width:min(360px,calc(100vw - 24px));max-height:calc(100vh - 24px);overflow:auto;padding:14px;border-radius:12px;background:var(--an-surface);box-shadow:0 8px 30px #0004;z-index:2147482803}.an-popover-head{display:flex;align-items:center;gap:8px;margin-bottom:10px;font-weight:600}.an-popover-head .an-icon{margin-left:auto}.an-input{display:block;box-sizing:border-box;width:100%;min-height:88px;max-height:240px;resize:vertical;padding:10px;border:1px solid var(--an-border);border-radius:7px;background:var(--dsw-alias-bg-layer-1,#1d1d1d);color:inherit;font:inherit;line-height:1.6;caret-color:var(--an-accent)}.an-input::placeholder{color:var(--an-muted)}.an-footer{display:flex;align-items:center;gap:8px;margin-top:10px}.an-footer .an-muted{margin-right:auto}.an-popover::selection,.an-input::selection{background:rgba(245,192,86,.3)}
@media(max-width:480px){.an-input{font-size:16px}.an-tools{gap:2px}.an-btn{padding:5px 8px}.an-footer .an-muted{font-size:11px}}
`;

    function icon(name) {
      const paths = { note: 'M4 3h12v10l-4 4H4z M7 7h6 M7 10h4 M12 17v-4h4', close: 'M5 5l10 10 M15 5L5 15', down: 'M5 8l5 5 5-5' };
      return h('svg', { viewBox: '0 0 20 20', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }, h('path', { d: paths[name] }));
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
    function restoreRange(annotation, scope = document) {
      const anchor = annotation.anchor;
      let roots = [...scope.querySelectorAll(ROW)].filter(visible);
      const key = anchor?.nodeKey || annotation.messageId;
      if (key) roots = roots.filter(root => (root.getAttribute('data-chat-node-key') ?? root.getAttribute('data-chat-flow-key')) === key);
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
          this.updatePlaceholder();
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
      updatePlaceholder() {
        const root = this.input.editor?.getRootElement();
        if (!root) return;
        const state = this.input.state.getSnapshot();
        const notes = (state.occurrences ?? []).filter(o => o.source === SOURCE);
        let text = state.draft;
        for (const note of [...notes].reverse()) text = text.slice(0, note.offset) + text.slice(note.offset + note.length);
        root.toggleAttribute('data-annotation-empty', notes.length > 0 && !text.trim());
      }
      dispose() { this.disposed = true; this.off?.(); this.input.editor?.getRootElement()?.removeAttribute('data-annotation-empty'); }
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
        this.set({ draft: { text: selection?.text ?? annotation?.selectedText, anchor: selection?.anchor ?? annotation?.anchor ?? null,
          id: annotation?.id ?? randomUUID(), isNew: !annotation, comment: annotation?.comment ?? '', range: selection?.range ?? null }, draftCollapsed: false, openId: null, error: '', bindingId: null });
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
      closeNote() { this.set({ openId: null }); }
      bind(id) { if (!this.state.getSnapshot().busy) this.set({ bindingId: id, openId: null, error: '' }); }
      select(selection) {
        const id = this.state.getSnapshot().bindingId;
        const annotation = id ? this.state.getSnapshot().annotations.find(a => a.id === id) : null;
        this.beginDraft(selection, annotation);
      }
      async export(fmt) {
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

    function position(rect, width = 360, height = 280) {
      const viewport = window.visualViewport;
      const leftEdge = viewport?.offsetLeft ?? 0, topEdge = viewport?.offsetTop ?? 0;
      const right = leftEdge + (viewport?.width ?? window.innerWidth), bottom = topEdge + (viewport?.height ?? window.innerHeight);
      const actualWidth = Math.min(width, right - leftEdge - 24);
      const left = Math.max(leftEdge + 12, Math.min(rect ? rect.left : right / 2 - actualWidth / 2, right - actualWidth - 12));
      const preferred = rect ? rect.bottom + 10 : topEdge + 48;
      const top = Math.max(topEdge + 12, Math.min(preferred, bottom - Math.min(height, bottom - topEdge - 24) - 12));
      return { left, top };
    }
    function rectsOf(range) {
      if (!range?.startContainer.isConnected || !range?.endContainer.isConnected) return [];
      const root = range.startContainer.parentElement?.closest(ROW);
      if (!root || !visible(root)) return [];
      // Clip the fixed overlays to every scrollport so they cannot cover the composer.
      let bounds = { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight };
      for (let element = root.parentElement; element; element = element.parentElement) {
        const style = getComputedStyle(element);
        const box = element.getBoundingClientRect();
        if (/(auto|scroll|hidden|clip)/.test(style.overflowY)) { bounds.top = Math.max(bounds.top, box.top); bounds.bottom = Math.min(bounds.bottom, box.bottom); }
        if (/(auto|scroll|hidden|clip)/.test(style.overflowX)) { bounds.left = Math.max(bounds.left, box.left); bounds.right = Math.min(bounds.right, box.right); }
      }
      const result = [];
      for (const rect of range.getClientRects()) {
        const left = Math.max(rect.left, bounds.left), top = Math.max(rect.top, bounds.top);
        const right = Math.min(rect.right, bounds.right), bottom = Math.min(rect.bottom, bounds.bottom);
        if (right > left && bottom > top) {
          const clipped = { left, top, right, bottom, width: right - left, height: bottom - top };
          if (!result.some(r => Math.abs(r.left - left) < 1 && Math.abs(r.top - top) < 1 && Math.abs(r.width - clipped.width) < 1 && Math.abs(r.height - clipped.height) < 1)) result.push(clipped);
        }
      }
      return result;
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
      return h('div', { ref: panel, className: 'an-popover', style: position(rect, 360, height), role: 'dialog', 'aria-label': draft.isNew ? '添加批注' : '编辑批注', 'data-annotation-ui': true },
        h('div', { className: 'an-popover-head' }, icon('note'), draft.isNew ? '添加批注' : '编辑批注',
          h('button', { className: 'an-icon', 'aria-label': '收起批注', title: '收起，保留草稿', onClick: () => surface.dismissDraft(), disabled: state.busy }, icon('close'))),
        h('details', { className: 'an-original' }, h('summary', { title: draft.text }, `原文：${draft.text.slice(0, 56)}`), h('blockquote', { className: 'an-quote' }, draft.text)),
        h('textarea', { ref: input, className: 'an-input', placeholder: '写下你的批注…', 'aria-label': '批注内容', maxLength: 24000, value: draft.comment, disabled: state.busy,
          onChange: event => surface.updateDraft(event.target.value),
          onKeyDown: event => {
            if (event.isComposing || event.nativeEvent?.isComposing || event.keyCode === 229) return;
            if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) { event.preventDefault(); surface.addToChat(); }
            else if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); surface.dismissDraft(); }
          } }),
        h(ErrorNotice, { state, surface }),
        h('p', { className: 'an-muted an-dock-hint' }, '以注释附在下一条消息中，发送时 AI 会看到原文和批注。'),
        h('div', { className: 'an-footer' }, h('span', { className: 'an-muted' }, 'Ctrl / ⌘ + Enter'),
          h('button', { className: 'an-btn', title: state.loadError || '保存为会话备注', disabled: state.busy || !state.loaded || !draft.comment.trim(), onClick: () => surface.commitDraft() }, '仅保存'),
          h('button', { className: 'an-btn primary', disabled: state.busy || !draft.comment.trim(), onClick: () => surface.addToChat() }, state.busy ? '处理中…' : '添加到对话')));
    }
    function AnnotationCard({ annotation, index, state, surface, rect }) {
      return h('div', { className: 'an-popover', style: position(rect), role: 'dialog', 'aria-label': `批注 ${index + 1}`, 'data-annotation-ui': true },
        h('div', { className: 'an-popover-head' }, icon('note'), `批注 ${index + 1}`,
          h('button', { className: 'an-icon', 'aria-label': '关闭批注', onClick: () => surface.closeNote() }, icon('close'))),
        h('blockquote', { className: 'an-quote' }, annotation.selectedText),
        h('p', { className: 'an-comment' }, annotation.comment),
        h(ErrorNotice, { state, surface }),
        h('div', { className: 'an-footer' }, h('time', { className: 'an-muted', dateTime: annotation.createdAt }, dateLabel(annotation.createdAt)),
          h('button', { className: 'an-btn', disabled: state.busy, onClick: () => surface.beginDraft(null, annotation) }, '编辑'),
          h('button', { className: 'an-btn', disabled: state.busy, onClick: () => annotation.queued ? surface.removePending(annotation.occurrenceId) : surface.remove(annotation.id) }, annotation.queued ? '移除' : '删除'),
          h('button', { className: 'an-btn primary', disabled: state.busy, onClick: () => surface.addToChat(annotation) }, state.busy ? '处理中…' : '添加到对话')));
    }
    function AnnotationsDock({ useSurface, surface }) {
      const state = useSurface(s => s);
      const [expanded, setExpanded] = react.useState(false);
      react.useEffect(() => { surface.load(); }, [surface]);
      const jump = annotation => {
        const range = restoreRange(annotation);
        range?.startContainer.parentElement?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
        surface.openNote(annotation.id);
      };
      if (!state.pending.length && !state.draftCollapsed && !state.annotations.length && !state.error && !state.bindingId && !state.loadError) return null;
      return h('div', { className: 'an-root an-dock', 'data-annotation-ui': true },
        h('div', { className: 'an-toolbar' },
          state.pending.length > 0 && h('button', { className: 'an-chip', 'aria-expanded': expanded, onClick: () => setExpanded(!expanded), title: '查看下一条消息携带的注释' }, icon('note'), `${state.pending.length} 条注释`),
          state.draftCollapsed && h('button', { className: 'an-btn an-resume', onClick: () => surface.set({ draftCollapsed: false }) }, '继续编辑注释'),
          state.draftCollapsed && h('button', { className: 'an-icon', 'aria-label': '放弃注释草稿', onClick: () => surface.cancelDraft() }, icon('close'))),
        h('span', { className: 'an-status', role: 'status' }, state.pending.length ? `${state.pending.length} 条注释待发送` : ''),
        expanded && state.pending.length > 0 && h('section', { 'aria-label': '待发送注释' },
          h('p', { className: 'an-muted an-dock-hint' }, '随下一条消息发送。也可以直接点击发送，只发送这些注释。'),
          h('ol', { className: 'an-pending' }, state.pending.map((item, index) => h('li', { key: item.occurrenceId },
            h('div', { className: 'an-pending-head' }, h('strong', null, `注释 ${index + 1}`),
              h('button', { className: 'an-btn', disabled: state.busy || item.annotation.unavailable, onClick: () => surface.beginDraft(null, item.annotation) }, '编辑'),
              h('button', { className: 'an-icon', disabled: state.busy, 'aria-label': `移除注释 ${index + 1}`, onClick: () => surface.removePending(item.occurrenceId) }, icon('close'))),
            h('p', { className: 'an-comment' }, item.annotation.comment),
            h('details', { className: 'an-original' }, h('summary', { title: item.annotation.selectedText }, `原文：${item.annotation.selectedText.slice(0, 56)}`), h('blockquote', { className: 'an-quote' }, item.annotation.selectedText))))),
          h('button', { className: 'an-btn', onClick: () => setExpanded(false) }, '收起')),
        h(ErrorNotice, { state, surface }),
        (state.annotations.length > 0 || state.loadError) && h('details', { className: 'an-archive' }, h('summary', null, `已保存注释${state.annotations.length ? `（${state.annotations.length}）` : ''}`),
          h(ErrorNotice, { state: { ...state, error: state.loadError }, surface }),
          h('div', { className: 'an-toolbar' },
          state.annotations.length > 0 && h('div', { className: 'an-tools' },
            h('button', { className: 'an-btn', onClick: () => surface.export('md') }, '导出 Markdown'),
            h('button', { className: 'an-btn', onClick: () => surface.export('json') }, 'JSON'))),
        state.bindingId && h('div', { className: 'an-error', role: 'status' }, '请选中原文，再点击“绑定批注”。', h('button', { className: 'an-btn', onClick: () => surface.set({ bindingId: null }) }, '取消')),
        h('div', { className: 'an-list' }, state.annotations.map((annotation, index) => h('article', { className: 'an-item', key: annotation.id },
          h('div', { className: 'an-item-head' }, h('button', { className: 'an-jump', onClick: () => jump(annotation) }, `批注 ${index + 1}`), h('time', { className: 'an-time', dateTime: annotation.createdAt }, dateLabel(annotation.createdAt))),
          h('blockquote', { className: 'an-quote' }, annotation.selectedText), h('p', { className: 'an-comment' }, annotation.comment),
          h('div', { className: 'an-actions' }, h('button', { className: 'an-btn', disabled: state.busy, onClick: () => surface.bind(annotation.id) }, '重新绑定'),
            h('button', { className: 'an-btn', disabled: state.busy, onClick: () => surface.beginDraft(null, annotation) }, '编辑'),
            h('button', { className: 'an-btn', disabled: state.busy, onClick: () => surface.remove(annotation.id) }, '删除'),
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
      stateRef.current = state;
      react.useLayoutEffect(() => {
        const element = document.createElement('div');
        element.className = 'an-layer'; element.setAttribute('data-annotation-ui', 'true');
        document.body.appendChild(element); setHost(element);
        return () => element.remove();
      }, [surface]);
      react.useEffect(() => { surface.load(); }, [surface]);
      react.useEffect(() => {
        let timer;
        const handleSelection = () => {
          if (stateRef.current.draft) return;
          const selection = window.getSelection();
          const capture = selection && !selection.isCollapsed && selection.rangeCount ? captureSelection(selection.getRangeAt(0)) : null;
          pendingRef.current = capture; setPending(capture);
        };
        const schedule = () => { clearTimeout(timer); timer = setTimeout(handleSelection, 0); };
        const key = event => {
          if (event.isComposing || event.keyCode === 229) return;
          if (event.key === 'Escape') {
            surface.dismissDraft(); surface.closeNote(); pendingRef.current = null; setPending(null);
          } else schedule();
        };
        const outside = event => {
          if (event.target.closest?.('[data-annotation-ui]')) return;
          surface.closeNote();
        };
        document.addEventListener('pointerup', schedule); document.addEventListener('keyup', key); document.addEventListener('pointerdown', outside); document.addEventListener('selectionchange', schedule);
        return () => { clearTimeout(timer); document.removeEventListener('pointerup', schedule); document.removeEventListener('keyup', key); document.removeEventListener('pointerdown', outside); document.removeEventListener('selectionchange', schedule); };
      }, [surface]);
      react.useLayoutEffect(() => {
        let raf = 0;
        let previous = '';
        const measure = () => {
          raf = 0;
          const current = stateRef.current;
          const marks = markedNotes(current).map(annotation => ({ id: annotation.id, rects: rectsOf(restoreRange(annotation)) }));
          const draftRange = current.draft?.range?.startContainer.isConnected ? current.draft.range : current.draft ? restoreRange({ selectedText: current.draft.text, anchor: current.draft.anchor }) : null;
          const next = { marks, draft: rectsOf(draftRange), pending: rectsOf(pendingRef.current?.range) };
          const signature = JSON.stringify(next);
          if (signature !== previous) { previous = signature; setGeometry(next); }
        };
        const schedule = () => { if (!raf) raf = requestAnimationFrame(measure); };
        const mutation = new MutationObserver(records => {
          if (records.some(record => !record.target.parentElement?.closest('[data-annotation-ui]') && !record.target.closest?.('[data-annotation-ui]'))) schedule();
        });
        mutation.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['hidden', 'style', 'class'] });
        const resize = new ResizeObserver(schedule);
        document.querySelectorAll('[data-chat-flow]').forEach(element => resize.observe(element));
        window.addEventListener('resize', schedule); document.addEventListener('scroll', schedule, true);
        window.visualViewport?.addEventListener('resize', schedule);
        schedule();
        return () => { cancelAnimationFrame(raf); mutation.disconnect(); resize.disconnect(); window.removeEventListener('resize', schedule); document.removeEventListener('scroll', schedule, true); window.visualViewport?.removeEventListener('resize', schedule); };
      }, [state.annotations, state.pending, state.draft, pending]);

      const children = [];
      geometry.marks.forEach((mark, index) => {
        mark.rects.forEach((rect, line) => children.push(h('div', { key: `hl-${mark.id}-${line}`, className: `an-highlight${state.openId === mark.id ? ' active' : ''}`, style: { left: rect.left, top: rect.top, width: rect.width, height: rect.height } })));
        const rect = mark.rects.at(-1);
        if (rect) children.push(h('button', { key: `mark-${mark.id}`, className: 'an-marker', style: { left: Math.min(rect.right + 5, window.innerWidth - 28), top: Math.max(2, rect.top - 2) }, 'aria-label': `查看批注 ${index + 1}`, 'aria-expanded': state.openId === mark.id, onClick: () => surface.openNote(mark.id) }, String(index + 1)));
      });
      const selectedRect = geometry.pending?.at(-1);
      if (pending && selectedRect && !state.draft) children.push(h('button', { key: 'selection', className: 'an-selection', style: position(selectedRect, 110, 38),
        onPointerDown: event => event.preventDefault(), onClick: () => { surface.select(pending); window.getSelection()?.removeAllRanges(); pendingRef.current = null; setPending(null); },
        'data-annotation-ui': true }, icon('note'), state.bindingId ? '绑定批注' : '添加批注'));
      if (state.draft && !state.draftCollapsed) children.push(h(DraftBox, { key: state.draft.id ?? 'new', state, surface, rect: geometry.draft?.at(-1) }));
      const notes = markedNotes(state);
      const open = notes.find(annotation => annotation.id === state.openId);
      if (open && !state.draft) children.push(h(AnnotationCard, { key: open.id, annotation: open, index: notes.findIndex(a => a.id === open.id), state, surface,
        rect: geometry.marks.find(mark => mark.id === open.id)?.rects.at(-1) }));
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
      ctx.effect?.(() => () => { for (const surface of surfaces.values()) surface.queue.dispose(); surfaces.clear(); document.getElementById('dsh-annotation-pro-css')?.remove(); }, 'annotation-pro: dispose');
    }
    return { apply, inject: ['slots', 'sessions', 'conversation', 'inputTriggers'] };
  },
});
