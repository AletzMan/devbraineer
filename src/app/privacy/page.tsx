'use client';

import Link from 'next/link';
import { Logo, NameLogo } from '../components/Logo';
import { FloatingHomeButton } from '../components/FloatingHomeButton';
import styles from '../home.module.css';

export default function Privacy() {
    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-950 via-[#0d1220] to-zinc-950 text-neutral-content antialiased"
            data-theme="dark">
            <FloatingHomeButton />
            <div className="min-h-screen">
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
                                Políticas de Privacidad
                            </h2>
                            <p className="mb-10 text-md md:text-xl lg:text-2xl text-neutral-200 max-w-3xl mx-auto drop-shadow-md">
                                Última actualización: 21 de mayo de 2025
                            </p>
                        </div>
                    </div>
                </div>

                {/* Privacy Policy Content */}
                <div className="container mx-auto px-4 py-20 md:py-32">
                    <div className="max-w-4xl mx-auto">
                        <h3 className="text-3xl font-bold text-white mb-8">
                            1. Introducción
                        </h3>
                        <p className="text-xl text-neutral-300 mb-6">
                            En DevBraineer, valoramos tu privacidad y queremos
                            que sepas cómo recopilamos, usamos y protegemos tu
                            información personal. Esta política de privacidad
                            explica nuestras prácticas de privacidad y los
                            derechos que tienes sobre tu información personal.
                        </p>

                        <h3 className="text-3xl font-bold text-white mb-8">
                            2. Información que Recopilamos
                        </h3>
                        <p className="text-xl text-neutral-300 mb-6">
                            <strong>Información que Recopilamos</strong>
                        </p>
                        <ul className="space-y-4 text-xl text-neutral-300 mb-8">
                            <li className="ml-6">
                                <span className="text-primary">•</span>{' '}
                                Información que Proporcionas: Cuando te
                                registras o usas nuestros servicios, podemos
                                recopilar información como tu nombre, correo
                                electrónico y preferencias de herramientas.
                            </li>
                            <li className="ml-6">
                                <span className="text-primary">•</span>{' '}
                                Información Automática: Recopilamos información
                                sobre cómo interactúas con nuestro sitio web,
                                incluyendo datos de uso y logs de actividad.
                            </li>
                        </ul>

                        <h3 className="text-3xl font-bold text-white mb-8">
                            3. Uso de la Información
                        </h3>
                        <p className="text-xl text-neutral-300 mb-6">
                            Utilizamos tu información para:
                        </p>
                        <ul className="space-y-4 text-xl text-neutral-300 mb-8">
                            <li className="ml-6">
                                <span className="text-primary">•</span>{' '}
                                Proporcionar y mantener nuestros servicios
                            </li>
                            <li className="ml-6">
                                <span className="text-primary">•</span> Mejorar
                                nuestras herramientas y servicios
                            </li>
                            <li className="ml-6">
                                <span className="text-primary">•</span>{' '}
                                Comunicarnos contigo sobre actualizaciones
                                importantes
                            </li>
                        </ul>

                        <h3 className="text-3xl font-bold text-white mb-8">
                            4. Compartir Información
                        </h3>
                        <p className="text-xl text-neutral-300 mb-6">
                            No vendemos ni compartimos tu información personal
                            con terceros, excepto cuando:
                        </p>
                        <ul className="space-y-4 text-xl text-neutral-300 mb-8">
                            <li className="ml-6">
                                <span className="text-primary">•</span> Es
                                necesario para proporcionar nuestros servicios
                            </li>
                            <li className="ml-6">
                                <span className="text-primary">•</span> Tenemos
                                tu consentimiento
                            </li>
                            <li className="ml-6">
                                <span className="text-primary">•</span> Es
                                requerido por ley
                            </li>
                        </ul>

                        <h3 className="text-3xl font-bold text-white mb-8">
                            5. Cookies y Tecnologías Similares
                        </h3>
                        <p className="text-xl text-neutral-300 mb-6">
                            Utilizamos cookies y tecnologías similares para
                            mejorar tu experiencia en nuestro sitio web. Puedes
                            administrar tus preferencias de cookies en la
                            configuración de tu navegador.
                        </p>

                        <h3 className="text-3xl font-bold text-white mb-8">
                            6. Seguridad
                        </h3>
                        <p className="text-xl text-neutral-300 mb-6">
                            Implementamos medidas de seguridad para proteger tu
                            información personal. Sin embargo, ningún método de
                            transmisión por Internet es 100% seguro.
                        </p>

                        <h3 className="text-3xl font-bold text-white mb-8">
                            7. Tus Derechos
                        </h3>
                        <p className="text-xl text-neutral-300 mb-6">
                            Tienes derecho a:
                        </p>
                        <ul className="space-y-4 text-xl text-neutral-300 mb-8">
                            <li className="ml-6">
                                <span className="text-primary">•</span> Acceder
                                a tu información personal
                            </li>
                            <li className="ml-6">
                                <span className="text-primary">•</span> Corregir
                                información inexacta
                            </li>
                            <li className="ml-6">
                                <span className="text-primary">•</span> Eliminar
                                tu información personal
                            </li>
                            <li className="ml-6">
                                <span className="text-primary">•</span> Revocar
                                tu consentimiento
                            </li>
                        </ul>

                        <h3 className="text-3xl font-bold text-white mb-8">
                            8. Cambios en esta Política
                        </h3>
                        <p className="text-xl text-neutral-300 mb-6">
                            Podemos actualizar esta política de privacidad
                            periódicamente. Cuando lo hagamos, actualizaremos la
                            fecha de última actualización en la parte superior
                            de esta página.
                        </p>

                        <h3 className="text-3xl font-bold text-white mb-8">
                            9. Contacto
                        </h3>
                        <p className="text-xl text-neutral-300 mb-6">
                            Si tienes alguna pregunta sobre esta política de
                            privacidad, puedes contactarnos a través de:
                        </p>
                        <ul className="space-y-4 text-xl text-neutral-300 mb-8">
                            <li className="ml-6">
                                <span className="text-primary">•</span> Email:
                                privacy@devbraineer.com
                            </li>
                            <li className="ml-6">
                                <Link
                                    href="/contact"
                                    className="hover:underline">
                                    • Nuestra página de contacto
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
