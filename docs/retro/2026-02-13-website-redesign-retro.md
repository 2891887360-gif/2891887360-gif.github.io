# 网站改造项目复盘 - 2026-02-13

## 项目概述
将 Jekyll Chirpy 主题博客升级为 Every.to 风格的现代个人门户网站。

## 已完成内容

### 架构改造
- [x] 创建 Landing Page 布局（全宽设计，无侧边栏）
- [x] 原博客迁移至 `/blog` 路径
- [x] 新增作品集系统：/projects、/design、/videos
- [x] Jekyll Collections 配置（projects, designs, videos）

### 视觉系统
- [x] Every.to 风格设计系统（CSS 变量、间距、色彩）
- [x] SCSS 模块化架构（variables, base, grid, cards, hero, animations）
- [x] 深色/亮色模式支持
- [x] 响应式布局（移动端适配）

### 交互体验
- [x] Intersection Observer 滚动动画
- [x] 主题切换（localStorage 持久化）
- [x] 平滑滚动、图片懒加载
- [x] 代码块复制按钮
- [x] 外部链接自动处理

### SEO & 分享
- [x] JSON-LD 结构化数据（Person, WebSite, Article等）
- [x] Open Graph & Twitter Cards
- [x] 社交分享按钮（Twitter、LinkedIn、微博、微信）
- [x] robots.txt 和 RSS feed

## 遇到的问题与解决方案

### 1. Jekyll Include 标签语法错误
**问题**：`{% include %}` 中使用 `forloop.index` 作为参数值导致构建失败
```liquid
{% include components/project-card.html project=project featured=true reveal_delay=forloop.index %}
```

**错误信息**：
```
Invalid syntax for include tag: project=project_variable featured=true/false reveal_delay=number
Valid syntax: {% include file.ext param='value' param2='value' %}
```

**解决方案**：
- 移除 `forloop.index` 参数
- 改为固定类名如 `landing-reveal--{{ forloop.index | modulo: 6 }}`

### 2. SCSS `@use` 语法不兼容
**问题**：Jekyll 的 sass-converter (sass-embedded) 不支持 Dart Sass 的 `@use` 和 `@forward` 语法

**错误信息**：
```
expected "{". (Jekyll::Converters::Scss::SyntaxError)
```

**解决方案**：
- 将 `@use 'variables' as *;` 改为 `@import 'variables';`
- 将所有现代 Sass 模块语法改为传统 `@import`

### 3. HTML 实体编码问题
**问题**：文件中出现 `003e` 这样的残留字符（应为 `>`）

**位置**：`_includes/components/project-card.html:45`

**解决方案**：手动编辑删除残留字符

### 4. GitHub Pages 自定义域名配置
**问题**：用户访问 `2891887360-gif.github.io` 返回 404

**原因**：仓库配置了自定义域名 `amiwrr.blog`

**解决方案**：访问正确的域名 `https://amiwrr.blog/`

### 5. SCSS Lint 规则冲突
**问题**：stylelint 报告 321 个错误（不影响部署）

**主要问题**：
- `rgba` 应为 `rgb`
- 小数透明度应为百分比（`0.3` → `30%`）

**状态**：未修复（不影响功能，仅代码风格）

## 待完善事项（下次开发钩子）

### 高优先级
1. **图片资源准备**
   - `assets/img/avatar.jpg` - 个人头像
   - `assets/img/projects/*.png` - 项目封面图
   - `assets/img/designs/*.png` - 设计作品图
   - `assets/img/videos/*.png` - 视频缩略图

2. **内容填充**
   - 将示例内容（ai-daily-digest, personal-website等）替换为真实内容
   - 完善项目详情页内容

3. **功能验证**
   - 测试所有页面链接是否正常
   - 验证移动端显示效果
   - 检查分享按钮功能

### 中优先级
4. **性能优化**
   - 压缩图片资源
   - 考虑使用 WebP 格式
   - 添加图片 CDN 支持

5. **SEO 完善**
   - 添加 Google Analytics/百度统计
   - 验证结构化数据（Google Rich Results Test）
   - 提交 sitemap 到搜索引擎

6. **样式修复**
   - 修复 stylelint 错误
   - 统一颜色函数写法（rgba → rgb）

### 低优先级
7. **增强功能**
   - 添加评论系统（已配置 giscus）
   - 添加全文搜索
   - 添加 Newsletter 订阅

8. **动画微调**
   - 根据用户反馈调整动画时长
   - 优化 prefers-reduced-motion 体验

## 技术债务

1. **代码冗余**：`landing-animations.js` 和 `landing.js` 功能有重叠，考虑合并
2. **样式冲突**：`_sass/pages/_landing.scss` 和 `_sass/landing/` 目录并存，需要理清职责
3. **变量重复**：CSS 变量和 SCSS 变量有重复定义，考虑统一

## 经验总结

### 成功经验
- 模块化组件设计便于维护和复用
- CSS 变量实现主题切换非常高效
- Intersection Observer 实现滚动动画性能优秀

### 教训
- **环境差异**：本地未安装 Jekyll，无法提前发现构建错误
- **语法兼容性**：新特性（如 `@use`）需要验证 CI 环境支持
- **缓存问题**：部署后需要清除浏览器/DNS 缓存才能看到效果
- **域名配置**：修改前需要确认现有域名配置

### 最佳实践
1. 每次提交前检查 GitHub Actions 状态
2. 重要修改先在本地验证（如有条件）
3. 文档注释避免包含会被解析的代码示例
4. 部署后使用无痕模式验证

## 下次开发建议

### 切入点
建议从 **图片资源准备** 和 **内容填充** 开始，因为：
1. 当前网站框架已完整，只差内容
2. 图片是视觉效果的关键
3. 内容真实后才能发现潜在问题

### 工作流程改进
1. 准备图片资源 → 2. 填充真实内容 → 3. 验证所有页面 → 4. 根据反馈微调样式

---

## 相关文件清单

### 关键配置文件
- `_config.yml` - 站点配置（collections, defaults）
- `CNAME` - 自定义域名

### 布局文件
- `_layouts/landing.html` - Landing Page 基础布局
- `_layouts/project.html` - 项目详情页
- `_layouts/design.html` - 设计作品详情页
- `_layouts/video.html` - 视频详情页

### 样式文件
- `_sass/landing/` - 完整设计系统
- `assets/css/landing.scss` - 入口文件

### 脚本文件
- `assets/js/landing.js` - 交互功能

### 内容模板
- `_includes/landing/hero.html`
- `_includes/landing/nav-cards.html`
- `_includes/landing/featured.html`
- `_includes/landing/footer.html`

### SEO 文件
- `_includes/seo/meta-tags.html`
- `_includes/seo/json-ld.html`
- `robots.txt`
- `feed-projects.xml`
