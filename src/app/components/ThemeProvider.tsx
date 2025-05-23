'use client';
import { createContext, useContext, useState, useLayoutEffect, ReactNode, useCallback } from 'react';

interface ThemeContextProps {
    theme: 'cupcake' | 'dark';
    toggleTheme: () => void;
}

interface ThemeProviderProps {
    children: ReactNode;
    defaultTheme?: 'dark' | 'cupcake';
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children, defaultTheme = 'cupcake' }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<'cupcake' | 'dark'>(() => {
        return (localStorage.getItem('theme') as 'cupcake' | 'dark') || defaultTheme;
    });

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
    const toggleTheme = useCallback(() => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'dark' ? 'cupcake' : 'dark';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    }, []);

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextProps => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme debe usarse dentro de un ThemeProvider');
    }
    return context;
};
