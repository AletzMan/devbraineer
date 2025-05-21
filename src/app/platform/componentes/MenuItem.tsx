import { useState } from 'react';
import { IMenuItem } from '../constants';
import Link from 'next/link';

interface MenuItemProps {
    item: IMenuItem;
    currentPath: string;
}

export function MenuItem({ item, currentPath }: MenuItemProps) {
    const isSectionActive = item.children?.some(
        (child) => currentPath === child.href
    );

    const isSubSectionActive =
        currentPath.split('/')[currentPath.split('/').length - 1];
    const [isOpen, setIsOpen] = useState(isSectionActive || false);

    const IconComponent = item.icon;
    const iconColorClass = item.color || 'text-gray-400';

    if (item.children) {
        return (
            <ul
                className={`menu rounded-box max-2xl:w-11 w-66 group-hover:max-2xl:w-66`}>
                <li>
                    <details
                        open={isOpen}
                        onToggle={(e) => setIsOpen(e.currentTarget.open)}
                        name="sidebar-section"
                        className={`max-2xl:hidden group-hover:max-2xl:block ${isOpen ? 'bg-white/5' : ''}`}>
                        <summary
                            className={` cursor-pointer ${isSectionActive ? 'font-semibold text-white ' : 'text-gray-300'} `}>
                            {IconComponent && (
                                <IconComponent
                                    className={`w-5 h-5 ${iconColorClass}`}
                                />
                            )}
                            <span className="group-hover:max-2xl:block max-2xl:hidden">
                                {item.label}
                            </span>
                        </summary>
                        <ul className="ml-4">
                            {item.children.map((Child) => (
                                <li key={Child.label}>
                                    <Link
                                        href={Child.href}
                                        className={
                                            isSubSectionActive ===
                                            Child.href.split('/')[
                                                Child.href.split('/').length - 1
                                            ]
                                                ? 'menu-active '
                                                : ''
                                        }>
                                        {Child.icon && (
                                            <Child.icon
                                                className={`w-5 h-5 ${Child.color}`}
                                            />
                                        )}
                                        {Child.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </details>
                    <Link
                        href={item.href || '#'}
                        className={`max-2xl:block hidden group-hover:max-2xl:hidden ${isSectionActive ? 'menu-active ' : ''}`}>
                        {IconComponent && (
                            <IconComponent
                                className={`w-5 h-5 ${iconColorClass}`}
                            />
                        )}
                    </Link>
                </li>
            </ul>
        );
    } else {
        const isActive = currentPath === item.href;
        return (
            <ul
                className={`menu rounded-box max-2xl:w-11 w-66 group-hover:max-2xl:w-66`}>
                <li>
                    <Link
                        href={item.href || '#'}
                        className={`${isActive ? 'menu-active' : 'text-gray-400'} `}>
                        {IconComponent && (
                            <IconComponent
                                className={`w-5 h-5 ${iconColorClass}`}
                            />
                        )}
                        <span className="max-2xl:hidden group-hover:max-2xl:block">
                            {item.label}
                        </span>
                    </Link>
                </li>
            </ul>
        );
    }
}
