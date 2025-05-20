import {
    CalendarIcon,
    ChartBarIcon,
    CircleHelp,
    CodeIcon,
    LightbulbIcon,
} from 'lucide-react';

export const supportedLanguages = [
    'bash',
    'c',
    'clojure',
    'cpp',
    'csharp',
    'dart',
    'elixir',
    'elm',
    'erlang',
    'fsharp',
    'graphql',
    'go',
    'groovy',
    'haskell',
    'html',
    'java',
    'javascript',
    'jsx',
    'julia',
    'kotlin',
    'lisp',
    'makefile',
    'matlab',
    'objectivec',
    'ocaml',
    'php',
    'python',
    'r',
    'ruby',
    'rust',
    'scala',
    'sql',
    'swift',
    'tsx',
    'typescript',
];

export const TypePost = {
    Challenge: {
        icon: <CodeIcon />,
        title: 'Crear un reto',
    },
    Resource: {
        icon: <LightbulbIcon />,
        title: 'Compartir un recurso',
    },
    Question: {
        icon: <CircleHelp />,
        title: 'Hacer una pregunta',
    },
    EventMeetup: {
        icon: <CalendarIcon />,
        title: 'Publicar un evento',
    },
    Poll: {
        icon: <ChartBarIcon />,
        title: 'Crear una encuesta',
    },
};
