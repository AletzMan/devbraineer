import type { Metadata } from 'next';
import { Jost, Josefin_Sans, Inconsolata } from 'next/font/google';
import './globals.css';
import '@ihatecode/react-splitter/lib/style.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from 'next-themes';
const jost = Jost({ variable: '--font-jost', subsets: ['latin'] });
const josefinSans = Josefin_Sans({ variable: '--font-josefin-sans', subsets: ['latin'] });
const code = Inconsolata({ variable: '--font-code', subsets: ['latin'] });
import 'rc-slider/assets/index.css';

export const metadata: Metadata = {
    title: 'DevBraineer',
    description: 'Plataforma de desarrollo, recursos y aprendizaje',
    icons: {
        icon: '/LogoDevBraineer.svg',
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" data-theme="dark" style={{ colorScheme: 'dark' }}>
            <ClerkProvider>
                <body className={`${jost.variable} ${josefinSans.variable} ${code.variable} antialiased`}>
                    <ThemeProvider attribute="data-theme">{children}</ThemeProvider>
                </body>
            </ClerkProvider>
        </html>
    );
}
