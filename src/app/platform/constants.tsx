import {
    Code2,
    Calendar,
    Lightbulb,
    BarChart2,
    MessageSquare,
    Bookmark,
    Settings,
    User,
    Zap,
    Layers,
    Sliders,
    PenTool,
    Compass,
    OmegaIcon,
    SquareTerminalIcon,
    MonitorCogIcon,
    BoxIcon,
    LinkIcon,
    FileCode,
    FileJsonIcon,
    RegexIcon,
    LayoutDashboard,
    HardDrive,
    Globe,
} from 'lucide-react';

export interface IMenuItem {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    color?: string;
    children?: IMenuItem[];
}

export const menuData: IMenuItem[] = [
    {
        label: 'Platform',
        href: '/platform',
        icon: LayoutDashboard,
        color: 'text-gray-400',
    },
    /*  {
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
    },*/
    {
        label: 'Playground',
        href: '/platform/playground',
        icon: Layers,
        color: 'text-orange-600',
        children: [
            {
                label: 'Editor Web',
                href: '/platform/playground/editor-web',
                icon: Globe,
                color: 'text-orange-400',
            },
            {
                label: 'Ejecutor de Código',
                href: '/platform/playground/editor-console',
                icon: SquareTerminalIcon,
                color: 'text-orange-400',
            },
            {
                label: 'HTTP Client',
                href: '/platform/playground/http-client',
                icon: SquareTerminalIcon,
                color: 'text-orange-400',
            },
        ],
    },
    {
        label: 'Gestión de Recursos',
        icon: BoxIcon,
        color: 'text-secondary', // Color para el icono del resumen
        href: '#',
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
        icon: SquareTerminalIcon,
        color: 'text-accent', // Color para el icono del resumen
        href: '#',
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
        icon: MonitorCogIcon,
        color: 'text-info', // Color para el icono del resumen
        href: '#',
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
            /* {
                label: 'Generador de Diagramas',
                href: '/platform/tools-tech/diagram-maker',
                icon: Compass,
                color: 'text-info/65',
            },
            {
                label: 'Simulador de Lógica',
                href: '/platform/tools-tech/logic-simulator',
                icon: HardDrive,
                color: 'text-info/65',
            },*/
            {
                label: 'Calculadora de Resistencias',
                href: '/platform/tools-tech/resistor-calculator',
                icon: OmegaIcon,
                color: 'text-info/65',
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
                href: '/platform/account/saved', // Placeholder href
                icon: Bookmark,
                color: 'text-yellow-300',
            },
            /*{
                label: 'Configuración',
                href: '/platform/account/settings', // Placeholder href
                icon: Settings,
                color: 'text-yellow-300',
            },*/
            {
                label: 'Perfil',
                href: '/profile', // Placeholder href
                icon: User, // User icon again
                color: 'text-yellow-300',
            },
        ],
    },
];
export interface ILinkItem {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

export const LinkData: ILinkItem[] = [
    {
        label: 'Platform',
        href: '/platform',
        icon: LayoutDashboard,
        color: 'text-gray-400',
    },

    // SECCIÓN: Playground
    // El href debe coincidir con el segmento de la URL para el breadcrumb
    {
        label: 'Playground',
        href: '/platform/playground',
        icon: Layers,
        color: 'text-orange-500',
    },
    {
        label: 'Editor Web',
        href: '/platform/playground/editor-web',
        icon: Globe,
        color: 'text-orange-500',
    },
    {
        label: 'Ejecutor de Código',
        href: '/platform/playground/editor-console',
        icon: SquareTerminalIcon,
        color: 'text-orange-500',
    },
    {
        label: 'HTTP Client',
        href: '/platform/playground/http-client',
        icon: SquareTerminalIcon,
        color: 'text-orange-500',
    },

    // SECCIÓN: Gestión de Recursos
    // 'resources' es el segmento URL, el href debe coincidir
    {
        label: 'Recursos',
        href: '/platform/resources',
        icon: BoxIcon,
        color: 'text-secondary',
    }, // AGREGADO o MODIFICADO
    {
        label: 'Snippets de Código',
        href: '/platform/resources/snippets',
        icon: FileCode,
        color: 'text-secondary',
    },
    {
        label: 'Enlaces de Interés',
        href: '/platform/resources/links',
        icon: LinkIcon,
        color: 'text-secondary',
    },

    // SECCIÓN: Herramientas de Desarrollo
    // 'tools-dev' es el segmento URL, el href debe coincidir
    {
        label: 'Herramientas de Desarrollo',
        href: '/platform/tools-dev',
        icon: SquareTerminalIcon,
        color: 'text-accent',
    }, // AGREGADO o MODIFICADO
    {
        label: 'Convertidor de Datos',
        href: '/platform/tools-dev/converter',
        icon: FileJsonIcon,
        color: 'text-accent',
    },
    {
        label: 'Generador de RegEx',
        href: '/platform/tools-dev/regex',
        icon: RegexIcon,
        color: 'text-accent',
    },

    // SECCIÓN: Herramientas Técnicas
    // 'tools-tech' es el segmento URL, el href debe coincidir
    {
        label: 'Herramientas Técnicas',
        href: '/platform/tools-tech',
        icon: MonitorCogIcon,
        color: 'text-info',
    }, // AGREGADO o MODIFICADO
    {
        label: 'Calculadora de Circuitos',
        href: '/platform/tools-tech/circuit-calculator',
        icon: Zap,
        color: 'text-info',
    },
    {
        label: 'Convertidor de Unidades',
        href: '/platform/tools-tech/unit-converter',
        icon: Sliders,
        color: 'text-info',
    },
    {
        label: 'Calculadora de Resistencias',
        href: '/platform/tools-tech/resistor-calculator',
        icon: OmegaIcon,
        color: 'text-info',
    },

    // SECCIÓN: Mi Cuenta
    // 'account' es el segmento URL, el href debe coincidir si lo usas en la URL
    // Si '/profile' es la URL raíz de mi cuenta y '/platform/account/saved' es la subsección:
    {
        label: 'Mi Cuenta',
        href: '/profile',
        icon: User,
        color: 'text-yellow-600',
    }, // MODIFICADO si estaba en '#'
    {
        label: 'Guardados',
        href: '/platform/account/saved',
        icon: Bookmark,
        color: 'text-yellow-600',
    },
    { label: 'Perfil', href: '/profile', icon: User, color: 'text-yellow-300' }, // Si ya existe para /profile, esta puede ser redundante o para un caso específico.

    // Si tu URL es /platform/account/saved, necesitarías una entrada para /platform/account
    {
        label: 'Cuenta',
        href: '/platform/account',
        icon: User,
        color: 'text-yellow-600',
    }, // Posiblemente NECESARIA si hay /platform/account/ lo que sea
];
export interface FileData {
    id: string;
    name: string;
    content: string;
    language: string;
    type: string;
    version: string;
}

export const FILES_DEFAULT: FileData[] = [
    {
        id: 'javascript-1',
        name: 'index.js',
        content: `function myFunction() {\n  console.log("Hello from function in JavaScript!");\n}\n\nmyFunction();`,
        language: 'javascript',
        type: 'javascript',
        version: '18.15.0',
    },
    {
        id: 'typescript-1',
        name: 'index.ts',
        content: `function myFunction(): void {\n  console.log("Hello from function in TypeScript!");\n}\n\nmyFunction();`,
        language: 'typescript',
        type: 'typescript',
        version: '5.0.3',
    },
    {
        id: 'python-1',
        name: 'main.py',
        content:
            'def myFunction():\n  print("Hello from function in Python!")\n\nmyFunction()',
        language: 'python',
        type: 'python',
        version: '3.10.0',
    },
    {
        id: 'java-1',
        name: 'Main.java',
        content: `public class Main {\n\n    public static void myFunction() {\n        System.out.println("Hello from function in Java!");\n    }\n\n    public static void main(String[] args) {\n        myFunction();\n    }\n}`,
        language: 'java',
        type: 'java',
        version: '15.0.2',
    },
    {
        id: 'c-1',
        name: 'main.c',
        content: `void myFunction() {\n    printf("Hello from function in C!\\n");\n}\n\nint main() {\n    myFunction();\n    return 0;\n}`,
        language: 'c',
        type: 'c',
        version: '10.2.0',
    },
    {
        id: 'cpp-1',
        name: 'main.cpp',
        content: `#include <iostream>\n\nvoid myFunction() {\n    std::cout << "Hello from function in C++!" << std::endl;\n}\n\nint main() {\n    myFunction();\n    return 0;\n}`,
        language: 'c++',
        type: 'cpp',
        version: '10.2.0',
    },
    {
        id: 'csharp-1',
        name: 'Program.cs',
        content: `using System;\n\npublic class Program {\n    public static void myFunction() {\n        Console.WriteLine("Hello from function in C#! ");\n    }\n\n    public static void Main(string[] args) {\n        myFunction();\n    }\n}`,
        language: 'csharp',
        type: 'csharp',
        version: '6.12.0',
    },
    {
        id: 'ruby-1',
        name: 'main.rb',
        content: `def myFunction\n  puts "Hello from function in Ruby!"\nend\n\nmyFunction`,
        language: 'ruby',
        type: 'ruby',
        version: '3.0.1',
    },
    {
        id: 'php-1',
        name: 'index.php',
        content: `<?php\n\nfunction myFunction() {\n  echo "Hello from function in PHP!";\n}\n\nmyFunction();\n\n?>`,
        language: 'php',
        type: 'php',
        version: '8.2.3',
    },
    {
        id: 'swift-1',
        name: 'main.swift',
        content: `func myFunction() {\n    print("Hello from function in Swift!")\n}\n\nmyFunction()`,
        language: 'swift',
        type: 'swift',
        version: '5.3.3',
    },
    {
        id: 'kotlin-1',
        name: 'Main.kt',
        content: `fun myFunction() {\n    println("Hello from function in Kotlin!")\n}\n\nfun main() {\n    myFunction()\n}`,
        language: 'kotlin',
        type: 'kotlin',
        version: '1.8.20',
    },
    {
        id: 'go-1',
        name: 'main.go',
        content: `package main\n\nimport "fmt"\n\nfunc myFunction() {\n    fmt.Println("Hello from function in Go!")\n}\n\nfunc main() {\n    myFunction()\n}`,
        language: 'go',
        type: 'go',
        version: '1.16.2',
    },
    {
        id: 'rs-1',
        name: 'main.rs',
        content: `fn myFunction() {\n    println!("Hello from function in Rust!");\n}\n\nfn main() {\n    myFunction();\n}`,
        language: 'rust',
        type: 'rust',
        version: '1.68.2',
    },
    {
        id: 'dart-1',
        name: 'main.dart',
        content: `void myFunction() {\n    print("Hello from function in Dart!");\n}\n\nvoid main() {\n    myFunction();\n}`,
        language: 'dart',
        type: 'dart',
        version: '2.19.6',
    },
    {
        id: 'scala-1',
        name: 'Main.scala',
        content: `object Main extends App {\n    def myFunction(): Unit = {\n        println("Hello from function in Scala!")\n    }\n    myFunction()\n}`,
        language: 'scala',
        type: 'scala',
        version: '3.2.2',
    },
    {
        id: 'lua-1',
        name: 'main.lua',
        content: `function myFunction()\n    print("Hello from function in Lua!")\nend\n\nmyFunction()`,
        language: 'lua',
        type: 'lua',
        version: '5.4.4',
    },
];

export const tips = [
    'Comienza con patrones simples y añade complejidad gradualmente.',
    'Usa grupos de captura `()` para extraer partes específicas del texto.',
    'Escapa caracteres especiales con `\\` si los necesitas literalmente.',
    'Prueba tus expresiones con herramientas como [regex101.com](https://regex101.com).',
    'Evita patrones con backtracking excesivo: pueden afectar el rendimiento.',
    'Usa grupos no capturantes `(?:...)` si solo necesitas agrupar sin capturar.',
    'Lookarounds como `(?=...)`, `(?!...)`, `(?<=...)`, `(?<!=...)` permiten coincidencias condicionales.',
    'Modificadores como `/g`, `/i`, `/m` cambian el comportamiento de la búsqueda.',
    'Aprende a leer expresiones antes de intentar escribir las propias.',
];

export const simbolos = [
    { simbolo: '.', descripcion: 'Cualquier carácter excepto nueva línea' },
    { simbolo: '^', descripcion: 'Inicio de línea' },
    { simbolo: '$', descripcion: 'Fin de línea' },
    { simbolo: '*', descripcion: '0 o más repeticiones' },
    { simbolo: '+', descripcion: '1 o más repeticiones' },
    { simbolo: '?', descripcion: '0 o 1 repetición' },
    { simbolo: '{n}', descripcion: 'Exactamente n repeticiones' },
    { simbolo: '{n,}', descripcion: 'Al menos n repeticiones' },
    { simbolo: '{n,m}', descripcion: 'Entre n y m repeticiones' },
    { simbolo: '[abc]', descripcion: 'Cualquier carácter a, b o c' },
    { simbolo: '[^abc]', descripcion: 'Cualquier carácter excepto a, b o c' },
    { simbolo: '|', descripcion: 'Alternancia (OR lógico)' },
    { simbolo: '( )', descripcion: 'Grupo de captura' },
    { simbolo: '(?: )', descripcion: 'Grupo no capturante' },
    { simbolo: '\\d', descripcion: 'Dígito (0–9)' },
    { simbolo: '\\w', descripcion: 'Carácter de palabra (letras, números, _)' },
    {
        simbolo: '\\s',
        descripcion: 'Espacio en blanco (tab, espacio, salto de línea)',
    },
    { simbolo: '\\D', descripcion: 'No es un dígito' },
    { simbolo: '\\W', descripcion: 'No es un carácter de palabra' },
    { simbolo: '\\S', descripcion: 'No es un espacio en blanco' },
];

export const languages = [
    'javascript',
    'typescript',
    'python',
    'java',
    'c#',
    'c++',
    'c',
    'go',
    'php',
    'ruby',
    'html',
    'css',
    'bash',
    'sql',
    'json',
    'yaml',
    'markdown',
    'other',
];
