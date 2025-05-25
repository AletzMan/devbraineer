import { getTime24hFromDate } from '@/lib/helpers';
import {
    deleteHistoryFromLocalStorage,
    deleteHistoryItemFromLocalStorage,
    deleteHistoryItemFromLocalStorageByDate,
} from '@/lib/storage';
import { RequestHistory } from '@prisma/client';
import { AnimatePresence, motion } from 'framer-motion';
import {
    CircleOff,
    EllipsisIcon,
    FolderIcon,
    FoldersIcon,
    HistoryIcon,
    InfoIcon,
    LucideProps,
    SaveIcon,
    Trash2Icon,
    TrashIcon,
} from 'lucide-react';
import { Dispatch, ForwardRefExoticComponent, RefAttributes, SetStateAction, useMemo, useState } from 'react';
import { useCollections } from './hooks/useCollections';
import { useHTTPClientStore } from './hooks/storeHTTPClient';

interface SideBarHistoryProps {
    history: RequestHistory[];
    setHistory: Dispatch<SetStateAction<RequestHistory[]>>;
    setFormState: Dispatch<
        SetStateAction<{ method: string; url: string; headers: { key: string; value: string }[]; body: string } | null>
    >;
}

type ModalType =
    | 'save-collection'
    | 'delete-collection'
    | 'delete-history'
    | 'delete-all-history'
    | 'delete-all-collections'
    | 'delete-history-by-date'
    | 'delete-collection-by-id';

export default function SideBarHistory({ history, setHistory, setFormState }: SideBarHistoryProps) {
    const [activeTab, setActiveTab] = useState<'history' | 'collections' | 'others'>('history');
    const { groupedCollections, deleteCollection, deleteCollections, deleteRequestById, saveCollection } =
        useCollections();
    const { setOpenModal, openModal, setCollectionName, setEntry, setTypeModal, typeModal, collectionName, entry } =
        useHTTPClientStore();

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

    const handleAddToCollection = async (e: React.MouseEvent, entry: RequestHistory) => {
        e.stopPropagation();
        setOpenModal(true);
        setTypeModal('save-collection');
        setEntry(entry);
        console.log(entry);
    };

    const handleCollections = async () => {
        console.log('LLamando a handleCollections');
        switch (typeModal) {
            case 'save-collection':
                await saveCollection();
                break;
            case 'delete-collection':
                await deleteCollection(collectionName);
                break;
            case 'delete-all-collections':
                await deleteCollections();
                break;
            case 'delete-collection-by-id':
                if (entry?.id) {
                    await deleteRequestById(entry.id);
                }
                break;
            default:
                break;
        }
        setOpenModal(false);
        setCollectionName('');
    };
    console.log('collections', groupedCollections);
    return (
        <aside className="bg-base-100 shadow-md rounded-sm h-full border border-base-300">
            <div className="grid grid-cols-[60px_1fr]">
                <div className="flex flex-col border-r border-base-300">
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
                            <h3 className="font-semibold text-base-content/80">Historial de Peticiones</h3>
                            <div className="tooltip" data-tip="Eliminar todo el historial">
                                <button
                                    className="btn btn-xs btn-ghost btn-circle btn-error"
                                    onClick={() => {
                                        setOpenModal(false);
                                        setTypeModal('delete-history');
                                    }}>
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </header>
                        <div className="overflow-y-auto scrollbar-thin h-[calc(100svh-10rem)] ">
                            {history.length === 0 ? (
                                <p className="flex flex-col items-center text-base-content/85 justify-center gap-2 text-md w-full text-center pt-9">
                                    <CircleOff className="mx-auto size-14" />
                                    Aún no hay historial.
                                </p>
                            ) : (
                                <motion.div layoutRoot layout className="space-y-2 w-full">
                                    {groupedHistory.map((dayGroup, index) => (
                                        <div
                                            key={dayGroup.date}
                                            className="collapse collapse-arrow bg-base-200 rounded-sm w-full">
                                            <input type="checkbox" name={`tabHistory-${dayGroup.date}`} />
                                            <div className="collapse-title flex gap-2 items-center justify-between text-sm">
                                                <span className="w-full text-base-content/85">
                                                    {dayGroup.displayDate}
                                                </span>
                                                <span className="badge badge-accent badge-soft badge-sm text-xs">
                                                    {dayGroup.entries.length}
                                                </span>
                                            </div>

                                            <motion.div layout className="collapse-content overflow-hidden">
                                                <div className="tooltip" data-tip="Eliminar peticiones ">
                                                    <motion.button
                                                        layout={false}
                                                        className="btn btn-xs btn-ghost btn-error btn-circle"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setOpenModal(true);
                                                            setTypeModal('delete-history-by-date');
                                                            setEntry(dayGroup.entries[0]);
                                                        }}>
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
                                                                className="relative p-1 cursor-pointer bg-base-100 hover:bg-base-content/5 px-2 rounded transition-colors duration-200"
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
                                                                    <div className="flex text-xs text-base-content/60 w-full ">
                                                                        {getTime24hFromDate(entry.created_at)}
                                                                    </div>
                                                                    <div className="dropdown dropdown-start dropdown-left">
                                                                        <div
                                                                            tabIndex={0}
                                                                            className="btn btn-xs btn-ghost m-1"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                            }}>
                                                                            <EllipsisIcon className="size-5 text-base-content/70" />
                                                                        </div>
                                                                        <ul className="dropdown-content text-xs menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-sm">
                                                                            <li>
                                                                                <button
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        setOpenModal(true);
                                                                                        setTypeModal('save-collection');
                                                                                        setEntry(entry);
                                                                                    }}>
                                                                                    <SaveIcon className="size-5 text-base-content/70" />{' '}
                                                                                    Guardar en colección
                                                                                </button>
                                                                            </li>
                                                                            <li>
                                                                                <button
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        deleteHistoryItem(entry.id);
                                                                                    }}>
                                                                                    <TrashIcon className="size-5 text-base-content/70" />{' '}
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
                                                                    <span className="text-base-content/60 text-xs text-ellipsis overflow-hidden whitespace-nowrap w-[210px]">
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
                            <div className="tooltip tooltip-bottom" data-tip="Eliminar todas las colecciones">
                                <button
                                    className="btn btn-xs btn-ghost btn-circle btn-error"
                                    onClick={(e) => {
                                        setOpenModal(true);
                                        setTypeModal('delete-all-collections');
                                    }}>
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </header>
                        <motion.div layoutRoot layout className="space-y-2 w-full">
                            {groupedCollections.map((dayGroup, index) => (
                                <div
                                    key={dayGroup.name}
                                    className="collapse collapse-arrow bg-base-200 rounded-sm w-full">
                                    <input type="checkbox" name={`tabHistory-${dayGroup.name}`} />
                                    <div className="collapse-title flex gap-2 items-center justify-between text-sm">
                                        <span className="flex items-center gap-2 w-full text-base-content/85">
                                            <FolderIcon className="size-4" /> {dayGroup.name}
                                        </span>
                                        <span className="badge badge-accent badge-soft badge-sm text-xs">
                                            {dayGroup.requests.length}
                                        </span>
                                    </div>

                                    <motion.div layout className="collapse-content overflow-hidden">
                                        <div className="tooltip tooltip-right" data-tip="Eliminar colección">
                                            <button
                                                className="btn btn-xs btn-ghost btn-error btn-circle"
                                                onClick={(e) => {
                                                    setOpenModal(true);
                                                    setTypeModal('delete-collection');
                                                    setCollectionName(dayGroup.name);
                                                }}>
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <AnimatePresence>
                                            <motion.ul layout className="flex flex-col gap-1">
                                                {dayGroup.requests.map((request) => (
                                                    <motion.li
                                                        key={request.id}
                                                        layout
                                                        initial={{ opacity: 1, y: 0, height: 'auto' }}
                                                        exit={{
                                                            opacity: 0,
                                                            y: -50,
                                                            height: 0,
                                                            transition: { duration: 0.3 },
                                                        }}
                                                        transition={{ duration: 0.3 }}
                                                        title={request.url}
                                                        className="relative p-1 cursor-pointer bg-base-100 hover:bg-base-content/5 px-2 rounded transition-colors duration-200"
                                                        onClick={() =>
                                                            setFormState({
                                                                method: request.method,
                                                                url: request.url,
                                                                headers:
                                                                    (request.headers as {
                                                                        key: string;
                                                                        value: string;
                                                                    }[]) || [],
                                                                body: request.body || '',
                                                            })
                                                        }>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex text-xs text-base-content/60 w-full ">
                                                                {getTime24hFromDate(request.created_at)}
                                                            </div>
                                                            <div
                                                                className="tooltip tooltip-left"
                                                                data-tip="Eliminar petición">
                                                                <button
                                                                    className="btn btn-xs btn-ghost btn-circle btn-error"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setTypeModal('delete-collection-by-id');
                                                                        setEntry(request);
                                                                        setOpenModal(true);
                                                                    }}>
                                                                    <TrashIcon className="size-3 text-base-content/70" />{' '}
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-row items-center gap-2 text-xs">
                                                            <span
                                                                className={`font-semibold badge badge-soft badge-sm rounded-sm ${
                                                                    request.method === 'GET'
                                                                        ? 'badge-success'
                                                                        : request.method === 'POST'
                                                                          ? 'badge-primary'
                                                                          : request.method === 'PUT'
                                                                            ? 'badge-warning'
                                                                            : request.method === 'DELETE'
                                                                              ? 'badge-error'
                                                                              : 'badge-secondary'
                                                                }`}>
                                                                {request.method}
                                                            </span>
                                                            <span className="text-base-content/60 text-xs text-ellipsis overflow-hidden whitespace-nowrap w-[210px]">
                                                                {request.url}
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
            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <dialog className="modal" open={openModal}>
                <div className="modal-box">
                    <h3
                        className={`flex items-center gap-2 font-bold text-lg ${
                            componentsModal(typeModal, collectionName, entry?.id).icon === 'delete'
                                ? 'text-error'
                                : 'text-success'
                        }`}>
                        {componentsModal(typeModal, collectionName, entry?.id).icon === 'delete' ? (
                            <Trash2Icon className="size-5" />
                        ) : (
                            <SaveIcon className="size-5" />
                        )}
                        {componentsModal(typeModal, collectionName, entry?.id).title}
                    </h3>
                    <p className="py-4 text-base-content/80 text-center">
                        {componentsModal(typeModal, collectionName, entry?.id).description}
                    </p>
                    <div className="modal-action">
                        <form method="dialog" className="flex flex-col gap-5 w-full">
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={() => {
                                    setOpenModal(false);
                                    setTypeModal('save-collection');
                                }}>
                                ✕
                            </button>
                            {typeModal === 'save-collection' && (
                                <div className="flex flex-col gap-2 items-start w-full">
                                    <label className="label flex flex-col items-start w-full">
                                        <span className="label-text text-sm ">Nombre de la colección</span>
                                        <input
                                            type="text"
                                            className="input input-bordered w-full"
                                            placeholder="Nombre de la colección"
                                            value={collectionName}
                                            onChange={(e) => setCollectionName(e.target.value)}
                                        />
                                    </label>
                                </div>
                            )}
                            <footer className="flex justify-end gap-2 pt-4 border-t border-base-content/15">
                                <button
                                    className={`btn-sm ${typeModal === 'save-collection' ? 'btn btn-success' : 'btn btn-error'}`}
                                    onClick={handleCollections}
                                    disabled={typeModal === 'save-collection' ? !collectionName : false}>
                                    {typeModal === 'save-collection' ? 'Guardar' : 'Aceptar'}
                                </button>
                                <button
                                    className="btn btn-soft btn-sm"
                                    onClick={() => {
                                        setOpenModal(false);
                                        setCollectionName('');
                                    }}>
                                    Cancelar
                                </button>
                            </footer>
                        </form>
                    </div>
                </div>
            </dialog>
        </aside>
    );
}

const componentsModal = (
    type: ModalType,
    id?: string,
    name?: string
): { title: string; description: string; icon?: string } => {
    let infoModal: {
        title: string;
        description: string;
        icon?: string;
    } = {
        title: '',
        description: '',
        icon: '',
    };
    switch (type) {
        case 'save-collection':
            infoModal = {
                title: 'Guardar en colección',
                description: 'Introduce el nombre de la colección',
                icon: 'save',
            };
            break;
        case 'delete-collection':
            infoModal = {
                title: 'Eliminar colección',
                description: '¿Estás seguro de que quieres eliminar la colección?',
                icon: 'delete',
            };
            break;
        case 'delete-history':
            infoModal = {
                title: 'Eliminar historial',
                description: '¿Estás seguro de que quieres eliminar el historial?',
                icon: 'delete',
            };
            break;
        case 'delete-all-history':
            infoModal = {
                title: 'Eliminar todo el historial',
                description: '¿Estás seguro de que quieres eliminar todo el historial?',
                icon: 'delete',
            };
            break;
        case 'delete-all-collections':
            infoModal = {
                title: 'Eliminar todas las colecciones',
                description: '¿Estás seguro de que quieres eliminar todas las colecciones?',
                icon: 'delete',
            };
            break;
        case 'delete-history-by-date':
            infoModal = {
                title: 'Eliminar historial',
                description: '¿Estás seguro de que quieres eliminar la petición del historial?',
                icon: 'delete',
            };
            break;
        case 'delete-collection-by-id':
            infoModal = {
                title: 'Eliminar petición de la colección',
                description:
                    '¿Estás seguro de que deseas eliminar esta petición de la colección? Esta acción no se puede deshacer.',
                icon: 'delete',
            };
            break;
    }

    return infoModal;
};
