# 博客系统验证与修复计划

## 概览

| 项目 | 内容 |
|------|------|
| **任务类型** | verification & fix |
| **目标** | 验证博客系统统一后的功能完整性，修复发现的问题 |
| **影响范围** | 所有布局文件、样式文件、配置 |
| **预计工作量** | 根据发现问题而定 |

---

## 验证清单

### 1. 静态代码检查

- [ ] SCSS 语法检查（变量引用是否正确）
- [ ] HTML 模板语法检查（Liquid 标签）
- [ ] 配置文件 YAML 语法

### 2. 布局继承链检查

```
landing.html (base)
├── blog-post.html ✓
├── blog-list.html ✓
├── blog-taxonomy.html ✓
```

### 3. 关键变量检查

- [ ] `$width-article` 等宽度变量已定义
- [ ] `$font-family-serif` 等字体变量已定义
- [ ] CSS 变量 `--landing-*` 正确引用

### 4. 已知潜在问题排查

#### 问题 1: Blog 列表页路径
**问题**: 项目使用 `_tabs` 而不是 `blog/` 目录
**检查**: 确认博客列表页面的实际位置

#### 问题 2: Giscus 评论
**问题**: 新布局中评论组件路径
**检查**: `{% include comment.html %}` 是否正确

#### 问题 3: TOC 目录
**问题**: 文章页目录功能
**检查**: TOC 在新布局中的显示

#### 问题 4: 分页器
**问题**: `paginator` 变量在 blog-list 中可用性
**检查**: 需要 `jekyll-paginate` 插件和配置

#### 问题 5: 样式冲突
**问题**: 新旧样式可能冲突
**检查**: 清除旧样式残留

---

## 修复方案

### 修复 1: 添加 blog 列表页面

如果项目使用 `_tabs` 结构，创建 `blog.html`：

```yaml
---
layout: blog-list
title: Blog
description: 技术、思想、生活
icon: fas fa-blog
order: 5
---
```

### 修复 2: 更新 about 页面布局

```yaml
---
layout: landing  # 或其他适当布局
title: 关于
icon: fas fa-info-circle
order: 4
---
```

### 修复 3: 检查 Giscus 配置

确认 `_config.yml` 中：
```yaml
comments:
  provider: giscus
  giscus:
    repo: RollingTheRock/2891887360-gif.github.io
    ...
```

### 修复 4: 分页配置

确认 `_config.yml`：
```yaml
paginate: 10
paginate_path: "/blog/page/:num/"
```

---

## 执行步骤

1. **静态检查** - 检查代码语法和变量引用
2. **创建缺失页面** - 如 blog 列表页
3. **修复已知问题** - 根据检查清单
4. **更新配置** - 确保分页等配置正确
5. **本地测试** - 运行 Jekyll 服务验证
6. **提交修复** - 提交所有修复

---

## 验收标准

- [ ] 无 SCSS 编译错误
- [ ] 无 Liquid 模板错误
- [ ] 所有页面布局正确继承
- [ ] 样式变量正确引用
- [ ] 配置文件语法正确

---

## Commit Message

```
fix: 博客系统统一后的验证修复

- 修复 xxx
- 修复 xxx
```
