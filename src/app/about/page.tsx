'use client';

import Link from 'next/link';
import {
    Code2,
    Zap,
    Wifi,
    Terminal,
    GitBranch,
    Database,
    Layers,
    Github,
    LayoutDashboard,
    User,
    Info,
    Award,
    Users,
    Sparkles,
} from 'lucide-react';
import { Logo, NameLogo } from '../components/Logo';
import { FloatingHomeButton } from '../components/FloatingHomeButton';

export default function About() {
    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-950 via-[#0d1220] to-zinc-950 text-neutral-content antialiased"
            data-theme="dark">
            <FloatingHomeButton />
            {/* Hero Section */}
            <div className="hero min-h-svh relative">
                <div className="hero-overlay bg-gradient-radial from-neutral-950/50 via-[#1a2035]/60 to-transparent opacity-90"></div>
                <div className="hero-overlay bg-black/40"></div>
                <div className="hero-content text-center py-20 md:py-32 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col items-center justify-center mb-12">
                            <Logo className="size-24 md:size-30 text-primary group-hover:${styles.spinSlow}" />
                            <NameLogo className="w-70 md:w-130 text-warning stroke-2 group-hover:${styles.spinSlow}" />
                        </div>
                        <h2 className="mb-8 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-xl">
                            Sobre DevBraineer
                        </h2>
                        <p className="mb-10 text-md md:text-xl lg:text-2xl text-neutral-200 max-w-3xl mx-auto drop-shadow-md">
                            Una plataforma de herramientas gratuitas y de código
                            abierto para desarrolladores e ingenieros.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission & Vision */}
            <section className="py-20 md:py-32 bg-gradient-to-b from-slate-950 via-[#111827] to-[#0c1322]">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-gradient-to-br from-blue-700 to-cyan-600 rounded-full shadow-md">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold text-white">
                                    Nuestra Misión
                                </h3>
                            </div>
                            <p className="text-xl text-neutral-300">
                                Empoderar a la comunidad de desarrolladores e
                                ingenieros con herramientas de alta calidad,
                                gratuitas y de código abierto que faciliten su
                                trabajo diario y fomenten la innovación.
                            </p>
                        </div>
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-gradient-to-br from-purple-700 to-pink-600 rounded-full shadow-md">
                                    <Award className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold text-white">
                                    Nuestra Visión
                                </h3>
                            </div>
                            <p className="text-xl text-neutral-300">
                                Convertirnos en la plataforma de referencia para
                                herramientas de desarrollo, donde la
                                colaboración y el aprendizaje constante sean la
                                base de nuestra comunidad global.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features & Benefits */}
            <section className="py-20 md:py-32 bg-gradient-to-b from-[#0c1322] via-[#0A0F1A] to-black">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-6">
                            ¿Qué ofrecemos?
                        </h2>
                        <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                            Una colección completa de herramientas para
                            desarrolladores e ingenieros
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="card bg-neutral-900/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-neutral-700/70 hover:border-primary group">
                            <div className="card-body items-center text-center">
                                <div className="p-4 bg-gradient-to-br from-blue-700 to-cyan-600 rounded-full mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Code2 className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="card-title text-2xl font-semibold text-white mb-4">
                                    Desarrollo Web
                                </h3>
                                <ul className="space-y-3 text-neutral-300">
                                    <li className="flex items-center gap-3">
                                        <Terminal className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                                        <span>Playground de Código</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <GitBranch className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                                        <span>Generador RegEx</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="card bg-neutral-900/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-neutral-700/70 hover:border-secondary group">
                            <div className="card-body items-center text-center">
                                <div className="p-4 bg-gradient-to-br from-purple-700 to-pink-600 rounded-full mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Database className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="card-title text-2xl font-semibold text-white mb-4">
                                    Herramientas de Datos
                                </h3>
                                <ul className="space-y-3 text-neutral-300">
                                    <li className="flex items-center gap-3">
                                        <Database className="w-5 h-5 text-pink-400 flex-shrink-0" />
                                        <span>Convertidor JSON</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Layers className="w-5 h-5 text-pink-400 flex-shrink-0" />
                                        <span>Snippets de Código</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="card bg-neutral-900/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-neutral-700/70 hover:border-accent group">
                            <div className="card-body items-center text-center">
                                <div className="p-4 bg-gradient-to-br from-teal-700 to-green-600 rounded-full mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Zap className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="card-title text-2xl font-semibold text-white mb-4">
                                    Ingeniería Electrónica
                                </h3>
                                <ul className="space-y-3 text-neutral-300">
                                    <li className="flex items-center gap-3">
                                        <Zap className="w-5 h-5 text-teal-400 flex-shrink-0" />
                                        <span>Calculadora de Circuitos</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Wifi className="w-5 h-5 text-teal-400 flex-shrink-0" />
                                        <span>Calculadora de Resistencias</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="card bg-neutral-900/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-neutral-700/70 hover:border-info group">
                            <div className="card-body items-center text-center">
                                <div className="p-4 bg-gradient-to-br from-yellow-700 to-orange-600 rounded-full mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="card-title text-2xl font-semibold text-white mb-4">
                                    Comunidad
                                </h3>
                                <ul className="space-y-3 text-neutral-300">
                                    <li className="flex items-center gap-3">
                                        <Info className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                                        <span>Sugerencias de Usuarios</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <LayoutDashboard className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                                        <span>Panel de Control</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 md:py-32 bg-gradient-to-b from-black via-[#0A0F1A] to-slate-950">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-white mb-8">
                            Únete a nuestra comunidad
                        </h2>
                        <p className="text-xl text-neutral-300 mb-12 max-w-2xl mx-auto">
                            Ayúdanos a mejorar DevBraineer. Tu feedback es
                            valioso para nosotros.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <Link
                                href="/suggestions"
                                passHref
                                className="group">
                                <div className="card bg-neutral-900/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-neutral-700/70 hover:border-warning group">
                                    <div className="card-body items-center text-center p-8">
                                        <div className="p-4 bg-gradient-to-br from-warning to-accent rounded-full mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <Info className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="card-title text-xl font-semibold text-white mb-4">
                                            Sugerir herramienta
                                        </h3>
                                        <p className="text-neutral-400">
                                            Comparte tus ideas para nuevas
                                            herramientas
                                        </p>
                                    </div>
                                </div>
                            </Link>
                            <Link href="/contribute" passHref className="group">
                                <div className="card bg-neutral-900/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-neutral-700/70 hover:border-primary group">
                                    <div className="card-body items-center text-center p-8">
                                        <div className="p-4 bg-gradient-to-br from-primary to-secondary rounded-full mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <Github className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="card-title text-xl font-semibold text-white mb-4">
                                            Contribuir
                                        </h3>
                                        <p className="text-neutral-400">
                                            Ayúdanos a mejorar el código
                                        </p>
                                    </div>
                                </div>
                            </Link>
                            <Link href="/contact" passHref className="group">
                                <div className="card bg-neutral-900/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-neutral-700/70 hover:border-accent group">
                                    <div className="card-body items-center text-center p-8">
                                        <div className="p-4 bg-gradient-to-br from-accent to-warning rounded-full mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <User className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="card-title text-xl font-semibold text-white mb-4">
                                            Contacto
                                        </h3>
                                        <p className="text-neutral-400">
                                            Ponte en contacto con nosotros
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
