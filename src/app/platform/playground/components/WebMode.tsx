'use client';
import { CSSIcon, HTML5Icon, JSIcon, ReactIcon, TSIcon } from '@/app/components/Icons';
import { Editor } from '@monaco-editor/react';
import type * as monacoEditor from 'monaco-editor';
import { Check, Copy, Download, EllipsisVertical, FileCode, Play, RefreshCcw, Terminal, TrashIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { FileDataWeb, FilesWeb } from '../../constants';
import Splitter from '@ihatecode/react-splitter';
import { LayoutSubSection } from '../../componentes/LayoutSubSection';

export const WebMode = () => {
    const [useTailwind, setUseTailwind] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const consoleRef = useRef<HTMLDivElement>(null);
    const [files, setFiles] = useState<FileDataWeb[]>(FilesWeb);
    const [currentFileId, setCurrentFileId] = useState<string>('html-1');
    const [webMode, setWebMode] = useState('html-css-js');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);
    const [consoleOutput, setConsoleOutput] = useState<{ type: string; content: string }[]>([]);
    const [refresh, setRefresh] = useState(true);
    const [toast, setToast] = useState({
        title: '',
        description: '',
        variant: 'info',
        open: false,
    });
    const [sizes, setSizes] = useState<{ top: number; bottom: number }>({
        top: 70,
        bottom: 30,
    });

    const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor>(null);
    const containerRef = useRef<HTMLDivElement>(null);

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

    const updateOutput = () => {
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
   `;

        if (webMode === 'html-css-js' || webMode === 'html-css-ts') {
            const htmlFiles = files.filter((file) => file.extension === 'html' && file.type === webMode);
            const cssFiles = files.filter((file) => file.extension === 'css' && file.type === webMode);
            const scriptFiles = files.filter((file) => file.extension === (webMode === 'html-css-js' ? 'js' : 'ts'));

            const htmlContent = htmlFiles.length > 0 ? htmlFiles[0].content : '';
            let cssContent = cssFiles.length > 0 ? cssFiles.map((file) => file.content).join('\n') : '';
            const scriptContent = scriptFiles.length > 0 ? scriptFiles[0].content : '';

            const combinedOutput = `
       <!DOCTYPE html>
       <html>
       <head>
         <style>${cssContent}</style>
         ${useTailwind ? '<script src="https://cdn.tailwindcss.com"></script>' : ''}
         ${consoleCapture}
         ${webMode === 'html-css-ts' ? '<script src="https://cdn.jsdelivr.net/npm/typescript@latest/lib/typescript.min.js"></script>' : ''}
       </head>
       <body>
         ${htmlContent}
         <script ${webMode === 'html-css-ts' ? 'type="text/typescript"' : ''}>
         ${scriptContent}
         </script>
         ${
             webMode === 'html-css-ts'
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
                 : ''
         }
       </body>
       </html>
     `;
            setOutput(combinedOutput);
        } else if (webMode === 'react-js' || webMode === 'react-ts') {
            const reactFiles = files.filter((file) => file.type === webMode);
            const cssFiles = files.filter((file) => file.extension === 'css' && file.type === webMode);

            const mainFile = reactFiles.find((file) => file.name.toLowerCase().includes('app')) || reactFiles[0];
            const cssContent = cssFiles.length > 0 ? cssFiles.map((file) => file.content).join('\n') : '';
            const isTypeScript = webMode === 'react-ts';

            const combinedOutput = `
         <!DOCTYPE html>
         <html>
         <head>
           <style>${cssContent}</style>
           ${useTailwind ? '<script src="https://cdn.tailwindcss.com"></script>' : ''}
           ${consoleCapture}
           <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
           <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
           <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
           ${isTypeScript ? '<script src="https://cdn.jsdelivr.net/npm/typescript@latest/lib/typescript.min.js"></script>' : ''} 
         </head>
         <body>
           <div id="root"></div>
           
          
           
           <script type="${isTypeScript ? 'text/typescript' : 'text/babel'}">
           ${mainFile.content}
           </script>
           
           ${
               isTypeScript
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
                   : ''
           }
         </body>
         </html>
       `;
            setOutput(combinedOutput);
        }
    };

    const handleRun = () => {
        setConsoleOutput([]);
        setRefresh(false);
        setTimeout(() => {
            setRefresh(true);
        }, 100);

        if (iframeRef.current) {
            iframeRef.current.srcdoc = output;
        }

        setToast({
            title: 'Código ejecutado',
            description: 'El código se ha ejecutado correctamente.',
            variant: 'info',
            open: true,
        });
        timeOutToast();
    };

    useEffect(() => {
        const handleWindowResize = () => {
            if (editorRef.current) {
                editorRef.current.layout();
            }
        };

        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    // Escuchar mensajes del iframe (para la consola)
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data && event.data.type && event.data.type.startsWith('console-')) {
                const { type, content } = event.data;
                setConsoleOutput((prev) => [...prev, { type, content }]);

                // Auto-scroll de la consola
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

    useEffect(() => {
        updateOutput();
    }, [files, webMode, currentFileId, useTailwind]);

    useEffect(() => {
        const file = files.find((f) => f.id === currentFileId);
        if (file) {
            if (file.type === 'html' || file.type === 'css' || file.type === 'js') {
                setWebMode('html-css-js');
            } else if (file.type === 'ts') {
                setWebMode('html-css-ts');
            } else if (file.type === 'react-js') {
                setWebMode('react-js');
            } else if (file.type === 'react-ts') {
                setWebMode('react-ts');
            }
        }
    }, [currentFileId]);

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
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
        const blob = new Blob([output], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'playground.html';
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
            setFiles(
                files.map((file) => {
                    if (file.id === currentFileId) {
                        return { ...file, content: '' };
                    }
                    return file;
                })
            );
            setConsoleOutput([]);
        }
    };

    const handleSelectMode = (mode: string) => {
        setWebMode(mode);
        setCurrentFileId(files.find((file) => file.type === mode)?.id || files[0].id);
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

    const renderConsoleItem = (item: { type: string; content: string }, index: number) => {
        let className = 'text-gray-400';
        let icon = null;

        switch (item.type) {
            case 'console-log':
                className = 'text-gray-400';
                icon = <span className="text-blue-500 mr-1">›</span>;
                break;
            case 'console-info':
                className = 'text-blue-500';
                icon = <span className="text-blue-500 mr-1">ℹ</span>;
                break;
            case 'console-warn':
                className = 'text-yellow-500';
                icon = <span className="text-yellow-500 mr-1">⚠</span>;
                break;
            case 'console-error':
                className = 'text-red-500';
                icon = <span className="text-red-500 mr-1">✖</span>;
                break;
            case 'console-clear':
                return null;
        }

        return (
            <div
                key={index}
                className={`${className} text-xs py-0.5 font-extralight`}
                style={{ fontFamily: 'consolas' }}>
                {icon}
                {item.content}
            </div>
        );
    };

    const clearConsole = () => {
        setConsoleOutput([]);
    };
    const getFileIcon = (fileType: string) => {
        switch (fileType) {
            case 'html':
                return <HTML5Icon className="h-5 w-5 text-orange-500" />;
            case 'css':
                return <CSSIcon className="h-5 w-5 text-blue-500" />;
            case 'css':
                return <CSSIcon className="h-5 w-5 text-blue-500" />;
            case 'js':
                return <JSIcon className="h-5 w-5 text-yellow-500" />;
            case 'ts':
                return <TSIcon className="h-5 w-5 text-blue-600" />;
            case 'jsx':
                return <ReactIcon className="h-5 w-5 text-cyan-500" />;
            case 'tsx':
                return <ReactIcon className="h-5 w-5 text-cyan-600" />;
            default:
                return <FileCode className="h-5 w-5" />;
        }
    };

    useEffect(() => {
        if (!containerRef.current || !editorRef.current) return;

        const observer = new ResizeObserver(() => {
            editorRef.current?.layout();
        });

        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <LayoutSubSection>
            <div className="flex">
                <div className="tabs w-full tabs-box" role="tablist">
                    <button
                        role="tab"
                        className={`tab ${webMode === 'html-css-js' ? 'tab-active' : ''}`}
                        onClick={() => handleSelectMode('html-css-js')}>
                        HTML/CSS/JS
                    </button>
                    <button
                        role="tab"
                        className={`tab ${webMode === 'html-css-ts' ? 'tab-active' : ''}`}
                        onClick={() => handleSelectMode('html-css-ts')}>
                        HTML/CSS/TS
                    </button>
                    <button
                        role="tab"
                        className={`tab ${webMode === 'react-js' ? 'tab-active' : ''}`}
                        onClick={() => handleSelectMode('react-js')}>
                        React JS
                    </button>
                    <button
                        role="tab"
                        className={`tab ${webMode === 'react-ts' ? 'tab-active' : ''}`}
                        onClick={() => handleSelectMode('react-ts')}>
                        React TS
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-8.7rem)] overflow-y-auto gap-4">
                <div className="flex flex-col gap-2 h-[calc(100vh-10.1rem)] overflow-hidden">
                    <Splitter
                        className="h-[calc(100vh-12rem)]"
                        direction="vertical"
                        onResize={(resized) => {
                            const top = resized?.[0]?.percent ?? 70;
                            const bottom = resized?.[1]?.percent ?? 30;
                            setSizes({ top, bottom });
                            editorRef.current?.layout();
                        }}
                        splitbar={{
                            size: 3,
                            color: '#656565',
                        }}
                        items={[
                            {
                                //size: `${sizes.top}%`,
                                size: sizes.top,
                                content: (
                                    <div className="flex flex-col h-full min-h-0 w-full ">
                                        <div className="flex justify-between gap-2 mb-2">
                                            <label className="label">
                                                <input
                                                    type="checkbox"
                                                    className="toggle toggle-info"
                                                    checked={useTailwind}
                                                    onChange={() => setUseTailwind(!useTailwind)}
                                                />
                                                {useTailwind ? 'Tailwind' : 'CSS'}
                                            </label>
                                            <div className="flex gap-2">
                                                <div className="dropdown dropdown-start">
                                                    <div tabIndex={0} role="button" className="btn btn-sm btn-soft">
                                                        <EllipsisVertical className="size-5" />
                                                    </div>
                                                    <ul
                                                        tabIndex={0}
                                                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                                        <li>
                                                            <button
                                                                className="btn btn-sm btn-ghost justify-start gap-4"
                                                                onClick={handleCopy}>
                                                                {copied ? (
                                                                    <Check className="size-4" />
                                                                ) : (
                                                                    <Copy className="size-4" />
                                                                )}
                                                                {copied ? 'Copiado' : 'Copiar HTML'}
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                className="btn btn-sm btn-ghost justify-start gap-4"
                                                                onClick={handleDownload}>
                                                                <Download className="size-4" />
                                                                Descargar
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                className="btn btn-sm btn-ghost justify-start gap-4"
                                                                onClick={handleLoad}>
                                                                <RefreshCcw className="size-4" />
                                                                Cargar
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                className="btn btn-sm btn-ghost justify-start gap-4"
                                                                onClick={handleClear}>
                                                                <TrashIcon className="size-4" />
                                                                Limpiar
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-t-sm h-8">
                                            <div className="tabs tabs-lift tabs-sm flex flex-row max-w-max">
                                                {/* Mostrar archivos según el modo actual */}
                                                {files
                                                    .filter((file) => file.type === webMode)
                                                    .map((file) => (
                                                        <label
                                                            key={file.id}
                                                            className="tab flex items-center gap-2"
                                                            onClick={() => setCurrentFileId(file.id)}>
                                                            <input
                                                                type="radio"
                                                                key={file.id}
                                                                value={file.id}
                                                                aria-label={file.name}
                                                                checked={currentFileId === file.id}
                                                                onChange={() => setCurrentFileId(file.id)}></input>
                                                            <span
                                                                className={
                                                                    currentFileId === file.id
                                                                        ? 'opacity-100'
                                                                        : 'opacity-30'
                                                                }>
                                                                {getFileIcon(file.extension)}
                                                            </span>
                                                            {file.name}
                                                        </label>
                                                    ))}
                                            </div>
                                        </div>

                                        <div
                                            className={`flex flex-col h-full w-full min-h-0 border-1 border-base-300 rounded-b-sm rounded-tr-sm overflow-hidden`}
                                            ref={containerRef}>
                                            {currentFile && (
                                                <Editor
                                                    height={'100%'}
                                                    width={'100%'}
                                                    language={currentFile.language}
                                                    value={currentFile.content}
                                                    onChange={(value) => updateCurrentFile(value || '')}
                                                    theme={'vs-dark'}
                                                    options={{
                                                        minimap: { enabled: false },
                                                        fontSize: 14,
                                                        wordWrap: 'on',
                                                        automaticLayout: false,
                                                        tabSize: 2,
                                                        scrollBeyondLastLine: false,
                                                        lineNumbers: 'on',
                                                        glyphMargin: false,
                                                        folding: true,
                                                        lineDecorationsWidth: 10,
                                                        formatOnType: true,
                                                        formatOnPaste: true,
                                                    }}
                                                    onMount={async (editor, monaco) => {
                                                        editorRef.current = editor;
                                                        monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
                                                            {
                                                                target: monaco.languages.typescript.ScriptTarget.Latest,
                                                                allowNonTsExtensions: true,
                                                                moduleResolution:
                                                                    monaco.languages.typescript.ModuleResolutionKind
                                                                        .NodeJs,
                                                                module: monaco.languages.typescript.ModuleKind.CommonJS,
                                                                noEmit: true,
                                                                esModuleInterop: true,
                                                                jsx: monaco.languages.typescript.JsxEmit.React,
                                                                reactNamespace: 'React',
                                                                allowJs: true,
                                                                typeRoots: ['node_modules/@types'],
                                                            }
                                                        );

                                                        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
                                                            {
                                                                noSemanticValidation: true,
                                                                noSyntaxValidation: true,
                                                            }
                                                        );

                                                        const uri = monaco.Uri.parse('file:///App.tsx');
                                                        let model = monaco.editor.getModel(uri);

                                                        if (!model) {
                                                            model = monaco.editor.createModel(
                                                                currentFile.content,
                                                                'typescript',
                                                                uri
                                                            );
                                                        } else {
                                                            model.setValue(currentFile.content); // Actualiza si ya existe
                                                        }

                                                        setTimeout(() => {
                                                            editor.layout();
                                                        }, 0);
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ),
                            },
                            {
                                //size: `${sizes.bottom}%`,
                                min: 35,
                                max: 320,
                                content: (
                                    <div className="border-1 border-base-300 rounded-sm h-full">
                                        <div className="bg-base-300 flex items-center justify-between px-2 rounded-t-sm">
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
                                            className={`bg-neutral backdrop-blur-sm rounded-b-sm p-2 overflow-auto  h-full`}>
                                            {consoleOutput.length > 0 ? (
                                                consoleOutput.map((item, index) => renderConsoleItem(item, index))
                                            ) : (
                                                <div
                                                    className="text-muted-foreground text-xs text-gray-400 p-2"
                                                    style={{ fontFamily: 'consolas' }}>
                                                    La consola está vacía. Usa console.log() en tu código JavaScript
                                                    para ver mensajes aquí.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ),
                            },
                        ]}
                    />
                </div>
                <div className="flex flex-col gap-2 h-[calc(100vh-162px)]">
                    <div className="flex flex-wrap items-center gap-2">
                        <button onClick={handleRun} className="btn btn-success btn-sm">
                            <Play className="size-4" />
                            Ejecutar
                        </button>
                    </div>
                    <div className="rounded-t-md overflow-hidden h-full border border-base-300">
                        <div className="px-2 py-1.5 backdrop-blur-sm border-b border-base-300 bg-base-100 flex items-center">
                            <div className="flex space-x-1.5">
                                <div className="status status-lg status-error"></div>
                                <div className="status status-lg status-warning"></div>
                                <div className="status status-lg status-success"></div>
                            </div>
                            <div className="mx-auto text-sm font-light text-muted-foreground">Vista previa</div>
                        </div>

                        {refresh && (
                            <iframe
                                ref={iframeRef}
                                srcDoc={output}
                                title="preview"
                                className="w-full h-[calc(100%-32px)] border-none"
                                sandbox="allow-scripts"></iframe>
                        )}
                    </div>
                </div>
            </div>
        </LayoutSubSection>
    );
};
