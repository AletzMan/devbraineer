import { BoxIcon, FileCode, Link as LinkIcon, AlertCircle, FileText } from 'lucide-react';
import { SiteFooter } from '../componentes/SiteFooter';

export const menuData = [
    {
        label: 'Snippets de Código',
        description: 'Fragmentos reutilizables para acelerar tu desarrollo.',
        href: '/platform/resources/snippets',
        icon: FileCode,
        color: 'text-secondary/65',
    },
    {
        label: 'Enlaces de Interés',
        description: 'Recopilación de recursos web útiles y actualizados.',
        href: '/platform/resources/links',
        icon: LinkIcon,
        color: 'text-secondary/65',
    },
    {
        label: 'Notas',
        description: 'Gestiona tus notas y recordatorios de manera eficiente.',
        href: '/platform/resources/notes',
        icon: FileText,
        color: 'text-secondary/65',
    },
];

export default function ResourcesHome() {
    return (
        <div className="max-w-(--max-width) mx-auto px-6 py-10 flex flex-col h-[calc(100svh-4rem)] flex-grow overflow-y-auto scrollbar-thin">
            <h1 className={`text-3xl font-semibold mb-10 flex items-center gap-3 ${menuData[0].color}`}>
                <BoxIcon className={`w-7 h-7  ${menuData[0].color}`} />
                Gestión de Recursos
            </h1>

            <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(340px,1fr))] flex-grow">
                {menuData.map(({ label, description, href, icon: Icon, color }) => (
                    <div
                        key={label}
                        className="bg-base-200 relative rounded-md border max-h-[250px] border-base-300 shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
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

                        {description && <p className="text-sm text-gray-500">{description}</p>}
                    </div>
                ))}

                {/* Último recuadro de aviso */}
                <div className="bg-base-200 rounded-md border border-base-300 shadow-sm p-6 flex max-h-[250px] flex-col justify-center items-center text-center text-gray-600">
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
