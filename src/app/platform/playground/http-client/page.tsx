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
    deleteHistoryItemFromLocalStorageByDate,
    getHistoryFromLocalStorage,
    saveHistoryToLocalStorage,
} from '@/lib/storage';
import { RequestHistory } from '@prisma/client';
import { EllipsisIcon, SaveIcon, TrashIcon } from 'lucide-react';
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
                created_at: new Date(),
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
                    created_at: new Date(),
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

    const formatDisplayDate = (dateString: string) => {
        const today = new Date();
        const entryDate = new Date(dateString);

        // Resetear horas para comparaci
        today.setHours(0, 0, 0, 0);
        entryDate.setHours(0, 0, 0, 0);

        const diffTime = today.getTime() - entryDate.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        const dayOfWeekFormatter = new Intl.DateTimeFormat('es-ES', { weekday: 'long' });
        const dayAndMonthFormatter = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long' });
        const fullDateFormatter = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

        if (diffDays === 0) {
            return 'Hoy';
        } else if (diffDays === 1) {
            return 'Ayer';
        } else if (diffDays > 1 && diffDays <= 6) {
            const todayDay = today.getDay();
            const entryDay = entryDate.getDay();
            const dayDifferenceInWeek = todayDay - entryDay;

            if (dayDifferenceInWeek > 0 && dayDifferenceInWeek < 7) {
                return dayOfWeekFormatter.format(entryDate);
            } else if (dayDifferenceInWeek < 0) {
            }
        }

        if (entryDate.getFullYear() === new Date().getFullYear()) {
            return dayAndMonthFormatter.format(entryDate);
        }

        return fullDateFormatter.format(entryDate);
    };
    const formatDateToYYYYMMDD = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };
    const groupedHistory = useMemo(() => {
        const groups: { [key: string]: RequestHistory[] } = {};
        history.forEach((entry) => {
            const dateKey = formatDateToYYYYMMDD(entry.created_at.toString());
            if (!groups[dateKey]) {
                groups[dateKey] = [];
            }
            groups[dateKey].push(entry);
        });
        const sortedGroupKeys = Object.keys(groups).sort((a, b) => b.localeCompare(a));
        return sortedGroupKeys.map((date) => ({
            date: date,
            displayDate: formatDisplayDate(date),
            entries: groups[date],
        }));
    }, [history]);

    const handleDeleteHistoryByDate = (e: React.MouseEvent, date: string) => {
        e.stopPropagation();
        const updatedHistory = deleteHistoryItemFromLocalStorageByDate(date);
        setHistory(updatedHistory);
    };

    return (
        <div className="max-w-(--max-width) mx-auto flex flex-col h-[calc(100svh-3.8rem)] flex-grow overflow-y-auto scrollbar-thin">
            <HeaderSection title="HTTP Client" description="Envía y gestiona tus peticiones HTTP con facilidad." />
            <div className="grid grid-cols-[300px_1fr] gap-2 p-2 max-md:flex max-md:flex-col">
                <aside className="bg-base-100 shadow-md rounded-sm p-4 h-[calc(100svh-9.5rem)] ">
                    <header className="flex justify-between items-center mb-2 border-b border-gray-700 pb-2">
                        <h3 className="font-semibold">Historial de Peticiones</h3>
                        <div className="tooltip" data-tip="Eliminar todo el historial">
                            <button
                                className="btn btn-xs btn-ghost btn-circle btn-error"
                                onClick={() => deleteHistory()}>
                                <TrashIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </header>
                    <div className="overflow-y-auto scrollbar-thin h-[calc(100svh-13rem)] ">
                        {history.length === 0 ? (
                            <p className="text-sm text-gray-400">Aún no hay historial.</p>
                        ) : (
                            <motion.div layoutRoot layout className="space-y-2 w-full">
                                {groupedHistory.map((dayGroup, index) => (
                                    <div
                                        key={dayGroup.date}
                                        className="collapse collapse-arrow bg-base-200 rounded-sm w-full">
                                        <input
                                            type="checkbox"
                                            name={`tabHistory-${dayGroup.date}`}
                                            defaultChecked={index === 0}
                                        />
                                        <div className="collapse-title flex gap-2 items-center justify-between text-sm">
                                            <span className="w-full text-gray-300">{dayGroup.displayDate}</span>
                                            <span className="badge badge-accent badge-soft badge-sm text-xs">
                                                {dayGroup.entries.length}
                                            </span>
                                        </div>

                                        <motion.div layout className="collapse-content overflow-hidden">
                                            <div className="tooltip" data-tip="Eliminar peticiones">
                                                <motion.button
                                                    layout={false}
                                                    className="btn btn-xs btn-ghost btn-error btn-circle"
                                                    onClick={(e) => handleDeleteHistoryByDate(e, dayGroup.date)}>
                                                    <TrashIcon className="w-4 h-4" />
                                                </motion.button>
                                            </div>
                                            <AnimatePresence>
                                                <motion.ul layout className="flex flex-col gap-1 pt-2">
                                                    {dayGroup.entries.map((entry) => (
                                                        <motion.li
                                                            key={entry.id}
                                                            layout
                                                            initial={{ opacity: 1, y: 0, height: 'auto' }}
                                                            exit={{
                                                                opacity: 0,
                                                                y: -50,
                                                                height: 0,
                                                                transition: { duration: 0.3 },
                                                            }}
                                                            transition={{ duration: 0.3 }}
                                                            title={entry.url}
                                                            className="relative py-2 cursor-pointer bg-base-300 hover:bg-base-content/20 px-2 rounded transition-colors duration-200"
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
                                                            <div className="absolute top-0 right-0 dropdown dropdown-start dropdown-left">
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
                                                                    className="dropdown-content text-xs menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-sm">
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
                                                            <div className="flex flex-col gap-2 text-xs">
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
                                                                <span className="text-blue-500 text-xs text-ellipsis overflow-hidden whitespace-nowrap w-[210px]">
                                                                    {entry.url}
                                                                </span>
                                                            </div>
                                                            <div className="text-xs text-gray-500 mt-1.5">
                                                                {new Date(entry.created_at).toLocaleString()}
                                                            </div>
                                                        </motion.li>
                                                    ))}
                                                </motion.ul>
                                            </AnimatePresence>
                                        </motion.div>
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
