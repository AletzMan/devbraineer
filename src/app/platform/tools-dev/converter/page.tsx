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
    ShieldCheck,
} from 'lucide-react';
import jsonToTS from 'json-to-ts';
import { json2xml, xml2json } from 'xml-js';
import { Editor } from '@monaco-editor/react';
import { CodeBlock } from 'react-code-block';
import { themes } from 'prism-react-renderer';
import { JSIcon, TSIcon } from '@/app/components/Icons';
import HeaderSection from '../../componentes/HeaderSection';
import Ajv from 'ajv';
import ReactJson from 'react-json-view';
import generateSchema from 'json-schema-generator';

export default function ConverterPage() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [activeTab, setActiveTab] = useState('json-to-object');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState<['json' | '', 'ts']>(
        ['json', 'ts']
    );

    // Para validación con JSON Schema
    const [schemaInput, setSchemaInput] = useState('');
    const [validationResult, setValidationResult] = useState<{
        valid: boolean;
        errors?: Ajv.ErrorObject[] | null;
    } | null>(null);

    const handleConvert = () => {
        setError(null);
        setOutput('');
        setValidationResult(null);

        if (input.trim() === '') {
            setError('La entrada no puede estar vacía.');
            return;
        }

        try {
            switch (activeTab) {
                case 'json-to-object':
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

                    const parsedObjectToJson = JSON.parse(cleanInputForJson);
                    setOutput(JSON.stringify(parsedObjectToJson, null, 2));
                    break;

                case 'json-to-ts':
                    const parsedJsonToTs = JSON.parse(input);
                    const tsInterfaces = jsonToTS(parsedJsonToTs).join('\n\n');
                    setOutput(tsInterfaces);
                    break;

                case 'json-to-xml':
                    const parsedJsonToXml = JSON.parse(input);
                    const xmlOutput = json2xml(parsedJsonToXml, {
                        compact: true,
                        ignoreComment: true,
                        spaces: 2,
                    });
                    setOutput(xmlOutput);
                    break;

                case 'xml-to-json':
                    const jsonOutput = xml2json(input, {
                        compact: true,
                        ignoreComment: true,
                        spaces: 2,
                    });
                    setOutput(jsonOutput);
                    break;

                case 'json-to-schema':
                    const parsedJsonToSchema = JSON.parse(input);
                    const schemas = generateSchema(parsedJsonToSchema);
                    setOutput(JSON.stringify(schemas, null, 2));
                    break;

                case 'validate-json':
                    // Validar JSON con JSON Schema
                    if (schemaInput.trim() === '') {
                        setError('El JSON Schema no puede estar vacío.');
                        return;
                    }
                    let schema;
                    let data;
                    try {
                        schema = JSON.parse(schemaInput);
                    } catch (e) {
                        setError(
                            'Error al parsear el JSON Schema: ' +
                                (e instanceof Error ? e.message : String(e))
                        );
                        return;
                    }
                    try {
                        data = JSON.parse(input);
                    } catch (e) {
                        setError(
                            'Error al parsear el JSON a validar: ' +
                                (e instanceof Error ? e.message : String(e))
                        );
                        return;
                    }

                    const ajv = new Ajv({ allErrors: true });
                    const validate = ajv.compile(schema);
                    const valid = validate(data);

                    if (valid) {
                        setValidationResult({ valid: true });
                        setOutput('JSON válido según el esquema.');
                    } else {
                        setValidationResult({
                            valid: false,
                            errors: validate.errors,
                        });
                        setOutput(
                            'JSON NO válido según el esquema. Revisa los errores abajo.'
                        );
                    }
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
        setValidationResult(null);
        setSchemaInput('');
    };

    const handleSwap = () => {
        setInput(output);
        setOutput('');
        setError(null);
        setValidationResult(null);
        if (activeTab === 'json-to-xml') setActiveTab('xml-to-json');
        else if (activeTab === 'xml-to-json') setActiveTab('json-to-xml');
    };

    return (
        <div className="flex h-[calc(100svh-4.2em)] bg-neutral/40 text-gray-200 scrollbar-thin overflow-y-auto">
            <div className="flex flex-col flex-1 gap-4 max-w-[1650px] mx-auto w-full">
                <HeaderSection
                    title="Convertidor de Datos"
                    description="Convierte entre diferentes formatos de datos como JSON, JavaScript, TypeScript y XML, y valida JSON con JSON Schema.">
                    <select
                        className="select select-primary"
                        value={activeTab}
                        onChange={(e) => {
                            setActiveTab(e.target.value);
                            setError(null);
                            setOutput('');
                            setValidationResult(null);
                        }}>
                        <option value="json-to-object">JSON a JS Objeto</option>
                        <option value="object-to-json">JS Objeto a JSON</option>
                        <option value="json-to-ts">JSON a TypeScript</option>
                        <option value="json-to-xml">JSON a XML</option>
                        <option value="xml-to-json">XML a JSON</option>
                        <option value="json-to-schema">
                            JSON a JSON Schema
                        </option>
                        <option value="validate-json">
                            Validar JSON con JSON Schema
                        </option>
                    </select>
                </HeaderSection>

                {activeTab === 'validate-json' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 bg-neutral-900 rounded-sm border border-gray-700">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between h-10 bg-base-300 px-4 rounded-t-sm border border-gray-700 border-b-0">
                                <h2 className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                    <ShieldCheck className="h-5 w-5 text-cyan-400" />
                                    JSON Schema
                                </h2>
                            </div>
                            <div className="relative border-1 border-gray-700 rounded-b-sm overflow-hidden">
                                <Editor
                                    value={schemaInput}
                                    onChange={(value) =>
                                        setSchemaInput(value || '')
                                    }
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
                                    <FileJson2 className="h-5 w-5 text-yellow-400" />
                                    JSON a validar
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
                            <button
                                className="btn btn-primary btn-sm mt-2 font-light"
                                onClick={handleConvert}
                                disabled={
                                    input.trim() === '' ||
                                    schemaInput.trim() === ''
                                }>
                                Validar JSON
                            </button>

                            {validationResult && (
                                <div
                                    className={`mt-4 p-4 rounded-md ${
                                        validationResult.valid
                                            ? 'bg-green-900 text-green-400'
                                            : 'bg-red-900 text-red-400'
                                    }`}>
                                    {validationResult.valid ? (
                                        <div className="flex items-center gap-2">
                                            <Check className="w-5 h-5" />
                                            JSON válido según el esquema
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-2 mb-2">
                                                <AlertCircle className="w-5 h-5" />
                                                JSON NO válido. Errores:
                                            </div>
                                            <ul className="list-disc list-inside max-h-48 overflow-y-auto text-sm">
                                                {validationResult.errors?.map(
                                                    (err, i) => (
                                                        <li key={i}>
                                                            <code>
                                                                {err.dataPath ||
                                                                    '/'}
                                                                : {err.message}
                                                            </code>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </>
                                    )}
                                </div>
                            )}

                            {validationResult && (
                                <div className="mt-4 rounded-md bg-neutral-800 p-2 overflow-auto max-h-96 border border-gray-700">
                                    <h3 className="text-gray-300 mb-1">
                                        Vista JSON Schema:
                                    </h3>
                                    <ReactJson
                                        src={JSON.parse(schemaInput)}
                                        name={null}
                                        collapsed={2}
                                        enableClipboard={false}
                                        displayDataTypes={false}
                                        displayObjectSize={false}
                                        theme="monokai"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-center items-center gap-4">
                            <button
                                className="btn btn-primary btn-sm font-light"
                                onClick={handleConvert}
                                disabled={input.trim() === ''}>
                                Convertir
                            </button>
                            <button
                                className="btn btn-secondary btn-sm font-light"
                                onClick={handleClear}>
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 bg-neutral-900 rounded-sm border border-gray-700">
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
                                        onChange={(value) =>
                                            setInput(value || '')
                                        }
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
                                        ) : activeTab === 'object-to-json' ? (
                                            <FileJson2 className="h-5 w-5 text-yellow-400" />
                                        ) : activeTab === 'json-to-ts' ? (
                                            <TSIcon className="h-5 w-5 text-blue-500" />
                                        ) : activeTab === 'json-to-xml' ? (
                                            <CodeXml className="h-5 w-5 text-green-400" />
                                        ) : (
                                            <FileJson2 className="h-5 w-5 text-yellow-400" />
                                        )}
                                        {activeTab === 'json-to-object'
                                            ? 'Objeto JavaScript generado'
                                            : activeTab === 'object-to-json'
                                              ? 'JSON generado'
                                              : activeTab === 'json-to-ts'
                                                ? 'Interfaces TypeScript'
                                                : activeTab === 'json-to-xml'
                                                  ? 'XML generado'
                                                  : 'JSON generado'}
                                    </h2>
                                </div>
                                <div className="relative border-1 border-gray-700 rounded-b-sm overflow-hidden">
                                    {activeTab === 'json-to-object' ||
                                    activeTab === 'object-to-json' ? (
                                        <CodeBlock
                                            code={output}
                                            language="typescript"
                                            theme={themes.vsDark}>
                                            <div className="relative ">
                                                <CodeBlock.Code className="bg-neutral-900 !p-6 rounded-b-sm shadow-lg border-1 border-gray-700 h-40 overflow-y-auto scrollbar-thin">
                                                    <div className="table-row">
                                                        <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
                                                        <CodeBlock.LineContent className="table-cell">
                                                            <CodeBlock.Token />
                                                        </CodeBlock.LineContent>
                                                    </div>
                                                </CodeBlock.Code>
                                            </div>
                                        </CodeBlock>
                                    ) : (
                                        <Editor
                                            value={output}
                                            onChange={() => {}}
                                            height="calc(100svh - 255px)"
                                            defaultLanguage={
                                                activeTab === 'json-to-ts'
                                                    ? 'typescript'
                                                    : activeTab ===
                                                        'json-to-xml'
                                                      ? 'xml'
                                                      : 'json'
                                            }
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
                                                readOnly: true,
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {error && (
                    <div className="mt-4 text-red-500 font-semibold px-4">
                        {error}
                    </div>
                )}

                {copied && (
                    <div className="fixed bottom-10 right-10 z-50 bg-green-600 rounded-md p-3 text-white text-sm">
                        Copiado al portapapeles!
                    </div>
                )}
            </div>
        </div>
    );
}
