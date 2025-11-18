# 📚 二手书广场

一个基于 React + Vite + Supabase 的二手书交易平台。

## ✨ 功能特性

- 📖 浏览二手书籍列表
- ➕ 发布二手书籍信息
- 🔍 查看书籍详情
- 🎨 现代化的 UI 设计
- 📱 响应式布局，支持移动端

## 🚀 本地开发

### 前置要求

- Node.js 18+ 
- npm 或 yarn
- Supabase 项目（用于数据存储）

### 安装依赖

```bash
npm install
```

### 配置环境变量

在项目根目录创建 `.env` 文件：

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

环境变量获取方式：
1. 登录 [Supabase](https://app.supabase.com)
2. 进入你的项目
3. 点击 Settings → API
4. 复制 `Project URL` 和 `anon public` key

### 运行开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

构建产物在 `dist` 目录。

## 🌐 部署到 Netlify

### 方法一：通过 Netlify Dashboard（推荐）

1. **准备代码仓库**
   - 将代码推送到 GitHub/GitLab/Bitbucket

2. **登录 Netlify**
   - 访问 [Netlify](https://app.netlify.com)
   - 使用 GitHub 账号登录

3. **创建新站点**
   - 点击 "Add new site" → "Import an existing project"
   - 选择你的代码仓库

4. **配置构建设置**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - （这些已经在 `netlify.toml` 中配置好了）

5. **设置环境变量**
   - 在 Site settings → Environment variables 中添加：
     - `VITE_SUPABASE_URL` = 你的 Supabase URL
     - `VITE_SUPABASE_ANON_KEY` = 你的 Supabase Anon Key

6. **部署**
   - 点击 "Deploy site"
   - 等待构建完成

### 方法二：通过 Netlify CLI

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 初始化项目
netlify init

# 部署
netlify deploy --prod
```

## 📁 项目结构

```
secondhand-books/
├── public/          # 静态资源
├── src/
│   ├── pages/       # 页面组件
│   │   ├── Home.jsx          # 首页
│   │   ├── BookDetail.jsx    # 书籍详情页
│   │   └── SubmitBook.jsx    # 发布页面
│   ├── App.jsx      # 主应用组件
│   ├── supabaseClient.js  # Supabase 客户端配置
│   └── main.jsx     # 入口文件
├── netlify.toml     # Netlify 配置
└── package.json
```

## 🛠️ 技术栈

- **React 19** - UI 框架
- **Vite** - 构建工具
- **React Router** - 路由管理
- **Supabase** - 后端数据库
- **CSS3** - 样式（无 UI 框架依赖）

## 📝 注意事项

- 确保 Supabase 数据库表结构正确
- 发布书籍时，`category_id` 和 `seller_id` 需要是数据库中真实存在的 ID
- 生产环境部署前，检查 Supabase 的 Row Level Security (RLS) 策略

## 📄 License

MIT
