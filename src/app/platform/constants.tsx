import {
    Home, Code2, Calendar, Lightbulb, BarChart2, MessageSquare,
    Bookmark, Settings, User, Cpu, Zap, Terminal, GitBranch, Database, Layers,
    Sliders, PenTool, Compass, HardDrive, OmegaIcon, SquareTerminalIcon,
    MonitorCogIcon, BoxIcon, LinkIcon, FileCode, FileJsonIcon, RegexIcon,
    Boxes,
    LayoutDashboard,
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
        label: 'Platform',
        href: '/platform',
        icon: LayoutDashboard,
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
        id: "javascript-1",
        name: "index.js",
        content: `function myFunction() {\n  console.log("Hello from function in JavaScript!");\n}\n\nmyFunction();`,
        language: "javascript",
        type: "javascript",
        version: "18.15.0"
    },
    {
        id: "typescript-1",
        name: "index.ts",
        content: `function myFunction(): void {\n  console.log("Hello from function in TypeScript!");\n}\n\nmyFunction();`,
        language: "typescript",
        type: "typescript",
        version: "5.0.3"
    },
    {
        id: "python-1",
        name: "main.py",
        content: "def myFunction():\n  print(\"Hello from function in Python!\")\n\nmyFunction()",
        language: "python",
        type: "python",
        version: "3.10.0"
    },
    {
        id: "java-1",
        name: "Main.java",
        content: `public class Main {\n\n    public static void myFunction() {\n        System.out.println("Hello from function in Java!");\n    }\n\n    public static void main(String[] args) {\n        myFunction();\n    }\n}`,
        language: "java",
        type: "java",
        version: "15.0.2"
    },
    {
        id: "c-1",
        name: "main.c",
        content: `void myFunction() {\n    printf("Hello from function in C!\\n");\n}\n\nint main() {\n    myFunction();\n    return 0;\n}`,
        language: "c",
        type: "c",
        version: "10.2.0"
    },
    {
        id: "cpp-1",
        name: "main.cpp",
        content: `#include <iostream>\n\nvoid myFunction() {\n    std::cout << "Hello from function in C++!" << std::endl;\n}\n\nint main() {\n    myFunction();\n    return 0;\n}`,
        language: "c++",
        type: "cpp",
        version: "10.2.0"
    },
    {
        id: "csharp-1",
        name: "Program.cs",
        content: `using System;\n\npublic class Program {\n    public static void myFunction() {\n        Console.WriteLine("Hello from function in C#! ");\n    }\n\n    public static void Main(string[] args) {\n        myFunction();\n    }\n}`,
        language: "csharp",
        type: "csharp",
        version: "6.12.0"
    },
    {
        id: "ruby-1",
        name: "main.rb",
        content: `def myFunction\n  puts "Hello from function in Ruby!"\nend\n\nmyFunction`,
        language: "ruby",
        type: "ruby",
        version: "3.0.1"
    },
    {
        id: "php-1",
        name: "index.php",
        content: `<?php\n\nfunction myFunction() {\n  echo "Hello from function in PHP!";\n}\n\nmyFunction();\n\n?>`,
        language: "php",
        type: "php",
        version: "8.2.3"
    },
    {
        id: "swift-1",
        name: "main.swift",
        content: `func myFunction() {\n    print("Hello from function in Swift!")\n}\n\nmyFunction()`,
        language: "swift",
        type: "swift",
        version: "5.3.3"
    },
    {
        id: "kotlin-1",
        name: "Main.kt",
        content: `fun myFunction() {\n    println("Hello from function in Kotlin!")\n}\n\nfun main() {\n    myFunction()\n}`,
        language: "kotlin",
        type: "kotlin",
        version: "1.8.20"
    },
    {
        id: "go-1",
        name: "main.go",
        content: `package main\n\nimport "fmt"\n\nfunc myFunction() {\n    fmt.Println("Hello from function in Go!")\n}\n\nfunc main() {\n    myFunction()\n}`,
        language: "go",
        type: "go",
        version: "1.16.2"
    },
    {
        id: "rs-1",
        name: "main.rs",
        content: `fn myFunction() {\n    println!("Hello from function in Rust!");\n}\n\nfn main() {\n    myFunction();\n}`,
        language: "rust",
        type: "rust",
        version: "1.68.2"
    },
    {
        id: "dart-1",
        name: "main.dart",
        content: `void myFunction() {\n    print("Hello from function in Dart!");\n}\n\nvoid main() {\n    myFunction();\n}`,
        language: "dart",
        type: "dart",
        version: "2.19.6"
    },
    {
        id: "scala-1",
        name: "Main.scala",
        content: `object Main extends App {\n    def myFunction(): Unit = {\n        println("Hello from function in Scala!")\n    }\n    myFunction()\n}`,
        language: "scala",
        type: "scala",
        version: "3.2.2"
    },
    {
        id: "lua-1",
        name: "main.lua",
        content: `function myFunction()\n    print("Hello from function in Lua!")\nend\n\nmyFunction()`,
        language: "lua",
        type: "lua",
        version: "5.4.4"
    }
]