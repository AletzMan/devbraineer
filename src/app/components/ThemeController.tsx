'use client';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

export const ThemeController = () => {
    const { theme, setTheme } = useTheme();
    return (
        <label className="swap swap-rotate">
            <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={() => setTheme(theme === 'dark' ? 'cupcake' : 'dark')}
                className="theme-controller"
            />
            <SunIcon className="swap-off size-6 text-gray-600" />
            <MoonIcon className="swap-on size-6 text-gray-400" />
        </label>
    );
};
