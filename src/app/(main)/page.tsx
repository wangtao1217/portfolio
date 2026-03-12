'use client';

import { useState, useEffect, useRef } from 'react';
import { Github, Twitter, Linkedin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Container, HStack } from '@/components/layout';
import { GridBackground } from '@/components/ui/grid-background';

// Terminal 风格的命令行历史
const terminalLines = [
  { type: 'prompt', content: 'whoami' },
  { type: 'output', content: '深澜 / Cross-border E-commerce × Tech' },
  { type: 'prompt', content: 'cat motto.txt' },
  { type: 'output', content: 'The only way to do great work is to love what you do.' },
  { type: 'prompt', content: 'cat motto.txt' },
  { type: 'output', content: 'Stay hungry, stay foolish.' },
  { type: 'prompt', content: 'cat motto.txt' },
  { type: 'output', content: 'Think different.' },
  { type: 'prompt', content: 'cat motto.txt' },
  { type: 'output', content: 'Less is more.' },
];

// Terminal 打字机组件
function TerminalTypewriter({ lines, typingSpeed = 60, linePause = 800 }: { 
  lines: typeof terminalLines; 
  typingSpeed?: number;
  linePause?: number;
}) {
  const [displayLines, setDisplayLines] = useState<{type: string, content: string}[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 光标闪烁
  useEffect(() => {
    const interval = setInterval(() => setShowCursor(p => !p), 530);
    return () => clearInterval(interval);
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayLines]);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      const timeout = setTimeout(() => {
        setDisplayLines([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const currentLine = lines[currentLineIndex];
    const fullContent = currentLine.content;

    if (currentCharIndex < fullContent.length) {
      const timeout = setTimeout(() => {
        setDisplayLines(prev => {
          const newLines = [...prev];
          if (newLines.length <= currentLineIndex) {
            newLines.push({ type: currentLine.type, content: fullContent.slice(0, currentCharIndex + 1) });
          } else {
            newLines[currentLineIndex] = { 
              type: currentLine.type, 
              content: fullContent.slice(0, currentCharIndex + 1) 
            };
          }
          return newLines;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, typingSpeed + Math.random() * 40);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, linePause);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex, lines, typingSpeed, linePause]);

  return (
    <div 
      ref={scrollRef}
      className="font-sans text-sm sm:text-base h-full overflow-y-auto no-scrollbar"
    >
      {displayLines.map((line, index) => (
        <div 
          key={index} 
          className={`${
            line.type === 'prompt' 
              ? 'text-foreground/50' 
              : 'text-foreground'
          }`}
        >
          {line.type === 'prompt' && (
            <span className="text-foreground/30 mr-2">$</span>
          )}
          {line.content}
          {index === displayLines.length - 1 && showCursor && (
            <span className="inline-block w-[8px] h-[1.2em] bg-foreground/80 ml-0.5" />
          )}
        </div>
      ))}
    </div>
  );
}

// 导航卡片数据
const navCards = [
  {
    title: 'GALLERY',
    subtitle: '01',
    description: '视觉作品',
    href: '/gallery',
  },
  {
    title: 'CONTENT',
    subtitle: '02',
    description: '文章笔记',
    href: '/content',
  },
  {
    title: 'ABOUT',
    subtitle: '03',
    description: '关于我',
    href: '/about',
  },
];

// 导航卡片组件
function NavCard({ card, index, total }: { card: typeof navCards[0]; index: number; total: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const isLast = index === total - 1;

  return (
    <Link
      href={card.href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex items-center justify-between py-5 px-4 transition-all duration-300"
    >
      {/* 底部虚线 - 手机竖列时贯穿整个容器宽度，除了最后一个 */}
      {!isLast && (
        <div className="absolute -bottom-3 left-[-100vw] right-[-100vw] h-px sm:hidden">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeWidth="1" strokeDasharray="4,2" opacity="0.15" />
          </svg>
        </div>
      )}

      <div className="flex flex-col items-start">
        {/* 序号 - 放上面左对齐 */}
        <span className="text-xs font-sans text-muted-foreground/40 mb-3">
          {card.subtitle}
        </span>

        {/* 英文标题 */}
        <div className="relative">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight mb-2 transition-colors duration-300 group-hover:text-foreground font-sans">
            {card.title}
          </h2>
          {/* 悬停下划线 */}
          <div
            className={`absolute bottom-0 left-0 h-[2px] bg-foreground transition-all duration-500 ${
              isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'
            }`}
          />
        </div>

        {/* 中文描述 */}
        <p className="text-sm text-muted-foreground/60 transition-all duration-300 group-hover:text-muted-foreground mt-1">
          {card.description}
        </p>
      </div>

      {/* 右侧箭头 */}
      <ArrowRight
        className={`h-5 w-5 flex-shrink-0 ml-4 transition-all duration-300 ${
          isHovered
            ? 'text-foreground translate-x-1'
            : 'text-muted-foreground/40'
        }`}
      />
    </Link>
  );
}

// 社交媒体图标组件
function SocialIcon({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-white/20 transition-all duration-300 hover:border-white/60"
    >
      <Icon 
        className={`h-4 w-4 transition-colors duration-300 ${
          isHovered ? 'text-white' : 'text-white/50'
        }`} 
      />
    </a>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* SVG 虚线网格背景 */}
      <GridBackground />

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        {/* Terminal 区域 */}
        <div className="grid grid-cols-[1fr_8fr_1fr] relative">
          {/* 下边虚线 */}
          <svg className="absolute bottom-0 left-0 right-0 h-px w-full pointer-events-none" preserveAspectRatio="none">
            <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeWidth="1" strokeDasharray="4,2" opacity="0.15" />
          </svg>
          <div />
          <div className="p-5 flex justify-center">
            <div className="w-full max-w-[800px]">
              {/* 标题 */}
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 font-sans">
                to make the world better
              </h1>
              {/* 打字机内容 */}
              <div className="h-[240px]">
                {mounted && <TerminalTypewriter lines={terminalLines} typingSpeed={50} linePause={600} />}
              </div>
            </div>
          </div>
          <div />
        </div>

        {/* 导航卡片区域 */}
        <div className="grid grid-cols-[1fr_8fr_1fr] relative">
          {/* 上边虚线 */}
          <svg className="absolute top-0 left-0 right-0 h-px w-full pointer-events-none" preserveAspectRatio="none">
            <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeWidth="1" strokeDasharray="4,2" opacity="0.15" />
          </svg>
          {/* 下边虚线 */}
          <svg className="absolute bottom-0 left-0 right-0 h-px w-full pointer-events-none" preserveAspectRatio="none">
            <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeWidth="1" strokeDasharray="4,2" opacity="0.15" />
          </svg>
          <div />
          <div className="p-5 flex justify-center">
            <div className="w-full max-w-[800px]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                {navCards.map((card, index) => (
                  <NavCard key={card.title} card={card} index={index} total={navCards.length} />
                ))}
              </div>
            </div>
          </div>
          <div />
        </div>

        {/* 推荐内容区域 */}
        <div className="grid grid-cols-[1fr_8fr_1fr] relative">
          {/* 上边虚线 */}
          <svg className="absolute top-0 left-0 right-0 h-px w-full pointer-events-none" preserveAspectRatio="none">
            <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeWidth="1" strokeDasharray="4,2" opacity="0.15" />
          </svg>
          {/* 下边虚线 */}
          <svg className="absolute bottom-0 left-0 right-0 h-px w-full pointer-events-none" preserveAspectRatio="none">
            <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeWidth="1" strokeDasharray="4,2" opacity="0.15" />
          </svg>
          <div />
          <div className="p-5 flex justify-center">
            <div className="w-full max-w-[800px]">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">EXPLORE</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 推荐卡片 1 */}
                <div className="group bg-card border border-dashed border-border rounded-xl p-6 min-h-[180px] hover:border-foreground/30 transition-all duration-300 hover:shadow-md cursor-pointer flex flex-col">
                  <span className="text-xs text-muted-foreground mb-3 block">跨境电商</span>
                  <h3 className="font-semibold text-lg mb-3 group-hover:text-foreground/80 transition-colors">亚马逊运营指南</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 flex-1">从零开始学习亚马逊运营，掌握选品、Listing优化、广告投放等核心技能...</p>
                </div>
                {/* 推荐卡片 2 */}
                <div className="group bg-card border border-dashed border-border rounded-xl p-6 min-h-[180px] hover:border-foreground/30 transition-all duration-300 hover:shadow-md cursor-pointer flex flex-col">
                  <span className="text-xs text-muted-foreground mb-3 block">技术分享</span>
                  <h3 className="font-semibold text-lg mb-3 group-hover:text-foreground/80 transition-colors">Next.js 最佳实践</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 flex-1">深入探讨 Next.js 14 的新特性，App Router、Server Components 实战技巧...</p>
                </div>
                {/* 推荐卡片 3 */}
                <div className="group bg-card border border-dashed border-border rounded-xl p-6 min-h-[180px] hover:border-foreground/30 transition-all duration-300 hover:shadow-md cursor-pointer flex flex-col">
                  <span className="text-xs text-muted-foreground mb-3 block">随笔</span>
                  <h3 className="font-semibold text-lg mb-3 group-hover:text-foreground/80 transition-colors">2024 年度总结</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 flex-1">回顾过去一年的成长与收获，记录技术学习、工作经历和生活感悟...</p>
                </div>
                {/* 推荐卡片 4 */}
                <div className="group bg-card border border-dashed border-border rounded-xl p-6 min-h-[180px] hover:border-foreground/30 transition-all duration-300 hover:shadow-md cursor-pointer flex flex-col">
                  <span className="text-xs text-muted-foreground mb-3 block">工具推荐</span>
                  <h3 className="font-semibold text-lg mb-3 group-hover:text-foreground/80 transition-colors">我的效率工具箱</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 flex-1">分享日常使用的开发工具、效率软件和工作流程，提升生产力的秘诀...</p>
                </div>
              </div>
            </div>
          </div>
          <div />
        </div>
      </main>

    </>
  );
}
