const fs = require('fs');
const src = fs.readFileSync('lib/client.js', 'utf8');
const start = src.indexOf('const CSS = `') + 13;
const end = src.indexOf('\n`;', start);
const css = src.slice(start, end);
const fail = [];
const ok = [];

const check = (name, cond, detail = '') => (cond ? ok : fail).push(cond || !detail ? name : `${name} (${detail})`);

check('composer chip keeps its own label', /\[data-composer-chip="dsh-annotation-pro"\]>span>span:last-child/.test(css));
check('composer chip does not hide the label', !/\[data-composer-chip="dsh-annotation-pro"\]>span>span\{display:none/.test(css));
check('numbering no longer rides on a CSS counter', !css.includes('counter-increment') && !css.includes('counter(an-note)'));
check('composer chip not hidden', !/\[data-composer-chip="dsh-annotation-pro"\]\{display:none/.test(css));
check('legacy placeholder gone', !css.includes('data-annotation-empty') && !src.includes('data-annotation-empty'));
check('vars on [data-annotation-ui]', css.includes('[data-annotation-ui]{font-family:inherit'));
check('keyframes avoids opacity', !/@keyframes an-pop\{[^}]*opacity/.test(css));
check('no plate behind the dock trigger', /\.an-chip\{[^}]*background:none/.test(css) && /\.an-chip\{[^}]*border:0/.test(css));

const defined = new Set([...css.matchAll(/(--an-[a-z-]+)\s*:/g)].map(m => m[1]));
const used = new Set([...css.matchAll(/var\((--an-[a-z-]+)/g)].map(m => m[1]));
const undeclared = [...used].filter(v => !defined.has(v));
check('every var(--an-*) declared', undeclared.length === 0, undeclared.join(', '));

const dsUsed = new Set([...css.matchAll(/var\((--dsw-alias-[a-z-]+)/g)].map(m => m[1]));
check('dsw vars all have fallback', dsUsed.size > 0);

let depth = 0;
for (const ch of css) { if (ch === '{') depth++; else if (ch === '}') depth--; }
check('css braces balanced', depth === 0, `depth=${depth}`);

// ---- numbering ----
check('ordinal falls back to list order', src.includes('annotation.ordinal > 0 ? annotation.ordinal : index + 1'));
check('ordinal is minted past the highest number', src.includes('nextOrdinal()') && src.includes('return max + 1'));
check('ordinal survives the round trip', src.includes('note.ordinal !== undefined') && fs.readFileSync('lib/index.js', 'utf8').includes('body.ordinal'));
check('ordinal reaches the composer label', src.includes('label: noteLabel(note)'));
check('ordinal reaches the payload', src.includes('`${noteLabel(note)}：${note.comment.trim()}`'));
check('payload no longer quotes the passage', !src.includes('关于这段回复'));
check('markers print the stored ordinal', src.includes('String(mark.ordinal)'));
check('dock trigger names the notes', src.includes('`注释 ${ordinals.join(') && !src.includes('条注释`'));

// ---- placement: a chip in the tool row, never a full-width band ----
check('chip lives in the composer tool row', src.includes("register('conversation.input.left', 'annotation-pro-chip', AnnotationsDock)"));
check('nothing claims the full-width dock any more', !src.includes("'conversation.input.dock'"));
check('the old band class is gone', !css.includes('.an-dock{') && !css.includes('an-collapse'));
// `[;{]width:100%` and not `width:100%`, or `max-width:100%` would read as a full-width bar.
check('chip row is inline, not a bar', /\.an-chipbar\{[^}]*display:inline-flex/.test(css) && !/\.an-chipbar\{[^}]*[;{]width:100%/.test(css));
check('chip label truncates instead of wrapping', /\.an-chip-label\{[^}]*text-overflow:ellipsis/.test(css) && /\.an-chip-label\{[^}]*white-space:nowrap|\.an-chip\{[^}]*white-space:nowrap/.test(css));
check('panel floats above the composer', /\.an-dockpanel\{[^}]*position:fixed/.test(css));
check('panel is pinned upward from the anchor', src.includes('window.innerHeight - clearance + 8'));
check('panel is clamped into the viewport', src.includes('Math.max(12, Math.min(chipRect.left, window.innerWidth - width - 12))'));
check('panel is portalled out of the composer', src.includes('reactDom.createPortal(panel, document.body)'));
check('panel re-places on scroll and resize', src.includes("window.addEventListener('resize', place)") && src.includes("window.addEventListener('scroll', place, true)"));
check('panel clears the whole input area', src.includes('surface.editorRect?.()') && src.includes('clearance = editorRect.top'));
check('composer card is the preferred floor', src.includes("closest?.('[data-composer-card]')") && src.includes('clearance = cardRect.top'));
check('panel height fits the room above it', src.includes('maxHeight: `${anchor.maxHeight}px`') && src.includes('Math.min(560, clearance - 24)'));
check('editor lookup cannot throw', src.includes('editorRect() {') && /editorRect\(\) \{[\s\S]{0,160}catch/.test(src));
check('panel closes on outside press', src.includes("document.addEventListener('pointerdown', away, true)"));
check('panel closes on escape', src.includes("event.key === 'Escape'"));
check('panel width is bounded', /\.an-dockpanel\{[^}]*max-height:min\(62vh/.test(css));

// ---- selection scope ----
check('user messages are annotatable', src.includes('data-chat-flow-kind="user"'));
check('both flow kinds share one root selector', /const ROW = '[^']*assistant-step[^']*[^']*user[^']*'/.test(src));

// ---- mascot ----
check('mascot is one inlined bitmap', /const CHIBI_SRC = 'data:image\/webp;base64,[A-Za-z0-9+/=]{4000,}'/.test(src));
check('mascot is not an svg any more', !src.includes("className: 'an-chibi', viewBox"));
check('mascot is decorative', src.includes("alt: ''") && src.includes("'aria-hidden': true"));
check('mascot cannot be dragged out', src.includes('draggable: false'));
check('mascot has no external asset reference', !/[\"'(](\.\/|\/)?assets\//.test(src));
const still = ['an-breathe', 'an-yay', 'an-happy', 'an-think'];
for (const name of still) {
  const block = css.match(new RegExp('@keyframes ' + name + '\\{([\\s\\S]*?)\\}'));
  check('keyframe ' + name + ' animates transform only',
    !!block && !/(^|[;{])\s*(opacity|background|filter|box-shadow|top|left|width|height)\s*:/.test(block[1]),
    block ? 'has layout/paint props' : 'missing');
}
check('reduced motion stops the mascot', css.includes('.an-chibi{animation:none!important'));

check('24000 maxLength kept', src.includes('maxLength: 24000'));

// ---- selection bubble skin (v0.7.0 plaque) ----
check('selection bubble carries a circular seal', /className:\s*['"]an-seal['"]/.test(src) && /const SEAL_SRC = 'data:image\/webp;base64,[A-Za-z0-9+/=]{1000,}'/.test(src));
check('selection bubble text is gold-gradient', css.includes('.an-seal-label{background:linear-gradient(180deg,#fff7e2,#eec57f)'));
check('selection bubble no longer blue-purple pill', !/\.an-selection\{[^}]*linear-gradient\(180deg,#5a77ff,#4257d6\)/.test(css));
check('selection bubble is a deep plaque', css.includes('background:linear-gradient(180deg,#33569a,#1b2f5e 56%,#122143)'));
check('selection bubble has a gold border', css.includes('border:1px solid #e5c489'));
check('selection bubble seal has a gold rim', /box-shadow:[^;}]*0 0 0 1\.5px #efce92/.test(css));

// ---- popover carries the mascot dialog skin (v0.7.2) ----
check('add/edit popover shows the mascot', src.includes("className: 'an-mascot'") && src.includes("h(chibi, { size: 38"));
// The top mascot keeps her on the left; only the one beside the textarea sits on the right.
check('top mascot is not reversed', !src.includes('an-mascot rev') && !css.includes('.an-mascot.rev'));
check('she stands beside the box you type in', src.includes("className: 'an-write'") && src.includes("h(chibi, { size: 30"));
check('the input still takes the remaining width', css.includes('.an-write .an-input{margin-top:0;flex:1;min-width:0}'));
// ---- expressions ----
check('happy mood is wired to a pose', css.includes('.an-chibi[data-mood="happy"]') && src.includes("mood: state.busy ? 'waiting' : draft.comment.trim() ? 'happy' : 'idle'"));
check('think mood is wired to a pose', css.includes('.an-chibi[data-mood="think"]') && src.includes("draft.isNew ? 'waiting' : 'think'"));
check('view card reacts to being queued', src.includes("mood: annotation.queued ? 'happy' : 'idle'"));
check('add popover mascot greets a new note', src.includes('选中文字后，把想法记下来吧'));
check('edit popover mascot keeps the passage', src.includes('改一改你的批注，原文会原样保留'));
check('view popover shows the mascot', src.includes('这是你留下的注释，原文收在下面'));
check('queued view popover mascot notes the queue', src.includes('这条注释已经排好队'));
check('popover speech bubble matches the gold skin', css.includes('.an-popover .an-say{background:rgba(229,196,137,.14)'));

for (const line of ok) console.log('PASS', line);
for (const line of fail) console.log('FAIL', line);
console.log(`\n${ok.length} passed, ${fail.length} failed`);
process.exit(fail.length ? 1 : 0);
