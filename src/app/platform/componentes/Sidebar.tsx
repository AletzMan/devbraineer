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
    console.log(isMenuOpen)
    return (
        <div className="w-67  hidden md:block bg-(--color-base-100) h-svh overflow-y-auto overflow-x-hidden border-r-1 border-(--color-gray-700) scrollbar-thin">
            <div className="sticky top-4">
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-10 h-10 rounded-md flex items-center justify-center animate-pulse-glow">
                        <Code2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold text-xl bg-clip-text text-transparent">DevBraineer</span>
                </div>
                <ul className="menu rounded-box w-66 gap-1">
                    <li>
                        <Link href="#"
                            className={` ${path === "/dashboard" ? "menu-active" : "text-gray-400"}`}>
                            <Home className="w-5 h-5 text-tech-blue" />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className={path === "/dashboard/challenges" ? "menu-active" : "text-gray-400"}>
                            <Code2 className="w-5 h-5 text-tech-purple" />
                            Retos
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className={path === "/dashboard/events" ? "menu-active" : "text-gray-400"}>
                            <Calendar className="w-5 h-5 text-tech-pink" />
                            Eventos
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className={path === "/dashboard/resources" ? "menu-active" : "text-gray-400"}>
                            <Lightbulb className="w-5 h-5 text-tech-green" />
                            Recursos
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className={path === "/dashboard/surveys" ? "menu-active" : "text-gray-400"}>
                            <BarChart2 className="w-5 h-5 text-tech-blue" />
                            Encuestas
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className={path === "/dashboard/questions" ? "menu-active" : "text-gray-400"}>
                            <MessageSquare className="w-5 h-5 text-tech-cyan" />
                            Preguntas
                        </Link>
                    </li>
                </ul>
                <div className="divider"></div>
                <ul className="menu rounded-box w-66">
                    <li>
                        <Link
                            href="/playground"
                            className="text-gray-300" >
                            <Layers className="w-5 h-5 text-orange-400" />
                            Playground
                        </Link>
                    </li>
                </ul>

                <ul className="menu rounded-box w-66">
                    <li>
                        <details open={isMenuOpen === 'resources'} onFocus={(e) => setIsMenuOpen(e.currentTarget.open ? 'resources' : '')} name="sidebar">
                            <summary> <BoxIcon className="w-5 h-5 text-fuchsia-600" /><span className="text-gray-300" > Gestión de Recursos</span></summary> {/* Elige un icono apropiado */}
                            <ul>
                                <li>
                                    <Link
                                        href="/resources/snippets"
                                        className={path === "/resources/snippets" ? "menu-active" : "text-gray-400"}>
                                        <FileCode className="w-5 h-5 text-fuchsia-300" />
                                        Snippets
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/resources/links"
                                        className={path === "/resources/links" ? "menu-active" : "text-gray-400"}>
                                        <LinkIcon className="w-5 h-5 text-fuchsia-300" />
                                        Enlaces
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul >
                <ul className="menu  rounded-box w-66">
                    <li>
                        <details open={isMenuOpen === 'tools-dev'} onClick={(e) => setIsMenuOpen(e.currentTarget.open ? 'tools-dev' : '')} name="sidebar">
                            <summary> <SquareTerminalIcon className="w-5 h-5 text-blue-600" /> <span className="text-gray-300" >Herramientas de Desarrollo</span></summary>
                            <ul>

                                <li>
                                    <Link
                                        href="/tools-dev/json-converter"
                                        className={path === "/tools-dev/json-converter" ? "menu-active" : "text-gray-400"}>
                                        <FileJsonIcon className="w-5 h-5 text-blue-300" />
                                        Convertidor JSON
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/tools-dev/regex"
                                        className={path === "/tools-dev/regex" ? "menu-active" : "text-gray-400"}>
                                        <RegexIcon className="w-5 h-5 text-blue-300" />
                                        Generador RegEx
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/tools-dev/formatter"
                                        className={path === "/tools-dev/formatter" ? "menu-active" : "text-gray-400"}>
                                        <PenTool className="w-5 h-5 text-blue-300" />
                                        Formateador
                                    </Link>
                                </li>

                            </ul>
                        </details>
                    </li>
                </ul>
                <ul className="menu rounded-box w-66">
                    <li>
                        <details open={isMenuOpen === 'tools-tech'} onClick={(e) => setIsMenuOpen(e.currentTarget.open ? 'tools-tech' : '')} name="sidebar">
                            <summary> <MonitorCogIcon className="w-5 h-5 text-lime-600" /> <span className="text-gray-300">Herramientas Técnicas</span></summary>
                            <ul>
                                <li>
                                    <Link
                                        href="/tools-tech/circuit-calculator"
                                        className={path === "/tools-tech/circuit-calculator" ? "menu-active" : "text-gray-400"}>
                                        <Zap className="w-5 h-5 text-lime-300" />
                                        Calculadora Circuitos
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/tools-tech/unit-converter"
                                        className={path === "/tools-tech/unit-converter" ? "menu-active" : "text-gray-400"}>
                                        <Sliders className="w-5 h-5 text-lime-300" />
                                        Convertidor Unidades
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/tools-tech/diagram-maker"
                                        className={path === "/tools-tech/diagram-maker" ? "menu-active" : "text-gray-400"}>
                                        <Compass className="w-5 h-5 text-lime-300" />
                                        Generador Diagramas
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/tools-tech/logic-simulator"
                                        className={path === "/tools-tech/logic-simulator" ? "menu-active" : "text-gray-400"}>
                                        <HardDrive className="w-5 h-5 text-lime-300" />
                                        Simulador Lógico
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/tools-tech/resistor-calculator"
                                        className={path === "/tools-tech/resistor-calculator" ? "menu-active" : "text-gray-400"}>
                                        <OmegaIcon className="w-5 h-5 text-lime-300" />
                                        Calculadora Resistencias
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
                <ul className="menu rounded-box w-66">
                    <li>
                        <details open={isMenuOpen === 'user'} onClick={(e) => setIsMenuOpen(e.currentTarget.open ? 'user' : '')} name="sidebar">
                            <summary><User className="w-5 h-5 text-yellow-600" /> <span className="text-gray-300">Mi Cuenta</span></summary>
                            <ul>
                                <li>
                                    <Link href="#" className={path === "/dashboard/saved" ? "menu-active" : "text-gray-400"}>
                                        <Bookmark className="w-5 h-5 text-yellow-300" />
                                        <span className="text-gray-300">Guardados</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className={path === "/dashboard/settings" ? "menu-active" : "text-gray-400"}>
                                        <Settings className="w-5 h-5 text-yellow-300" />
                                        <span className="text-gray-300">Configuración</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className={path === "/dashboard/profile" ? "menu-active" : "text-gray-400"}>
                                        <User className="w-5 h-5 text-yellow-300" />
                                        <span className="text-gray-300">Perfil</span>
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
