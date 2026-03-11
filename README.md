# 🪐 探索版全栈 CMS - 后端数据枢纽 (Backend Interface)

这是一个基于 `NestJS + Prisma + SQLite` 的现代化企业级新闻管理系统后端微服务。
作为整个“探索版 CMS”生态的数据中枢，它负责连接管理端（Admin）与用户端（H5），保证所有新闻、分类及用户状态的实时、安全传输。

---

## 🚀 核心架构与特性

- **🚀 极强性能**：采用 Node.js 企业级框架 `NestJS` 构建，天生支持高并发。
- **🛡️ 绝对类型安全**：借助 `Prisma ORM` 实现了从数据库表面到 TypeScript 接口端真正的端到端类型推导。首发选用 `SQLite` 作为底层引擎，支持一键无感换为大厂青睐的 PostgreSQL 或 MySQL。
- **🛸 全自动云部署**：原生支持 Docker 构建，集成了我们定制化的 `GitHub Actions (SCP)` 空投部署脚本，能够 100% 免疫国内复杂网络环境或 GFW 屏蔽，直接将微服务空降至服务器的 `3000` 端口。

---

## 🛠️ 本地开发环境极速启动

要参与此应用的后端核心组件开发，你需要以下三步：

### 1. 安装依赖并自动映射数据库结构
```bash
npm install
npx prisma generate
npx prisma db push
```
*(这一步会在根目录创建一个 `dev.db` 数据库文件，为你省去安装 MySQL 的一切烦恼)*

### 2. 本地启动服务（带有热更替）
```bash
npm run start:dev
```
此时，所有带有 `/api` 的后端监听路由都会亮起，例如：[http://localhost:3000/api](http://localhost:3000/api)。

### 3. 可视化打开数据库看板（Prisma Studio）
```bash
npx prisma studio
```
此时，Prisma 会帮你在网页端自动生成一个类似 Navicat 的管理面板（通常位于 `http://localhost:5555`）。你可以在里面随时查阅通过后端接口传进来的数据原型。

---

## 📁 主要目录结构

```text
├── .github/workflows/deploy.yml # 神级 Docker SCP部署剧本
├── prisma/
│   ├── schema.prisma            # 【核对表】所有数据库表的骨架图谱
│   └── dev.db                   # 真正的本地 SQLite 数据库文件
├── src/
│   ├── posts/                   # 文章（新闻）模块的 CRUD 兵工厂
│   ├── categories/              # 文章分类树模块
│   └── main.ts                  # 全局启动入口（配置了 CORS 及全局前缀 /api）
└── Dockerfile                   # 生态隔离装箱单
```

---

## ☁️ 服务器云端部署指南

1. 首先确保云服务器开启了 **SSH 及对应的 3000 端口安全组**，并且安装有底层 `Docker` 引擎。
2. 前往当前 Github 仓库的主界面，进入 `Settings > Secrets and variables > Actions`。
3. 添加环境三剑客：
   - `SERVER_HOST`: 这是你的云主机公网 IP。
   - `SERVER_USER`: 通常是 root 或者具有 sudo 权限的用户账户。
   - `SERVER_PASSWORD`: 你的主机远程连接密码。
4. 每当你通过 `git push` 向 `master` 主分支推送修改后，Github 的流水线会自发被唤醒，把最新代码送上云端并重构最新的镜像。你的后端，永远在线。
