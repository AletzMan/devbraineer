import { Editor } from "@monaco-editor/react"
import { Edit2, FileCode, FileText, Maximize2, Minimize2, Plus, Terminal, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// Definir tipos para los archivos
interface FileData {
    id: string
    name: string
    content: string
    language: string
    type: string
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
            type: "html",
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
 
 /* Estilos para React */
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
            type: "css",
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
            type: "js",
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
            type: "ts",
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
        },
        {
            id: "react-js-2",
            name: "Header.jsx",
            content: `// Componente Header para React
 function Header({ title }) {
   return (
     <header className="header">
       <h1>{title}</h1>
       <nav>
         <ul>
           <li><a href="#">Inicio</a></li>
           <li><a href="#">Acerca de</a></li>
           <li><a href="#">Contacto</a></li>
         </ul>
       </nav>
     </header>
   );
 }
 
 // Exportar el componente para usarlo en App.jsx
 // En un entorno real usaríamos: export default Header;`,
            language: "javascript",
            type: "react-js",
        },
        {
            id: "react-ts-2",
            name: "Header.tsx",
            content: `// Componente Header para React con TypeScript
 interface HeaderProps {
   title: string;
 }
 
 function Header({ title }: HeaderProps): JSX.Element {
   return (
     <header className="header">
       <h1>{title}</h1>
       <nav>
         <ul>
           <li><a href="#">Inicio</a></li>
           <li><a href="#">Acerca de</a></li>
           <li><a href="#">Contacto</a></li>
         </ul>
       </nav>
     </header>
   );
 }
 
 // Exportar el componente para usarlo en App.tsx
 // En un entorno real usaríamos: export default Header;`,
            language: "typescript",
            type: "react-ts",
        },
        {
            id: "python-1",
            name: "main.py",
            content: `# Ejemplo de código Python
 def factorial(n):
     """Calcula el factorial de un número"""
     if n == 0 or n == 1:
         return 1
     else:
         return n * factorial(n-1)
 
 # Calcular algunos factoriales
 for i in range(1, 6):
     print(f"El factorial de {i} es {factorial(i)}")
 
 # Ejemplo de listas
 numeros = [1, 2, 3, 4, 5]
 print("Lista original:", numeros)
 print("Lista al cuadrado:", [x**2 for x in numeros])
 
 # Ejemplo de diccionario
 persona = {
     "nombre": "María",
     "edad": 30,
     "profesion": "Científica de datos"
 }
 print("Información de la persona:")
 for clave, valor in persona.items():
     print(f"  {clave}: {valor}")
 
 # Ejemplo de manejo de excepciones
 try:
     resultado = 10 / 0
 except ZeroDivisionError:
     print("¡Error! No se puede dividir por cero.")
 finally:
     print("Este bloque siempre se ejecuta")`,
            language: "python",
            type: "python",
        },
        {
            id: "csharp-1",
            name: "Program.cs",
            content: `// Ejemplo de código C#
 using System;
 
 class Program
 {
     static void Main()
     {
         Console.WriteLine("¡Hola desde C#!");
         
         // Ejemplo de bucle for
         Console.WriteLine("\\nContando del 1 al 5:");
         for (int i = 1; i <= 5; i++)
         {
             Console.WriteLine($"Número: {i}");
         }
         
         // Ejemplo de array
         int[] numeros = { 10, 20, 30, 40, 50 };
         Console.WriteLine("\\nSuma de array: " + numeros.Sum());
         
         // Ejemplo de clase
         var persona = new Persona
         {
             Nombre = "Carlos",
             Edad = 35
         };
         
         Console.WriteLine($"\\nPersona: {persona.Nombre}, {persona.Edad} años");
         persona.Saludar();
     }
 }
 
 class Persona
 {
     public string Nombre { get; set; }
     public int Edad { get; set; }
     
     public void Saludar()
     {
         Console.WriteLine($"Hola, soy {Nombre} y tengo {Edad} años.");
     }
 }`,
            language: "csharp",
            type: "csharp",
        },
        {
            id: "java-1",
            name: "Main.java",
            content: `// Ejemplo de código Java
 public class Main {
     public static void main(String[] args) {
         System.out.println("¡Hola desde Java!");
         
         // Ejemplo de bucle for
         System.out.println("\\nContando del 1 al 5:");
         for (int i = 1; i <= 5; i++) {
             System.out.println("Número: " + i);
         }
         
         // Ejemplo de array
         int[] numeros = {10, 20, 30, 40, 50};
         int suma = 0;
         for (int num : numeros) {
             suma += num;
         }
         System.out.println("\\nSuma de array: " + suma);
         
         // Ejemplo de clase
         Persona persona = new Persona("Laura", 32);
         System.out.println("\\nPersona: " + persona.getNombre() + ", " + persona.getEdad() + " años");
         persona.saludar();
     }
 }
 
 class Persona {
     private String nombre;
     private int edad;
     
     public Persona(String nombre, int edad) {
         this.nombre = nombre;
         this.edad = edad;
     }
     
     public String getNombre() {
         return nombre;
     }
     
     public int getEdad() {
         return edad;
     }
     
     public void saludar() {
         System.out.println("Hola, soy " + nombre + " y tengo " + edad + " años.");
     }
 }`,
            language: "java",
            type: "java",
        },
    ])

    // Estado para el archivo actualmente seleccionado
    const [currentFileId, setCurrentFileId] = useState<string>("html-1")
    const [newFileName, setNewFileName] = useState<string>("")
    const [isNewFileDialogOpen, setIsNewFileDialogOpen] = useState<boolean>(false)

    // Añadir estado para el modo actual (web o consola)
    const [mode, setMode] = useState("web")
    // Añadir estado para el modo web actual
    const [webMode, setWebMode] = useState("html-css-js")
    const [consoleLanguage, setConsoleLanguage] = useState("python")

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

    // Función para eliminar un archivo
    const deleteFile = (id: string) => {
        // Verificar que no sea el único archivo de su tipo
        const fileToDelete = files.find((file) => file.id === id)
        if (!fileToDelete) return

        const filesOfSameType = files.filter((file) => file.type === fileToDelete.type)
        if (filesOfSameType.length <= 1) {
            setToast({
                title: "Error",
                description: "No puedes eliminar el único archivo de este tipo",
                variant: "error",
                open: true,
            })
            timeOutToast()
            return
        }

        // Confirmar eliminación
        if (confirm(`¿Estás seguro de que quieres eliminar el archivo ${fileToDelete.name}?`)) {
            // Si el archivo actual es el que se va a eliminar, seleccionar otro
            if (currentFileId === id) {
                const nextFile = files.find((file) => file.type === fileToDelete.type && file.id !== id)
                if (nextFile) {
                    setCurrentFileId(nextFile.id)
                }
            }

            // Eliminar el archivo
            setFiles(files.filter((file) => file.id !== id))

            setToast({
                title: "Archivo eliminado",
                description: `Se ha eliminado el archivo ${fileToDelete.name}`,
                variant: "success",
                open: true,
            })
            timeOutToast()
        }
    }

    // Función para renombrar un archivo
    const renameFile = (id: string, newName: string) => {
        if (!newName.trim()) return

        const fileToRename = files.find((file) => file.id === id)
        if (!fileToRename) return

        // Determinar la extensión según el tipo
        let extension = ""
        switch (fileToRename.type) {
            case "html":
                extension = ".html"
                break
            case "css":
                extension = ".css"
                break
            case "js":
                extension = ".js"
                break
            case "ts":
                extension = ".ts"
                break
            case "react-js":
                extension = ".jsx"
                break
            case "react-ts":
                extension = ".tsx"
                break
            case "python":
                extension = ".py"
                break
            case "csharp":
                extension = ".cs"
                break
            case "java":
                extension = ".java"
                break
        }

        // Verificar si el nombre ya tiene la extensión
        const fileName = newName.endsWith(extension) ? newName : newName + extension

        // Verificar si ya existe un archivo con ese nombre
        if (files.some((file) => file.name === fileName && file.type === fileToRename.type && file.id !== id)) {
            setToast({
                title: "Error",
                description: "Ya existe un archivo con ese nombre",
                variant: "error",
                open: true,
            })
            timeOutToast()
            return
        }

        // Renombrar el archivo
        setFiles(
            files.map((file) => {
                if (file.id === id) {
                    return { ...file, name: fileName }
                }
                return file
            }),
        )

        setToast({
            title: "Archivo renombrado",
            description: `Se ha renombrado el archivo a ${fileName}`,
            variant: "success",
            open: true,
        })
        timeOutToast()
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
        if (mode === "web") {
            if (webMode === "html-css-js" || webMode === "html-css-ts") {
                // Obtener el contenido de los archivos HTML, CSS y JS/TS
                const htmlFiles = files.filter((file) => file.type === "html")
                const cssFiles = files.filter((file) => file.type === "css")
                const scriptFiles = files.filter((file) => file.type === (webMode === "html-css-js" ? "js" : "ts"))

                // Usar el primer archivo de cada tipo si no hay ninguno seleccionado
                const htmlContent = htmlFiles.length > 0 ? htmlFiles[0].content : ""
                const cssContent = cssFiles.length > 0 ? cssFiles.map((file) => file.content).join("\n") : ""
                const scriptContent = scriptFiles.length > 0 ? scriptFiles[0].content : ""
                const scriptType = webMode === "html-css-js" ? "javascript" : "text/typescript"

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
                const cssFiles = files.filter((file) => file.type === "css")

                // Encontrar el archivo principal (App.jsx o App.tsx)
                const mainFile = reactFiles.find((file) => file.name.toLowerCase().includes("app")) || reactFiles[0]
                const otherFiles = reactFiles.filter((file) => file.id !== mainFile.id)

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
    }

    // Añadir función para ejecutar código de consola
    const executeConsoleCode = () => {
        setConsoleOutput([])

        // Obtener el archivo actual de consola
        const consoleFiles = files.filter((file) => file.type === consoleLanguage)
        const currentConsoleFile = consoleFiles.find((file) => file.id === currentFileId) || consoleFiles[0]

        if (!currentConsoleFile) return

        const code = currentConsoleFile.content
        const language = consoleLanguage

        // Simulación de ejecución para demostración
        // En una implementación real, usaríamos intérpretes/compiladores específicos

        // Añadir mensaje de inicio
        setConsoleOutput((prev) => [
            ...prev,
            {
                type: "console-info",
                content: `Ejecutando código ${language}...`,
            },
        ])

        setTimeout(() => {
            if (language === "python") {
                // Simulación de salida de Python
                setConsoleOutput((prev) => [
                    ...prev,
                    { type: "console-log", content: "El factorial de 1 es 1" },
                    { type: "console-log", content: "El factorial de 2 es 2" },
                    { type: "console-log", content: "El factorial de 3 es 6" },
                    { type: "console-log", content: "El factorial de 4 es 24" },
                    { type: "console-log", content: "El factorial de 5 es 120" },
                    { type: "console-log", content: "Lista original: [1, 2, 3, 4, 5]" },
                    { type: "console-log", content: "Lista al cuadrado: [1, 4, 9, 16, 25]" },
                    { type: "console-log", content: "Información de la persona:" },
                    { type: "console-log", content: "  nombre: María" },
                    { type: "console-log", content: "  edad: 30" },
                    { type: "console-log", content: "  profesion: Científica de datos" },
                    { type: "console-error", content: "¡Error! No se puede dividir por cero." },
                    { type: "console-log", content: "Este bloque siempre se ejecuta" },
                ])
            } else if (language === "csharp") {
                // Simulación de salida de C#
                setConsoleOutput((prev) => [
                    ...prev,
                    { type: "console-log", content: "¡Hola desde C#!" },
                    { type: "console-log", content: "\nContando del 1 al 5:" },
                    { type: "console-log", content: "Número: 1" },
                    { type: "console-log", content: "Número: 2" },
                    { type: "console-log", content: "Número: 3" },
                    { type: "console-log", content: "Número: 4" },
                    { type: "console-log", content: "Número: 5" },
                    { type: "console-log", content: "\nSuma de array: 150" },
                    { type: "console-log", content: "\nPersona: Carlos, 35 años" },
                    { type: "console-log", content: "Hola, soy Carlos y tengo 35 años." },
                ])
            } else if (language === "java") {
                // Simulación de salida de Java
                setConsoleOutput((prev) => [
                    ...prev,
                    { type: "console-log", content: "¡Hola desde Java!" },
                    { type: "console-log", content: "\nContando del 1 al 5:" },
                    { type: "console-log", content: "Número: 1" },
                    { type: "console-log", content: "Número: 2" },
                    { type: "console-log", content: "Número: 3" },
                    { type: "console-log", content: "Número: 4" },
                    { type: "console-log", content: "Número: 5" },
                    { type: "console-log", content: "\nSuma de array: 150" },
                    { type: "console-log", content: "\nPersona: Laura, 32 años" },
                    { type: "console-log", content: "Hola, soy Laura y tengo 32 años." },
                ])
            }

            // Mensaje de finalización
            setConsoleOutput((prev) => [
                ...prev,
                {
                    type: "console-info",
                    content: `Ejecución de ${language} completada.`,
                },
            ])
        }, 500)
    }

    // Modificar el handleRun para manejar ambos modos
    const handleRun = () => {
        // Limpiar la consola
        setConsoleOutput([])

        if (mode === "web") {
            // Actualizar el iframe para modo web
            if (iframeRef.current) {
                iframeRef.current.srcdoc = output
            }
        } else {
            // Ejecutar código de consola
            executeConsoleCode()
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
    }, [files, mode, webMode, consoleLanguage, currentFileId, useTailwind])

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
            } else if (file.type === "python" || file.type === "csharp" || file.type === "java") {
                setMode("console")
                setConsoleLanguage(file.type)
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

    // Cargar plantillas
    const loadTemplate = (template: string) => {
        if (template === "landing") {
            // Buscar o crear archivos para la plantilla
            const htmlFile = files.find((file) => file.type === "html")
            const cssFile = files.find((file) => file.type === "css")
            const jsFile = files.find((file) => file.type === "js")

            if (htmlFile) {
                setFiles(
                    files.map((file) => {
                        if (file.id === htmlFile.id) {
                            return {
                                ...file,
                                content: `<div class="hero">
   <h1>Bienvenido a mi sitio web</h1>
   <p>Una landing page de ejemplo creada con HTML, CSS y JavaScript</p>
   <button id="cta-button">Comenzar ahora</button>
 </div>
 <div class="features">
   <div class="feature">
     <h2>Característica 1</h2>
     <p>Descripción de la primera característica importante.</p>
   </div>
   <div class="feature">
     <h2>Característica 2</h2>
     <p>Descripción de la segunda característica importante.</p>
   </div>
   <div class="feature">
     <h2>Característica 3</h2>
     <p>Descripción de la tercera característica importante.</p>
   </div>
 </div>`,
                            }
                        }
                        return file
                    }),
                )
            }

            if (cssFile) {
                setFiles(
                    files.map((file) => {
                        if (file.id === cssFile.id) {
                            return {
                                ...file,
                                content: `body {
   font-family: system-ui, sans-serif;
   margin: 0;
   padding: 0;
   color: #333;
 }
 
 .hero {
   background-color: #f0f4f8;
   padding: 4rem 2rem;
   text-align: center;
 }
 
 .hero h1 {
   font-size: 2.5rem;
   margin-bottom: 1rem;
   color: #1a365d;
 }
 
 .hero p {
   font-size: 1.2rem;
   max-width: 600px;
   margin: 0 auto 2rem;
   color: #4a5568;
 }
 
 button {
   background-color: #4299e1;
   color: white;
   border: none;
   padding: 0.75rem 1.5rem;
   font-size: 1rem;
   border-radius: 4px;
   cursor: pointer;
   transition: background-color 0.3s;
 }
 
 button:hover {
   background-color: #3182ce;
 }
 
 .features {
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   padding: 4rem 2rem;
   background-color: white;
 }
 
 .feature {
   flex: 1;
   min-width: 250px;
   max-width: 350px;
   margin: 1rem;
   padding: 1.5rem;
   border-radius: 8px;
   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
 }
 
 .feature h2 {
   color: #2b6cb0;
   margin-top: 0;
 }`,
                            }
                        }
                        return file
                    }),
                )
            }

            if (jsFile) {
                setFiles(
                    files.map((file) => {
                        if (file.id === jsFile.id) {
                            return {
                                ...file,
                                content: `document.getElementById('cta-button').addEventListener('click', function() {
   console.log('Botón CTA clickeado');
   alert('¡Gracias por tu interés! Esta es una demo de landing page.');
 });`,
                            }
                        }
                        return file
                    }),
                )
            }

            // Cambiar al modo HTML/CSS/JS
            setWebMode("html-css-js")
            setMode("web")
            // Seleccionar el archivo HTML
            if (htmlFile) {
                setCurrentFileId(htmlFile.id)
            }
        }
    }

    // Renderizar el tipo de consola
    const renderConsoleItem = (item: { type: string; content: string }, index: number) => {
        let className = "text-foreground"
        let icon = null

        switch (item.type) {
            case "console-log":
                className = "text-foreground"
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
            <div key={index} className={`${className} font-mono text-sm py-1`}>
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
                return <FileText className="h-4 w-4 text-orange-500" />
            case "css":
                return <FileCode className="h-4 w-4 text-blue-500" />
            case "js":
                return <FileCode className="h-4 w-4 text-yellow-500" />
            case "ts":
                return <FileCode className="h-4 w-4 text-blue-600" />
            case "react-js":
                return <FileCode className="h-4 w-4 text-cyan-500" />
            case "react-ts":
                return <FileCode className="h-4 w-4 text-cyan-600" />
            case "python":
                return <FileCode className="h-4 w-4 text-green-500" />
            case "csharp":
                return <FileCode className="h-4 w-4 text-purple-500" />
            case "java":
                return <FileCode className="h-4 w-4 text-red-500" />
            default:
                return <FileCode className="h-4 w-4" />
        }
    }



    return (
        <div>
            <div className="flex items-center gap-2">
                <label className="label">
                    {useTailwind ? "Tailwind CSS" : "CSS Normal"}
                    <input
                        type="checkbox"
                        className="toggle toggle-info"
                        checked={useTailwind}
                        onChange={() => setUseTailwind(!useTailwind)}
                    />
                </label>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    {mode === "web" ? (
                        <div className="flex items-center justify-between">
                            <div className="tabs tabs-boxed w-full">
                                <button className={`tab ${webMode === 'html-css-js' ? 'tab-active' : ''}`} onClick={() => setWebMode('html-css-js')}>HTML/CSS/JS</button>
                                <button className={`tab ${webMode === 'html-css-ts' ? 'tab-active' : ''}`} onClick={() => setWebMode('html-css-ts')}>HTML/CSS/TS</button>
                                <button className={`tab ${webMode === 'react-js' ? 'tab-active' : ''}`} onClick={() => setWebMode('react-js')}>React JS</button>
                                <button className={`tab ${webMode === 'react-ts' ? 'tab-active' : ''}`} onClick={() => setWebMode('react-ts')}>React TS</button>
                            </div>
                            <div className="flex items-center ml-2">
                                <button
                                    onClick={() => setIsEditorMaximized(!isEditorMaximized)}
                                    className={isEditorMaximized ? "rounded-r-none " : "rounded-r-none "}
                                >
                                    {isEditorMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between">
                            <select className="select select-bordered w-[150px]" value={consoleLanguage} onChange={(e) => setConsoleLanguage(e.target.value)}>
                                <option disabled selected>Lenguaje</option>
                                <option value="python">Python</option>
                                <option value="csharp">C#</option>
                                <option value="java">Java</option>
                            </select>
                            <div className="flex items-center ml-2">
                                <button
                                    onClick={() => setIsEditorMaximized(!isEditorMaximized)}
                                    className="h-8 w-8 btn btn-ghost"
                                >
                                    {isEditorMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                    )}


                    <div className="border border-border rounded-md overflow-hidden max-h-[200px] overflow-y-auto">
                        <div className="divide-y divide-border">
                            {/* Mostrar archivos según el modo actual */}
                            {mode === "web"
                                ? webMode === "html-css-js"
                                    ? files
                                        .filter((file) => ["html", "css", "js"].includes(file.type))
                                        .map((file) => (
                                            <div
                                                key={file.id}
                                                className={`flex items-center justify-between p-2 cursor-pointer hover:bg-secondary/50 ${currentFileId === file.id ? "bg-secondary/80" : ""
                                                    }`}
                                                onClick={() => setCurrentFileId(file.id)}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {getFileIcon(file.type)}
                                                    <span className="text-sm">{file.name}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        className="h-6 w-6 btn btn-ghost"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            const newName = prompt("Nuevo nombre:", file.name)
                                                            if (newName) renameFile(file.id, newName)
                                                        }}
                                                    >
                                                        <Edit2 className="h-3.5 w-3.5" />
                                                    </button>
                                                    <button
                                                        className="h-6 w-6 text-red-500 btn btn-ghost"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            deleteFile(file.id)
                                                        }}
                                                    >
                                                        <X className="h-3.5 w-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    : webMode === "html-css-ts"
                                        ? files
                                            .filter((file) => ["html", "css", "ts"].includes(file.type))
                                            .map((file) => (
                                                <div
                                                    key={file.id}
                                                    className={`flex items-center justify-between p-2 cursor-pointer hover:bg-secondary/50 ${currentFileId === file.id ? "bg-secondary/80" : ""
                                                        }`}
                                                    onClick={() => setCurrentFileId(file.id)}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {getFileIcon(file.type)}
                                                        <span className="text-sm">{file.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            className="h-6 w-6 btn btn-ghost"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                const newName = prompt("Nuevo nombre:", file.name)
                                                                if (newName) renameFile(file.id, newName)
                                                            }}
                                                        >
                                                            <Edit2 className="h-3.5 w-3.5" />
                                                        </button>
                                                        <button
                                                            className="h-6 w-6 btn btn-ghost"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                deleteFile(file.id)
                                                            }}
                                                        >
                                                            <X className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        : webMode === "react-js"
                                            ? files
                                                .filter((file) => ["react-js", "css"].includes(file.type))
                                                .map((file) => (
                                                    <div
                                                        key={file.id}
                                                        className={`flex items-center justify-between p-2 cursor-pointer hover:bg-secondary/50 ${currentFileId === file.id ? "bg-secondary/80" : ""
                                                            }`}
                                                        onClick={() => setCurrentFileId(file.id)}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            {getFileIcon(file.type)}
                                                            <span className="text-sm">{file.name}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <button
                                                                className="btn btn-ghost btn-square"
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    const newName = prompt("Nuevo nombre:", file.name)
                                                                    if (newName) renameFile(file.id, newName)
                                                                }}
                                                            >
                                                                <Edit2 className="h-3.5 w-3.5" />
                                                            </button>
                                                            <button
                                                                className="btn btn-ghost btn-square text-error"
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    deleteFile(file.id)
                                                                }}
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            : files
                                                .filter((file) => ["react-ts", "css"].includes(file.type))
                                                .map((file) => (
                                                    <div
                                                        key={file.id}
                                                        className={`flex items-center justify-between p-2 cursor-pointer hover:bg-secondary/50 ${currentFileId === file.id ? "bg-secondary/80" : ""
                                                            }`}
                                                        onClick={() => setCurrentFileId(file.id)}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            {getFileIcon(file.type)}
                                                            <span className="text-sm">{file.name}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <button
                                                                className="btn btn-ghost btn-square"
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    const newName = prompt("Nuevo nombre:", file.name)
                                                                    if (newName) renameFile(file.id, newName)
                                                                }}
                                                            >
                                                                <Edit2 className="h-3.5 w-3.5" />
                                                            </button>
                                                            <button
                                                                className="btn btn-ghost btn-square text-error"
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    deleteFile(file.id)
                                                                }}
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                : files
                                    .filter((file) => file.type === consoleLanguage)
                                    .map((file) => (
                                        <div
                                            key={file.id}
                                            className={`flex items-center justify-between p-2 cursor-pointer hover:bg-secondary/50 ${currentFileId === file.id ? "bg-secondary/80" : ""
                                                }`}
                                            onClick={() => setCurrentFileId(file.id)}
                                        >
                                            <div className="flex items-center gap-2">
                                                {getFileIcon(file.type)}
                                                <span className="text-sm">{file.name}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <button
                                                    className="btn btn-ghost btn-square"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        const newName = prompt("Nuevo nombre:", file.name)
                                                        if (newName) renameFile(file.id, newName)
                                                    }}
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    className="btn btn-ghost btn-square text-error"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        deleteFile(file.id)
                                                    }}
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                        </div>
                    </div>

                    <div className={`border border-border rounded-md overflow-hidden ${isEditorMaximized ? "h-[70vh]" : ""}`}>
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
                            />
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <button onClick={handleRun} className="btn btn-primary gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            </svg>
                            Ejecutar
                        </button>
                        <button onClick={handleCopy} className="btn btn-outline gap-1">
                            {copied ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            )}
                            {copied ? "Copiado" : "Copiar HTML"}
                        </button>
                        <button onClick={handleDownload} className="btn btn-outline gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Descargar
                        </button>
                        <button onClick={handleSave} className="btn btn-outline gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                            </svg>
                            Guardar
                        </button>
                        <button onClick={handleLoad} className="btn btn-outline gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Cargar
                        </button>
                        <button onClick={handleClear} className="btn btn-outline gap-1 ml-auto">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Limpiar
                        </button>
                    </div>

                    {!isEditorMaximized && (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Terminal className="h-4 w-4 text-tech-cyan" />
                                    <h3 className="text-sm font-medium">Consola</h3>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button onClick={clearConsole} className="btn btn-ghost btn-sm">
                                        Limpiar
                                    </button>
                                    <button
                                        onClick={() => setIsConsoleMaximized(!isConsoleMaximized)}
                                        className="btn btn-ghost btn-square"
                                    >
                                        {isConsoleMaximized ? (
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3c2.755 0 5.455.232 8.083.678.533.4.917 1.056.917 1.736V21l-.002-.03c-.083.396-.32 1.313-.889 2.258A48.62 48.62 0 0112 46c-2.749 0-5.454-.232-8.083-.678C3.217 44.986 2.275 44 2 44v-20c0-.68.39-1.333.917-1.736.483-.447.889-1.227.889-2.258l.002.03zM12 42c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm16-4c0 2.206-1.794 4-4 4s-4-1.794-4-4 1.794-4 4-4 4 1.794 4 4zM6 36c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div
                                ref={consoleRef}
                                className={`bg-secondary/80 backdrop-blur-sm rounded-md p-2 overflow-auto ${isConsoleMaximized ? "h-[300px]" : "h-[200px]"
                                    }`}
                            >
                                {consoleOutput.length > 0 ? (
                                    consoleOutput.map((item, index) => renderConsoleItem(item, index))
                                ) : (
                                    <div className="text-muted-foreground text-sm italic p-2">
                                        La consola está vacía. Usa console.log() en tu código JavaScript para ver mensajes aquí.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-white dark:bg-zinc-800 border border-border rounded-lg overflow-hidden h-[calc(100vh-200px)]">
                    <div className="p-2 bg-secondary/80 backdrop-blur-sm border-b border-border flex items-center">
                        <div className="flex space-x-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="mx-auto text-xs text-muted-foreground">{mode === "web" ? "Vista previa" : "Consola"}</div>
                    </div>
                    {mode === "web" ? (
                        <iframe
                            ref={iframeRef}
                            srcDoc={output}
                            title="preview"
                            className="w-full h-[calc(100%-32px)] border-none"
                            sandbox="allow-scripts"
                        ></iframe>
                    ) : (
                        <div
                            ref={consoleRef}
                            className="w-full h-[calc(100%-32px)] overflow-auto p-4 font-mono text-sm bg-zinc-900 text-zinc-100"
                        >
                            {consoleOutput.length > 0 ? (
                                consoleOutput.map((item, index) => renderConsoleItem(item, index))
                            ) : (
                                <div className="text-zinc-400 text-sm italic p-2">
                                    La consola está vacía. Ejecuta el código para ver la salida aquí.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}