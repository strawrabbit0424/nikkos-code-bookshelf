import { useState } from 'react';
import { Bookshelf } from './components/Bookshelf';
import { PageTemplate } from './components/PageTemplate';
import { nodeNpmPages } from './data/cheatsheets/node-npm';

function App() {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const pagesByBook = {
    node: nodeNpmPages,
    // Agrega aquí los demás temas cuando los tengas
  };

  const pages = pagesByBook[selectedBook || ''] || [];

  const handleSelectBook = (bookId: string) => {
    setSelectedBook(bookId);
    setCurrentPage(0);
  };

  const handleBack = () => {
    setSelectedBook(null);
  };

  const handlePageChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const half = rect.width / 2;

    if (x < half) {
      if (currentPage > 0) setCurrentPage(currentPage - 1);
    } else {
      if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      {selectedBook ? (
        <div
          className="fixed inset-0 bg-palenight-bg flex flex-col items-center overflow-hidden cursor-pointer"
          onClick={handlePageChange}
        >
          <div className="w-full max-w-6xl lg:max-w-7xl h-full flex flex-col px-4 sm:px-8 lg:px-12 py-6 lg:py-8">
            {/* Título del tema arriba, discreto */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-palenight-text mb-6 md:mb-8 lg:mb-10 tracking-wide drop-shadow-xl text-center">
              {selectedBook.toUpperCase().replace(/-/g, ' ')}
            </h2>

            {/* Libro abierto: dos páginas */}
            <div className="flex-1 relative flex flex-row items-stretch gap-4 lg:gap-8">
              {/* Página izquierda */}
              <div className="flex-1 overflow-hidden">
                {currentPage > 0 ? (
                  <PageTemplate>
                    {pages[currentPage - 1].content}
                  </PageTemplate>
                ) : (
                  <div className="h-full flex items-center justify-center text-palenight-comment opacity-70 text-lg">
                    Página anterior no disponible
                  </div>
                )}
              </div>

              {/* Línea central marcada */}
              <div className="w-px bg-palenight-border/40 shadow-inner absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2" />

              {/* Página derecha */}
              <div className="flex-1 overflow-hidden">
                {pages[currentPage] ? (
                  <PageTemplate>
                    {pages[currentPage].content}
                  </PageTemplate>
                ) : (
                  <div className="h-full flex items-center justify-center text-palenight-comment opacity-70 text-lg">
                    Fin del cheat sheet
                  </div>
                )}
              </div>
            </div>

            {/* Botón volver discreto abajo */}
            <button
              onClick={handleBack}
              className="mt-6 px-8 py-3 bg-palenight-surface text-palenight-text font-medium rounded-md hover:bg-palenight-surface/80 transition shadow-md"
            >
              Volver a la estantería
            </button>
          </div>
        </div>
      ) : (
        <Bookshelf onSelectBook={handleSelectBook} />
      )}
    </>
  );
}

export default App;