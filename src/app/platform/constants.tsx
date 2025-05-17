import {
    Home, Code2, Calendar, Lightbulb, BarChart2, MessageSquare,
    Bookmark, Settings, User, Cpu, Zap, Terminal, GitBranch, Database, Layers,
    Sliders, PenTool, Compass, HardDrive, OmegaIcon, SquareTerminalIcon,
    MonitorCogIcon, BoxIcon, LinkIcon, FileCode, FileJsonIcon, RegexIcon,
} from "lucide-react";

export interface IMenuItem {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    color?: string;
    children?: IMenuItem[];
}

export const menuData: IMenuItem[] = [
    {
        label: 'Dashboard',
        href: '/platform',
        icon: Home,
        color: 'text-gray-400',
    },
    {
        label: 'Retos',
        href: '/platform/challenges',
        icon: Code2,
        color: 'text-gray-400',
    },
    {
        label: 'Eventos',
        href: '/platform/events',
        icon: Calendar,
        color: 'text-gray-400',
    },
    {
        label: 'Recursos', // Este es el Recurso simple en el primer ul
        href: '/platform/resources',
        icon: Lightbulb,
        color: 'text-gray-400',
    },
    {
        label: 'Encuestas',
        href: '/platform/surveys',
        icon: BarChart2,
        color: 'text-gray-400',
    },
    {
        label: 'Preguntas',
        href: '/platform/questions',
        icon: MessageSquare,
        color: 'text-gray-400',
    },
    {
        label: 'Playground',
        href: '/platform/playground',
        icon: Layers,
        color: 'text-orange-400', // Color específico para Playground
    },
    {
        label: 'Gestión de Recursos',
        icon: BoxIcon,
        color: 'text-fuchsia-600', // Color para el icono del resumen 
        href: '#',
        children: [
            {
                label: 'Snippets',
                href: '/platform/resources/snippets',
                icon: FileCode,
                color: 'text-fuchsia-300', // Color para los iconos hijos
            },
            {
                label: 'Enlaces',
                href: '/platform/resources/links',
                icon: LinkIcon,
                color: 'text-fuchsia-300', // Color para los iconos hijos
            },
        ],
    },
    {
        label: 'Herramientas de Desarrollo',
        icon: SquareTerminalIcon,
        color: 'text-blue-600', // Color para el icono del resumen
        href: '#',
        children: [
            {
                label: 'Convertidor JSON',
                href: '/platform/tools-dev/json-converter',
                icon: FileJsonIcon,
                color: 'text-blue-300', // Color para los iconos hijos
            },
            {
                label: 'Generador RegEx',
                href: '/platform/tools-dev/regex',
                icon: RegexIcon,
                color: 'text-blue-300', // Color para los iconos hijos
            },
            {
                label: 'Formateador',
                href: '/platform/tools-dev/formatter',
                icon: PenTool,
                color: 'text-blue-300', // Color para los iconos hijos
            },
        ],
    },
    {
        label: 'Herramientas Técnicas',
        icon: MonitorCogIcon,
        color: 'text-lime-600', // Color para el icono del resumen
        href: '#',
        children: [
            {
                label: 'Calculadora Circuitos',
                href: '/platform/tools-tech/circuit-calculator',
                icon: Zap,
                color: 'text-lime-300', // Color para los iconos hijos
            },
            {
                label: 'Convertidor Unidades',
                href: '/platform/tools-tech/unit-converter',
                icon: Sliders,
                color: 'text-lime-300', // Color para los iconos hijos
            },
            {
                label: 'Generador Diagramas',
                href: '/platform/tools-tech/diagram-maker',
                icon: Compass,
                color: 'text-lime-300', // Color para los iconos hijos
            },
            {
                label: 'Simulador Lógico',
                href: '/platform/tools-tech/logic-simulator',
                icon: HardDrive,
                color: 'text-lime-300', // Color para los iconos hijos
            },
            {
                label: 'Calculadora Resistencias',
                href: '/platform/tools-tech/resistor-calculator',
                icon: OmegaIcon,
                color: 'text-lime-300', // Color para los iconos hijos
            },
        ],
    },
    {
        label: 'Mi Cuenta', // Este parece ser una sección, no un enlace simple
        icon: User, // Icono para el resumen
        color: 'text-yellow-600', // Color para el icono del resumen
        href: '#',
        children: [
            {
                label: 'Guardados',
                href: '#', // Placeholder href
                icon: Bookmark,
                color: 'text-yellow-300', // Color para los iconos hijos
            },
            {
                label: 'Configuración',
                href: '#', // Placeholder href
                icon: Settings,
                color: 'text-yellow-300', // Color para los iconos hijos
            },
            {
                label: 'Perfil',
                href: '#', // Placeholder href
                icon: User, // User icon again
                color: 'text-yellow-300', // Color para los iconos hijos
            },
        ],
    },
];