import { useState } from 'react';

//Estanteria de libros
const booksRow1 = [
  { id: 'sql',    title: 'SQL',       color: '#1f2d4a', spine: '#162038', bookmark: '#f07178' },
  { id: 'nestjs', title: 'NestJS',    color: '#3d1a2e', spine: '#2d1220', bookmark: '#f78c6c' },
  { id: 'git',    title: 'Git',       color: '#1a2e1a', spine: '#122012', bookmark: '#c3e88d' },
  { id: 'github', title: 'GitHub',    color: '#1a1a2e', spine: '#101028', bookmark: '#82aaff' },
  { id: 'node',   title: 'Node NPM',  color: '#0f2a1a', spine: '#082014', bookmark: '#c792ea' },
];

const booksRow2 = [
  { id: 'poo-js',   title: 'POO JS',    color: '#2a2514', spine: '#1f1a0a', bookmark: '#ffcb6b' },
  { id: 'react',    title: 'React',     color: '#0f1e3a', spine: '#091530', bookmark: '#89ddff' },
  { id: 'tailwind', title: 'Tailwind',  color: '#0a2030', spine: '#061828', bookmark: '#c3e88d' },
  { id: 'html',     title: 'HTML',      color: '#2a1a0e', spine: '#200e06', bookmark: '#f07178' },
  { id: 'css',      title: 'CSS',       color: '#1f0e2a', spine: '#170820', bookmark: '#c792ea' },
];

const BOOK_WIDTHS = [50, 43, 56, 47, 52, 44, 58, 48, 54, 42];
const BOOK_HEIGHTS = [198, 218, 190, 212, 202, 222, 188, 208, 196, 216];

type Book = { id: string; title: string; color: string; spine: string; bookmark: string };
type BookshelfProps = { onSelectBook: (bookId: string) => void };

function lighten(hex: string, amt = 30): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, ((n >> 16) & 255) + amt);
  const g = Math.min(255, ((n >> 8) & 255) + amt);
  const b = Math.min(255, (n & 255) + amt);
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

function BookItem({ book, index, onSelect }: { book: Book; index: number; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false);
  const w = BOOK_WIDTHS[index % BOOK_WIDTHS.length];
  const h = BOOK_HEIGHTS[index % BOOK_HEIGHTS.length];

  return (
    <div
      className="relative flex-shrink-0 cursor-pointer select-none"
      style={{
        width: w,
        transition: 'transform 0.3s cubic-bezier(.34,1.56,.64,1)',
        transform: hovered ? 'translateY(-20px) rotateY(-14deg)' : 'none',
        zIndex: hovered ? 20 : 1,
      }}
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip */}
      <div
        className="absolute left-1/2 pointer-events-none transition-opacity duration-200 whitespace-nowrap"
        style={{
          bottom: 'calc(100% + 10px)',
          transform: 'translateX(-50%)',
          opacity: hovered ? 1 : 0,
          background: '#0d0e18',
          color: '#a6accd',
          padding: '5px 12px',
          borderRadius: 4,
          fontSize: 11,
          fontFamily: "'JetBrains Mono', monospace",
          border: '1px solid #3a3f58',
          boxShadow: '0 4px 16px rgba(0,0,0,.6)',
          zIndex: 30,
        }}
      >
        {book.title}
        <span
          className="absolute left-1/2"
          style={{
            top: '100%',
            transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid #0d0e18',
          }}
        />
      </div>

      {/* Spine */}
      <div
        className="absolute top-0 bottom-0"
        style={{ left: -8, width: 8, background: book.spine, borderRadius: '2px 0 0 2px' }}
      />

      {/* Cover */}
      <div
        className="relative overflow-hidden"
        style={{
          width: w,
          height: h,
          borderRadius: '2px 4px 4px 2px',
          background: book.color,
          boxShadow: '-3px 0 8px rgba(0,0,0,.5), 3px 0 10px rgba(0,0,0,.35), inset -5px 0 10px rgba(0,0,0,.35), inset 1px 0 3px rgba(255,255,255,.1)',
        }}
      >
        {/* Sin overlay */}
        {/* Inner border deco */}
        <div
          className="absolute pointer-events-none"
          style={{
            inset: 7,
            border: '1px solid rgba(255,255,255,.12)',
            borderRadius: 1,
          }}
        />
        {/* Horizontal deco line */}
        <div
          className="absolute"
          style={{
            bottom: 22, left: '21%', right: '21%',
            height: 1,
            background: 'rgba(255,255,255,.18)',
          }}
        />
        {/* Title on spine — rotated text */}
        <div
          className="absolute inset-0 flex items-center justify-center"
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(7px, .75vw, 9px)',
              fontWeight: 700,
              color: 'rgba(255,255,255,.82)',
              letterSpacing: '.05em',
              textAlign: 'center',
              padding: '0 6px',
              lineHeight: 1.3,
              textShadow: '0 1px 4px rgba(0,0,0,.7)',
              position: 'absolute',
              bottom: 26,
              left: 0,
              right: 0,
            }}
          >
            {book.title}
          </span>
        </div>
      </div>

      {/* Bookmark ribbon */}
      <div
        className="absolute z-10"
        style={{
          top: -5,
          right: 9,
          width: 10,
          height: 24,
          background: book.bookmark,
          clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)',
        }}
      />
    </div>
  );
}

function ShelfRow({ books, rowIndex, onSelect }: { books: Book[]; rowIndex: number; onSelect: (id: string) => void }) {
  // sombra de libros (se ve bonis :3)
  const fillerColors = [
    { color: '#1a1c2e', spine: '#12141f' },
    { color: '#2a1a24', spine: '#1f1018' },
    { color: '#1a2a1c', spine: '#121f14' },
    { color: '#2a2418', spine: '#1f1a10' },
    { color: '#141e30', spine: '#0e1624' },
  ];

  const Filler = ({ fi }: { fi: number }) => {
    const fc = fillerColors[fi % fillerColors.length];
    const fw = BOOK_WIDTHS[(fi + 5) % BOOK_WIDTHS.length];
    const fh = BOOK_HEIGHTS[(fi + 3) % BOOK_HEIGHTS.length];
    return (
      <div className="relative flex-shrink-0" style={{ width: fw }}>
        <div className="absolute top-0 bottom-0" style={{ left: -8, width: 8, background: fc.spine, borderRadius: '2px 0 0 2px' }} />
        <div
          style={{
            width: fw, height: fh,
            borderRadius: '2px 4px 4px 2px',
            background: fc.color,
            boxShadow: '-2px 0 6px rgba(0,0,0,.4)',
            position: 'relative', overflow: 'hidden',
          }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'transparent' }} />
          <div className="absolute pointer-events-none" style={{ inset: 6, border: '1px solid rgba(255,255,255,.08)', borderRadius: 1 }} />
        </div>
      </div>
    );
  };

  const startFillers = rowIndex === 0 ? 2 : 3;
  const endFillers = rowIndex === 0 ? 2 : 1;

  return (
    <div className="relative w-full">
      {/* borde de estanteria */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{
          height: 16,
          background: '#2a2045',
          borderRadius: 1,
          boxShadow: '0 5px 16px rgba(0,0,0,.7), inset 0 1px 0 rgba(199,146,234,.12)',
        }}
      />
      {/* libros */}
      <div className="relative z-20 flex justify-center items-end gap-1 pb-4 pt-5 px-6">
        {Array.from({ length: startFillers }, (_, i) => <Filler key={`fs-${i}`} fi={i} />)}
        {books.map((book, bi) => (
          <BookItem key={book.id} book={book} index={bi + rowIndex * 5} onSelect={() => onSelect(book.id)} />
        ))}
        {Array.from({ length: endFillers }, (_, i) => <Filler key={`fe-${i}`} fi={i + startFillers} />)}
      </div>
    </div>
  );
}

export function Bookshelf({ onSelectBook }: BookshelfProps) {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-end overflow-hidden"
      style={{ background: '#0d0e18' }}
    >
      {/* Title */}
      <div className="absolute top-7 left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none">
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.4rem, 2.8vw, 2.2rem)',
            fontWeight: 900,
            color: '#d0d0ff',
            letterSpacing: '.06em',
            textShadow: '0 0 40px rgba(130,170,255,.25), 0 2px 6px rgba(0,0,0,.8)',
          }}
        >
          Nikko's Cheat Sheets
        </h1>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: '#676e95',
            letterSpacing: '.35em',
            textTransform: 'uppercase',
            marginTop: 7,
          }}
        >
         Libritos, clic para ver la info
        </p>
      </div>

      {/* estanteria */}
      <div className="w-full flex flex-col" style={{ maxWidth: 'min(1080px, 94vw)', gap: 0 }}>
        <ShelfRow books={booksRow1} rowIndex={0} onSelect={onSelectBook} />
        <ShelfRow books={booksRow2} rowIndex={1} onSelect={onSelectBook} />
      </div>
      
      <div
        className="w-full"
        style={{
          height: 32,
          background: '#090b14',
          boxShadow: '0 -6px 24px rgba(0,0,0,.9)',
        }}
      />
    </div>
  );
}
