import { Calendar, CopyIcon, PlayIcon, TrashIcon } from 'lucide-react';
import { RegexPattern } from '@prisma/client';
import { FormattedDate } from '@/lib/helpers';
import { useState } from 'react';
import { deleteRegexPatternById } from '@/services/pattern.service';

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
    setActiveTab: (tab: string) => void;
    visibleDate?: boolean;
    onDelete?: () => void;
}) {
    return (
        <div
            className="flex flex-col gap-2  border-1 border-gray-700  bg-neutral/85 rounded-sm shadow-sm shadow-gray-800 hover:border-primary transition-all"
            key={index}>
            <header className="flex items-center justify-between p-2 border-b border-gray-700">
                <div className="flex flex-col  gap-1">
                    <h2 className="text-md text-accent font-semibold">
                        {item.name}
                    </h2>
                    {visibleDate && (
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Calendar className="size-4" />
                            {FormattedDate(item.updated_at.toLocaleString())}
                        </span>
                    )}
                </div>
                {onDelete && (
                    <button
                        className="btn btn-soft btn-xs btn-error rounded-sm font-light self-start"
                        onClick={onDelete}>
                        <TrashIcon className="size-3" />
                    </button>
                )}
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
