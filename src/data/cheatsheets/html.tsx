import { ChapterHeader, Section, Note, Tip, Code, Row, Table, c, p, s, tg, at, vl } from '../../components/PageTemplate';

export const htmlPages = [
  {
    title: 'Estructura base',
    content: (
      <div>
        <ChapterHeader num="Capítulo I" title="HTML" sub="Estructura · Semántica · Meta · Accesibilidad" />
        <Note>HTML define la estructura y el significado del contenido web. No controla la apariencia (eso es CSS). Cada etiqueta describe qué es el contenido, no cómo se ve.</Note>
        <Section>Documento HTML base</Section>
        <Code spans={c(
          p('<!DOCTYPE html>\n'),
          p('<'), tg('html'), p(' '), at('lang'), p('='), vl('"es"'), p('>\n<'), tg('head'), p('>\n'),
          p('  <'), tg('meta'), p(' '), at('charset'), p('='), vl('"UTF-8"'), p('>\n'),
          p('  <'), tg('meta'), p(' '), at('name'), p('='), vl('"viewport"'), p(' '), at('content'), p('='), vl('"width=device-width,initial-scale=1"'), p('>\n'),
          p('  <'), tg('title'), p('>Mi App</'), tg('title'), p('>\n'),
          p('  <'), tg('link'), p(' '), at('rel'), p('='), vl('"stylesheet"'), p(' '), at('href'), p('='), vl('"style.css"'), p('>\n'),
          p('</'), tg('head'), p('>\n<'), tg('body'), p('>\n'),
          p('  <'), tg('header'), p('></'), tg('header'), p('>\n'),
          p('  <'), tg('main'), p('></'), tg('main'), p('>\n'),
          p('  <'), tg('footer'), p('></'), tg('footer'), p('>\n'),
          p('  <'), tg('script'), p(' '), at('src'), p('='), vl('"app.js"'), p(' '), at('defer'), p('></'), tg('script'), p('>\n'),
          p('</'), tg('body'), p('></'), tg('html'), p('>'),
        )} />
        <Note>El atributo defer en script hace que el JS se descargue en paralelo pero se ejecute después de que el HTML esté completamente cargado. Mejor que ponerlo al final del body.</Note>
      </div>
    ),
  },
  {
    title: 'Etiquetas semánticas',
    content: (
      <div>
        <Note>Las etiquetas semánticas describen el propósito del contenido. Ayudan a los lectores de pantalla, mejoran el SEO y hacen el código más legible que usar div para todo.</Note>
        <Section>Semántica de página</Section>
        <Table headers={['Etiqueta', 'Propósito']} rows={[
          ['<header>',  'cabecera de página o sección, logo, nav principal'],
          ['<nav>',     'grupo de enlaces de navegación principal'],
          ['<main>',    'contenido principal único por página'],
          ['<section>', 'sección temática con su propio encabezado'],
          ['<article>', 'contenido independiente y reutilizable (post, card)'],
          ['<aside>',   'contenido relacionado pero secundario (sidebar)'],
          ['<footer>',  'pie de página con info de contacto, copyright'],
          ['<figure>',  'imagen o diagrama con su caption'],
          ['<time>',    'fecha u hora legible por máquinas'],
        ]} />
        <Tip>Un buen uso de etiquetas semánticas puede eliminar la necesidad de muchos class y id. Un nav no necesita class="navigation"; ya lo dice la etiqueta.</Tip>
      </div>
    ),
  },
  {
    title: 'Formularios',
    content: (
      <div>
        <Note>Los formularios recopilan datos del usuario. El atributo for del label debe coincidir con el id del input para asociarlos — esto mejora la accesibilidad y el área de clic.</Note>
        <Section>Formulario completo</Section>
        <Code spans={c(
          p('<'), tg('form'), p(' '), at('action'), p('='), vl('"/submit"'), p(' '), at('method'), p('='), vl('"POST"'), p(' '), at('novalidate'), p('>\n'),
          p('  <'), tg('label'), p(' '), at('for'), p('='), vl('"email"'), p('>Email</'), tg('label'), p('>\n'),
          p('  <'), tg('input'), p(' '), at('type'), p('='), vl('"email"'), p(' '), at('id'), p('='), vl('"email"'),
          p(' '), at('name'), p('='), vl('"email"'), p('\n         '), at('required'), p(' '), at('placeholder'), p('='), vl('"tu@email.com"'), p('>\n\n'),
          p('  <'), tg('select'), p(' '), at('name'), p('='), vl('"rol"'), p(' '), at('id'), p('='), vl('"rol"'), p('>\n'),
          p('    <'), tg('option'), p(' '), at('value'), p('='), vl('""'), p(' '), at('disabled'), p(' '), at('selected'), p('>Elige rol</'), tg('option'), p('>\n'),
          p('    <'), tg('option'), p(' '), at('value'), p('='), vl('"admin"'), p('>Admin</'), tg('option'), p('>\n  </'), tg('select'), p('>\n\n'),
          p('  <'), tg('button'), p(' '), at('type'), p('='), vl('"submit"'), p('>Enviar</'), tg('button'), p('>\n</'), tg('form'), p('>'),
        )} />
        <Section>Tipos de input clave</Section>
        <Row label="text / email / password" value="texto / email / clave oculta" />
        <Row label="number / range"          value="número con límites / deslizable" />
        <Row label="checkbox / radio"        value="casilla múltiple / opción única" />
        <Row label="file"                    value="selector de archivos" />
        <Row label="date / datetime-local"   value="selector de fecha / fecha+hora" />
      </div>
    ),
  },
  {
    title: 'Atributos de formulario',
    content: (
      <div>
        <Note>Los atributos de validación HTML evitan envíos incorrectos sin necesidad de JavaScript. Son una primera capa de validación del lado del cliente.</Note>
        <Section>Validación nativa</Section>
        <Table headers={['Atributo', 'Comportamiento']} rows={[
          ['required',           'campo obligatorio'],
          ['min / max',          'rango en number, date, range'],
          ['minlength / maxlength','longitud mínima / máxima de texto'],
          ['pattern="regex"',    'valida con expresión regular'],
          ['type="email"',       'verifica formato de email'],
          ['novalidate',         'desactiva validación en el form (para manejarla con JS)'],
        ]} />
        <Section>Otros atributos de input</Section>
        <Code spans={c(
          p('<'), tg('input'), p('\n'),
          p('  '), at('autocomplete'), p('='), vl('"email"'), p('\n'),
          p('  '), at('autofocus'), p('\n'),
          p('  '), at('readonly'), p('\n'),
          p('  '), at('disabled'), p('\n'),
          p('  '), at('placeholder'), p('='), vl('"Ingresa tu nombre"'), p('\n'),
          p('  '), at('value'), p('='), vl('"valor inicial"'), p('\n'),
          p('  '), at('spellcheck'), p('='), vl('"false"'), p('\n>'),
        )} />
        <Tip>autocomplete ayuda al navegador a autocompletar campos. Los valores estándar son: name, email, current-password, new-password, street-address, etc.</Tip>
      </div>
    ),
  },
  {
    title: 'Multimedia y Links',
    content: (
      <div>
        <Section>Imágenes optimizadas</Section>
        <Note>Siempre incluir alt en las imágenes. Las imágenes decorativas deben tener alt="" para que los lectores de pantalla las ignoren. loading="lazy" mejora el rendimiento.</Note>
        <Code spans={c(
          p('<'), tg('img'), p(' '), at('src'), p('='), vl('"foto.jpg"'), p(' '), at('alt'), p('='), vl('"Descripción clara"'),
          p('\n     '), at('width'), p('='), vl('"800"'), p(' '), at('height'), p('='), vl('"600"'), p(' '), at('loading'), p('='), vl('"lazy"'), p('>\n\n'),
          p('<'), tg('picture'), p('>\n'),
          p('  <'), tg('source'), p(' '), at('media'), p('='), vl('"(min-width:800px)"'), p(' '), at('srcset'), p('='), vl('"large.webp"'), p('>\n'),
          p('  <'), tg('source'), p(' '), at('type'), p('='), vl('"image/webp"'), p(' '), at('srcset'), p('='), vl('"small.webp"'), p('>\n'),
          p('  <'), tg('img'), p(' '), at('src'), p('='), vl('"fallback.jpg"'), p(' '), at('alt'), p('='), vl('"img"'), p('>\n</'), tg('picture'), p('>'),
        )} />
        <Section>Links</Section>
        <Row label='<a href="/ruta">'          value="link interno — navegación SPA o normal" />
        <Row label='target="_blank"'           value="abrir en nueva pestaña" />
        <Row label='rel="noopener noreferrer"' value="seguridad obligatoria en links externos" />
        <Row label='<a href="tel:+1234">'      value="link de llamada telefónica" />
        <Row label='<a href="mailto:e@m.com">' value="abrir cliente de email" />
        <Row label='<a href="#seccion">'       value="ancla a elemento en la misma página" />
        <Tip>rel="noopener noreferrer" es obligatorio en target="_blank". Sin él, la página nueva puede acceder a window.opener y redirigir la pestaña original (tabnabbing).</Tip>
      </div>
    ),
  },
  {
    title: 'Accesibilidad y SEO',
    content: (
      <div>
        <ChapterHeader num="Capítulo II" title="Accesibilidad · SEO · Open Graph" />
        <Note>La accesibilidad (a11y) hace que el contenido sea usable por personas con discapacidades. ARIA (Accessible Rich Internet Applications) añade semántica donde el HTML no es suficiente.</Note>
        <Section>Atributos ARIA esenciales</Section>
        <Table headers={['Atributo', 'Uso']} rows={[
          ['aria-label="cerrar"',    'nombre accesible cuando no hay texto visible'],
          ['aria-hidden="true"',     'oculta del lector de pantalla'],
          ['aria-expanded="false"', 'estado de menú desplegado/cerrado'],
          ['aria-live="polite"',     'anuncia cambios dinámicos en pantalla'],
          ['role="button"',          'añade semántica de rol a un div'],
          ['tabindex="0"',           'incluir en la navegación por teclado'],
        ]} />
        <Section>Meta SEO y Open Graph</Section>
        <Code spans={c(
          p('<'), tg('meta'), p(' '), at('name'), p('='), vl('"description"'), p(' '), at('content'), p('='), vl('"Descripción de la página"'), p('>\n'),
          p('<'), tg('meta'), p(' '), at('property'), p('='), vl('"og:title"'), p(' '), at('content'), p('='), vl('"Mi App"'), p('>\n'),
          p('<'), tg('meta'), p(' '), at('property'), p('='), vl('"og:description"'), p(' '), at('content'), p('='), vl('"Descripción"'), p('>\n'),
          p('<'), tg('meta'), p(' '), at('property'), p('='), vl('"og:image"'), p(' '), at('content'), p('='), vl('"https://miweb.com/og.jpg"'), p('>\n'),
          p('<'), tg('link'), p(' '), at('rel'), p('='), vl('"canonical"'), p(' '), at('href'), p('='), vl('"https://miweb.com/pagina"'), p('>'),
        )} />
        <Tip>Open Graph (og:) controla la vista previa al compartir en redes sociales. og:image debe ser al menos 1200x630px y estar en una URL absoluta.</Tip>
      </div>
    ),
  },
];
