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

// ---- selection scope ----
check('user messages are annotatable', src.includes('data-chat-flow-kind="user"'));
check('both flow kinds share one root selector', /const ROW = '[^']*assistant-step[^']*[^']*user[^']*'/.test(src));

// ---- mascot ----
check('mascot is one inlined bitmap', /const CHIBI_SRC = 'data:image\/webp;base64,[A-Za-z0-9+/=]{4000,}'/.test(src));
check('mascot is not an svg any more', !src.includes("className: 'an-chibi', viewBox"));
check('mascot is decorative', src.includes("alt: ''") && src.includes("'aria-hidden': true"));
check('mascot cannot be dragged out', src.includes('draggable: false'));
check('mascot has no external asset reference', !/[\"'(](\.\/|\/)?assets\//.test(src));
const still = ['an-breathe', 'an-yay'];
for (const name of still) {
  const block = css.match(new RegExp('@keyframes ' + name + '\\{([\\s\\S]*?)\\}'));
  check('keyframe ' + name + ' animates transform only',
    !!block && !/(^|[;{])\s*(opacity|background|filter|box-shadow|top|left|width|height)\s*:/.test(block[1]),
    block ? 'has layout/paint props' : 'missing');
}
check('reduced motion stops the mascot', css.includes('.an-chibi{animation:none!important'));

check('24000 maxLength kept', src.includes('maxLength: 24000'));

for (const line of ok) console.log('PASS', line);
for (const line of fail) console.log('FAIL', line);
console.log(`\n${ok.length} passed, ${fail.length} failed`);
process.exit(fail.length ? 1 : 0);
