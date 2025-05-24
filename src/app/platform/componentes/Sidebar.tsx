'use client';
import { usePathname } from 'next/navigation';
import { MenuItem } from './MenuItem';
import { menuData } from '../constants';
import { Logo, NameLogo } from '@/app/components/Logo';
import Link from 'next/link';

export function Sidebar() {
    const path = usePathname();
    return (
        <aside className="relative z-50 w-67 hidden lg:block max-2xl:w-15 bg-base-100 h-svh overflow-y-auto overflow-x-hidden border-r-1 border-base-200 scrollbar-thin transition-all duration-100 group hover:max-2xl:w-67">
            <Link
                href="/"
                aria-label="DevBraineer"
                title="DevBraineer"
                className="grid grid-cols-[2.5em_1fr] items-center gap-2 px-3 py-2 h-16 border-b-1 border-base-300">
                <Logo className="w-9 h-9 text-primary" />
                <NameLogo className="md:w-35  text-warning stroke-2 group-hover:${styles.spinSlow}" />
            </Link>
            <nav className="sticky top-4">
                {menuData.map((item) => (
                    <MenuItem key={item.label} item={item} currentPath={path} />
                ))}
            </nav>
        </aside>
    );
}
