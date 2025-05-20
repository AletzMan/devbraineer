import { Calculator, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { BlockMath } from 'react-katex';
import SectionCalculator from './SectionCalculator';

export default function VoltageDivider() {
    // Estado para la calculadora de divisor de voltaje
    const [inputVoltage, setInputVoltage] = useState('');
    const [r1, setR1] = useState('');
    const [r2, setR2] = useState('');
    const [outputVoltage, setOutputVoltage] = useState<string | null>(null);

    // Función para calcular divisor de voltaje
    const calculateVoltageDivider = () => {
        try {
            const vin = Number.parseFloat(inputVoltage);
            const resistor1 = Number.parseFloat(r1);
            const resistor2 = Number.parseFloat(r2);

            if (isNaN(vin) || isNaN(resistor1) || isNaN(resistor2)) {
                setOutputVoltage('Ingresa todos los valores requeridos.');
                return;
            }
            if (resistor1 < 0 || resistor2 < 0 || vin < 0) {
                setOutputVoltage(
                    'Los valores de voltaje y resistencias deben ser positivos.'
                );
                return;
            }
            if (resistor1 + resistor2 === 0) {
                setOutputVoltage('La suma de R1 y R2 no puede ser cero.');
                return;
            }

            const vout = vin * (resistor2 / (resistor1 + resistor2));
            setOutputVoltage(`Voltaje de salida: ${vout.toFixed(2)} V`);
        } catch (error) {
            setOutputVoltage(
                'Error en el cálculo. Verifica los valores ingresados.'
            );
        }
    };

    // Función para resetear calculadora de Divisor de Voltaje
    const resetVoltageDivider = () => {
        setInputVoltage('');
        setR1('');
        setR2('');
        setOutputVoltage(null);
    };

    return (
        <SectionCalculator
            title="Divisor de Voltaje"
            description="Calcula el voltaje de salida en un circuito divisor de voltaje.">
            <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Campos de entrada */}
                    <div className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base-content">
                                    Voltaje de Entrada (Vin)
                                </span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <input
                                    type="number"
                                    placeholder="Vin en voltios"
                                    className="grow"
                                    value={inputVoltage}
                                    onChange={(e) =>
                                        setInputVoltage(e.target.value)
                                    }
                                />
                                <span className="badge badge-lg bg-primary text-primary-content font-bold">
                                    V
                                </span>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base-content">
                                    Resistencia 1 (R1)
                                </span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <input
                                    type="number"
                                    placeholder="R1 en ohmios"
                                    className="grow"
                                    value={r1}
                                    onChange={(e) => setR1(e.target.value)}
                                />
                                <span className="badge badge-lg bg-info text-info-content font-bold">
                                    Ω
                                </span>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base-content">
                                    Resistencia 2 (R2)
                                </span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <input
                                    type="number"
                                    placeholder="R2 en ohmios"
                                    className="grow"
                                    value={r2}
                                    onChange={(e) => setR2(e.target.value)}
                                />
                                <span className="badge badge-lg bg-info text-info-content font-bold">
                                    Ω
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Sección de Fórmulas y Resultados */}
                    <div className="flex flex-col bg-base-100 rounded-lg p-6 shadow-inner border border-base-content/5">
                        <h3 className="text-xl font-semibold mb-4 text-secondary">
                            Fórmula de Divisor de Voltaje
                        </h3>
                        <div className="space-y-2 text-base-content/80">
                            <BlockMath math="V_{\text{out}} = V_{\text{in}} \times \frac{R_2}{R_1 + R_2}" />
                        </div>

                        <div className="mt-auto pt-6">
                            {outputVoltage && (
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
                                        {outputVoltage}
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
                        onClick={calculateVoltageDivider}>
                        <Calculator className="h-6 w-6" />
                        Calcular
                    </button>
                    <button
                        className="btn btn-outline btn-lg"
                        onClick={resetVoltageDivider}>
                        <RotateCcw className="h-6 w-6" />
                        Resetear
                    </button>
                </div>
            </div>
        </SectionCalculator>
    );
}
