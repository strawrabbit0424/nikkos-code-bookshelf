import { ChapterHeader, Section, Note, Tip, Code, Row, Table, c, p, kw, fn, s, cm, cl, nm } from '../../components/PageTemplate';

// SQL es un lenguaje estándar para gestionar bases de datos relacionales.
// Se divide en DDL (estructura), DML (datos) y DQL (consultas).

export const sqlPages = [
  // ── 1 ──────────────────────────────────────────────────
  {
    title: 'DDL — Definición de estructura',
    content: (
      <div>
        <ChapterHeader num="Capítulo I" title="SQL — DDL" sub="Crear · Modificar · Eliminar tablas" />
        <Note>DDL (Data Definition Language) define la estructura de la base de datos. Los cambios son permanentes y no se pueden revertir con ROLLBACK en la mayoría de motores.</Note>
        <Section>Crear tabla</Section>
        <Code spans={c(
          kw('CREATE TABLE'), p(' usuarios (\n'),
          p('  id        '), cl('INT PRIMARY KEY AUTO_INCREMENT'), p(',\n'),
          p('  nombre    '), cl('VARCHAR(100)'), p(' '), kw('NOT NULL'), p(',\n'),
          p('  email     '), cl('VARCHAR(150) UNIQUE'), p(',\n'),
          p('  creado_en '), cl('TIMESTAMP DEFAULT'), p(' '), fn('NOW'), p('()\n);'),
        )} />
        <Note>PRIMARY KEY identifica de forma única cada fila. AUTO_INCREMENT genera el valor automáticamente. UNIQUE impide valores repetidos en esa columna.</Note>
        <Section>Modificar y eliminar</Section>
        <Code spans={c(
          kw('ALTER TABLE'), p(' usuarios '), kw('ADD'), p(' edad '), cl('INT'), p(';\n'),
          kw('ALTER TABLE'), p(' usuarios '), kw('MODIFY COLUMN'), p(' nombre '), cl('VARCHAR(200)'), p(';\n'),
          kw('ALTER TABLE'), p(' usuarios '), kw('DROP COLUMN'), p(' edad;\n'),
          kw('DROP TABLE IF EXISTS'), p(' usuarios;'),
        )} />
      </div>
    ),
  },
  // ── 2 ──────────────────────────────────────────────────
  {
    title: 'Tipos de datos',
    content: (
      <div>
        <Note>Elegir el tipo correcto ahorra espacio y mejora el rendimiento. Usar INT cuando sea posible en vez de VARCHAR para IDs y números.</Note>
        <Table headers={['Tipo', 'Descripción', 'Ejemplo']} rows={[
          ['INT / BIGINT',   'Entero 32 / 64 bits',        '42'],
          ['VARCHAR(n)',     'Texto variable hasta n chars','Ana'],
          ['TEXT',           'Texto largo sin límite',      'contenido...'],
          ['DECIMAL(p,s)',   'Decimal exacto (dinero)',     '99.99'],
          ['BOOLEAN',        'Verdadero o falso',           '1 / 0'],
          ['TIMESTAMP',      'Fecha y hora UTC',            '2024-01-15 10:30'],
          ['DATE',           'Solo fecha',                  '2024-01-15'],
          ['JSON',           'Objeto JSON nativo',          '{"key":"val"}'],
          ['ENUM(a,b,...)',  'Valor de lista cerrada',      'activo'],
        ]} />
        <Tip>Usar DECIMAL en lugar de FLOAT para valores monetarios. FLOAT tiene errores de redondeo por ser punto flotante binario.</Tip>
      </div>
    ),
  },
  // ── 3 ──────────────────────────────────────────────────
  {
    title: 'DML — INSERT / UPDATE / DELETE',
    content: (
      <div>
        <ChapterHeader num="Capítulo II" title="SQL — DML" sub="Insertar · Actualizar · Eliminar filas" />
        <Note>DML (Data Manipulation Language) opera sobre los datos existentes. Siempre usar WHERE en UPDATE y DELETE para no afectar toda la tabla.</Note>
        <Section>INSERT</Section>
        <Code spans={c(
          cm('-- Una fila'), p('\n'),
          kw('INSERT INTO'), p(' usuarios (nombre, email)\n'),
          kw('VALUES'), p(' ('), s("'Ana'"), p(', '), s("'ana@mail.com'"), p(');\n\n'),
          cm('-- Múltiples filas en una sola operación'), p('\n'),
          kw('INSERT INTO'), p(' usuarios (nombre, email) '), kw('VALUES'), p('\n  ('), s("'Luis'"), p(', '), s("'luis@mail.com'"), p('),\n  ('), s("'Mia'"), p(', '), s("'mia@mail.com'"), p(');'),
        )} />
        <Section>UPDATE / DELETE</Section>
        <Code spans={c(
          kw('UPDATE'), p(' usuarios\n'),
          kw('SET'), p(' nombre = '), s("'Ana L'"), p(', edad = '), nm('25'), p('\n'),
          kw('WHERE'), p(' id = '), nm('1'), p(';\n\n'),
          kw('DELETE FROM'), p(' usuarios '), kw('WHERE'), p(' id = '), nm('1'), p(';'),
        )} />
        <Tip>Sin WHERE en un UPDATE o DELETE se modifican TODAS las filas de la tabla. Siempre verificar la condición antes de ejecutar.</Tip>
      </div>
    ),
  },
  // ── 4 ──────────────────────────────────────────────────
  {
    title: 'Transacciones',
    content: (
      <div>
        <Note>Una transacción agrupa varias operaciones en una unidad atómica: o todas se ejecutan o ninguna. Esto garantiza consistencia ante errores o fallos.</Note>
        <Section>BEGIN / COMMIT / ROLLBACK</Section>
        <Code spans={c(
          kw('BEGIN'), p(';\n\n'),
          cm('-- transferir 100 de cuenta 1 a cuenta 2'), p('\n'),
          kw('UPDATE'), p(' cuentas '), kw('SET'), p(' saldo = saldo - '), nm('100'), p(' '), kw('WHERE'), p(' id = '), nm('1'), p(';\n'),
          kw('UPDATE'), p(' cuentas '), kw('SET'), p(' saldo = saldo + '), nm('100'), p(' '), kw('WHERE'), p(' id = '), nm('2'), p(';\n\n'),
          kw('COMMIT'), p(';   '), cm('-- guardar todo'), p('\n'),
          cm('-- o ROLLBACK para deshacer si algo falla'),
        )} />
        <Section>Propiedades ACID</Section>
        <Table headers={['Propiedad', 'Garantiza']} rows={[
          ['Atomicidad',    'todo o nada se aplica'],
          ['Consistencia',  'la BD pasa de un estado válido a otro'],
          ['Aislamiento',   'transacciones no se interfieren entre sí'],
          ['Durabilidad',   'los cambios persisten aunque falle el sistema'],
        ]} />
        <Section>Upsert (INSERT o UPDATE)</Section>
        <Code spans={c(
          kw('INSERT INTO'), p(' usuarios (id, nombre)\n'),
          kw('VALUES'), p(' ('), nm('1'), p(', '), s("'Ana'"), p(')\n'),
          kw('ON DUPLICATE KEY UPDATE'), p(' nombre = '), s("'Ana'"), p(';'),
        )} />
      </div>
    ),
  },
  // ── 5 ──────────────────────────────────────────────────
  {
    title: 'SELECT — Consultas',
    content: (
      <div>
        <ChapterHeader num="Capítulo III" title="SQL — SELECT" sub="Filtros · Orden · Agregación" />
        <Note>SELECT recupera datos sin modificarlos. El orden de ejecución lógica es: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT.</Note>
        <Section>Filtros, orden y paginación</Section>
        <Code spans={c(
          kw('SELECT'), p(' nombre, email\n'),
          kw('FROM'), p(' usuarios\n'),
          kw('WHERE'), p(' email '), kw('LIKE'), p(' '), s("'%gmail%'"), p('\n'),
          p('  '), kw('AND'), p(' edad '), kw('BETWEEN'), p(' '), nm('18'), p(' '), kw('AND'), p(' '), nm('35'), p('\n'),
          p('  '), kw('AND'), p(' id '), kw('IN'), p(' ('), nm('1'), p(', '), nm('2'), p(', '), nm('5'), p(')\n'),
          kw('ORDER BY'), p(' nombre '), kw('ASC'), p('\n'),
          kw('LIMIT'), p(' '), nm('10'), p(' '), kw('OFFSET'), p(' '), nm('20'), p(';'),
        )} />
        <Note>LIKE filtra con patrones: % es cualquier secuencia de caracteres, _ es un solo carácter. BETWEEN es inclusivo en ambos extremos.</Note>
        <Section>GROUP BY y HAVING</Section>
        <Code spans={c(
          kw('SELECT'), p(' categoria, '), fn('COUNT'), p('(*) '), kw('AS'), p(' total, '), fn('AVG'), p('(precio) '), kw('AS'), p(' promedio\n'),
          kw('FROM'), p(' productos\n'),
          kw('GROUP BY'), p(' categoria\n'),
          kw('HAVING'), p(' '), fn('COUNT'), p('(*) > '), nm('5'), p('\n'),
          kw('ORDER BY'), p(' total '), kw('DESC'), p(';'),
        )} />
        <Tip>HAVING filtra sobre grupos ya formados (como un WHERE para agregados). No se puede usar WHERE para filtrar resultados de COUNT o AVG.</Tip>
      </div>
    ),
  },
  // ── 6 ──────────────────────────────────────────────────
  {
    title: 'JOINs e Índices',
    content: (
      <div>
        <ChapterHeader num="Capítulo IV" title="JOINs · Índices · Vistas" />
        <Note>Los JOINs combinan filas de dos o más tablas según una condición. El tipo de JOIN determina qué filas se incluyen cuando no hay coincidencia.</Note>
        <Section>INNER JOIN y LEFT JOIN</Section>
        <Code spans={c(
          cm('-- INNER: solo filas con coincidencia en ambas tablas'), p('\n'),
          kw('SELECT'), p(' u.nombre, p.titulo\n'),
          kw('FROM'), p(' usuarios u\n'),
          kw('INNER JOIN'), p(' posts p '), kw('ON'), p(' p.usuario_id = u.id;\n\n'),
          cm('-- LEFT: todos los usuarios, con o sin posts'), p('\n'),
          kw('SELECT'), p(' u.nombre, p.titulo\n'),
          kw('FROM'), p(' usuarios u\n'),
          kw('LEFT JOIN'), p(' posts p '), kw('ON'), p(' p.usuario_id = u.id;'),
        )} />
        <Table headers={['Tipo', 'Resultado']} rows={[
          ['INNER JOIN', 'Solo filas con coincidencia en ambas'],
          ['LEFT JOIN',  'Todos de izquierda + coincidencias'],
          ['RIGHT JOIN', 'Todos de derecha + coincidencias'],
        ]} />
        <Section>Índices</Section>
        <Note>Los índices aceleran las búsquedas pero ralentizan los escrituras. Crear índices en columnas usadas frecuentemente en WHERE o JOIN.</Note>
        <Code spans={c(
          kw('CREATE INDEX'), p(' idx_email '), kw('ON'), p(' usuarios(email);\n'),
          kw('CREATE UNIQUE INDEX'), p(' idx_u '), kw('ON'), p(' usuarios(email);\n'),
          kw('DROP INDEX'), p(' idx_email '), kw('ON'), p(' usuarios;'),
        )} />
      </div>
    ),
  },
];
