'use client';
import Link from 'next/link';
import {
    Code2,
    Zap,
    Sliders,
    Wifi,
    HardDrive,
    Terminal,
    Database,
    Layers,
    PenTool,
    ArrowRight,
    Github,
    Linkedin,
    LogIn,
    LayoutDashboard,
    Regex,
    RegexIcon,
} from 'lucide-react';
import { Logo, NameLogo } from './components/Logo';
import styles from './home.module.css';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@clerk/nextjs';
import { CardTool } from './components/CardTool';

export default function Home() {
    const [showHeader, setShowHeader] = useState(false);
    const heroSectionRef = useRef<HTMLDivElement>(null);
    const { userId } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            if (heroSectionRef.current) {
                const heroBottom = heroSectionRef.current.getBoundingClientRect().bottom;
                setShowHeader(window.scrollY > heroBottom);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#0d1220] to-zinc-950 text-neutral-content antialiased">
            <header
                className={`flex items-center justify-center navbar fixed top-0 left-0 right-0 z-50 bg-neutral-950/60 backdrop-blur-lg shadow-xl border-b border-neutral-800/50 transition-transform duration-500 ease-in-out ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="flex items-center justify-center container mx-auto px-4">
                    <div className="navbar-start">
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <Logo className={`size-9 md:size-10 text-primary group-hover:${styles.spinSlow}`} />
                            <NameLogo className="w-25  md:w-30   text-warning stroke-2 group-hover:${styles.spinSlow}" />
                        </Link>
                    </div>
                    <div className="navbar-end">
                        {userId ? (
                            <Link href="/platform" className="btn btn-outline btn-primary btn-sm md:btn-md group">
                                <LayoutDashboard className="w-5 h-5 mr-0 md:mr-2 transition-transform duration-300 group-hover:translate-x-0.5" />
                                <span className="hidden md:inline">Panel</span>
                            </Link>
                        ) : (
                            <Link href="/sign-in" className="btn btn-outline btn-primary btn-sm md:btn-md group">
                                <LogIn className="w-5 h-5 mr-0 md:mr-2 transition-transform duration-300 group-hover:translate-x-0.5" />
                                <span className="hidden md:inline">Iniciar Sesión</span>
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            <main className="">
                <div ref={heroSectionRef} className="hero min-h-svh relative">
                    <div className="hero-overlay bg-gradient-radial from-neutral-950/50 via-[#1a2035]/60 to-transparent opacity-90"></div>
                    <div className="hero-overlay bg-black/40"></div>
                    <div className="hero-content text-center pb-10 pt-5 md:py-20 lg:py-32 relative z-10">
                        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
                            <div className="flex flex-col items-center justify-center  mb-25">
                                <Logo className="size-24 md:size-30 text-primary group-hover:${styles.spinSlow}" />
                                <NameLogo className="w-70  md:w-130   text-warning stroke-2 group-hover:${styles.spinSlow}" />
                            </div>

                            <h2 className="mb-8 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-xl">
                                Herramientas esenciales para
                                <span
                                    className={`text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-secondary ${styles.animatedTextGradient}`}>
                                    {' desarrolladores '}
                                </span>
                                e ingenieros
                            </h2>

                            <p className="mb-10 text-md md:text-xl lg:text-2xl text-neutral-200 max-w-3xl mx-auto drop-shadow-md">
                                Una colección de herramientas gratuitas y de código abierto diseñadas para hacer tu
                                flujo de trabajo de desarrollo más eficiente y productivo.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <Link
                                    href="/platform"
                                    passHref
                                    className="btn btn-primary btn-lg rounded-full shadow-lg hover:shadow-primary/40 hover:scale-105 transform-gpu transition-all duration-300 ease-in-out group"
                                    role="button">
                                    <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                    Comienza ahora
                                </Link>
                                <a
                                    href="https://github.com/AletzMan/devbraineer"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline btn-neutral text-neutral-300 hover:text-white btn-lg rounded-full shadow-lg hover:bg-neutral-800/70 hover:border-neutral-600 hover:scale-105 transform-gpu transition-all duration-300 ease-in-out group">
                                    Ver en GitHub
                                    <Github className="w-5 h-5 ml-2 text-neutral-400 transition-colors duration-300 group-hover:text-white" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="py-20 md:py-32 bg-gradient-to-b from-slate-950 via-[#111827] to-[#0c1322]">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <h2 className="text-4xl font-bold text-white mb-4">Herramientas para cada necesidad</h2>
                            <p className="text-xl text-neutral-300">
                                Desde desarrollo web hasta ingeniería electrónica, tenemos herramientas para todos los
                                aspectos del desarrollo.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {DataCards.map((card) => (
                                <CardTool key={card.title} card={card} />
                            ))}
                        </div>
                    </div>
                </section>
                <section className="py-20 md:py-32 bg-gradient-to-b from-[#0c1322] via-[#0A0F1A] to-black">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <h2 className="text-4xl font-bold text-white mb-4">Herramientas populares</h2>
                            <p className="text-xl text-neutral-300">
                                Descubre las herramientas más utilizadas por nuestra comunidad.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Link href="/platform/playground" passHref className="group">
                                <div className="card bg-neutral-900/50 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out h-full border border-neutral-700/60 group-hover:border-blue-600/70 transform hover:scale-105">
                                    <div className="card-body">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="p-3 bg-gradient-to-br from-blue-700 to-cyan-600 rounded-full shadow-md">
                                                <Layers className="w-6 h-6 text-white" />
                                            </div>
                                            <h3 className="card-title text-xl font-semibold text-white">
                                                Playground de Código
                                            </h3>
                                        </div>
                                        <p className="text-neutral-400 flex-grow text-sm">
                                            Experimenta con HTML, CSS y JavaScript en tiempo real.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                            <Link href="/platform/tools-tech/circuit-calculator" passHref className="group">
                                <div className="card bg-neutral-900/50 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out h-full border border-neutral-700/60 group-hover:border-teal-600/70 transform hover:scale-105">
                                    <div className="card-body">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="p-3 bg-gradient-to-br from-teal-700 to-cyan-600 rounded-full shadow-md">
                                                <Zap className="w-6 h-6 text-white" />
                                            </div>
                                            <h3 className="card-title text-xl font-semibold text-white">
                                                Calculadora de Circuitos
                                            </h3>
                                        </div>
                                        <p className="text-neutral-400 flex-grow text-sm">
                                            Calcula valores de resistencia, voltaje y corriente.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                            <Link href="/platform/tools-dev/converter" passHref className="group">
                                <div className="card bg-neutral-900/50 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out h-full border border-neutral-700/60 group-hover:border-purple-600/70 transform hover:scale-105">
                                    <div className="card-body">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="p-3 bg-gradient-to-br from-purple-700 to-pink-600 rounded-full shadow-md">
                                                <Database className="w-6 h-6 text-white" />
                                            </div>
                                            <h3 className="card-title text-xl font-semibold text-white">
                                                Convertidor JSON
                                            </h3>
                                        </div>
                                        <p className="text-neutral-400 flex-grow text-sm">
                                            Convierte JSON a objetos JS y viceversa con facilidad.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                            <Link href="/platform/tools-dev/regex" passHref className="group">
                                <div className="card bg-neutral-900/50 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out h-full border border-neutral-700/60 group-hover:border-blue-600/70 transform hover:scale-105">
                                    <div className="card-body">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="p-3 bg-gradient-to-br from-blue-700 to-cyan-600 rounded-full shadow-md">
                                                <RegexIcon className="w-6 h-6 text-white" />
                                            </div>
                                            <h3 className="card-title text-xl font-semibold text-white">
                                                Generador RegEx
                                            </h3>
                                        </div>
                                        <p className="text-neutral-400 flex-grow text-sm">
                                            Crea, prueba y valida expresiones regulares visualmente.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="text-center mt-16">
                            <Link href="/platform" passHref>
                                <button className="btn btn-outline btn-primary btn-lg rounded-full hover:scale-105 transform-gpu transition-transform duration-300 ease-in-out group">
                                    Ver todas las herramientas
                                    <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
                <section className="py-20 md:py-32 bg-gradient-to-b from-black via-[#0A0F1A] to-slate-950">
                    {/* Transition back */}
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-4xl font-bold text-white mb-6">¿Tienes alguna sugerencia?</h2>
                            <p className="text-xl text-neutral-300 mb-10">
                                Estamos constantemente añadiendo nuevas herramientas. ¡Nos encantaría escuchar tus
                                ideas!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <a
                                    href="mailto:alejandro.ga.dev@gmail.com"
                                    className="btn btn-outline btn-secondary btn-lg rounded-full hover:scale-105 transform-gpu transition-transform duration-300 ease-in-out">
                                    Sugerir una herramienta
                                </a>
                                <a
                                    href="https://github.com/AletzMan/devbraineer"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline btn-neutral text-neutral-300 hover:text-white btn-lg rounded-full shadow-lg hover:bg-neutral-800/70 hover:border-neutral-600 hover:scale-105 transform-gpu transition-all duration-300 ease-in-out">
                                    Contribuir en GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="bg-gradient-to-b from-slate-950 to-black text-neutral-content pt-16 pb-8 border-t-2 border-neutral-800/70 shadow-inner">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12 items-start">
                            <div className="md:col-span-12 lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                                <Link href="/" className="flex items-center gap-3 mb-4 group">
                                    <Logo className="size-12 text-primary transition-transform duration-300 group-hover:scale-110" />
                                    <span
                                        className="text-3xl font-bold text-warning transition-colors duration-300 group-hover:text-primary"
                                        style={{
                                            fontFamily: 'var(--font-josefin-sans)',
                                        }}>
                                        DevBraineer
                                    </span>
                                </Link>
                                <p className="text-neutral-400 text-sm max-w-xs">
                                    Potenciando a desarrolladores e ingenieros con herramientas innovadoras y de código
                                    abierto.
                                </p>
                            </div>
                            <div className="md:col-span-6 lg:col-span-4">
                                <h6 className="font-bold text-lg text-white mb-4 relative inline-block">
                                    Herramientas
                                    <span className="absolute bottom-[-4px] left-0 w-1/2 h-0.5 bg-gradient-to-r from-primary to-secondary"></span>
                                </h6>
                                <ul className="space-y-2">
                                    <li>
                                        <Link
                                            href="/platform/playground"
                                            className={`text-neutral-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:brightness-125 ${styles.footerLink}`}>
                                            Playground de Código
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/platform/tools-tech/circuit-calculator"
                                            className={`text-neutral-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:brightness-125 ${styles.footerLink}`}>
                                            Calculadora de Circuitos
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/platform/tools-dev/converter"
                                            className={`text-neutral-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:brightness-125 ${styles.footerLink}`}>
                                            Convertidor JSON
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/platform/tools-dev/regex"
                                            className={`text-neutral-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:brightness-125 ${styles.footerLink}`}>
                                            Generador RegEx
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/platform"
                                            className={`font-semibold text-neutral-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:brightness-125 ${styles.footerLink}`}>
                                            Ver todas...
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="md:col-span-6 lg:col-span-4">
                                <h6 className="font-bold text-lg text-white mb-4 relative inline-block">
                                    Enlaces Útiles
                                    <span className="absolute bottom-[-4px] left-0 w-1/2 h-0.5 bg-gradient-to-r from-accent to-warning"></span>
                                </h6>
                                <ul className="space-y-2">
                                    <li>
                                        <Link
                                            href="/about"
                                            className={`text-neutral-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-accent hover:to-warning hover:brightness-125 ${styles.footerLink}`}>
                                            Sobre nosotros
                                        </Link>
                                    </li>
                                    <li>
                                        <a
                                            href="/contact"
                                            className={`text-neutral-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-accent hover:to-warning hover:brightness-125 ${styles.footerLink}`}>
                                            Contacto
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://github.com/AletzMan/devbraineer"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`text-neutral-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-accent hover:to-warning hover:brightness-125 ${styles.footerLink}`}>
                                            Contribuir
                                        </a>
                                    </li>
                                    <li>
                                        <Link
                                            href="/privacy"
                                            className={`text-neutral-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-accent hover:to-warning hover:brightness-125 ${styles.footerLink}`}>
                                            Política de Privacidad
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex justify-center lg:justify-start items-center gap-6 mt-16 border-t border-neutral-800/70 pt-8">
                            <a
                                href="https://github.com/AletzMan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-400 hover:text-white transition-colors duration-300">
                                <Github className="w-7 h-7" />
                            </a>
                            <a
                                href="https://linkedin.com/in/yourprofile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-400 hover:text-white transition-colors duration-300">
                                <Linkedin className="w-7 h-7" />
                            </a>
                        </div>

                        <div className="text-center text-sm text-neutral-500 mt-8">
                            © {new Date().getFullYear()} DevBraineer. Todos los derechos reservados.
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}

const DataCards = [
    {
        id: 'web-development',
        title: 'Desarrollo Web',
        description: 'Herramientas para formatear, validar y optimizar y probar tu código web.',
        icon: Code2,
        color: 'info',
        hoverColor: 'hover:border-info',
        gradient: 'from-info to-info/40',
        buttonColor: 'btn-info',
        href: '/platform/playground',
        children: [
            {
                title: 'Playground de Código',
                icon: Terminal,
                color: 'info',
            },
            {
                title: 'Generador RegEx',
                icon: Regex,
                color: 'info',
            },
            {
                title: 'Formateador de Código',
                icon: PenTool,
                color: 'info',
            },
        ],
    },
    {
        id: 'data-tools',
        title: 'Herramientas de Datos',
        description: 'Convierte, formatea y manipula datos en diferentes formatos.',
        icon: Database,
        color: 'secondary',
        hoverColor: 'hover:border-secondary',
        gradient: 'from-secondary to-secondary/40',
        buttonColor: 'btn-secondary',
        href: '/platform/tools-dev/converter',
        children: [
            {
                title: 'Convertidor JSON',
                icon: Database,
                color: 'secondary',
            },
            {
                title: 'Snippets de Código',
                icon: Layers,
                color: 'secondary',
            },
            {
                title: 'Convertidor de Unidades',
                icon: Sliders,
                color: 'secondary',
            },
        ],
    },
    {
        id: 'electronic-engineering',
        title: 'Ingeniería Electrónica',
        description: 'Calcula y simula circuitos electrónicos con herramientas especializadas.',
        icon: Zap,
        color: 'success',
        hoverColor: 'hover:border-success',
        gradient: 'from-success to-success/40',
        buttonColor: 'btn-success',
        href: '/platform/tools-tech',
        children: [
            {
                title: 'Calculadora de Circuitos',
                icon: Zap,
                color: 'success',
            },
            {
                title: 'Calculadora de Resistencias',
                icon: Wifi,
                color: 'success',
            },
            {
                title: 'Simulador Lógico Digital',
                icon: HardDrive,
                color: 'success',
            },
        ],
    },
];
