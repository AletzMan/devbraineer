import { Calculator, RotateCcw, Omega, Zap, Timer, CircleX, CircleCheck } from 'lucide-react';
import { useState } from 'react';
import { BlockMath } from 'react-katex';
import SectionCalculator from './SectionCalculator';

export default function RCTimeConstant() {
    // Estado para la calculadora de constante de tiempo RC
    const [rcResistance, setRcResistance] = useState('');
    const [rcCapacitance, setRcCapacitance] = useState('');
    const [rcTimeConstant, setRcTimeConstant] = useState<string | null>(null);
    const [rcTimeConstantCalculations, setRcTimeConstantCalculations] = useState<string[]>([]); // Nuevo estado para los cálculos detallados

    // Función para calcular Constante de Tiempo RC
    const calculateRcTimeConstant = () => {
        try {
            const R = rcResistance ? Number.parseFloat(rcResistance) : null;
            const C = rcCapacitance ? Number.parseFloat(rcCapacitance) : null;

            const calculations: string[] = []; // Array para almacenar los pasos

            if (R === null || C === null || R <= 0 || C <= 0) {
                setRcTimeConstant('¡Ups! Ingresa valores positivos válidos para Resistencia y Capacitancia.');
                setRcTimeConstantCalculations([]);
                return;
            }

            // Constante de tiempo (Tau) = R * C
            const tau = R * C;

            // Añadir pasos al array de cálculos
            calculations.push(`\\tau = R \\times C`);
            calculations.push(`\\tau = ${R.toFixed(2)} \\Omega \\times ${C.toFixed(6)} \\text{ F}`); // Usar más decimales para C
            calculations.push(`\\tau = ${tau.toFixed(4)} \\text{ s}`);

            setRcTimeConstant(`Constante de Tiempo (τ): ${tau.toFixed(4)} segundos`);
            setRcTimeConstantCalculations(calculations); // Actualizar el estado con los cálculos
        } catch (error) {
            setRcTimeConstant('¡Vaya! Hubo un error en el cálculo. Asegúrate de que los valores sean válidos.');
            setRcTimeConstantCalculations([]);
        }
    };

    // Función para resetear calculadora de Constante de Tiempo RC
    const resetRcTimeConstant = () => {
        setRcResistance('');
        setRcCapacitance('');
        setRcTimeConstant(null);
        setRcTimeConstantCalculations([]); // Resetear también los cálculos
    };

    return (
        <SectionCalculator
            title="Calculadora de Constante de Tiempo RC"
            description="Calcula la constante de tiempo (tau) de un circuito RC, que es fundamental para entender su respuesta transitoria.">
            <div className="card-body p-6 lg:p-8 bg-gradient-to-br from-base-300 to-base-200 rounded-lg shadow-2xl border border-base-content/10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
                    {/* Columna de Inputs y Botones */}
                    <div className="flex flex-col space-y-6">
                        <h3 className="text-xl font-extrabold text-primary-focus mb-4 border-b-2 border-primary/50 pb-2">
                            Datos de Entrada
                        </h3>

                        {/* Input de Resistencia (R) */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base-content text-base font-semibold flex items-center gap-2">
                                    <Omega className="h-5 w-5 text-primary" /> Resistencia (R)
                                </span>
                            </label>
                            <label className="input input-bordered input-sm flex items-center gap-2 shadow-md bg-base-100 focus-within:ring-3 focus-within:ring-primary focus-within:border-primary">
                                <input
                                    type="number"
                                    placeholder="Resistencia en ohmios (Ω)"
                                    className="grow text-base placeholder:text-base-content/60"
                                    value={rcResistance}
                                    onChange={(e) => setRcResistance(e.target.value)}
                                />
                                <div className="badge badge-md badge-soft badge-warning rounded-sm min-w-[2.5rem]">
                                    Ω
                                </div>
                            </label>
                        </div>

                        {/* Input de Capacitancia (C) */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base-content text-base font-semibold flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-primary" /> Capacitancia (C)
                                </span>
                            </label>
                            <label className="input input-bordered input-sm flex items-center gap-2 shadow-md bg-base-100 focus-within:ring-3 focus-within:ring-primary focus-within:border-primary">
                                <input
                                    type="number"
                                    placeholder="Capacitancia en Faradios (F)"
                                    className="grow text-base placeholder:text-base-content/60"
                                    value={rcCapacitance}
                                    onChange={(e) => setRcCapacitance(e.target.value)}
                                />
                                <div className="badge badge-md badge-soft badge-info rounded-sm min-w-[2.5rem]">F</div>
                            </label>
                        </div>

                        {/* Botones de acción (sin animaciones, btn-sm, rounded-sm) */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                            <button
                                className="btn btn-primary btn-sm flex-1 text-lg font-bold shadow-md rounded-sm"
                                onClick={calculateRcTimeConstant}>
                                <Calculator className="h-5 w-5" />
                                Calcular
                            </button>
                            <button
                                className="btn btn-outline btn-secondary btn-sm flex-1 text-lg font-bold shadow-md rounded-sm"
                                onClick={resetRcTimeConstant}>
                                <RotateCcw className="h-5 w-5" />
                                Resetear
                            </button>
                        </div>
                    </div>

                    {/* Columna de Fórmulas y Resultados */}
                    <div className="flex flex-col bg-base-100 rounded-lg p-5 lg:p-6 shadow-xl border border-primary/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-20 pointer-events-none rounded-lg"></div>

                        <h3 className="text-xl font-extrabold text-secondary text-center mb-5 z-10">
                            Fórmula de Constante de Tiempo RC
                        </h3>
                        <div className="flex justify-center items-center h-full mb-6 z-10">
                            <div className="bg-base-200 p-3 rounded-md shadow-sm border-dashed border border-base-content/10 flex items-center justify-center">
                                <BlockMath math="\tau = R \times C" />
                            </div>
                        </div>

                        {/* Sección de Cálculo Detallado (replicando OhmCalculator) */}
                        <div className="pt-5 border-t border-base-content/20 z-10 flex-grow flex flex-col justify-end">
                            <h3 className="text-xl font-extrabold text-accent text-center mb-3">Cálculo Detallado</h3>
                            {rcTimeConstantCalculations.length > 0 ? (
                                <div className="p-3 space-y-2 bg-base-200 rounded-lg shadow-inner border border-base-content/15 overflow-y-auto custom-scrollbar flex-grow">
                                    {rcTimeConstantCalculations.map((calc, index) => (
                                        <BlockMath key={index} math={calc} />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex-grow flex items-center justify-center">
                                    <p className="text-center text-base-content/70 italic text-sm">
                                        Aquí aparecerán los pasos del cálculo.
                                    </p>
                                </div>
                            )}

                            {/* Sección de Resultado */}
                            {rcTimeConstant && (
                                <div
                                    role="alert"
                                    className={`alert ${rcTimeConstant.includes('¡Error!') || rcTimeConstant.includes('¡Ups!') ? 'alert-error' : 'alert-success'} shadow-xl mt-4 p-4 rounded-sm border-2 ${rcTimeConstant.includes('¡Error!') || rcTimeConstant.includes('¡Ups!') ? 'border-error/50' : 'border-success/50'}`}>
                                    {rcTimeConstant.includes('¡Error!') || rcTimeConstant.includes('¡Ups!') ? (
                                        <CircleX className="h-6 w-6" />
                                    ) : (
                                        <Timer className="h-6 w-6" />
                                    )}
                                    <span className="font-bold text-lg">{rcTimeConstant}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </SectionCalculator>
    );
}
