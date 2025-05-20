'use client';

import { useState } from 'react';
import { Copy, Check, Search, Lightbulb, InfoIcon } from 'lucide-react';
import { simbolos, tips } from '../../constants';
import MyPatternsRegex from './componets/MyPatternsRegex';
import PatternRegex from './componets/PatternRegex';
import { RegexPattern } from '@prisma/client';

export const commonPatterns: RegexPattern[] = [
    {
        name: 'Email',
        pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
        description:
            'Valida correos electrónicos con estructura estándar (usuario@dominio.com).',
        id: 'email',
        userId: null,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        name: 'URL',
        pattern:
            'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
        description:
            'Detecta URLs que empiezan con http o https, incluyendo subdominios y rutas.',
        id: 'url',
        userId: null,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        name: 'Teléfono',
        pattern: '(\\+?\\d{1,3}[- ]?)?\\d{9,10}',
        description:
            'Valida números telefónicos con o sin código de país (formato internacional o nacional).',
        id: 'telefono',
        userId: null,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        name: 'Fecha (DD/MM/YYYY)',
        pattern:
            '(0[1-9]|[12][0-9]|3[01])[\\/\\-](0[1-9]|1[012])[\\/\\-]\\d{4}',
        description:
            'Detecta fechas en formato día/mes/año, con separadores / o -.',
        id: 'fecha',
        userId: null,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        name: 'Código postal',
        pattern: '\\d{5}(-\\d{4})?',
        description:
            'Valida códigos postales de 5 dígitos o ZIP+4 en EE.UU. (12345 o 12345-6789).',
        id: 'codigoPostal',
        userId: null,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        name: 'Número entero',
        pattern: '^-?\\d+$',
        description: 'Detecta números enteros positivos o negativos.',
        id: 'numeroEntero',
        userId: null,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        name: 'Número decimal',
        pattern: '^-?\\d*\\.\\d+$',
        description:
            'Valida números decimales con punto como separador (e.g. 3.14, -0.5).',
        id: 'numeroDecimal',
        userId: null,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        name: 'Usuario (letras, números, guiones bajos)',
        pattern: '^[a-zA-Z0-9_]{3,16}$',
        description:
            'Valida nombres de usuario entre 3 y 16 caracteres, con letras, números y _.',
        id: 'usuario',
        userId: null,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        name: 'Contraseña segura',
        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\w\\s]).{8,}$',
        description:
            'Requiere al menos 8 caracteres con minúscula, mayúscula, número y símbolo.',
        id: 'contraseña',
        userId: null,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        name: 'Hexadecimal color',
        pattern: '^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$',
        description: 'Valida colores en formato hexadecimal (con o sin #).',
        id: 'hexadecimalColor',
        userId: null,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        name: 'Palabra (solo letras)',
        pattern: '^[A-Za-zÀ-ÿ]+$',
        description:
            'Detecta palabras que solo contienen letras, incluyendo acentuadas.',
        id: 'palabra',
        userId: null,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        name: 'IPv4',
        pattern:
            '^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$',
        description: 'Valida direcciones IPv4 (ej. 192.168.0.1).',
        id: 'ipv4',
        userId: null,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        name: 'DNI (España)',
        pattern: '\\d{8}[A-HJ-NP-TV-Z]',
        description:
            'Valid  a documentos de identidad españoles (8 dígitos seguidos de una letra).',
        id: 'dni',
        userId: null,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        name: 'CURP (México)',
        pattern: '[A-Z]{4}\\d{6}[HM][A-Z]{5}[A-Z0-9]\\d',
        description:
            'Valida la Clave Única de Registro de Población de México.',
        id: 'curp',
        userId: null,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        name: 'RFC (México)',
        pattern: '[A-ZÑ&]{3,4}\\d{6}[A-Z0-9]{3}',
        description:
            'Valida el Registro Federal de Contribuyentes mexicano (con o sin homoclave).',
        id: 'rfc',
        userId: null,
        created_at: new Date(),
        updated_at: new Date(),
    },
];

export default function RegexPage() {
    const [pattern, setPattern] = useState('');
    const [flags, setFlags] = useState('g');
    const [testString, setTestString] = useState('');
    const [matches, setMatches] = useState<string[]>([]);
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState('patterns');

    // Flags
    const [globalFlag, setGlobalFlag] = useState(true);
    const [caseInsensitiveFlag, setCaseInsensitiveFlag] = useState(false);
    const [multilineFlag, setMultilineFlag] = useState(false);
    const [dotAllFlag, setDotAllFlag] = useState(false);

    const updateFlags = () => {
        let newFlags = '';
        if (globalFlag) newFlags += 'g';
        if (caseInsensitiveFlag) newFlags += 'i';
        if (multilineFlag) newFlags += 'm';
        if (dotAllFlag) newFlags += 's';
        setFlags(newFlags);
    };

    const handleTest = () => {
        if (!pattern) return;

        try {
            const regex = new RegExp(pattern, flags);
            const allMatches = [];
            let match;

            if (globalFlag) {
                while ((match = regex.exec(testString)) !== null) {
                    allMatches.push(match[0]);
                }
            } else {
                match = regex.exec(testString);
                if (match) allMatches.push(match[0]);
            }

            setMatches(allMatches);
        } catch (error) {
            console.error('Error en la expresión regular:', error);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(`/${pattern}/${flags}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex min-h-screen w-[--max-width] bg-neutral/50">
            <div className="flex flex-col gap-2 flex-1 ">
                <header className="bg-white/3 px-4 py-2 border-b-1 border-gray-700">
                    <h1 className="text-2xl font-bold text-secondary">
                        Generador de Expresiones Regulares
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        Crea, prueba y valida expresiones regulares fácilmente
                    </p>
                </header>

                {/* name of each tab group should be unique */}
                <div className="tabs tabs-lift p-2 h-[calc(100svh-11.5em)]">
                    <input
                        type="radio"
                        name="regexTabs"
                        className="tab  [--tab-border-color:#454545] "
                        aria-label="Probar RegEx"
                        checked={activeTab === 'tester'}
                        onChange={() => setActiveTab('tester')}
                    />
                    <div className="tab-content p-4 border-1 border-gray-700 bg-base-100 h-full scrollbar-thin overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full ">
                            <div className="bg-neutral/50 px-4 py-2 rounded-sm">
                                <div>
                                    <label
                                        className="label text-sm"
                                        htmlFor="pattern">
                                        Expresión Regular
                                    </label>
                                    <div className="flex gap-2 border-b-1 border-gray-700 pb-2.5">
                                        <fieldset className="flex-1 relative">
                                            <label className="input input-sm">
                                                <span className="text-gray-400">
                                                    /
                                                </span>
                                                <input
                                                    id="pattern"
                                                    value={pattern}
                                                    onChange={(e) =>
                                                        setPattern(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Escribe tu expresión regular"
                                                />
                                            </label>
                                        </fieldset>
                                        <div className="relative">
                                            <label className="input input-sm">
                                                <span className="text-gray-400">
                                                    /
                                                </span>
                                                <input
                                                    value={flags}
                                                    onChange={(e) =>
                                                        setFlags(e.target.value)
                                                    }
                                                    className="w-10"
                                                />
                                            </label>
                                        </div>
                                        <button
                                            className="btn btn-soft btn-info btn-sm"
                                            onClick={handleCopy}>
                                            {copied ? (
                                                <Check className="h-4 w-4" />
                                            ) : (
                                                <Copy className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 py-3 border-b-1 border-gray-700">
                                    <label className="label text-sm">
                                        Flags
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <label className="cursor-pointer label text-xs">
                                            <input
                                                type="checkbox"
                                                className="toggle toggle-sm toggle-accent"
                                                checked={globalFlag}
                                                onChange={(e) => {
                                                    setGlobalFlag(
                                                        e.target.checked
                                                    );
                                                    updateFlags();
                                                }}
                                            />
                                            Global (g)
                                        </label>

                                        <label className="cursor-pointer label text-xs">
                                            <input
                                                id="case-insensitive"
                                                type="checkbox"
                                                className="toggle toggle-sm toggle-accent"
                                                checked={caseInsensitiveFlag}
                                                onChange={(e) => {
                                                    setCaseInsensitiveFlag(
                                                        e.target.checked
                                                    );
                                                    updateFlags();
                                                }}
                                            />
                                            Case Insensitive (i)
                                        </label>
                                        <label className="cursor-pointer label text-xs">
                                            <input
                                                id="multiline"
                                                type="checkbox"
                                                className="toggle toggle-sm toggle-accent"
                                                checked={multilineFlag}
                                                onChange={(e) => {
                                                    setMultilineFlag(
                                                        e.target.checked
                                                    );
                                                    updateFlags();
                                                }}
                                            />
                                            Multiline (m)
                                        </label>
                                        <label className="cursor-pointer label text-xs">
                                            <input
                                                id="dotall"
                                                type="checkbox"
                                                className="toggle toggle-sm toggle-accent"
                                                checked={dotAllFlag}
                                                onChange={(e) => {
                                                    setDotAllFlag(
                                                        e.target.checked
                                                    );
                                                    updateFlags();
                                                }}
                                            />
                                            Dot All (s)
                                        </label>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 py-3 border-b-1 border-gray-700">
                                    <label className="label text-sm flex flex-col items-start text-warning">
                                        Texto de prueba
                                        <textarea
                                            className="textarea w-full text-gray-300"
                                            value={testString}
                                            onChange={(e) =>
                                                setTestString(e.target.value)
                                            }
                                            placeholder="Escribe aquí el texto para probar tu expresión regular"
                                            rows={8}
                                        />
                                    </label>
                                    <button
                                        onClick={handleTest}
                                        className="btn btn-soft btn-primary w-full">
                                        <Search className="mr-2 h-4 w-4" />
                                        Probar expresión
                                    </button>
                                </div>
                                <div className="flex flex-col gap-1 py-3">
                                    <label className="label text-sm text-success">
                                        Resultados
                                    </label>
                                    <div className="border-1 border-gray-700 bg-base-200 rounded-sm p-4 min-h-[200px]">
                                        {matches.length > 0 ? (
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                                        Coincidencias
                                                        encontradas:{' '}
                                                        {matches.length}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {matches.map(
                                                        (match, index) => (
                                                            <div
                                                                key={index}
                                                                className="badge badge-info badge-soft">
                                                                {match}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-zinc-500 dark:text-zinc-400">
                                                {pattern
                                                    ? 'No se encontraron coincidencias'
                                                    : 'Escribe una expresión regular y pruébala'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 bg-neutral/50 px-4 py-2 rounded-sm">
                                <div className="card bg-zinc-900 border border-dashed border-zinc-700 rounded-sm overflow-hidden">
                                    <header className="p-4 border-b border-dashed border-gray-700 bg-neutral/80">
                                        <h2 className="text-lg font-semibold text-white">
                                            Guía rápida
                                        </h2>
                                        <p className="text-sm text-zinc-400">
                                            Caracteres especiales y su
                                            significado
                                        </p>
                                    </header>
                                    <div className="grid grid-cols-2 gap-4 text-sm p-4">
                                        {simbolos.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="grid grid-cols-[4.5em_1fr] gap-2">
                                                <span className="justify-self-end self-center font-mono badge badge-soft badge-accent rounded-sm badge-sm">
                                                    {item.simbolo}
                                                </span>
                                                <span className="text-gray-300 text-xs">
                                                    {item.descripcion}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-base-200 border-zinc-700 text-zinc-200 p-6 rounded-sm shadow-xl space-y-4">
                                    <div className="flex items-center gap-3">
                                        <InfoIcon className="text-blue-400" />
                                        <h2 className="text-xl font-semibold">
                                            Consejos para expresiones regulares
                                        </h2>
                                    </div>

                                    <ul className="space-y-3 pl-2 list-disc">
                                        {tips.map((tip, i) => {
                                            const parts =
                                                tip.split(/(`[^`]+`)/g);

                                            return (
                                                <li
                                                    key={i}
                                                    className="text-sm text-zinc-300 leading-relaxed">
                                                    {parts.map((part, j) =>
                                                        /^`[^`]+`$/.test(
                                                            part
                                                        ) ? (
                                                            <code
                                                                key={j}
                                                                className="badge badge-soft badge-accent font-mono badge-sm rounded-sm">
                                                                {part.slice(
                                                                    1,
                                                                    -1
                                                                )}
                                                            </code>
                                                        ) : (
                                                            <span key={j}>
                                                                {part}
                                                            </span>
                                                        )
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>

                                    <div className="flex items-center gap-2 text-xs text-zinc-400 pt-4 border-t border-zinc-700">
                                        <Lightbulb className="size-4" />
                                        Usa estos consejos como guía para
                                        construir patrones más robustos.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <input
                        type="radio"
                        name="regexTabs"
                        className="tab   [--tab-border-color:#454545] "
                        aria-label="Patrones comunes"
                        checked={activeTab === 'patterns'}
                        onChange={() => setActiveTab('patterns')}
                    />
                    <div className="tab-content border-1 border-gray-700 bg-base-100 p-4 h-full scrollbar-thin overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2 rounded-sm">
                            {commonPatterns.map((item, index) => (
                                <PatternRegex
                                    key={index}
                                    item={item}
                                    index={index}
                                    setPattern={setPattern}
                                    setActiveTab={setActiveTab}
                                />
                            ))}
                        </div>
                    </div>

                    <input
                        type="radio"
                        name="regexTabs"
                        className="tab   [--tab-border-color:#454545] "
                        aria-label="Mis patrones"
                        checked={activeTab === 'myPatterns'}
                        onChange={() => setActiveTab('myPatterns')}
                    />
                    <div className="tab-content border-1 border-gray-700 bg-base-100 p-4 h-full scrollbar-thin overflow-y-auto">
                        <MyPatternsRegex
                            setPattern={setPattern}
                            setActiveTab={setActiveTab}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
