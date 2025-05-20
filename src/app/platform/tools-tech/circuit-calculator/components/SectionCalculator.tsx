import { menuData } from '@/app/platform/constants';
import { Calculator } from 'lucide-react';

interface SectionCalculatorProps {
    title?: string;
    description?: string;
    children?: React.ReactNode;
}

export default function SectionCalculator({
    title,
    description,
    children,
}: SectionCalculatorProps) {
    return (
        <section className="flex flex-col gap-4 h-[calc(100svh-14.5rem)] scrollbar-thin overflow-y-auto">
            {title !== undefined || description !== undefined ? (
                <header className="flex flex-col px-4 py-2 gap-0.5 border-b border-dashed border-gray-600">
                    {title && (
                        <h2
                            className={`card-title text-xl text-warning flex items-center gap-2`}>
                            <Calculator className={`h-6 w-6`} />
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p className={`pl-8 text-sm text-gray-500`}>
                            {description}
                        </p>
                    )}
                </header>
            ) : null}
            <div className="px-4 py-2 ">
                <div className="flex flex-col gap-4 bg-base-300 rounded-sm">
                    {children}
                </div>
            </div>
        </section>
    );
}
