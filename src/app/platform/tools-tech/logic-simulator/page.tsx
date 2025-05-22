'use client';

import { useState, useEffect } from 'react';
import { HardDrive, Info } from 'lucide-react';

export default function LogicSimulatorPage() {
    // Estado para las entradas
    const [inputA, setInputA] = useState(false);
    const [inputB, setInputB] = useState(false);
    const [inputC, setInputC] = useState(false);

    // Estado para el tipo de compuerta
    const [gateType, setGateType] = useState('and');

    // Estado para los resultados
    const [result, setResult] = useState(false);
    const [truthTable, setTruthTable] = useState<{ a: boolean; b: boolean; c?: boolean; output: boolean }[]>([]);

    // Estado para la pestaña activa
    const [activeTab, setActiveTab] = useState('simulator');

    // Calcular el resultado basado en las entradas y el tipo de compuerta
    useEffect(() => {
        let output = false;

        switch (gateType) {
            case 'and':
                output = inputA && inputB;
                break;
            case 'or':
                output = inputA || inputB;
                break;
            case 'nand':
                output = !(inputA && inputB);
                break;
            case 'nor':
                output = !(inputA || inputB);
                break;
            case 'xor':
                output = (inputA || inputB) && !(inputA && inputB);
                break;
            case 'xnor':
                output = !((inputA || inputB) && !(inputA && inputB));
                break;
            case 'not':
                output = !inputA;
                break;
            case 'and3':
                output = inputA && inputB && inputC;
                break;
            case 'or3':
                output = inputA || inputB || inputC;
                break;
        }

        setResult(output);
    }, [inputA, inputB, inputC, gateType]);

    // Generar la tabla de verdad
    useEffect(() => {
        const table = [];

        if (gateType === 'not') {
            table.push({ a: false, output: !false });
            table.push({ a: true, output: !true });
        } else if (gateType === 'and3' || gateType === 'or3') {
            for (let a = 0; a <= 1; a++) {
                for (let b = 0; b <= 1; b++) {
                    for (let c = 0; c <= 1; c++) {
                        const boolA = Boolean(a);
                        const boolB = Boolean(b);
                        const boolC = Boolean(c);
                        let output = false;

                        if (gateType === 'and3') {
                            output = boolA && boolB && boolC;
                        } else if (gateType === 'or3') {
                            output = boolA || boolB || boolC;
                        }

                        table.push({ a: boolA, b: boolB, c: boolC, output });
                    }
                }
            }
        } else {
            for (let a = 0; a <= 1; a++) {
                for (let b = 0; b <= 1; b++) {
                    const boolA = Boolean(a);
                    const boolB = Boolean(b);
                    let output = false;

                    switch (gateType) {
                        case 'and':
                            output = boolA && boolB;
                            break;
                        case 'or':
                            output = boolA || boolB;
                            break;
                        case 'nand':
                            output = !(boolA && boolB);
                            break;
                        case 'nor':
                            output = !(boolA || boolB);
                            break;
                        case 'xor':
                            output = (boolA || boolB) && !(boolA && boolB);
                            break;
                        case 'xnor':
                            output = !((boolA || boolB) && !(boolA && boolB));
                            break;
                    }

                    table.push({ a: boolA, b: boolB, output });
                }
            }
        }

        setTruthTable(
            table as {
                a: boolean;
                b: boolean;
                c?: boolean | undefined;
                output: boolean;
            }[]
        );
    }, [gateType]);

    // Renderizar el símbolo de la compuerta lógica
    const renderGateSymbol = () => {
        // Nota: Los SVG se mantienen igual ya que son gráficos puros y no dependen de la UI framework.
        // Solo se aseguran de usar 'currentColor' y clases de texto para alineación con el tema.
        switch (gateType) {
            case 'and':
                return (
                    <svg width="120" height="80" viewBox="0 0 120 80" className="mx-auto">
                        <path
                            d="M30,10 L30,70 L70,70 Q90,40 70,10 L30,10 Z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <line x1="10" y1="25" x2="30" y2="25" stroke="currentColor" strokeWidth="2" />
                        <line x1="10" y1="55" x2="30" y2="55" stroke="currentColor" strokeWidth="2" />
                        <line x1="90" y1="40" x2="110" y2="40" stroke="currentColor" strokeWidth="2" />
                        <circle
                            cx="10"
                            cy="25"
                            r="5"
                            fill={inputA ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle
                            cx="10"
                            cy="55"
                            r="5"
                            fill={inputB ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle
                            cx="110"
                            cy="40"
                            r="5"
                            fill={result ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <text x="15" y="25" dominantBaseline="middle" className="text-xs">
                            A
                        </text>
                        <text x="15" y="55" dominantBaseline="middle" className="text-xs">
                            B
                        </text>
                        <text x="100" y="30" dominantBaseline="middle" className="text-xs">
                            Out
                        </text>
                    </svg>
                );
            case 'or':
                return (
                    <svg width="120" height="80" viewBox="0 0 120 80" className="mx-auto">
                        <path
                            d="M30,10 Q50,10 70,40 Q50,70 30,70 Q40,40 30,10 Z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <line x1="10" y1="25" x2="33" y2="25" stroke="currentColor" strokeWidth="2" />
                        <line x1="10" y1="55" x2="33" y2="55" stroke="currentColor" strokeWidth="2" />
                        <line x1="70" y1="40" x2="110" y2="40" stroke="currentColor" strokeWidth="2" />
                        <circle
                            cx="10"
                            cy="25"
                            r="5"
                            fill={inputA ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle
                            cx="10"
                            cy="55"
                            r="5"
                            fill={inputB ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle
                            cx="110"
                            cy="40"
                            r="5"
                            fill={result ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <text x="15" y="25" dominantBaseline="middle" className="text-xs">
                            A
                        </text>
                        <text x="15" y="55" dominantBaseline="middle" className="text-xs">
                            B
                        </text>
                        <text x="100" y="30" dominantBaseline="middle" className="text-xs">
                            Out
                        </text>
                    </svg>
                );
            case 'nand':
                return (
                    <svg width="120" height="80" viewBox="0 0 120 80" className="mx-auto">
                        <path
                            d="M30,10 L30,70 L70,70 Q90,40 70,10 L30,10 Z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <line x1="10" y1="25" x2="30" y2="25" stroke="currentColor" strokeWidth="2" />
                        <line x1="10" y1="55" x2="30" y2="55" stroke="currentColor" strokeWidth="2" />
                        <line x1="95" y1="40" x2="110" y2="40" stroke="currentColor" strokeWidth="2" />
                        <circle
                            cx="10"
                            cy="25"
                            r="5"
                            fill={inputA ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle
                            cx="10"
                            cy="55"
                            r="5"
                            fill={inputB ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle
                            cx="110"
                            cy="40"
                            r="5"
                            fill={result ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle cx="90" cy="40" r="5" fill="none" stroke="currentColor" strokeWidth="2" />{' '}
                        {/* Inversion circle */}
                        <text x="15" y="25" dominantBaseline="middle" className="text-xs">
                            A
                        </text>
                        <text x="15" y="55" dominantBaseline="middle" className="text-xs">
                            B
                        </text>
                        <text x="100" y="30" dominantBaseline="middle" className="text-xs">
                            Out
                        </text>
                    </svg>
                );
            case 'nor':
                return (
                    <svg width="120" height="80" viewBox="0 0 120 80" className="mx-auto">
                        <path
                            d="M30,10 Q50,10 70,40 Q50,70 30,70 Q40,40 30,10 Z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <line x1="10" y1="25" x2="33" y2="25" stroke="currentColor" strokeWidth="2" />
                        <line x1="10" y1="55" x2="33" y2="55" stroke="currentColor" strokeWidth="2" />
                        <line x1="75" y1="40" x2="110" y2="40" stroke="currentColor" strokeWidth="2" />
                        <circle
                            cx="10"
                            cy="25"
                            r="5"
                            fill={inputA ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle
                            cx="10"
                            cy="55"
                            r="5"
                            fill={inputB ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle
                            cx="110"
                            cy="40"
                            r="5"
                            fill={result ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle cx="70" cy="40" r="5" fill="none" stroke="currentColor" strokeWidth="2" />{' '}
                        {/* Inversion circle */}
                        <text x="15" y="25" dominantBaseline="middle" className="text-xs">
                            A
                        </text>
                        <text x="15" y="55" dominantBaseline="middle" className="text-xs">
                            B
                        </text>
                        <text x="100" y="30" dominantBaseline="middle" className="text-xs">
                            Out
                        </text>
                    </svg>
                );
            case 'xor':
                return (
                    <svg width="120" height="80" viewBox="0 0 120 80" className="mx-auto">
                        <path
                            d="M35,10 Q55,10 75,40 Q55,70 35,70 Q45,40 35,10 Z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <path d="M25,10 Q35,40 25,70" fill="none" stroke="currentColor" strokeWidth="2" />{' '}
                        {/* XOR arc */}
                        <line x1="10" y1="25" x2="38" y2="25" stroke="currentColor" strokeWidth="2" />
                        <line x1="10" y1="55" x2="38" y2="55" stroke="currentColor" strokeWidth="2" />
                        <line x1="75" y1="40" x2="110" y2="40" stroke="currentColor" strokeWidth="2" />
                        <circle
                            cx="10"
                            cy="25"
                            r="5"
                            fill={inputA ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle
                            cx="10"
                            cy="55"
                            r="5"
                            fill={inputB ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle
                            cx="110"
                            cy="40"
                            r="5"
                            fill={result ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <text x="15" y="25" dominantBaseline="middle" className="text-xs">
                            A
                        </text>
                        <text x="15" y="55" dominantBaseline="middle" className="text-xs">
                            B
                        </text>
                        <text x="100" y="30" dominantBaseline="middle" className="text-xs">
                            Out
                        </text>
                    </svg>
                );
            case 'xnor':
                return (
                    <svg width="120" height="80" viewBox="0 0 120 80" className="mx-auto">
                        <path
                            d="M35,10 Q55,10 75,40 Q55,70 35,70 Q45,40 35,10 Z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <path d="M25,10 Q35,40 25,70" fill="none" stroke="currentColor" strokeWidth="2" />{' '}
                        {/* XOR arc */}
                        <line x1="10" y1="25" x2="38" y2="25" stroke="currentColor" strokeWidth="2" />
                        <line x1="10" y1="55" x2="38" y2="55" stroke="currentColor" strokeWidth="2" />
                        <line x1="80" y1="40" x2="110" y2="40" stroke="currentColor" strokeWidth="2" />
                        <circle
                            cx="10"
                            cy="25"
                            r="5"
                            fill={inputA ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle
                            cx="10"
                            cy="55"
                            r="5"
                            fill={inputB ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle
                            cx="110"
                            cy="40"
                            r="5"
                            fill={result ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle cx="75" cy="40" r="5" fill="none" stroke="currentColor" strokeWidth="2" />{' '}
                        {/* Inversion circle */}
                        <text x="15" y="25" dominantBaseline="middle" className="text-xs">
                            A
                        </text>
                        <text x="15" y="55" dominantBaseline="middle" className="text-xs">
                            B
                        </text>
                        <text x="100" y="30" dominantBaseline="middle" className="text-xs">
                            Out
                        </text>
                    </svg>
                );
            case 'not':
                return (
                    <svg width="120" height="80" viewBox="0 0 120 80" className="mx-auto">
                        <path d="M30,20 L30,60 L70,40 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                        <line x1="10" y1="40" x2="30" y2="40" stroke="currentColor" strokeWidth="2" />
                        <line x1="75" y1="40" x2="110" y2="40" stroke="currentColor" strokeWidth="2" />
                        <circle
                            cx="10"
                            cy="40"
                            r="5"
                            fill={inputA ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle
                            cx="110"
                            cy="40"
                            r="5"
                            fill={result ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle cx="70" cy="40" r="5" fill="none" stroke="currentColor" strokeWidth="2" />{' '}
                        {/* Inversion circle */}
                        <text x="15" y="40" dominantBaseline="middle" className="text-xs">
                            A
                        </text>
                        <text x="100" y="30" dominantBaseline="middle" className="text-xs">
                            Out
                        </text>
                    </svg>
                );
            case 'and3':
                return (
                    <svg width="120" height="100" viewBox="0 0 120 100" className="mx-auto">
                        <path
                            d="M30,10 L30,90 L70,90 Q90,50 70,10 L30,10 Z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <line x1="10" y1="25" x2="30" y2="25" stroke="currentColor" strokeWidth="2" />
                        <line x1="10" y1="50" x2="30" y2="50" stroke="currentColor" strokeWidth="2" />
                        <line x1="10" y1="75" x2="30" y2="75" stroke="currentColor" strokeWidth="2" />
                        <line x1="90" y1="50" x2="110" y2="50" stroke="currentColor" strokeWidth="2" />
                        <circle
                            cx="10"
                            cy="25"
                            r="5"
                            fill={inputA ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle
                            cx="10"
                            cy="50"
                            r="5"
                            fill={inputB ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle
                            cx="10"
                            cy="75"
                            r="5"
                            fill={inputC ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle
                            cx="110"
                            cy="50"
                            r="5"
                            fill={result ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <text x="15" y="25" dominantBaseline="middle" className="text-xs">
                            A
                        </text>
                        <text x="15" y="50" dominantBaseline="middle" className="text-xs">
                            B
                        </text>
                        <text x="15" y="75" dominantBaseline="middle" className="text-xs">
                            C
                        </text>
                        <text x="100" y="40" dominantBaseline="middle" className="text-xs">
                            Out
                        </text>
                    </svg>
                );
            case 'or3':
                return (
                    <svg width="120" height="100" viewBox="0 0 120 100" className="mx-auto">
                        <path
                            d="M30,10 Q50,10 70,50 Q50,90 30,90 Q40,50 30,10 Z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <line x1="10" y1="25" x2="33" y2="25" stroke="currentColor" strokeWidth="2" />
                        <line x1="10" y1="50" x2="33" y2="50" stroke="currentColor" strokeWidth="2" />
                        <line x1="10" y1="75" x2="33" y2="75" stroke="currentColor" strokeWidth="2" />
                        <line x1="70" y1="50" x2="110" y2="50" stroke="currentColor" strokeWidth="2" />
                        <circle
                            cx="10"
                            cy="25"
                            r="5"
                            fill={inputA ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle
                            cx="10"
                            cy="50"
                            r="5"
                            fill={inputB ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle
                            cx="10"
                            cy="75"
                            r="5"
                            fill={inputC ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle
                            cx="110"
                            cy="50"
                            r="5"
                            fill={result ? '#4de1fc' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <text x="15" y="25" dominantBaseline="middle" className="text-xs">
                            A
                        </text>
                        <text x="15" y="50" dominantBaseline="middle" className="text-xs">
                            B
                        </text>
                        <text x="15" y="75" dominantBaseline="middle" className="text-xs">
                            C
                        </text>
                        <text x="100" y="40" dominantBaseline="middle" className="text-xs">
                            Out
                        </text>
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex min-h-screen bg-base-200 tech-pattern text-base-content">
            {' '}
            {/* Reemplaza bg-background con bg-base-200 y text-foreground con text-base-content */}
            <div className="flex-1 max-w-6xl mx-auto p-4">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <HardDrive className="h-6 w-6 text-primary" />{' '}
                        {/* Usa text-primary para un color temático de DaisyUI */}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
                            {' '}
                            {/* Ajusta el gradiente a tus colores tech-blue */}
                            Simulador de Lógica Digital
                        </span>
                    </h1>
                    <p className="text-base-content/80">
                        {' '}
                        {/* Usa text-base-content/80 para muted-foreground */}
                        Simula y visualiza el comportamiento de compuertas lógicas
                    </p>
                </div>

                {/* Tabs Component - DaisyUI `tabs` */}
                <div className="tabs tabs-boxed grid w-full grid-cols-2 mb-6 bg-base-300">
                    <a
                        role="tab"
                        className={`tab tab-lg ${activeTab === 'simulator' ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab('simulator')}>
                        Simulador
                    </a>
                    <a
                        role="tab"
                        className={`tab tab-lg ${activeTab === 'truth-table' ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab('truth-table')}>
                        Tabla de Verdad
                    </a>
                </div>

                {/* Tabs Content - Simulador */}
                {activeTab === 'simulator' && (
                    <div className="space-y-6">
                        <div className="card bg-base-100 shadow-xl border border-base-content/20 backdrop-blur-sm">
                            <div className="card-body">
                                <h2 className="card-title text-xl flex items-center gap-2">
                                    <HardDrive className="h-5 w-5 text-secondary" />{' '}
                                    {/* Usa text-secondary para un color temático de DaisyUI */}
                                    Simulador de Compuertas Lógicas
                                </h2>
                                <p className="text-base-content/80">
                                    Experimenta con diferentes compuertas lógicas y visualiza su comportamiento
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <div className="space-y-4">
                                        <div className="form-control w-full max-w-xs space-y-2">
                                            <label className="label">
                                                <span className="label-text">Tipo de Compuerta</span>
                                            </label>
                                            {/* Select Component - DaisyUI `select` */}
                                            <select
                                                className="select select-bordered w-full"
                                                value={gateType}
                                                onChange={(e) => setGateType(e.target.value)}>
                                                <option value="and">AND</option>
                                                <option value="or">OR</option>
                                                <option value="nand">NAND</option>
                                                <option value="nor">NOR</option>
                                                <option value="xor">XOR</option>
                                                <option value="xnor">XNOR</option>
                                                <option value="not">NOT</option>
                                                <option value="and3">AND (3 entradas)</option>
                                                <option value="or3">OR (3 entradas)</option>
                                            </select>
                                        </div>

                                        <div className="space-y-4 p-4 bg-base-200/80 backdrop-blur-sm rounded-lg">
                                            {/* Switch Component - DaisyUI `toggle` */}
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="input-a" className="label cursor-pointer">
                                                    <span className="label-text">Entrada A</span>
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    className="toggle toggle-primary"
                                                    id="input-a"
                                                    checked={inputA}
                                                    onChange={(e) => setInputA(e.target.checked)}
                                                />
                                            </div>

                                            {gateType !== 'not' && (
                                                <div className="flex items-center justify-between">
                                                    <label htmlFor="input-b" className="label cursor-pointer">
                                                        <span className="label-text">Entrada B</span>
                                                    </label>
                                                    <input
                                                        type="checkbox"
                                                        className="toggle toggle-primary"
                                                        id="input-b"
                                                        checked={inputB}
                                                        onChange={(e) => setInputB(e.target.checked)}
                                                    />
                                                </div>
                                            )}

                                            {(gateType === 'and3' || gateType === 'or3') && (
                                                <div className="flex items-center justify-between">
                                                    <label htmlFor="input-c" className="label cursor-pointer">
                                                        <span className="label-text">Entrada C</span>
                                                    </label>
                                                    <input
                                                        type="checkbox"
                                                        className="toggle toggle-primary"
                                                        id="input-c"
                                                        checked={inputC}
                                                        onChange={(e) => setInputC(e.target.checked)}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">Salida:</span>
                                                <div
                                                    className={`w-6 h-6 rounded-full ${
                                                        result ? 'bg-info' : 'bg-neutral'
                                                    } flex items-center justify-center text-xs font-bold text-base-100`}>
                                                    {result ? '1' : '0'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <div className="bg-base-200/80 backdrop-blur-sm rounded-lg p-4 h-full flex flex-col">
                                            <h3 className="text-lg font-medium mb-4">Diagrama de la Compuerta</h3>

                                            <div className="flex-1 flex items-center justify-center border border-base-content/20 rounded-lg bg-base-100/50 p-4">
                                                {renderGateSymbol()}
                                            </div>

                                            <div className="mt-4 text-sm text-base-content/70">
                                                <div className="flex items-center gap-2">
                                                    <Info className="h-4 w-4" />
                                                    <span>
                                                        {gateType === 'and' &&
                                                            'La compuerta AND produce una salida 1 solo cuando todas las entradas son 1.'}
                                                        {gateType === 'or' &&
                                                            'La compuerta OR produce una salida 1 cuando al menos una entrada es 1.'}
                                                        {gateType === 'nand' &&
                                                            'La compuerta NAND es la negación de AND. Produce una salida 0 solo cuando todas las entradas son 1.'}
                                                        {gateType === 'nor' &&
                                                            'La compuerta NOR es la negación de OR. Produce una salida 1 solo cuando todas las entradas son 0.'}
                                                        {gateType === 'xor' &&
                                                            'La compuerta XOR produce una salida 1 cuando las entradas son diferentes.'}
                                                        {gateType === 'xnor' &&
                                                            'La compuerta XNOR produce una salida 1 cuando las entradas son iguales.'}
                                                        {gateType === 'not' &&
                                                            'La compuerta NOT invierte la entrada. Produce una salida 1 cuando la entrada es 0 y viceversa.'}
                                                        {gateType === 'and3' &&
                                                            'La compuerta AND de 3 entradas produce una salida 1 solo cuando todas las entradas son 1.'}
                                                        {gateType === 'or3' &&
                                                            'La compuerta OR de 3 entradas produce una salida 1 cuando al menos una entrada es 1.'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tabs Content - Tabla de Verdad */}
                {activeTab === 'truth-table' && (
                    <div className="space-y-6">
                        <div className="card bg-base-100 shadow-xl border border-base-content/20 backdrop-blur-sm">
                            <div className="card-body">
                                <h2 className="card-title text-xl flex items-center gap-2">
                                    <HardDrive className="h-5 w-5 text-secondary" />
                                    Tabla de Verdad
                                </h2>
                                <p className="text-base-content/80">
                                    Visualiza todas las posibles combinaciones de entradas y salidas para la compuerta
                                    seleccionada
                                </p>
                                <div className="space-y-4 mt-6">
                                    <div className="form-control w-full max-w-xs space-y-2">
                                        <label className="label">
                                            <span className="label-text">Tipo de Compuerta</span>
                                        </label>
                                        <select
                                            className="select select-bordered w-full"
                                            value={gateType}
                                            onChange={(e) => setGateType(e.target.value)}>
                                            <option value="and">AND</option>
                                            <option value="or">OR</option>
                                            <option value="nand">NAND</option>
                                            <option value="nor">NOR</option>
                                            <option value="xor">XOR</option>
                                            <option value="xnor">XNOR</option>
                                            <option value="not">NOT</option>
                                            <option value="and3">AND (3 entradas)</option>
                                            <option value="or3">OR (3 entradas)</option>
                                        </select>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="table table-zebra w-full border-collapse">
                                            <thead>
                                                <tr>
                                                    <th className="p-2 border border-base-content/20 text-left bg-base-200/80 backdrop-blur-sm">
                                                        A
                                                    </th>
                                                    {gateType !== 'not' && (
                                                        <th className="p-2 border border-base-content/20 text-left bg-base-200/80 backdrop-blur-sm">
                                                            B
                                                        </th>
                                                    )}
                                                    {(gateType === 'and3' || gateType === 'or3') && (
                                                        <th className="p-2 border border-base-content/20 text-left bg-base-200/80 backdrop-blur-sm">
                                                            C
                                                        </th>
                                                    )}
                                                    <th className="p-2 border border-base-content/20 text-left bg-base-200/80 backdrop-blur-sm">
                                                        Salida
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {truthTable.map((row, index) => (
                                                    <tr key={index}>
                                                        <td className="p-2 border border-base-content/20">
                                                            {row.a ? '1' : '0'}
                                                        </td>
                                                        {gateType !== 'not' && (
                                                            <td className="p-2 border border-base-content/20">
                                                                {row.b ? '1' : '0'}
                                                            </td>
                                                        )}
                                                        {(gateType === 'and3' || gateType === 'or3') && (
                                                            <td className="p-2 border border-base-content/20">
                                                                {row.c ? '1' : '0'}
                                                            </td>
                                                        )}
                                                        <td className="p-2 border border-base-content/20">
                                                            <div className="flex items-center gap-2">
                                                                {row.output ? '1' : '0'}
                                                                <div
                                                                    className={`w-4 h-4 rounded-full ${
                                                                        row.output ? 'bg-info' : 'bg-neutral'
                                                                    }`}></div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg mt-4">
                                        <h4 className="font-medium mb-2">Expresión Booleana:</h4>
                                        <p className="font-mono">
                                            {gateType === 'and' && 'Y = A · B'}
                                            {gateType === 'or' && 'Y = A + B'}
                                            {gateType === 'nand' && 'Y = ¬(A · B)'}
                                            {gateType === 'nor' && 'Y = ¬(A + B)'}
                                            {gateType === 'xor' && 'Y = A ⊕ B'}
                                            {gateType === 'xnor' && 'Y = ¬(A ⊕ B)'}
                                            {gateType === 'not' && 'Y = ¬A'}
                                            {gateType === 'and3' && 'Y = A · B · C'}
                                            {gateType === 'or3' && 'Y = A + B + C'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
