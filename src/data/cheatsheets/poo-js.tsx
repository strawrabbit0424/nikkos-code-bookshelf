import { ChapterHeader, Section, Note, Tip, Code, Row, c, p, kw, fn, s, cm, cl, nm } from '../../components/PageTemplate';

export const pooJsPages = [
  {
    title: 'Clases y campos privados',
    content: (
      <div>
        <ChapterHeader num="Capítulo I" title="POO JavaScript" sub="Clases · Encapsulamiento · Herencia" />
        <Note>La Programación Orientada a Objetos organiza el código en objetos que combinan datos (propiedades) y comportamiento (métodos). En JS moderno se usa la sintaxis class.</Note>
        <Section>Clase con campo privado (#)</Section>
        <Code spans={c(
          kw('class'), p(' '), cl('Animal'), p(' {\n'),
          p('  #nombre;  '), cm('// campo privado, solo accesible dentro de la clase'), p('\n\n'),
          p('  '), kw('constructor'), p('(nombre, edad) {\n'),
          p('    this.#nombre = nombre;\n    this.edad = edad;\n  }\n\n'),
          p('  '), kw('get'), p(' '), fn('nombre'), p('() { '), kw('return'), p(' this.#nombre; }  '), cm('// getter público'), p('\n'),
          p('  '), fn('hablar'), p('() { '), kw('return'), p(' '), s("'Hola, soy '"), p(' + this.#nombre; }\n'),
          p('  '), kw('static'), p(' '), fn('crear'), p('(n) { '), kw('return new'), p(' '), cl('Animal'), p('(n, '), nm('0'), p('); }  '), cm('// método estático'), p('\n}'),
        )} />
        <Note>Los campos privados (#) son verdaderamente privados desde ES2022: no se puede acceder a ellos fuera de la clase, ni siquiera en subclases. Los métodos static pertenecen a la clase, no a las instancias.</Note>
      </div>
    ),
  },
  {
    title: 'Herencia y polimorfismo',
    content: (
      <div>
        <Note>La herencia permite crear clases que extienden el comportamiento de otras. El polimorfismo permite que subclases redefinan métodos heredados con comportamientos distintos.</Note>
        <Section>extends y super</Section>
        <Code spans={c(
          kw('class'), p(' '), cl('Perro'), p(' '), kw('extends'), p(' '), cl('Animal'), p(' {\n'),
          p('  '), kw('constructor'), p('(nombre, raza) {\n'),
          p('    '), kw('super'), p('(nombre, '), nm('0'), p(');  '), cm('// llama al constructor del padre'), p('\n'),
          p('    this.raza = raza;\n  }\n\n'),
          p('  '), fn('hablar'), p('() {  '), cm('// sobreescribe (override) el método del padre'), p('\n'),
          p('    '), kw('return super'), p('.'), fn('hablar'), p('() + '), s("', raza: '"), p(' + this.raza;\n  }\n}\n\n'),
          kw('const'), p(' dog = '), kw('new'), p(' '), cl('Perro'), p('('), s("'Rex'"), p(', '), s("'Labrador'"), p(');\n'),
          p('dog instanceof '), cl('Perro'), p('   '), cm('// true — es una instancia de Perro'), p('\n'),
          p('dog instanceof '), cl('Animal'), p('  '), cm('// true — también de Animal'),
        )} />
        <Tip>super() en el constructor debe llamarse antes de usar this. Omitirlo lanza un ReferenceError. En métodos, super.metodo() llama la versión del padre.</Tip>
      </div>
    ),
  },
  {
    title: 'Async / Await',
    content: (
      <div>
        <ChapterHeader num="Capítulo II" title="Programación asíncrona" sub="Promises · async/await · manejo de errores" />
        <Note>JavaScript es single-threaded. Para operaciones lentas (red, archivos) usa un modelo asíncrono basado en Promises. async/await es azúcar sintáctico sobre Promises.</Note>
        <Section>async / await con manejo de errores</Section>
        <Code spans={c(
          kw('const'), p(' '), fn('cargarUsuario'), p(' = '), kw('async'), p(' (id) => {\n'),
          p('  '), kw('try'), p(' {\n'),
          p('    '), kw('const'), p(' res  = '), kw('await'), p(' '), fn('fetch'), p('(`/api/users/${id}`);\n'),
          p('    '), kw('if'), p(' (!res.ok) '), kw('throw new'), p(' '), fn('Error'), p('(`HTTP ${res.status}`);\n'),
          p('    '), kw('const'), p(' data = '), kw('await'), p(' res.'), fn('json'), p('();\n'),
          p('    '), kw('return'), p(' data;\n'),
          p('  } '), kw('catch'), p('(err) {\n    console.'), fn('error'), p('('), s("'Error:'"), p(', err.message);\n    '), kw('throw'), p(' err;\n  }\n};'),
        )} />
        <Section>Promise.all — peticiones en paralelo</Section>
        <Code spans={c(
          cm('// secuencial (lento): espera una por una'), p('\n'),
          kw('const'), p(' user = '), kw('await'), p(' '), fn('fetchUser'), p('(id);\n'),
          kw('const'), p(' posts = '), kw('await'), p(' '), fn('fetchPosts'), p('(id);\n\n'),
          cm('// paralelo (rápido): ambas al mismo tiempo'), p('\n'),
          kw('const'), p(' [user, posts] = '), kw('await'), p(' '), cl('Promise'), p('.'), fn('all'), p('([\n  '), fn('fetchUser'), p('(id),\n  '), fn('fetchPosts'), p('(id),\n]);'),
        )} />
        <Tip>Promise.all falla si cualquiera de las promesas falla. Usar Promise.allSettled si se quiere que todas terminen independientemente de los errores.</Tip>
      </div>
    ),
  },
  {
    title: 'Destructuring y Spread',
    content: (
      <div>
        <Note>La desestructuración extrae valores de objetos y arrays en variables. El spread operator (...) expande iterables. Son fundamentales en React y en el código moderno.</Note>
        <Section>Desestructuración de objetos</Section>
        <Code spans={c(
          kw('const'), p(' usuario = { nombre: '), s("'Ana'"), p(', edad: '), nm('25'), p(', ciudad: '), s("'Lima'"), p(' };\n\n'),
          cm('// extraer propiedades'), p('\n'),
          kw('const'), p(' { nombre, edad } = usuario;\n\n'),
          cm('// renombrar y valor por defecto'), p('\n'),
          kw('const'), p(' { nombre: name, rol = '), s("'user'"), p(' } = usuario;\n\n'),
          cm('// desestructuración en parámetros'), p('\n'),
          kw('function'), p(' '), fn('mostrar'), p('({ nombre, edad }) {\n  console.'), fn('log'), p('(nombre, edad);\n}'),
        )} />
        <Section>Spread y Rest</Section>
        <Code spans={c(
          cm('// spread: expandir objeto o array'), p('\n'),
          kw('const'), p(' nuevo = { ...usuario, edad: '), nm('26'), p(' };  '), cm('// sobrescribe edad'), p('\n'),
          kw('const'), p(' arr2  = [...arr1, '), nm('4'), p(', '), nm('5'), p('];\n\n'),
          cm('// rest: agrupar el resto'), p('\n'),
          kw('const'), p(' { nombre, ...resto } = usuario;  '), cm('// resto = { edad, ciudad }'), p('\n'),
          kw('const'), p(' [primero, ...otros] = ['), nm('1'), p(', '), nm('2'), p(', '), nm('3'), p('];'),
        )} />
      </div>
    ),
  },
  {
    title: 'Array methods',
    content: (
      <div>
        <Note>Los métodos funcionales de Array evitan mutaciones y producen nuevos arrays o valores. Son la base del estilo de programación funcional en JavaScript.</Note>
        <Section>Los más usados</Section>
        <Code spans={c(
          kw('const'), p(' nums = ['), nm('1'), p(', '), nm('2'), p(', '), nm('3'), p(', '), nm('4'), p(', '), nm('5'), p('];\n\n'),
          cm('// map: transformar cada elemento'), p('\n'),
          p('nums.'), fn('map'), p('(n => n * '), nm('2'), p(')          '), cm('// [2, 4, 6, 8, 10]'), p('\n\n'),
          cm('// filter: conservar los que cumplan la condición'), p('\n'),
          p('nums.'), fn('filter'), p('(n => n % '), nm('2'), p(' === '), nm('0'), p(')  '), cm('// [2, 4]'), p('\n\n'),
          cm('// reduce: acumular en un único valor'), p('\n'),
          p('nums.'), fn('reduce'), p('((acc, n) => acc + n, '), nm('0'), p(') '), cm('// 15'), p('\n\n'),
          cm('// find / findIndex'), p('\n'),
          p('nums.'), fn('find'), p('(n => n > '), nm('3'), p(')         '), cm('// 4'), p('\n'),
          p('nums.'), fn('findIndex'), p('(n => n > '), nm('3'), p(')    '), cm('// 3 (índice)'),
        )} />
      </div>
    ),
  },
  {
    title: 'Closures y Patrones',
    content: (
      <div>
        <ChapterHeader num="Capítulo III" title="Closures · Patrones · Prototype" />
        <Note>Un closure es una función que recuerda el ámbito donde fue creada, aunque ese ámbito ya no exista. Es la base de patrones como módulos, currying y memoización.</Note>
        <Section>Closure</Section>
        <Code spans={c(
          kw('function'), p(' '), fn('crearContador'), p('(inicio = '), nm('0'), p(') {\n  '),
          kw('let'), p(' count = inicio;  '), cm('// variable del closure'), p('\n  '),
          kw('return'), p(' {\n    '),
          fn('incrementar'), p(': () => ++count,\n    '),
          fn('decrementar'), p(': () => --count,\n    '),
          fn('valor'), p(':      () => count,\n  };\n}\n\n'),
          kw('const'), p(' c = '), fn('crearContador'), p('('), nm('10'), p(');\n'),
          p('c.'), fn('incrementar'), p('(); '), cm('// 11'), p('\n'),
          p('c.'), fn('valor'), p('();      '), cm('// 11 — recuerda el estado'),
        )} />
        <Section>Patrón Módulo con IIFE</Section>
        <Note>El patrón módulo usa closures para crear estado privado y exponer solo una API pública, simulando encapsulamiento antes de que existieran las clases.</Note>
        <Code spans={c(
          kw('const'), p(' '), cl('Store'), p(' = (() => {\n  '),
          kw('let'), p(' _state = { count: '), nm('0'), p(' };\n  '),
          kw('return'), p(' {\n    '),
          fn('getState'), p(': ()  => ({ ..._state }),\n    '),
          fn('increment'), p(': () => { _state.count++; },\n  };\n})();'),
        )} />
      </div>
    ),
  },
];
