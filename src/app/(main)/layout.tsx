'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { useScroll } from '@/hooks/use-scroll';
import { ArrowLeft, Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';

// 社交媒体图标组件
function SocialIcon({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-8 h-8 rounded-full flex items-center justify-center border border-background/20 hover:border-background/60 transition-all duration-300 hover:bg-background/10"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}

// 小红书图标
function XiaohongshuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

// 知乎图标
function ZhihuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.721 0C2.251 0 0 2.25 0 5.719V18.28C0 21.751 2.252 24 5.721 24h12.56C21.751 24 24 21.75 24 18.281V5.72C24 2.249 21.75 0 18.281 0zm1.964 4.078c-.271.73-.5 1.434-.68 2.11h4.587c.545-.006.445 1.168.445 1.168H6.026l-.004.115c-.057 2.224.133 4.445.576 6.615h3.677c.61 0 .61 1.168 0 1.168H7.357c.313 1.053.76 2.07 1.337 3.033.577.964 1.281 1.83 2.108 2.59.827.76 1.768 1.37 2.82 1.835 1.053.464 2.19.697 3.41.697.827 0 1.59-.133 2.29-.4.7-.267 1.303-.63 1.81-1.09.507-.46.907-.997 1.2-1.61.293-.613.44-1.27.44-1.972 0-.64-.12-1.23-.36-1.77-.24-.54-.567-1.01-.98-1.41-.413-.4-.9-.71-1.46-.93-.56-.22-1.167-.33-1.82-.33-.64 0-1.23.1-1.77.3-.54.2-1.01.48-1.41.84-.4.36-.71.79-.93 1.29-.22.5-.33 1.05-.33 1.65 0 .56.11 1.08.33 1.56.22.48.52.9.9 1.26.38.36.83.64 1.35.84.52.2 1.09.3 1.71.3.44 0 .86-.06 1.26-.18.4-.12.76-.3 1.08-.54.32-.24.59-.53.81-.87.22-.34.37-.72.45-1.14.08-.42.09-.86.03-1.32-.06-.46-.2-.9-.42-1.32-.22-.42-.52-.79-.9-1.11-.38-.32-.84-.57-1.38-.75-.54-.18-1.15-.27-1.83-.27-.76 0-1.46.12-2.1.36-.64.24-1.2.57-1.68.99-.48.42-.86.91-1.14 1.47-.28.56-.42 1.17-.42 1.83 0 .66.14 1.27.42 1.83.28.56.66 1.05 1.14 1.47.48.42 1.04.75 1.68.99.64.24 1.34.36 2.1.36.68 0 1.29-.09 1.83-.27.54-.18 1-.43 1.38-.75.38-.32.68-.69.9-1.11.22-.42.36-.86.42-1.32.06-.46.05-.9-.03-1.32-.08-.42-.23-.8-.45-1.14-.22-.34-.49-.63-.81-.87-.32-.24-.68-.42-1.08-.54-.4-.12-.82-.18-1.26-.18-.62 0-1.19.1-1.71.3-.52.2-.97.48-1.35.84-.38.36-.68.78-.9 1.26-.22.48-.33 1-.33 1.56 0 .6.11 1.15.33 1.65.22.5.53.93.93 1.29.4.36.87.64 1.41.84.54.2 1.13.3 1.77.3.653 0 1.26-.11 1.82-.33.56-.22 1.047-.53 1.46-.93.413-.4.74-.87.98-1.41.24-.54.36-1.13.36-1.77 0-.702-.147-1.36-.44-1.972-.293-.613-.693-1.15-1.2-1.61-.507-.46-1.11-.823-1.81-1.09-.7-.267-1.463-.4-2.29-.4-1.22 0-2.357.233-3.41.697-1.052.465-1.993 1.075-2.82 1.835-.827.76-1.531 1.626-2.108 2.59-.577.963-1.024 1.98-1.337 3.033h2.587c.61 0 .61-1.168 0-1.168H7.357c.057-2.224-.133-4.445-.576-6.615h4.587c.545.006.445-1.168.445-1.168H6.026l.004-.115c.057-2.224-.133-4.445-.576-6.615h3.677c.61 0 .61-1.168 0-1.168H7.357c.18-.676.409-1.38.68-2.11H5.72z"/>
    </svg>
  );
}

// 微信图标
function WechatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.032zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
    </svg>
  );
}

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
      {/* Header - 滚动后变为悬浮导航 */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-border/50'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="flex h-14 items-center justify-between max-w-[1200px] mx-auto px-3 sm:px-5 w-full">
          <Link href="/" className="font-bold text-lg hover:opacity-70 transition-opacity">
            深澜
          </Link>
          <div className="flex items-center gap-3">
            {isArticlePage && (
              <Link
                href="/content"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-foreground/5 transition-all duration-300"
                aria-label="返回"
              >
                <ArrowLeft className="h-4 w-4" />
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* 左侧：版权信息 */}
            <p className="text-xs text-background/50">© 2026 深澜</p>
            
            {/* 中间：社交媒体图标 */}
            <div className="flex items-center gap-3">
              <SocialIcon href="https://xiaohongshu.com" icon={XiaohongshuIcon} label="小红书" />
              <SocialIcon href="https://zhihu.com" icon={ZhihuIcon} label="知乎" />
              <SocialIcon href="#" icon={WechatIcon} label="微信" />
              <a
                href="mailto:x96577213@163.com"
                aria-label="邮箱"
                className="w-8 h-8 rounded-full flex items-center justify-center border border-background/20 hover:border-background/60 transition-all duration-300 hover:bg-background/10"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
            
            {/* 右侧：邮箱地址 */}
            <a href="mailto:x96577213@163.com" className="text-xs text-background/50 hover:text-background/80 transition-colors">
              x96577213@163.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
