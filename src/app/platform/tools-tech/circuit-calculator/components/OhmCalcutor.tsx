import { Calculator, RotateCcw, Lightbulb, Zap, Power, CircleX, CircleCheck, Omega } from 'lucide-react';
import { useState } from 'react';
import { BlockMath } from 'react-katex';
import SectionCalculator from './SectionCalculator';
import { toast } from 'react-hot-toast';

export default function OhmCalculator() {
    const [ohmResult, setOhmResult] = useState<string | null>(null);
    const [ohmCalculations, setOhmCalculations] = useState<string[]>([]);
    const [ohmVoltage, setOhmVoltage] = useState('');
    const [ohmCurrent, setOhmCurrent] = useState('');
    const [ohmResistance, setOhmResistance] = useState('');
    const [ohmPower, setOhmPower] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [calculationHistory, setCalculationHistory] = useState<{ result: string; calculations: string[] }[]>([]);

    const calculateOhm = () => {
        setIsLoading(true);
        setOhmResult(null);
        setOhmCalculations([]);

        try {
            const v = ohmVoltage ? Number.parseFloat(ohmVoltage) : null;
            const i = ohmCurrent ? Number.parseFloat(ohmCurrent) : null;
            const r = ohmResistance ? Number.parseFloat(ohmResistance) : null;
            const p = ohmPower ? Number.parseFloat(ohmPower) : null;

            // Validar valores negativos
            if ([v, i, r, p].some((val) => val !== null && val < 0)) {
                toast.error('Los valores no pueden ser negativos');
                setIsLoading(false);
                return;
            }

            const valueCount = [v, i, r, p].filter((val) => val !== null).length;

            if (valueCount < 2) {
                toast.error('Necesitas ingresar al menos dos valores para calcular.');
                setIsLoading(false);
                return;
            }

            let result = '';
            const calculations: string[] = [];

            if (v === null && i !== null && r !== null) {
                const calculatedV = i * r;
                result = `Voltaje (V) = ${calculatedV.toFixed(2)} V`;
                calculations.push(`V = I \\times R`);
                calculations.push(`V = ${i.toFixed(2)} A \\times ${r.toFixed(2)} \\Omega`);
                calculations.push(`V = ${calculatedV.toFixed(2)} V`);
            } else if (v === null && p !== null && i !== null) {
                const calculatedV = p / i;
                result = `Voltaje (V) = ${calculatedV.toFixed(2)} V`;
                calculations.push(`V = \\frac{P}{I}`);
                calculations.push(`V = \\frac{${p.toFixed(2)} W}{${i.toFixed(2)} A}`);
                calculations.push(`V = ${calculatedV.toFixed(2)} V`);
            } else if (v === null && p !== null && r !== null) {
                const calculatedV = Math.sqrt(p * r);
                result = `Voltaje (V) = ${calculatedV.toFixed(2)} V`;
                calculations.push(`V = \\sqrt{P \\times R}`);
                calculations.push(`V = \\sqrt{${p.toFixed(2)} W \\times ${r.toFixed(2)} \\Omega}`);
                calculations.push(`V = ${calculatedV.toFixed(2)} V`);
            } else if (i === null && v !== null && r !== null) {
                const calculatedI = v / r;
                result = `Corriente (I) = ${calculatedI.toFixed(2)} A`;
                calculations.push(`I = \\frac{V}{R}`);
                calculations.push(`I = \\frac{${v.toFixed(2)} V}{${r.toFixed(2)} \\Omega}`);
                calculations.push(`I = ${calculatedI.toFixed(2)} A`);
            } else if (i === null && p !== null && v !== null) {
                const calculatedI = p / v;
                result = `Corriente (I) = ${calculatedI.toFixed(2)} A`;
                calculations.push(`I = \\frac{P}{V}`);
                calculations.push(`I = \\frac{${p.toFixed(2)} W}{${v.toFixed(2)} V}`);
                calculations.push(`I = ${calculatedI.toFixed(2)} A`);
            } else if (i === null && p !== null && r !== null) {
                const calculatedI = Math.sqrt(p / r);
                result = `Corriente (I) = ${calculatedI.toFixed(2)} A`;
                calculations.push(`I = \\sqrt{\\frac{P}{R}}`);
                calculations.push(`I = \\sqrt{\\frac{${p.toFixed(2)} W}{${r.toFixed(2)} \\Omega}}`);
                calculations.push(`I = ${calculatedI.toFixed(2)} A`);
            } else if (r === null && v !== null && i !== null) {
                const calculatedR = v / i;
                result = `Resistencia (R) = ${calculatedR.toFixed(2)} \\Omega`;
                calculations.push(`R = \\frac{V}{I}`);
                calculations.push(`R = \\frac{${v.toFixed(2)} V}{${i.toFixed(2)} A}`);
                calculations.push(`R = ${calculatedR.toFixed(2)} \\Omega`);
            } else if (r === null && p !== null && i !== null) {
                const calculatedR = p / (i * i);
                result = `Resistencia (R) = ${calculatedR.toFixed(2)} \\Omega`;
                calculations.push(`R = \\frac{P}{I^2}`);
                calculations.push(`R = \\frac{${p.toFixed(2)} W}{(${i.toFixed(2)} A)^2}`);
                calculations.push(`R = ${calculatedR.toFixed(2)} \\Omega`);
            } else if (r === null && p !== null && v !== null) {
                const calculatedR = (v * v) / p;
                result = `Resistencia (R) = ${calculatedR.toFixed(2)} \\Omega`;
                calculations.push(`R = \\frac{V^2}{P}`);
                calculations.push(`R = \\frac{(${v.toFixed(2)} V)^2}{${p.toFixed(2)} W}`);
                calculations.push(`R = ${calculatedR.toFixed(2)} \\Omega`);
            } else if (p === null && v !== null && i !== null) {
                const calculatedP = v * i;
                result = `Potencia (P) = ${calculatedP.toFixed(2)} W`;
                calculations.push(`P = V \\times I`);
                calculations.push(`P = ${v.toFixed(2)} V \\times ${i.toFixed(2)} A`);
                calculations.push(`P = ${calculatedP.toFixed(2)} W`);
            } else if (p === null && i !== null && r !== null) {
                const calculatedP = i * i * r;
                result = `Potencia (P) = ${calculatedP.toFixed(2)} W`;
                calculations.push(`P = I^2 \\times R`);
                calculations.push(`P = (${i.toFixed(2)} A)^2 \\times ${r.toFixed(2)} \\Omega`);
                calculations.push(`P = ${calculatedP.toFixed(2)} W`);
            } else if (p === null && v !== null && r !== null) {
                const calculatedP = (v * v) / r;
                result = `Potencia (P) = ${calculatedP.toFixed(2)} W`;
                calculations.push(`P = \\frac{V^2}{R}`);
                calculations.push(`P = \\frac{(${v.toFixed(2)} V)^2}{${r.toFixed(2)} \\Omega}`);
                calculations.push(`P = ${calculatedP.toFixed(2)} W`);
            } else {
                setOhmResult('No puedo calcular con esa combinación. Intenta con un par de valores diferente.');
                setOhmCalculations([]);
                return;
            }

            setOhmResult(result);
            setOhmCalculations(calculations);

            // Agregar al historial
            setCalculationHistory((prev) => [
                { result, calculations },
                ...prev.slice(0, 9), // Mantener solo los últimos 10 cálculos
            ]);

            toast.success('Cálculo completado');
        } catch (error) {
            toast.error('Error en el cálculo. Asegúrate de que los valores sean válidos.');
            setOhmResult(null);
            setOhmCalculations([]);
        } finally {
            setIsLoading(false);
        }
    };

    const resetOhm = () => {
        setOhmVoltage('');
        setOhmCurrent('');
        setOhmResistance('');
        setOhmPower('');
        setOhmResult(null);
        setOhmCalculations([]);
    };

    const inputIcons = {
        voltage: <Zap className="h-5 w-5 text-primary" />,
        current: <Lightbulb className="h-5 w-5 text-primary" />,
        resistance: <span className="text-primary text-xl">Ω</span>,
        power: <Power className="h-5 w-5 text-primary" />,
    };

    return (
        <SectionCalculator
            title="Calculadora de la Ley de Ohm"
            description="Calcula valores de voltaje, corriente, resistencia y potencia. Ingresa al menos dos valores para descubrir los demás.">
            <div className="bg-gradient-to-br from-base-300 to-base-200 rounded-md shadow-2xl border border-base-content/10 transform transition-all duration-300 hover:shadow-3xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                    <div className="space-y-4">
                        <h3 className="text-xl font-extrabold text-primary-focus mb-2 border-b-1 border-primary/50 pb-2">
                            Datos de Entrada
                        </h3>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base-content text-base font-semibold flex items-center gap-2">
                                    {inputIcons.voltage} Voltaje (V)
                                </span>
                            </label>
                            <div className="input-group input-group-sm">
                                <input
                                    type="number"
                                    placeholder="Ej: 12.5"
                                    className="input input-bordered input-sm grow text-base placeholder:text-base-content/60"
                                    value={ohmVoltage}
                                    onChange={(e) => setOhmVoltage(e.target.value)}
                                />
                                <span className="badge badge-soft badge-warning rounded-sm">V</span>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base-content text-base font-semibold flex items-center gap-2">
                                    {inputIcons.current} Corriente (I)
                                </span>
                            </label>
                            <label className="input input-bordered input-sm flex items-center gap-2 shadow-md bg-base-100 hover:bg-base-50 focus-within:ring-3 focus-within:ring-primary focus-within:border-primary transition-all duration-300 ease-in-out">
                                <input
                                    type="number"
                                    placeholder="Ej: 2.0"
                                    className="grow text-base placeholder:text-base-content/60"
                                    value={ohmCurrent}
                                    onChange={(e) => setOhmCurrent(e.target.value)}
                                />
                                <div className="badge badge-md badge-soft badge-warning rounded-sm min-w-[2.5rem]">
                                    A
                                </div>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base-content text-base font-semibold flex items-center gap-2">
                                    {inputIcons.resistance} Resistencia (R)
                                </span>
                            </label>
                            <label className="input input-bordered input-sm flex items-center gap-2 shadow-md bg-base-100 hover:bg-base-50 focus-within:ring-3 focus-within:ring-primary focus-within:border-primary transition-all duration-300 ease-in-out">
                                <input
                                    type="number"
                                    placeholder="Ej: 100"
                                    className="grow text-base placeholder:text-base-content/60"
                                    value={ohmResistance}
                                    onChange={(e) => setOhmResistance(e.target.value)}
                                />
                                <div className="badge badge-md badge-soft badge-warning rounded-sm min-w-[2.5rem]">
                                    <Omega className="size-4" />
                                </div>
                            </label>
                        </div>

                        {/* Campo Potencia */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base-content text-base font-semibold flex items-center gap-2">
                                    {inputIcons.power} Potencia (P)
                                </span>
                            </label>
                            <label className="input input-bordered input-sm flex items-center gap-2 shadow-md bg-base-100 hover:bg-base-50 focus-within:ring-3 focus-within:ring-primary focus-within:border-primary transition-all duration-300 ease-in-out">
                                <input
                                    type="number"
                                    placeholder="Ej: 25.5"
                                    className="grow text-base placeholder:text-base-content/60"
                                    value={ohmPower}
                                    onChange={(e) => setOhmPower(e.target.value)}
                                />
                                <div className="badge badge-md badge-soft badge-warning rounded-sm min-w-[2.5rem]">
                                    W
                                </div>
                            </label>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={calculateOhm}
                                className="btn btn-primary btn-sm flex-1"
                                disabled={isLoading}>
                                {isLoading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    <>
                                        <Calculator className="h-4 w-4 mr-2" />
                                        Calcular
                                    </>
                                )}
                            </button>
                            <button onClick={resetOhm} className="btn btn-secondary btn-sm flex-1">
                                <RotateCcw className="h-4 w-4 mr-2" />
                                Limpiar
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col bg-base-100 rounded-sm p-5 lg:p-6 shadow-xl border border-primary/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-20 pointer-events-none rounded-lg"></div>
                        <h3 className="text-xl font-extrabold text-secondary text-center mb-5 z-10">
                            Fórmulas Fundamentales
                        </h3>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-3 text-base-content text-base mb-6 z-10">
                            <div className="bg-base-200 p-1 flex items-center justify-center rounded-md shadow-sm border-dashed border border-base-content/10">
                                <BlockMath math="V = I \times R" />
                            </div>
                            <div className="bg-base-200 p-1 flex items-center justify-center rounded-md shadow-sm border-dashed border border-base-content/10">
                                <BlockMath math="I = \frac{V}{R}" />
                            </div>
                            <div className="bg-base-200 p-1 flex items-center justify-center rounded-md shadow-sm border-dashed border border-base-content/10">
                                <BlockMath math="R = \frac{V}{I}" />
                            </div>
                            <div className="bg-base-200 p-1 flex items-center justify-center rounded-md shadow-sm border-dashed border border-base-content/10">
                                <BlockMath math="P = V \times I" />
                            </div>
                            <div className="bg-base-200 p-1 flex items-center justify-center rounded-md shadow-sm border-dashed border border-base-content/10">
                                <BlockMath math="P = I^2 \times R" />
                            </div>
                            <div className="bg-base-200 p-1 flex items-center justify-center rounded-md shadow-sm border-dashed border border-base-content/10">
                                <BlockMath math="P = \frac{V^2}{R}" />
                            </div>
                        </div>
                        <div className="mt-auto pt-5 border-t border-base-content/20 z-10 flex-grow flex flex-col justify-end">
                            <h3 className="text-xl font-extrabold text-accent text-center mb-3">Cálculo Detallado</h3>
                            {ohmCalculations.length > 0 ? (
                                <div className="p-3 space-y-2 bg-base-200 rounded-lg shadow-inner border border-base-content/15 overflow-y-auto custom-scrollbar flex-grow">
                                    {ohmCalculations.map((calc, index) => (
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

                            {ohmResult && (
                                <div
                                    role="alert"
                                    className={`alert ${ohmResult.includes('Error') || ohmResult.includes('No puedo calcular') || ohmResult.includes('¡Ups!') ? 'alert-error' : 'alert-success'} shadow-xl mt-4 p-4 rounded-sm border-2 ${ohmResult.includes('Error') || ohmResult.includes('No puedo calcular') || ohmResult.includes('¡Ups!') ? 'border-error/50' : 'border-success/50'} `}>
                                    {ohmResult.includes('Error') ||
                                    ohmResult.includes('No puedo calcular') ||
                                    ohmResult.includes('¡Ups!') ? (
                                        <CircleX className="h-6 w-6" />
                                    ) : (
                                        <CircleCheck className="h-6 w-6" />
                                    )}
                                    <span className="font-bold text-lg">{ohmResult}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {ohmResult && (
                <div className="space-y-4">
                    <div className="bg-base-200 p-4 rounded-md">
                        <div className="font-semibold mb-2">Resultado</div>
                        <div className="text-sm text-base-content">{ohmResult}</div>
                        <div className="mt-2 space-y-2">
                            {ohmCalculations.map((calculation, index) => (
                                <div key={index} className="text-sm">
                                    <BlockMath math={calculation} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {calculationHistory.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-extrabold text-primary-focus mb-2 border-b-1 border-primary/50 pb-2">
                        Historial de Cálculos
                    </h3>
                    <div className="max-h-[200px] overflow-y-auto space-y-2">
                        {calculationHistory.map((calc, index) => (
                            <div key={index} className="bg-base-200 p-3 rounded-md">
                                <div className="text-sm text-base-content">{calc.result}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </SectionCalculator>
    );
}
