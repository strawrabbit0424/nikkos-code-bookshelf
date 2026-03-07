import { useState, useEffect, useCallback } from 'react';
import React from 'react';
import { Bookshelf } from './components/Bookshelf';
import { PageTemplate } from './components/PageTemplate';
import { nodeNpmPages } from './data/cheatsheets/node-npm';
import { sqlPages }     from './data/cheatsheets/sql';
import { nestjsPages }  from './data/cheatsheets/nestjs';
import { gitPages }     from './data/cheatsheets/git';
import { githubPages }  from './data/cheatsheets/github';
import { pooJsPages }   from './data/cheatsheets/poo-js';
import { reactPages }   from './data/cheatsheets/react';
import { tailwindPages }from './data/cheatsheets/tailwind';
import { htmlPages }    from './data/cheatsheets/html';
import { cssPages }     from './data/cheatsheets/css';

type Page = { title: string; content: React.ReactNode };

const pagesByBook: Record<string, Page[]> = {
  sql:      sqlPages,
  nestjs:   nestjsPages,
  git:      gitPages,
  github:   githubPages,
  node:     nodeNpmPages,
  'poo-js': pooJsPages,
  react:    reactPages,
  tailwind: tailwindPages,
  html:     htmlPages,
  css:      cssPages,
};

const bookTitles: Record<string, string> = {
  sql:      'SQL',
  nestjs:   'NestJS',
  git:      'Git',
  github:   'GitHub',
  node:     'Node & NPM',
  'poo-js': 'POO JavaScript',
  react:    'React',
  tailwind: 'Tailwind CSS',
  html:     'HTML',
  css:      'CSS',
};

export default function App() {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const pages      = selectedBook ? (pagesByBook[selectedBook] ?? []) : [];
  const totalSpreads = Math.ceil(pages.length / 2) || 1;
  const noContent  = pages.length === 0;
  const hasPrev    = currentPage > 0;
  const hasNext    = currentPage < totalSpreads - 1;

  const handleSelectBook = (bookId: string) => { setSelectedBook(bookId); setCurrentPage(0); };
  const handleClose = useCallback(() => setSelectedBook(null), []);
  const goNext = useCallback(() => { if (currentPage < totalSpreads - 1) setCurrentPage(p => p + 1); }, [currentPage, totalSpreads]);
  const goPrev = useCallback(() => { if (currentPage > 0) setCurrentPage(p => p - 1); }, [currentPage]);

  // ── Keyboard navigation ──
  useEffect(() => {
    if (!selectedBook) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goPrev();
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedBook, goNext, goPrev, handleClose]);

  const leftPageIdx  = currentPage * 2;
  const rightPageIdx = currentPage * 2 + 1;

  return (
    <>
      {selectedBook ? (
        <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'rgba(9,11,20,.9)', backdropFilter: 'blur(6px)' }}>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=JetBrains+Mono:wght@400;600&display=swap');
            @keyframes bookOpen {
              from { transform: scale(.72) rotateY(-25deg); opacity: 0; }
              to   { transform: scale(1)   rotateY(0);      opacity: 1; }
            }
          `}</style>

          <div className="relative flex flex-col"
            style={{ width: 'min(920px, 96vw)', height: 'min(640px, 88vh)', animation: 'bookOpen .5s cubic-bezier(.34,1.15,.64,1)' }}>

            {/* Title */}
            <div style={{ position: 'absolute', top: -44, left: 0 }}>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 14, fontWeight: 700, color: 'rgba(208,208,255,.75)', letterSpacing: '.05em', textShadow: '0 2px 8px rgba(0,0,0,.8)' }}>
                {bookTitles[selectedBook] ?? selectedBook.toUpperCase()}
              </span>
            </div>

            {/* Close */}
            <button onClick={handleClose}
              style={{ position: 'absolute', top: -40, right: 0, height: 28, padding: '0 14px', borderRadius: 4, background: 'rgba(199,146,234,.08)', border: '1px solid rgba(199,146,234,.22)', color: '#676e95', fontSize: 10, fontFamily: "'JetBrains Mono',monospace", letterSpacing: '.08em', textTransform: 'uppercase', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.color='#f07178'; e.currentTarget.style.borderColor='rgba(240,113,120,.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.color='#676e95'; e.currentTarget.style.borderColor='rgba(199,146,234,.22)'; }}>
              cerrar
            </button>

            {/* Pages */}
            <div className="flex relative" style={{ flex: 1, marginBottom: 52 }}>

              {/* Left */}
              <div className="flex-1 relative" onClick={goPrev} style={{ cursor: hasPrev ? 'pointer' : 'default' }}>
                {noContent ? <ComingSoon /> : pages[leftPageIdx]
                  ? <PageTemplate>{pages[leftPageIdx].content}</PageTemplate>
                  : <BlankPage side="left" />}
                {hasPrev && <Arrow side="left" />}
              </div>

              {/* Spine */}
              <div style={{ width: 14, flexShrink: 0, background: 'linear-gradient(90deg,#0d0e18 0%,#1c1f2b 35%,#292d3e 50%,#1c1f2b 65%,#0d0e18 100%)', boxShadow: '0 0 18px rgba(0,0,0,.9)', zIndex: 10 }} />

              {/* Right */}
              <div className="flex-1 relative" onClick={goNext} style={{ cursor: hasNext ? 'pointer' : 'default' }}>
                {noContent ? <BlankPage side="right" /> : pages[rightPageIdx]
                  ? <RightPage>{pages[rightPageIdx].content}</RightPage>
                  : <BlankPage side="right" />}
                {hasNext && <Arrow side="right" />}
              </div>
            </div>

            {/* Bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6"
              style={{ height: 52, background: 'linear-gradient(180deg,#1c1f2b,#13151f)', borderTop: '1px solid #3a3f58', borderRadius: '0 0 5px 5px', zIndex: 20 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {Array.from({ length: totalSpreads }, (_, i) => (
                  <div key={i} onClick={() => setCurrentPage(i)}
                    style={{ width: 6, height: 6, borderRadius: '50%', background: i === currentPage ? '#82aaff' : '#3a3f58', transform: i === currentPage ? 'scale(1.3)' : 'none', transition: 'all .25s', cursor: 'pointer' }} />
                ))}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#676e95' }}>
                {noContent ? '— / —' : `${currentPage + 1} / ${totalSpreads}`}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#676e95', opacity: .6 }}>
                <Kbd>← →</Kbd><span>navegar</span>
                <Kbd style={{ marginLeft: 6 }}>Esc</Kbd><span>cerrar</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Bookshelf onSelectBook={handleSelectBook} />
      )}
    </>
  );
}

function RightPage({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ height: '100%', background: '#ece9f5', borderRadius: '0 5px 0 0', boxShadow: '3px 0 10px rgba(0,0,0,.5),-5px 0 14px rgba(0,0,0,.18)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 28, background: 'linear-gradient(90deg,rgba(0,0,0,.12),transparent)', pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ padding: '32px 30px 20px', height: '100%', overflow: 'hidden' }}>{children}</div>
    </div>
  );
}

function Arrow({ side }: { side: 'left' | 'right' }) {
  return (
    <div style={{ position: 'absolute', top: '50%', [side === 'left' ? 'right' : 'left']: 10, transform: 'translateY(-50%)', pointerEvents: 'none', fontFamily: "'JetBrains Mono',monospace", fontSize: 20, fontWeight: 600, color: '#82aaff', opacity: .2, zIndex: 20 }}>
      {side === 'left' ? '<' : '>'}
    </div>
  );
}

function Kbd({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <span style={{ background: '#3a3f58', color: '#a6accd', padding: '2px 7px', borderRadius: 3, fontSize: 9, borderBottom: '2px solid rgba(0,0,0,.4)', ...style }}>{children}</span>;
}

function BlankPage({ side }: { side: 'left' | 'right' }) {
  return <div style={{ height: '100%', background: side === 'left' ? '#f0eef8' : '#ece9f5', borderRadius: side === 'left' ? '5px 0 0 0' : '0 5px 0 0' }} />;
}

function ComingSoon() {
  return (
    <div style={{ height: '100%', background: '#f0eef8', borderRadius: '5px 0 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: '#2d3250' }}>Contenido próximamente</div>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#676e95', letterSpacing: '.1em' }}>este cheatsheet aún no tiene páginas</div>
    </div>
  );
}
