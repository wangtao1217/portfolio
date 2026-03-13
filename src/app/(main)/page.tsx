'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { GridBackground } from '@/components/ui/grid-background';

// Terminal 风格的命令行历史 - 3句一个循环
const terminalLines = [
  { type: 'prompt', content: 'whoami', inlineOutput: '@深澜' },
  { type: 'output', content: 'Cross-border E-commerce operator / Tech explorer / Lifelong learner' },
  { type: 'prompt', content: 'cat motto.txt' },
  { type: 'output', content: '' }, // 动态填充
  { type: 'prompt', content: 'cat motto.txt' },
  { type: 'output', content: '' }, // 动态填充
  { type: 'prompt', content: 'cat motto.txt' },
  { type: 'output', content: '' }, // 动态填充
];

// 100条哲思语句 - 只包含句子，作者名用于替换motto
const mottos = [
  { text: "The unexamined life is not worth living.", author: "Socrates" },
  { text: "Know thyself.", author: "Socrates" },
  { text: "Virtue is the only true good.", author: "Socrates" },
  { text: "Wisdom begins in wonder.", author: "Socrates" },
  { text: "To find yourself, think for yourself.", author: "Socrates" },
  { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
  { text: "An honest man is always a child.", author: "Socrates" },
  { text: "Strong minds discuss ideas, average minds discuss events.", author: "Socrates" },
  { text: "He who is not a good servant will not be a good master.", author: "Socrates" },
  { text: "The way to gain a good reputation is to endeavor to be what you desire.", author: "Socrates" },
  { text: "Happiness depends upon ourselves.", author: "Aristotle" },
  { text: "Excellence is never an accident.", author: "Aristotle" },
  { text: "The whole is greater than the sum of its parts.", author: "Aristotle" },
  { text: "We are what we repeatedly do. Excellence is not an act, but a habit.", author: "Aristotle" },
  { text: "Pleasure in the job puts perfection in the work.", author: "Aristotle" },
  { text: "It is the mark of an educated mind to entertain a thought without accepting it.", author: "Aristotle" },
  { text: "The aim of art is to represent the inward significance.", author: "Aristotle" },
  { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
  { text: "Man is by nature a political animal.", author: "Aristotle" },
  { text: "The roots of education are bitter, but the fruit is sweet.", author: "Aristotle" },
  { text: "Life must be understood backward, but lived forward.", author: "Kierkegaard" },
  { text: "Anxiety is the dizziness of freedom.", author: "Kierkegaard" },
  { text: "The function of prayer is to change the nature of the one who prays.", author: "Kierkegaard" },
  { text: "Face the facts of being what you are.", author: "Kierkegaard" },
  { text: "To dare is to lose one's footing momentarily.", author: "Kierkegaard" },
  { text: "The most common form of despair is not being who you are.", author: "Kierkegaard" },
  { text: "There are two ways to be fooled.", author: "Kierkegaard" },
  { text: "Patience is necessary.", author: "Kierkegaard" },
  { text: "Boredom is the root of all evil.", author: "Kierkegaard" },
  { text: "The tyrant dies and his rule is over.", author: "Kierkegaard" },
  { text: "Man is condemned to be free.", author: "Sartre" },
  { text: "Hell is other people.", author: "Sartre" },
  { text: "Existence precedes essence.", author: "Sartre" },
  { text: "Freedom is what you do with what's been done to you.", author: "Sartre" },
  { text: "We are our choices.", author: "Sartre" },
  { text: "Life begins on the other side of despair.", author: "Sartre" },
  { text: "If you are lonely when you're alone, you are in bad company.", author: "Sartre" },
  { text: "Commitment is an act, not a word.", author: "Sartre" },
  { text: "Everything has been figured out, except how to live.", author: "Sartre" },
  { text: "There may be more beautiful times, but this one is ours.", author: "Sartre" },
  { text: "God is dead! He remains dead! And we have killed him.", author: "Nietzsche" },
  { text: "What does not kill me makes me stronger.", author: "Nietzsche" },
  { text: "He who has a why to live can bear almost any how.", author: "Nietzsche" },
  { text: "Without music, life would be a mistake.", author: "Nietzsche" },
  { text: "To live is to suffer, to survive is to find meaning.", author: "Nietzsche" },
  { text: "The higher we soar the smaller we appear.", author: "Nietzsche" },
  { text: "There are no facts, only interpretations.", author: "Nietzsche" },
  { text: "The individual has always had to struggle.", author: "Nietzsche" },
  { text: "You must have chaos within you to give birth to a dancing star.", author: "Nietzsche" },
  { text: "One is not born, but rather becomes, a woman.", author: "Beauvoir" },
  { text: "I am too intelligent to be taken charge of entirely.", author: "Beauvoir" },
  { text: "Change your life today. Don't gamble on the future.", author: "Beauvoir" },
  { text: "Self-knowledge can supply the courage to fight for happiness.", author: "Beauvoir" },
  { text: "One's life has value through love and compassion.", author: "Beauvoir" },
  { text: "I tore myself away from the safe comfort of certainties.", author: "Beauvoir" },
  { text: "Representation of the world is the work of men.", author: "Beauvoir" },
  { text: "The ideal should be to be capable of loving anyone.", author: "Beauvoir" },
  { text: "Sex pleasure demands complete abandon.", author: "Beauvoir" },
  { text: "The mind is everything. What you think you become.", author: "Buddha" },
  { text: "Peace comes from within. Do not seek it without.", author: "Buddha" },
  { text: "Three things cannot be long hidden.", author: "Buddha" },
  { text: "Do not dwell in the past, do not dream of the future.", author: "Buddha" },
  { text: "The only real failure is not to be true to the best one knows.", author: "Buddha" },
  { text: "Health is the greatest gift.", author: "Buddha" },
  { text: "Thousands of candles can be lighted from a single candle.", author: "Buddha" },
  { text: "We are shaped by our thoughts.", author: "Buddha" },
  { text: "Holding on to anger is like grasping a hot coal.", author: "Buddha" },
  { text: "The journey of a thousand miles begins with one step.", author: "Laozi" },
  { text: "A good traveler has no fixed plans.", author: "Laozi" },
  { text: "Nature does not hurry, yet everything is accomplished.", author: "Laozi" },
  { text: "Those who know do not speak.", author: "Laozi" },
  { text: "When I let go of what I am, I become what I might be.", author: "Laozi" },
  { text: "Mastering yourself is true power.", author: "Laozi" },
  { text: "The best fighter is never angry.", author: "Laozi" },
  { text: "Silence is a source of great strength.", author: "Laozi" },
  { text: "To the mind that is still, the whole universe surrenders.", author: "Laozi" },
  { text: "I think, therefore I am.", author: "Descartes" },
  { text: "The reading of all good books is like conversation.", author: "Descartes" },
  { text: "It is not enough to have a good mind.", author: "Descartes" },
  { text: "Divide each difficulty into as many parts as feasible.", author: "Descartes" },
  { text: "The greatest minds are capable of the greatest vices.", author: "Descartes" },
  { text: "Except our own thoughts, there is nothing in our power.", author: "Descartes" },
  { text: "Each problem solved became a rule for other problems.", author: "Descartes" },
  { text: "Never accept a thing as true without a single doubt.", author: "Descartes" },
  { text: "Conquer yourself rather than the world.", author: "Descartes" },
  { text: "We live in the best of all possible worlds.", author: "Leibniz" },
  { text: "Music is the pleasure of counting without awareness.", author: "Leibniz" },
  { text: "To love is to place our happiness in another.", author: "Leibniz" },
  { text: "The present is big with the future.", author: "Leibniz" },
  { text: "There is no place for a timid soul.", author: "Leibniz" },
  { text: "Men act like brutes through memory only.", author: "Leibniz" },
  { text: "The soul is the mirror of an indestructible universe.", author: "Leibniz" },
  { text: "Perception is the inner state of the monad.", author: "Leibniz" },
  { text: "Man is born free, and everywhere he is in chains.", author: "Rousseau" },
  { text: "The world of imagination is boundless.", author: "Rousseau" },
  { text: "Patience is bitter, but its fruit is sweet.", author: "Rousseau" },
  { text: "People who know little are usually great talkers.", author: "Rousseau" },
  { text: "What wisdom can you find greater than kindness?", author: "Rousseau" },
  { text: "It is too difficult to think nobly when earning a living.", author: "Rousseau" },
  { text: "The strongest is never strong enough to always be master.", author: "Rousseau" },
  { text: "To endure is the first thing a child ought to learn.", author: "Rousseau" },
  { text: "Gratitude is a duty which ought to be paid.", author: "Rousseau" },
  { text: "Civilization is a hopeless race to discover remedies.", author: "Rousseau" },
];

// Terminal 打字机组件 - 3句循环，速度稍慢
function TerminalTypewriter({ typingSpeed = 70, linePause = 900 }: { 
  typingSpeed?: number;
  linePause?: number;
}) {
  const [displayLines, setDisplayLines] = useState<{type: string, content: string}[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [mottoOffset, setMottoOffset] = useState(0);
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

  // 获取当前行的内容
  const getCurrentLineContent = (index: number) => {
    const line = terminalLines[index];
    if (line.type === 'prompt') {
      return line.content;
    }
    // output 行：第一个是英文介绍，后面是 motto
    if (index === 1) return 'Cross-border E-commerce operator / Tech explorer / Lifelong learner';
    // motto 行 - 只显示句子，不显示@作者
    const mottoIndex = (mottoOffset + Math.floor((index - 2) / 2)) % mottos.length;
    return mottos[mottoIndex].text;
  };

  useEffect(() => {
    if (currentLineIndex >= terminalLines.length) {
      // 3句完成后重置
      const timeout = setTimeout(() => {
        setDisplayLines([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
        setMottoOffset(prev => (prev + 3) % mottos.length);
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const fullContent = getCurrentLineContent(currentLineIndex);

    if (currentCharIndex < fullContent.length) {
      const timeout = setTimeout(() => {
        setDisplayLines(prev => {
          const newLines = [...prev];
          if (newLines.length <= currentLineIndex) {
            newLines.push({ type: terminalLines[currentLineIndex].type, content: fullContent.slice(0, currentCharIndex + 1) });
          } else {
            newLines[currentLineIndex] = { 
              type: terminalLines[currentLineIndex].type, 
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
  }, [currentLineIndex, currentCharIndex, mottoOffset, typingSpeed, linePause]);

  return (
    <div 
      ref={scrollRef}
      className="font-mono text-sm sm:text-base h-full overflow-y-auto no-scrollbar"
    >
      {displayLines.map((line, index) => {
        const originalLine = terminalLines[index];
        const hasInlineOutput = originalLine?.type === 'prompt' && originalLine?.inlineOutput;
        
        return (
          <div 
            key={index} 
            className={`${
              line.type === 'prompt' 
                ? 'text-muted-foreground/60' 
                : 'text-foreground'
            }`}
          >
            {line.type === 'prompt' && (
              <span className="text-muted-foreground/40 mr-2">$</span>
            )}
            {line.content}
            {hasInlineOutput && (
              <span className="text-foreground ml-2">{originalLine.inlineOutput}</span>
            )}
            {index === displayLines.length - 1 && showCursor && (
              <span className="inline-block w-[8px] h-[1.2em] bg-foreground ml-0.5 align-middle" />
            )}
          </div>
        );
      })}
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
        const randomDelay = 80 + Math.random() * 60;
        setTimeout(typeNextChar, randomDelay);
      } else {
        setIsComplete(true);
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
    <span className="ml-2 text-xs text-muted-foreground/70 font-mono inline-flex items-center">
      [<span className="mx-0.5">{displayText}</span>{!isComplete && showCursor && <span className="inline-block w-[6px] h-[1em] bg-muted-foreground/60" />}]</span>
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
            <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" opacity="0.15" />
          </svg>
        </div>
      )}

      <div className="flex flex-col items-start">
        {/* 序号 - 放上面左对齐 */}
        <span className="text-xs font-mono text-muted-foreground/50 mb-3">
          {card.subtitle}
        </span>

        {/* 英文标题 */}
        <div className="relative">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight mb-2 transition-colors duration-300 group-hover:text-foreground font-sans">
            {card.title}
          </h2>
          {/* 悬停下划线 */}
          <div
            className={`absolute bottom-0 left-0 h-[1px] bg-foreground transition-all duration-500 ${
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
        <div className="relative py-12 sm:py-16">
          {/* 下边虚线 - 全屏宽度 */}
          <svg className="absolute bottom-0 left-[-50vw] right-[-50vw] h-px w-[200vw] pointer-events-none" preserveAspectRatio="none">
            <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" opacity="0.15" />
          </svg>
          <div className="grid grid-cols-[1fr_8fr_1fr]">
            <div />
            <div className="px-5 flex justify-center">
              <div className="w-full max-w-[800px]">
                {/* 标题 - 加大字号 */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight mb-8 font-sans text-foreground">
                  To make the world better.
                </h1>
                {/* 打字机内容 */}
                <div className="h-[240px]">
                  {mounted && <TerminalTypewriter typingSpeed={70} linePause={900} />}
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
            <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" opacity="0.15" />
          </svg>
          {/* 下边虚线 - 全屏宽度 */}
          <svg className="absolute bottom-0 left-[-50vw] right-[-50vw] h-px w-[200vw] pointer-events-none" preserveAspectRatio="none">
            <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" opacity="0.15" />
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
            <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" opacity="0.15" />
          </svg>
          {/* 下边虚线 - 全屏宽度 */}
          <svg className="absolute bottom-0 left-[-50vw] right-[-50vw] h-px w-[200vw] pointer-events-none" preserveAspectRatio="none">
            <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" opacity="0.15" />
          </svg>
          <div className="grid grid-cols-[1fr_8fr_1fr]">
            <div />
            <div className="p-5 flex justify-center">
              <div className="w-full max-w-[800px]">
                {/* EXPLORE 标题 - 加大字号 */}
                <div className="mb-8 mt-4">
                  <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight font-sans text-foreground">
                    Explore.
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 推荐卡片 1 - 加工中（打字机效果） */}
                  <Link href="/content/amazon-sop-wip" className="group bg-card rounded-lg p-6 min-h-[180px] hover:bg-muted/50 transition-all duration-300 cursor-pointer flex flex-col">
                    <span className="text-xs text-muted-foreground/70 mb-3 block font-medium uppercase tracking-wider">运营</span>
                    <h3 className="font-semibold text-lg mb-3 group-hover:text-foreground transition-colors">
                      亚马逊运营全流程SOP实践笔记
                      <TypingBadge text="加工中" />
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 flex-1">从零到一搭建亚马逊运营体系，涵盖选品、Listing、广告、库存全链路SOP。</p>
                  </Link>
                  {/* 推荐卡片 2 */}
                  <Link href="/content/cross-border-ecommerce-overview" className="group bg-card rounded-lg p-6 min-h-[180px] hover:bg-muted/50 transition-all duration-300 cursor-pointer flex flex-col">
                    <span className="text-xs text-muted-foreground/70 mb-3 block font-medium uppercase tracking-wider">商业</span>
                    <h3 className="font-semibold text-lg mb-3 group-hover:text-foreground transition-colors">跨境电商全局纵观</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 flex-1">从商业价值创造本质出发，剖析跨境电商的三重本质与价值闭环。</p>
                  </Link>
                  {/* 推荐卡片 3 */}
                  <Link href="/content/operation-system-overview" className="group bg-card rounded-lg p-6 min-h-[180px] hover:bg-muted/50 transition-all duration-300 cursor-pointer flex flex-col">
                    <span className="text-xs text-muted-foreground/70 mb-3 block font-medium uppercase tracking-wider">运营</span>
                    <h3 className="font-semibold text-lg mb-3 group-hover:text-foreground transition-colors">运营纵览笔记</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 flex-1">从第一性原理拆解运营本质，构建流量、转化、交付、用户的四环节飞轮。</p>
                  </Link>
                  {/* 推荐卡片 4 - 待加工 */}
                  <div className="group bg-card rounded-lg p-6 min-h-[180px] hover:bg-muted/50 transition-all duration-300 cursor-pointer flex flex-col">
                    <span className="text-xs text-muted-foreground/70 mb-3 block font-medium uppercase tracking-wider">随笔</span>
                    <h3 className="font-semibold text-lg mb-3 group-hover:text-foreground transition-colors">
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
