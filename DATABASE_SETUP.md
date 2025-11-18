# Supabase 数据库表结构说明

为了满足作业要求（至少 3 张数据表），需要在 Supabase 中创建以下 3 张表：

## 1. books 表（书籍表）

这是主表，存储所有书籍信息。

**字段：**
- `id` (bigint, primary key, auto increment)
- `title` (text, not null) - 书名
- `author` (text, not null) - 作者
- `price` (numeric, not null) - 价格
- `condition` (text, not null) - 成色（全新、九成新等）
- `description` (text, nullable) - 简介
- `category_id` (bigint, foreign key → categories.id) - 分类ID
- `seller_id` (bigint, foreign key → sellers.id) - 卖家ID
- `created_at` (timestamp, default now()) - 创建时间

**SQL 创建语句：**
```sql
CREATE TABLE books (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  price NUMERIC NOT NULL,
  condition TEXT NOT NULL,
  description TEXT,
  category_id BIGINT REFERENCES categories(id),
  seller_id BIGINT REFERENCES sellers(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 2. categories 表（分类表）

存储书籍分类信息。

**字段：**
- `id` (bigint, primary key, auto increment)
- `name` (text, not null, unique) - 分类名称
- `created_at` (timestamp, default now()) - 创建时间

**SQL 创建语句：**
```sql
CREATE TABLE categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**初始数据示例：**
```sql
INSERT INTO categories (name) VALUES 
  ('文学'),
  ('科技'),
  ('历史'),
  ('艺术'),
  ('教育');
```

## 3. sellers 表（卖家表）

存储卖家信息。

**字段：**
- `id` (bigint, primary key, auto increment)
- `name` (text, not null) - 卖家名称
- `contact` (text, nullable) - 联系方式
- `created_at` (timestamp, default now()) - 创建时间

**SQL 创建语句：**
```sql
CREATE TABLE sellers (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  contact TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**初始数据示例：**
```sql
INSERT INTO sellers (name, contact) VALUES 
  ('张三', '13800138000'),
  ('李四', '13900139000'),
  ('王五', '15000150000');
```

## 在 Supabase 中创建表的步骤

1. 登录 [Supabase Dashboard](https://app.supabase.com)
2. 选择你的项目
3. 点击左侧 "SQL Editor"
4. 依次执行上面的 SQL 语句：
   - 先创建 `categories` 表
   - 再创建 `sellers` 表
   - 最后创建 `books` 表（因为它依赖前两个表）
5. 插入初始数据（可选，但建议至少插入几条测试数据）

## 设置 Row Level Security (RLS)

为了允许前端访问数据，需要设置 RLS 策略：

```sql
-- 允许所有人读取 books 表
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON books FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON books FOR INSERT WITH CHECK (true);

-- 允许所有人读取 categories 表
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON categories FOR SELECT USING (true);

-- 允许所有人读取 sellers 表
ALTER TABLE sellers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON sellers FOR SELECT USING (true);
```

## 验证表是否创建成功

在 Supabase Dashboard 中：
1. 点击左侧 "Table Editor"
2. 应该能看到 3 张表：`books`、`categories`、`sellers`
3. 确认每张表都有数据（至少插入几条测试数据）

