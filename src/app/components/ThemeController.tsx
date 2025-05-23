'use client';
import { useTheme } from '@/app/components/ThemeProvider';
import { MoonIcon, SunIcon } from 'lucide-react';

export const ThemeController = () => {
    const { toggleTheme, theme } = useTheme();
    const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    return (
        <label className="swap swap-rotate">
            <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={() => toggleTheme()}
                className="theme-controller hidden"
            />
            <SunIcon className="swap-off size-6 text-gray-600" />
            <MoonIcon className="swap-on size-6 text-gray-400" />
        </label>
    );
};
