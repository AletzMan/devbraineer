import { AlertCircle } from 'lucide-react';
import { menuData } from '../constants';
import { SiteFooter } from './SiteFooter';

interface LayoutSectionProps {
    title: string;
}

export default function LayoutControlPanel({ title }: LayoutSectionProps) {
    const data = menuData.filter((item) => item.label !== title && item.href !== '#');
    const infoSection = menuData.find((item) => item.label === title);
    const Icon = infoSection?.icon;
    const description = infoSection?.description;

    return (
        <div className="max-(--max-width) mx-auto p-4 flex flex-col h-[calc(100vh-5rem)] overflow-y-auto scrollbar-thin">
            <header className="bg-base-200 p-6 rounded-md mb-10">
                <h1 className="text-3xl font-semibold mb-5 flex items-center gap-3 text-gray-600">
                    {Icon && <Icon className="w-7 h-7 text-gray-600" />}
                    {title}
                </h1>
                <p className="text-sm text-gray-500">{description}</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow auto-rows-fr">
                {data.map(({ label, description, href, icon: Icon, color, children }) => (
                    <div
                        key={label}
                        className="bg-base-200 h-full flex flex-col relative rounded-md border border-base-300 shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
                        <Icon
                            className="absolute bottom-4 right-4 size-18 opacity-6 pointer-events-none select-none text-gray-300"
                            aria-hidden="true"
                        />
                        <a
                            href={href}
                            className={`flex items-center gap-4 mb-2 group ${color} hover:brightness-90 transition duration-300`}>
                            <Icon className={`${color} w-6 h-6 flex-shrink-0`} />
                            <h2 className={`text-xl font-semibold ${color} group-hover:underline`}>{label}</h2>
                        </a>

                        {description && <p className="text-sm text-gray-500 mb-4">{description}</p>}

                        {children && (
                            <ul className="space-y-2">
                                {children.map(({ label: subLabel, href: subHref, icon: SubIcon, color: subColor }) => (
                                    <li key={subLabel}>
                                        <a
                                            href={subHref}
                                            className="flex items-center text-gray-500 hover:text-current hover:text-opacity-90 transition duration-300">
                                            <SubIcon className={`${subColor} w-4 h-4 mr-2 flex-shrink-0`} />
                                            {subLabel}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}

                {/* Último recuadro de aviso */}
                <div className="bg-base-200 rounded-md border border-base-300 shadow-sm p-6 flex flex-col justify-center items-center text-center text-gray-600">
                    <AlertCircle className="w-10 h-10 mb-4 text-gray-400" />
                    <h2 className="text-lg font-semibold mb-2">Próximamente</h2>
                    <p className="text-sm max-w-xs">
                        Estamos trabajando en nuevas funcionalidades y secciones que pronto estarán disponibles.
                        ¡Mantente atento!
                    </p>
                </div>
            </div>
            <SiteFooter />
        </div>
    );
}
