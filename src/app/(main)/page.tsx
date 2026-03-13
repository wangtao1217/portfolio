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
              ? 'text-[#84cc16]/60' 
              : 'text-foreground'
          }`}
        >
          {line.type === 'prompt' && (
            <span className="text-[#84cc16]/40 mr-2">$</span>
          )}
          {line.content}
          {index === displayLines.length - 1 && showCursor && (
            <span className="inline-block w-[8px] h-[1.2em] bg-[#84cc16] ml-0.5" />
          )}
        </div>
      ))}
    </div>
  );
}

// 打字机效果标签组件 - Terminal风格
function TypingBadge({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const typeNextChar = () => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
        // 随机打字速度，模拟真实打字
        const randomDelay = 80 + Math.random() * 60;
        setTimeout(typeNextChar, randomDelay);
      } else {
        setIsComplete(true);
        // 完成后2秒重新开始
        setTimeout(() => {
          setDisplayText('');
          setIsComplete(false);
          index = 0;
          typeNextChar();
        }, 2000);
      }
    };
    
    const initialDelay = setTimeout(typeNextChar, 500);
    return () => clearTimeout(initialDelay);
  }, [text]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor(p => !p), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="ml-2 text-xs text-[#84cc16]/70 font-mono inline-flex items-center">
      [<span className="mx-0.5">{displayText}</span>{!isComplete && showCursor && <span className="inline-block w-[6px] h-[1em] bg-[#84cc16]/60" />}]</span>
  );
}

// 导航卡片数据
const navCards = [
  {
    title: 'CONTENT',
    subtitle: '01',
    description: '文章笔记',
    href: '/content',
  },
  {
    title: 'GALLERY',
    subtitle: '02',
    description: '视觉作品',
    href: '/gallery',
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
        <span className="text-xs font-sans text-[#84cc16]/60 mb-3">
          {card.subtitle}
        </span>

        {/* 英文标题 */}
        <div className="relative">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight mb-2 transition-colors duration-300 group-hover:text-[#84cc16] font-sans">
            {card.title}
          </h2>
          {/* 悬停下划线 */}
          <div
            className={`absolute bottom-0 left-0 h-[2px] bg-[#84cc16] transition-all duration-500 ${
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
            ? 'text-[#84cc16] translate-x-1'
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
      className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-[#84cc16]/30 transition-all duration-300 hover:border-[#84cc16] hover:bg-[#84cc16]/10"
    >
      <Icon 
        className={`h-4 w-4 transition-colors duration-300 ${
          isHovered ? 'text-[#84cc16]' : 'text-[#84cc16]/60'
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
        <div className="relative">
          {/* 下边虚线 - 全屏宽度 */}
          <svg className="absolute bottom-0 left-[-50vw] right-[-50vw] h-px w-[200vw] pointer-events-none" preserveAspectRatio="none">
            <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeWidth="1" strokeDasharray="4,2" opacity="0.15" />
          </svg>
          <div className="grid grid-cols-[1fr_8fr_1fr]">
            <div />
            <div className="p-5 flex justify-center">
              <div className="w-full max-w-[800px]">
                {/* 标题 - 加大字号 */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 font-sans text-foreground">
                  To make the world better.
                </h1>
                {/* 打字机内容 */}
                <div className="h-[240px]">
                  {mounted && <TerminalTypewriter lines={terminalLines} typingSpeed={50} linePause={600} />}
                </div>
              </div>
            </div>
            <div />
          </div>
        </div>

        {/* 导航卡片区域 */}
        <div className="relative">
          {/* 上边虚线 - 全屏宽度 */}
          <svg className="absolute top-0 left-[-50vw] right-[-50vw] h-px w-[200vw] pointer-events-none" preserveAspectRatio="none">
            <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeWidth="1" strokeDasharray="4,2" opacity="0.15" />
          </svg>
          {/* 下边虚线 - 全屏宽度 */}
          <svg className="absolute bottom-0 left-[-50vw] right-[-50vw] h-px w-[200vw] pointer-events-none" preserveAspectRatio="none">
            <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeWidth="1" strokeDasharray="4,2" opacity="0.15" />
          </svg>
          <div className="grid grid-cols-[1fr_8fr_1fr]">
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
        </div>

        {/* 推荐内容区域 */}
        <div className="relative">
          {/* 上边虚线 - 全屏宽度 */}
          <svg className="absolute top-0 left-[-50vw] right-[-50vw] h-px w-[200vw] pointer-events-none" preserveAspectRatio="none">
            <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeWidth="1" strokeDasharray="4,2" opacity="0.15" />
          </svg>
          {/* 下边虚线 - 全屏宽度 */}
          <svg className="absolute bottom-0 left-[-50vw] right-[-50vw] h-px w-[200vw] pointer-events-none" preserveAspectRatio="none">
            <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeWidth="1" strokeDasharray="4,2" opacity="0.15" />
          </svg>
          <div className="grid grid-cols-[1fr_8fr_1fr]">
            <div />
            <div className="p-5 flex justify-center">
              <div className="w-full max-w-[800px]">
                {/* EXPLORE 标题 - 加大字号 */}
                <div className="mb-8 mt-4">
                  <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight font-sans text-foreground">
                    Explore.
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 推荐卡片 1 - 加工中（打字机效果） */}
                  <Link href="/content/amazon-sop-wip" className="group bg-white border border-gray-200 rounded-xl p-6 min-h-[180px] hover:border-[#84cc16] hover:shadow-lg hover:shadow-[#84cc16]/10 transition-all duration-300 cursor-pointer flex flex-col">
                    <span className="text-xs text-[#84cc16] mb-3 block font-medium">运营</span>
                    <h3 className="font-semibold text-lg mb-3 group-hover:text-[#84cc16] transition-colors">
                      亚马逊运营全流程SOP实践笔记
                      <TypingBadge text="加工中" />
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 flex-1">从零到一搭建亚马逊运营体系，涵盖选品、Listing、广告、库存全链路SOP。</p>
                  </Link>
                  {/* 推荐卡片 2 */}
                  <Link href="/content/cross-border-ecommerce-overview" className="group bg-white border border-gray-200 rounded-xl p-6 min-h-[180px] hover:border-[#84cc16] hover:shadow-lg hover:shadow-[#84cc16]/10 transition-all duration-300 cursor-pointer flex flex-col">
                    <span className="text-xs text-[#84cc16] mb-3 block font-medium">商业</span>
                    <h3 className="font-semibold text-lg mb-3 group-hover:text-[#84cc16] transition-colors">跨境电商全局纵观</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 flex-1">从商业价值创造本质出发，剖析跨境电商的三重本质与价值闭环。</p>
                  </Link>
                  {/* 推荐卡片 3 */}
                  <Link href="/content/operation-system-overview" className="group bg-white border border-gray-200 rounded-xl p-6 min-h-[180px] hover:border-[#84cc16] hover:shadow-lg hover:shadow-[#84cc16]/10 transition-all duration-300 cursor-pointer flex flex-col">
                    <span className="text-xs text-[#84cc16] mb-3 block font-medium">运营</span>
                    <h3 className="font-semibold text-lg mb-3 group-hover:text-[#84cc16] transition-colors">运营纵览笔记</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 flex-1">从第一性原理拆解运营本质，构建流量、转化、交付、用户的四环节飞轮。</p>
                  </Link>
                  {/* 推荐卡片 4 - 待加工 */}
                  <div className="group bg-white border border-gray-200 rounded-xl p-6 min-h-[180px] hover:border-[#84cc16] hover:shadow-lg hover:shadow-[#84cc16]/10 transition-all duration-300 cursor-pointer flex flex-col">
                    <span className="text-xs text-[#84cc16] mb-3 block font-medium">随笔</span>
                    <h3 className="font-semibold text-lg mb-3 group-hover:text-[#84cc16] transition-colors">
                      2026年度总结
                      <span className="ml-2 text-xs text-muted-foreground/50">「待加工」</span>
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 flex-1">回顾2026年的成长轨迹、关键决策与未来展望。</p>
                  </div>
                </div>
              </div>
            </div>
            <div />
          </div>
        </div>
      </main>

    </>
  );
}
