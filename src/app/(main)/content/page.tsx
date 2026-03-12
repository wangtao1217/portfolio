import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';

// 文章卡片组件 - 使用 explore 卡片样式
function ArticleCard({ post }: { post: { slug: string; title: string; excerpt: string; date: string; tags: string[] } }) {
  // 从 tags 中提取分类（第一个 type/ 或 topic/ 标签）
  const category = post.tags.find(tag => tag.startsWith('type/') || tag.startsWith('topic/'))?.split('/')[1] || '笔记';

  return (
    <Link
      href={`/content/${post.slug}`}
      className="group bg-card border border-transparent rounded-xl p-6 min-h-[180px] hover:border-foreground/10 transition-all duration-300 cursor-pointer flex flex-col break-inside-avoid mb-4"
    >
      {/* 顶部：时间和标签 */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs text-muted-foreground/60">{post.date}</span>
        {post.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="text-xs text-muted-foreground/50">
            #{tag.split('/').pop()}
          </span>
        ))}
      </div>

      {/* 标题 */}
      <h3 className="font-semibold text-lg mb-3 group-hover:text-foreground/80 transition-colors line-clamp-2">
        {post.title}
      </h3>

      {/* 摘要 - 一行半 */}
      <p className="text-sm text-muted-foreground line-clamp-[1.5] flex-1">
        {post.excerpt}
      </p>
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

export default function ContentPage() {
  const posts = getAllPosts();

  return (
    <>
      <main className="flex-1 relative z-10">
        {/* 使用主页一样的栅格布局 grid-cols-[1fr_8fr_1fr] */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_8fr_1fr]">
          <div className="hidden sm:block" />
          
          <div className="p-3 sm:p-5 max-w-[800px] mx-auto w-full">
            {/* 页面标题 */}
            <div className="mb-4">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-sans">
                Content.
              </h1>
            </div>

            {/* 筛选导航 - 极简风格 */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
              {filterTags.map((tag) => (
                <button
                  key={tag.id}
                  className={`px-2 py-[2px] text-sm transition-all whitespace-nowrap ${
                    tag.id === 'all'
                      ? 'border-b border-foreground'
                      : 'text-muted-foreground/60 hover:text-muted-foreground'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
            
            {/* 文章列表 - 手机端一列，其他瀑布流 */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-2">
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
