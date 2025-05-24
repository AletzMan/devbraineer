import { getTime24hFromDate } from '@/lib/helpers';
import {
    deleteHistoryFromLocalStorage,
    deleteHistoryItemFromLocalStorage,
    deleteHistoryItemFromLocalStorageByDate,
} from '@/lib/storage';
import { RequestHistory } from '@prisma/client';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleOff, EllipsisIcon, FoldersIcon, HistoryIcon, SaveIcon, TrashIcon } from 'lucide-react';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';

interface SideBarHistoryProps {
    history: RequestHistory[];
    setHistory: Dispatch<SetStateAction<RequestHistory[]>>;
    setFormState: Dispatch<
        SetStateAction<{ method: string; url: string; headers: { key: string; value: string }[]; body: string } | null>
    >;
}

export default function SideBarHistory({ history, setHistory, setFormState }: SideBarHistoryProps) {
    const [activeTab, setActiveTab] = useState<'history' | 'collections' | 'others'>('history');

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
        <aside className="bg-base-100 shadow-md rounded-sm h-full border border-base-300">
            <div className="grid grid-cols-[60px_1fr]">
                <div className="grid grid-rows-[repeat(auto-fill,minmax(55px,1fr))] border-r border-base-300">
                    <button
                        className={`flex flex-col gap-1 w-full h-[55px] items-center justify-center hover:bg-base-200 cursor-pointer border-b border-base-300 ${
                            activeTab === 'history' ? 'bg-base-200' : ''
                        }`}
                        onClick={() => setActiveTab('history')}>
                        <HistoryIcon className="w-4 h-4" />
                        <span className="text-xs">Historial</span>
                    </button>
                    <button
                        className={`flex flex-col gap-1 w-full h-[55px] items-center justify-center hover:bg-base-200 cursor-pointer border-b border-base-300 ${
                            activeTab === 'collections' ? 'bg-base-200' : ''
                        }`}
                        onClick={() => setActiveTab('collections')}>
                        <FoldersIcon className="w-4 h-4" />
                        <span className="text-xs">Colección</span>
                    </button>
                    <button
                        className={`flex flex-col gap-1 w-full h-[55px] items-center justify-center hover:bg-base-200 cursor-pointer border-b border-base-300 ${
                            activeTab === 'others' ? 'bg-base-200' : ''
                        }`}
                        onClick={() => setActiveTab('others')}>
                        <EllipsisIcon className="w-4 h-4" />
                        <span className="text-xs">Otras</span>
                    </button>
                </div>

                {activeTab === 'history' && (
                    <div className="flex flex-col p-2">
                        <header className="flex justify-between items-center mb-2 border-b border-base-300 pb-2">
                            <h3 className="font-semibold">Historial de Peticiones</h3>
                            <div className="tooltip" data-tip="Eliminar todo el historial">
                                <button
                                    className="btn btn-xs btn-ghost btn-circle btn-error"
                                    onClick={() => deleteHistory()}>
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </header>
                        <div className="overflow-y-auto scrollbar-thin h-[calc(100svh-10rem)] ">
                            {history.length === 0 ? (
                                <p className="flex flex-col items-center justify-center gap-2 text-md w-full text-center pt-9">
                                    <CircleOff className="mx-auto size-14" />
                                    Aún no hay historial.
                                </p>
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
                                                <div className="tooltip" data-tip="Eliminar peticiones ">
                                                    <motion.button
                                                        layout={false}
                                                        className="btn btn-xs btn-ghost btn-error btn-circle"
                                                        onClick={(e) => handleDeleteHistoryByDate(e, dayGroup.date)}>
                                                        <TrashIcon className="w-4 h-4" />
                                                    </motion.button>
                                                </div>
                                                <AnimatePresence>
                                                    <motion.ul layout className="flex flex-col gap-1">
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
                                                                className="relative p-1 cursor-pointer bg-base-100 hover:bg-gray-700/20 px-2 rounded transition-colors duration-200"
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
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex text-xs text-gray-500 w-full ">
                                                                        {getTime24hFromDate(entry.created_at)}
                                                                    </div>
                                                                    <div className="dropdown dropdown-start dropdown-left">
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
                                                                </div>
                                                                <div className="flex flex-row items-center gap-2 text-xs">
                                                                    <span
                                                                        className={`font-semibold badge badge-soft badge-sm rounded-sm ${
                                                                            entry.method === 'GET'
                                                                                ? 'badge-success'
                                                                                : entry.method === 'POST'
                                                                                  ? 'badge-primary'
                                                                                  : entry.method === 'PUT'
                                                                                    ? 'badge-warning'
                                                                                    : entry.method === 'DELETE'
                                                                                      ? 'badge-error'
                                                                                      : 'badge-secondary'
                                                                        }`}>
                                                                        {entry.method}
                                                                    </span>
                                                                    <span className="text-gray-300 text-xs text-ellipsis overflow-hidden whitespace-nowrap w-[210px]">
                                                                        {entry.url}
                                                                    </span>
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
                    </div>
                )}
                {activeTab === 'collections' && (
                    <div className="flex flex-col p-2">
                        <header className="flex justify-between items-center mb-2 border-b border-base-300 pb-2">
                            <h3 className="font-semibold">Colecciones</h3>
                            <div className="tooltip" data-tip="Eliminar todo el historial">
                                <button
                                    className="btn btn-xs btn-ghost btn-circle btn-error"
                                    onClick={() => deleteHistory()}>
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </header>
                    </div>
                )}
                {activeTab === 'others' && (
                    <div className="flex flex-col p-2">
                        <header className="flex justify-between items-center mb-2 border-b border-base-300 pb-2">
                            <h3 className="font-semibold">Otras</h3>
                            <div className="tooltip" data-tip="Eliminar todo el historial">
                                <button
                                    className="btn btn-xs btn-ghost btn-circle btn-error"
                                    onClick={() => deleteHistory()}>
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </header>
                    </div>
                )}
            </div>
        </aside>
    );
}
