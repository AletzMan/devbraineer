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
            title=""
            description="Calcula valores de voltaje, corriente, resistencia y potencia. Ingresa al menos dos valores para descubrir los demás."
            sectionLeft={
                <div className="space-y-4">
                    <div className="flex flex-col items-start gap-1">
                        <label className="label text-sm flex items-center gap-2">
                            {inputIcons.voltage} Voltaje (V)
                        </label>
                        <label className="input">
                            <input
                                type="number"
                                placeholder="Ej: 12.5"
                                className="grow text-base placeholder:text-base-content/60"
                                value={ohmVoltage}
                                onChange={(e) => setOhmVoltage(e.target.value)}
                            />
                            <span className="badge badge-soft badge-warning rounded-sm">V</span>
                        </label>
                    </div>
                    <div className="flex flex-col items-start gap-1">
                        <label className="label text-sm flex items-center gap-2">
                            {inputIcons.current} Corriente (I)
                        </label>
                        <label className="input input-md flex items-center gap-2 shadow-md bg-base-100 hover:bg-base-50 focus-within:ring-3 focus-within:ring-primary focus-within:border-primary transition-all duration-300 ease-in-out">
                            <input
                                type="number"
                                placeholder="Ej: 2.0"
                                className="grow text-base placeholder:text-base-content/60"
                                value={ohmCurrent}
                                onChange={(e) => setOhmCurrent(e.target.value)}
                            />
                            <div className="badge badge-md badge-soft badge-warning rounded-sm min-w-[2.5rem]">A</div>
                        </label>
                    </div>

                    <div className="flex flex-col items-start gap-1">
                        <label className="label text-sm flex items-center gap-2">
                            {inputIcons.resistance} Resistencia (R)
                        </label>
                        <label className="input input-md flex items-center shadow-md bg-base-100 hover:bg-base-50 focus-within:ring-3 focus-within:ring-primary focus-within:border-primary transition-all duration-300 ease-in-out">
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

                    <div className="flex flex-col items-start gap-1">
                        <label className="label text-sm flex items-center gap-2">{inputIcons.power} Potencia (P)</label>
                        <label className="input input-md flex items-center gap-2 shadow-md bg-base-100 hover:bg-base-50 focus-within:ring-3 focus-within:ring-primary focus-within:border-primary transition-all duration-300 ease-in-out">
                            <input
                                type="number"
                                placeholder="Ej: 25.5"
                                className="grow text-base placeholder:text-base-content/60"
                                value={ohmPower}
                                onChange={(e) => setOhmPower(e.target.value)}
                            />
                            <div className="badge badge-md badge-soft badge-warning rounded-sm min-w-[2.5rem]">W</div>
                        </label>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={calculateOhm} className="btn btn-primary btn-sm flex-1" disabled={isLoading}>
                            {isLoading ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                <>
                                    <Calculator className="size-5" />
                                    Calcular
                                </>
                            )}
                        </button>
                        <button onClick={resetOhm} className="btn btn-outline btn-secondary btn-sm flex-1">
                            <RotateCcw className="size-5" />
                            Resetear
                        </button>
                    </div>
                </div>
            }
            sectionRight={{
                formula: {
                    title: 'Fórmulas Fundamentales',
                    formulas: [
                        'V = I \\times R',
                        'I = \\frac{V}{R}',
                        'R = \\frac{V}{I}',
                        'P = V \\times I',
                        'P = I^2 \\times R',
                        'P = \\frac{V^2}{R}',
                    ],
                },
                result: {
                    calculations: ohmCalculations,
                    result: ohmResult,
                },
            }}
        />
    );
}
