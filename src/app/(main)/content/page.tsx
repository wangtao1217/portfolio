import { getAllPosts } from '@/lib/posts';
import { Calendar } from 'lucide-react';
import Link from 'next/link';

// 文章卡片组件
function ArticleCard({ post }: { post: { slug: string; title: string; excerpt: string; date: string } }) {
  return (
    <Link
      href={`/content/${post.slug}`}
      className="group block bg-card border border-border rounded-xl p-4 hover:border-foreground/30 transition-all duration-300 hover:shadow-md break-inside-avoid mb-3"
    >
      <h3 className="font-semibold text-lg leading-snug mb-3 line-clamp-3 group-hover:text-foreground/80 transition-colors">
        {post.title}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
        {post.excerpt}
      </p>
      <div className="flex items-center gap-1 text-xs text-muted-foreground pt-2 border-t border-border/50">
        <Calendar className="h-3 w-3" />
        <span>{post.date}</span>
      </div>
    </Link>
  );
}

export default function ContentPage() {
  const posts = getAllPosts();

  return (
    <main className="flex-1 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_8fr_1fr]">
        <div className="hidden sm:block" />
        <div className="p-3 sm:p-5 max-w-[1200px] mx-auto w-full">
          {/* 文章列表 - 瀑布流 */}
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
        <div className="hidden sm:block" />
      </div>
    </main>
  );
}
