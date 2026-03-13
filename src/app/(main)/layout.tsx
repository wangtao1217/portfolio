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
  const isScrolled = useScroll(50);
  const pathname = usePathname();

  // 判断是否在文章详情页
  const isArticlePage = pathname.startsWith('/content/') && pathname !== '/content';

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-x-hidden">
      {/* Header - 使用网页背景色，无边框 */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background`}
      >
        <div className="flex h-14 items-center justify-between max-w-[1200px] mx-auto px-3 sm:px-5 w-full">
          <Link href="/" className="font-semibold text-lg hover:opacity-70 transition-opacity">
            深澜
          </Link>
          <div className="flex items-center gap-3">
            {isArticlePage && (
              <Link
                href="/content"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-all duration-300"
                aria-label="返回"
              >
                <ArrowLeft className="h-4 w-4 text-foreground" />
              </Link>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* 占位符 - 防止内容被固定导航遮挡 */}
      <div className="h-14" />

      {/* 页面内容 - 三栏布局：左右自适应，中间固定 */}
      <div className="flex-1 grid grid-cols-[1fr_minmax(0,1200px)_1fr]">
        {/* 左侧栏 */}
        <div />
        
        {/* 中间内容区 */}
        <div className="w-full">
          {children}
        </div>
        
        {/* 右侧栏 */}
        <div />
      </div>

      {/* Footer */}
      <footer className="bg-foreground text-background py-6 relative z-10 mt-20">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-5">
          <div className="flex flex-col sm:flex-row items-start gap-2">
            {/* 版权信息 */}
            <p className="text-xs text-background/50">© 2026 深澜</p>
            
            {/* 邮箱地址 */}
            <a href="mailto:x96577213@163.com" className="text-xs text-background/50 hover:text-background/80 transition-colors">
              x96577213@163.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
