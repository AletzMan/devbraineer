import { menuData } from '../constants';

interface HeaderSectionProps {
    title: string;
    description: string;
    children?: React.ReactNode;
}

export default function HeaderSection({
    title,
    description,
    children,
}: HeaderSectionProps) {
    const colorTitle = menuData.find((item) =>
        item.children?.find((child) => child.label === title)
    )?.color;
    return (
        <header className="flex justify-between gap-4 md:flex-row flex-col md:items-center bg-white/3 px-3 py-2 border-b-1 border-gray-700">
            <div className="flex flex-col">
                <h1 className={`text-2xl font-bold ${colorTitle}`}>{title}</h1>
                <p className="text-zinc-500 dark:text-zinc-400">
                    {description}
                </p>
            </div>
            {children}
        </header>
    );
}
