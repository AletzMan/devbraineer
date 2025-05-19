import { IOutputRun } from "@/interfaces/playground"
import { RunCode } from "@/services/runcode.service"
import { Editor } from "@monaco-editor/react"
import { Check, Copy, Download, EllipsisVertical, FileCode, Play, RefreshCcw, RegexIcon, Terminal, TrashIcon, } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { FileData, FILES_DEFAULT } from "../../constants"
import { CIcon, CSharpIcon, DartIcon, GoIcon, JavaIcon, JSIcon, KotlinIcon, LuaIcon, PHPIcon, PythonIcon, RubyIcon, RustIcon, ScalaIcon, SwiftIcon, TSIcon } from "@/app/components/Icons"

// Definir tipos para los archivos


export const ConsoleMode = () => {
    const consoleRef = useRef<HTMLDivElement>(null)
    const [files, setFiles] = useState<FileData[]>(FILES_DEFAULT)
    const [currentFileId, setCurrentFileId] = useState<string>("javascript-1")
    const [input, setInput] = useState("")
    const [consoleLanguage, setConsoleLanguage] = useState("javascript")
    const [copied, setCopied] = useState(false)
    const [consoleOutput, setConsoleOutput] = useState<IOutputRun>({ code: 0, output: "Suerte 🍀", signal: "", stderr: "", stdout: "" })
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

        if (confirm(`¿Estás seguro de que quieres eliminar el archivo ${fileToDelete.name}?`)) {
            if (currentFileId === id) {
                const nextFile = files.find((file) => file.type === fileToDelete.type && file.id !== id)
                if (nextFile) {
                    setCurrentFileId(nextFile.id)
                }
            }

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

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data && event.data.type && event.data.type.startsWith("console-")) {
                const { type, content } = event.data
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




    const HandleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const language = e.target.value
        const file = files.find((f) => f.language === language)
        if (file) {
            setConsoleLanguage(file.language)
            setCurrentFileId(file.id)
        }
    }

    const HandleRunCode = async () => {
        setConsoleOutput({ code: -135, output: "[RUN] Ejecutando código...", signal: "", stderr: "", stdout: "" })
        const response = await RunCode(consoleLanguage, currentFile.content, currentFile.version, input)

        if (response.response?.run.code === 1 && response.response?.run.stderr) {
            setConsoleOutput(response.response?.run)
        } else {
            if (response.response)
                setConsoleOutput(response.response?.run)
        }
    }


    const handleCopy = () => {
        navigator.clipboard.writeText(currentFile.content)
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

    const handleDownload = () => {
        const blob = new Blob([currentFile.content], { type: "text/html" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${currentFile.name}`
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
        }
    }

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


    const clearConsole = () => {
    }

    const getFileIcon = (fileType: string) => {
        switch (fileType) {
            case "javascript":
                return <JSIcon className="h-4 w-4 text-yellow-500" />
            case "typescript":
                return <TSIcon className="h-4 w-4 text-blue-600" />
            case "python":
                return <PythonIcon className="h-4 w-4 text-green-500" />
            case "c":
                return <CIcon className="h-4 w-4 text-blue-500" />
            case "cpp":
                return <CIcon className="h-4 w-4 text-blue-500" />
            case "csharp":
                return <CSharpIcon className="h-4 w-4 text-purple-500" />
            case "java":
                return <JavaIcon className="h-4 w-4 text-red-500" />
            case "kotlin":
                return <KotlinIcon className="h-4 w-4 text-pink-500" />
            case "go":
                return <GoIcon className="h-4 w-4 text-blue-500" />
            case "dart":
                return <DartIcon className="h-4 w-4 text-blue-500" />
            case "rust":
                return <RustIcon className="h-4 w-4 text-blue-500" />
            case "lua":
                return <LuaIcon className="h-4 w-4 text-blue-500" />
            case "regex":
                return <RegexIcon className="h-4 w-4 text-blue-500" />
            case "ruby":
                return <RubyIcon className="h-4 w-4 text-blue-500" />
            case "rust":
                return <RustIcon className="h-4 w-4 text-blue-500" />
            case "swift":
                return <SwiftIcon className="h-4 w-4 text-blue-500" />
            case "scala":
                return <ScalaIcon className="h-4 w-4 text-blue-500" />
            case "php":
                return <PHPIcon className="h-4 w-4 text-blue-500" />
            default:
                return <FileCode className="h-4 w-4" />
        }
    }



    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <select className="select select-bordered w-[150px] select-sm capitalize" value={consoleLanguage} onChange={(e) => HandleChangeLanguage(e)}>
                            <option disabled selected>Lenguaje</option>
                            {FILES_DEFAULT.map((file) => (
                                <option className="capitalize" key={file.id} value={file.language}>
                                    {file.language}
                                </option>
                            ))}
                        </select>
                        <div className="dropdown dropdown-start">
                            <div tabIndex={0} role="button" className="btn btn-sm"><EllipsisVertical className="size-5" /></div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li><button className="btn btn-sm btn-ghost justify-start gap-4" onClick={handleCopy}>
                                    {copied ? (
                                        <Check className="size-4" />
                                    ) : (
                                        <Copy className="size-4" />
                                    )}
                                    {copied ? "Copiado" : "Copiar HTML"}</button>
                                </li>
                                <li>
                                    <button className="btn btn-sm btn-ghost justify-start gap-4" onClick={handleDownload}>
                                        <Download className="size-4" />
                                        Descargar
                                    </button>
                                </li>
                                <li>
                                    <button className="btn btn-sm btn-ghost justify-start gap-4" onClick={handleLoad}>
                                        <RefreshCcw className="size-4" />
                                        Cargar
                                    </button>
                                </li>
                                <li>
                                    <button className="btn btn-sm btn-ghost justify-start gap-4" onClick={handleClear}>
                                        <TrashIcon className="size-4" />
                                        Limpiar
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div className="border-1 border-(--color-gray-700) border-b-0 rounded-t-sm  overflow-hidden overflow-y-auto">
                            <div className="flex flex-row divide-x divide-(--color-gray-500) max-w-max">
                                {/* Mostrar archivos según el modo actual */}
                                {files.filter((file) => file.language === consoleLanguage).map((file) => (
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

                        <div className={`border-1 border-(--color-gray-700) rounded-b-sm overflow-hidden h-[calc(100svh-220px)]`}>
                            {currentFile && (
                                <Editor
                                    height={"100%"}
                                    language={currentFile.type}
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

                </div>
                <div className="flex flex-col w-full gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <button onClick={HandleRunCode} className="btn btn-success btn-sm">
                            <Play className="size-4" />
                            Ejecutar
                        </button>

                    </div>
                    <div className="bg-neutral/40 border-1 border-gray-700 rounded-sm overflow-hidden h-[calc(100svh-185px)]">
                        <div className="bg-base-200 flex items-center justify-between px-2 rounded-t-sm">
                            <div className="flex items-center gap-2">
                                <span className={`w-2.5 h-2.5 rounded-full
                                            ${consoleOutput.code === -135 && "bg-yellow-600 animate-pulse"}
                                            ${consoleOutput.code > 0 && "bg-red-600"}
                                            ${consoleOutput.code === 0 && "bg-green-600"}`}></span>
                                < div className="flex items-center gap-2">
                                    <Terminal className="h-4 w-4 text-tech-cyan" />
                                    <h3 className="text-sm font-medium">Consola</h3>
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                <button onClick={clearConsole} className="btn btn-ghost btn-sm">
                                    Limpiar
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 h-[calc(100svh-220px)]">
                            <textarea className={`w-full h-[calc(100svh-300px)] overflow-auto p-4 bg-neutral outline-0 resize-none border-b-1 border-(--color-gray-700)`} style={{ fontFamily: "consolas" }} value={consoleOutput.output.replaceAll(/\/piston\/jobs\/[a-f0-9\-]{36}\/file0./g, "")} spellCheck={false} readOnly />
                            <div className="flex flex-col gap-1 p-4">
                                <label htmlFor="stdin" className="text-sm font-medium text-gray-300">Entrada estándar (stdin)</label>
                                <textarea
                                    id="stdin"
                                    className="textarea textarea-bordered resize-none"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Escribe la entrada para tu programa aquí..."
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </div >
    )
}