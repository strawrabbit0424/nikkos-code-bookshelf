import { ChapterHeader, Section, Note, Tip, Code, Row, Table, c, p, s } from '../../components/PageTemplate';

export const cssPages = [
  {
    title: 'Variables y Selectores',
    content: (
      <div>
        <ChapterHeader num="Capítulo I" title="CSS" sub="Variables · Selectores · Especificidad" />
        <Note>CSS (Cascading Style Sheets) controla la apariencia del HTML. La cascada determina qué regla gana cuando varias aplican al mismo elemento: importancia, especificidad, orden.</Note>
        <Section>Variables CSS (custom properties)</Section>
        <Note>Las variables CSS permiten definir valores una vez y reutilizarlos. Se heredan hacia los hijos y se pueden sobreescribir en elementos específicos.</Note>
        <Code spans={c(
          p(':root {\n  --primary:  '), s('#82aaff'), p(';\n  --bg:       '), s('#292d3e'), p(';\n  --radius:   0.5rem;\n  --spacing:  1rem;\n}\n\n'),
          p('.card {\n  background:    var(--bg);\n  border-radius: var(--radius);\n  padding:       var(--spacing);\n}\n\n'),
          p('.card--dark { --bg: '), s('#1c1f2b'), p('; }  /* sobreescribir en scope */'),
        )} />
        <Section>Selectores avanzados</Section>
        <Row label="a > b"           value="b hijo directo de a" />
        <Row label="a + b"           value="b hermano inmediato después de a" />
        <Row label="a ~ b"           value="todos los hermanos b después de a" />
        <Row label=':is(h1,h2,h3)'   value="selector múltiple moderno" />
        <Row label=':not(.disabled)' value="todos menos los .disabled" />
        <Row label="::before/after"  value="pseudo-elementos (contenido generado)" />
      </div>
    ),
  },
  {
    title: 'Box Model y Posición',
    content: (
      <div>
        <Note>El box model define cómo se calcula el tamaño de cada elemento: content + padding + border + margin. Con box-sizing: border-box el padding y borde se incluyen en el width declarado.</Note>
        <Section>Box Model</Section>
        <Code spans={c(
          p('* { box-sizing: border-box; }  /* recomendado siempre */\n\n'),
          p('.el {\n  width:   300px;   /* incluye padding y border con border-box */\n'),
          p('  padding: 1rem;    /* espacio interior */\n'),
          p('  border:  1px solid '), s('#ccc'), p(';\n'),
          p('  margin:  1rem;    /* espacio exterior */\n}\n\n'),
          p('.shadow { box-shadow: 0 4px 12px rgba(0,0,0,.15); }'),
        )} />
        <Section>Posicionamiento</Section>
        <Table headers={['Valor', 'Comportamiento']} rows={[
          ['static',   'flujo normal, no acepta top/left (default)'],
          ['relative', 'se desplaza desde su posición original'],
          ['absolute', 'sale del flujo, relativo al padre positioned'],
          ['fixed',    'relativo al viewport, no se mueve con scroll'],
          ['sticky',   'como relative hasta cierto punto de scroll'],
        ]} />
        <Tip>Un elemento con position: absolute busca el ancestro más cercano con position != static para usarlo como referencia. Si no encuentra ninguno, usa el viewport.</Tip>
      </div>
    ),
  },
  {
    title: 'Flexbox',
    content: (
      <div>
        <Note>Flexbox es el sistema de layout unidimensional de CSS. Perfecta para alinear elementos en una fila o columna. El contenedor flex controla el comportamiento de sus hijos directos.</Note>
        <Section>Propiedades del contenedor</Section>
        <Code spans={c(
          p('.container {\n  display:         flex;\n  flex-direction:  row;    /* row | column | row-reverse */\n'),
          p('  flex-wrap:       wrap;   /* wrap | nowrap */\n'),
          p('  justify-content: center; /* start | end | space-between | space-around */\n'),
          p('  align-items:     center; /* stretch | start | end | baseline */\n'),
          p('  gap:             1rem;   /* espacio entre hijos */\n}'),
        )} />
        <Section>Propiedades de los hijos</Section>
        <Code spans={c(
          p('.item {\n  flex-grow:   1;     /* cuánto crece respecto a otros */\n'),
          p('  flex-shrink: 0;     /* 0 = nunca encoge */\n'),
          p('  flex-basis:  200px; /* tamaño base antes de crecer/encoger */\n'),
          p('  align-self:  center; /* sobreescribe align-items del padre */\n}\n\n'),
          p('.item { flex: 1; }         /* grow:1 shrink:1 basis:0 */\n'),
          p('.item { flex: 0 0 200px; } /* tamaño fijo, no crece ni encoge */\n'),
          p('.spacer { margin-left: auto; } /* empuja los siguientes a la derecha */'),
        )} />
      </div>
    ),
  },
  {
    title: 'CSS Grid',
    content: (
      <div>
        <Note>Grid es el sistema de layout bidimensional de CSS. Permite controlar filas Y columnas al mismo tiempo. Ideal para layouts de página y componentes complejos.</Note>
        <Section>Definir grid</Section>
        <Code spans={c(
          p('.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);  /* 3 columnas iguales */\n'),
          p('  grid-template-rows: auto 1fr auto;    /* header, main, footer */\n'),
          p('  gap: 1rem;\n}\n\n'),
          p('/* Nombrar áreas */\n'),
          p('.layout {\n  grid-template-areas:\n    '), s('"header header"'), p('\n    '), s('"sidebar main"'), p('\n    '), s('"footer footer"'), p(';\n}\n'),
          p('.header  { grid-area: header; }\n'),
          p('.sidebar { grid-area: sidebar; }\n'),
          p('.main    { grid-area: main; }'),
        )} />
        <Section>Posicionar ítems</Section>
        <Code spans={c(
          p('.item {\n  grid-column: 1 / 3;    /* desde col 1 hasta col 3 */\n'),
          p('  grid-column: span 2;   /* ocupa 2 columnas */\n'),
          p('  grid-column: 1 / -1;   /* de la primera a la última */\n'),
          p('  grid-row:    2 / 4;    /* ocupa filas 2 y 3 */\n}'),
        )} />
      </div>
    ),
  },
  {
    title: 'Animaciones y Transiciones',
    content: (
      <div>
        <Note>Las transiciones aplican un cambio suave cuando cambia una propiedad CSS. Las animaciones permiten secuencias con keyframes que se ejecutan automáticamente.</Note>
        <Section>Transiciones</Section>
        <Code spans={c(
          p('.btn {\n  background: '), s('#3b82f6'), p(';\n  transition: background .2s ease, transform .15s ease;\n}\n'),
          p('.btn:hover { background: '), s('#2563eb'), p('; transform: scale(1.05); }\n'),
          p('.btn:active { transform: scale(.97); }\n\n'),
          p('/* Transición en todas las propiedades */\n'),
          p('.el { transition: all .3s ease-in-out; }'),
        )} />
        <Section>Animaciones con @keyframes</Section>
        <Code spans={c(
          p('@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(-8px); }\n  to   { opacity: 1; transform: translateY(0); }\n}\n\n'),
          p('@keyframes pulse {\n  0%, 100% { opacity: 1; }\n  50%       { opacity: .5; }\n}\n\n'),
          p('.appear  { animation: fadeIn .3s ease forwards; }\n'),
          p('.loading { animation: pulse 2s ease-in-out infinite; }'),
        )} />
        <Tip>Animar solo transform y opacity cuando sea posible. Son las únicas propiedades que el navegador puede animar sin causar reflow o repaint, garantizando 60fps.</Tip>
      </div>
    ),
  },
  {
    title: 'Media Queries y Responsive',
    content: (
      <div>
        <ChapterHeader num="Capítulo II" title="Responsive · Media Queries · clamp()" />
        <Note>El diseño responsive adapta la interfaz a diferentes tamaños de pantalla. El enfoque mobile-first escribe estilos para móvil primero y usa min-width para pantallas más grandes.</Note>
        <Section>Media queries</Section>
        <Code spans={c(
          p('/* mobile-first: estilos base para móvil */\n'),
          p('.grid { grid-template-columns: 1fr; }\n\n'),
          p('@media (min-width: 768px) {\n  .grid { grid-template-columns: repeat(2, 1fr); }\n}\n\n'),
          p('@media (min-width: 1024px) {\n  .grid { grid-template-columns: repeat(3, 1fr); }\n}\n\n'),
          p('@media (prefers-color-scheme: dark) {\n  :root { --bg: '), s('#0f172a'), p('; --text: '), s('#f1f5f9'), p('; }\n}\n\n'),
          p('@media (prefers-reduced-motion: reduce) {\n  * { animation: none !important; }\n}'),
        )} />
        <Section>Tipografía fluida con clamp()</Section>
        <Note>clamp(min, preferido, max) crea valores que escalan con el viewport entre un mínimo y máximo, eliminando la necesidad de media queries para tipografía.</Note>
        <Code spans={c(
          p('font-size: clamp(1rem,  2.5vw, 2rem);\n'),
          p('padding:   clamp(.5rem, 3vw,   2rem);\n'),
          p('width:     clamp(200px, 50%,   800px);'),
        )} />
      </div>
    ),
  },
];
