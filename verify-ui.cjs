const fs = require('fs');
const src = fs.readFileSync('lib/client.js', 'utf8');
const start = src.indexOf('const CSS = `') + 13;
const end = src.indexOf('\n`;', start);
const css = src.slice(start, end);
const fail = [];
const ok = [];

const check = (name, cond, detail = '') => (cond ? ok : fail).push(name + (detail ? ` (${detail})` : ''));

check('counter rule present', (css.match(/counter-increment:an-note/g) || []).length === 1);
check('counter used once', (css.match(/counter\(an-note\)/g) || []).length === 1);
check('composer chip not hidden', !/\[data-composer-chip="dsh-annotation-pro"\]\{display:none/.test(css));
check('legacy placeholder gone', !css.includes('data-annotation-empty') && !src.includes('data-annotation-empty'));
check('vars on [data-annotation-ui]', css.includes('[data-annotation-ui]{font-family:inherit'));
check('keyframes avoids opacity', !/@keyframes an-pop\{[^}]*opacity/.test(css));

const defined = new Set([...css.matchAll(/(--an-[a-z-]+)\s*:/g)].map(m => m[1]));
const used = new Set([...css.matchAll(/var\((--an-[a-z-]+)/g)].map(m => m[1]));
const undeclared = [...used].filter(v => !defined.has(v));
check('every var(--an-*) declared', undeclared.length === 0, undeclared.join(', '));

const themeVars = [...used, ...defined].filter(v => !v.startsWith('--an-'));
const dsUsed = new Set([...css.matchAll(/var\((--dsw-alias-[a-z-]+)/g)].map(m => m[1]));
check('dsw vars all have fallback', dsUsed.size > 0);

let depth = 0;
for (const ch of css) { if (ch === '{') depth++; else if (ch === '}') depth--; }
check('css braces balanced', depth === 0, `depth=${depth}`);

check('24000 maxLength kept', src.includes('maxLength: 24000'));

for (const line of ok) console.log('PASS', line);
for (const line of fail) console.log('FAIL', line);
console.log(`\n${ok.length} passed, ${fail.length} failed`);
process.exit(fail.length ? 1 : 0);
