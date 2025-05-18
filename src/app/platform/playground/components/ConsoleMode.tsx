import { Editor } from "@monaco-editor/react"
import { Check, Copy, Download, Edit2, EllipsisVertical, FileCode, FileText, Maximize2, Minimize2, Play, Plus, RefreshCcw, Save, Terminal, TerminalSquare, TrashIcon, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// Definir tipos para los archivos
interface FileData {
    id: string
    name: string
    content: string
    language: string
    type: string
}


export const ConsoleMode = () => {
    // Referencias para la consola
    const consoleRef = useRef<HTMLDivElement>(null)

    // Estado para el sistema de archivos
    const [files, setFiles] = useState<FileData[]>([
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


        executeConsoleCode()
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



    // Actualizar el modo web según el tipo de archivo seleccionado
    useEffect(() => {
        const file = files.find((f) => f.id === currentFileId)
        if (file) {
            setConsoleLanguage(file.type)
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
            <div key={index} className={`${className} text-xs py-0.5`} style={{ fontFamily: "consolas" }}>
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
            case "js":
                return <FileCode className="h-4 w-4 text-yellow-500" />
            case "ts":
                return <FileCode className="h-4 w-4 text-blue-600" />
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
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <select className="select select-bordered w-[150px] select-sm" value={consoleLanguage} onChange={(e) => setConsoleLanguage(e.target.value)}>
                    <option disabled selected>Lenguaje</option>
                    <option value="python">Python</option>
                    <option value="csharp">C#</option>
                    <option value="java">Java</option>
                </select>
                <div className="flex items-center ml-2">
                    <button
                        onClick={() => setIsEditorMaximized(!isEditorMaximized)}
                        className="h-8 w-8 btn btn-ghost" >
                        {isEditorMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <div className="border-1 border-(--color-gray-700) border-b-0 rounded-t-sm  overflow-hidden overflow-y-auto">
                            <div className="flex flex-row divide-x divide-(--color-gray-500) max-w-max">
                                {/* Mostrar archivos según el modo actual */}
                                {files
                                    .filter((file) => file.type === consoleLanguage)
                                    .map((file) => (
                                        <div
                                            key={file.id}
                                            className={`flex items-center justify-between px-2 py-1.5 cursor-pointer border-r-1 border-(--color-gray-700) rounded-t-xs ${currentFileId === file.id ? "bg-gray-600 text-gray-100 border-b-2 border-b-(--color-secondary)" : "bg-gray-800 hover:bg-gray-600 text-gray-400 hover:text-gray-100 border-b-2 border-(--color-gray-700)"}`}
                                            onClick={() => setCurrentFileId(file.id)}
                                        >
                                            <div className="flex items-center gap-2">
                                                {getFileIcon(file.type)}
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
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <button onClick={handleRun} className="btn btn-success btn-sm">
                            <Play className="size-4" />
                            Ejecutar
                        </button>
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

                        </div>
                    )}
                </div>

                <div className="bg-white dark:bg-zinc-800 border-1 border-gray-700 rounded-sm overflow-hidden h-[calc(100svh-210px)]">
                    <div className="px-2 py-1.5 bg-neutral/80 backdrop-blur-sm border-b border-gray-700 flex items-center">
                        <TerminalSquare className="h-5 w-5 text-cyan-500" />
                        <div className="mx-auto text-sm font-light text-muted-foreground">{"Consola"}</div>
                    </div>

                    <div
                        ref={consoleRef}
                        className="w-full h-[calc(100%-32px)] overflow-auto p-4  bg-zinc-900" >
                        {consoleOutput.length > 0 ? (
                            consoleOutput.map((item, index) => renderConsoleItem(item, index))
                        ) : (
                            <div className="text-xs text-gray-400" style={{ fontFamily: "consolas" }}>
                                La consola está vacía. Ejecuta el código para ver la salida aquí.
                            </div>
                        )}
                    </div>

                </div>
            </div >
        </div >
    )
}