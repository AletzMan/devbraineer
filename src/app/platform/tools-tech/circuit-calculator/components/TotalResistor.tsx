'use client';

import {
    Calculator,
    Minus,
    Plus,
    RotateCcw,
    CircleX,
    CircleCheck,
    Omega,
    CircuitBoard, // Importar el icono Omega
} from 'lucide-react';
import { useState } from 'react';
import { BlockMath } from 'react-katex'; // Importar BlockMath
import SectionCalculator from './SectionCalculator';

export default function TotalResistor() {
    const [resistors, setResistors] = useState(['', '']);
    const [circuitType, setCircuitType] = useState('series');
    const [totalResistanceResult, setTotalResistanceResult] = useState<string | null>(null);
    const [calculationDetails, setCalculationDetails] = useState<string[]>([]);

    const calculateTotalResistance = () => {
        setTotalResistanceResult(null);
        setCalculationDetails([]);

        try {
            const resistanceValues = resistors.filter((r) => r !== '').map((r) => Number.parseFloat(r));

            if (resistanceValues.length < 2) {
                setTotalResistanceResult('¡Ups! Ingresa al menos dos resistencias para calcular.');
                return;
            }

            if (resistanceValues.some(isNaN) || resistanceValues.some((val) => val < 0)) {
                setTotalResistanceResult('¡Error! Ingresa solo números positivos válidos para las resistencias.');
                return;
            }

            let total = 0;
            const steps: string[] = [];
            let finalResultDisplay = ''; // Para el KaTeX del resultado final
            let alertMessage = ''; // Para el texto del alert

            if (circuitType === 'series') {
                const resistanceTerms = resistanceValues.map((r, i) => `R_{${i + 1}}`).join(' + ');
                // Sustitución con unidades
                const numericalTermsWithUnits = resistanceValues.map((r) => `${r.toFixed(2)} \\ \\Omega`).join(' + ');

                // ELIMINADO $$ EXTRA AQUÍ
                steps.push(`R_{\\text{total}} = ${resistanceTerms}`); // Fórmula general
                steps.push(`R_{\\text{total}} = ${numericalTermsWithUnits}`); // Sustitución con unidades

                total = resistanceValues.reduce((sum, r) => sum + r, 0);

                finalResultDisplay = `R_{\\text{total}} = ${total.toFixed(2)} \\ \\Omega`;
                alertMessage = `Resistencia Total (R) = ${total.toFixed(2)} Ω`;
            } else {
                // Paralelo
                if (resistanceValues.includes(0)) {
                    setTotalResistanceResult(
                        '¡Atención! La resistencia total en paralelo es 0 Ω si una de las resistencias es 0 Ω.'
                    );
                    setCalculationDetails([]);
                    return;
                }

                const reciprocalTerms = resistanceValues.map((r, i) => `\\frac{1}{R_{${i + 1}}}`).join(' + ');
                // Sustitución con unidades
                const reciprocalNumericalTermsWithUnits = resistanceValues
                    .map((r) => `\\frac{1}{${r.toFixed(2)} \\ \\Omega}`)
                    .join(' + ');

                // ELIMINADO $$ EXTRA AQUÍ
                steps.push(`\\frac{1}{R_{\\text{total}}} = ${reciprocalTerms}`); // Fórmula general
                steps.push(`\\frac{1}{R_{\\text{total}}} = ${reciprocalNumericalTermsWithUnits}`); // Sustitución con unidades

                const reciprocalSum = resistanceValues.reduce((sum, r) => sum + 1 / r, 0);
                // ELIMINADO $$ EXTRA AQUÍ
                steps.push(`\\frac{1}{R_{\\text{total}}} = ${reciprocalSum.toFixed(4)} \\ \\Omega^{-1}`);

                total = 1 / reciprocalSum;
                // ELIMINADO $$ EXTRA AQUÍ
                steps.push(`R_{\\text{total}} = \\frac{1}{${reciprocalSum.toFixed(4)} \\ \\Omega^{-1}}`);

                finalResultDisplay = `R_{\\text{total}} = ${total.toFixed(2)} \\ \\Omega`;
                alertMessage = `Resistencia Total (R) = ${total.toFixed(2)} Ω`;
            }

            // ELIMINADO $$ EXTRA AQUÍ
            steps.push(`${finalResultDisplay}`); // El resultado final también sin $$
            setCalculationDetails(steps);
            setTotalResistanceResult(alertMessage);
        } catch (error) {
            setTotalResistanceResult('¡Vaya! Hubo un error en el cálculo. Asegúrate de que los valores sean válidos.');
            setCalculationDetails([]);
        }
    };

    const handleInputChange = () => {
        setTotalResistanceResult(null);
        setCalculationDetails([]);
    };

    const addResistor = () => {
        setResistors([...resistors, '']);
        handleInputChange();
    };

    const updateResistor = (index: number, value: string) => {
        const newResistors = [...resistors];
        newResistors[index] = value;
        setResistors(newResistors);
        handleInputChange();
    };

    const removeResistor = (index: number) => {
        if (resistors.length > 2) {
            const newResistors = [...resistors];
            newResistors.splice(index, 1);
            setResistors(newResistors);
            handleInputChange();
        } else {
            setTotalResistanceResult('Debes tener al menos dos resistencias para calcular en serie/paralelo.');
            setCalculationDetails([]);
        }
    };

    const resetSeriesParallel = () => {
        setResistors(['', '']);
        setCircuitType('series');
        setTotalResistanceResult(null);
        setCalculationDetails([]);
    };

    return (
        <SectionCalculator
            title=""
            description="Determina la resistencia equivalente de un conjunto de resistencias conectadas en serie o en paralelo."
            sectionLeft={
                <div className="flex flex-col space-y-6">
                    {/* Campo Tipo de Circuito */}
                    <label className="label flex flex-col items-start">
                        <span className="text-sm flex items-center gap-2">
                            <CircuitBoard className="h-5 w-5 text-primary" /> Tipo de circuito
                        </span>

                        <select
                            className="select text-base-content select-md shadow-md bg-base-100"
                            value={circuitType}
                            onChange={(e) => {
                                setCircuitType(e.target.value);
                                handleInputChange();
                            }}>
                            <option value="series">Serie</option>
                            <option value="parallel">Paralelo</option>
                        </select>
                    </label>

                    {/* Campos de Resistencia */}
                    <div className="form-control space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="label">
                                <span className="label-text text-base-content text-base font-semibold flex items-center gap-2">
                                    <Omega className="h-5 w-5 text-primary" /> Resistencias (Ω)
                                </span>
                            </label>
                            <button className="btn btn-sm btn-soft" onClick={addResistor}>
                                <Plus className="h-5 w-5" />
                                Añadir
                            </button>
                        </div>
                        <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar p-1 pr-2 rounded-sm">
                            {' '}
                            {resistors.map((resistor, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <label className="input input-md flex items-center gap-2 flex-1">
                                        <input
                                            type="number"
                                            placeholder={`R${index + 1} en ohmios`}
                                            className="grow text-base placeholder:text-base-content/60"
                                            value={resistor}
                                            onChange={(e) => updateResistor(index, e.target.value)}
                                        />
                                        <div className="badge badge-md badge-soft badge-warning rounded-sm min-w-[2.5rem]">
                                            <Omega className="size-4" />
                                        </div>
                                    </label>
                                    {resistors.length > 2 && (
                                        <button
                                            className="btn btn-error btn-soft btn-sm"
                                            onClick={() => removeResistor(index)}>
                                            <Minus className="size-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
            sectionRight={{
                formula: {
                    title: 'Fórmulas Fundamentales',
                    formulas: [
                        'R_{\\text{serie}} = \\sum_{i=1}^{n} R_i',
                        '\\frac{1}{R_{\\text{paralelo}}} = \\sum_{i=1}^{n} \\frac{1}{R_i}',
                    ],
                    calculate: calculateTotalResistance,
                    reset: resetSeriesParallel,
                },
                result: {
                    calculations: calculationDetails,
                    result: totalResistanceResult,
                },
            }}
        />
    );
}
