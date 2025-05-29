'use client';
import { Sidebar } from './componentes/Sidebar';
import Header from './componentes/Header';

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="relative grid grid-cols-[19.05em_1fr] max-2xl:grid-cols-[3.75em_1fr] max-lg:grid-cols-1 min-h-svh  preview overflow-hidden w-full  transition-all duration-100">
            <Sidebar />
            <main className="relative h-[calc(100vh-4rem)]">
                <Header />
                {children}
            </main>
        </section>
    );
}
