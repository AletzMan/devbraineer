import { Calendar, CopyIcon, PlayIcon, TrashIcon } from 'lucide-react';
import { RegexPattern } from '@prisma/client';
import { FormattedDate } from '@/lib/helpers';

export default function PatternRegex({
    item,
    index,
    setPattern,
    setActiveTab,
    visibleDate,
    onDelete,
}: {
    item: RegexPattern;
    index: number;
    setPattern: (pattern: string) => void;
    setActiveTab: (tab: 'tester' | 'patterns' | 'myPatterns') => void;
    visibleDate?: boolean;
    onDelete?: () => void;
}) {
    return (
        <div
            className="card flex flex-col gap-2  border-1 border-base-300 bg-base-100 rounded-sm hover:border-primary/50 transition-all overflow-hidden"
            key={index}>
            <header className="flex items-center justify-between p-2 border-b border-base-300 bg-base-200">
                <div className="flex flex-col  gap-1">
                    <h2 className="text-md text-accent font-semibold">{item.name}</h2>
                    {visibleDate && (
                        <span className="flex items-center gap-1 text-xs text-base-content/60">
                            <Calendar className="size-4" />
                            {FormattedDate(item.updated_at.toLocaleString())}
                        </span>
                    )}
                </div>
                {onDelete && (
                    <button
                        className="btn btn-ghost btn-circle btn-sm tooltip tooltip-left self-start"
                        data-tip="Eliminar"
                        onClick={onDelete}>
                        <TrashIcon className="h-4 w-4 text-zinc-500 hover:text-red-500" />
                    </button>
                )}
            </header>
            <section className="flex flex-col justify-between gap-2 px-3 h-full">
                <p className="text-sm text-base-content/60">{item.description}</p>
                <div className="bg-base-300/60 border border-base-300 p-3 rounded-sm font-mono text-xs overflow-x-auto text-base-content/90 ">
                    {item.pattern}
                </div>
            </section>
            <footer className="grid grid-cols-2 w-full">
                <button
                    className="btn btn-soft btn-md rounded-none font-light border-0 border-r-1 border-neutral/15"
                    onClick={() => {
                        setPattern(item.pattern);
                        setActiveTab('tester');
                    }}>
                    <PlayIcon className="size-4" />
                    Testear
                </button>
                <button
                    className="btn btn-soft btn-md rounded-none font-light border-0"
                    onClick={() => {
                        navigator.clipboard.writeText(item.pattern);
                    }}>
                    <CopyIcon className="size-4" />
                    Copiar
                </button>
            </footer>
        </div>
    );
}
