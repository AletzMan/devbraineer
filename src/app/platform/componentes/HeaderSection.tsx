'use client';
import { menuData } from '../constants';
import { Folder } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface HeaderSectionProps {
    title: string;
    description: string;
    children?: React.ReactNode;
}

export default function HeaderSection({ title, description, children }: HeaderSectionProps) {
    const currentSection = menuData.find((item) =>
        item.children?.some((child) => usePathname().startsWith(child.href))
    );

    const colorTitle = currentSection?.children?.[0]?.color || 'text-gray-500';
    const isResourcesSection = currentSection?.label === 'Recursos';

    return (
        <header className="flex justify-between gap-4 md:flex-row flex-col md:items-center bg-base-100 px-4 py-3 border-b-1 border-gray-700">
            <div className="flex flex-col">
                {isResourcesSection && <Folder className={`w-5 h-5 ${colorTitle} mb-1`} />}
                <h1 className={`text-xl font-semibold ${colorTitle}`}>{title}</h1>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            <div className="flex items-center gap-2">{children}</div>
        </header>
    );
}
