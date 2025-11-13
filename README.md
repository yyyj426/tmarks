<div align="center">

# 🔖 TMarks

**AI 驱动的智能书签管理系统**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3%20%7C%2019-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0%20%7C%207-646cff.svg)](https://vitejs.dev/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-f38020.svg)](https://workers.cloudflare.com/)
[![许可证](https://img.shields.io/badge/许可证-MIT-green.svg)](LICENSE)

简体中文

[在线演示](https://tmarks.669696.xyz) | [问题反馈](https://github.com/ai-tmarks/tmakrs/issues)

</div>

---

## ✨ 项目简介

TMarks 是一个现代化的智能书签管理系统，结合 AI 技术自动生成标签，让书签管理变得简单高效。

### 核心特性

- 📚 **智能书签管理** - AI自动标签、多维筛选、批量操作、拖拽排序
- 🗂️ **标签页组管理** - 一键收纳标签页、智能分组、快速恢复
- 🌐 **公开分享** - 创建个性化书签展示页、KV缓存加速
- 🔌 **浏览器扩展** - 快速保存、AI推荐、离线支持、自动同步
- 🔐 **安全可靠** - JWT认证、API Key管理、数据加密

### 技术栈

- **前端**: React 18/19 + TypeScript + Vite + TailwindCSS 4
- **后端**: Cloudflare Workers + Pages Functions
- **数据库**: Cloudflare D1 (SQLite)
- **缓存**: Cloudflare KV
- **AI集成**: 支持 OpenAI、Anthropic、DeepSeek、智谱等8+提供商

---

## 🚀 快速开始

### 本地开发

```bash
# 1. 克隆项目
git clone https://github.com/ai-tmarks/tmakrs.git
cd tmarks

# 2. 安装依赖
cd tmarks
pnpm install

# 3. 创建数据库并迁移
wrangler d1 create tmarks-prod-db --local
pnpm db:migrate:local

# 4. 启动开发服务器
pnpm dev
# 访问 http://localhost:5173
```

### 浏览器扩展开发

```bash
# 1. 安装依赖
cd tab
pnpm install

# 2. 启动开发模式
pnpm dev

# 3. 加载扩展
# Chrome: chrome://extensions/ → 开发者模式 → 加载已解压的扩展程序 → 选择 tab/dist
# Firefox: about:debugging → 临时载入附加组件 → 选择 tab/dist/manifest.json
```

---

## 🚀 部署

### 快速部署

**前置要求:**
- Cloudflare 账号
- GitHub 账号
- 安装 Wrangler CLI: `npm install -g wrangler`

**步骤:**

1. **Fork 仓库并连接**
   - Fork 本仓库到你的 GitHub
   - 登录 [Cloudflare 控制台](https://dash.cloudflare.com/)
   - Workers & Pages → 创建 → 连接到 Git → 选择你的仓库

2. **配置构建**
   - 根目录: `tmarks`
   - 构建命令: `pnpm install && pnpm build:deploy`
   - 构建输出目录: `.deploy`

3. **创建资源**
   - 创建 D1 数据库: `tmarks-prod-db`
   - 创建 KV 命名空间: `RATE_LIMIT_KV`
   - 创建 KV 命名空间: `PUBLIC_SHARE_KV`

4. **配置 wrangler.toml**
   将上一步的 ID 填入 `tmarks/wrangler.toml`

5. **运行数据库迁移**
   ```bash
   # 在 Cloudflare D1 控制台执行 SQL
   # 文件路径: tmarks/migrations/d1_console_pure.sql
   # 在控制台直接复制粘贴该文件内容并执行
   ```

6. **配置环境变量**
   设置 → 环境变量 → 生产环境:
   - `JWT_SECRET`: `openssl rand -base64 48`
   - `ENCRYPTION_KEY`: `openssl rand -base64 48`

7. **重新部署**
   部署 → 重试部署


---

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源协议。
