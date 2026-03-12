'use client';

import { useState, useEffect } from 'react';

// 打字机效果组件
function TypewriterEffect({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const typeNextChar = () => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
        const randomDelay = 80 + Math.random() * 60;
        setTimeout(typeNextChar, randomDelay);
      }
    };
    
    const initialDelay = setTimeout(typeNextChar, 300);
    return () => clearTimeout(initialDelay);
  }, [text]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor(p => !p), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-mono">
      {displayText}
      {showCursor && <span className="inline-block w-[8px] h-[1.2em] bg-foreground/80 ml-1" />}
    </span>
  );
}

export default function AboutPage() {
  return (
    <main className="flex-1 relative z-10 flex items-center justify-center min-h-[60vh]">
      <div className="text-center px-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
          About.
        </h1>
        <p className="text-lg text-muted-foreground">
          <TypewriterEffect text="Page under construction..." />
        </p>
      </div>
    </main>
  );
}
