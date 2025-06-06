'use client';
import { IOutputRun } from '@/interfaces/playground';
import { RunCode } from '@/services/runcode.service';
import { Editor } from '@monaco-editor/react';
import {
    Check,
    Copy,
    Download,
    EllipsisVertical,
    FileCode,
    Play,
    RefreshCcw,
    RegexIcon,
    Terminal,
    TrashIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { FileData, FILES_DEFAULT } from '../../constants';
import {
    CIcon,
    CSharpIcon,
    DartIcon,
    GoIcon,
    JavaIcon,
    JSIcon,
    KotlinIcon,
    LuaIcon,
    PHPIcon,
    PythonIcon,
    RubyIcon,
    RustIcon,
    ScalaIcon,
    SwiftIcon,
    TSIcon,
} from '@/app/components/Icons';
import { LayoutSubSection } from '../../componentes/LayoutSubSection';

export const ConsoleMode = () => {
    const consoleRef = useRef<HTMLDivElement>(null);
    const [files, setFiles] = useState<FileData[]>(FILES_DEFAULT);
    const [currentFileId, setCurrentFileId] = useState<string>('javascript-1');
    const [input, setInput] = useState('');
    const [consoleLanguage, setConsoleLanguage] = useState('javascript');
    const [copied, setCopied] = useState(false);
    const [consoleOutput, setConsoleOutput] = useState<IOutputRun>({
        code: 0,
        output: 'Suerte 🍀',
        signal: '',
        stderr: '',
        stdout: '',
    });
    const [toast, setToast] = useState({
        title: '',
        description: '',
        variant: 'info',
        open: false,
    });

    const currentFile = files.find((file) => file.id === currentFileId) || files[0];

    const updateCurrentFile = (content: string) => {
        setFiles(
            files.map((file) => {
                if (file.id === currentFileId) {
                    return { ...file, content };
                }
                return file;
            })
        );
    };

    const timeOutToast = () => {
        setTimeout(() => {
            setToast({
                title: '',
                description: '',
                variant: 'info',
                open: false,
            });
        }, 5000);
    };

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data && event.data.type && event.data.type.startsWith('console-')) {
                if (consoleRef.current) {
                    setTimeout(() => {
                        consoleRef.current!.scrollTop = consoleRef.current!.scrollHeight;
                    }, 0);
                }
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const HandleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const language = e.target.value;
        const file = files.find((f) => f.language === language);
        if (file) {
            setConsoleLanguage(file.language);
            setCurrentFileId(file.id);
        }
    };

    const HandleRunCode = async () => {
        setConsoleOutput({
            code: -135,
            output: '[RUN] Ejecutando código...',
            signal: '',
            stderr: '',
            stdout: '',
        });
        const response = await RunCode(consoleLanguage, currentFile.content, currentFile.version, input);

        if (response.response?.run.code === 1 && response.response?.run.stderr) {
            setConsoleOutput(response.response?.run);
        } else {
            if (response.response) setConsoleOutput(response.response?.run);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(currentFile.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);

        setToast({
            title: 'Código copiado',
            description: 'El código HTML completo se ha copiado al portapapeles.',
            variant: 'info',
            open: true,
        });
        timeOutToast();
    };

    const handleDownload = () => {
        const blob = new Blob([currentFile.content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentFile.name}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setToast({
            title: 'Archivo descargado',
            description: 'El archivo HTML se ha descargado correctamente.',
            variant: 'info',
            open: true,
        });
        timeOutToast();
    };

    const handleClear = () => {
        if (confirm('¿Estás seguro de que quieres borrar todo el código?')) {
            // Limpiar el contenido del archivo actual
            setFiles(
                files.map((file) => {
                    if (file.id === currentFileId) {
                        return { ...file, content: '' };
                    }
                    return file;
                })
            );
        }
    };

    const handleSave = () => {
        try {
            localStorage.setItem('playground-files', JSON.stringify(files));

            setToast({
                title: 'Proyecto guardado',
                description: 'Tu código se ha guardado en el navegador.',
                variant: 'success',
                open: true,
            });
            timeOutToast();
        } catch (error) {
            setToast({
                title: 'Error al guardar',
                description: 'No se pudo guardar el código. Es posible que el almacenamiento esté lleno.',
                variant: 'error',
                open: true,
            });
        }
    };

    const handleLoad = () => {
        try {
            const savedFiles = localStorage.getItem('playground-files');
            if (savedFiles) {
                setFiles(JSON.parse(savedFiles));
                setCurrentFileId(JSON.parse(savedFiles)[0].id);
            }

            setToast({
                title: 'Proyecto cargado',
                description: 'Tu código guardado se ha cargado correctamente.',
                variant: 'success',
                open: true,
            });
            timeOutToast();
        } catch (error) {
            setToast({
                title: 'Error al cargar',
                description: 'No se pudo cargar el código guardado.',
                variant: 'error',
                open: true,
            });
            timeOutToast();
        }
    };

    const clearConsole = () => {};

    const getFileIcon = (fileType: string) => {
        switch (fileType) {
            case 'javascript':
                return <JSIcon className="h-4 w-4 text-yellow-500" />;
            case 'typescript':
                return <TSIcon className="h-4 w-4 text-blue-600" />;
            case 'python':
                return <PythonIcon className="h-4 w-4 text-green-500" />;
            case 'c':
                return <CIcon className="h-4 w-4 text-blue-500" />;
            case 'cpp':
                return <CIcon className="h-4 w-4 text-blue-500" />;
            case 'csharp':
                return <CSharpIcon className="h-4 w-4 text-purple-500" />;
            case 'java':
                return <JavaIcon className="h-4 w-4 text-red-500" />;
            case 'kotlin':
                return <KotlinIcon className="h-4 w-4 text-pink-500" />;
            case 'go':
                return <GoIcon className="h-4 w-4 text-blue-500" />;
            case 'dart':
                return <DartIcon className="h-4 w-4 text-blue-500" />;
            case 'rust':
                return <RustIcon className="h-4 w-4 text-blue-500" />;
            case 'lua':
                return <LuaIcon className="h-4 w-4 text-blue-500" />;
            case 'regex':
                return <RegexIcon className="h-4 w-4 text-blue-500" />;
            case 'ruby':
                return <RubyIcon className="h-4 w-4 text-blue-500" />;
            case 'rust':
                return <RustIcon className="h-4 w-4 text-blue-500" />;
            case 'swift':
                return <SwiftIcon className="h-4 w-4 text-blue-500" />;
            case 'scala':
                return <ScalaIcon className="h-4 w-4 text-blue-500" />;
            case 'php':
                return <PHPIcon className="h-4 w-4 text-blue-500" />;
            default:
                return <FileCode className="h-4 w-4" />;
        }
    };

    return (
        <LayoutSubSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 bg">
                    <div className="flex items-center justify-between">
                        <select
                            className="select select-ghost border-base-300 bg-base-content/3 w-[150px] select-sm capitalize"
                            value={consoleLanguage}
                            onChange={HandleChangeLanguage}>
                            <option disabled value="">
                                Lenguaje
                            </option>
                            {FILES_DEFAULT.map((file) => (
                                <option className="capitalize" key={file.id} value={file.language}>
                                    {file.language}
                                </option>
                            ))}
                        </select>
                        <div className="flex flex-row gap-2">
                            <div className="tooltip tooltip-soft tooltip-bottom" data-tip="Copiar codigo">
                                <button className="btn btn-sm btn-soft justify-start gap-4" onClick={handleCopy}>
                                    {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                                </button>
                            </div>
                            <div className="tooltip tooltip-soft tooltip-bottom" data-tip="Descargar codigo">
                                <button className="btn btn-sm btn-soft justify-start gap-4" onClick={handleDownload}>
                                    <Download className="size-4" />
                                </button>
                            </div>
                            <div className="tooltip tooltip-soft tooltip-bottom" data-tip="Cargar codigo">
                                <button className="btn btn-sm btn-soft justify-start gap-4" onClick={handleLoad}>
                                    <RefreshCcw className="size-4" />
                                </button>
                            </div>
                            <div className="tooltip tooltip-soft tooltip-bottom" data-tip="Limpiar codigo">
                                <button className="btn btn-sm btn-soft justify-start gap-4" onClick={handleClear}>
                                    <TrashIcon className="size-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="rounded-t-sm overflow-hidden overflow-y-auto">
                            <div className="tabs tabs-lift tabs-sm">
                                <label className="tab flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="files"
                                        value={currentFile.id}
                                        aria-label={currentFile.name}
                                        checked={currentFileId === currentFile.id}
                                        onChange={() => setCurrentFileId(currentFile.id)}></input>
                                    <span className={currentFileId === currentFile.id ? 'opacity-100' : 'opacity-30'}>
                                        {getFileIcon(currentFile.language)}
                                    </span>
                                    {currentFile.name}
                                </label>
                            </div>
                        </div>

                        <div
                            className={`rounded-b-sm overflow-hidden h-[calc(100svh-172px)] border border-base-300 rounded-tr-sm`}>
                            {currentFile && (
                                <Editor
                                    height={'100%'}
                                    language={currentFile.type}
                                    value={currentFile.content}
                                    onChange={(value) => updateCurrentFile(value || '')}
                                    theme={'vs-dark'}
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 14,
                                        wordWrap: 'on',
                                        automaticLayout: true,
                                        tabSize: 2,
                                        scrollBeyondLastLine: false,
                                        lineNumbers: 'on',
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
                    <div className="bg-base-100 border-1 border-base-300 rounded-sm overflow-hidden h-[calc(100svh-140px)]">
                        <div className="bg-base-300 flex items-center justify-between px-2 rounded-t-sm">
                            <div className="flex items-center gap-2">
                                <span
                                    className={`w-2.5 h-2.5 rounded-full
                                            ${consoleOutput.code === -135 && 'bg-yellow-600 animate-pulse'}
                                            ${consoleOutput.code > 0 && 'bg-red-600'}
                                            ${consoleOutput.code === 0 && 'bg-green-600'}`}></span>
                                <div className="flex items-center gap-2">
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
                        <div className="flex flex-col gap-1  h-full">
                            <textarea
                                className={`w-full h-[calc(100svh-300px)] overflow-auto p-4 bg-neutral outline-0 resize-none`}
                                style={{ fontFamily: 'consolas' }}
                                value={consoleOutput.output.replaceAll(/\/piston\/jobs\/[a-f0-9\-]{36}\/file0./g, '')}
                                spellCheck={false}
                                readOnly
                            />
                            <div className="flex flex-col h-full max-h-50 rounded-b-sm border border-base-300">
                                <label
                                    htmlFor="stdin"
                                    className="text-sm font-medium text-gray-300 bg-base-300 px-2 py-1 rounded-t-sm">
                                    Entrada estándar (stdin)
                                </label>
                                <textarea
                                    id="stdin"
                                    className="textarea textarea-bordered resize-none h-full max-h-34.5 w-full outline-0"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Escribe la entrada para tu programa aquí..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutSubSection>
    );
};
