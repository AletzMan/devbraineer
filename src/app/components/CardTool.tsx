import { ArrowRight, Code2, LucideProps } from 'lucide-react';
import Link from 'next/link';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

interface CardToolProps {
    card: {
        title: string;
        description: string;
        icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
        hoverColor: string;
        color: string;
        gradient: string;
        buttonColor: string;
        href: string;
        children: {
            title: string;
            icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
            color: string;
        }[];
    };
}

export function CardTool({ card }: CardToolProps) {
    return (
        <div
            className={`card bg-gradient-to-br from-zinc-900 via-zinc-900/60 to-zinc-900/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-neutral-700/70  ${card.hoverColor} group`}>
            <div className="card-body items-center text-center">
                <div
                    className={`p-4 bg-gradient-to-br rounded-full mb-6 shadow-lg ${card.gradient} group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="card-title text-2xl font-semibold text-white mb-3">{card.title}</h3>
                <p className="text-neutral-400 mb-6 flex-grow">{card.description}</p>
                <ul className="space-y-3 mb-8 text-neutral-300 text-left w-full">
                    {card.children.map((feature) => (
                        <li className="flex items-center gap-3" key={feature.title}>
                            <feature.icon className={`w-5 h-5 text-${feature.color} flex-shrink-0`} />
                            <span>{feature.title}</span>
                        </li>
                    ))}
                </ul>
                <div className="card-actions justify-center w-full mt-auto">
                    <Link
                        href={card.href}
                        passHref
                        className={`btn btn-outline ${card.buttonColor} rounded-full hover:text-white w-full sm:w-auto`}>
                        Ver herramientas
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
