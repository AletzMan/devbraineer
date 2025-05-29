import { menuData } from '@/app/platform/constants';
import { Calculator } from 'lucide-react';

interface SectionCalculatorProps {
    title?: string;
    description?: string;
    sectionLeft?: React.ReactNode;
    sectionRight?: React.ReactNode;
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
                        <h3 className="text-xl font-extrabold text-primary-focus mb-4 border-b-2 border-primary/50 pb-2">
                            Datos de Entrada
                        </h3>
                        {sectionLeft}
                    </div>
                    <div className="flex flex-col gap-4 p-2 bg-base-300 rounded-sm">{sectionRight}</div>
                </div>
            </div>
        </section>
    );
}
