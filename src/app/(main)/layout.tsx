'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { useScroll } from '@/hooks/use-scroll';
import { ArrowLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isScrolled = useScroll(100);
  const pathname = usePathname();

  // 判断是否在文章详情页
  const isArticlePage = pathname.startsWith('/content/') && pathname !== '/content';

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-x-hidden">
      {/* Header - 滚动后变为悬浮导航 */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-border/50'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_8fr_1fr] w-full">
          <div className="hidden sm:block" />
          <div className="flex h-14 items-center justify-between max-w-[1200px] mx-auto px-3 sm:px-5 w-full">
            <div className="flex items-center gap-4">
              {isArticlePage && (
                <Link 
                  href="/content"
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  返回
                </Link>
              )}
              <Link href="/" className="font-bold text-lg hover:opacity-70 transition-opacity">
                深澜
              </Link>
            </div>
            <ThemeToggle />
          </div>
          <div className="hidden sm:block" />
        </div>
      </header>

      {/* 占位符 - 防止内容被固定导航遮挡 */}
      <div className="h-14" />

      {/* 页面内容 */}
      {children}

      {/* Footer */}
      <footer className="bg-foreground text-background py-6 relative z-10 mt-20">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-5 text-center">
          <p className="text-xs text-background/50">© 2026 深澜</p>
        </div>
      </footer>
    </div>
  );
}
