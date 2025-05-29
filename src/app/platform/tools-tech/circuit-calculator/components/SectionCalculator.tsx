import { menuData } from '@/app/platform/constants';
import { Calculator, CircleCheck, CircleX, FileInput, SquareRadical } from 'lucide-react';
import { BlockMath } from 'react-katex';

interface SectionCalculatorProps {
    title?: string;
    description?: string;
    sectionLeft?: React.ReactNode;
    sectionRight?: {
        formula: { title?: string; formulas: string[] };
        result: { calculations: string[]; result: string | null };
    };
}

export default function SectionCalculator({ title, description, sectionLeft, sectionRight }: SectionCalculatorProps) {
    return (
        <section className="flex flex-col gap-2 h-[calc(100svh-14.5rem)] scrollbar-thin overflow-y-auto">
            {title !== undefined || description !== undefined ? (
                <header className="flex flex-col px-4 py-2 gap-0.5 border-b border-dashed border-gray-600">
                    {title && (
                        <h2 className={`card-title text-xl text-warning flex items-center gap-2`}>
                            <Calculator className={`h-6 w-6`} />
                            {title}
                        </h2>
                    )}
                    {description && <p className={`pl-8 text-sm text-gray-500`}>{description}</p>}
                </header>
            ) : null}
            <div className="bg-base-200 rounded-md shadow-2xl border border-base-300 transform transition-all duration-300 hover:shadow-3xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-2">
                    <div className="flex flex-col gap-4 p-2 bg-base-300 rounded-sm">
                        <header className="flex flex-col px-4 py-2 gap-0.5 border-b border-dashed border-gray-600">
                            <h2 className={`card-title text-xl text-warning flex items-center gap-2`}>
                                <FileInput className={`size-7`} />
                                Datos de Entrada
                            </h2>
                        </header>
                        {sectionLeft}
                    </div>
                    <div className="flex flex-col gap-4 p-2 bg-base-300 rounded-sm">
                        {sectionRight?.formula.title !== undefined || sectionRight?.formula.formulas !== undefined ? (
                            <header className="flex flex-col px-4 py-2 gap-0.5 border-b border-dashed border-gray-600">
                                {sectionRight?.formula.title && (
                                    <h2 className={`card-title text-xl text-secondary flex items-center gap-2`}>
                                        <SquareRadical className={`size-7`} />
                                        {sectionRight?.formula.title}
                                    </h2>
                                )}
                            </header>
                        ) : null}
                        <div className="flex flex-wrap  bg-lines-inverted gap-2 text-base-content text-base mb-6 z-10 border border-base-content/10 p-2 rounded-sm">
                            {sectionRight?.formula.formulas.map((formula, index) => (
                                <div
                                    key={index}
                                    className="bg-base-200 p-1 flex items-center justify-center rounded-md px-4 shadow-sm border-dashed border border-base-content/10">
                                    <BlockMath math={formula} />
                                </div>
                            ))}
                        </div>
                        {sectionRight?.result ? (
                            <header className="flex flex-col px-4 py-2 gap-0.5 border-b border-dashed border-gray-600">
                                <h2 className={`card-title text-xl text-success flex items-center gap-2`}>
                                    <Calculator className={`size-7`} />
                                    Resultado
                                </h2>
                            </header>
                        ) : null}
                        {sectionRight?.result ? (
                            <div className="mt-auto z-10 flex-grow flex flex-col justify-end">
                                <h3 className="text-xl font-extrabold text-accent text-center mb-3">
                                    Cálculo Detallado
                                </h3>
                                <div className="p-3 space-y-2 bg-squares rounded-sm shadow-inner border border-base-content/15 overflow-y-auto custom-scrollbar flex-grow">
                                    {sectionRight.result.calculations.length > 0 ? (
                                        sectionRight.result.calculations.map((calc, index) => (
                                            <BlockMath key={index} math={calc} />
                                        ))
                                    ) : (
                                        <p className="text-center text-base-content/70 italic text-sm">
                                            Aquí aparecerán los pasos del cálculo.
                                        </p>
                                    )}
                                </div>
                                {sectionRight.result.result && (
                                    <div
                                        role="alert"
                                        className={`alert ${sectionRight.result.result.includes('Error') || sectionRight.result.result.includes('No puedo calcular') || sectionRight.result.result.includes('¡Ups!') ? 'alert-error' : 'alert-success'} shadow-xl mt-4 p-4 rounded-sm border-2 ${sectionRight.result.result.includes('Error') || sectionRight.result.result.includes('No puedo calcular') || sectionRight.result.result.includes('¡Ups!') ? 'border-error/50' : 'border-success/50'} `}>
                                        {sectionRight.result.result.includes('Error') ||
                                        sectionRight.result.result.includes('No puedo calcular') ||
                                        sectionRight.result.result.includes('¡Ups!') ? (
                                            <CircleX className="h-6 w-6" />
                                        ) : (
                                            <CircleCheck className="h-6 w-6" />
                                        )}
                                        <span className="font-bold text-lg">{sectionRight.result.result}</span>
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    );
}
