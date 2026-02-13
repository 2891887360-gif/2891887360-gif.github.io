# 博客系统统一到 Landing 设计计划

## 概览

| 项目 | 内容 |
|------|------|
| **任务类型** | feature refactor |
| **目标** | 将博客系统从 Chirpy 原布局迁移到 Landing 设计体系 |
| **影响范围** | `_layouts/`, `_sass/landing/`, `_config.yml`, `blog/index.html` |
| **预计工作量** | 8+ 个文件 |

---

## 背景与动机

### 当前问题
- 博客页面（列表、文章、分类、标签、归档）使用 Chirpy 原 `default.html` 布局
- 主页使用新的 Landing 设计系统，风格割裂
- 侧边栏、 Bootstrap 依赖与 Every.to 极简风格不符

### 目标
- 统一博客系统到 Landing 设计语言
- 使用多宽度容器系统（680px 文章 / 1100px 列表）
- 衬线体标题 + 18px 正文字号
- 保留 Giscus 评论功能

---

## 现有状态分析

### 当前布局结构
```
_layouts/
├── default.html      # Chirpy 原布局（含侧边栏）
├── landing.html      # 新 Landing 布局（已存在）
├── post.html         # 文章详情（Chirpy）
├── home.html         # 博客首页（Chirpy）
├── archives.html     # 归档
├── categories.html   # 分类列表
├── category.html     # 分类详情
├── tags.html         # 标签列表
└── tag.html          # 标签详情
```

### 当前博客首页
- 文件: `blog/index.html`
- 当前使用 `layout: home` (Chirpy)

### 评论系统
- 使用 Giscus (`_includes/comment.html`)
- 需要在新布局中保留

---

## 实施方案

### 任务 1: 创建 `_sass/landing/_blog.scss`

博客专用样式，统一使用 CSS 变量：

```scss
// 容器
.container-article { max-width: 680px; }
.container-wide { max-width: 1100px; }

// 文章头部
.post-header { padding: 80px 0 48px; text-align: center; }
.post-title { font-family: var(--font-serif); font-size: 3rem; }
.post-meta { ... }

// 正文
.post-content { font-size: 1.125rem; line-height: 1.75; }

// 列表页
.blog-list-item { ... }
.blog-list-title { font-family: var(--font-serif); }

// 分页
.blog-pagination { ... }

// 上下篇导航
.post-navigation { ... }
```

### 任务 2: 更新 `_sass/landing/index.scss`

添加 blog 样式引用：
```scss
@forward 'variables';
@forward 'base';
@forward 'blog';        // 新增
@forward 'grid';
...
```

### 任务 3: 创建 `_layouts/blog-post.html`

文章详情布局，基于 `landing.html`：
- 头部：窄容器 (680px)，衬线标题
- 封面图：宽容器 (1100px)
- 正文：窄容器
- 标签、导航、评论

### 任务 4: 创建 `_layouts/blog-list.html`

博客列表布局：
- 页面标题
- 文章列表（图片 + 标题 + 摘要）
- 分页导航

### 任务 5: 创建 `_layouts/blog-taxonomy.html`

分类/标签/归档通用布局

### 任务 6: 更新 `_config.yml`

修改 defaults，让文章使用新布局：
```yaml
defaults:
  - scope:
      path: ""
      type: posts
    values:
      layout: blog-post    # 从 default 改为 blog-post
      comments: true
```

### 任务 7: 更新 `blog/index.html`

改为使用 `layout: blog-list`

### 任务 8: 更新分类/标签/归档布局

将以下布局的 `layout: page` 改为 `layout: blog-taxonomy`：
- `archives.html`
- `categories.html`
- `category.html`
- `tags.html`
- `tag.html`

---

## 变更文件清单

| 文件路径 | 变更类型 | 说明 |
|---------|---------|------|
| `_sass/landing/_blog.scss` | 创建 | 博客专用样式 |
| `_sass/landing/index.scss` | 修改 | 引入 blog 样式 |
| `_layouts/blog-post.html` | 创建 | 文章详情布局 |
| `_layouts/blog-list.html` | 创建 | 博客列表布局 |
| `_layouts/blog-taxonomy.html` | 创建 | 分类/标签/归档通用布局 |
| `_config.yml` | 修改 | 更新 posts defaults |
| `blog/index.html` | 修改 | 改用 blog-list 布局 |
| `_layouts/archives.html` | 修改 | 改用 blog-taxonomy 布局 |
| `_layouts/categories.html` | 修改 | 改用 blog-taxonomy 布局 |
| `_layouts/category.html` | 修改 | 改用 blog-taxonomy 布局 |
| `_layouts/tags.html` | 修改 | 改用 blog-taxonomy 布局 |
| `_layouts/tag.html` | 修改 | 改用 blog-taxonomy 布局 |

---

## 验收标准

- [ ] `/blog` 页面使用新布局，宽容器 (1100px)
- [ ] 文章详情页使用新布局，窄容器 (680px)
- [ ] 文章标题使用 Playfair Display 衬线体
- [ ] 正文字号 18px，行高 1.75
- [ ] 分类/标签/归档页面风格统一
- [ ] Giscus 评论正常显示
- [ ] 深色模式正常切换
- [ ] 无 Chirpy 旧侧边栏残留

---

## Commit Message

```
feat: 博客系统统一到 Landing 设计

- 创建 blog-post.html 文章详情布局
- 创建 blog-list.html 文章列表布局
- 创建 blog-taxonomy.html 分类标签布局
- 添加 _blog.scss 博客专用样式
- 移除对 Chirpy 原布局的依赖
- 统一设计语言和排版风格
```

---

## 风险与注意事项

1. **评论功能**: 需要确认 Giscus 配置在新布局中正常加载
2. **SEO**: 确保文章结构化数据（JSON-LD）保留
3. **深色模式**: 依赖 CSS 变量，需要测试模式切换
4. **旧文章兼容性**: 检查是否有文章使用特殊 front matter

---

## 回滚计划

如需回滚：
1. 恢复 `_config.yml` 中的 `layout: default`
2. 恢复 `blog/index.html` 的 `layout: home`
3. 恢复分类/标签/归档布局的引用
