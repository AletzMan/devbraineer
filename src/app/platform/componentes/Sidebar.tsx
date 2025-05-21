'use client';
import { usePathname } from 'next/navigation';
import { MenuItem } from './MenuItem';
import { menuData } from '../constants';
import { Logo } from '@/app/components/Logo';
import Link from 'next/link';

export function Sidebar() {
    const path = usePathname();
    return (
        <aside className="z-50 w-67 hidden lg:block max-2xl:w-15 bg-(--color-base-100) h-svh overflow-y-auto overflow-x-hidden border-r-1 border-(--color-gray-700) scrollbar-thin transition-all duration-100 group hover:max-2xl:w-67">
            <Link
                href="/"
                aria-label="DevBraineer"
                title="DevBraineer"
                className="grid grid-cols-[2.5em_1fr] items-center gap-2 px-3 py-2 h-16 border-b-1 border-(--color-gray-700)">
                <Logo className="w-9 h-9 text-(--color-primary)" />
                <h1
                    className="items-center text-xl font-bold text-(--color-warning) max-2xl:hidden group-hover:max-2xl:flex"
                    style={{ fontFamily: 'var(--font-josefin-sans)' }}>
                    DevBraineer
                </h1>
            </Link>
            {
                <nav className="sticky top-4">
                    {menuData.map((item) => (
                        <MenuItem
                            key={item.label}
                            item={item}
                            currentPath={path}
                        />
                    ))}
                </nav>
            }
        </aside>
    );
}
