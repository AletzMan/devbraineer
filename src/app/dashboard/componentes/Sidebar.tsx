"use client"
import Link from "next/link"
import {
    Home,
    Code2,
    Calendar,
    Lightbulb,
    BarChart2,
    MessageSquare,
    Bookmark,
    Settings,
    User,
    Cpu,
    Zap,
    Terminal,
    GitBranch,
    Database,
    Layers,
    Sliders,
    PenTool,
    Compass,
    HardDrive,
    OmegaIcon,
    SquareTerminalIcon,
    MonitorCogIcon,
    BoxIcon,
    LinkIcon,
    FileCode,
    FileJsonIcon,
    RegexIcon,
} from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"

export function Sidebar() {
    const path = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState('resources')
    return (
        <div className="w-64  hidden md:block bg-(--color-base-200) h-svh overflow-y-auto">
            <div className="sticky top-4">
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-10 h-10 rounded-md bg-gradient-tech flex items-center justify-center animate-pulse-glow">
                        <Code2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-tech">DevConnect</span>
                </div>
                <ul className="menu bg-base-200 rounded-box w-64 gap-1">
                    <li>
                        <Link href="#"
                            className={` ${path === "/dashboard" ? "menu-active" : ""}`}>
                            <Home className="w-5 h-5 text-tech-blue" />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className={path === "/dashboard/challenges" ? "menu-active" : ""}>
                            <Code2 className="w-5 h-5 text-tech-purple" />
                            Retos
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className={path === "/dashboard/events" ? "menu-active" : ""}>
                            <Calendar className="w-5 h-5 text-tech-pink" />
                            Eventos
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className={path === "/dashboard/resources" ? "menu-active" : ""}>
                            <Lightbulb className="w-5 h-5 text-tech-green" />
                            Recursos
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className={path === "/dashboard/surveys" ? "menu-active" : ""}>
                            <BarChart2 className="w-5 h-5 text-tech-blue" />
                            Encuestas
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className={path === "/dashboard/questions" ? "menu-active" : ""}>
                            <MessageSquare className="w-5 h-5 text-tech-cyan" />
                            Preguntas
                        </Link>
                    </li>
                </ul>
                <div className="divider"></div>
                <ul className="menu bg-base-200 rounded-box w-64">
                    <li>
                        <Link
                            href="/playground"
                            className={path === "/playground" ? "menu-active" : ""}>
                            <Layers className="w-5 h-5 text-orange-400" />
                            Playground
                        </Link>
                    </li>
                </ul>

                <ul className="menu bg-base-200 rounded-box w-64">
                    <li>
                        <details open={isMenuOpen === 'resources'} onClick={(e) => setIsMenuOpen(e.currentTarget.open ? 'resources' : '')}>
                            <summary> <BoxIcon className="w-5 h-5 text-fuchsia-600" /> Gestión de Recursos</summary> {/* Elige un icono apropiado */}
                            <ul>
                                <li>
                                    <Link
                                        href="/resources/snippets"
                                        className={path === "/resources/snippets" ? "menu-active" : ""}>
                                        <FileCode className="w-5 h-5 text-fuchsia-300" />
                                        Snippets
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/resources/links"
                                        className={path === "/resources/links" ? "menu-active" : ""}>
                                        <LinkIcon className="w-5 h-5 text-fuchsia-300" />
                                        Enlaces
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul >
                <ul className="menu bg-base-200 rounded-box w-64">
                    <li>
                        <details open={isMenuOpen === 'tools-dev'} onClick={(e) => setIsMenuOpen(e.currentTarget.open ? 'tools-dev' : '')}>
                            <summary> <SquareTerminalIcon className="w-5 h-5 text-blue-600" /> Herramientas de Desarrollo</summary>
                            <ul>

                                <li>
                                    <Link
                                        href="/tools-dev/json-converter"
                                        className={path === "/tools-dev/json-converter" ? "menu-active" : ""}>
                                        <FileJsonIcon className="w-5 h-5 text-blue-300" />
                                        Convertidor JSON
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/tools-dev/regex"
                                        className={path === "/tools-dev/regex" ? "menu-active" : ""}>
                                        <RegexIcon className="w-5 h-5 text-blue-300" />
                                        Generador RegEx
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/tools-dev/formatter"
                                        className={path === "/tools-dev/formatter" ? "menu-active" : ""}>
                                        <PenTool className="w-5 h-5 text-blue-300" />
                                        Formateador
                                    </Link>
                                </li>

                            </ul>
                        </details>
                    </li>
                </ul>
                <ul className="menu bg-base-200 rounded-box w-64">
                    <li>
                        <details open={isMenuOpen === 'tools-tech'} onClick={(e) => setIsMenuOpen(e.currentTarget.open ? 'tools-tech' : '')}>
                            <summary> <MonitorCogIcon className="w-5 h-5 text-lime-600" /> Herramientas Técnicas</summary>
                            <ul>
                                <li>
                                    <Link
                                        href="/tools-tech/circuit-calculator"
                                        className={path === "/tools-tech/circuit-calculator" ? "menu-active" : ""}>
                                        <Zap className="w-5 h-5 text-lime-300" />
                                        Calculadora Circuitos
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/tools-tech/unit-converter"
                                        className={path === "/tools-tech/unit-converter" ? "menu-active" : ""}>
                                        <Sliders className="w-5 h-5 text-lime-300" />
                                        Convertidor Unidades
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/tools-tech/diagram-maker"
                                        className={path === "/tools-tech/diagram-maker" ? "menu-active" : ""}>
                                        <Compass className="w-5 h-5 text-lime-300" />
                                        Generador Diagramas
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/tools-tech/logic-simulator"
                                        className={path === "/tools-tech/logic-simulator" ? "menu-active" : ""}>
                                        <HardDrive className="w-5 h-5 text-lime-300" />
                                        Simulador Lógico
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/tools-tech/resistor-calculator"
                                        className={path === "/tools-tech/resistor-calculator" ? "menu-active" : ""}>
                                        <OmegaIcon className="w-5 h-5 text-lime-300" />
                                        Calculadora Resistencias
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
                <ul className="menu bg-base-200 rounded-box w-64">
                    <li>
                        <details open={isMenuOpen === 'user'} onClick={(e) => setIsMenuOpen(e.currentTarget.open ? 'user' : '')}     >
                            <summary><User className="w-5 h-5 text-yellow-600" /> Mi Cuenta</summary>
                            <ul>
                                <li>
                                    <Link href="#" className={path === "/dashboard/saved" ? "menu-active" : ""}>
                                        <Bookmark className="w-5 h-5 text-yellow-300" />
                                        Guardados
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className={path === "/dashboard/settings" ? "menu-active" : ""}>
                                        <Settings className="w-5 h-5 text-yellow-300" />
                                        Configuración
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className={path === "/dashboard/profile" ? "menu-active" : ""}>
                                        <User className="w-5 h-5 text-yellow-300" />
                                        Perfil
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div >
        </div >
    )
}
