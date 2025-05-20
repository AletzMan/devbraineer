'use client';

import {
    Calculator,
    Minus,
    Plus,
    RotateCcw,
    CircleX,
    CircleCheck,
    Omega, // Importar el icono Omega
} from 'lucide-react';
import { useState } from 'react';
import { BlockMath } from 'react-katex'; // Importar BlockMath
import SectionCalculator from './SectionCalculator';

export default function TotalResistor() {
    const [resistors, setResistors] = useState(['', '']);
    const [circuitType, setCircuitType] = useState('series');
    const [totalResistanceResult, setTotalResistanceResult] = useState<
        string | null
    >(null);
    const [calculationDetails, setCalculationDetails] = useState<string[]>([]);

    const calculateTotalResistance = () => {
        setTotalResistanceResult(null);
        setCalculationDetails([]);

        try {
            const resistanceValues = resistors
                .filter((r) => r !== '')
                .map((r) => Number.parseFloat(r));

            if (resistanceValues.length < 2) {
                setTotalResistanceResult(
                    '¡Ups! Ingresa al menos dos resistencias para calcular.'
                );
                return;
            }

            if (
                resistanceValues.some(isNaN) ||
                resistanceValues.some((val) => val < 0)
            ) {
                setTotalResistanceResult(
                    '¡Error! Ingresa solo números positivos válidos para las resistencias.'
                );
                return;
            }

            let total = 0;
            const steps: string[] = [];
            let finalResultDisplay = ''; // Para el KaTeX del resultado final
            let alertMessage = ''; // Para el texto del alert

            if (circuitType === 'series') {
                const resistanceTerms = resistanceValues
                    .map((r, i) => `R_{${i + 1}}`)
                    .join(' + ');
                // Sustitución con unidades
                const numericalTermsWithUnits = resistanceValues
                    .map((r) => `${r.toFixed(2)} \\ \\Omega`)
                    .join(' + ');

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

                const reciprocalTerms = resistanceValues
                    .map((r, i) => `\\frac{1}{R_{${i + 1}}}`)
                    .join(' + ');
                // Sustitución con unidades
                const reciprocalNumericalTermsWithUnits = resistanceValues
                    .map((r) => `\\frac{1}{${r.toFixed(2)} \\ \\Omega}`)
                    .join(' + ');

                // ELIMINADO $$ EXTRA AQUÍ
                steps.push(`\\frac{1}{R_{\\text{total}}} = ${reciprocalTerms}`); // Fórmula general
                steps.push(
                    `\\frac{1}{R_{\\text{total}}} = ${reciprocalNumericalTermsWithUnits}`
                ); // Sustitución con unidades

                const reciprocalSum = resistanceValues.reduce(
                    (sum, r) => sum + 1 / r,
                    0
                );
                // ELIMINADO $$ EXTRA AQUÍ
                steps.push(
                    `\\frac{1}{R_{\\text{total}}} = ${reciprocalSum.toFixed(4)} \\ \\Omega^{-1}`
                );

                total = 1 / reciprocalSum;
                // ELIMINADO $$ EXTRA AQUÍ
                steps.push(
                    `R_{\\text{total}} = \\frac{1}{${reciprocalSum.toFixed(4)} \\ \\Omega^{-1}}`
                );

                finalResultDisplay = `R_{\\text{total}} = ${total.toFixed(2)} \\ \\Omega`;
                alertMessage = `Resistencia Total (R) = ${total.toFixed(2)} Ω`;
            }

            // ELIMINADO $$ EXTRA AQUÍ
            steps.push(`${finalResultDisplay}`); // El resultado final también sin $$
            setCalculationDetails(steps);
            setTotalResistanceResult(alertMessage);
        } catch (error) {
            setTotalResistanceResult(
                '¡Vaya! Hubo un error en el cálculo. Asegúrate de que los valores sean válidos.'
            );
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
            setTotalResistanceResult(
                'Debes tener al menos dos resistencias para calcular en serie/paralelo.'
            );
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
            title="Calculadora de Resistencia Total (Serie/Paralelo)"
            description="Determina la resistencia equivalente de un conjunto de resistencias conectadas en serie o en paralelo.">
            <div className="card-body p-6 lg:p-8 bg-gradient-to-br from-base-300 to-base-200 rounded-lg shadow-2xl border border-base-content/10 transform transition-all duration-300 hover:shadow-3xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
                    {/* Columna de Inputs y Botones */}
                    <div className="flex flex-col space-y-6">
                        <h3 className="text-xl font-extrabold text-primary-focus mb-4 border-b-2 border-primary/50 pb-2">
                            Datos de Entrada
                        </h3>

                        {/* Campo Tipo de Circuito */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base-content text-base font-semibold flex items-center gap-2">
                                    <Omega className="h-5 w-5 text-primary" />{' '}
                                    Tipo de circuito
                                </span>
                            </label>
                            <select
                                className="select select-bordered select-sm w-full shadow-md bg-base-100 hover:bg-base-50 focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary transition-all duration-300 ease-in-out"
                                value={circuitType}
                                onChange={(e) => {
                                    setCircuitType(e.target.value);
                                    handleInputChange();
                                }}>
                                <option value="series">Serie</option>
                                <option value="parallel">Paralelo</option>
                            </select>
                        </div>

                        {/* Campos de Resistencia */}
                        <div className="form-control space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="label">
                                    <span className="label-text text-base-content text-base font-semibold flex items-center gap-2">
                                        <Omega className="h-5 w-5 text-primary" />{' '}
                                        Resistencias (Ω)
                                    </span>
                                </label>
                                <button
                                    className="btn btn-ghost btn-sm text-primary hover:text-primary-focus transition-colors duration-200"
                                    onClick={addResistor}>
                                    <Plus className="h-5 w-5" />
                                    Añadir
                                </button>
                            </div>
                            <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar p-1 pr-2 rounded-sm">
                                {' '}
                                {resistors.map((resistor, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-2 items-center">
                                        <label className="input input-bordered input-sm flex items-center gap-2 flex-1 shadow-md bg-base-100 hover:bg-base-50 focus-within:ring-3 focus-within:ring-primary focus-within:border-primary transition-all duration-300 ease-in-out">
                                            <input
                                                type="number"
                                                placeholder={`R${index + 1} en ohmios`}
                                                className="grow text-base placeholder:text-base-content/60"
                                                value={resistor}
                                                onChange={(e) =>
                                                    updateResistor(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <div className="badge badge-md badge-soft badge-warning rounded-sm min-w-[2.5rem]">
                                                <Omega className="size-4" />
                                            </div>
                                        </label>
                                        {resistors.length > 2 && (
                                            <button
                                                className="btn btn-error btn-square btn-sm shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 rounded-sm"
                                                onClick={() =>
                                                    removeResistor(index)
                                                }>
                                                <Minus className="h-5 w-5" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                            <button
                                className="btn btn-primary btn-sm flex-1 text-lg font-bold shadow-md hover:shadow-lg rounded-sm"
                                onClick={calculateTotalResistance}>
                                <Calculator className="h-6 w-6" />
                                Calcular
                            </button>
                            <button
                                className="btn btn-outline btn-secondary btn-sm flex-1 text-lg font-bold shadow-md hover:shadow-lg rounded-sm"
                                onClick={resetSeriesParallel}>
                                <RotateCcw className="h-6 w-6" />
                                Resetear
                            </button>
                        </div>
                    </div>

                    {/* Columna de Fórmulas y Resultado */}
                    <div className="flex flex-col bg-base-100 rounded-lg p-5 lg:p-6 shadow-xl border border-primary/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-20 pointer-events-none rounded-lg"></div>

                        <h3 className="text-xl font-extrabold text-secondary text-center mb-5 z-10">
                            Fórmulas Clave
                        </h3>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-3 text-base-content text-base mb-6 z-10">
                            <div className="bg-base-200 p-2 rounded-md shadow-sm border-dashed border border-base-content/10 flex items-center justify-center">
                                <BlockMath math="R_{\text{serie}} = \sum_{i=1}^{n} R_i" />
                            </div>
                            <div className="bg-base-200 p-2 rounded-md shadow-sm border-dashed border border-base-content/10 flex items-center justify-center">
                                <BlockMath math="\frac{1}{R_{\text{paralelo}}} = \sum_{i=1}^{n} \frac{1}{R_i}" />
                            </div>
                        </div>

                        {/* Sección de Cálculo Detallado */}
                        <div className="mt-auto pt-5 border-t border-base-content/20 z-10 flex-grow flex flex-col justify-end">
                            <h3 className="text-xl font-extrabold text-accent text-center mb-3">
                                Cálculo Detallado
                            </h3>
                            {calculationDetails.length > 0 ? (
                                <div className="p-3 space-y-2 bg-base-200 rounded-lg shadow-inner border border-base-content/15 overflow-y-auto custom-scrollbar flex-grow">
                                    {/* Aquí, el 'calc' ya no necesita $$ */}
                                    {calculationDetails.map((calc, index) => (
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

                            {/* El alert solo se muestra si hay un mensaje de resultado o de error */}
                            {totalResistanceResult && (
                                <div
                                    role="alert"
                                    className={`alert ${totalResistanceResult.includes('¡Error!') || totalResistanceResult.includes('¡Ups!') || totalResistanceResult.includes('¡Atención!') || totalResistanceResult.includes('Debes tener') ? 'alert-error' : 'alert-success'} shadow-xl mt-4 p-4 rounded-sm border-2 ${totalResistanceResult.includes('¡Error!') || totalResistanceResult.includes('¡Ups!') || totalResistanceResult.includes('¡Atención!') || totalResistanceResult.includes('Debes tener') ? 'border-error/50' : 'border-success/50'}`}>
                                    {totalResistanceResult.includes(
                                        '¡Error!'
                                    ) ||
                                    totalResistanceResult.includes('¡Ups!') ||
                                    totalResistanceResult.includes(
                                        '¡Atención!'
                                    ) ||
                                    totalResistanceResult.includes(
                                        'Debes tener'
                                    ) ? (
                                        <CircleX className="h-6 w-6" />
                                    ) : (
                                        <CircleCheck className="h-6 w-6" />
                                    )}
                                    <span className="font-bold text-lg">
                                        {totalResistanceResult}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </SectionCalculator>
    );
}
