'use client';
import { usePathname } from 'next/navigation';
import { menuData } from '../constants'; // Importa menuData
import { UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import Link from 'next/link';
// ... otras importaciones

// Función para aplanar menuData y crear un mapa de búsqueda rápida
const flatLinkMap = new Map<string, { label: string; icon?: React.ElementType; color?: string }>();

function flattenMenuData(items: any[]) {
    // Considera tipar IMenuItem y sus hijos
    items.forEach((item) => {
        if (item.href && item.href !== '#') {
            // Solo si tiene href y no es un marcador de posición
            flatLinkMap.set(item.href, { label: item.label, icon: item.icon, color: item.color });
        }
        if (item.children) {
            flattenMenuData(item.children); // Recursivamente aplanar hijos
        }
    });
}

// Ejecuta la función una vez al inicio del módulo o usa useMemo si la data es dinámica
flattenMenuData(menuData);

export default function Header() {
    const path = usePathname();
    const pathSegments = path.split('/').filter((segment) => segment !== '');

    return (
        <header className="flex items-center justify-between h-16 w-full bg-base-100 border-b border-gray-700 z-50 px-2">
            <div className="text-sm breadcrumbs">
                <ul>
                    {pathSegments.map((item, index) => {
                        const currentHref = `/${pathSegments.slice(0, index + 1).join('/')}`;

                        // Buscar en el mapa aplanado
                        const currentLinkItem = flatLinkMap.get(currentHref);

                        const isLastSegment = index === pathSegments.length - 1;

                        const textColorClass = isLastSegment ? `${currentLinkItem?.color}` : 'text-gray-400';
                        const iconColorClass = currentLinkItem?.color || '';

                        return (
                            <li key={index} className="capitalize">
                                {isLastSegment ? ( // Necesitas que currentLinkItem también tenga href si lo usas aquí
                                    <div className="flex items-center gap-0.5">
                                        {currentLinkItem?.icon && (
                                            <currentLinkItem.icon className={`size-4.5 ${iconColorClass}`} />
                                        )}
                                        <span className={textColorClass}>{item}</span>
                                    </div>
                                ) : (
                                    <Link
                                        href={currentHref}
                                        className={`flex items-center ${textColorClass} hover:text-gray-600 transition-colors`}>
                                        {currentLinkItem?.icon && <currentLinkItem.icon className={`size-4.5`} />}
                                        {item}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <UserButton appearance={{ baseTheme: dark }} userProfileMode="navigation" userProfileUrl="/profile" />
        </header>
    );
}
