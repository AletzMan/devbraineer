import { Calculator, RotateCcw, Zap, CircleX, CircleCheck, Waves, Sigma } from 'lucide-react';
import { useState } from 'react';
import { BlockMath } from 'react-katex';
import SectionCalculator from './SectionCalculator';

export default function Reactance() {
    // Estado para la calculadora de reactancia
    const [frequency, setFrequency] = useState('');
    const [capacitance, setCapacitance] = useState('');
    const [inductance, setInductance] = useState('');
    const [reactanceResult, setReactanceResult] = useState<string | null>(null);
    const [reactanceCalculations, setReactanceCalculations] = useState<string[]>([]); // Nuevo estado para los cálculos detallados

    // Función para calcular Reactancia
    const calculateReactance = () => {
        try {
            const freq = frequency ? Number.parseFloat(frequency) : null;
            const cap = capacitance ? Number.parseFloat(capacitance) : null; // en Faradios
            const ind = inductance ? Number.parseFloat(inductance) : null; // en Henrios

            const calculations: string[] = []; // Array para almacenar los pasos

            if (freq === null || freq <= 0) {
                setReactanceResult('¡Ups! Ingresa una frecuencia válida y positiva.');
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
            setReactanceResult('¡Vaya! Hubo un error en el cálculo. Asegúrate de que los valores sean válidos.');
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
            title=""
            description="Determina la reactancia capacitiva o inductiva de un componente electrónico a una frecuencia específica."
            sectionLeft={
                <div className="flex flex-col space-y-6">
                    {/* Input de Frecuencia (f) */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base-content text-base font-semibold flex items-center gap-2">
                                <Waves className="h-5 w-5 text-primary" /> Frecuencia (f)
                            </span>
                        </label>
                        <label className="input input-bordered input-sm flex items-center gap-2">
                            <input
                                type="number"
                                placeholder="Frecuencia en Hertz (Hz)"
                                className="grow text-base placeholder:text-base-content/60"
                                value={frequency}
                                onChange={(e) => setFrequency(e.target.value)}
                            />
                            <div className="badge badge-md badge-soft badge-accent rounded-sm min-w-[2.5rem]">Hz</div>
                        </label>
                    </div>

                    {/* Input de Capacitancia (C) */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base-content text-base font-semibold flex items-center gap-2">
                                <Zap className="h-5 w-5 text-primary" /> Capacitancia (C)
                            </span>
                        </label>
                        <label className="input input-bordered input-sm flex items-center gap-2">
                            <input
                                type="number"
                                placeholder="Capacitancia en Faradios (F)"
                                className="grow text-base placeholder:text-base-content/60"
                                value={capacitance}
                                onChange={(e) => setCapacitance(e.target.value)}
                            />
                            <div className="badge badge-md badge-soft badge-info rounded-sm min-w-[2.5rem]">F</div>
                        </label>
                    </div>

                    {/* Input de Inductancia (L) */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base-content text-base font-semibold flex items-center gap-2">
                                <Sigma className="h-5 w-5 text-primary" /> Inductancia (L)
                            </span>
                        </label>
                        <label className="input input-bordered input-sm flex items-center gap-2">
                            <input
                                type="number"
                                placeholder="Inductancia en Henrios (H)"
                                className="grow text-base placeholder:text-base-content/60"
                                value={inductance}
                                onChange={(e) => setInductance(e.target.value)}
                            />
                            <div className="badge badge-md badge-soft badge-warning rounded-sm min-w-[2.5rem]">H</div>
                        </label>
                    </div>
                </div>
            }
            sectionRight={{
                formula: {
                    title: 'Fórmulas de Reactancia',
                    formulas: ['X_C = \\frac{1}{2\\pi f C}', 'X_L = 2\\pi f L'],
                    calculate: calculateReactance,
                    reset: resetReactance,
                },
                result: {
                    calculations: reactanceCalculations,
                    result: reactanceResult,
                },
            }}
        />
    );
}
