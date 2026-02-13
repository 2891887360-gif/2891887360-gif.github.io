# 清理 Chirpy 旧代码计划

## 概览

| 项目 | 内容 |
|------|------|
| **任务类型** | chore / cleanup |
| **目标** | 移除不再使用的 Chirpy 原始布局、组件和样式 |
| **风险等级** | 高（删除操作不可逆） |
| **前置条件** | 所有页面已验证正常工作 |

---

## 当前布局使用情况分析

### _tabs/ 目录布局引用
```
_tabs/about.md      → layout: landing
_tabs/blog.md       → layout: blog-list
_tabs/archives.md   → layout: archives (→ blog-taxonomy)
_tabs/categories.md → layout: categories (→ blog-taxonomy)
_tabs/tags.md       → layout: tags (→ blog-taxonomy)
```

### _layouts/ 目录分析

| 文件 | 状态 | 建议 |
|------|------|------|
| `compress.html` | 被 landing.html 引用 | **保留** |
| `landing.html` | 新系统核心 | **保留** |
| `blog-post.html` | 新文章布局 | **保留** |
| `blog-list.html` | 新列表布局 | **保留** |
| `blog-taxonomy.html` | 新分类布局 | **保留** |
| `archives.html` | 已更新继承 blog-taxonomy | **保留** |
| `categories.html` | 已更新继承 blog-taxonomy | **保留** |
| `category.html` | 已更新继承 blog-taxonomy | **保留** |
| `tags.html` | 已更新继承 blog-taxonomy | **保留** |
| `tag.html` | 已更新继承 blog-taxonomy | **保留** |
| `project.html` | 项目详情布局 | **保留** |
| `design.html` | 设计详情布局 | **保留** |
| `video.html` | 视频详情布局 | **保留** |
| `default.html` | Chirpy 原默认布局 | **检查引用后决定** |
| `home.html` | Chirpy 原博客首页 | **可删除** |
| `post.html` | Chirpy 原文章布局 | **可删除** |
| `page.html` | 简单页面布局 | **评估** |

---

## 清理清单

### 第一阶段：安全删除（无引用）

- [ ] `_layouts/home.html` - 原博客首页，已被 blog-list 替代
- [ ] `_layouts/post.html` - 原文章布局，已被 blog-post 替代

### 第二阶段：检查引用后删除

- [ ] 检查 `default.html` 是否还有引用
- [ ] 检查 `page.html` 是否还有引用

### 第三阶段：清理 includes

需要检查以下 includes 是否还有引用：
- [ ] `_includes/sidebar.html`
- [ ] `_includes/topbar.html`
- [ ] `_includes/footer.html`
- [ ] `_includes/trending-tags.html`
- [ ] `_includes/update-list.html`
- [ ] `_includes/post-nav.html`

### 第四阶段：清理样式（可选）

- [ ] 评估 Chirpy 原始样式文件

---

## 安全删除流程

1. **备份**：将待删除文件移动到 `backup/` 目录
2. **测试**：运行 Jekyll 构建
3. **验证**：访问所有页面确认正常
4. **提交**：提交删除操作
5. **清理**：一周后删除 backup 目录

---

## 回滚方案

如果删除后发现问题：
```bash
# 从 git 历史恢复
git checkout HEAD~1 -- _layouts/home.html
```

---

## 验收标准

- [ ] 构建无错误
- [ ] 所有页面访问正常
- [ ] 无 404 错误
- [ ] 代码库更精简

---

## Commit Message

```
chore: 清理 Chirpy 旧代码

- 移除未使用的布局: home.html, post.html
- 移除未使用的组件: sidebar.html, topbar.html, footer.html
- 精简代码库
```
