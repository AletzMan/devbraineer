import { Calculator, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { BlockMath } from 'react-katex';
import SectionCalculator from './SectionCalculator';

export default function RCTimeConstant() {
    // Estado para la calculadora de constante de tiempo RC
    const [rcResistance, setRcResistance] = useState('');
    const [rcCapacitance, setRcCapacitance] = useState('');
    const [rcTimeConstant, setRcTimeConstant] = useState<string | null>(null);

    // Función para calcular Constante de Tiempo RC
    const calculateRcTimeConstant = () => {
        try {
            const R = rcResistance ? Number.parseFloat(rcResistance) : null;
            const C = rcCapacitance ? Number.parseFloat(rcCapacitance) : null;

            if (R === null || C === null || R <= 0 || C <= 0) {
                setRcTimeConstant(
                    'Ingresa valores positivos válidos para Resistencia y Capacitancia.'
                );
                return;
            }

            // Constante de tiempo (Tau) = R * C
            const tau = R * C;
            setRcTimeConstant(
                `Constante de Tiempo (τ): ${tau.toFixed(4)} segundos`
            );
        } catch (error) {
            setRcTimeConstant(
                'Error en el cálculo. Verifica los valores ingresados.'
            );
        }
    };

    // Función para resetear calculadora de Constante de Tiempo RC
    const resetRcTimeConstant = () => {
        setRcResistance('');
        setRcCapacitance('');
        setRcTimeConstant(null);
    };
    return (
        <SectionCalculator
            title="Constante de Tiempo RC"
            description="Calcula la constante de tiempo (tau) de un circuito RC.">
            <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Campos de entrada */}
                    <div className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base-content">
                                    Resistencia (R)
                                </span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <input
                                    type="number"
                                    placeholder="Resistencia en ohmios (Ω)"
                                    className="grow"
                                    value={rcResistance}
                                    onChange={(e) =>
                                        setRcResistance(e.target.value)
                                    }
                                />
                                <span className="badge badge-lg bg-primary text-primary-content font-bold">
                                    Ω
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
                                    value={rcCapacitance}
                                    onChange={(e) =>
                                        setRcCapacitance(e.target.value)
                                    }
                                />
                                <span className="badge badge-lg bg-info text-info-content font-bold">
                                    F
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Sección de Fórmulas y Resultados */}
                    <div className="flex flex-col bg-base-100 rounded-lg p-6 shadow-inner border border-base-content/5">
                        <h3 className="text-xl font-semibold mb-4 text-secondary">
                            Fórmula de Constante de Tiempo RC
                        </h3>
                        <div className="space-y-2 text-base-content/80">
                            <BlockMath math="\tau = R \times C" />
                        </div>

                        <div className="mt-auto pt-6">
                            {rcTimeConstant && (
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
                                        {rcTimeConstant}
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
                        onClick={calculateRcTimeConstant}>
                        <Calculator className="h-6 w-6" />
                        Calcular
                    </button>
                    <button
                        className="btn btn-outline btn-lg"
                        onClick={resetRcTimeConstant}>
                        <RotateCcw className="h-6 w-6" />
                        Resetear
                    </button>
                </div>
            </div>
        </SectionCalculator>
    );
}
