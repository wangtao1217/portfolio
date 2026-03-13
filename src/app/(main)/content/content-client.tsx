'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
}

// 文章卡片组件 - 新布局
function ArticleCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/content/${post.slug}`}
      className="group bg-card border border-border/50 rounded-lg p-4 hover:border-foreground/20 transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      {/* 标题 - 增加上下边距 */}
      <h3 className="font-semibold text-base mb-4 group-hover:text-foreground/80 transition-colors line-clamp-2 leading-snug">
        {post.title}
      </h3>

      {/* 摘要 */}
      <p className="text-sm text-muted-foreground line-clamp-2 flex-1 mb-4">
        {post.excerpt}
      </p>

      {/* 底部：时间和标签 */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground/60 mt-auto">
        <span>{post.date}</span>
        {post.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="text-muted-foreground/50">
            #{tag.split('/').pop()}
          </span>
        ))}
      </div>
    </Link>
  );
}

// 筛选标签
const filterTags = [
  { id: 'all', label: '全部' },
  { id: 'think', label: '思考' },
  { id: 'knowledge', label: '知识' },
  { id: 'story', label: '故事随笔' },
];

interface ContentClientProps {
  posts: Post[];
}

export function ContentClient({ posts }: ContentClientProps) {
  const [activeTag, setActiveTag] = useState('all');

  return (
    <>
      <main className="flex-1 relative z-10">
        {/* 使用主页一样的栅格布局 grid-cols-[1fr_8fr_1fr] */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_8fr_1fr]">
          <div className="hidden sm:block" />
          
          <div className="p-3 sm:p-5 max-w-[800px] mx-auto w-full">
            {/* 页面标题 */}
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-sans">
                Content.
              </h1>
            </div>

            {/* 筛选导航 - 支持左右滑动 */}
            <div className="flex items-center gap-1 overflow-x-auto pb-3 mb-6 scrollbar-hide -mx-3 px-3">
              {filterTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setActiveTag(tag.id)}
                  className="relative px-3 py-1.5 text-sm whitespace-nowrap transition-colors duration-200"
                >
                  <span className={activeTag === tag.id ? 'text-foreground' : 'text-muted-foreground/60 hover:text-muted-foreground'}>
                    {tag.label}
                  </span>
                  {/* 下划线动画 */}
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-[1px] bg-foreground transition-all duration-300 ${
                      activeTag === tag.id ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                    }`}
                  />
                </button>
              ))}
            </div>
            
            {/* 文章列表 - 手机端两列，间距一致 */}
            <div className="grid grid-cols-2 gap-3">
              {posts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
          
          <div className="hidden sm:block" />
        </div>
      </main>
    </>
  );
}
