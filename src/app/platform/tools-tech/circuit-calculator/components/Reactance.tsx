import { Calculator, RotateCcw, Zap } from 'lucide-react';
import { useState } from 'react';
import { BlockMath } from 'react-katex';
import SectionCalculator from './SectionCalculator';

export default function Reactance() {
    // Estado para la calculadora de reactancia
    const [frequency, setFrequency] = useState('');
    const [capacitance, setCapacitance] = useState('');
    const [inductance, setInductance] = useState('');
    const [reactanceResult, setReactanceResult] = useState<string | null>(null);

    // Función para calcular Reactancia
    const calculateReactance = () => {
        try {
            const freq = frequency ? Number.parseFloat(frequency) : null;
            const cap = capacitance ? Number.parseFloat(capacitance) : null; // en Faradios
            const ind = inductance ? Number.parseFloat(inductance) : null; // en Henrios

            if (freq === null || freq <= 0) {
                setReactanceResult('Ingresa una frecuencia válida y positiva.');
                return;
            }

            let result = '';

            if (cap !== null && cap > 0) {
                // Reactancia Capacitiva: Xc = 1 / (2 * PI * f * C)
                const xc = 1 / (2 * Math.PI * freq * cap);
                result += `Reactancia Capacitiva (Xc): ${xc.toFixed(2)} Ω\n`;
            } else if (ind !== null && ind > 0) {
                // Reactancia Inductiva: Xl = 2 * PI * f * L
                const xl = 2 * Math.PI * freq * ind;
                result += `Reactancia Inductiva (Xl): ${xl.toFixed(2)} Ω`;
            } else {
                setReactanceResult(
                    'Ingresa un valor de Capacitancia o Inductancia válido y positivo.'
                );
                return;
            }

            setReactanceResult(result.trim());
        } catch (error) {
            setReactanceResult(
                'Error en el cálculo. Verifica los valores ingresados.'
            );
        }
    };

    // Función para resetear calculadora de Reactancia
    const resetReactance = () => {
        setFrequency('');
        setCapacitance('');
        setInductance('');
        setReactanceResult(null);
    };

    return (
        <SectionCalculator
            title="Reactancia"
            description="Calcula la reactancia capacitiva o inductiva dado la frecuencia y el valor del componente.">
            <div className="card-body">
                <p className="text-base-content/70 mb-4">
                    Calcula la reactancia capacitiva o inductiva dado la
                    frecuencia y el valor del componente.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Campos de entrada */}
                    <div className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base-content">
                                    Frecuencia (f)
                                </span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <input
                                    type="number"
                                    placeholder="Frecuencia en Hz"
                                    className="grow"
                                    value={frequency}
                                    onChange={(e) =>
                                        setFrequency(e.target.value)
                                    }
                                />
                                <span className="badge badge-lg bg-primary text-primary-content font-bold">
                                    Hz
                                </span>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base-content">
                                    Capacitancia (C)
                                </span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <input
                                    type="number"
                                    placeholder="Capacitancia en Faradios (F)"
                                    className="grow"
                                    value={capacitance}
                                    onChange={(e) =>
                                        setCapacitance(e.target.value)
                                    }
                                />
                                <span className="badge badge-lg bg-info text-info-content font-bold">
                                    F
                                </span>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base-content">
                                    Inductancia (L)
                                </span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <input
                                    type="number"
                                    placeholder="Inductancia en Henrios (H)"
                                    className="grow"
                                    value={inductance}
                                    onChange={(e) =>
                                        setInductance(e.target.value)
                                    }
                                />
                                <span className="badge badge-lg bg-info text-info-content font-bold">
                                    H
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Sección de Fórmulas y Resultados */}
                    <div className="flex flex-col bg-base-100 rounded-lg p-6 shadow-inner border border-base-content/5">
                        <h3 className="text-xl font-semibold mb-4 text-secondary">
                            Fórmulas de Reactancia
                        </h3>
                        <div className="space-y-2 text-base-content/80">
                            <p className="font-bold">Reactancia Capacitiva:</p>
                            <BlockMath math="X_C = \frac{1}{2\pi f C}" />
                            <p className="font-bold">Reactancia Inductiva:</p>
                            <BlockMath math="X_L = 2\pi f L" />
                        </div>

                        <div className="mt-auto pt-6">
                            {reactanceResult && (
                                <div
                                    role="alert"
                                    className="alert alert-info shadow-lg">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="stroke-current shrink-0 w-6 h-6">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span className="font-medium text-info-content">
                                        {reactanceResult}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-4 mt-6">
                    <button
                        className="btn btn-primary btn-lg flex-1"
                        onClick={calculateReactance}>
                        <Calculator className="h-6 w-6" />
                        Calcular
                    </button>
                    <button
                        className="btn btn-outline btn-lg"
                        onClick={resetReactance}>
                        <RotateCcw className="h-6 w-6" />
                        Resetear
                    </button>
                </div>
            </div>
        </SectionCalculator>
    );
}
