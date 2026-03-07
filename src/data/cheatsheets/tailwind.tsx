import { ChapterHeader, Section, Note, Tip, Code, Row, Table, c, p } from '../../components/PageTemplate';

export const tailwindPages = [
  {
    title: 'Filosofía y Layout',
    content: (
      <div>
        <ChapterHeader num="Capítulo I" title="Tailwind CSS" sub="Utility-First · Responsive · Dark mode" />
        <Note>Tailwind es un framework utility-first: en vez de escribir CSS personalizado, se combinan clases pequeñas directamente en el HTML. Genera solo el CSS de las clases que realmente se usan.</Note>
        <Section>Flexbox</Section>
        <Code spans={c(
          p('flex items-center justify-between gap-4\n'),
          p('flex flex-col gap-2  |  inline-flex items-start\n'),
          p('flex-wrap  |  flex-nowrap\n'),
          p('flex-1      '), p('/* crece para ocupar espacio */\n'),
          p('flex-none   '), p('/* no crece ni encoge */\n'),
          p('flex-shrink-0  '), p('/* nunca encoge */'),
        )} />
        <Section>Grid</Section>
        <Code spans={c(
          p('grid grid-cols-3 gap-6\n'),
          p('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3\n'),
          p('col-span-2  '), p('/* ocupa 2 columnas */\n'),
          p('col-span-full  '), p('/* ocupa toda la fila */\n'),
          p('grid-rows-3  |  row-span-2'),
        )} />
        <Section>Posición</Section>
        <Row label="relative"           value="posiciona hijos con absolute" />
        <Row label="absolute inset-0"   value="cubre todo el padre relativo" />
        <Row label="fixed top-0 left-0" value="fijo al viewport" />
        <Row label="sticky top-0"       value="se pega al hacer scroll" />
        <Row label="z-10 / z-50"        value="control de apilamiento" />
      </div>
    ),
  },
  {
    title: 'Espaciado y tamaños',
    content: (
      <div>
        <Note>Tailwind usa una escala de espaciado basada en 4px. El valor 1 equivale a 4px, 4 equivale a 16px, 8 a 32px, etc. Esto crea consistencia visual en todo el diseño.</Note>
        <Section>Escala de referencia (1 unidad = 4px)</Section>
        <Table headers={['Clase', 'Valor', 'Clase', 'Valor']} rows={[
          ['p-1 / m-1', '4px',  'p-4 / m-4',  '16px'],
          ['p-2 / m-2', '8px',  'p-6 / m-6',  '24px'],
          ['p-3 / m-3', '12px', 'p-8 / m-8',  '32px'],
          ['px-4',       'horizontal', 'py-2', 'vertical'],
          ['mt-4',       'margin-top', 'mb-4', 'margin-bottom'],
        ]} />
        <Section>Ancho y alto</Section>
        <Code spans={c(
          p('w-full      '), p('/* 100% */\n'),
          p('w-1/2       '), p('/* 50% */\n'),
          p('w-64        '), p('/* 256px */\n'),
          p('w-screen    '), p('/* 100vw */\n'),
          p('max-w-lg    '), p('/* 512px máximo */\n'),
          p('max-w-7xl   '), p('/* 1280px máximo */\n'),
          p('h-screen    '), p('/* 100vh */\n'),
          p('h-full      '), p('/* 100% del padre */\n'),
          p('min-h-0     '), p('/* necesario en flexbox para que overflow funcione */'),
        )} />
      </div>
    ),
  },
  {
    title: 'Tipografía',
    content: (
      <div>
        <Note>Las clases de tipografía controlan tamaño, peso, alineación, interlineado y decoración del texto. Combinadas con responsive y dark mode cubren todos los casos.</Note>
        <Section>Tamaño y peso</Section>
        <Code spans={c(
          p('text-xs    '), p('/* 12px */\n'),
          p('text-sm    '), p('/* 14px */\n'),
          p('text-base  '), p('/* 16px (default) */\n'),
          p('text-lg    '), p('/* 18px */\n'),
          p('text-2xl   '), p('/* 24px */\n'),
          p('text-5xl   '), p('/* 48px */\n\n'),
          p('font-thin  font-normal  font-medium\n'),
          p('font-semibold  font-bold  font-black'),
        )} />
        <Section>Alineación y decoración</Section>
        <Code spans={c(
          p('text-left  text-center  text-right  text-justify\n'),
          p('italic  not-italic\n'),
          p('uppercase  capitalize  lowercase  normal-case\n'),
          p('tracking-tight  tracking-normal  tracking-widest\n'),
          p('leading-none  leading-tight  leading-relaxed  leading-loose\n'),
          p('underline  line-through  no-underline\n'),
          p('truncate  '), p('/* text-overflow: ellipsis */\n'),
          p('line-clamp-2  '), p('/* máximo 2 líneas con ... */'),
        )} />
        <Tip>line-clamp-N es una clase que combina overflow-hidden, display: -webkit-box y WebkitLineClamp. Muy útil para tarjetas con texto de longitud variable.</Tip>
      </div>
    ),
  },
  {
    title: 'Colores y Bordes',
    content: (
      <div>
        <Note>Tailwind incluye una paleta de colores con tonos del 50 al 950. Los números más altos son más oscuros. Se usan en texto, fondo, borde, ring y más.</Note>
        <Section>Texto y fondo</Section>
        <Code spans={c(
          p('text-gray-500  text-blue-600  text-red-500\n'),
          p('text-white     text-black     text-transparent\n\n'),
          p('bg-white       bg-slate-900   bg-blue-500\n'),
          p('bg-transparent bg-current\n'),
          p('bg-opacity-50  '), p('/* o bg-blue-500/50 */'),
        )} />
        <Section>Bordes y sombras</Section>
        <Code spans={c(
          p('border             '), p('/* 1px solid */\n'),
          p('border-2           '), p('/* 2px solid */\n'),
          p('border-gray-300    '), p('/* color del borde */\n'),
          p('rounded            '), p('/* 4px */\n'),
          p('rounded-lg         '), p('/* 8px */\n'),
          p('rounded-full       '), p('/* círculo */\n\n'),
          p('shadow             '), p('/* sombra pequeña */\n'),
          p('shadow-lg          '), p('/* sombra grande */\n'),
          p('shadow-none        '), p('/* sin sombra */\n'),
          p('ring-2 ring-blue-500 '), p('/* outline con anillo */'),
        )} />
      </div>
    ),
  },
  {
    title: 'Interactividad y Animaciones',
    content: (
      <div>
        <Note>Tailwind aplica estilos condicionales con prefijos de estado: hover:, focus:, active:, disabled:. También incluye utilidades para transiciones y animaciones comunes.</Note>
        <Section>Pseudo-clases</Section>
        <Code spans={c(
          p('hover:bg-blue-700  hover:scale-105  hover:opacity-80\n'),
          p('focus:outline-none  focus:ring-2  focus:ring-blue-500\n'),
          p('active:scale-95    active:bg-blue-800\n'),
          p('disabled:opacity-50  disabled:cursor-not-allowed\n'),
          p('group              '), p('/* marcar padre */\n'),
          p('group-hover:text-blue-500  '), p('/* activa al hover del padre */'),
        )} />
        <Section>Botón accesible completo</Section>
        <Code spans={c(
          p('px-4 py-2 rounded-lg font-medium\n'),
          p('bg-blue-600 text-white\n'),
          p('hover:bg-blue-700\n'),
          p('focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2\n'),
          p('active:scale-95\n'),
          p('transition-all duration-200\n'),
          p('disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'),
        )} />
        <Section>Animaciones</Section>
        <Row label="animate-spin"   value="rotación continua (loading spinner)" />
        <Row label="animate-pulse"  value="pulso de opacidad (skeleton)" />
        <Row label="animate-bounce" value="rebote vertical" />
        <Row label="transition-all" value="transición en todas las propiedades" />
        <Row label="duration-200"   value="duración de 200ms" />
        <Row label="ease-in-out"    value="curva suave de entrada y salida" />
      </div>
    ),
  },
  {
    title: 'Responsive y Dark mode',
    content: (
      <div>
        <ChapterHeader num="Capítulo II" title="Responsive · Dark · Configuración" />
        <Note>Tailwind es mobile-first: las clases sin prefijo aplican a todos los tamaños. Los prefijos sm:, md:, lg:, xl: aplican desde ese breakpoint en adelante.</Note>
        <Section>Breakpoints</Section>
        <Code spans={c(
          p('/* mobile-first: sin prefijo = todos los tamaños */\n'),
          p('text-sm  md:text-base  lg:text-lg\n'),
          p('grid-cols-1  md:grid-cols-2  lg:grid-cols-4\n'),
          p('hidden  md:block  '), p('/* oculto en mobile, visible en md+ */\n'),
          p('block   md:hidden  '), p('/* visible en mobile, oculto en md+ */'),
        )} />
        <Section>Dark mode</Section>
        <Code spans={c(
          p('dark:bg-gray-900  dark:text-white\n'),
          p('dark:border-gray-700  dark:hover:bg-gray-800\n\n'),
          p('// tailwind.config.ts\n'),
          p('darkMode: "class"   // activar con clase .dark en <html>\n'),
          p('darkMode: "media"   // usar preferencia del sistema'),
        )} />
        <Section>tailwind.config.ts — personalización</Section>
        <Code spans={c(
          p('theme: {\n  extend: {\n    colors: {\n      '),
          p("brand: '#c792ea',\n      palenight: '#292d3e',\n    },\n"),
          p('    fontFamily: {\n      mono: ['),
          p("'JetBrains Mono', 'monospace'],\n    },\n  },\n},"),
        )} />
        <Tip>Usar extend en vez de reemplazar el objeto theme. Esto agrega los colores/fuentes personalizados sin perder los valores por defecto de Tailwind.</Tip>
      </div>
    ),
  },
];
