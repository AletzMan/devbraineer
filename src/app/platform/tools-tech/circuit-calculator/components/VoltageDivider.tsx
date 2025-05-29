import { Calculator, RotateCcw, Bolt, Omega, CircleX, CircleCheck } from 'lucide-react';
import { useState } from 'react';
import { BlockMath } from 'react-katex';
import SectionCalculator from './SectionCalculator';

export default function VoltageDivider() {
    // Estado para la calculadora de divisor de voltaje
    const [inputVoltage, setInputVoltage] = useState('');
    const [r1, setR1] = useState('');
    const [r2, setR2] = useState('');
    const [outputVoltage, setOutputVoltage] = useState<string | null>(null);
    const [voltageDividerCalculations, setVoltageDividerCalculations] = useState<string[]>([]); // Nuevo estado para los cálculos detallados

    // Función para calcular divisor de voltaje
    const calculateVoltageDivider = () => {
        try {
            const vin = Number.parseFloat(inputVoltage);
            const resistor1 = Number.parseFloat(r1);
            const resistor2 = Number.parseFloat(r2);

            const calculations: string[] = []; // Array para almacenar los pasos

            if (isNaN(vin) || isNaN(resistor1) || isNaN(resistor2)) {
                setOutputVoltage('¡Ups! Ingresa todos los valores requeridos.');
                setVoltageDividerCalculations([]); // Limpiar cálculos anteriores
                return;
            }
            if (resistor1 < 0 || resistor2 < 0 || vin < 0) {
                setOutputVoltage('¡Error! Los valores de voltaje y resistencias deben ser positivos.');
                setVoltageDividerCalculations([]);
                return;
            }
            if (resistor1 + resistor2 === 0) {
                setOutputVoltage('¡Atención! La suma de R1 y R2 no puede ser cero.');
                setVoltageDividerCalculations([]);
                return;
            }

            const vout = vin * (resistor2 / (resistor1 + resistor2));

            // Añadir pasos al array de cálculos
            calculations.push(`V_{\\text{out}} = V_{\\text{in}} \\times \\frac{R_2}{R_1 + R_2}`);
            calculations.push(
                `V_{\\text{out}} = ${vin.toFixed(2)} V \\times \\frac{${resistor2.toFixed(2)} \\Omega}{${resistor1.toFixed(2)} \\Omega + ${resistor2.toFixed(2)} \\Omega}`
            );
            calculations.push(
                `V_{\\text{out}} = ${vin.toFixed(2)} V \\times \\frac{${resistor2.toFixed(2)} \\Omega}{${(resistor1 + resistor2).toFixed(2)} \\Omega}`
            );
            calculations.push(`V_{\\text{out}} = ${vout.toFixed(2)} V`);

            setOutputVoltage(`Voltaje de salida: ${vout.toFixed(2)} V`);
            setVoltageDividerCalculations(calculations); // Actualizar el estado con los cálculos
        } catch (error) {
            setOutputVoltage('¡Vaya! Hubo un error en el cálculo. Asegúrate de que los valores sean válidos.');
            setVoltageDividerCalculations([]);
        }
    };

    // Función para resetear calculadora de Divisor de Voltaje
    const resetVoltageDivider = () => {
        setInputVoltage('');
        setR1('');
        setR2('');
        setOutputVoltage(null);
        setVoltageDividerCalculations([]); // Resetear también los cálculos
    };

    return (
        <SectionCalculator
            title=""
            description="Calcula el voltaje de salida (Vout) en un circuito divisor de voltaje simple, dados el voltaje de entrada (Vin) y las resistencias (R1 y R2)."
            sectionLeft={
                <div className="flex flex-col space-y-6">
                    {/* Input de Voltaje de Entrada (Vin) */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base-content text-base font-semibold flex items-center gap-2">
                                <Bolt className="h-5 w-5 text-primary" />
                                Voltaje de Entrada (Vin)
                            </span>
                        </label>
                        <label className="input input-bordered input-sm flex items-center gap-2 shadow-md bg-base-100 focus-within:ring-3 focus-within:ring-primary focus-within:border-primary">
                            <input
                                type="number"
                                placeholder="Vin en voltios"
                                className="grow text-base placeholder:text-base-content/60"
                                value={inputVoltage}
                                onChange={(e) => setInputVoltage(e.target.value)}
                            />
                            <div className="badge badge-md badge-soft badge-accent rounded-sm min-w-[2.5rem]">V</div>
                        </label>
                    </div>

                    {/* Input de Resistencia 1 (R1) */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base-content text-base font-semibold flex items-center gap-2">
                                <Omega className="h-5 w-5 text-primary" />
                                Resistencia 1 (R1)
                            </span>
                        </label>
                        <label className="input input-bordered input-sm flex items-center gap-2 shadow-md bg-base-100 focus-within:ring-3 focus-within:ring-primary focus-within:border-primary">
                            <input
                                type="number"
                                placeholder="R1 en ohmios"
                                className="grow text-base placeholder:text-base-content/60"
                                value={r1}
                                onChange={(e) => setR1(e.target.value)}
                            />
                            <div className="badge badge-md badge-soft badge-warning rounded-sm min-w-[2.5rem]">Ω</div>
                        </label>
                    </div>

                    {/* Input de Resistencia 2 (R2) */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base-content text-base font-semibold flex items-center gap-2">
                                <Omega className="h-5 w-5 text-primary" />
                                Resistencia 2 (R2)
                            </span>
                        </label>
                        <label className="input input-bordered input-sm flex items-center gap-2 shadow-md bg-base-100 focus-within:ring-3 focus-within:ring-primary focus-within:border-primary">
                            <input
                                type="number"
                                placeholder="R2 en ohmios"
                                className="grow text-base placeholder:text-base-content/60"
                                value={r2}
                                onChange={(e) => setR2(e.target.value)}
                            />
                            <div className="badge badge-md badge-soft badge-warning rounded-sm min-w-[2.5rem]">Ω</div>
                        </label>
                    </div>

                    {/* Botones de acción (sin animaciones, btn-sm, rounded-sm) */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <button className="btn btn-primary btn-sm flex-1" onClick={calculateVoltageDivider}>
                            <Calculator className="size-5" />
                            Calcular
                        </button>
                        <button className="btn btn-outline btn-secondary btn-sm flex-1" onClick={resetVoltageDivider}>
                            <RotateCcw className="size-5" />
                            Resetear
                        </button>
                    </div>
                </div>
            }
            sectionRight={{
                formula: {
                    title: 'Fórmula de Divisor de Voltaje',
                    formulas: ['V_{out} = V_{in} \\times \\frac{R_2}{R_1 + R_2}'],
                },
                result: {
                    calculations: voltageDividerCalculations,
                    result: outputVoltage,
                },
            }}></SectionCalculator>
    );
}
