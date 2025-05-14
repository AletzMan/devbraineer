// src/app/dashboard/page.tsx
"use client";

import { useUser, UserProfile } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { dark } from "@clerk/themes";

export default function DashboardPage() {
    const { isSignedIn, user, isLoaded } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && isSignedIn && user) {
            console.log(user);
            const syncUserWithDB = async () => {
                try {
                    const email = user.emailAddresses[0]?.emailAddress;
                    const username = user.username;

                    // --- CAMBIO AQUÍ: Usando Axios ---
                    const response = await axios.post("/api/users/sync-clerk-user", {
                        email,
                        username,
                    });

                    if (response.status !== 200) { // Axios usa 'status' para el código de estado
                        console.error("Error al sincronizar usuario con Prisma DB:", response.statusText); // Axios no tiene response.statusText en todas las respuestas de error de red
                        // Para errores, Axios lanza una excepción si la respuesta no es 2xx
                        // Por lo que este 'if' se puede simplificar a un bloque try/catch
                    } else {
                        const syncedUser = response.data; // Axios devuelve los datos directamente en .data
                        console.log("Usuario sincronizado exitosamente con Prisma DB:", syncedUser);
                    }
                } catch (error: any) { // Usamos 'any' para un manejo simple de errores en un hackathon
                    console.error("Error al llamar a la API de sincronización:", error);
                    if (axios.isAxiosError(error) && error.response) {
                        console.error("Detalles del error de Axios:", error.response.data);
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
        <UserProfile appearance={{ baseTheme: dark }} />

    );
}