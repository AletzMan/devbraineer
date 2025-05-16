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
} from "lucide-react"
import { usePathname } from "next/navigation"

export function Sidebar() {
    const path = usePathname()
    return (
        <div className="w-64 p-4 hidden md:block bg-(--color-base-200) h-svh overflow-y-auto">
            <div className="sticky top-4">
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-10 h-10 rounded-md bg-gradient-tech flex items-center justify-center animate-pulse-glow">
                        <Code2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-tech">DevConnect</span>
                </div>
                <nav className="space-y-1">
                    <Link href="#"
                        className={`btn btn-wide btn-ghost btn-primary flex justify-start ${path === "/dashboard" ? "btn-active" : ""}`}>
                        <Home className="w-5 h-5 text-tech-blue" />
                        Dashboard
                    </Link>
                    <Link
                        href="#"
                        className="btn btn-wide btn-ghost btn-primary flex justify-start">
                        <Code2 className="w-5 h-5 text-tech-purple" />
                        Retos
                    </Link>
                    <Link
                        href="#"
                        className="btn btn-wide btn-ghost btn-primary flex justify-start">
                        <Calendar className="w-5 h-5 text-tech-pink" />
                        Eventos
                    </Link>
                    <Link
                        href="#"
                        className="btn btn-wide btn-ghost btn-primary flex justify-start">
                        <Lightbulb className="w-5 h-5 text-tech-green" />
                        Recursos
                    </Link>
                    <Link
                        href="#"
                        className="btn btn-wide btn-ghost btn-primary flex justify-start">
                        <BarChart2 className="w-5 h-5 text-tech-blue" />
                        Encuestas
                    </Link>
                    <Link
                        href="#"
                        className="btn btn-wide btn-ghost btn-primary flex justify-start">
                        <MessageSquare className="w-5 h-5 text-tech-cyan" />
                        Preguntas
                    </Link>
                </nav>
                <div className="divider"><Terminal className="w-4 h-4" />Herramientas Dev</div>
                <div className="">
                    <nav className="space-y-1 mb-8">
                        <Link
                            href="/tools/snippets"
                            className="btn btn-wide btn-ghost btn-primary flex justify-start">
                            <Code2 className="w-5 h-5 text-tech-blue" />
                            Snippets
                        </Link>
                        <Link
                            href="/tools/json-converter"
                            className="btn btn-wide btn-ghost btn-primary flex justify-start">
                            <Database className="w-5 h-5 text-tech-cyan" />
                            Convertidor JSON
                        </Link>
                        <Link
                            href="/tools/regex"
                            className="btn btn-wide btn-ghost btn-primary flex justify-start">
                            <GitBranch className="w-5 h-5 text-tech-purple" />
                            Generador RegEx
                        </Link>
                        <Link
                            href="/tools/formatter"
                            className="btn btn-wide btn-ghost btn-primary flex justify-start">
                            <PenTool className="w-5 h-5 text-tech-pink" />
                            Formateador
                        </Link>
                        <Link
                            href="/tools/playground"
                            className="btn btn-wide btn-ghost btn-primary flex justify-start">
                            <Layers className="w-5 h-5 text-tech-green" />
                            Playground
                        </Link>
                    </nav>

                    <div className="mb-2 px-3">
                        <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Cpu className="w-4 h-4" />
                            Herramientas Técnicas
                        </h3>
                    </div>
                    <nav className="space-y-1 mb-8">
                        <Link
                            href="/tools/circuit-calculator"
                            className="btn btn-wide btn-ghost btn-primary flex justify-start">
                            <Zap className="w-5 h-5 text-tech-blue" />
                            Calculadora Circuitos
                        </Link>
                        <Link
                            href="/tools/unit-converter"
                            className="btn btn-wide btn-ghost btn-primary flex justify-start">
                            <Sliders className="w-5 h-5 text-tech-cyan" />
                            Convertidor Unidades
                        </Link>
                        <Link
                            href="/tools/diagram-maker"
                            className="btn btn-wide btn-ghost btn-primary flex justify-start">
                            <Compass className="w-5 h-5 text-tech-purple" />
                            Generador Diagramas
                        </Link>
                        <Link
                            href="/tools/logic-simulator"
                            className="btn btn-wide btn-ghost btn-primary flex justify-start">
                            <HardDrive className="w-5 h-5 text-tech-pink" />
                            Simulador Lógico
                        </Link>
                        <Link
                            href="/tools/resistor-calculator"
                            className="btn btn-wide btn-ghost btn-primary flex justify-start">
                            <OmegaIcon className="w-5 h-5 text-tech-green" />
                            Calculadora Resistencias
                        </Link>
                    </nav>

                    <div className="mb-2 px-3">
                        <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Mi cuenta
                        </h3>
                    </div>
                    <nav className="space-y-1">
                        <Link
                            href="#"
                            className="btn btn-wide btn-ghost btn-primary flex justify-start">
                            <Bookmark className="w-5 h-5 text-tech-blue" />
                            Guardados
                        </Link>
                        <Link
                            href="#"
                            className="btn btn-wide btn-ghost btn-primary flex justify-start">
                            <Settings className="w-5 h-5 text-tech-cyan" />
                            Configuración
                        </Link>
                        <Link
                            href="#"
                            className="btn btn-wide btn-ghost btn-primary flex justify-start">
                            <User className="w-5 h-5 text-tech-purple" />
                            Perfil
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    )
}
