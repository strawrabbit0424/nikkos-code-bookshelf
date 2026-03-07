import { ChapterHeader, Section, Note, Tip, Code, Row, c, p, kw, fn, s, cm, cl, nm } from '../../components/PageTemplate';

export const reactPages = [
  {
    title: 'Componentes y Props',
    content: (
      <div>
        <ChapterHeader num="Capítulo I" title="React" sub="Componentes · Props · Estado · JSX" />
        <Note>React construye interfaces como un árbol de componentes. Cada componente es una función que recibe props y retorna JSX. Los componentes se reutilizan pasando diferentes props.</Note>
        <Section>Componente funcional con props tipadas</Section>
        <Code spans={c(
          kw('type'), p(' '), cl('BtnProps'), p(' = {\n  texto:    '), cl('string'), p(';\n  onClick:  () => '), cl('void'), p(';\n  disabled?: '), cl('boolean'), p(';\n};\n\n'),
          kw('function'), p(' '), cl('Boton'), p('({ texto, onClick, disabled = '), kw('false'), p(' }: '), cl('BtnProps'), p(') {\n'),
          p('  '), kw('return'), p(' (\n'),
          p('    <button onClick={onClick} disabled={disabled}\n'),
          p('      className="px-4 py-2 bg-blue-600 text-white rounded">\n'),
          p('      {texto}\n    </button>\n  );\n}\n\n'),
          cm('// Usar el componente:'), p('\n'),
          p('<'), cl('Boton'), p(' texto='), s('"Guardar"'), p(' onClick={() => '), fn('guardar'), p('()} />'),
        )} />
        <Tip>Los nombres de componentes deben empezar con mayúscula para que JSX los distinga de etiquetas HTML nativas. Por eso Boton es un componente y button es HTML.</Tip>
      </div>
    ),
  },
  {
    title: 'useState',
    content: (
      <div>
        <Note>useState guarda datos que, al cambiar, provocan que React vuelva a renderizar el componente. Nunca mutar el estado directamente — siempre usar la función setter.</Note>
        <Section>Patrones comunes de useState</Section>
        <Code spans={c(
          cm('// primitivos'), p('\n'),
          kw('const'), p(' [count,   setCount]   = '), fn('useState'), p('('), nm('0'), p(');\n'),
          kw('const'), p(' [activo,  setActivo]  = '), fn('useState'), p('('), kw('false'), p(');\n'),
          kw('const'), p(' [nombre,  setNombre]  = '), fn('useState'), p('('), s("''"), p(');\n\n'),
          cm('// objeto (siempre crear nuevo objeto)'), p('\n'),
          kw('const'), p(' [form, setForm] = '), fn('useState'), p('({ nombre: '), s("''"), p(', email: '), s("''"), p(' });\n'),
          p('setForm(prev => ({ ...prev, nombre: '), s("'Ana'"), p(' }));\n\n'),
          cm('// array (siempre crear nuevo array)'), p('\n'),
          kw('const'), p(' [items, setItems] = '), fn('useState'), p('<'), cl('string'), p('[]>([]);\n'),
          p('setItems(prev => [...prev, '), s("'nuevo item'"), p(']);\n'),
          p('setItems(prev => prev.'), fn('filter'), p('(i => i !== '), s("'borrar'"), p('));'),
        )} />
        <Tip>Al actualizar estado basado en el anterior, usar la forma funcional: setCount(prev {'=> prev + 1'}). Esto evita bugs de estado obsoleto (stale state) en closures.</Tip>
      </div>
    ),
  },
  {
    title: 'useEffect',
    content: (
      <div>
        <Note>useEffect sincroniza el componente con sistemas externos (APIs, timers, suscripciones). Se ejecuta después de renderizar. El array de dependencias controla cuándo se vuelve a ejecutar.</Note>
        <Section>Casos de uso principales</Section>
        <Code spans={c(
          cm('// al montar: array vacío []'), p('\n'),
          fn('useEffect'), p('(() => {\n  '), fn('cargarDatos'), p('();\n}, []);\n\n'),
          cm('// cuando cambia userId'), p('\n'),
          fn('useEffect'), p('(() => {\n  '), fn('cargarUsuario'), p('(userId);\n}, [userId]);\n\n'),
          cm('// con cleanup (cancelar suscripción, timer...)'), p('\n'),
          fn('useEffect'), p('(() => {\n  '),
          kw('const'), p(' id = '), fn('setInterval'), p('(() => '), fn('tick'), p('(), '), nm('1000'), p(');\n  '),
          kw('return'), p(' () => '), fn('clearInterval'), p('(id);  '), cm('// se llama al desmontar'), p('\n}, []);'),
        )} />
        <Tip>Si se omite el array de dependencias, el effect se ejecuta en cada render. Si el array está vacío, solo al montar y desmontar. Con dependencias, cuando alguna cambie.</Tip>
      </div>
    ),
  },
  {
    title: 'Custom Hooks',
    content: (
      <div>
        <Note>Un custom hook es una función que empieza con use y puede llamar a otros hooks. Sirve para extraer lógica reutilizable de los componentes, manteniendo el código limpio.</Note>
        <Section>useFetch — hook de peticiones HTTP</Section>
        <Code spans={c(
          kw('function'), p(' '), fn('useFetch'), p('<T>(url: '), cl('string'), p(') {\n  '),
          kw('const'), p(' [data,    setData]    = '), fn('useState'), p('<T | '), kw('null'), p('>('), kw('null'), p(');\n  '),
          kw('const'), p(' [loading, setLoading] = '), fn('useState'), p('('), kw('true'), p(');\n  '),
          kw('const'), p(' [error,   setError]   = '), fn('useState'), p('<'), cl('string'), p(' | '), kw('null'), p('>('), kw('null'), p(');\n\n  '),
          fn('useEffect'), p('(() => {\n    '),
          fn('fetch'), p('(url)\n      .'), fn('then'), p('(r => { '), kw('if'), p(' (!r.ok) '), kw('throw'), p(' r; '), kw('return'), p(' r.'), fn('json'), p('(); })\n      .'), fn('then'), p('(setData as '), kw('any'), p(')\n      .'), fn('catch'), p('(e => '), fn('setError'), p('(e.message))\n      .'), fn('finally'), p('(() => '), fn('setLoading'), p('('), kw('false'), p('));\n  }, [url]);\n\n  '),
          kw('return'), p(' { data, loading, error };\n}\n\n'),
          cm('// Usar en cualquier componente:'), p('\n'),
          kw('const'), p(' { data, loading } = '), fn('useFetch'), p('<'), cl('User'), p('[]>('), s("'/api/users'"), p(');'),
        )} />
      </div>
    ),
  },
  {
    title: 'Hooks avanzados',
    content: (
      <div>
        <ChapterHeader num="Capítulo II" title="Hooks avanzados" sub="useRef · useMemo · useCallback · useReducer" />
        <Section>useRef — referencia persistente</Section>
        <Note>useRef guarda un valor que persiste entre renders sin provocar un nuevo render al cambiar. También se usa para acceder directamente a nodos del DOM.</Note>
        <Code spans={c(
          kw('const'), p(' inputRef = '), fn('useRef'), p('<'), cl('HTMLInputElement'), p('>('), kw('null'), p(');\n\n'),
          cm('// enfocar el input programáticamente'), p('\n'),
          kw('const'), p(' '), fn('handleOpen'), p(' = () => inputRef.current?.'), fn('focus'), p('();\n\n'),
          p('<input ref={inputRef} type='), s('"text"'), p(' />\n\n'),
          cm('// guardar valor sin re-render (ej: timer ID)'), p('\n'),
          kw('const'), p(' timerId = '), fn('useRef'), p('<'), cl('ReturnType'), p('<typeof setInterval> | '), kw('null'), p('>('), kw('null'), p(');'),
        )} />
        <Section>useMemo y useCallback</Section>
        <Note>useMemo memoriza el resultado de un cálculo costoso. useCallback memoriza una función para evitar que los componentes hijos se re-rendericen innecesariamente.</Note>
        <Code spans={c(
          kw('const'), p(' filtrado = '), fn('useMemo'), p('(\n  () => items.'), fn('filter'), p('(i => i.activo && i.nombre.'), fn('includes'), p('(query)),\n  [items, query]  '), cm('// solo recalcula cuando items o query cambien'), p('\n);\n\n'),
          kw('const'), p(' '), fn('handleClick'), p(' = '), fn('useCallback'), p('(() => {\n  '), fn('procesarItem'), p('(id);\n}, [id]);  '), cm('// nueva función solo cuando id cambie'),
        )} />
      </div>
    ),
  },
  {
    title: 'Context API y patrones',
    content: (
      <div>
        <Note>Context API permite compartir estado entre componentes sin pasar props manualmente por cada nivel. Ideal para datos globales como usuario autenticado, tema o idioma.</Note>
        <Section>Crear y usar Context</Section>
        <Code spans={c(
          kw('type'), p(' '), cl('AuthCtx'), p(' = { user: '), cl('User'), p(' | '), kw('null'), p('; logout: () => '), cl('void'), p(' };\n'),
          kw('const'), p(' '), cl('AuthContext'), p(' = '), fn('createContext'), p('<'), cl('AuthCtx'), p(' | '), kw('null'), p('>('), kw('null'), p(');\n\n'),
          kw('export function'), p(' '), cl('AuthProvider'), p('({ children }) {\n  '),
          kw('const'), p(' [user, setUser] = '), fn('useState'), p('<'), cl('User'), p(' | '), kw('null'), p('>('), kw('null'), p(');\n  '),
          kw('const'), p(' logout = () => '), fn('setUser'), p('('), kw('null'), p(');\n  '),
          kw('return'), p(' <'), cl('AuthContext'), p('.Provider value={{ user, logout }}>\n    {children}\n  </'), cl('AuthContext'), p('.Provider>;\n}\n\n'),
          cm('// Consumir en cualquier componente hijo:'), p('\n'),
          kw('const'), p(' { user, logout } = '), fn('useContext'), p('('), cl('AuthContext'), p(')!;'),
        )} />
        <Tip>Dividir el Context en piezas pequeñas si el estado es grande. Un Context que cambia mucho provoca re-renders en todos los componentes que lo consuman.</Tip>
      </div>
    ),
  },
];
