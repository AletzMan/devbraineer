import {
    Calculator,
    RotateCcw,
    Zap,
    CircleX,
    CircleCheck,
    Waves,
    Sigma,
} from 'lucide-react';
import { useState } from 'react';
import { BlockMath } from 'react-katex';
import SectionCalculator from './SectionCalculator';

export default function Reactance() {
    // Estado para la calculadora de reactancia
    const [frequency, setFrequency] = useState('');
    const [capacitance, setCapacitance] = useState('');
    const [inductance, setInductance] = useState('');
    const [reactanceResult, setReactanceResult] = useState<string | null>(null);
    const [reactanceCalculations, setReactanceCalculations] = useState<
        string[]
    >([]); // Nuevo estado para los cálculos detallados

    // Función para calcular Reactancia
    const calculateReactance = () => {
        try {
            const freq = frequency ? Number.parseFloat(frequency) : null;
            const cap = capacitance ? Number.parseFloat(capacitance) : null; // en Faradios
            const ind = inductance ? Number.parseFloat(inductance) : null; // en Henrios

            const calculations: string[] = []; // Array para almacenar los pasos

            if (freq === null || freq <= 0) {
                setReactanceResult(
                    '¡Ups! Ingresa una frecuencia válida y positiva.'
                );
                setReactanceCalculations([]);
                return;
            }

            let result = '';
            let calculationMade = false; // Flag para saber si se hizo algún cálculo

            if (cap !== null && cap > 0) {
                // Reactancia Capacitiva: Xc = 1 / (2 * PI * f * C)
                const xc = 1 / (2 * Math.PI * freq * cap);
                result += `Reactancia Capacitiva (Xc): ${xc.toFixed(2)} Ω`;
                calculationMade = true;

                // Añadir pasos al array de cálculos para Xc
                calculations.push(`X_C = \\frac{1}{2\\pi f C}`);
                calculations.push(
                    `X_C = \\frac{1}{2\\pi \\times ${freq.toFixed(2)} \\text{ Hz} \\times ${cap.toFixed(6)} \\text{ F}}`
                ); // Usar más decimales para C
                calculations.push(`X_C = ${xc.toFixed(2)} \\Omega`);
            }

            if (ind !== null && ind > 0) {
                // Reactancia Inductiva: Xl = 2 * PI * f * L
                const xl = 2 * Math.PI * freq * ind;
                if (calculationMade) {
                    // Si ya calculamos capacitancia, añadimos un salto de línea en el resultado
                    result += '\n';
                }
                result += `Reactancia Inductiva (Xl): ${xl.toFixed(2)} Ω`;
                calculationMade = true;

                // Añadir pasos al array de cálculos para Xl
                if (calculations.length > 0) {
                    // Si ya hay cálculos de Xc, separar
                    calculations.push(''); // Salto de línea para separación visual en los cálculos
                }
                calculations.push(`X_L = 2\\pi f L`);
                calculations.push(
                    `X_L = 2\\pi \\times ${freq.toFixed(2)} \\text{ Hz} \\times ${ind.toFixed(6)} \\text{ H}`
                ); // Usar más decimales para L
                calculations.push(`X_L = ${xl.toFixed(2)} \\Omega`);
            }

            if (!calculationMade) {
                setReactanceResult(
                    '¡Error! Ingresa un valor de Capacitancia o Inductancia válido y positivo para calcular.'
                );
                setReactanceCalculations([]);
                return;
            }

            setReactanceResult(result.trim());
            setReactanceCalculations(calculations); // Actualizar el estado con los cálculos
        } catch (error) {
            setReactanceResult(
                '¡Vaya! Hubo un error en el cálculo. Asegúrate de que los valores sean válidos.'
            );
            setReactanceCalculations([]);
        }
    };

    // Función para resetear calculadora de Reactancia
    const resetReactance = () => {
        setFrequency('');
        setCapacitance('');
        setInductance('');
        setReactanceResult(null);
        setReactanceCalculations([]); // Resetear también los cálculos
    };

    return (
        <SectionCalculator
            title="Calculadora de Reactancia"
            description="Determina la reactancia capacitiva o inductiva de un componente electrónico a una frecuencia específica.">
            <div className="card-body p-6 lg:p-8 bg-gradient-to-br from-base-300 to-base-200 rounded-lg shadow-2xl border border-base-content/10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
                    {/* Columna de Inputs y Botones */}
                    <div className="flex flex-col space-y-6">
                        <h3 className="text-xl font-extrabold text-primary-focus mb-4 border-b-2 border-primary/50 pb-2">
                            Datos de Entrada
                        </h3>

                        {/* Input de Frecuencia (f) */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base-content text-base font-semibold flex items-center gap-2">
                                    <Waves className="h-5 w-5 text-primary" />{' '}
                                    Frecuencia (f)
                                </span>
                            </label>
                            <label className="input input-bordered input-sm flex items-center gap-2 shadow-md bg-base-100 focus-within:ring-3 focus-within:ring-primary focus-within:border-primary">
                                <input
                                    type="number"
                                    placeholder="Frecuencia en Hertz (Hz)"
                                    className="grow text-base placeholder:text-base-content/60"
                                    value={frequency}
                                    onChange={(e) =>
                                        setFrequency(e.target.value)
                                    }
                                />
                                <div className="badge badge-md badge-soft badge-accent rounded-sm min-w-[2.5rem]">
                                    Hz
                                </div>
                            </label>
                        </div>

                        {/* Input de Capacitancia (C) */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base-content text-base font-semibold flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-primary" />{' '}
                                    Capacitancia (C)
                                </span>
                            </label>
                            <label className="input input-bordered input-sm flex items-center gap-2 shadow-md bg-base-100 focus-within:ring-3 focus-within:ring-primary focus-within:border-primary">
                                <input
                                    type="number"
                                    placeholder="Capacitancia en Faradios (F)"
                                    className="grow text-base placeholder:text-base-content/60"
                                    value={capacitance}
                                    onChange={(e) =>
                                        setCapacitance(e.target.value)
                                    }
                                />
                                <div className="badge badge-md badge-soft badge-info rounded-sm min-w-[2.5rem]">
                                    F
                                </div>
                            </label>
                        </div>

                        {/* Input de Inductancia (L) */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base-content text-base font-semibold flex items-center gap-2">
                                    <Sigma className="h-5 w-5 text-primary" />{' '}
                                    Inductancia (L)
                                </span>
                            </label>
                            <label className="input input-bordered input-sm flex items-center gap-2 shadow-md bg-base-100 focus-within:ring-3 focus-within:ring-primary focus-within:border-primary">
                                <input
                                    type="number"
                                    placeholder="Inductancia en Henrios (H)"
                                    className="grow text-base placeholder:text-base-content/60"
                                    value={inductance}
                                    onChange={(e) =>
                                        setInductance(e.target.value)
                                    }
                                />
                                <div className="badge badge-md badge-soft badge-warning rounded-sm min-w-[2.5rem]">
                                    H
                                </div>
                            </label>
                        </div>

                        {/* Botones de acción (sin animaciones, btn-sm, rounded-sm) */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                            <button
                                className="btn btn-primary btn-sm flex-1 text-lg font-bold shadow-md rounded-sm"
                                onClick={calculateReactance}>
                                <Calculator className="h-5 w-5" />
                                Calcular
                            </button>
                            <button
                                className="btn btn-outline btn-secondary btn-sm flex-1 text-lg font-bold shadow-md rounded-sm"
                                onClick={resetReactance}>
                                <RotateCcw className="h-5 w-5" />
                                Resetear
                            </button>
                        </div>
                    </div>

                    {/* Columna de Fórmulas y Resultados */}
                    <div className="flex flex-col bg-base-100 rounded-lg p-5 lg:p-6 shadow-xl border border-primary/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-20 pointer-events-none rounded-lg"></div>

                        <h3 className="text-xl font-extrabold text-secondary text-center mb-5 z-10">
                            Fórmulas de Reactancia
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base-content text-base mb-6 z-10">
                            <div className="bg-base-200 p-3 rounded-md shadow-sm border-dashed border border-base-content/10 flex flex-col items-center justify-center text-center">
                                <p className="font-bold text-sm mb-2">
                                    Reactancia Capacitiva ($X_C$):
                                </p>
                                <BlockMath math="X_C = \frac{1}{2\pi f C}" />
                            </div>
                            <div className="bg-base-200 p-3 rounded-md shadow-sm border-dashed border border-base-content/10 flex flex-col items-center justify-center text-center">
                                <p className="font-bold text-sm mb-2">
                                    Reactancia Inductiva ($X_L$):
                                </p>
                                <BlockMath math="X_L = 2\pi f L" />
                            </div>
                        </div>

                        {/* Sección de Cálculo Detallado (replicando OhmCalculator) */}
                        <div className="pt-5 border-t border-base-content/20 z-10 flex-grow flex flex-col justify-end">
                            <h3 className="text-xl font-extrabold text-accent text-center mb-3">
                                Cálculo Detallado
                            </h3>
                            {reactanceCalculations.length > 0 ? (
                                <div className="p-3 space-y-2 bg-base-200 rounded-lg shadow-inner border border-base-content/15 overflow-y-auto custom-scrollbar flex-grow">
                                    {reactanceCalculations.map(
                                        (calc, index) => (
                                            <BlockMath
                                                key={index}
                                                math={calc}
                                            />
                                        )
                                    )}
                                </div>
                            ) : (
                                <div className="flex-grow flex items-center justify-center">
                                    <p className="text-center text-base-content/70 italic text-sm">
                                        Aquí aparecerán los pasos del cálculo.
                                    </p>
                                </div>
                            )}

                            {/* Sección de Resultado */}
                            {reactanceResult && (
                                <div
                                    role="alert"
                                    className={`alert ${reactanceResult.includes('¡Error!') || reactanceResult.includes('¡Ups!') || reactanceResult.includes('¡Atención!') ? 'alert-error' : 'alert-success'} shadow-xl mt-4 p-4 rounded-sm border-2 ${reactanceResult.includes('¡Error!') || reactanceResult.includes('¡Ups!') || reactanceResult.includes('¡Atención!') ? 'border-error/50' : 'border-success/50'}`}>
                                    {reactanceResult.includes('¡Error!') ||
                                    reactanceResult.includes('¡Ups!') ||
                                    reactanceResult.includes('¡Atención!') ? (
                                        <CircleX className="h-6 w-6" />
                                    ) : (
                                        <CircleCheck className="h-6 w-6" />
                                    )}
                                    <div className="flex flex-col">
                                        {reactanceResult
                                            .split('\n')
                                            .map((line, idx) => (
                                                <span
                                                    key={idx}
                                                    className="font-bold text-lg leading-tight">
                                                    {line}
                                                </span>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </SectionCalculator>
    );
}
