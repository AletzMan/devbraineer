'use client';
import { UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { usePathname } from 'next/navigation';
import { LinkData } from '../constants';

export default function Header() {
    const path = usePathname();
    const pathSegments = path.split('/').filter((segment) => segment !== '');

    return (
        <header className="flex items-center justify-between h-16 w-full bg-base-100 border-b border-gray-700 z-50 px-2">
            <div className="text-sm breadcrumbs">
                <ul>
                    {pathSegments.map((item, index) => {
                        const currentHref = `/${pathSegments.slice(0, index + 1).join('/')}`;

                        const currentLinkItem = LinkData.find(
                            (menuItem) => menuItem.href === currentHref
                        );

                        const isFirstSegment = index === 0;
                        const isLastSegment = index === pathSegments.length - 1;

                        const shouldShowIcon =
                            !isFirstSegment && currentLinkItem?.icon;

                        const textColorClass = isLastSegment
                            ? `${currentLinkItem?.color}`
                            : 'text-gray-400';

                        const iconColorClass = currentLinkItem?.color || '';

                        return (
                            <li key={index} className="capitalize">
                                {isLastSegment ||
                                currentLinkItem?.href === '#' ? (
                                    <div className="flex items-center gap-0.5">
                                        {currentLinkItem?.icon && (
                                            <currentLinkItem.icon
                                                className={`size-4.5 ${iconColorClass}`}
                                            />
                                        )}
                                        <span className={textColorClass}>
                                            {item}
                                        </span>
                                    </div>
                                ) : (
                                    <span
                                        className={`flex items-center ${textColorClass} `}>
                                        {shouldShowIcon && (
                                            <currentLinkItem.icon
                                                className={`size-4.5  `}
                                            />
                                        )}
                                        {item}
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <UserButton
                appearance={{ baseTheme: dark }}
                userProfileMode="navigation"
                userProfileUrl="/profile"
            />
        </header>
    );
}
