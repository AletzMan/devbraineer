'use client';

import { useState } from 'react';
import {
    ArrowLeftRight,
    Copy,
    Check,
    AlertCircle,
    FileJson2,
    CodeXml,
    BrushCleaning,
} from 'lucide-react';
import jsonToTS from 'json-to-ts';
import { json2xml, xml2json } from 'xml-js';
import { Editor } from '@monaco-editor/react';
import { CodeBlock } from 'react-code-block';
import { themes } from 'prism-react-renderer';
import { JSIcon, TSIcon } from '@/app/components/Icons';

export default function ConverterPage() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [activeTab, setActiveTab] = useState('json-to-object');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleConvert = () => {
        setError(null);
        setOutput('');

        if (input.trim() === '') {
            setError('La entrada no puede estar vacía.');
            return;
        }

        try {
            switch (activeTab) {
                case 'json-to-object':
                    // JSON a Objeto JavaScript (lógica existente)
                    const parsedJsonToObject = JSON.parse(input);
                    const resultObject =
                        typeof parsedJsonToObject === 'object'
                            ? `const data = ${JSON.stringify(
                                  parsedJsonToObject,
                                  null,
                                  2
                              )
                                  .replace(/"([^"]+)":/g, '$1:') // Quita comillas de las claves
                                  .replace(/"/g, "'")};` // Cambia comillas dobles por simples
                            : `const data = ${JSON.stringify(parsedJsonToObject)};`;
                    setOutput(resultObject);
                    break;

                case 'object-to-json':
                    const cleanInputForJson = input
                        .replace(/const\s+\w+\s*=\s*/, '')
                        .replace(/let\s+\w+\s*=\s*/, '')
                        .replace(/var\s+\w+\s*=\s*/, '')
                        .replace(/;$/, '')
                        .replace(/'/g, '"')
                        .replace(/(\w+):/g, '"$1":'); // Asegura comillas en las claves

                    const parsedObjectToJson = JSON.parse(cleanInputForJson); // JSON.parse requiere comillas dobles en claves
                    setOutput(JSON.stringify(parsedObjectToJson, null, 2));
                    break;

                case 'json-to-ts':
                    // JSON a TypeScript Interfaces
                    const parsedJsonToTs = JSON.parse(input);
                    // jsonToTS devuelve un array de strings (cada string es una interfaz)
                    const tsInterfaces = jsonToTS(parsedJsonToTs).join('\n\n'); // Une las interfaces con doble salto de línea
                    setOutput(tsInterfaces);
                    break;

                case 'json-to-xml':
                    // JSON a XML
                    const parsedJsonToXml = JSON.parse(input);
                    // json2xml requiere el objeto JSON y opciones (compact: true para formato más legible)
                    const xmlOutput = json2xml(parsedJsonToXml, {
                        compact: true,
                        ignoreComment: true,
                        spaces: 2,
                    });
                    setOutput(xmlOutput);
                    break;

                case 'xml-to-json':
                    // XML a JSON
                    // xml2json requiere el string XML y opciones (compact: true para formato más legible)
                    const jsonOutput = xml2json(input, {
                        compact: true,
                        ignoreComment: true,
                        spaces: 2,
                    });
                    // La salida de xml2json es un string JSON
                    setOutput(jsonOutput);
                    break;

                default:
                    setError('Tipo de conversión no soportado.');
                    break;
            }
        } catch (err) {
            setError(
                `Error al convertir: ${err instanceof Error ? err.message : String(err)}`
            );
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClear = () => {
        setInput('');
        setOutput('');
        setError(null);
    };

    const handleSwap = () => {
        setInput(output);
        setOutput('');
        setError(null);
        if (activeTab === 'json-to-xml') setActiveTab('xml-to-json');
        else if (activeTab === 'xml-to-json') setActiveTab('json-to-xml');
    };

    return (
        <div className="flex min-h-screen bg-neutral/40 text-gray-200 scrollbar-thin overflow-y-auto">
            <div className="flex flex-col flex-1 gap-4 max-w-[1650px] mx-auto w-full">
                <header className="flex flex-col md:flex-row items-center justify-between border-b px-4 py-2 border-gray-700 gap-4 bg-white/3">
                    <div className="flex flex-col text-center md:text-left">
                        <h1 className="text-3xl font-bold text-secondary">
                            Convertidor de Datos
                        </h1>
                        <p className="text-gray-400">
                            Convierte entre diferentes formatos de datos como
                            JSON, JavaScript, TypeScript y XML.
                        </p>
                    </div>
                    <select
                        className="select select-primary"
                        value={activeTab}
                        onChange={(e) => setActiveTab(e.target.value)}>
                        <option value="json-to-object">JSON a JS Objeto</option>
                        <option value="object-to-json">JS Objeto a JSON</option>
                        <option value="json-to-ts">JSON a TypeScript</option>
                        <option value="json-to-xml">JSON a XML</option>
                        <option value="xml-to-json">XML a JSON</option>
                    </select>
                </header>

                <div className="flex justify-center items-center gap-4">
                    <button
                        className="btn btn-primary btn-sm font-light"
                        onClick={handleConvert}
                        disabled={input.trim() === ''}>  
                        Convertir 
                    </button>
                    <button className="btn btn-secondary btn-sm font-light" onClick={handleClear}>
                        <BrushCleaning className="size-4" />
                        Limpiar
                    </button>
                    {(activeTab === 'json-to-xml' ||
                        activeTab === 'xml-to-json') && (
                        <button
                            className="btn btn-outline btn-info btn-sm "
                            onClick={handleSwap}
                            disabled={output.trim() === ''}>
                            <ArrowLeftRight className="h-4 w-4 mr-2 transform rotate-90" />
                            Intercambiar
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 bg-neutral-900">
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between h-10 bg-base-300 px-4 rounded-t-sm border border-gray-700 border-b-0">
                            <h2 className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                {activeTab === 'json-to-object' ||
                                activeTab === 'json-to-ts' ||
                                activeTab === 'json-to-xml' ? (
                                    <FileJson2 className="h-5 w-5 text-yellow-400" />
                                ) : activeTab === 'object-to-json' ? (
                                    <JSIcon className="h-5 w-5" />
                                ) : (
                                    <CodeXml className="h-5 w-5 text-green-400" />
                                )}
                                {activeTab === 'json-to-object'
                                    ? 'JSON de entrada'
                                    : activeTab === 'object-to-json'
                                      ? 'Objeto JavaScript de entrada'
                                      : activeTab === 'json-to-ts'
                                        ? 'JSON de entrada'
                                        : activeTab === 'json-to-xml'
                                          ? 'JSON de entrada'
                                          : 'XML de entrada'}
                            </h2>
                        </div>
                        <div className="relative border-1 border-gray-700 rounded-b-sm overflow-hidden">
                            <Editor
                                value={input}
                                onChange={(value) => setInput(value || '')}
                                height="calc(100svh - 255px)"
                                defaultLanguage="json"
                                theme="vs-dark"
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
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center justify-between h-10 bg-base-300 px-4 rounded-t-sm border border-gray-700 border-b-0">
                            <h2 className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                {activeTab === 'json-to-object' ? (
                                    <JSIcon className="h-5 w-5" />
                                ) : activeTab === 'object-to-json' ||
                                  activeTab === 'xml-to-json' ? (
                                    <FileJson2 className="h-5 w-5 text-yellow-400" />
                                ) : activeTab === 'json-to-ts' ? (
                                    <TSIcon className="h-5 w-5 text-cyan-400" />
                                ) : (
                                    <CodeXml className="h-5 w-5 text-green-400" />
                                )}
                                {activeTab === 'json-to-object'
                                    ? 'Objeto JavaScript de salida'
                                    : activeTab === 'object-to-json'
                                      ? 'JSON de salida'
                                      : activeTab === 'json-to-ts'
                                        ? 'TypeScript Interfaces de salida'
                                        : activeTab === 'json-to-xml'
                                          ? 'XML de salida'
                                          : 'JSON de salida'}
                            </h2>
                            {output && (
                                <button
                                    className="btn btn-ghost btn-sm text-gray-400 hover:text-white"
                                    onClick={handleCopy}>
                                    {copied ? (
                                        <>
                                            <Check className="h-4 w-4 mr-1 text-green-500" />
                                            Copiado
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-4 w-4 mr-1" />
                                            Copiar
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                        <div className="relative">
                            <CodeBlock
                                code={output}
                                language="typescript"
                                theme={themes.oneDark}>
                                <div className="relative ">
                                    <CodeBlock.Code className="bg-neutral-900 !p-6 rounded-b-sm shadow-lg border-1 border-gray-700 h-[calc(100svh-255px)] overflow-y-auto scrollbar-thin">
                                        <div className="table-row">
                                            <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
                                            <CodeBlock.LineContent className="table-cell">
                                                <CodeBlock.Token />
                                            </CodeBlock.LineContent>
                                        </div>
                                    </CodeBlock.Code>
                                </div>
                            </CodeBlock>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="alert alert-error bg-red-800 text-red-200 border-red-700 mt-4 rounded-md">
                        <AlertCircle className="h-5 w-5 text-red-400" />
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
