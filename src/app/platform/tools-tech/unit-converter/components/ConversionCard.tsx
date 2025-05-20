import { ArrowRightLeft, CircleCheck, CircleX, RotateCcw } from 'lucide-react';
import { BlockMath } from 'react-katex';

// --- Componente para una tarjeta de conversión individual ---
interface ConversionCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    fromUnit: string;
    setFromUnit: React.Dispatch<React.SetStateAction<string>>;
    toUnit: string;
    setToUnit: React.Dispatch<React.SetStateAction<string>>; // Mantengo el tipo, aunque era `any` en tu original
    units: { value: string; label: string }[];
    onConvert: () => void;
    onSwap: () => void;
    onReset: () => void;
    result: string | null;
    calculationDetails: string[];
}

export function ConversionCard({
    title,
    description,
    icon,
    value,
    setValue,
    fromUnit,
    setFromUnit,
    toUnit,
    setToUnit,
    units,
    onConvert,
    onSwap,
    onReset,
    result,
    calculationDetails,
}: ConversionCardProps) {
    return (
        <div className="flex flex-col bg-base-100 rounded-sm p-5 lg:p-6 shadow-xl border border-primary/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-20 pointer-events-none rounded-sm"></div>

            <h3 className="text-xl font-extrabold text-secondary text-center mb-5 z-10 flex items-center justify-center gap-2">
                {icon} {title}
            </h3>
            <p className="text-base-content/70 text-center mb-6 z-10">
                {description}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
                {/* Columna de Inputs y Controles */}
                <div className="flex flex-col space-y-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base-content text-base font-semibold flex items-center gap-2">
                                Valor a convertir
                            </span>
                        </label>
                        <input
                            type="number"
                            placeholder="Ingresa un valor"
                            className="input input-bordered input-sm w-full shadow-md bg-base-100 hover:bg-base-50 focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary transition-all duration-300 ease-in-out"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-5 gap-2 items-end">
                        <div className="col-span-2 space-y-2 form-control">
                            <label className="label">
                                <span className="label-text text-base-content text-base font-semibold">
                                    De
                                </span>
                            </label>
                            <select
                                className="select select-bordered select-sm w-full shadow-md bg-base-100 hover:bg-base-50 focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary transition-all duration-300 ease-in-out"
                                value={fromUnit}
                                onChange={(e) => setFromUnit(e.target.value)}>
                                {units.map((unit) => (
                                    <option key={unit.value} value={unit.value}>
                                        {unit.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex justify-center items-center">
                            <button
                                className="btn btn-ghost btn-sm text-primary hover:text-primary-focus transition-colors duration-200"
                                onClick={onSwap}>
                                <ArrowRightLeft className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="col-span-2 space-y-2 form-control">
                            <label className="label">
                                <span className="label-text text-base-content text-base font-semibold">
                                    A
                                </span>
                            </label>
                            <select
                                className="select select-bordered select-sm w-full shadow-md bg-base-100 hover:bg-base-50 focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary transition-all duration-300 ease-in-out"
                                value={toUnit}
                                onChange={(e) => setToUnit(e.target.value)}>
                                {units.map((unit) => (
                                    <option key={unit.value} value={unit.value}>
                                        {unit.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <button
                            className="btn btn-primary btn-sm flex-1  font-bold shadow-md hover:shadow-lg rounded-sm"
                            onClick={onConvert}>
                            <ArrowRightLeft className="size-4" />
                            Convertir
                        </button>
                        <button
                            className="btn btn-outline btn-secondary btn-sm flex-1 text-md font-bold shadow-md hover:shadow-lg rounded-sm"
                            onClick={onReset}>
                            <RotateCcw className="size-4" />
                            Limpiar
                        </button>
                    </div>
                </div>

                {/* Columna de Cálculo Detallado y Resultado */}
                <div className="flex flex-col bg-base-200 rounded-sm p-5 lg:p-6 shadow-inner border border-base-content/15 relative overflow-hidden flex-grow">
                    <h3 className="text-xl font-extrabold text-accent text-center mb-3">
                        Cálculo Detallado
                    </h3>
                    {calculationDetails.length > 0 ? (
                        <div className="p-3 space-y-2 bg-base-100 rounded-sm shadow-inner border border-base-content/10 overflow-y-auto custom-scrollbar flex-grow">
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

                    {result && (
                        <div
                            role="alert"
                            className={`alert ${result.includes('¡Error!') || result.includes('¡Ups!') || result.includes('¡Atención!') ? 'alert-error' : 'alert-success'} shadow-xl mt-4 p-4 rounded-sm border-2 ${result.includes('¡Error!') || result.includes('¡Ups!') || result.includes('¡Atención!') ? 'border-error/50' : 'border-success/50'}`}>
                            {result.includes('¡Error!') ||
                            result.includes('¡Ups!') ||
                            result.includes('¡Atención!') ? (
                                <CircleX className="h-6 w-6" />
                            ) : (
                                <CircleCheck className="h-6 w-6" />
                            )}
                            <span className="font-bold text-lg">{result}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
