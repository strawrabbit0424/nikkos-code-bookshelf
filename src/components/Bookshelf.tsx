import { useState } from 'react';

const booksRow1 = [
  { id: 'sql', title: 'SQL', color: 'bg-blue-950' },
  { id: 'nestjs', title: 'NestJS', color: 'bg-red-950' },
  { id: 'git', title: 'Git', color: 'bg-gray-900' },
  { id: 'github', title: 'GitHub', color: 'bg-gray-800' },
  { id: 'node', title: 'Node NPM', color: 'bg-green-950' },
];

const booksRow2 = [
  { id: 'poo-js', title: 'POO JavaScript', color: 'bg-yellow-950' },
  { id: 'react', title: 'React', color: 'bg-cyan-950' },
  { id: 'tailwind', title: 'Tailwind', color: 'bg-teal-950' },
  { id: 'html', title: 'HTML', color: 'bg-orange-950' },
  { id: 'css', title: 'CSS', color: 'bg-purple-950' },
];

type BookshelfProps = {
  onSelectBook: (bookId: string) => void;
};

export function Bookshelf({ onSelectBook }: BookshelfProps) {
  const [hoveredBook, setHoveredBook] = useState<string | null>(null);

  const Book = ({ book }: { book: typeof booksRow1[0] }) => (
    <div
      onClick={() => onSelectBook(book.id)}
      onMouseEnter={() => setHoveredBook(book.id)}
      onMouseLeave={() => setHoveredBook(null)}
      className={`
        group relative cursor-pointer w-20 sm:w-22 md:w-24 lg:w-26 aspect-[3/8] mx-1.5 sm:mx-2 lg:mx-3
        ${book.color} rounded-md shadow-xl overflow-hidden
        transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-2xl hover:z-10 hover:-translate-y-1
        perspective-[800px]
      `}
    >
      <div className="absolute inset-0 flex items-center justify-center p-2">
        <h3 className="
          text-palenight-text font-medium text-xs sm:text-sm lg:text-base 
          text-center leading-tight drop-shadow-md
          group-hover:text-palenight-cyan transition-colors
          rotate-90 origin-center whitespace-nowrap
        ">
          {book.title}
        </h3>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/30 blur-sm opacity-60 group-hover:opacity-80 transition-opacity" />
    </div>
  );

  return (
    <div className="fixed inset-0 flex flex-col items-center bg-palenight-bg overflow-hidden px-4 sm:px-6 lg:px-8 py-2 max-h-screen">
      {/* Título compacto y con margen mínimo para no salirse */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-palenight-text mb-4 md:mb-5 lg:mb-6 tracking-wide drop-shadow-xl z-20">
        Nikko's Code Bookshelf
      </h1>

      {/* Contenedor estantería con ajuste de altura máxima y centrado */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-5xl lg:max-w-6xl gap-6 md:gap-8 lg:gap-10 overflow-hidden">
        {/* Estante superior */}
        <div className="relative w-full">
          <div className="absolute inset-x-0 bottom-0 h-5 sm:h-6 lg:h-7 bg-gradient-to-b from-amber-900 via-amber-950 to-amber-950 rounded-t-md shadow-inner z-0" />
          <div className="relative flex justify-center gap-3 sm:gap-5 md:gap-7 lg:gap-9 flex-wrap z-10 pb-2 sm:pb-3 lg:pb-4 -translate-y-1">
            {booksRow1.map((book) => <Book key={book.id} book={book} />)}
          </div>
        </div>

        {/* Estante inferior */}
        <div className="relative w-full">
          <div className="absolute inset-x-0 bottom-0 h-5 sm:h-6 lg:h-7 bg-gradient-to-b from-amber-900 via-amber-950 to-amber-950 rounded-t-md shadow-inner z-0" />
          <div className="relative flex justify-center gap-3 sm:gap-5 md:gap-7 lg:gap-9 flex-wrap z-10 pb-2 sm:pb-3 lg:pb-4 -translate-y-1">
            {booksRow2.map((book) => <Book key={book.id} book={book} />)}
          </div>
        </div>
      </div>
    </div>
  );
}