'use client';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RequestForm } from './components/RequestForm';
import { ResponseViewer } from './components/ResponseViewer';
import HeaderSection from '../../componentes/HeaderSection';
import { saveRequestToHistory } from '@/services/httpRequest.service';
import {
    deleteHistoryFromLocalStorage,
    deleteHistoryItemFromLocalStorage,
    getHistoryFromLocalStorage,
    saveHistoryToLocalStorage,
} from '@/lib/storage';
import { RequestHistory } from '@prisma/client';
import head from 'next/head';
import { EllipsisIcon, SaveIcon, TrashIcon } from 'lucide-react';
import { randomUUID } from 'node:crypto';
import { useAuth } from '@clerk/nextjs';

export default function HttpClientPage() {
    const { userId } = useAuth();
    const [response, setResponse] = useState({
        status: 0,
        statusText: '',
        headers: {},
        body: {},
    });

    const [history, setHistory] = useState<RequestHistory[]>([]);

    const [formState, setFormState] = useState<{
        method: string;
        url: string;
        headers: { key: string; value: string }[];
        body: string;
    } | null>(null);

    useEffect(() => {
        const savedHistory = getHistoryFromLocalStorage();
        setHistory(savedHistory);
    }, []);

    const sendRequest = async ({ method, url, headers, body }: any) => {
        try {
            const formattedHeaders: Record<string, string> = {};
            headers.forEach((h: any) => {
                if (h.key && h.value) formattedHeaders[h.key] = h.value;
            });

            const res = await axios.post('/api/proxy', {
                method,
                url,
                headers: formattedHeaders,
                body: body ? JSON.parse(body) : undefined,
            });

            const responseData = res.data.data;
            console.log(responseData);
            setResponse({
                status: responseData.status,
                statusText: responseData.statusText,
                headers: responseData.headers,
                body: responseData.data,
            });

            saveHistoryToLocalStorage({
                method,
                url,
                headers,
                body,
                response: JSON.stringify(responseData),
                created_at: new Date(new Date().getTime() - 48 * 60 * 60 * 1000),
                id: crypto.randomUUID(),
                userId: userId || '',
            });

            setHistory((prev) => [
                ...prev,
                {
                    method,
                    url,
                    headers,
                    body,
                    response: JSON.stringify(responseData),
                    created_at: new Date(new Date().getTime() - 48 * 60 * 60 * 1000),
                    id: crypto.randomUUID(),
                    userId: userId || '',
                },
            ]);
        } catch (err: any) {
            setResponse({
                status: 0,
                statusText: 'Error de red o JSON inválido',
                headers: {},
                body: { message: err.message },
            });
        }
    };

    const deleteHistoryItem = (id: string) => {
        deleteHistoryItemFromLocalStorage(id);
        setHistory((prev) => prev.filter((h) => h.id !== id));
    };

    const deleteHistory = () => {
        deleteHistoryFromLocalStorage();
        setHistory([]);
    };

    const formatDisplayDate = (dateString: string): string => {
        const today = new Date();
        const entryDate = new Date(dateString);

        // Resetear horas para comparación de días
        today.setHours(0, 0, 0, 0);
        entryDate.setHours(0, 0, 0, 0);

        const diffTime = today.getTime() - entryDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return 'Hoy';
        } else if (diffDays === 1) {
            return 'Ayer';
        } else {
            const options: Intl.DateTimeFormatOptions = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };
            return entryDate.toLocaleDateString('es-ES', options);
        }
    };
    const formatDateToYYYYMMDD = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Ejemplo: "2024-05-21"
    };
    // Agrupar el historial por día usando useMemo para optimizar
    const groupedHistory = useMemo(() => {
        const groups: { [key: string]: RequestHistory[] } = {};
        history.forEach((entry) => {
            const dateKey = formatDateToYYYYMMDD(entry.created_at.toString());
            if (!groups[dateKey]) {
                groups[dateKey] = [];
            }
            groups[dateKey].push(entry);
        });
        // Ordenar los grupos por fecha (más reciente primero)
        const sortedGroupKeys = Object.keys(groups).sort((a, b) => b.localeCompare(a));
        // Mapear a un array de objetos para una fácil iteración en JSX
        return sortedGroupKeys.map((date) => ({
            date: date,
            displayDate: formatDisplayDate(date),
            entries: groups[date],
        }));
    }, [history]);

    /*
    <motion.div layout className="space-y-4">
                                {history.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.2 }}
                                        className="p-4 bg-white rounded-lg shadow">
                                        <div className="flex justify-between items-center mb-2">
     */

    return (
        <div className="max-w-(--max-width) mx-auto flex flex-col h-[calc(100svh-3.8rem)] flex-grow overflow-y-auto scrollbar-thin">
            <HeaderSection title="HTTP Client" description="Envía y gestiona tus peticiones HTTP con facilidad." />
            <div className="grid grid-cols-[300px_1fr] gap-2 p-2 max-md:flex max-md:flex-col">
                <aside className="bg-base-100 shadow-md rounded-sm p-4 h-[calc(100svh-9.5rem)]">
                    <h3 className="font-semibold mb-2">Historial de Peticiones</h3>
                    <div className="overflow-y-auto scrollbar-thin h-[calc(100svh-13rem)] overflow-x-hidden">
                        {history.length === 0 ? (
                            <p className="text-sm text-gray-400">Aún no hay historial.</p>
                        ) : (
                            <motion.div layout className="space-y-2">
                                {' '}
                                {/* Usar space-y para la separación entre collapses */}
                                {groupedHistory.map((dayGroup) => (
                                    // Cada grupo de día ahora es un componente DaisyUI collapse
                                    <div key={dayGroup.date} className="collapse collapse-plus bg-base-200">
                                        <input type="checkbox" />
                                        <div className="collapse-title text-md font-medium">
                                            {dayGroup.displayDate} ({dayGroup.entries.length})
                                        </div>
                                        <div className="collapse-content">
                                            {/* Aquí AnimatePresence sigue siendo clave para los items dentro del collapse */}
                                            <AnimatePresence>
                                                <ul className="flex flex-col gap-1 pt-2">
                                                    {' '}
                                                    {/* Añadido pt-2 para un poco de espacio */}
                                                    {dayGroup.entries.map((entry) => (
                                                        <motion.li
                                                            key={entry.id}
                                                            layout
                                                            initial={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -50 }}
                                                            transition={{ duration: 0.3 }}
                                                            title={entry.url}
                                                            className="relative py-2 cursor-pointer bg-base-300 hover:bg-base-content/20 px-2 rounded border border-gray-800"
                                                            onClick={() =>
                                                                setFormState({
                                                                    method: entry.method,
                                                                    url: entry.url,
                                                                    headers:
                                                                        (entry.headers as {
                                                                            key: string;
                                                                            value: string;
                                                                        }[]) || [],
                                                                    body: entry.body || '',
                                                                })
                                                            }>
                                                            {/* Menú de opciones (dropdown) */}
                                                            <div className="absolute top-0 right-0 dropdown dropdown-end">
                                                                <div
                                                                    tabIndex={0}
                                                                    role="button"
                                                                    className="btn btn-xs btn-ghost m-1"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                    }}>
                                                                    <EllipsisIcon className="size-5 text-gray-400" />
                                                                </div>
                                                                <ul
                                                                    tabIndex={0}
                                                                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-sm">
                                                                    <li>
                                                                        <button>
                                                                            <SaveIcon className="size-5 text-gray-400" />{' '}
                                                                            Guardar en colección
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                deleteHistoryItem(entry.id);
                                                                            }}>
                                                                            <TrashIcon className="size-5 text-gray-400" />{' '}
                                                                            Eliminar
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>

                                                            {/* Contenido del elemento de la lista */}
                                                            <div className="flex flex-col gap-2 text-sm">
                                                                <span
                                                                    className={`font-semibold ${
                                                                        entry.method === 'GET'
                                                                            ? 'text-green-500'
                                                                            : entry.method === 'POST'
                                                                              ? 'text-blue-500'
                                                                              : entry.method === 'PUT'
                                                                                ? 'text-yellow-500'
                                                                                : entry.method === 'DELETE'
                                                                                  ? 'text-red-500'
                                                                                  : 'text-gray-500'
                                                                    }`}>
                                                                    {entry.method}
                                                                </span>
                                                                <span className="text-blue-500 text-xs text-ellipsis overflow-hidden whitespace-nowrap w-[235px]">
                                                                    {entry.url}
                                                                </span>
                                                            </div>
                                                            <div className="text-xs text-gray-500 mt-1.5">
                                                                {new Date(entry.created_at).toLocaleString()}
                                                            </div>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </aside>
                <div className="flex flex-col gap-2 ">
                    <section className="bg-base-100 shadow-md rounded-sm p-4 space-y-4">
                        <RequestForm onSend={sendRequest} initialValues={formState || undefined} />
                    </section>
                    <section className="bg-base-100 shadow-md rounded-sm p-4 ">
                        <ResponseViewer response={response} />
                    </section>
                </div>
            </div>
        </div>
    );
}
