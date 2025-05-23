'use client';
import { usePathname } from 'next/navigation';
import { menuData } from '../constants';
import { UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import Link from 'next/link';
import { ThemeController } from '@/app/components/ThemeController';

const flatLinkMap = new Map<string, { label: string; icon?: React.ElementType; color?: string }>();

function flattenMenuData(items: any[]) {
    items.forEach((item) => {
        if (item.href && item.href !== '#') {
            flatLinkMap.set(item.href, { label: item.label, icon: item.icon, color: item.color });
        }
        if (item.children) {
            flattenMenuData(item.children);
        }
    });
}

flattenMenuData(menuData);

export default function Header() {
    const path = usePathname();
    const pathSegments = path.split('/').filter((segment) => segment !== '');

    return (
        <header className="flex items-center justify-between h-16 w-full bg-base-100 border-b border-base-200 z-50 px-2">
            <div className="text-sm breadcrumbs">
                <ul>
                    {pathSegments.map((item, index) => {
                        const currentHref = `/${pathSegments.slice(0, index + 1).join('/')}`;

                        const currentLinkItem = flatLinkMap.get(currentHref);

                        const isLastSegment = index === pathSegments.length - 1;

                        const textColorClass = isLastSegment ? `${currentLinkItem?.color}` : 'text-gray-400';
                        const iconColorClass = currentLinkItem?.color || '';

                        return (
                            <li key={index} className="capitalize">
                                {isLastSegment ? (
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
            <div className="flex items-center justify-center gap-5">
                <ThemeController />
                <UserButton appearance={{ baseTheme: dark }} userProfileMode="navigation" userProfileUrl="/profile" />
            </div>
        </header>
    );
}
