import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';
import { notFound } from 'next/navigation';

// 生成静态路径
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs;
}

// 生成页面元数据
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  
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

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex-1 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_8fr_1fr]">
        <div className="hidden sm:block" />
        <div className="p-3 sm:p-5 max-w-[1200px] mx-auto w-full">
          {/* 文章头部 */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{post.date}</span>
              {post.tags.length > 0 && (
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2 py-0.5 bg-muted rounded text-xs"
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
