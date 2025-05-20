import Link from 'next/link';
import {
    Code2,
    Zap,
    Sliders,
    Wifi,
    HardDrive,
    Terminal,
    GitBranch,
    Database,
    Layers,
    PenTool,
    ArrowRight,
    Github,
    Twitter,
    Linkedin,
} from 'lucide-react';
import { Logo } from './components/Logo';

export default function Home() {
    return (
        // Contenedor principal con fondo oscuro y scroll suave
        <div className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden antialiased">
            {/* Hero Section */}
            <header className="relative overflow-hidden py-20 md:py-32 lg:py-40">
                {/* Fondo con gradiente radial sutil */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-transparent opacity-60"></div>
                    <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                    {/* Patrón de cuadrícula sutil (requiere CSS) */}
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                        {/* Logo y Nombre de la App */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex items-center justify-center gap-2 px-3 py-2 ">
                                <Logo className="size-30 text-(--color-primary)" />
                                <h1
                                    className="items-center justify-center h-full pt-1.5 text-7xl font-bold text-(--color-warning) max-2xl:hidden group-hover:max-2xl:flex"
                                    style={{
                                        fontFamily: 'var(--font-josefin-sans)',
                                    }}>
                                    DevBraineer
                                </h1>
                            </div>
                        </div>

                        {/* Título Principal */}
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                            Herramientas esenciales para
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400">
                                {' desarrolladores '}
                            </span>
                            e ingenieros
                        </h2>

                        {/* Subtítulo/Descripción */}
                        <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl">
                            Una colección de herramientas gratuitas y de código
                            abierto diseñadas para hacer tu flujo de trabajo de
                            desarrollo más eficiente y productivo.
                        </p>

                        {/* Botones CTA */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <Link
                                href="/platform" // Asumiendo que '/platform' es la ruta a la app
                                passHref // Pasa href al componente subyacente si es necesario
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105"
                                role="button" // Semántica para accesibilidad
                            >
                                Comienza ahora
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                            <a
                                href="https://github.com/AletzMan/devbraineer" // Reemplaza con la URL de tu repo en GitHub
                                target="_blank" // Abre en una nueva pestaña
                                rel="noopener noreferrer" // Seguridad
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-300 bg-gray-800 border border-gray-700 rounded-full shadow-lg hover:bg-gray-700 hover:border-gray-600 transition-all duration-300 ease-in-out transform hover:scale-105">
                                Ver en GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-20 md:py-32 bg-gray-900">
                {/* Fondo ligeramente diferente */}
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Herramientas para cada necesidad
                        </h2>
                        <p className="text-xl text-gray-400">
                            Desde desarrollo web hasta ingeniería electrónica,
                            tenemos herramientas para todos los aspectos del
                            desarrollo.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Web Development Tools Card */}
                        <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-8 flex flex-col hover:shadow-xl transition-all duration-300 ease-in-out hover:border-blue-600 transform hover:translate-y-[-5px]">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mb-6 shadow-md">
                                <Code2 className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-3">
                                Desarrollo Web
                            </h3>
                            <p className="text-gray-400 mb-6 flex-grow">
                                {/* flex-grow para que ocupen el mismo espacio */}
                                Herramientas para formatear, validar y optimizar
                                tu código HTML, CSS y JavaScript.
                            </p>
                            <ul className="space-y-3 mb-8 text-gray-300">
                                <li className="flex items-center gap-3">
                                    <Terminal className="w-5 h-5 text-cyan-400" />
                                    <span>Playground de Código</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <GitBranch className="w-5 h-5 text-cyan-400" />
                                    <span>Generador RegEx</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <PenTool className="w-5 h-5 text-cyan-400" />
                                    <span>Formateador de Código</span>
                                </li>
                            </ul>
                            <Link href="/platform/playground" passHref>
                                <button className="inline-flex items-center justify-center px-6 py-3 text-md font-semibold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-400 hover:text-white transition-all duration-300 ease-in-out self-start">
                                    {/* self-start para alinear */}
                                    Ver herramientas
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </button>
                            </Link>
                        </div>

                        {/* Data Tools Card */}
                        <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-8 flex flex-col hover:shadow-xl transition-all duration-300 ease-in-out hover:border-purple-600 transform hover:translate-y-[-5px]">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-6 shadow-md">
                                <Database className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-3">
                                Herramientas de Datos
                            </h3>
                            <p className="text-gray-400 mb-6 flex-grow">
                                Convierte, formatea y manipula datos en
                                diferentes formatos para tus aplicaciones.
                            </p>
                            <ul className="space-y-3 mb-8 text-gray-300">
                                <li className="flex items-center gap-3">
                                    <Database className="w-5 h-5 text-pink-400" />
                                    <span>Convertidor JSON</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Layers className="w-5 h-5 text-pink-400" />
                                    <span>Snippets de Código</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Sliders className="w-5 h-5 text-pink-400" />
                                    <span>Convertidor de Unidades</span>
                                </li>
                            </ul>
                            <Link href="/platform/tools-dev/converter" passHref>
                                <button className="inline-flex items-center justify-center px-6 py-3 text-md font-semibold text-purple-400 border border-purple-400 rounded-full hover:bg-purple-400 hover:text-white transition-all duration-300 ease-in-out self-start">
                                    Ver herramientas
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </button>
                            </Link>
                        </div>

                        {/* Electronics Tools Card */}
                        <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-8 flex flex-col hover:shadow-xl transition-all duration-300 ease-in-out hover:border-teal-600 transform hover:translate-y-[-5px]">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center mb-6 shadow-md">
                                <Zap className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-3">
                                Ingeniería Electrónica
                            </h3>
                            <p className="text-gray-400 mb-6 flex-grow">
                                Calcula y simula circuitos electrónicos con
                                nuestras herramientas especializadas.
                            </p>
                            <ul className="space-y-3 mb-8 text-gray-300">
                                <li className="flex items-center gap-3">
                                    <Zap className="w-5 h-5 text-teal-400" />
                                    <span>Calculadora de Circuitos</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Wifi className="w-5 h-5 text-teal-400" />
                                    <span>Calculadora de Resistencias</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <HardDrive className="w-5 h-5 text-teal-400" />
                                    <span>Simulador Lógico Digital</span>
                                </li>
                            </ul>
                            <Link
                                href="/platform/tools-tech/circuit-calculator"
                                passHref>
                                <button className="inline-flex items-center justify-center px-6 py-3 text-md font-semibold text-teal-400 border border-teal-400 rounded-full hover:bg-teal-400 hover:text-white transition-all duration-300 ease-in-out self-start">
                                    Ver herramientas
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Tools Section */}
            <section className="py-20 md:py-32 bg-gray-950">
                {/* Fondo oscuro principal */}
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Herramientas populares
                        </h2>
                        <p className="text-xl text-gray-400">
                            Descubre las herramientas más utilizadas por nuestra
                            comunidad de desarrolladores.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Popular Tool Card - Playground */}
                        <Link
                            href="/platform/playground"
                            passHref
                            className="group">
                            <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6 h-full flex flex-col hover:shadow-xl transition-all duration-300 ease-in-out group-hover:border-blue-600">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-md">
                                        <Layers className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">
                                        Playground de Código
                                    </h3>
                                </div>
                                <p className="text-gray-400 flex-grow">
                                    Experimenta con HTML, CSS y JavaScript en
                                    tiempo real con resaltado de sintaxis y
                                    consola integrada.
                                </p>
                            </div>
                        </Link>

                        {/* Popular Tool Card - Circuit Calculator */}
                        <Link
                            href="/platform/tools-tech/circuit-calculator"
                            passHref
                            className="group">
                            <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6 h-full flex flex-col hover:shadow-xl transition-all duration-300 ease-in-out group-hover:border-teal-600">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center shadow-md">
                                        <Zap className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">
                                        Calculadora de Circuitos
                                    </h3>
                                </div>
                                <p className="text-gray-400 flex-grow">
                                    Calcula valores de resistencia, voltaje y
                                    corriente utilizando la ley de Ohm y otras
                                    fórmulas.
                                </p>
                            </div>
                        </Link>

                        {/* Popular Tool Card - JSON Converter */}
                        <Link
                            href="/platform/tools-dev/converter"
                            passHref
                            className="group">
                            <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6 h-full flex flex-col hover:shadow-xl transition-all duration-300 ease-in-out group-hover:border-purple-600">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-md">
                                        <Database className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">
                                        Convertidor JSON
                                    </h3>
                                </div>
                                <p className="text-gray-400 flex-grow">
                                    Convierte entre JSON y objetos JavaScript
                                    con facilidad, con formato automático y
                                    validación.
                                </p>
                            </div>
                        </Link>

                        {/* Popular Tool Card - Regex Generator */}
                        <Link
                            href="/platform/tools-dev/regex"
                            passHref
                            className="group">
                            <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6 h-full flex flex-col hover:shadow-xl transition-all duration-300 ease-in-out group-hover:border-blue-600">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-md">
                                        <GitBranch className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">
                                        Generador RegEx
                                    </h3>
                                </div>
                                <p className="text-gray-400 flex-grow">
                                    Crea, prueba y valida expresiones regulares
                                    con una interfaz intuitiva y ejemplos
                                    prácticos.
                                </p>
                            </div>
                        </Link>
                    </div>

                    <div className="text-center mt-16">
                        <Link href="/platform/tools-dev/converter" passHref>
                            {/* Asumiendo que '/tools' lista todas las herramientas */}
                            <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-400 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105">
                                Ver todas las herramientas
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 md:py-32 bg-gray-900">
                {/* Fondo ligeramente diferente */}
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-white mb-6">
                            ¿Tienes alguna sugerencia?
                        </h2>
                        <p className="text-xl text-gray-400 mb-10">
                            Estamos constantemente añadiendo nuevas
                            herramientas. Si tienes alguna idea o sugerencia,
                            nos encantaría escucharla.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            {/* Botón Sugerir */}
                            <a
                                href="mailto:alejandro.ga.dev@gmail.com" // Reemplaza con tu email o un enlace a un formulario
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-purple-400 border border-purple-400 rounded-full hover:bg-purple-400 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105">
                                Sugerir una herramienta
                            </a>
                            {/* Botón Contribuir */}
                            <a
                                href="https://github.com/AletzMan/devbraineer" // Reemplaza con la URL de tu repo en GitHub
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-300 bg-gray-800 border border-gray-700 rounded-full shadow-lg hover:bg-gray-700 hover:border-gray-600 transition-all duration-300 ease-in-out transform hover:scale-105">
                                Contribuir en GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-gray-950 border-t border-gray-800">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        {/* Ajustado gap */}
                        {/* Logo en Footer */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex items-center justify-center gap-2 px-3 py-2 ">
                                    <Logo className="size-12 text-(--color-primary)" />
                                    <h1
                                        className="items-center justify-center h-full pt-1.5 text-3xl font-bold text-(--color-warning) max-2xl:hidden group-hover:max-2xl:flex"
                                        style={{
                                            fontFamily:
                                                'var(--font-josefin-sans)',
                                        }}>
                                        DevBraineer
                                    </h1>
                                </div>
                            </div>
                        </div>
                        {/* Enlaces del Footer */}
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                            {/* Ajustado gap */}
                            {/* Columna de Herramientas */}
                            <div className="text-center md:text-left">
                                {/* Alineación responsiva */}
                                <h4 className="font-semibold text-white mb-3">
                                    Herramientas
                                </h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li>
                                        <Link
                                            href="/platform/playground"
                                            className="hover:text-white transition-colors duration-200">
                                            Playground de Código
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/platform/tools-tech/circuit-calculator"
                                            className="hover:text-white transition-colors duration-200">
                                            Calculadora de Circuitos
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/platform/tools-dev/converter"
                                            className="hover:text-white transition-colors duration-200">
                                            Convertidor JSON
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/platform/tools-dev/regex"
                                            className="hover:text-white transition-colors duration-200">
                                            Generador RegEx
                                        </Link>
                                    </li>
                                    {/* Añadir más enlaces de herramientas según sea necesario */}
                                </ul>
                            </div>
                            {/* Columna de Enlaces */}
                            <div className="text-center md:text-left">
                                {/* Alineación responsiva */}
                                <h4 className="font-semibold text-white mb-3">
                                    Enlaces
                                </h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li>
                                        <Link
                                            href="/about"
                                            className="hover:text-white transition-colors duration-200">
                                            Acerca de
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/blog"
                                            className="hover:text-white transition-colors duration-200">
                                            Blog
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/contact"
                                            className="hover:text-white transition-colors duration-200">
                                            Contacto
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/privacy"
                                            className="hover:text-white transition-colors duration-200">
                                            Privacidad
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* Iconos Sociales */}
                        <div className="flex gap-4 mt-6 md:mt-0">
                            {/* Ajustado margen */}
                            <a
                                href="https://github.com/AletzMan/devbraineer"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                                title="GitHub">
                                <Github className="w-6 h-6" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/alejandro-garcia-dev/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                                title="LinkedIn">
                                <Linkedin className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-600 text-sm">
                        {/* Ajustado estilos */}
                        <p>
                            &copy; {new Date().getFullYear()} DevBraineer. Todos
                            los derechos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
