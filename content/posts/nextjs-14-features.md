---
title: "Next.js 14 新特性详解"
excerpt: "深入解析 Next.js 14 带来的 Server Actions、Partial Prerendering 等核心特性。"
date: "2024-11-28"
tags: ["Next.js", "React", "前端"]
---

# Next.js 14 新特性详解

Next.js 14 带来了许多令人兴奋的新特性，让全栈开发更加高效。

## Server Actions

Server Actions 允许你在组件中直接调用服务端函数，无需创建 API 路由。

### 基本用法

```tsx
// 在组件中定义 Server Action
async function createPost(formData: FormData) {
  'use server'
  
  const title = formData.get('title')
  await db.post.create({ data: { title } })
}

// 在表单中使用
export default function PostForm() {
  return (
    <form action={createPost}>
      <input name="title" />
      <button type="submit">创建</button>
    </form>
  )
}
```

### 优势

- 减少样板代码
- 自动处理 CSRF 防护
- 类型安全
- 渐进式增强

## Partial Prerendering (PPR)

PPR 结合了静态生成和动态渲染的优点。

### 工作原理

```
┌─────────────────────────────────────┐
│  静态外壳 (Instant Load)            │
│  ┌─────────────────────────────┐    │
│  │  动态内容 (Streaming)       │    │
│  │  ┌─────────────────────┐    │    │
│  │  │  个性化数据          │    │    │
│  │  └─────────────────────┘    │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

### 启用方式

```tsx
// next.config.js
module.exports = {
  experimental: {
    ppr: true,
  },
}
```

## Turbopack 改进

Next.js 14 中的 Turbopack 更快了：

| 操作 | Webpack | Turbopack | 提升 |
|------|---------|-----------|------|
| 冷启动 | 8.5s | 1.8s | 4.7x |
| HMR | 300ms | 50ms | 6x |
| 构建 | 45s | 12s | 3.75x |

## 图片优化增强

### 新功能

- **图片占位符**：自动生成模糊占位符
- **优先级加载**：支持 `priority` 属性
- **自适应尺寸**：自动响应式图片

```tsx
import Image from 'next/image'

export default function Avatar() {
  return (
    <Image
      src="/avatar.jpg"
      alt="头像"
      width={200}
      height={200}
      priority
      placeholder="blur"
    />
  )
}
```

## 总结

Next.js 14 的主要改进：

1. ✅ Server Actions 简化全栈开发
2. ✅ PPR 提升首屏加载速度
3. ✅ Turbopack 更快的开发体验
4. ✅ 图片优化更加智能

升级到 Next.js 14，享受更好的开发体验吧！
