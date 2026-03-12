import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { TableOfContents } from '@/components/table-of-contents';
import { FloatingToc } from '@/components/floating-toc';

// 生成静态路径
export function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs;
}

// 生成页面元数据
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: '文章未找到',
    };
  }

  return {
    title: `${post.title} - 深澜`,
    description: post.excerpt,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex-1 relative z-10">
      {/* 桌面端左侧目录导航 */}
      <TableOfContents />

      {/* 移动端/平板右下角悬浮大纲 */}
      <FloatingToc />

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_8fr_1fr]">
        <div className="hidden sm:block" />
        <div className="py-6 sm:py-8 px-8 sm:px-12 max-w-[650px] mx-auto w-full">
          {/* 文章头部 */}
          <div className="mb-8">
            <div className="flex items-center gap-4 text-sm text-muted-foreground/40">
              <span>{post.date}</span>
              {post.tags.length > 0 && (
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-muted/50 rounded text-xs text-muted-foreground/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 文章内容 */}
          <article
            className="prose prose-sm sm:prose-base dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </div>
        <div className="hidden sm:block" />
      </div>
    </main>
  );
}
