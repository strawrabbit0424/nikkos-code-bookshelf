import { ChapterHeader, Section, Note, Tip, Code, Row, Table, c, p, s, cm } from '../../components/PageTemplate';

// Git es un sistema de control de versiones distribuido. Permite registrar
// el historial de cambios de un proyecto y colaborar con otros desarrolladores.

export const gitPages = [
  // ── 1 ──────────────────────────────────────────────────
  {
    title: 'Comandos básicos',
    content: (
      <div>
        <ChapterHeader num="Capítulo I" title="Git" sub="Init · Stage · Commits · Log" />
        <Note>Git rastrea los cambios en tres zonas: el directorio de trabajo, el área de staging (index) y el repositorio. Un commit guarda un snapshot del staging.</Note>
        <Row label="git init"              value="crear repositorio en el directorio actual" />
        <Row label="git clone <url>"       value="copiar repositorio remoto al local" />
        <Row label="git status"            value="ver archivos modificados, staged y untracked" />
        <Row label="git add ."             value="agregar todos los cambios al staging" />
        <Row label="git add <file>"        value="agregar un archivo específico al staging" />
        <Row label='git commit -m "msg"'   value="crear commit con los cambios en staging" />
        <Row label="git commit --amend"    value="modificar el mensaje o contenido del último commit" />
        <Row label="git log --oneline"     value="historial de commits resumido una línea por cada uno" />
        <Row label="git log --graph"       value="historial con árbol de ramas en ASCII" />
        <Row label="git diff"              value="cambios no agregados al staging" />
        <Row label="git diff --staged"     value="cambios en staging listos para commit" />
        <Row label="git show <hash>"       value="ver contenido de un commit específico" />
        <Tip>Los primeros 7 caracteres del hash de un commit son suficientes para referenciarlo en casi todos los comandos: git show a3f92bc.</Tip>
      </div>
    ),
  },
  // ── 2 ──────────────────────────────────────────────────
  {
    title: 'Remoto — push y pull',
    content: (
      <div>
        <Note>Un remote es una referencia a un repositorio en otro lugar (GitHub, GitLab, etc.). origin es el nombre convencional del remote principal.</Note>
        <Section>Trabajar con remotos</Section>
        <Code spans={c(
          p('git remote add origin https://github.com/user/repo.git\n'),
          p('git remote -v                    '), cm('# ver remotos configurados'), p('\n\n'),
          p('git push origin main             '), cm('# subir rama main'), p('\n'),
          p('git push -u origin main          '), cm('# subir y establecer upstream'), p('\n'),
          p('git push --force-with-lease      '), cm('# push forzado seguro'), p('\n\n'),
          p('git pull                         '), cm('# fetch + merge automático'), p('\n'),
          p('git fetch origin                 '), cm('# descargar sin fusionar'), p('\n'),
          p('git pull --rebase                '), cm('# fetch + rebase en vez de merge'),
        )} />
        <Note>git fetch descarga los cambios del remoto sin aplicarlos. Es más seguro que git pull cuando se quiere revisar los cambios antes de integrarlos.</Note>
        <Tip>--force-with-lease es más seguro que --force porque falla si alguien más subió cambios desde la última vez que se hizo fetch, evitando sobreescribir trabajo ajeno.</Tip>
      </div>
    ),
  },
  // ── 3 ──────────────────────────────────────────────────
  {
    title: 'Branches — ramas',
    content: (
      <div>
        <ChapterHeader num="Capítulo II" title="Branches" sub="Crear · Cambiar · Fusionar · Eliminar" />
        <Note>Una rama es un puntero móvil a un commit. Crear ramas es barato en Git: no copia archivos, solo mueve un puntero. Se usan para desarrollar funcionalidades de forma aislada.</Note>
        <Section>Gestión de ramas</Section>
        <Code spans={c(
          p('git branch                   '), cm('# listar ramas locales'), p('\n'),
          p('git branch -a                '), cm('# listar locales y remotas'), p('\n'),
          p('git checkout -b feature/X    '), cm('# crear y cambiar a nueva rama'), p('\n'),
          p('git switch -c feature/X      '), cm('# equivalente moderno'), p('\n'),
          p('git switch main              '), cm('# cambiar de rama'), p('\n'),
          p('git branch -d feature/X      '), cm('# eliminar (solo si está mergeada)'), p('\n'),
          p('git branch -D feature/X      '), cm('# eliminar forzado'),
        )} />
        <Section>Merge y Rebase</Section>
        <Code spans={c(
          cm('# merge: crea un commit de fusión'), p('\n'),
          p('git merge feature/login\n\n'),
          cm('# rebase: reaplica commits sobre otra base'), p('\n'),
          p('git rebase main              '), cm('# historial lineal'), p('\n'),
          p('git rebase -i HEAD~3         '), cm('# rebase interactivo: squash, reword...'), p('\n'),
          p('git merge --squash feature/X '), cm('# aplanar todos los commits en uno'),
        )} />
        <Tip>Usar merge para ramas compartidas (main, develop). Usar rebase para ramas personales antes de hacer un PR, para mantener un historial limpio y lineal.</Tip>
      </div>
    ),
  },
  // ── 4 ──────────────────────────────────────────────────
  {
    title: 'Deshacer cambios',
    content: (
      <div>
        <Note>Git ofrece varias formas de deshacer cambios según en qué zona estén y si ya se subieron al remoto. La regla principal: nunca reescribir historial ya publicado.</Note>
        <Table headers={['Comando', 'Zona afectada', 'Seguro en remoto']} rows={[
          ['git restore <file>',   'directorio trabajo', 'N/A'],
          ['git restore --staged', 'staging area',       'N/A'],
          ['git reset HEAD~1',     'último commit (soft)','No'],
          ['git reset --hard',     'commit + archivos',  'No'],
          ['git revert <hash>',    'crea commit inverso', 'Si'],
        ]} />
        <Section>Comandos de deshacer</Section>
        <Code spans={c(
          p('git restore archivo.js      '), cm('# descartar cambios locales del archivo'), p('\n'),
          p('git restore --staged .      '), cm('# sacar todo del staging'), p('\n\n'),
          p('git reset HEAD~1            '), cm('# deshacer commit, mantener cambios'), p('\n'),
          p('git reset --hard HEAD~1     '), cm('# deshacer commit y descartar cambios'), p('\n\n'),
          p('git revert a3f92bc          '), cm('# crear commit que invierte uno anterior'), p('\n'),
          p('git cherry-pick a3f92bc     '), cm('# aplicar commit de otra rama'),
        )} />
        <Tip>git revert es siempre la opción segura cuando el commit ya está en el remoto. Crea un nuevo commit que invierte los cambios sin reescribir el historial.</Tip>
      </div>
    ),
  },
  // ── 5 ──────────────────────────────────────────────────
  {
    title: 'Stash y Conflictos',
    content: (
      <div>
        <Note>El stash guarda cambios temporalmente sin hacer commit. Es útil cuando se necesita cambiar de rama con trabajo en progreso que aún no está listo para commitear.</Note>
        <Section>Stash</Section>
        <Code spans={c(
          p('git stash                    '), cm('# guardar cambios actuales'), p('\n'),
          p('git stash push -m '), s('"WIP login"'), p('  '), cm('# guardar con nombre descriptivo'), p('\n'),
          p('git stash list               '), cm('# ver todos los stashes'), p('\n'),
          p('git stash pop                '), cm('# recuperar el último'), p('\n'),
          p('git stash apply stash@{1}    '), cm('# recuperar uno específico'), p('\n'),
          p('git stash drop stash@{0}     '), cm('# eliminar uno'), p('\n'),
          p('git stash clear              '), cm('# eliminar todos'),
        )} />
        <Section>Resolver conflictos</Section>
        <Note>Un conflicto ocurre cuando dos ramas modificaron las mismas líneas de un archivo. Git marca las secciones en conflicto con marcadores que se deben editar manualmente.</Note>
        <Code spans={c(
          cm('# 1. después de merge/rebase con conflicto:'), p('\n'),
          p('git status                   '), cm('# ver archivos en conflicto'), p('\n\n'),
          cm('# 2. editar archivo, buscar y resolver:'), p('\n'),
          p('<<<<<<< HEAD\n'),
          p('  mi versión del código\n'),
          p('=======\n'),
          p('  versión de la otra rama\n'),
          p('>>>>>>> feature/X\n\n'),
          cm('# 3. marcar como resuelto y continuar:'), p('\n'),
          p('git add archivo.js\n'),
          p('git merge --continue         '), cm('# o git rebase --continue'),
        )} />
      </div>
    ),
  },
  // ── 6 ──────────────────────────────────────────────────
  {
    title: 'Conventional Commits y config',
    content: (
      <div>
        <ChapterHeader num="Capítulo III" title="Convenciones · Configuración" />
        <Note>Conventional Commits es una convención para escribir mensajes de commit estructurados. Permite generar changelogs automáticos y activar releases semánticos.</Note>
        <Section>Formato de commits</Section>
        <Code spans={c(
          p('tipo(scope): descripción corta\n\n'),
          p('feat:      nueva funcionalidad\n'),
          p('fix:       corrección de bug\n'),
          p('docs:      solo documentación\n'),
          p('style:     formato, sin cambios lógicos\n'),
          p('refactor:  refactorización sin nueva funcionalidad\n'),
          p('test:      agregar o corregir tests\n'),
          p('chore:     mantenimiento, dependencias\n\n'),
          p('git commit -m '), s('"feat(auth): agregar login con JWT"'), p('\n'),
          p('git commit -m '), s('"fix: validar email duplicado en registro"'),
        )} />
        <Section>Configuración global</Section>
        <Code spans={c(
          p('git config --global user.name  '), s('"Tu Nombre"'), p('\n'),
          p('git config --global user.email '), s('"tu@email.com"'), p('\n'),
          p('git config --global core.editor '), s('"code --wait"'), p('\n'),
          p('git config --list              '), cm('# ver toda la configuración'),
        )} />
        <Section>.gitignore esencial</Section>
        <Code spans={c(
          p('node_modules/  dist/  build/  .next/\n'),
          p('.env  .env.local  .env.*.local\n'),
          p('.DS_Store  *.log  coverage/'),
        )} />
      </div>
    ),
  },
];
