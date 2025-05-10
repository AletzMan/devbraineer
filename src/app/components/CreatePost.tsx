"use client"; // Este es un Client Component.

import { useUser } from "@clerk/nextjs"; // Para obtener información del usuario autenticado de Clerk
import { useRouter } from "next/navigation"; // Para redirigir después de crear el post
import { useState } from "react"; // Hook de React para estado local
import axios from "axios"; // Para hacer la petición POST a la API
import { PostType } from "@prisma/client"; // Importa el enum PostType para las opciones del formulario
import Link from "next/link"; // Para el enlace de regreso al feed

export default function CreatePost() {
    const { isSignedIn, isLoaded } = useUser();
    const router = useRouter();

    const [type, setType] = useState<PostType>(PostType.Challenge);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [language, setLanguage] = useState("");
    const [codeSnippet, setCodeSnippet] = useState("");
    const [url, setUrl] = useState("");
    const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (isLoaded && !isSignedIn) {
        router.push('/sign-in');
        return null;
    }

    if (!isLoaded || !isSignedIn) {
        return <div className="p-4 text-center text-gray-400">Cargando usuario...</div>;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);
        setError(null);

        const postData = {
            type: type,
            title: title,
            description: description,
            language: language || undefined,
            code_snippet: codeSnippet || undefined,
            url: url || undefined,
            pollOptions: type === PostType.Poll ? pollOptions.filter(opt => opt.trim() !== '') : undefined,
        };

        try {
            // --- CAMBIO AQUÍ: Llama a la API POST /api/posts ---
            const response = await axios.post("/api/posts", postData);

            // Asumiendo que tu capa de manejo de respuestas devuelve { error: boolean, response: any }
            if (response.data && response.data.error === false) {
                console.log("Publicación creada exitosamente:", response.data.response);
                router.push('/');
            } else if (response.status === 201) {
                console.log("Publicación creada exitosamente:", response.data);
                router.push('/');
            }
            else {
                console.error("Unexpected API response format:", response.data);
                setError("Failed to create post due to unexpected response format.");
            }

        } catch (err: any) {
            console.error("Error creating post:", err);
            if (axios.isAxiosError(err) && err.response && err.response.data) {
                setError(err.response.data.message || err.response.data || "An error occurred.");
            } else {
                setError("Failed to create post. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePollOptionChange = (index: number, value: string) => {
        const newOptions = [...pollOptions];
        newOptions[index] = value;
        setPollOptions(newOptions);
    };

    const addPollOption = () => {
        setPollOptions([...pollOptions, ""]);
    };

    const removePollOption = (index: number) => {
        const newOptions = pollOptions.filter((_, i) => i !== index);
        setPollOptions(newOptions);
    };


    return (
        <div className="p-4 max-w-2xl mx-auto bg-gray-900 text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center text-purple-400">Crear Nueva Publicación</h1>

            <div className="mb-6">
                <Link href="/" className="text-blue-400 hover:underline">
                    &larr; Volver al Feed
                </Link>
            </div>

            {error && (
                <div className="bg-red-800 text-red-200 p-4 rounded-md mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">
                        Tipo de Publicación
                    </label>
                    <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value as PostType)}
                        className="block w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        {Object.values(PostType).map((postType) => (
                            <option key={postType} value={postType}>
                                {postType.replace(/([A-Z])/g, ' $1').trim()}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                        Título
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={6}
                        className="block w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                        required
                    ></textarea>
                </div>

                {type === PostType.Challenge && (
                    <div>
                        <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-1">
                            Lenguaje (Opcional para Retos)
                        </label>
                        <input
                            type="text"
                            id="language"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="block w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                )}

                {type === PostType.Challenge && (
                    <div>
                        <label htmlFor="codeSnippet" className="block text-sm font-medium text-gray-300 mb-1">
                            Fragmento de Código (Opcional para Retos)
                        </label>
                        <textarea
                            id="codeSnippet"
                            value={codeSnippet}
                            onChange={(e) => setCodeSnippet(e.target.value)}
                            rows={8}
                            className="block w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white font-mono focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>
                )}

                {(type === PostType.Resource || type === PostType.EventMeetup) && (
                    <div>
                        <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-1">
                            URL (Opcional para Recursos/Eventos)
                        </label>
                        <input
                            type="url"
                            id="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="block w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                )}

                {type === PostType.Poll && (
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Opciones de Encuesta (Mínimo 2)
                        </label>
                        {pollOptions.map((option, index) => (
                            <div key={index} className="flex items-center mb-3">
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handlePollOptionChange(index, e.target.value)}
                                    className="block w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-blue-500 focus:border-blue-500 mr-2"
                                    required
                                />
                                {pollOptions.length > 2 && (
                                    <button
                                        type="button"
                                        onClick={() => removePollOption(index)}
                                        className="text-red-400 hover:text-red-500 focus:outline-none"
                                        aria-label={`Eliminar opción ${index + 1}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addPollOption}
                            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
                        >
                            + Añadir Opción
                        </button>
                    </div>
                )}

                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {isSubmitting ? 'Publicando...' : 'Publicar'}
                    </button>
                </div>
            </form>
        </div>
    );
}
