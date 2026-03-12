'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { useScroll } from '@/hooks/use-scroll';
import { ArrowLeft } from 'lucide-react';

interface FloatingHeaderProps {
  showBack?: boolean;
  backHref?: string;
  backLabel?: string;
}

export function FloatingHeader({ 
  showBack = false, 
  backHref = '/content', 
  backLabel = '返回' 
}: FloatingHeaderProps) {
  const isScrolled = useScroll(100);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_8fr_1fr] w-full">
          <div className="hidden sm:block" />
          <div className="flex h-14 items-center justify-between max-w-[1200px] mx-auto px-3 sm:px-5 w-full">
            <div className="flex items-center gap-4">
              {showBack && (
                <Link 
                  href={backHref}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {backLabel}
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
    </>
  );
}
