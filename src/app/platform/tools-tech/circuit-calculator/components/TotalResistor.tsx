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
import { BlockMath } from 'react-katex';
import SectionCalculator from './SectionCalculator';

export default function TotalResistor() {
    const [resistors, setResistors] = useState(['', '']);
    const [circuitType, setCircuitType] = useState('series');
    const [totalResistance, setTotalResistance] = useState<string | null>(null);

    // Función para calcular resistencia total en serie/paralelo
    const calculateTotalResistance = () => {
        try {
            const resistanceValues = resistors
                .filter((r) => r !== '')
                .map((r) => Number.parseFloat(r));

            if (resistanceValues.length === 0) {
                setTotalResistance('¡Ups! Ingresa al menos una resistencia.');
                return;
            }
            // Validar que todas las resistencias sean números válidos y positivos
            if (
                resistanceValues.some(isNaN) ||
                resistanceValues.some((val) => val < 0)
            ) {
                setTotalResistance(
                    '¡Error! Ingresa solo números positivos válidos para las resistencias.'
                );
                return;
            }

            let total = 0;

            if (circuitType === 'series') {
                total = resistanceValues.reduce((sum, r) => sum + r, 0);
                setTotalResistance(`Resistencia total: ${total.toFixed(2)} Ω`);
            } else {
                if (resistanceValues.includes(0)) {
                    setTotalResistance(
                        '¡Atención! La resistencia en paralelo con un valor de 0 Ω resulta en 0 Ω total.'
                    );
                    return;
                }
                const reciprocalSum = resistanceValues.reduce(
                    (sum, r) => sum + 1 / r,
                    0
                );
                total = 1 / reciprocalSum;
                setTotalResistance(`Resistencia total: ${total.toFixed(2)} Ω`);
            }
        } catch (error) {
            setTotalResistance(
                '¡Vaya! Hubo un error en el cálculo. Asegúrate de que los valores sean válidos.'
            );
        }
    };

    // --- Funciones de Utilidad (Añadir/Remover, Resetear) ---

    // Función para añadir un campo de resistencia
    const addResistor = () => {
        setResistors([...resistors, '']);
    };

    // Función para actualizar el valor de una resistencia
    const updateResistor = (index: number, value: string) => {
        const newResistors = [...resistors];
        newResistors[index] = value;
        setResistors(newResistors);
    };

    // Función para eliminar un campo de resistencia
    const removeResistor = (index: number) => {
        if (resistors.length > 2) {
            const newResistors = [...resistors];
            newResistors.splice(index, 1);
            setResistors(newResistors);
        } else {
            setTotalResistance(
                'Debes tener al menos dos resistencias para calcular en serie/paralelo.'
            );
        }
    };

    // Función para resetear calculadora de Serie/Paralelo
    const resetSeriesParallel = () => {
        setResistors(['', '']);
        setCircuitType('series');
        setTotalResistance(null);
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
                                onChange={(e) =>
                                    setCircuitType(e.target.value)
                                }>
                                <option value="series">Serie</option>
                                <option value="parallel">Paralelo</option>
                            </select>
                        </div>

                        {/* Campos de Resistencia */}
                        <div className="form-control space-y-4">
                            {' '}
                            {/* Aumentado el space-y para más separación */}
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
                                {/* Contenedor con scroll para resistencias */}
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
                                        {resistors.length > 2 && ( // Permitir eliminar solo si hay más de 2 resistencias
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
                                className="btn btn-primary btn-md flex-1 text-lg font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 rounded-lg"
                                onClick={calculateTotalResistance}>
                                <Calculator className="h-6 w-6" />
                                Calcular
                            </button>
                            <button
                                className="btn btn-outline btn-secondary btn-md flex-1 text-lg font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 rounded-lg"
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

                        {/* Sección de Resultado */}
                        <div className="mt-auto pt-5 border-t border-base-content/20 z-10 flex-grow flex flex-col justify-end">
                            <h3 className="text-xl font-extrabold text-accent text-center mb-3">
                                Resultado
                            </h3>
                            {totalResistance ? (
                                <div
                                    role="alert"
                                    className={`alert ${totalResistance.includes('¡Error!') || totalResistance.includes('¡Ups!') || totalResistance.includes('¡Atención!') ? 'alert-error' : 'alert-success'} shadow-xl mt-4 p-4 rounded-sm border-2 ${totalResistance.includes('¡Error!') || totalResistance.includes('¡Ups!') || totalResistance.includes('¡Atención!') ? 'border-error/50' : 'border-success/50'}`}>
                                    {totalResistance.includes('¡Error!') ||
                                    totalResistance.includes('¡Ups!') ||
                                    totalResistance.includes('¡Atención!') ? (
                                        <CircleX className="h-6 w-6" />
                                    ) : (
                                        <CircleCheck className="h-6 w-6" />
                                    )}
                                    <span className="font-bold text-lg">
                                        {totalResistance}
                                    </span>
                                </div>
                            ) : (
                                <div className="flex-grow flex items-center justify-center">
                                    <p className="text-center text-base-content/70 italic text-sm">
                                        El resultado de la resistencia total
                                        aparecerá aquí.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </SectionCalculator>
    );
}
