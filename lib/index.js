/** Persistent, passage-anchored notes for DSH replies. No model calls. */
import { readFileSync, writeFileSync, mkdirSync, renameSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';

export const name = 'dsh-annotation-pro';
const ROUTE = '/plugins/dsh-annotation-pro';
const MAX_BODY_BYTES = 512 * 1024;

function fail(message, status = 400) {
  const error = new Error(message);
  error.status = status;
  throw error;
}
function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  res.end(JSON.stringify(body));
}
function trusted(req) {
  const origin = req.headers.origin ?? req.headers.referer;
  if (!origin) return true;
  try {
    const url = new URL(origin);
    // The Desktop carrier removes Origin but preserves the app document's Referer.
    if (url.protocol === 'dsh-app:') return url.hostname === 'app' && url.port === '' && !url.username && !url.password;
    return ['http:', 'https:'].includes(url.protocol) && ['127.0.0.1', 'localhost', '[::1]'].includes(url.hostname);
  }
  catch { return false; }
}
function identifier(value, label) {
  if (typeof value !== 'string' || !/^[a-zA-Z0-9._-]{1,200}$/.test(value)) fail(`${label} 无效`);
  return value;
}
function text(value, label, max) {
  if (typeof value !== 'string' || value.length > max) fail(`${label} 格式无效或过长`);
  return value;
}
async function readBody(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.length;
    if (size > MAX_BODY_BYTES) fail('批注内容过大', 413);
    chunks.push(buffer);
  }
  let body;
  try { body = JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { fail('请求内容不是有效的 JSON'); }
  if (!body || Array.isArray(body) || typeof body !== 'object') fail('请求内容无效');
  return body;
}
function profileDirectory(ctx) {
  const dir = ctx.profileContext?.dir || process.env.DSH_PROFILE_DIR;
  if (dir) return dir;
  if (process.env.DSH_HOME) {
    const profile = process.env.DSH_PROFILE || 'desktop';
    identifier(profile, 'profile');
    return join(process.env.DSH_HOME, 'profiles', profile);
  }
  fail('无法确定批注存储目录，请检查 Harness 的 profile 配置', 500);
}
function storeFile(ctx, sessionId) {
  return join(profileDirectory(ctx), '.dsh-annotation-pro', `${identifier(sessionId, 'sessionId')}.json`);
}
function readStore(ctx, sessionId) {
  const file = storeFile(ctx, sessionId);
  let raw;
  try { raw = readFileSync(file, 'utf8'); }
  catch (error) {
    if (error.code === 'ENOENT') return { version: 2, sessionId, annotations: [] };
    fail('无法读取批注文件，原文件已保留', 500);
  }
  let value;
  try { value = JSON.parse(raw); }
  catch { fail('批注文件损坏，已停止写入以保护原数据', 500); }
  if (!value || !Array.isArray(value.annotations) ||
      (value.sessionId !== undefined && value.sessionId !== sessionId) ||
      value.annotations.some(a => !a || typeof a.id !== 'string' || typeof a.selectedText !== 'string' ||
        (a.comment !== undefined && typeof a.comment !== 'string') ||
        (a.note !== undefined && typeof a.note !== 'string'))) {
    fail('批注文件格式无效，已停止写入以保护原数据', 500);
  }
  return { ...value, version: 2, sessionId, annotations: value.annotations.map(a => ({ ...a, comment: a.comment ?? a.note ?? '' })) };
}
function writeStore(ctx, sessionId, store) {
  const file = storeFile(ctx, sessionId);
  mkdirSync(join(profileDirectory(ctx), '.dsh-annotation-pro'), { recursive: true });
  const temporary = `${file}.tmp-${randomUUID()}`;
  try {
    writeFileSync(temporary, JSON.stringify(store, null, 2), 'utf8');
    renameSync(temporary, file);
  } catch {
    try { unlinkSync(temporary); } catch {}
    fail('批注未能保存，请重试；原文件已保留', 500);
  }
}
function anchorOf(value) {
  if (value === undefined || value === null) return null;
  if (typeof value !== 'object' || !Number.isSafeInteger(value.start) || !Number.isSafeInteger(value.end) ||
      value.start < 0 || value.end <= value.start) fail('原文位置无效');
  return {
    nodeKey: text(value.nodeKey, '回复标识', 1000),
    flowKind: text(value.flowKind ?? 'assistant-step', '回复类型', 100),
    turn: Number.isSafeInteger(value.turn) ? value.turn : 0,
    start: value.start, end: value.end,
    prefix: text(value.prefix ?? '', '前文', 160),
    suffix: text(value.suffix ?? '', '后文', 160),
  };
}

export function apply(ctx) {
  ctx.inject(['webServer'], svc => {
    const register = (path, handle) => svc.effect(() => svc.webServer.register({
      kind: 'exact', path: ROUTE + path,
      handler: async (req, res) => {
        if (!trusted(req)) return json(res, 403, { error: '来源不受信任' });
        try { await handle(req, res); }
        catch (error) { json(res, error.status ?? 500, { error: error.status ? error.message : '批注操作失败，请重试' }); }
      },
    }), `dsh-annotation-pro: ${path}`);

    register('/annotations', async (req, res) => {
      if (req.method === 'GET') {
        const sessionId = identifier(new URL(req.url, 'http://localhost').searchParams.get('sessionId'), 'sessionId');
        return json(res, 200, readStore(svc, sessionId));
      }
      if (req.method !== 'PUT') return json(res, 405, { error: '不支持此请求方法' });
      const body = await readBody(req);
      const sessionId = identifier(body.sessionId, 'sessionId');
      const id = body.id === undefined ? randomUUID() : identifier(body.id, 'id');
      const store = readStore(svc, sessionId);
      const index = store.annotations.findIndex(a => a.id === id);
      const previous = index >= 0 ? store.annotations[index] : undefined;
      const selectedText = text(body.selectedText, '所选原文', 64000);
      const comment = text(body.comment ?? body.note ?? '', '批注', 24000).trim();
      if (!selectedText.trim() || !comment) fail('请选择原文并填写批注');
      const anchor = body.anchor === undefined ? previous?.anchor ?? null : anchorOf(body.anchor);
      const now = new Date().toISOString();
      const annotation = {
        ...previous, id, sessionId, selectedText, comment, anchor,
        messageId: anchor?.nodeKey ?? previous?.messageId ?? '',
        turn: anchor?.turn ?? previous?.turn ?? 0,
        createdAt: previous?.createdAt ?? now, updatedAt: now,
      };
      if (index >= 0) store.annotations[index] = annotation;
      else store.annotations.push(annotation);
      writeStore(svc, sessionId, store);
      json(res, 200, annotation);
    });

    register('/annotations/delete', async (req, res) => {
      if (req.method !== 'POST') return json(res, 405, { error: '不支持此请求方法' });
      const body = await readBody(req);
      const sessionId = identifier(body.sessionId, 'sessionId');
      const id = identifier(body.id, 'id');
      const store = readStore(svc, sessionId);
      store.annotations = store.annotations.filter(a => a.id !== id);
      writeStore(svc, sessionId, store);
      json(res, 200, { ok: true });
    });

    register('/export', async (req, res) => {
      if (req.method !== 'GET') return json(res, 405, { error: '不支持此请求方法' });
      const url = new URL(req.url, 'http://localhost');
      const sessionId = identifier(url.searchParams.get('sessionId'), 'sessionId');
      const fmt = url.searchParams.get('fmt') ?? 'json';
      if (!['json', 'md'].includes(fmt)) fail('不支持此导出格式');
      const store = readStore(svc, sessionId);
      if (fmt === 'json') return json(res, 200, store);
      const lines = ['# 会话批注', ''];
      store.annotations.forEach((a, index) => {
        lines.push(`## 批注 ${index + 1}`, '', ...a.selectedText.split('\n').map(line => `> ${line}`),
          '', a.comment, '', `时间：${a.createdAt ?? ''}`, '');
      });
      res.statusCode = 200;
      res.setHeader('cache-control', 'no-store');
      res.setHeader('content-type', 'text/markdown; charset=utf-8');
      res.setHeader('content-disposition', `attachment; filename="annotations-${sessionId}.md"`);
      res.end(lines.join('\n'));
    });
  });
  ctx.logger?.info('dsh-annotation-pro: passage annotations mounted');
}
