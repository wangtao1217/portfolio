'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { GridBackground } from '@/components/ui/grid-background';

// Terminal 风格的命令行历史 - 3句一个循环
const terminalLines = [
  { type: 'prompt', content: 'whoami' },
  { type: 'output', content: '深澜 / Cross-border E-commerce × Tech' },
  { type: 'prompt', content: 'cat motto.txt' },
  { type: 'output', content: '' }, // 动态填充
  { type: 'prompt', content: 'cat motto.txt' },
  { type: 'output', content: '' }, // 动态填充
  { type: 'prompt', content: 'cat motto.txt' },
  { type: 'output', content: '' }, // 动态填充
];

// 100条哲思语句
const mottos = [
  "The unexamined life is not worth living. — Socrates",
  "Know thyself. — Socrates",
  "Virtue is the only true good. — Socrates",
  "Wisdom begins in wonder. — Socrates",
  "To find yourself, think for yourself. — Socrates",
  "The only true wisdom is in knowing you know nothing. — Socrates",
  "An honest man is always a child. — Socrates",
  "Strong minds discuss ideas, average minds discuss events, weak minds discuss people. — Socrates",
  "He who is not a good servant will not be a good master. — Socrates",
  "The way to gain a good reputation is to endeavor to be what you desire to appear. — Socrates",
  "Happiness depends upon ourselves. — Aristotle",
  "Excellence is never an accident. — Aristotle",
  "The whole is greater than the sum of its parts. — Aristotle",
  "We are what we repeatedly do. Excellence, then, is not an act, but a habit. — Aristotle",
  "Pleasure in the job puts perfection in the work. — Aristotle",
  "It is the mark of an educated mind to be able to entertain a thought without accepting it. — Aristotle",
  "The aim of art is to represent not the outward appearance of things, but their inward significance. — Aristotle",
  "Quality is not an act, it is a habit. — Aristotle",
  "Man is by nature a political animal. — Aristotle",
  "The roots of education are bitter, but the fruit is sweet. — Aristotle",
  "Life must be understood backward. But it must be lived forward. — Kierkegaard",
  "Anxiety is the dizziness of freedom. — Kierkegaard",
  "The function of prayer is not to influence God, but rather to change the nature of the one who prays. — Kierkegaard",
  "Face the facts of being what you are, for that is what changes what you are. — Kierkegaard",
  "To dare is to lose one's footing momentarily. Not to dare is to lose oneself. — Kierkegaard",
  "The most common form of despair is not being who you are. — Kierkegaard",
  "There are two ways to be fooled. One is to believe what isn't true; the other is to refuse to believe what is true. — Kierkegaard",
  "Patience is necessary, and one cannot reap immediately where one has sown. — Kierkegaard",
  "Boredom is the root of all evil. — Kierkegaard",
  "The tyrant dies and his rule is over, the martyr dies and his rule begins. — Kierkegaard",
  "Man is condemned to be free. — Sartre",
  "Hell is other people. — Sartre",
  "Existence precedes essence. — Sartre",
  "Freedom is what you do with what's been done to you. — Sartre",
  "We are our choices. — Sartre",
  "Life begins on the other side of despair. — Sartre",
  "If you are lonely when you're alone, you are in bad company. — Sartre",
  "Commitment is an act, not a word. — Sartre",
  "Everything has been figured out, except how to live. — Sartre",
  "There may be more beautiful times, but this one is ours. — Sartre",
  "God is dead! He remains dead! And we have killed him. — Nietzsche",
  "What does not kill me makes me stronger. — Nietzsche",
  "He who has a why to live can bear almost any how. — Nietzsche",
  "Without music, life would be a mistake. — Nietzsche",
  "That which does not kill us makes us stronger. — Nietzsche",
  "To live is to suffer, to survive is to find some meaning in the suffering. — Nietzsche",
  "The higher we soar the smaller we appear to those who cannot fly. — Nietzsche",
  "There are no facts, only interpretations. — Nietzsche",
  "The individual has always had to struggle to keep from being overwhelmed by the tribe. — Nietzsche",
  "You must have chaos within you to give birth to a dancing star. — Nietzsche",
  "One is not born, but rather becomes, a woman. — Beauvoir",
  "I am too intelligent, too demanding, and too resourceful for anyone to be able to take charge of me entirely. — Beauvoir",
  "Change your life today. Don't gamble on the future, act now, without delay. — Beauvoir",
  "Self-knowledge is no guarantee of happiness, but it is on the side of happiness and can supply the courage to fight for it. — Beauvoir",
  "One's life has value so long as one attributes value to the life of others, by means of love, friendship, indignation and compassion. — Beauvoir",
  "I tore myself away from the safe comfort of certainties through my love for truth. — Beauvoir",
  "Representation of the world, like the world itself, is the work of men; they describe it from their own point of view, which they confuse with absolute truth. — Beauvoir",
  "In itself, homosexuality is as limiting as heterosexuality: the ideal should be to be capable of loving a woman or a man. — Beauvoir",
  "Sex pleasure in woman is a kind of magic spell; it demands complete abandon. — Beauvoir",
  "The mind is everything. What you think you become. — Buddha",
  "Peace comes from within. Do not seek it without. — Buddha",
  "Three things cannot be long hidden: the sun, the moon, and the truth. — Buddha",
  "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment. — Buddha",
  "The only real failure in life is not to be true to the best one knows. — Buddha",
  "Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship. — Buddha",
  "Thousands of candles can be lighted from a single candle, and the life of the candle will not be shortened. — Buddha",
  "We are shaped by our thoughts; we become what we think. — Buddha",
  "Holding on to anger is like grasping a hot coal with the intent of throwing it at someone else. — Buddha",
  "The journey of a thousand miles begins with one step. — Laozi",
  "A good traveler has no fixed plans and is not intent on arriving. — Laozi",
  "Nature does not hurry, yet everything is accomplished. — Laozi",
  "Those who know do not speak. Those who speak do not know. — Laozi",
  "When I let go of what I am, I become what I might be. — Laozi",
  "Mastering others is strength. Mastering yourself is true power. — Laozi",
  "The best fighter is never angry. — Laozi",
  "Silence is a source of great strength. — Laozi",
  "To the mind that is still, the whole universe surrenders. — Laozi",
  "I think, therefore I am. — Descartes",
  "The reading of all good books is like conversation with the finest men of past centuries. — Descartes",
  "It is not enough to have a good mind; the main thing is to use it well. — Descartes",
  "Divide each difficulty into as many parts as is feasible and necessary to resolve it. — Descartes",
  "The greatest minds are capable of the greatest vices as well as of the greatest virtues. — Descartes",
  "Except our own thoughts, there is nothing absolutely in our power. — Descartes",
  "Each problem that I solved became a rule, which served afterwards to solve other problems. — Descartes",
  "The first precept was never to accept a thing as true until I knew it as such without a single doubt. — Descartes",
  "Conquer yourself rather than the world. — Descartes",
  "We live in the best of all possible worlds. — Leibniz",
  "This is the best of all possible worlds. — Leibniz",
  "Music is the pleasure the human mind experiences from counting without being aware that it is counting. — Leibniz",
  "To love is to place our happiness in the happiness of another. — Leibniz",
  "The present is big with the future. — Leibniz",
  "There is no place in the world for a timid soul. — Leibniz",
  "I do not believe that a man should be restrained in his daily work by his religion. — Leibniz",
  "Men act like brutes in so far as the sequences of their perceptions arise through the principle of memory only. — Leibniz",
  "The soul is the mirror of an indestructible universe. — Leibniz",
  "Perception is the inner state of the monad representing external things. — Leibniz",
  "Man is born free, and everywhere he is in chains. — Rousseau",
  "The world of reality has its limits; the world of imagination is boundless. — Rousseau",
  "Patience is bitter, but its fruit is sweet. — Rousseau",
  "People who know little are usually great talkers, while men who know much say little. — Rousseau",
  "What wisdom can you find that is greater than kindness? — Rousseau",
  "It is too difficult to think nobly when one thinks only of earning a living. — Rousseau",
  "The strongest is never strong enough to be always the master, unless he transforms strength into right. — Rousseau",
  "To endure is the first thing that a child ought to learn because it is the first thing that he will have to practice. — Rousseau",
  "Gratitude is a duty which ought to be paid, but which none have a right to expect. — Rousseau",
  "Civilization is a hopeless race to discover remedies for the evils it produces. — Rousseau",
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
    // output 行使用 motto
    const mottoIndex = (mottoOffset + Math.floor(index / 2)) % mottos.length;
    return mottos[mottoIndex];
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
      {displayLines.map((line, index) => (
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
          {index === displayLines.length - 1 && showCursor && (
            <span className="inline-block w-[8px] h-[1.2em] bg-foreground ml-0.5" />
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
