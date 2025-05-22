// src/app/dashboard/page.tsx
'use client';

import { useUser, UserProfile } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { dark } from '@clerk/themes';
import Header from '@/app/platform/componentes/Header';
import { Sidebar } from '@/app/platform/componentes/Sidebar';

export default function DashboardPage() {
    const { isSignedIn, user, isLoaded } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && isSignedIn && user) {
            const syncUserWithDB = async () => {
                try {
                    const email = user.emailAddresses[0]?.emailAddress;
                    const username = user.username;

                    const response = await axios.post('/api/users/sync-clerk-user', {
                        email,
                        username,
                    });

                    if (response.status !== 200) {
                        console.error('Error al sincronizar usuario con Prisma DB:', response.statusText);
                    } else {
                        const syncedUser = response.data;
                    }
                } catch (error) {
                    console.error('Error al llamar a la API de sincronización:', error);
                    if (axios.isAxiosError(error) && error.response) {
                        console.error('Detalles del error de Axios:', error.response.data);
                    }
                }
            };

            syncUserWithDB();
        } else if (isLoaded && !isSignedIn) {
            router.push('/sign-in');
        }
    }, [isLoaded, isSignedIn, user, router]);

    if (!isLoaded) {
        return <div className="p-4 text-center">Cargando datos del usuario...</div>;
    }

    if (!isSignedIn) {
        return <div className="p-4 text-center">No has iniciado sesión. Redirigiendo...</div>;
    }

    return (
        <section className="relative grid grid-cols-[16.75em_1fr] max-2xl:grid-cols-[3.75em_1fr] max-lg:grid-cols-1 min-h-svh bg-(--color-base-300) text-white overflow-hidden w-full  transition-all duration-100">
            <Sidebar />
            <main className="relative w-full bg-(--color-base-300)">
                <Header />
                <UserProfile appearance={{ baseTheme: dark }} />
            </main>
        </section>
    );
}
