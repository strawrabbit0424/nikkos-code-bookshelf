import { ChapterHeader, Section, Note, Tip, Code, Row, Table, c, p, kw, fn, s, cm, cl, dc, nm } from '../../components/PageTemplate';

// NestJS es un framework para construir servidores en Node.js con TypeScript.
// Sigue el patrón modular de Angular y usa decoradores para definir rutas y lógica.

export const nestjsPages = [
  // ── 1 ──────────────────────────────────────────────────
  {
    title: 'CLI y estructura de proyecto',
    content: (
      <div>
        <ChapterHeader num="Capítulo I" title="NestJS" sub="CLI · Módulos · Arquitectura" />
        <Note>NestJS organiza el código en módulos. Cada módulo agrupa un controlador (rutas), un servicio (lógica) y opcionalmente entidades y DTOs.</Note>
        <Section>CLI — comandos principales</Section>
        <Row label="nest new app"            value="crear proyecto nuevo con estructura base" />
        <Row label="nest g module users"     value="generar módulo users/" />
        <Row label="nest g controller users" value="generar controlador con rutas CRUD" />
        <Row label="nest g service users"    value="generar servicio con lógica de negocio" />
        <Row label="nest g resource users"   value="generar CRUD completo (módulo+ctrl+svc)" />
        <Row label="nest g guard auth"       value="generar guard de autenticación" />
        <Row label="nest g interceptor log"  value="generar interceptor" />
        <Row label="nest g pipe validation"  value="generar pipe de validación" />
        <Row label="npm run start:dev"       value="iniciar con hot reload (nodemon)" />
        <Row label="npm run build"           value="compilar TypeScript a dist/" />
        <Tip>nest g resource genera en una sola operación: módulo, controlador, servicio, DTOs y entidad. Es el punto de partida recomendado para nuevas funcionalidades.</Tip>
      </div>
    ),
  },
  // ── 2 ──────────────────────────────────────────────────
  {
    title: 'Controllers — rutas HTTP',
    content: (
      <div>
        <Note>El controlador maneja las peticiones HTTP entrantes y devuelve respuestas. No debe contener lógica de negocio, solo llamar al servicio correspondiente.</Note>
        <Section>Controlador completo</Section>
        <Code spans={c(
          dc('@Controller'), p('('), s("'users'"), p(')\n'),
          kw('export class'), p(' '), cl('UsersController'), p(' {\n  '),
          kw('constructor'), p('('), kw('private'), p(' svc: '), cl('UsersService'), p(') {}\n\n  '),
          dc('@Get'), p('()                    '), fn('findAll'), p('()                 { '), kw('return'), p(' this.svc.'), fn('findAll'), p('(); }\n  '),
          dc('@Get'), p('('), s("':id'"), p(')               '), fn('findOne'), p('('), dc('@Param'), p('('), s("'id'"), p(') id: string)  { '), kw('return'), p(' this.svc.'), fn('findOne'), p('(+id); }\n  '),
          dc('@Post'), p('()                   '), fn('create'), p('('), dc('@Body'), p('() dto: '), cl('CreateUserDto'), p(')  { '), kw('return'), p(' this.svc.'), fn('create'), p('(dto); }\n  '),
          dc('@Put'), p('('), s("':id'"), p(')                '), fn('update'), p('('), dc('@Param'), p('('), s("'id'"), p(') id: string,\n                           '), dc('@Body'), p('() dto: '), cl('UpdateUserDto'), p(') { '), kw('return'), p(' this.svc.'), fn('update'), p('(+id, dto); }\n  '),
          dc('@Delete'), p('('), s("':id'"), p(')             '), fn('remove'), p('('), dc('@Param'), p('('), s("'id'"), p(') id: string)  { '), kw('return'), p(' this.svc.'), fn('remove'), p('(+id); }\n}'),
        )} />
        <Section>Decoradores de petición</Section>
        <Row label="@Param('id')"   value="parámetro de ruta /users/:id" />
        <Row label="@Body()"        value="cuerpo JSON del request" />
        <Row label="@Query('page')" value="query string ?page=2" />
        <Row label="@Headers()"     value="cabeceras HTTP" />
        <Row label="@Request()"     value="objeto req completo de Express" />
      </div>
    ),
  },
  // ── 3 ──────────────────────────────────────────────────
  {
    title: 'Modules y Services',
    content: (
      <div>
        <Note>El módulo declara qué controladores y servicios pertenecen a esa funcionalidad. Los servicios marcados en exports pueden ser usados por otros módulos.</Note>
        <Section>Module</Section>
        <Code spans={c(
          dc('@Module'), p('({\n  imports:     ['), cl('TypeOrmModule'), p('.'), fn('forFeature'), p('(['), cl('User'), p(']),  '), cm('// entidades del módulo'), p('\n  controllers: ['), cl('UsersController'), p('],\n  providers:   ['), cl('UsersService'), p('],\n  exports:     ['), cl('UsersService'), p('],   '), cm('// disponible para otros módulos'), p('\n})\n'),
          kw('export class'), p(' '), cl('UsersModule'), p(' {}'),
        )} />
        <Section>Service</Section>
        <Note>El servicio contiene la lógica de negocio. Al marcarlo con @Injectable, NestJS puede inyectarlo automáticamente en cualquier constructor.</Note>
        <Code spans={c(
          dc('@Injectable'), p('()\n'),
          kw('export class'), p(' '), cl('UsersService'), p(' {\n  '),
          kw('constructor'), p('(\n    '),
          dc('@InjectRepository'), p('('), cl('User'), p(')\n    '),
          kw('private'), p(' repo: '), cl('Repository'), p('<'), cl('User'), p('>\n  ) {}\n\n  '),
          fn('findAll'), p('()              { '), kw('return'), p(' this.repo.'), fn('find'), p('(); }\n  '),
          fn('findOne'), p('(id: '), cl('number'), p(') { '), kw('return'), p(' this.repo.'), fn('findOneBy'), p('({ id }); }\n}'),
        )} />
      </div>
    ),
  },
  // ── 4 ──────────────────────────────────────────────────
  {
    title: 'DTOs y Validación',
    content: (
      <div>
        <Note>Los DTOs (Data Transfer Objects) definen la forma de los datos de entrada. Al combinarlos con class-validator, NestJS valida automáticamente las peticiones.</Note>
        <Section>DTO con decoradores de validación</Section>
        <Code spans={c(
          cm('// npm install class-validator class-transformer'), p('\n'),
          kw('export class'), p(' '), cl('CreateUserDto'), p(' {\n  '),
          dc('@IsString'), p('()\n  '), dc('@MinLength'), p('('), nm('2'), p(')\n  name:     '), cl('string'), p(';\n\n  '),
          dc('@IsEmail'), p('()\n  email:    '), cl('string'), p(';\n\n  '),
          dc('@IsString'), p('()\n  '), dc('@MinLength'), p('('), nm('8'), p(')\n  password: '), cl('string'), p(';\n\n  '),
          dc('@IsOptional'), p('()\n  '), dc('@IsInt'), p('()\n  '), dc('@Min'), p('('), nm('0'), p(')\n  age?:     '), cl('number'), p(';\n}'),
        )} />
        <Section>Activar ValidationPipe globalmente</Section>
        <Code spans={c(
          cm('// main.ts'), p('\n'),
          p('app.'), fn('useGlobalPipes'), p('('), kw('new'), p(' '), cl('ValidationPipe'), p('({\n  whitelist:       '), kw('true'), p(',  '), cm('// ignora campos no declarados en DTO'), p('\n  forbidNonWhitelisted: '), kw('true'), p(',  '), cm('// lanza error si hay campos extras'), p('\n  transform:       '), kw('true'), p(',  '), cm('// convierte tipos automáticamente'), p('\n}));'),
        )} />
        <Tip>Con transform: true, los @Param('id') de tipo string se convierten automáticamente a number si el DTO o parámetro declara ese tipo.</Tip>
      </div>
    ),
  },
  // ── 5 ──────────────────────────────────────────────────
  {
    title: 'TypeORM — Entidades y Relaciones',
    content: (
      <div>
        <ChapterHeader num="Capítulo II" title="TypeORM" sub="Entidades · Relaciones · Repositorios" />
        <Note>TypeORM mapea clases TypeScript a tablas de la base de datos. Cada decorador corresponde a una restricción o configuración de la columna en SQL.</Note>
        <Section>Entidad con relación</Section>
        <Code spans={c(
          dc('@Entity'), p('()\n'),
          kw('export class'), p(' '), cl('User'), p(' {\n  '),
          dc('@PrimaryGeneratedColumn'), p('()     id:        '), cl('number'), p(';\n  '),
          dc('@Column'), p('()                    name:      '), cl('string'), p(';\n  '),
          dc('@Column'), p('({ unique: '), kw('true'), p(' })       email:     '), cl('string'), p(';\n  '),
          dc('@Column'), p('({ select: '), kw('false'), p(' })      password:  '), cl('string'), p(';\n  '),
          dc('@OneToMany'), p('(() => '), cl('Post'), p(', p => p.user)\n  posts:     '), cl('Post'), p('[];\n  '),
          dc('@CreateDateColumn'), p('()           createdAt: '), cl('Date'), p(';\n  '),
          dc('@UpdateDateColumn'), p('()           updatedAt: '), cl('Date'), p(';\n}'),
        )} />
        <Table headers={['Decorador', 'Tipo de relación']} rows={[
          ['@OneToOne',   '1 usuario — 1 perfil'],
          ['@OneToMany',  '1 usuario — muchos posts'],
          ['@ManyToOne',  'muchos posts — 1 usuario'],
          ['@ManyToMany', 'muchos usuarios — muchos roles'],
        ]} />
      </div>
    ),
  },
  // ── 6 ──────────────────────────────────────────────────
  {
    title: 'Guards, JWT y Excepciones',
    content: (
      <div>
        <ChapterHeader num="Capítulo III" title="Guards · JWT · Errores" />
        <Note>Los guards deciden si una petición puede continuar. Se ejecutan antes del controlador. JwtAuthGuard verifica el token en el header Authorization.</Note>
        <Section>JwtAuthGuard</Section>
        <Code spans={c(
          dc('@Injectable'), p('()\n'),
          kw('export class'), p(' '), cl('JwtAuthGuard'), p(' '), kw('extends'), p(' '), cl('AuthGuard'), p('('), s("'jwt'"), p(') {}\n\n'),
          cm('// proteger una ruta'), p('\n'),
          dc('@UseGuards'), p('('), cl('JwtAuthGuard'), p(')\n'),
          dc('@Get'), p('('), s("'profile'"), p(')\n'),
          fn('getProfile'), p('('), dc('@Request'), p('() req) { '), kw('return'), p(' req.user; }'),
        )} />
        <Section>Ruta pública (saltar guard)</Section>
        <Code spans={c(
          kw('export const'), p(' '), cl('Public'), p(' = () => '), fn('SetMetadata'), p('('), s("'isPublic'"), p(', '), kw('true'), p(');\n\n'),
          dc('@Public'), p('()\n'), dc('@Post'), p('('), s("'login'"), p(')\n'),
          fn('login'), p('('), dc('@Body'), p('() dto: '), cl('LoginDto'), p(') { '), cm('/* ... */'), p(' }'),
        )} />
        <Section>Excepciones HTTP</Section>
        <Note>NestJS convierte estas excepciones automáticamente en respuestas HTTP con el código de estado y mensaje correspondiente.</Note>
        <Table headers={['Clase', 'Código', 'Cuándo usarla']} rows={[
          ['NotFoundException',     '404', 'recurso no encontrado'],
          ['BadRequestException',   '400', 'datos de entrada inválidos'],
          ['UnauthorizedException', '401', 'token inválido o ausente'],
          ['ForbiddenException',    '403', 'sin permisos para la acción'],
          ['ConflictException',     '409', 'email o clave duplicada'],
        ]} />
      </div>
    ),
  },
];
