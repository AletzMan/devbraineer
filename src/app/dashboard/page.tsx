// src/app/dashboard/page.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DashboardPage() {
    const { isSignedIn, user, isLoaded } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && isSignedIn && user) {
            const syncUserWithDB = async () => {
                try {
                    const email = user.emailAddresses[0]?.emailAddress;
                    const username = user.username || (email ? email.split('@')[0] : 'unknown_user');

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
        <div className="p-4 max-w-2xl mx-auto bg-gray-800 text-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4 text-center">
                ¡Bienvenido a DevBraineer, {user.firstName || user.username || 'Desarrollador'}!
            </h1>
            <p className="mb-2">Tu ID de Clerk: <span className="font-mono text-purple-300">{user.id}</span></p>
            <p className="mb-4">Tu email: <span className="font-mono text-purple-300">{user.emailAddresses[0]?.emailAddress}</span></p>

            <div className="mt-8 p-6 bg-gray-700 rounded-md">
                <h2 className="text-xl font-semibold mb-3">¡Tu Dashboard!</h2>
                <p className="text-gray-300">
                    Aquí podrás ver un resumen de tus retos, tu perfil y otras funcionalidades.
                    El sistema acaba de sincronizar tu cuenta con nuestra base de datos.
                </p>
                <div className="mt-4">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Ver Retos
                    </button>
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-2">
                        Crear Reto
                    </button>
                </div>
            </div>
        </div>
    );
}