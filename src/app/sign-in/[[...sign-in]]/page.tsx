'use client';

import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export default function SignInPage() {
    return (
        <main className="flex items-center justify-center h-svh main">
            <SignIn
                appearance={{
                    baseTheme: dark, // Tema oscuro de Clerk
                    variables: {
                        // Colores principales de tu UI
                        colorPrimary: '#8B5CF6', // Un púrpura/violeta (ej. purple-500/600)
                        colorText: '#e2e8f0', // gray-200 o gray-100 para texto
                        colorBackground: '#1a202c', // Un gris oscuro como gray-900/800 para el fondo del card
                        colorInputBackground: '#1f2937', // Un gris ligeramente más claro para los inputs
                        colorInputText: '#f8fafc', // white o gray-50 para texto de input
                    },
                    elements: {
                        // Sobrescribir estilos de elementos específicos para mayor control
                        formButtonPrimary:
                            'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg',
                        socialButtonsBlockButton:
                            'bg-gray-950 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-600',
                        card: 'bg-gray-800/60 backdrop-blur-sm border border-gray-700 shadow-2xl', // Similar a tus tarjetas
                        headerTitle: 'text-white font-bold',
                        headerSubtitle: 'text-gray-400',
                        footerActionText: 'text-gray-400',
                        footerActionLink: 'text-blue-400 hover:text-blue-500',
                        formFieldInput: 'focus:ring-blue-500 focus:border-blue-500', // Resalta el input al enfocar
                    },
                }}
            />
        </main>
    );
}
