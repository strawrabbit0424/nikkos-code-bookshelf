import { ChapterHeader, Section, Note, Tip, Code, Row, Table, c, p, kw, fn, s, cm, nm } from '../../components/PageTemplate';

// Node.js es un entorno de ejecución de JavaScript fuera del navegador,
// construido sobre el motor V8 de Chrome. Es ideal para servidores y herramientas CLI.

export const nodeNpmPages = [
  // ── 1 ──────────────────────────────────────────────────
  {
    title: 'NPM — Gestión de paquetes',
    content: (
      <div>
        <ChapterHeader num="Capítulo I" title="Node.js & NPM" sub="Gestor de paquetes · Scripts · Dependencias" />
        <Note>NPM (Node Package Manager) es el gestor de paquetes oficial de Node.js. Permite instalar, actualizar y gestionar las dependencias de un proyecto.</Note>
        <Row label="npm init -y"           value="crear package.json con valores por defecto" />
        <Row label="npm install <pkg>"     value="instalar y guardar en dependencies" />
        <Row label="npm install -D <pkg>"  value="guardar en devDependencies" />
        <Row label="npm install -g <pkg>"  value="instalar globalmente en el sistema" />
        <Row label="npm run <script>"      value="ejecutar script definido en package.json" />
        <Row label="npm audit fix"         value="corregir vulnerabilidades automáticamente" />
        <Row label="npm uninstall <pkg>"   value="desinstalar y quitar de package.json" />
        <Row label="npm list"              value="listar dependencias instaladas" />
        <Row label="npm outdated"          value="ver paquetes con versiones nuevas disponibles" />
        <Row label="npm ci"                value="instalar exacto desde package-lock.json (para CI)" />
        <Row label="npx <cmd>"             value="ejecutar un paquete sin instalarlo globalmente" />
        <Tip>Usar npm ci en entornos de integración continua en lugar de npm install. Garantiza que se instalen exactamente las versiones del lockfile.</Tip>
      </div>
    ),
  },
  // ── 2 ──────────────────────────────────────────────────
  {
    title: 'package.json y scripts',
    content: (
      <div>
        <Note>El archivo package.json describe el proyecto, sus dependencias y los scripts que se pueden ejecutar. Es el punto de entrada de cualquier proyecto Node.</Note>
        <Section>Estructura básica</Section>
        <Code spans={c(
          p('{\n  '), s('"name"'), p(': '), s('"mi-app"'), p(',\n  '),
          s('"version"'), p(': '), s('"1.0.0"'), p(',\n  '),
          s('"scripts"'), p(': {\n    '),
          s('"start"'), p(': '), s('"node dist/main.js"'), p(',\n    '),
          s('"dev"'),   p(': '), s('"nodemon src/index.js"'), p(',\n    '),
          s('"build"'), p(': '), s('"tsc"'), p(',\n    '),
          s('"test"'),  p(': '), s('"jest"'), p('\n  },\n  '),
          s('"dependencies"'), p(': { '), s('"express"'), p(': '), s('"^4.18.2"'), p(' },\n  '),
          s('"devDependencies"'), p(': { '), s('"nodemon"'), p(': '), s('"^3.0.0"'), p(' }\n}'),
        )} />
        <Note>Las dependencias en dependencies se incluyen en producción. Las de devDependencies solo se usan en desarrollo (linters, compiladores, test runners).</Note>
        <Tip>El símbolo ^ en las versiones permite actualizaciones de parches y menores (^4.18.2 acepta 4.x.x). El ~ solo permite parches (~4.18.2 acepta 4.18.x).</Tip>
      </div>
    ),
  },
  // ── 3 ──────────────────────────────────────────────────
  {
    title: 'CommonJS vs ESModules',
    content: (
      <div>
        <ChapterHeader num="Capítulo II" title="Sistema de módulos" sub="CommonJS · ESModules · Diferencias" />
        <Note>Node.js admite dos sistemas de módulos. CommonJS (require/exports) es el original. ESModules (import/export) es el estándar moderno de JavaScript.</Note>
        <Section>CommonJS — sistema original</Section>
        <Code spans={c(
          cm('// cargar módulos'), p('\n'),
          kw('const'), p(' fs   = '), fn('require'), p('('), s("'fs'"), p(');\n'),
          kw('const'), p(' path = '), fn('require'), p('('), s("'path'"), p(');\n\n'),
          cm('// exportar'), p('\n'),
          p('module.exports = { miFn, MiClase };\n'),
          p('module.exports.default = miFuncionPrincipal;'),
        )} />
        <Section>ESModules — estándar moderno</Section>
        <Code spans={c(
          cm('// cargar módulos'), p('\n'),
          kw('import'), p(' fs                '), kw('from'), p(' '), s("'fs'"), p(';\n'),
          kw('import'), p(' { join, resolve } '), kw('from'), p(' '), s("'path'"), p(';\n'),
          kw('import'), p(' * '), kw('as'), p(' utils           '), kw('from'), p(' '), s("'./utils.js'"), p(';\n\n'),
          cm('// exportar'), p('\n'),
          kw('export'), p(' '), kw('const'), p(' TIMEOUT = '), nm('5000'), p(';\n'),
          kw('export default'), p(' miFuncion;'),
        )} />
        <Tip>Para usar ESModules en Node.js agregar "type": "module" en package.json, o usar extensión .mjs. Los archivos .js usarán entonces import/export en vez de require.</Tip>
      </div>
    ),
  },
  // ── 4 ──────────────────────────────────────────────────
  {
    title: 'Módulos nativos: fs y path',
    content: (
      <div>
        <ChapterHeader num="Capítulo III" title="API nativa" sub="fs · path · process" />
        <Note>Node.js incluye módulos nativos sin necesidad de instalar nada. fs maneja archivos, path construye rutas de forma portable entre sistemas operativos.</Note>
        <Section>fs — sistema de archivos</Section>
        <Code spans={c(
          cm('// Síncrono — bloquea el hilo'), p('\n'),
          kw('const'), p(' data = fs.'), fn('readFileSync'), p('('), s("'f.txt'"), p(', '), s("'utf8'"), p(');\n'),
          p('fs.'), fn('writeFileSync'), p('('), s("'out.txt'"), p(', '), s("'contenido'"), p(');\n\n'),
          cm('// Asíncrono con promesas — recomendado'), p('\n'),
          kw('const'), p(' data = '), kw('await'), p(' fs.promises.'), fn('readFile'), p('('), s("'f.txt'"), p(', '), s("'utf8'"), p(');\n'),
          kw('await'), p(' fs.promises.'), fn('writeFile'), p('('), s("'out.txt'"), p(', data);\n'),
          kw('await'), p(' fs.promises.'), fn('mkdir'), p('('), s("'carpeta'"), p(', { recursive: '), kw('true'), p(' });'),
        )} />
        <Section>path — rutas de archivos</Section>
        <Code spans={c(
          p('path.'), fn('join'), p('(__dirname, '), s("'src'"), p(', '), s("'index.js'"), p(')\n'),
          cm('// une segmentos con el separador del SO (/ o \\)'), p('\n\n'),
          p('path.'), fn('resolve'), p('('), s("'./archivo.js'"), p(')   '), cm('// ruta absoluta'), p('\n'),
          p('path.'), fn('extname'), p('('), s("'file.ts'"), p(')       '), cm('// ".ts"'), p('\n'),
          p('path.'), fn('basename'), p('('), s("'/a/b/file.js'"), p(') '), cm('// "file.js"'), p('\n'),
          p('path.'), fn('dirname'), p('('), s("'/a/b/file.js'"), p(')  '), cm('// "/a/b"'),
        )} />
      </div>
    ),
  },
  // ── 5 ──────────────────────────────────────────────────
  {
    title: 'process y variables de entorno',
    content: (
      <div>
        <Note>El objeto global process da acceso al entorno del proceso Node.js: variables de entorno, argumentos de la línea de comandos, directorio actual y más.</Note>
        <Section>process — objeto global</Section>
        <Code spans={c(
          p('process.env.NODE_ENV       '), cm('"development" | "production"'), p('\n'),
          p('process.argv               '), cm('array de argumentos CLI'), p('\n'),
          p('process.cwd()              '), cm('directorio de trabajo actual'), p('\n'),
          p('process.pid                '), cm('ID del proceso del sistema'), p('\n'),
          p('process.'), fn('exit'), p('('), nm('0'), p(')              '), cm('salir (0 = éxito)'),
        )} />
        <Section>Variables de entorno con dotenv</Section>
        <Code spans={c(
          cm('# archivo .env (nunca subir a git)'), p('\n'),
          p('PORT='), nm('3000'), p('\n'),
          p('DATABASE_URL=postgresql://localhost/db\n'),
          p('JWT_SECRET=mi-secreto-seguro\n\n'),
          cm('// cargar al inicio de la app'), p('\n'),
          fn('require'), p('('), s("'dotenv'"), p(').'), fn('config'), p('();\n\n'),
          kw('const'), p(' port   = process.env.PORT ?? '), nm('3000'), p(';\n'),
          kw('const'), p(' secret = process.env.JWT_SECRET;\n'),
          kw('if'), p(' (!secret) '), kw('throw new'), p(' '), fn('Error'), p('('), s("'JWT_SECRET no definido'"), p(');'),
        )} />
        <Tip>Agregar .env al .gitignore para no exponer credenciales. Usar un archivo .env.example con las claves sin valores reales como documentación.</Tip>
      </div>
    ),
  },
  // ── 6 ──────────────────────────────────────────────────
  {
    title: 'EventEmitter y Streams',
    content: (
      <div>
        <ChapterHeader num="Capítulo IV" title="Events · Streams" sub="EventEmitter · Readable · Writable" />
        <Note>Node.js usa un modelo basado en eventos para operaciones asíncronas. EventEmitter es la base de la mayoría de las APIs nativas.</Note>
        <Section>EventEmitter</Section>
        <Code spans={c(
          kw('import'), p(' { EventEmitter } '), kw('from'), p(' '), s("'events'"), p(';\n'),
          kw('const'), p(' emitter = '), kw('new'), p(' '), fn('EventEmitter'), p('();\n\n'),
          cm('// escuchar evento'), p('\n'),
          p('emitter.'), fn('on'), p('('), s("'conexion'"), p(', (usuario) => {\n  console.'), fn('log'), p('('), s("'conectado:'"), p(', usuario);\n});\n\n'),
          cm('// emitir evento'), p('\n'),
          p('emitter.'), fn('emit'), p('('), s("'conexion'"), p(', '), s("'Ana'"), p(');\n'),
          p('emitter.'), fn('once'), p('('), s("'error'"), p(', fn); '), cm('// escuchar solo una vez'),
        )} />
        <Section>Streams — manejo eficiente de datos</Section>
        <Note>Los streams procesan datos en trozos sin cargar todo en memoria. Ideal para archivos grandes, respuestas HTTP o lectura de bases de datos.</Note>
        <Code spans={c(
          kw('const'), p(' readable = fs.'), fn('createReadStream'), p('('), s("'big.csv'"), p(');\n'),
          kw('const'), p(' writable = fs.'), fn('createWriteStream'), p('('), s("'out.csv'"), p(');\n\n'),
          cm('// pipe: conectar readable con writable'), p('\n'),
          p('readable.'), fn('pipe'), p('(writable);\n\n'),
          cm('// con transformación'), p('\n'),
          p('readable\n  .'), fn('pipe'), p('(transformStream)\n  .'), fn('pipe'), p('(writable);'),
        )} />
      </div>
    ),
  },
];
