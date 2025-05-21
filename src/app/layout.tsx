import type { Metadata } from 'next';
import { Jost, Josefin_Sans, Inconsolata } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';

const jost = Jost({
    variable: '--font-jost',
    subsets: ['latin'],
});

const josefinSans = Josefin_Sans({
    variable: '--font-josefin-sans',
    subsets: ['latin'],
});

const code = Inconsolata({
    variable: '--font-code',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'DevBraineer',
    description: 'Plataforma de desarrollo, recursos y aprendizaje',
    icons: {
        icon: '/LogoDevBraineer.svg',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-theme="dark">
            <ClerkProvider>
                <body
                    className={`${jost.variable} ${josefinSans.variable} ${code.variable} antialiased`}>
                    {children}
                </body>
            </ClerkProvider>
        </html>
    );
}
