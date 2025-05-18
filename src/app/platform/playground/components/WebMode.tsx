import { CSSIcon, HTML5Icon, JSIcon, ReactIcon, TSIcon } from "@/app/components/Icons"
import { Editor } from "@monaco-editor/react"
import { Check, CircleChevronDown, Copy, CopyCheck, Download, Edit2, Ellipsis, EllipsisVertical, FileCode, FileText, Loader, Maximize2, Minimize2, Play, Plus, RectangleEllipsis, RefreshCcw, Save, SquareChevronDown, Terminal, TrashIcon, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// Definir tipos para los archivos
interface FileData {
  id: string
  name: string
  content: string
  language: string
  type: string
  extension: string
}


export const WebMode = () => {
  const [useTailwind, setUseTailwind] = useState(false)
  // Referencias para el iframe y la consola
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const consoleRef = useRef<HTMLDivElement>(null)

  // Estado para el sistema de archivos
  const [files, setFiles] = useState<FileData[]>([
    {
      id: "html-1",
      name: "index.html",
      content: `<div class="container">
   <h1>Playground de Código</h1>
   <p>Edita el HTML, CSS y JavaScript para ver los cambios en tiempo real.</p>
   <button id="demo-button">Haz clic aquí</button>
   <div id="output"></div>
 </div>`,
      language: "html",
      type: "html-css-js",
      extension: "html"
    },
    {
      id: "css-1",
      name: "styles.css",
      content: `body {
   font-family: system-ui, sans-serif;
   line-height: 1.5;
   padding: 2rem;
 }
 
 .container {
   max-width: 800px;
   margin: 0 auto;
   padding: 2rem;
   border-radius: 8px;
   background-color: #f9fafb;
   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
 }
 
 h1 {
   color: #111827;
   margin-bottom: 1rem;
 }
 
 p {
   color: #4b5563;
   margin-bottom: 1.5rem;
 }
 
 button {
   background-color: #3b82f6;
   color: white;
   border: none;
   padding: 0.5rem 1rem;
   border-radius: 4px;
   cursor: pointer;
   transition: background-color 0.2s;
   margin-right: 0.5rem;
   margin-bottom: 0.5rem;
 }
 
 button:hover {
   background-color: #2563eb;
 }
 
 #output {
   margin-top: 1rem;
   padding: 1rem;
   background-color: #f3f4f6;
   border-radius: 4px;
   min-height: 2rem;
 }
  `,
      language: "css",
      type: "html-css-js",
      extension: "css"
    }, {
      id: "html-2",
      name: "index.html",
      content: `<div class="container">
   <h1>Playground de Código</h1>
   <p>Edita el HTML, CSS y TypeScript para ver los cambios en tiempo real.</p>
   <button id="demo-button">Haz clic aquí</button>
   <div id="output"></div>
 </div>`,
      language: "html",
      type: "html-css-ts",
      extension: "html"
    },
    {
      id: "css-2",
      name: "styles.css",
      content: `body {
   font-family: system-ui, sans-serif;
   line-height: 1.5;
   padding: 2rem;
 }
 
 .container {
   max-width: 800px;
   margin: 0 auto;
   padding: 2rem;
   border-radius: 8px;
   background-color: #f9fafb;
   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
 }
 
 h1 {
   color: #111827;
   margin-bottom: 1rem;
 }
 
 p {
   color: #4b5563;
   margin-bottom: 1.5rem;
 }
 
 button {
   background-color: #3b82f6;
   color: white;
   border: none;
   padding: 0.5rem 1rem;
   border-radius: 4px;
   cursor: pointer;
   transition: background-color 0.2s;
   margin-right: 0.5rem;
   margin-bottom: 0.5rem;
 }
 
 button:hover {
   background-color: #2563eb;
 }
 
 #output {
   margin-top: 1rem;
   padding: 1rem;
   background-color: #f3f4f6;
   border-radius: 4px;
   min-height: 2rem;
 }
  `,
      language: "css",
      type: "html-css-ts",
      extension: "css"
    },
    {
      id: "js-1",
      name: "script.js",
      content: `// Ejemplo de código JavaScript
 document.getElementById('demo-button').addEventListener('click', function() {
   // Mostrar un mensaje en el div de salida
   const outputDiv = document.getElementById('output');
   outputDiv.innerHTML = 'Botón clickeado a las: ' + new Date().toLocaleTimeString();
   
   // También podemos usar console.log para ver mensajes en la consola
   console.log('Botón clickeado!');
   console.info('Esto es un mensaje informativo');
   console.warn('Esto es una advertencia');
   console.error('Esto es un error');
   
   // Podemos mostrar objetos
   const persona = { 
     nombre: 'Juan', 
     edad: 30,
     profesion: 'Desarrollador'
   };
   console.log('Datos de la persona:', persona);
   
   // O arrays
   const numeros = [1, 2, 3, 4, 5];
   console.log('Lista de números:', numeros);
   
   // También podemos medir tiempo
   console.time('Bucle');
   let suma = 0;
   for(let i = 0; i < 1000000; i++) {
     suma += i;
   }
   console.timeEnd('Bucle');
   console.log('La suma es:', suma);
 });`,
      language: "javascript",
      type: "html-css-js",
      extension: "js"
    },
    {
      id: "ts-1",
      name: "script.ts",
      content: `// Ejemplo de código TypeScript
 interface Persona {
   nombre: string;
   edad: number;
   profesion: string;
 }
 
 function saludar(persona: Persona): string {
   return \`Hola, \${persona.nombre}! Tienes \${persona.edad} años y eres \${persona.profesion}.\`;
 }
 
 // Crear un objeto que cumple con la interfaz Persona
 const usuario: Persona = {
   nombre: "Ana",
   edad: 28,
   profesion: "Ingeniera"
 };
 
 // Usar la función y mostrar el resultado
 console.log(saludar(usuario));
 
 // Ejemplo de array tipado
 const numeros: number[] = [1, 2, 3, 4, 5];
 console.log("Suma de números:", numeros.reduce((a, b) => a + b, 0));
 
 // Ejemplo de genéricos
 function primerElemento<T>(arr: T[]): T | undefined {
   return arr.length > 0 ? arr[0] : undefined;
 }
 
 console.log("Primer número:", primerElemento(numeros));
 console.log("Primer string:", primerElemento(["TypeScript", "es", "genial"]));`,
      language: "typescript",
      type: "html-css-ts",
      extension: "ts"
    },
    {
      id: "react-js-1",
      name: "App.jsx",
      content: `// Ejemplo de componente React con JavaScript
 function App() {
   const [count, setCount] = React.useState(0);
   const [todos, setTodos] = React.useState([
     { id: 1, text: "Aprender React", completed: true },
     { id: 2, text: "Crear una aplicación", completed: false },
     { id: 3, text: "Desplegar el proyecto", completed: false }
   ]);
 
   const handleIncrement = () => {
     setCount(prevCount => prevCount + 1);
   };
 
   const toggleTodo = (id) => {
     setTodos(prevTodos => 
       prevTodos.map(todo => 
         todo.id === id ? { ...todo, completed: !todo.completed } : todo
       )
     );
   };
 
   const addTodo = () => {
     const text = prompt("Añadir nueva tarea:");
     if (text) {
       setTodos(prevTodos => [
         ...prevTodos, 
         { id: Date.now(), text, completed: false }
       ]);
     }
   };
 
   return (
     <div className="container">
       <h1>React Demo</h1>
       
       <div className="card">
         <h2>Contador: {count}</h2>
         <button onClick={handleIncrement}>Incrementar</button>
       </div>
       
       <div className="card">
         <h2>Lista de Tareas</h2>
         <ul>
           {todos.map(todo => (
             <li 
               key={todo.id} 
               onClick={() => toggleTodo(todo.id)}
               style={{ 
                 textDecoration: todo.completed ? 'line-through' : 'none',
                 cursor: 'pointer'
               }}
             >
               {todo.text}
             </li>
           ))}
         </ul>
         <button onClick={addTodo}>Añadir Tarea</button>
       </div>
       
       <p className="info">Haz clic en una tarea para marcarla como completada</p>
     </div>
   );
 }
 
 // Renderizar el componente en el DOM
 ReactDOM.render(<App />, document.getElementById('root'));`,
      language: "javascript",
      type: "react-js",
      extension: "jsx"
    },
    {
      id: "react-ts-1",
      name: "App.tsx",
      content: `// Ejemplo de componente React con TypeScript
 interface Todo {
   id: number;
   text: string;
   completed: boolean;
 }
 
 function App(): JSX.Element {
   const [count, setCount] = React.useState<number>(0);
   const [todos, setTodos] = React.useState<Todo[]>([
     { id: 1, text: "Aprender React con TypeScript", completed: true },
     { id: 2, text: "Crear una aplicación tipada", completed: false },
     { id: 3, text: "Desplegar el proyecto", completed: false }
   ]);
 
   const handleIncrement = (): void => {
     setCount(prevCount => prevCount + 1);
   };
 
   const toggleTodo = (id: number): void => {
     setTodos(prevTodos => 
       prevTodos.map(todo => 
         todo.id === id ? { ...todo, completed: !todo.completed } : todo
       )
     );
   };
 
   const addTodo = (): void => {
     const text = prompt("Añadir nueva tarea:");
     if (text) {
       setTodos(prevTodos => [
         ...prevTodos, 
         { id: Date.now(), text, completed: false }
       ]);
     }
   };
 
   return (
     <div className="container">
       <h1>React con TypeScript Demo</h1>
       
       <div className="card">
         <h2>Contador: {count}</h2>
         <button onClick={handleIncrement}>Incrementar</button>
       </div>
       
       <div className="card">
         <h2>Lista de Tareas</h2>
         <ul>
           {todos.map(todo => (
             <li 
               key={todo.id} 
               onClick={() => toggleTodo(todo.id)}
               style={{ 
                 textDecoration: todo.completed ? 'line-through' : 'none',
                 cursor: 'pointer'
               }}
             >
               {todo.text}
             </li>
           ))}
         </ul>
         <button onClick={addTodo}>Añadir Tarea</button>
       </div>
       
       <p className="info">Haz clic en una tarea para marcarla como completada</p>
     </div>
   );
 }
 
 // Renderizar el componente en el DOM
 ReactDOM.render(<App />, document.getElementById('root'));`,
      language: "typescript",
      type: "react-ts",
      extension: "tsx"
    },
    {
      id: "css-3",
      name: "styles.css",
      content: `body {
   font-family: system-ui, sans-serif;
   line-height: 1.5;
   padding: 2rem;
 }
 
 .container {
   max-width: 800px;
   margin: 0 auto;
   padding: 2rem;
   border-radius: 8px;
   background-color: #f9fafb;
   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
 }
 
 h1 {
   color: #111827;
   margin-bottom: 1rem;
 }
  
 
 button {
   background-color: #3b82f6;
   color: white;
   border: none;
   padding: 0.5rem 1rem;
   border-radius: 4px;
   cursor: pointer;
   transition: background-color 0.2s;
   margin-right: 0.5rem;
   margin-bottom: 0.5rem;
 }
 
 button:hover {
   background-color: #2563eb;
 }
 
 
 
 .card {
   background-color: #ffffff;
   border-radius: 8px;
   padding: 1.5rem;
   margin-bottom: 1.5rem;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
 }
 
 .card h2 {
   margin-top: 0;
   margin-bottom: 1rem;
   color: #1f2937;
 }
 
 ul {
   padding-left: 1.5rem;
   margin-bottom: 1.5rem;
 }
 
 li {
   margin-bottom: 0.5rem;
 }
 
 .info {
   font-size: 0.875rem;
   color: #6b7280;
   font-style: italic;
 }`,
      language: "css",
      type: "react-ts",
      extension: "css"
    },
    {
      id: "css-4",
      name: "styles.css",
      content: `body {
   font-family: system-ui, sans-serif;
   line-height: 1.5;
   padding: 2rem;
 }
 
 .container {
   max-width: 800px;
   margin: 0 auto;
   padding: 2rem;
   border-radius: 8px;
   background-color: #f9fafb;
   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
 }
 
 h1 {
   color: #111827;
   margin-bottom: 1rem;
 }
  
 
 button {
   background-color: #3b82f6;
   color: white;
   border: none;
   padding: 0.5rem 1rem;
   border-radius: 4px;
   cursor: pointer;
   transition: background-color 0.2s;
   margin-right: 0.5rem;
   margin-bottom: 0.5rem;
 }
 
 button:hover {
   background-color: #2563eb;
 }
 
 
 
 .card {
   background-color: #ffffff;
   border-radius: 8px;
   padding: 1.5rem;
   margin-bottom: 1.5rem;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
 }
 
 .card h2 {
   margin-top: 0;
   margin-bottom: 1rem;
   color: #1f2937;
 }
 
 ul {
   padding-left: 1.5rem;
   margin-bottom: 1.5rem;
 }
 
 li {
   margin-bottom: 0.5rem;
 }
 
 .info {
   font-size: 0.875rem;
   color: #6b7280;
   font-style: italic;
 }`,
      language: "css",
      type: "react-js",
      extension: "css"
    },

  ])

  // Estado para el archivo actualmente seleccionado
  const [currentFileId, setCurrentFileId] = useState<string>("html-1")


  // Añadir estado para el modo web actual
  const [webMode, setWebMode] = useState("html-css-js")

  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [consoleOutput, setConsoleOutput] = useState<{ type: string; content: string }[]>([])
  const [isConsoleMaximized, setIsConsoleMaximized] = useState(false)
  const [isEditorMaximized, setIsEditorMaximized] = useState(false)
  const [editorHeight, setEditorHeight] = useState("400px")
  const [toast, setToast] = useState({
    title: "",
    description: "",
    variant: "info",
    open: false,

  })


  // Obtener el archivo actual
  const currentFile = files.find((file) => file.id === currentFileId) || files[0]

  console.log(currentFile)

  // Función para actualizar el contenido del archivo actual
  const updateCurrentFile = (content: string) => {
    setFiles(
      files.map((file) => {
        if (file.id === currentFileId) {
          return { ...file, content }
        }
        return file
      }),
    )
  }

  const timeOutToast = () => {
    setTimeout(() => {
      setToast({
        title: "",
        description: "",
        variant: "info",
        open: false,
      })
    }, 5000)
  }


  // Modificar la función updateOutput para incluir React y múltiples archivos
  const updateOutput = () => {
    // Inyectamos un script para capturar los console.log
    const consoleCapture = `
 <script>
   // Guardamos las funciones originales
   const originalConsole = {
     log: console.log,
     info: console.info,
     warn: console.warn,
     error: console.error,
     clear: console.clear,
     time: console.time,
     timeEnd: console.timeEnd
   };
 
   // Sobrescribimos las funciones de console
   console.log = function() {
     // Llamamos a la función original
     originalConsole.log.apply(console, arguments);
     // Enviamos los argumentos al padre
     window.parent.postMessage({
       type: 'console-log',
       content: Array.from(arguments).map(arg => 
         typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
       ).join(' ')
     }, '*');
   };
 
   console.info = function() {
     originalConsole.info.apply(console, arguments);
     window.parent.postMessage({
       type: 'console-info',
       content: Array.from(arguments).map(arg => 
         typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
       ).join(' ')
     }, '*');
   };
 
   console.warn = function() {
     originalConsole.warn.apply(console, arguments);
     window.parent.postMessage({
       type: 'console-warn',
       content: Array.from(arguments).map(arg => 
         typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
       ).join(' ')
     }, '*');
   };
 
   console.error = function() {
     originalConsole.error.apply(console, arguments);
     window.parent.postMessage({
       type: 'console-error',
       content: Array.from(arguments).map(arg => 
         typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
       ).join(' ')
     }, '*');
   };
 
   console.clear = function() {
     originalConsole.clear.apply(console, arguments);
     window.parent.postMessage({
       type: 'console-clear',
       content: ''
     }, '*');
   };
 
   console.time = function(label) {
     originalConsole.time.apply(console, arguments);
     window.parent.postMessage({
       type: 'console-info',
       content: 'Timer started: ' + label
     }, '*');
   };
 
   console.timeEnd = function(label) {
     originalConsole.timeEnd.apply(console, arguments);
     window.parent.postMessage({
       type: 'console-info',
       content: 'Timer ended: ' + label
     }, '*');
   };
 
   // Capturar errores no controlados
   window.addEventListener('error', function(e) {
     window.parent.postMessage({
       type: 'console-error',
       content: 'Error: ' + e.message + ' at line ' + e.lineno + ', column ' + e.colno
       }, '*');
       return false;
     });
   </script>
   `

    // Si estamos en modo web, generamos el HTML combinado

    if (webMode === "html-css-js" || webMode === "html-css-ts") {
      // Obtener el contenido de los archivos HTML, CSS y JS/TS
      const htmlFiles = files.filter((file) => file.extension === "html" && file.type === webMode)
      const cssFiles = files.filter((file) => file.extension === "css" && file.type === webMode)
      const scriptFiles = files.filter((file) => file.extension === (webMode === "html-css-js" ? "js" : "ts"))

      // Usar el primer archivo de cada tipo si no hay ninguno seleccionado
      const htmlContent = htmlFiles.length > 0 ? htmlFiles[0].content : ""
      const cssContent = cssFiles.length > 0 ? cssFiles.map((file) => file.content).join("\n") : ""
      const scriptContent = scriptFiles.length > 0 ? scriptFiles[0].content : ""
      const scriptType = webMode === "html-css-js" ? "javascript" : "text/typescript"
      console.log(scriptContent)
      const combinedOutput = `
       <!DOCTYPE html>
       <html>
       <head>
         <style>${cssContent}</style>
         ${useTailwind ? '<script src="https://cdn.tailwindcss.com"></script>' : ""}
         ${consoleCapture}
         ${webMode === "html-css-ts" ? '<script src="https://cdn.jsdelivr.net/npm/typescript@latest/lib/typescript.min.js"></script>' : ""}
       </head>
       <body>
         ${htmlContent}
         <script ${webMode === "html-css-ts" ? 'type="text/typescript"' : ""}>
         ${scriptContent}
         </script>
         ${webMode === "html-css-ts"
          ? `
         <script>
           // Compilar TypeScript
           var source = document.querySelector('script[type="text/typescript"]').textContent;
           var result = ts.transpileModule(source, {
             compilerOptions: {
               target: ts.ScriptTarget.ES2015,
               module: ts.ModuleKind.None
             }
           });
 
           // Ejecutar el JavaScript resultante
           var script = document.createElement('script');
           script.textContent = result.outputText;
           document.body.appendChild(script);
         </script>
         `
          : ""
        }
       </body>
       </html>
     `
      setOutput(combinedOutput)
    } else if (webMode === "react-js" || webMode === "react-ts") {
      // Para React, necesitamos incluir las bibliotecas React y ReactDOM
      const reactFiles = files.filter((file) => file.type === webMode)
      const cssFiles = files.filter((file) => file.extension === "css" && file.type === webMode)

      // Encontrar el archivo principal (App.jsx o App.tsx)
      const mainFile = reactFiles.find((file) => file.name.toLowerCase().includes("app")) || reactFiles[0]

      // Combinar CSS
      const cssContent = cssFiles.length > 0 ? cssFiles.map((file) => file.content).join("\n") : ""

      const isTypeScript = webMode === "react-ts"

      // Procesar los archivos para manejar importaciones

      const combinedOutput = `
         <!DOCTYPE html>
         <html>
         <head>
           <style>${cssContent}</style>
           ${useTailwind ? '<script src="https://cdn.tailwindcss.com"></script>' : ""}
           ${consoleCapture}
           <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
           <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
           <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
           ${isTypeScript ? '<script src="https://cdn.jsdelivr.net/npm/typescript@latest/lib/typescript.min.js"></script>' : ""} 
         </head>
         <body>
           <div id="root"></div>
           
          
           
           <script type="${isTypeScript ? "text/typescript" : "text/babel"}">
           ${mainFile.content}
           </script>
           
           ${isTypeScript
          ? `
           <script>
             // Compilar TypeScript con soporte para JSX
             var sources = document.querySelectorAll('script[type="text/typescript"]');
             sources.forEach(function(sourceElement) {
               var source = sourceElement.textContent;
               var result = ts.transpileModule(source, {
                 compilerOptions: {
                   target: ts.ScriptTarget.ES2015,
                   module: ts.ModuleKind.None,
                   jsx: ts.JsxEmit.React
                 }
               });
 
               // Ejecutar el JavaScript resultante con Babel para JSX
               var script = document.createElement('script');
               script.type = 'text/babel';
               script.textContent = result.outputText;
               document.body.appendChild(script);
             });
           </script>
           `
          : ""
        }
         </body>
         </html>
       `
      setOutput(combinedOutput)
    }

  }


  // Modificar el handleRun para manejar ambos modos
  const handleRun = () => {
    // Limpiar la consola
    setConsoleOutput([])


    // Actualizar el iframe para modo web
    if (iframeRef.current) {
      iframeRef.current.srcdoc = output
    }


    setToast({
      title: "Código ejecutado",
      description: "El código se ha ejecutado correctamente.",
      variant: "info",
      open: true,
    })
    timeOutToast()
  }

  // Escuchar mensajes del iframe (para la consola)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type && event.data.type.startsWith("console-")) {
        const { type, content } = event.data
        setConsoleOutput((prev) => [...prev, { type, content }])

        // Auto-scroll de la consola
        if (consoleRef.current) {
          setTimeout(() => {
            consoleRef.current!.scrollTop = consoleRef.current!.scrollHeight
          }, 0)
        }
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  // Actualizar el output cuando cambie el código
  useEffect(() => {
    updateOutput()
  }, [files, webMode, currentFileId, useTailwind])

  // Actualizar el modo web según el tipo de archivo seleccionado
  useEffect(() => {
    const file = files.find((f) => f.id === currentFileId)
    if (file) {
      if (file.type === "html" || file.type === "css" || file.type === "js") {
        setWebMode("html-css-js")
      } else if (file.type === "ts") {
        setWebMode("html-css-ts")
      } else if (file.type === "react-js") {
        setWebMode("react-js")
      } else if (file.type === "react-ts") {
        setWebMode("react-ts")
      }
    }
  }, [currentFileId])

  // Copiar el código completo
  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)

    setToast({
      title: "Código copiado",
      description: "El código HTML completo se ha copiado al portapapeles.",
      variant: "info",
      open: true,
    })
    timeOutToast()
  }

  // Descargar el código como archivo HTML
  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "playground.html"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setToast({
      title: "Archivo descargado",
      description: "El archivo HTML se ha descargado correctamente.",
      variant: "info",
      open: true,
    })
    timeOutToast()
  }

  // Limpiar todo el código
  const handleClear = () => {
    if (confirm("¿Estás seguro de que quieres borrar todo el código?")) {
      // Limpiar el contenido del archivo actual
      setFiles(
        files.map((file) => {
          if (file.id === currentFileId) {
            return { ...file, content: "" }
          }
          return file
        }),
      )
      setConsoleOutput([])
    }
  }

  // Guardar en localStorage
  const handleSave = () => {
    try {
      localStorage.setItem("playground-files", JSON.stringify(files))

      setToast({
        title: "Proyecto guardado",
        description: "Tu código se ha guardado en el navegador.",
        variant: "success",
        open: true,
      })
      timeOutToast()
    } catch (error) {
      setToast({
        title: "Error al guardar",
        description: "No se pudo guardar el código. Es posible que el almacenamiento esté lleno.",
        variant: "error",
        open: true,
      })
    }
  }

  // Cargar desde localStorage
  const handleLoad = () => {
    try {
      const savedFiles = localStorage.getItem("playground-files")
      if (savedFiles) {
        setFiles(JSON.parse(savedFiles))
        setCurrentFileId(JSON.parse(savedFiles)[0].id)
      }

      setToast({
        title: "Proyecto cargado",
        description: "Tu código guardado se ha cargado correctamente.",
        variant: "success",
        open: true,
      })
      timeOutToast()
    } catch (error) {
      setToast({
        title: "Error al cargar",
        description: "No se pudo cargar el código guardado.",
        variant: "error",
        open: true,
      })
      timeOutToast()
    }
  }


  // Renderizar el tipo de consola
  const renderConsoleItem = (item: { type: string; content: string }, index: number) => {
    let className = "text-gray-400"
    let icon = null

    switch (item.type) {
      case "console-log":
        className = "text-gray-400"
        icon = <span className="text-blue-500 mr-1">›</span>
        break
      case "console-info":
        className = "text-blue-500"
        icon = <span className="text-blue-500 mr-1">ℹ</span>
        break
      case "console-warn":
        className = "text-yellow-500"
        icon = <span className="text-yellow-500 mr-1">⚠</span>
        break
      case "console-error":
        className = "text-red-500"
        icon = <span className="text-red-500 mr-1">✖</span>
        break
      case "console-clear":
        return null
    }

    return (
      <div key={index} className={`${className} text-xs py-0.5 font-extralight`} style={{ fontFamily: "consolas" }}>
        {icon}
        {item.content}
      </div>
    )
  }

  // Limpiar la consola
  const clearConsole = () => {
    setConsoleOutput([])
  }

  // Obtener el icono para el tipo de archivo
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "html":
        return <HTML5Icon className="h-5 w-5 text-orange-500" />
      case "css":
        return <CSSIcon className="h-5 w-5 text-blue-500" />
      case "css":
        return <CSSIcon className="h-5 w-5 text-blue-500" />
      case "js":
        return <JSIcon className="h-5 w-5 text-yellow-500" />
      case "ts":
        return <TSIcon className="h-5 w-5 text-blue-600" />
      case "jsx":
        return <ReactIcon className="h-5 w-5 text-cyan-500" />
      case "tsx":
        return <ReactIcon className="h-5 w-5 text-cyan-600" />
      case "python":
        return <FileCode className="h-5 w-5 text-green-500" />
      case "csharp":
        return <FileCode className="h-5 w-5 text-purple-500" />
      case "java":
        return <FileCode className="h-5 w-5 text-red-500" />
      default:
        return <FileCode className="h-5 w-5" />
    }
  }



  return (
    <div className="flex flex-col gap-2">

      <div className="flex border-b-1 border-(--color-gray-700)">
        <div className="tabs w-full tabs-border" role="tablist"  >
          <button role="tab" className={`tab [--tab-border-color:gray] [--tab-bg:#1D232A] ${webMode === 'html-css-js' ? 'tab-active' : ''}`} onClick={() => setWebMode('html-css-js')}>HTML/CSS/JS</button>
          <button role="tab" className={`tab [--tab-border-color:gray] [--tab-bg:#1D232A] ${webMode === 'html-css-ts' ? 'tab-active' : ''}`} onClick={() => setWebMode('html-css-ts')}>HTML/CSS/TS</button>
          <button role="tab" className={`tab [--tab-border-color:gray] [--tab-bg:#1D232A] ${webMode === 'react-js' ? 'tab-active' : ''}`} onClick={() => setWebMode('react-js')}>React JS</button>
          <button role="tab" className={`tab [--tab-border-color:gray] [--tab-bg:#1D232A] ${webMode === 'react-ts' ? 'tab-active' : ''}`} onClick={() => setWebMode('react-ts')}>React TS</button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <div>
            <div className="flex justify-between gap-2 mb-2">
              <label className="label">
                <input
                  type="checkbox"
                  className="toggle toggle-info"
                  checked={useTailwind}
                  onChange={() => setUseTailwind(!useTailwind)}
                />
                {useTailwind ? "Tailwind" : "CSS"}
              </label>
              <div className="flex gap-2">
                <div className="dropdown dropdown-start">
                  <div tabIndex={0} role="button" className="btn btn-sm"><EllipsisVertical className="size-5" /></div>
                  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li><button className="btn btn-sm btn-ghost justify-start gap-4">
                      {copied ? (
                        <Check className="size-4" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                      {copied ? "Copiado" : "Copiar HTML"}</button>
                    </li>
                    <li>
                      <button className="btn btn-sm btn-ghost justify-start gap-4">
                        <Download className="size-4" />
                        Descargar
                      </button>
                    </li>
                    <li>
                      <button className="btn btn-sm btn-ghost justify-start gap-4">
                        <RefreshCcw className="size-4" />
                        Cargar
                      </button>
                    </li>
                    <li>
                      <button className="btn btn-sm btn-ghost justify-start gap-4">
                        <TrashIcon className="size-4" />
                        Limpiar
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-1 border-(--color-gray-700) border-b-0 rounded-t-sm  overflow-hidden overflow-y-auto">
              <div className="flex flex-row divide-x divide-(--color-gray-500) max-w-max">
                {/* Mostrar archivos según el modo actual */}
                {files.filter((file) => file.type === webMode).map((file) => (
                  <div
                    key={file.id}
                    className={`flex w-[150px] items-center justify-between px-2 py-1.5 cursor-pointer transition-all duration-100 border-r-1 border-(--color-gray-700) rounded-t-xs ${currentFileId === file.id ? "bg-(--color-gray-600) text-gray-100 border-b-2 border-b-(--color-secondary)" : "bg-(--color-gray-800) hover:bg-gray-600 text-gray-400 hover:text-gray-100 border-b-2 border-(--color-gray-700)"}`}
                    onClick={() => setCurrentFileId(file.id)}>
                    <div className="flex items-center gap-2">
                      {getFileIcon(file.extension)}
                      <span className="text-sm">{file.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`border-1 border-(--color-gray-700) rounded-b-sm overflow-hidden ${isEditorMaximized ? "h-[70vh]" : ""}`}>
              {currentFile && (
                <Editor
                  height={isEditorMaximized ? "70vh" : editorHeight}
                  language={currentFile.language}
                  value={currentFile.content}
                  onChange={(value) => updateCurrentFile(value || "")}
                  theme={'vs-dark'}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: "on",
                    automaticLayout: true,
                    tabSize: 2,
                    scrollBeyondLastLine: false,
                    lineNumbers: "on",
                    glyphMargin: false,
                    folding: true,
                    lineDecorationsWidth: 10,
                    formatOnType: true,
                    formatOnPaste: true,
                  }}
                  onMount={async (editor, monaco) => {
                    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
                      target: monaco.languages.typescript.ScriptTarget.Latest,
                      allowNonTsExtensions: true,
                      moduleResolution:
                        monaco.languages.typescript.ModuleResolutionKind.NodeJs,
                      module: monaco.languages.typescript.ModuleKind.CommonJS,
                      noEmit: true,
                      esModuleInterop: true,
                      jsx: monaco.languages.typescript.JsxEmit.React,
                      reactNamespace: 'React',
                      allowJs: true,
                      typeRoots: ['node_modules/@types'],
                    })

                    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
                      noSemanticValidation: true,
                      noSyntaxValidation: true,
                    })



                    monaco.editor.createModel(
                      currentFile.content,
                      'typescript',
                      monaco.Uri.parse('file:///App.tsx'),
                    )
                  }}
                />
              )}
            </div>
          </div>



          {!isEditorMaximized && (
            <div className="border-1 border-(--color-gray-700) rounded-sm">
              <div className="bg-base-200 flex items-center justify-between px-2 rounded-t-sm">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-tech-cyan" />
                  <h3 className="text-sm font-medium">Consola</h3>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={clearConsole} className="btn btn-ghost btn-sm">
                    Limpiar
                  </button>
                </div>
              </div>
              <div
                ref={consoleRef}
                className={`bg-neutral backdrop-blur-sm rounded-b-sm p-2 overflow-auto ${isConsoleMaximized ? "h-[300px]" : "h-[200px]"
                  }`}
              >
                {consoleOutput.length > 0 ? (
                  consoleOutput.map((item, index) => renderConsoleItem(item, index))
                ) : (
                  <div className="text-muted-foreground text-xs text-gray-400 p-2" style={{ fontFamily: "consolas" }}>
                    La consola está vacía. Usa console.log() en tu código JavaScript para ver mensajes aquí.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 h-[calc(100vh-200px)]">
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={handleRun} className="btn btn-success btn-sm">
              <Play className="size-4" />
              Ejecutar
            </button>
          </div>
          <div className="bg-white dark:bg-zinc-800 border border-(--color-gray-700) rounded-sm overflow-hidden h-[calc(100vh-200px)]">
            <div className="px-2 py-1.5 bg-gray-800 backdrop-blur-sm border-b border-(--color-gray-700) flex items-center">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="mx-auto text-sm font-light text-muted-foreground">Vista previa</div>
            </div>

            <iframe
              ref={iframeRef}
              srcDoc={output}
              title="preview"
              className="w-full h-[calc(100%-32px)] border-none"
              sandbox="allow-scripts"
            ></iframe>

          </div>
        </div>
      </div>
    </div>
  )
}