import {
    LayoutDashboard,
    Layers,
    BoxIcon,
    SquareTerminalIcon,
    MonitorCogIcon,
    Globe,
    SquareTerminalIcon as SquareTerminalIconChild,
    FileCode,
    Link as LinkIcon,
    FileJsonIcon,
    RegexIcon,
    Zap,
    Sliders,
    OmegaIcon,
    AlertCircle,
} from 'lucide-react';
import { SiteFooter } from './componentes/SiteFooter';

const menuData = [
    {
        label: 'Playground',
        description: 'Experimenta en tiempo real con código web y de consola.',
        href: '/platform/playground',
        icon: Layers,
        color: 'text-orange-400',
        children: [
            {
                label: 'Editor Web',
                href: '/platform/playground/editor-web',
                icon: Globe,
                color: 'text-orange-600',
            },
            {
                label: 'Ejecutor de Código',
                href: '/platform/playground/editor-console',
                icon: SquareTerminalIconChild,
                color: 'text-orange-600',
            },
            {
                label: 'HTTP Client',
                href: '/platform/playground/http-client',
                icon: SquareTerminalIconChild,
                color: 'text-orange-600',
            },
        ],
    },
    {
        label: 'Gestión de Recursos',
        description: 'Accede y administra tus snippets y enlaces útiles.',
        href: '/platform/resources',
        icon: BoxIcon,
        color: 'text-secondary',
        children: [
            {
                label: 'Snippets de Código',
                href: '/platform/resources/snippets',
                icon: FileCode,
                color: 'text-secondary/65',
            },
            {
                label: 'Enlaces de Interés',
                href: '/platform/resources/links',
                icon: LinkIcon,
                color: 'text-secondary/65',
            },
        ],
    },
    {
        label: 'Herramientas de Desarrollo',
        description:
            'Utilidades para convertir datos, generar expresiones regulares y más.',
        href: '/platform/tools-dev',
        icon: SquareTerminalIcon,
        color: 'text-accent',
        children: [
            {
                label: 'Convertidor de Datos',
                href: '/platform/tools-dev/converter',
                icon: FileJsonIcon,
                color: 'text-accent/65',
            },
            {
                label: 'Generador de RegEx',
                href: '/platform/tools-dev/regex',
                icon: RegexIcon,
                color: 'text-accent/65',
            },
        ],
    },
    {
        label: 'Herramientas Técnicas',
        description: 'Calculadoras especializadas para electrónica y ciencia.',
        href: '/platform/tools-tech',
        icon: MonitorCogIcon,
        color: 'text-info',
        children: [
            {
                label: 'Calculadora de Circuitos',
                href: '/platform/tools-tech/circuit-calculator',
                icon: Zap,
                color: 'text-info/65',
            },
            {
                label: 'Convertidor de Unidades',
                href: '/platform/tools-tech/unit-converter',
                icon: Sliders,
                color: 'text-info/65',
            },
            {
                label: 'Calculadora de Resistencias',
                href: '/platform/tools-tech/resistor-calculator',
                icon: OmegaIcon,
                color: 'text-info/65',
            },
        ],
    },
    /* {
        label: 'Mi Cuenta',
        description:
            'Consulta tu perfil, configuraciones y elementos guardados.',
        href: '/platform/account',
        icon: User,
        color: 'text-yellow-600',
        children: [
            {
                label: 'Guardados',
                href: '/platform/account/saved',
                icon: Bookmark,
                color: 'text-yellow-300',
            },
            {
                label: 'Perfil',
                href: '/profile',
                icon: User,
                color: 'text-yellow-300',
            },
        ],
    },*/
];

export default function PlatformHome() {
    return (
        <div className="max-(--max-width) mx-auto px-6 py-10 flex flex-col h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin">
            <h1 className="text-3xl font-semibold mb-10 flex items-center gap-3 text-gray-600">
                <LayoutDashboard className="w-7 h-7 text-gray-600" />
                Plataforma Central
            </h1>

            <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(350px,1fr))]  flex-grow">
                {menuData.map(
                    ({
                        label,
                        description,
                        href,
                        icon: Icon,
                        color,
                        children,
                    }) => (
                        <div
                            key={label}
                            className="bg-base-200 relative rounded-md border border-base-300 shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
                            <Icon
                                className="absolute bottom-4 right-4 size-18 opacity-6 pointer-events-none select-none text-gray-300"
                                aria-hidden="true"
                            />
                            <a
                                href={href}
                                className={`flex items-center gap-4 mb-2 group ${color} hover:brightness-90 transition duration-300`}>
                                <Icon
                                    className={`${color} w-6 h-6 flex-shrink-0`}
                                />
                                <h2
                                    className={`text-xl font-semibold ${color} group-hover:underline`}>
                                    {label}
                                </h2>
                            </a>

                            {description && (
                                <p className="text-sm text-gray-500 mb-4">
                                    {description}
                                </p>
                            )}

                            {children && (
                                <ul className="space-y-2">
                                    {children.map(
                                        ({
                                            label: subLabel,
                                            href: subHref,
                                            icon: SubIcon,
                                            color: subColor,
                                        }) => (
                                            <li key={subLabel}>
                                                <a
                                                    href={subHref}
                                                    className="flex items-center text-gray-500 hover:text-current hover:text-opacity-90 transition duration-300">
                                                    <SubIcon
                                                        className={`${subColor} w-4 h-4 mr-2 flex-shrink-0`}
                                                    />
                                                    {subLabel}
                                                </a>
                                            </li>
                                        )
                                    )}
                                </ul>
                            )}
                        </div>
                    )
                )}

                {/* Último recuadro de aviso */}
                <div className="bg-base-200 rounded-md border border-base-300 shadow-sm p-6 flex flex-col justify-center items-center text-center text-gray-600">
                    <AlertCircle className="w-10 h-10 mb-4 text-gray-400" />
                    <h2 className="text-lg font-semibold mb-2">Próximamente</h2>
                    <p className="text-sm max-w-xs">
                        Estamos trabajando en nuevas funcionalidades y secciones
                        que pronto estarán disponibles. ¡Mantente atento!
                    </p>
                </div>
            </div>

            <SiteFooter />
        </div>
    );
}
