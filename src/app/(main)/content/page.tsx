import { getAllPosts } from '@/lib/posts';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import { GridBackground } from '@/components/ui/grid-background';

// 文章卡片组件
function ArticleCard({ post }: { post: { slug: string; title: string; excerpt: string; date: string; tags: string[] } }) {
  return (
    <Link
      href={`/content/${post.slug}`}
      className="group block bg-card border border-border rounded-xl p-4 hover:border-foreground/30 transition-all duration-300 hover:shadow-md break-inside-avoid mb-2"
    >
      <h3 className="font-semibold text-lg leading-snug mb-2 line-clamp-3 group-hover:text-foreground/80 transition-colors">
        {post.title}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>{post.date}</span>
        </div>
        {post.tags.length > 0 && (
          <span className="px-2 py-0.5 bg-muted rounded text-[10px]">
            {post.tags[0]}
          </span>
        )}
      </div>
    </Link>
  );
}

// 筛选标签
const filterTags = [
  { id: 'all', label: '全部' },
  { id: 'tech', label: '技术' },
  { id: 'ecommerce', label: '电商' },
  { id: 'essay', label: '随笔' },
  { id: 'tools', label: '工具' },
];

export default function ContentPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* 背景 */}
      <GridBackground />
      
      <main className="flex-1 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] max-w-[1400px] mx-auto">
          {/* 左侧筛选导航 - 宽屏显示在左侧，窄屏显示在上边 */}
          <aside className="p-3 sm:p-5">
            {/* 窄屏：横向排列 */}
            <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {filterTags.map((tag) => (
                <button
                  key={tag.id}
                  className={`px-3 py-1.5 text-sm rounded-full border transition-all whitespace-nowrap ${
                    tag.id === 'all'
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-card border-border hover:border-foreground/30'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
            
            {/* 宽屏：纵向排列 */}
            <div className="hidden lg:block sticky top-20">
              <h3 className="font-semibold mb-4 text-sm text-muted-foreground uppercase tracking-wider">
                分类筛选
              </h3>
              <div className="space-y-1">
                {filterTags.map((tag) => (
                  <button
                    key={tag.id}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${
                      tag.id === 'all'
                        ? 'bg-foreground text-background'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* 文章列表 */}
          <div className="p-3 sm:p-5">
            {/* 文章列表 - 瀑布流 */}
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-2">
              {posts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
