'use client';
import { UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { usePathname } from 'next/navigation';

export default function Header() {
    const path = usePathname();
    return (
        <header className=" flex items-center justify-between h-16 w-full bg-(--color-base-100) border-b-1 border-(--color-gray-700) z-50 px-2">
            <div className="breadcrumbs text-sm">
                <ul>
                    {path.split('/').map(
                        (item, index) =>
                            index > 0 && (
                                <li
                                    key={index}
                                    className="capitalize text-yellow-400">
                                    {index === path.split('/').length - 1 &&
                                        item}
                                    {index > 0 &&
                                        index < path.split('/').length - 1 && (
                                            <a
                                                className="text-gray-400"
                                                href={`/${item}`}>
                                                {item}
                                            </a>
                                        )}
                                </li>
                            )
                    )}
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
