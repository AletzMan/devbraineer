"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { PostType } from "@prisma/client";
import { TypePost, supportedLanguages } from "@/lib/constants";
import { LinkIcon, XIcon } from "lucide-react";

interface CreatePostProps {
    type: PostType;
    onClose: () => void;
}

export default function CreatePost({ type, onClose }: CreatePostProps) {
    const { isSignedIn, isLoaded } = useUser();
    const router = useRouter();
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

    const handleCancel = () => {
        setTitle("");
        setDescription("");
        setLanguage("");
        setCodeSnippet("");
        setPollOptions(["", ""]);
        setUrl("");
        onClose();
    };


    return (
        <div className="text-white w-[90svw]">
            <h1 className="flex items-center gap-2 text-lg font-semibold mb-2 text-center text-blue-200">{TypePost[PostType[type]].icon}{`  ${TypePost[PostType[type]].title}`}</h1>
            <div className="divider divider-neutral"></div>
            <form onSubmit={handleSubmit} className="space-y-2 w-full max-h-[90svh]">
                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-start">Título</legend>
                    <input
                        type="text"
                        placeholder="Escribe aquí el título de tu publicación"
                        className="input input-neutral w-full placeholder:italic"
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-start">Descripción</legend>
                    <textarea
                        placeholder="Describe aquí los detalles de tu publicación"
                        className="textarea textarea-neutral w-full placeholder:italic"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={6}
                        required
                    />
                </fieldset>
                {type === PostType.Challenge && (
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-start">Lenguaje</legend>
                        <select
                            id="language"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className={`select select-neutral w-full placeholder:italic ${language === '' ? 'italic text-white/50' : 'not-italic'}`}
                        >
                            <option value="">Selecciona un lenguaje</option>
                            {supportedLanguages.map(lang => (
                                <option key={lang} value={lang} className="text-white not-italic">{lang}</option>
                            ))}
                        </select>
                    </fieldset>
                )}

                {type === PostType.Challenge && (
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-start">Código</legend>
                        <textarea
                            placeholder="Pega aquí el fragmento de código del reto"
                            className="textarea textarea-neutral  w-full placeholder:italic"
                            id="codeSnippet"
                            value={codeSnippet}
                            onChange={(e) => setCodeSnippet(e.target.value)}
                            rows={8}
                            required
                        />
                    </fieldset>
                )}

                {(type === PostType.Resource || type === PostType.EventMeetup) && (
                    <fieldset className="fieldset flex gap-0 flex-col items-start ">
                        <legend className="fieldset-legend text-start">URL</legend>
                        <label className="input validator w-full placeholder:italic">
                            <LinkIcon className="opacity-50" />
                            <input
                                type="url"
                                placeholder={`Introduce la URL del ${TypePost[PostType[type]].title.split(" ")[2]}`}
                                className="input input-neutral w-full placeholder:italic"
                                pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
                                title="La URL debe ser válida (ej: https://miweb.com)"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                            />
                        </label>
                        <p className="validator-hint">Debe ser una URL válida (ej: https://miweb.com)</p>
                    </fieldset>
                )}

                {type === PostType.Poll && (
                    <div className="relative">
                        <button
                            type="button"
                            onClick={addPollOption}
                            className="btn btn-secondary btn-xs absolute right-0"
                        >
                            + Añadir Opción
                        </button>
                        <fieldset className="fieldset h-66 overflow-y-auto">
                            <legend className="fieldset-legend text-start">Opciones de Encuesta (Mínimo 2)</legend>
                            {pollOptions.map((option, index) => (
                                <div key={index} className="flex items-center mb-3 gap-2">
                                    <input
                                        placeholder={`Opción ${index + 1}`}
                                        className="input input-neutral w-full placeholder:italic"
                                        id="codeSnippet"
                                        value={option}
                                        onChange={(e) => handlePollOptionChange(index, e.target.value)}
                                        required
                                    />
                                    {pollOptions.length > 2 && (
                                        <button
                                            type="button"
                                            onClick={() => removePollOption(index)}
                                            className="btn btn-square btn-error btn-soft btn-xs"
                                            aria-label={`Eliminar opción ${index + 1}`}
                                        >
                                            <XIcon />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </fieldset>

                    </div>
                )}

                <div className="flex justify-around">
                    <button
                        type="button"
                        className="btn btn-secondary btn-outline"
                        disabled={isSubmitting}
                        onClick={handleCancel}
                    >Cancelar</button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary"
                    >
                        {isSubmitting && <span className="loading loading-spinner"></span>}
                        {isSubmitting ? 'Publicando...' : 'Publicar'}
                    </button>
                </div>
            </form>
        </div>
    );
}
