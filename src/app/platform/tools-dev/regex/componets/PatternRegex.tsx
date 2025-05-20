import { CopyIcon, PlayIcon } from 'lucide-react';
import { RegexPattern } from '@prisma/client';
import { FormattedDate } from '@/lib/helpers';

export default function PatternRegex({
    item,
    index,
    setPattern,
    setActiveTab,
    visibleDate,
}: {
    item: RegexPattern;
    index: number;
    setPattern: (pattern: string) => void;
    setActiveTab: (tab: string) => void;
    visibleDate?: boolean;
}) {
    return (
        <div
            className="flex flex-col gap-2  border-1 border-gray-700  bg-neutral/85 rounded-sm shadow-sm shadow-gray-800"
            key={index}>
            <header className="flex items-center justify-between p-2">
                <label className="label text-md text-accent">{item.name}</label>
                <span className="text-xs text-gray-400">
                    {visibleDate &&
                        FormattedDate(item.updated_at.toLocaleString())}
                </span>
            </header>
            <section className="flex flex-col justify-between gap-2 px-3 h-full">
                <p className="text-sm text-gray-300">{item.description}</p>
                <div className="bg-base-300 border border-gray-800 p-3 rounded-sm font-mono text-xs overflow-x-auto text-gray-300 ">
                    {item.pattern}
                </div>
            </section>
            <footer className="grid grid-cols-2 w-full">
                <button
                    className="btn btn-soft btn-md rounded-none font-light"
                    onClick={() => {
                        setPattern(item.pattern);
                        setActiveTab('tester');
                    }}>
                    <PlayIcon className="size-4" />
                    Testear
                </button>
                <button
                    className="btn btn-soft btn-md rounded-none font-light"
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
