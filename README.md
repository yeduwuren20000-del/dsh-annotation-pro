# dsh-annotation-pro

给 DeepSeek Harness 的 AI 回复加**段落锚定批注**：选中回复里的任意一段文字，写下批注，
批注会折叠成条目附着在下一条消息上，并可在原文里定位。

纯本地存储，**不调用任何模型**，不改动会话内容本身。

## 功能

- **选中即批注**：在 AI 回复里选区，弹出批注输入框；键盘可直接确认或取消
- **行内序号标记**：每个有批注的段落右侧显示序号，点开查看 / 编辑 / 删除
- **批注随消息发送**：待发送的批注折叠成 `details` 条目，附在下一条消息里一起发出
- **原文定位**：批注条目里的「跳转」会把视图滚回被批注的段落
- **按会话落盘**：每个会话一个 JSON 文件，重开还在
- **独立保存**：批注可以只保存不发出去

## 安装

```bash
dsh plugin add "github:yeduwuren20000-del/dsh-annotation-pro"
```

然后把这个插件加进 profile 的 `dsh.profile.bundles`，**完全重启宿主**（插件列表只在启动时读一次）。

也可以本地链接安装：

```bash
dsh plugin add "link:/path/to/dsh-annotation-pro"
```

## 使用

1. 在 AI 回复里用鼠标选中一段文字
2. 弹出框里写下批注（最多 24000 字符），确认
3. 段落右侧出现序号标记，点开可编辑或删除
4. 直接发下一条消息时，待发送的批注会折叠附在消息里

也可以在输入框敲斜杠命令 `/annotations` 打开批注列表。

## 存储

```
$DSH_HOME/profiles/<profile>/.dsh-annotation-pro/<sessionId>.json
```

文件格式 `version: 2`，每条批注含 `id` / `selectedText` / `comment` / 时间戳。
删除对应文件即清空该会话的批注。

## 接口

宿主侧在 `/plugins/dsh-annotation-pro` 下注册了这些路由（仅接受本机来源，
`dsh-app:` 协议与 `127.0.0.1` / `localhost` / `[::1]` 之外一律拒绝）：

| 路由 | 用途 |
|---|---|
| `GET /annotations` | 读取该会话全部批注 |
| `POST /annotations/save` | 新增或更新一条 |
| `POST /annotations/delete` | 删除一条 |

请求体上限 512 KB。

## 兼容性

编写的目标运行时是 DSH `0.2.x`（`@deepseek-ai/*` 0.2.0-rc.2 以上）。
`peerDependencies` 里写的是区间，0.1.7-rc.1 到 0.3.0-0 之间均可解析。

## 已知限制

- 锚定方式是**选中文本 + 偏移**，如果回复内容被重新生成，旧批注可能定位不到原文（批注本身不会丢）
- 只作用于 AI 回复，不作用于用户自己发的消息

## License

MIT © yeduwuren
