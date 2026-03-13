'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
}

// 清理概述文本，只保留中文、英文、数字、逗号、句号和空格
function cleanExcerpt(text: string): string {
  // 保留：中文、英文、数字、逗号、句号、空格
  let cleaned = text.replace(/[^\u4e00-\u9fa5a-zA-Z0-9，。\s]/g, '');
  // 合并多个空格
  cleaned = cleaned.replace(/\s+/g, ' ');
  return cleaned.trim();
}

// 文章卡片组件
function ArticleCard({ post }: { post: Post }) {
  const cleanedExcerpt = cleanExcerpt(post.excerpt);
  
  return (
    <Link
      href={`/content/${post.slug}`}
      className="group bg-card border border-border/20 rounded-lg p-2.5 hover:border-foreground/10 transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      {/* 标题容器 - 高度自适应，缩小行距 */}
      <div className="mb-3">
        <h3 
          className="font-normal text-xl leading-snug group-hover:text-foreground/80 transition-colors line-clamp-2"
          style={{ fontFamily: "'Source Han Sans SC', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif" }}
        >
          {post.title}
        </h3>
      </div>

      {/* 摘要 - 强制两行，左下角对齐 */}
      <div className="flex-1 flex items-end">
        <p className="text-sm text-muted-foreground line-clamp-2 w-full">
          {cleanedExcerpt}
        </p>
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
  const [isNavSticky, setIsNavSticky] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const navWrapperRef = useRef<HTMLDivElement>(null);
  const navHeightRef = useRef(0);

  useEffect(() => {
    // 记录导航原始高度
    if (navRef.current) {
      navHeightRef.current = navRef.current.offsetHeight;
    }

    const handleScroll = () => {
      if (!navRef.current || !navWrapperRef.current) return;
      
      const wrapperRect = navWrapperRef.current.getBoundingClientRect();
      const headerHeight = 56; // 顶部导航高度
      
      // 当包装器的顶部进入顶部导航下方时，导航应该固定
      // 当包装器的顶部离开顶部导航下方时，导航应该恢复
      if (wrapperRect.top <= headerHeight) {
        setIsNavSticky(true);
      } else {
        setIsNavSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初始检查
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

            {/* 筛选导航包装器 - 无感固定 */}
            <div ref={navWrapperRef} className="relative" style={{ minHeight: isNavSticky ? navHeightRef.current : undefined }}>
              {/* 筛选导航 - 支持左右滑动，可固定 */}
              <div 
                ref={navRef}
                className={`flex items-center gap-1 overflow-x-auto pb-3 mb-6 scrollbar-hide -mx-3 px-3 bg-background transition-all duration-200 ${
                  isNavSticky 
                    ? 'fixed left-0 right-0 top-14 z-40 border-b border-border/30 py-3 mb-0' 
                    : 'relative'
                }`}
              >
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
            </div>
            
            {/* 文章列表 - 间距减小 */}
            <div className="grid grid-cols-2 gap-1.5">
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
