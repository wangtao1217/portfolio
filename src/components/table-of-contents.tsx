'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // 提取文章中的所有标题
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

    // 监听滚动，高亮当前章节
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
    }
  };

  return (
    <nav className="hidden xl:block fixed left-8 top-32 w-64 max-h-[calc(100vh-10rem)] overflow-y-auto">
      <div className="text-xs font-medium text-muted-foreground/50 mb-3 uppercase tracking-wider">
        目录
      </div>
      <ul className="space-y-1">
        {toc.map((item) => (
          <li
            key={item.id}
            className={`text-sm transition-colors duration-200 cursor-pointer hover:text-foreground ${
              item.level === 2 ? 'font-medium' : 'text-muted-foreground/70'
            } ${
              activeId === item.id
                ? 'text-foreground'
                : 'text-muted-foreground/50'
            }`}
            style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
            onClick={() => scrollToHeading(item.id)}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </nav>
  );
}
