import {
    Globe,
    SquareTerminalIcon as SquareTerminalIconChild,
    Layers,
} from 'lucide-react';
import { SiteFooter } from '../componentes/SiteFooter';

const playgroundChildren = [
    {
        label: 'Editor Web',
        href: '/platform/playground/editor-web',
        icon: Globe,
        color: 'text-orange-600',
        description:
            'Edita y prueba código web en tiempo real con soporte para HTML, CSS y JavaScript.',
    },
    {
        label: 'Ejecutor de Código',
        href: '/platform/playground/editor-console',
        icon: SquareTerminalIconChild,
        color: 'text-orange-600',
        description:
            'Ejecuta código de consola en varios lenguajes y visualiza resultados instantáneamente.',
    },
];

export default function PlaygroundSection() {
    return (
        <div className="max-w-(--max-width) mx-auto px-6 py-10 flex flex-col h-[calc(100svh-4rem)] flex-grow overflow-y-auto scrollbar-thin">
            <h1 className="text-3xl font-semibold mb-10 flex items-center gap-3 text-orange-400">
                <Layers className="w-7 h-7 text-orange-400" />
                Playground
            </h1>

            <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(340px,1fr))] flex-grow">
                {playgroundChildren.map(
                    ({ label, description, href, icon: Icon, color }) => (
                        <div
                            key={label}
                            className="bg-base-200 relative rounded-md border max-h-[250px] border-base-300 shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
                            <Icon
                                className="absolute bottom-4 right-4 size-18 opacity-6 pointer-events-none select-none text-gray-300"
                                aria-hidden="true"
                            />
                            <a
                                href={href}
                                className={`flex items-center gap-4 mb-2 group ${color} hover:brightness-90 transition duration-300`}>
                                <Icon
                                    className={`${color} w-6 h-6 flex-shrink-0`}
                                />
                                <h2
                                    className={`text-xl font-semibold ${color} group-hover:underline`}>
                                    {label}
                                </h2>
                            </a>

                            {description && (
                                <p className="text-sm text-gray-500">
                                    {description}
                                </p>
                            )}
                        </div>
                    )
                )}
            </div>

            <SiteFooter />
        </div>
    );
}
