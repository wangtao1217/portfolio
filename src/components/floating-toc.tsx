'use client';

import { useEffect, useState } from 'react';
import { TableOfContents, X } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function FloatingToc() {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const article = document.querySelector('article.prose');
    if (!article) return;

    const headings = article.querySelectorAll('h2, h3, h4');
    const items: TocItem[] = [];

    headings.forEach((heading, index) => {
      const id = `heading-${index}`;
      heading.id = id;
      items.push({
        id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName[1]),
      });
    });

    setToc(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  if (toc.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* 悬浮按钮 - 无透明效果 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-background border border-border shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-105 text-foreground"
        aria-label="目录"
      >
        {isOpen ? <X className="h-5 w-5" /> : <TableOfContents className="h-5 w-5" />}
      </button>

      {/* 侧拉面板 - 无透明效果 */}
      <div
        className={`fixed bottom-20 right-6 z-40 w-64 max-h-[60vh] bg-background rounded-xl shadow-2xl border border-border transition-all duration-300 overflow-hidden ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <span className="text-sm font-medium">大纲</span>
          <span className="text-xs text-muted-foreground">{toc.length} 节</span>
        </div>

        {/* 目录列表 */}
        <div className="overflow-y-auto max-h-[calc(60vh-3rem)] p-2">
          <ul className="space-y-0.5">
            {toc.map((item) => (
              <li
                key={item.id}
                className={`text-sm py-2 px-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-muted ${
                  activeId === item.id
                    ? 'bg-muted font-medium text-foreground'
                    : 'text-muted-foreground/70'
                }`}
                style={{ paddingLeft: `${12 + (item.level - 2) * 12}px` }}
                onClick={() => scrollToHeading(item.id)}
              >
                <div className="flex items-center gap-2">
                  {activeId === item.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                  )}
                  <span className="line-clamp-2">{item.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 遮罩层 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-transparent"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
