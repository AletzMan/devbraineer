import Link from "next/link"
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
} from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background tech-pattern">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-tech-blue/10 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-tech flex items-center justify-center animate-pulse-glow">
                <Code2 className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-tech">
                DevBraineer
              </h1>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Herramientas esenciales para desarrolladores y ingenieros
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Una colección de herramientas gratuitas y de código abierto diseñadas para hacer tu flujo de trabajo de
              desarrollo más eficiente y productivo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/dashboard" role="button" className="btn btn-primary">
                Comienza ahora <ArrowRight className="w-4 h-4" />
              </a>
              <button className="btn btn-outline"  >
                Ver en GitHub
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Herramientas para cada necesidad</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Desde desarrollo web hasta ingeniería electrónica, tenemos herramientas para todos los aspectos del
              desarrollo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Web Development Tools */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all hover:border-tech-blue/50 hover:translate-y-[-5px]">
              <div className="w-12 h-12 rounded-lg bg-gradient-tech flex items-center justify-center mb-4">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Desarrollo Web</h3>
              <p className="text-muted-foreground mb-4">
                Herramientas para formatear, validar y optimizar tu código HTML, CSS y JavaScript.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-tech-cyan" />
                  <span>Playground de Código</span>
                </li>
                <li className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-tech-cyan" />
                  <span>Generador RegEx</span>
                </li>
                <li className="flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-tech-cyan" />
                  <span>Formateador de Código</span>
                </li>
              </ul>
              <Link href="/tools/playground">
                <button className="btn btn-primary btn-outline">
                  Ver herramientas <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* Data Tools */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all hover:border-tech-blue/50 hover:translate-y-[-5px]">
              <div className="w-12 h-12 rounded-lg bg-gradient-tech flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Herramientas de Datos</h3>
              <p className="text-muted-foreground mb-4">
                Convierte, formatea y manipula datos en diferentes formatos para tus aplicaciones.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-tech-cyan" />
                  <span>Convertidor JSON</span>
                </li>
                <li className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-tech-cyan" />
                  <span>Snippets de Código</span>
                </li>
                <li className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-tech-cyan" />
                  <span>Convertidor de Unidades</span>
                </li>
              </ul>
              <Link href="/tools/json-converter">
                <button className="btn btn-primary btn-outline">
                  Ver herramientas <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* Electronics Tools */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all hover:border-tech-blue/50 hover:translate-y-[-5px]">
              <div className="w-12 h-12 rounded-lg bg-gradient-tech flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ingeniería Electrónica</h3>
              <p className="text-muted-foreground mb-4">
                Calcula y simula circuitos electrónicos con nuestras herramientas especializadas.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-tech-cyan" />
                  <span>Calculadora de Circuitos</span>
                </li>
                <li className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-tech-cyan" />
                  <span>Calculadora de Resistencias</span>
                </li>
                <li className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-tech-cyan" />
                  <span>Simulador Lógico Digital</span>
                </li>
              </ul>
              <Link href="/tools/circuit-calculator">
                <button className="btn btn-primary btn-outline">
                  Ver herramientas <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Herramientas populares</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre las herramientas más utilizadas por nuestra comunidad de desarrolladores.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/tools/playground" className="group">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 h-full hover:shadow-lg transition-all group-hover:border-tech-blue/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-tech flex items-center justify-center">
                    <Layers className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">Playground de Código</h3>
                </div>
                <p className="text-muted-foreground">
                  Experimenta con HTML, CSS y JavaScript en tiempo real con resaltado de sintaxis y consola integrada.
                </p>
              </div>
            </Link>

            <Link href="/tools/circuit-calculator" className="group">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 h-full hover:shadow-lg transition-all group-hover:border-tech-blue/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-tech flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">Calculadora de Circuitos</h3>
                </div>
                <p className="text-muted-foreground">
                  Calcula valores de resistencia, voltaje y corriente utilizando la ley de Ohm y otras fórmulas.
                </p>
              </div>
            </Link>

            <Link href="/tools/json-converter" className="group">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 h-full hover:shadow-lg transition-all group-hover:border-tech-blue/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-tech flex items-center justify-center">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">Convertidor JSON</h3>
                </div>
                <p className="text-muted-foreground">
                  Convierte entre JSON y objetos JavaScript con facilidad, con formato automático y validación.
                </p>
              </div>
            </Link>

            <Link href="/tools/regex" className="group">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 h-full hover:shadow-lg transition-all group-hover:border-tech-blue/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-tech flex items-center justify-center">
                    <GitBranch className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">Generador RegEx</h3>
                </div>
                <p className="text-muted-foreground">
                  Crea, prueba y valida expresiones regulares con una interfaz intuitiva y ejemplos prácticos.
                </p>
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link href="/tools">
              <button className="btn btn-primary btn-outline">
                Ver todas las herramientas <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-tech-blue/10 to-tech-purple/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">¿Tienes alguna sugerencia?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Estamos constantemente añadiendo nuevas herramientas. Si tienes alguna idea o sugerencia, nos encantaría
              escucharla.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary btn-outline">
                Sugerir una herramienta
              </button>
              <button className="btn btn-primary btn-outline">
                Contribuir en GitHub
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card/50 backdrop-blur-sm border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-tech flex items-center justify-center">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-tech">DevTools Hub</span>
            </div>

            <div className="flex flex-wrap gap-8 mb-6 md:mb-0">
              <div>
                <h4 className="font-semibold mb-3">Herramientas</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/tools/playground" className="text-muted-foreground hover:text-foreground">
                      Playground de Código
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/circuit-calculator" className="text-muted-foreground hover:text-foreground">
                      Calculadora de Circuitos
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/json-converter" className="text-muted-foreground hover:text-foreground">
                      Convertidor JSON
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/regex" className="text-muted-foreground hover:text-foreground">
                      Generador RegEx
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Enlaces</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-muted-foreground hover:text-foreground">
                      Acerca de
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                      Contacto
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                      Privacidad
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="btn btn-primary btn-outline">
                <Github className="w-5 h-5" />
              </button>
              <button className="btn btn-primary btn-ghost">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="btn btn-primary btn-ghost">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} DevTools Hub. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
