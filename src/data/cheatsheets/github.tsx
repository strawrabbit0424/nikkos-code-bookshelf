import { ChapterHeader, Section, Note, Tip, Code, Row, Table, c, p, s, cm } from '../../components/PageTemplate';

export const githubPages = [
  {
    title: 'Flujo Fork + Pull Request',
    content: (
      <div>
        <ChapterHeader num="Capítulo I" title="GitHub" sub="Repos · Forks · Pull Requests" />
        <Note>El flujo fork + PR es el estándar para contribuir a proyectos open source. Se hace una copia personal (fork), se trabaja en una rama y se propone el cambio mediante un Pull Request.</Note>
        <Section>Flujo completo</Section>
        <Code spans={c(
          cm('# 1. Fork en GitHub UI, luego clonar tu fork:'), p('\n'),
          p('git clone https://github.com/TU/repo.git\n'),
          p('cd repo\n\n'),
          cm('# 2. Conectar el repo original como upstream:'), p('\n'),
          p('git remote add upstream https://github.com/ORIG/repo.git\n\n'),
          cm('# 3. Crear rama para el cambio:'), p('\n'),
          p('git checkout -b feature/nueva-funcion\n\n'),
          cm('# 4. Trabajar, commitear y subir:'), p('\n'),
          p('git add .  &&  git commit -m '), s('"feat: mi cambio"'), p('\n'),
          p('git push origin feature/nueva-funcion\n\n'),
          cm('# 5. Sincronizar con upstream antes del PR:'), p('\n'),
          p('git fetch upstream  &&  git rebase upstream/main'),
        )} />
        <Tip>Siempre crear una rama nueva para cada cambio. Nunca trabajar directamente en main o master para mantener el historial limpio y poder hacer múltiples PRs independientes.</Tip>
      </div>
    ),
  },
  {
    title: 'GitHub CLI (gh)',
    content: (
      <div>
        <Note>La GitHub CLI (gh) permite interactuar con GitHub directamente desde la terminal sin abrir el navegador. Es especialmente útil para crear PRs e issues sin salir del flujo de trabajo.</Note>
        <Section>Repositorios</Section>
        <Row label="gh repo create"      value="crear repositorio interactivamente" />
        <Row label="gh repo clone user/r"value="clonar repositorio" />
        <Row label="gh repo fork"        value="hacer fork del repo actual" />
        <Row label="gh repo view"        value="ver info del repo en la terminal" />
        <Section>Pull Requests</Section>
        <Row label="gh pr create"        value="abrir PR con editor interactivo" />
        <Row label="gh pr create --fill" value="abrir PR usando último commit como título" />
        <Row label="gh pr list"          value="listar PRs abiertos del repo" />
        <Row label="gh pr checkout <n>"  value="cambiar localmente a la rama del PR" />
        <Row label="gh pr merge"         value="hacer merge del PR actual" />
        <Section>Issues</Section>
        <Row label="gh issue create"     value="crear issue con título y descripción" />
        <Row label="gh issue list"       value="listar issues abiertos" />
        <Row label="gh issue close <n>"  value="cerrar un issue por número" />
        <Tip>gh pr create --fill rellena automáticamente el título y cuerpo del PR con el mensaje del último commit. Ahorra tiempo en PRs pequeños de un solo commit.</Tip>
      </div>
    ),
  },
  {
    title: 'GitHub Actions — CI/CD',
    content: (
      <div>
        <ChapterHeader num="Capítulo II" title="GitHub Actions" sub="Workflows · Jobs · Steps · Triggers" />
        <Note>GitHub Actions automatiza tareas al ocurrir eventos en el repositorio (push, PR, etc.). Un workflow es un archivo YAML en .github/workflows/ que define cuándo y qué ejecutar.</Note>
        <Section>Pipeline de CI básico</Section>
        <Code spans={c(
          cm('# .github/workflows/ci.yml'), p('\n'),
          p('name: CI\n'),
          p('on: [push, pull_request]\n'),
          p('jobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n'),
          p('      - uses: actions/checkout@v4\n'),
          p('      - uses: actions/setup-node@v4\n        with: { node-version: '), s("'20'"), p(' }\n'),
          p('      - run: npm ci\n'),
          p('      - run: npm test\n'),
          p('      - run: npm run build'),
        )} />
        <Section>Triggers más usados</Section>
        <Table headers={['Evento', 'Cuándo se activa']} rows={[
          ['push',              'al hacer push a cualquier rama'],
          ['pull_request',      'al abrir o actualizar un PR'],
          ['schedule',          'cron programado (ej: "0 8 * * 1")'],
          ['workflow_dispatch', 'manualmente desde la UI de GitHub'],
          ['release',           'al publicar un release'],
        ]} />
      </div>
    ),
  },
  {
    title: 'Secretos y Protección de ramas',
    content: (
      <div>
        <Note>Los secretos almacenan credenciales de forma segura y se inyectan en los workflows como variables de entorno. Nunca se deben hardcodear en el código.</Note>
        <Section>Secretos en workflows</Section>
        <Code spans={c(
          cm('# Definir en Settings > Secrets and variables > Actions'), p('\n\n'),
          cm('# Usar en el workflow:'), p('\n'),
          p('env:\n  DATABASE_URL: ${{ secrets.DATABASE_URL }}\n  JWT_SECRET:    ${{ secrets.JWT_SECRET }}\n\n'),
          cm('# Token automático disponible en cada run:'), p('\n'),
          p('permissions: { contents: write }\n'),
          p('token: ${{ secrets.GITHUB_TOKEN }}'),
        )} />
        <Section>Branch protection rules</Section>
        <Note>Las reglas de protección impiden que commits vayan directamente a ramas importantes sin pasar por un proceso de revisión.</Note>
        <Table headers={['Regla', 'Efecto']} rows={[
          ['Require PR reviews',    'aprobación requerida antes del merge'],
          ['Require status checks', 'CI debe pasar antes de permitir merge'],
          ['Restrict push',         'solo ciertos roles pueden hacer push directo'],
          ['Require signed commits','commits deben estar firmados con GPG'],
          ['Lock branch',           'solo admins pueden escribir en la rama'],
        ]} />
        <Section>Dependabot — actualizaciones automáticas</Section>
        <Code spans={c(
          cm('# .github/dependabot.yml'), p('\n'),
          p('version: 2\nupdates:\n  - package-ecosystem: '), s('"npm"'), p('\n    directory: '), s('"/"'), p('\n    schedule:\n      interval: '), s('"weekly"'),
        )} />
      </div>
    ),
  },
];
