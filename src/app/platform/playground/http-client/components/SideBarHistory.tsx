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
    FolderPlusIcon,
    FoldersIcon,
    HistoryIcon,
    InfoIcon,
    LucideProps,
    PlusIcon,
    SaveIcon,
    Trash2Icon,
    TrashIcon,
} from 'lucide-react';
import { Dispatch, ForwardRefExoticComponent, RefAttributes, SetStateAction, useMemo, useState } from 'react';
import { useCollections } from './hooks/useCollections';
import { ModalType, useHTTPClientStore } from './hooks/storeHTTPClient';
import { useHistory } from './hooks/useHistory';
import { request } from 'http';
import toast from 'react-hot-toast';

interface SideBarHistoryProps {
    setFormState: Dispatch<
        SetStateAction<{ method: string; url: string; headers: { key: string; value: string }[]; body: string } | null>
    >;
}

export default function SideBarHistory({ setFormState }: SideBarHistoryProps) {
    const [activeTab, setActiveTab] = useState<'history' | 'collections' | 'others'>('history');
    const {
        groupedCollections,
        deleteCollection,
        deleteCollections,
        deleteRequestById,
        saveCollection,
        createCollection,
    } = useCollections();
    const { setOpenModal, openModal, setCollectionName, setRequest, setTypeModal, typeModal, collectionName, request } =
        useHTTPClientStore();
    const { groupedHistory, deleteHistoryItem, deleteHistory, deleteHistoryByDate, history } = useHistory();

    const handleTypeModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (typeModal.includes('history')) {
            handleHistory();
        } else {
            handleCollections();
        }
    };

    const handleHistory = async () => {
        switch (typeModal) {
            case 'delete-history': {
                const deleted = await deleteHistoryItem(request?.id || '');
                if (deleted) {
                    setOpenModal(false);
                    toast.success('Petición eliminada del historial.');
                }
                break;
            }
            case 'delete-all-history': {
                const deletedAll = await deleteHistory();
                if (deletedAll) {
                    setOpenModal(false);
                    toast.success('Todo el historial ha sido eliminado.');
                }
                break;
            }
            case 'delete-history-by-date': {
                const deletedByDate = await deleteHistoryByDate(request?.created_at.toString() || '');
                if (deletedByDate) {
                    setOpenModal(false);
                    toast.success('Historial eliminado para esa fecha.');
                }
                break;
            }
            default:
                break;
        }
        setOpenModal(false);
    };

    const handleCollections = async () => {
        console.log('typeModal', typeModal);
        switch (typeModal) {
            case 'add-collection': {
                const created = await createCollection();
                if (created) {
                    setOpenModal(false);
                    toast.success('Colección creada exitosamente.');
                }
                break;
            }
            case 'save-collection': {
                const saved = await saveCollection();
                if (saved) {
                    setOpenModal(false);
                    toast.success('Petición guardada en la colección.');
                }
                break;
            }
            case 'delete-collection': {
                const deleted = await deleteCollection(collectionName);
                if (deleted) {
                    setOpenModal(false);
                    toast.success(`Colección "${collectionName}" eliminada.`);
                }
                break;
            }
            case 'delete-all-collections': {
                const deletedAll = await deleteCollections();
                if (deletedAll) {
                    setOpenModal(false);
                    toast.success('Todas las colecciones han sido eliminadas.');
                }
                break;
            }
            case 'delete-collection-by-id': {
                console.log(request);
                if (request?.id) {
                    const deleted = await deleteRequestById(request.id);
                    if (deleted) {
                        setOpenModal(false);
                        toast.success('Petición eliminada de la colección.');
                    }
                }
                break;
            }
            default:
                break;
        }
        setOpenModal(false);
        setCollectionName('');
    };

    return (
        <aside className="bg-base-100 shadow-md rounded-sm h-full border border-base-300 overflow-hidden">
            <div className="grid grid-cols-[75px_1fr]">
                <div className="flex flex-col border-r border-base-300 ">
                    <button
                        className={`flex flex-col gap-1 w-full h-[55px] items-center justify-center hover:bg-base-content/10 hover:text-base-content/90 transition-all cursor-pointer border-b border-base-300 text-base-content/50 ${
                            activeTab === 'history' ? 'bg-base-content/10 text-base-content/90' : ''
                        }`}
                        onClick={() => setActiveTab('history')}>
                        <HistoryIcon className="w-4 h-4" />
                        <span className="text-xs">Historial</span>
                    </button>
                    <button
                        className={`flex flex-col gap-1 w-full h-[55px] items-center justify-center hover:bg-base-content/10 hover:text-base-content/90 transition-all cursor-pointer border-b border-base-300 text-base-content/50 ${
                            activeTab === 'collections' ? 'bg-base-content/10 text-base-content/90' : ''
                        }`}
                        onClick={() => setActiveTab('collections')}>
                        <FoldersIcon className="w-4 h-4" />
                        <span className="text-xs">Colecciones</span>
                    </button>
                    <button
                        className={`flex flex-col gap-1 w-full h-[55px] items-center justify-center hover:bg-base-content/10 hover:text-base-content/90 transition-all cursor-pointer border-b border-base-300 text-base-content/50 ${
                            activeTab === 'others' ? 'bg-base-content/10 text-base-content/90' : ''
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
                            <div className="tooltip tooltip-left tooltip-error" data-tip="Eliminar todo el historial">
                                <button
                                    className="btn btn-xs btn-soft"
                                    onClick={() => {
                                        setOpenModal(true);
                                        setTypeModal('delete-all-history');
                                    }}>
                                    <Trash2Icon className="size-4 text-base-content/70" />
                                </button>
                            </div>
                        </header>
                        <div className="overflow-y-auto scrollbar-thin h-[calc(100svh-10rem)] ">
                            {history.length === 0 ? (
                                <div className="flex flex-col items-center text-base-content/40 justify-center gap-2 text-md w-full text-center pt-9">
                                    <CircleOff className="mx-auto size-14" />
                                    <span>Aún no hay historial.</span>
                                    <span className="text-sm text-pretty">
                                        Envía una petición y automáticamente aparecerá aquí.
                                    </span>
                                </div>
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
                                                <div
                                                    className="tooltip tooltip-right tooltip-error"
                                                    data-tip="Eliminar peticiones ">
                                                    <motion.button
                                                        layout={false}
                                                        className="btn btn-xs btn-soft"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setOpenModal(true);
                                                            setTypeModal('delete-history-by-date');
                                                            setRequest(dayGroup.entries[0]);
                                                        }}>
                                                        <Trash2Icon className="size-4 text-base-content/70" />
                                                    </motion.button>
                                                </div>
                                                <AnimatePresence>
                                                    <motion.ul layout className="flex flex-col gap-1 mt-2">
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
                                                                    <div className="flex gap-1">
                                                                        <div
                                                                            className="tooltip tooltip-left tooltip-info"
                                                                            data-tip="Guardar colección">
                                                                            <button
                                                                                className="btn btn-xs btn-soft"
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    setTypeModal('save-collection');
                                                                                    setRequest(entry);
                                                                                    setOpenModal(true);
                                                                                }}>
                                                                                <SaveIcon className="size-3 text-base-content/70" />
                                                                            </button>
                                                                        </div>
                                                                        <div
                                                                            className="tooltip tooltip-left tooltip-error"
                                                                            data-tip="Eliminar petición">
                                                                            <button
                                                                                className="btn btn-xs btn-soft "
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    setTypeModal('delete-history');
                                                                                    setRequest(entry);
                                                                                    setOpenModal(true);
                                                                                }}>
                                                                                <Trash2Icon className="size-3 text-base-content/70" />
                                                                            </button>
                                                                        </div>
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
                    <div className="flex flex-col p-2 h-full">
                        <header className="flex justify-between items-center mb-2 border-b border-base-300 pb-2">
                            <h3 className="font-semibold">Colecciones</h3>
                            <div className="flex gap-2">
                                <div className="tooltip tooltip-left tooltip-info" data-tip="Agregar colección">
                                    <button
                                        className="btn btn-xs btn-soft btn-default"
                                        onClick={(e) => {
                                            setOpenModal(true);
                                            setTypeModal('add-collection');
                                        }}>
                                        <PlusIcon className="size-4 text-base-content/70" />
                                    </button>
                                </div>
                                <div
                                    className="tooltip tooltip-left tooltip-error"
                                    data-tip="Eliminar todas las colecciones">
                                    <button
                                        className="btn btn-xs btn-soft btn-default"
                                        onClick={(e) => {
                                            setOpenModal(true);
                                            setTypeModal('delete-all-collections');
                                        }}>
                                        <Trash2Icon className="size-4 text-base-content/70" />
                                    </button>
                                </div>
                            </div>
                        </header>
                        <div className="overflow-y-auto scrollbar-thin h-[calc(100svh-10rem)] ">
                            {groupedCollections.length === 0 && (
                                <div className="flex flex-col items-center text-base-content/40 justify-center gap-2 text-md w-full text-center pt-9">
                                    <CircleOff className="mx-auto size-14" />
                                    <span>No tienes colecciones</span>
                                    <span className="text-sm text-pretty">
                                        Crea tu primera colección para verlo aquí
                                    </span>
                                    <button
                                        className="btn btn-sm btn-primary mt-2"
                                        onClick={() => {
                                            setOpenModal(true);
                                            setTypeModal('add-collection');
                                        }}>
                                        Crear colección
                                    </button>
                                </div>
                            )}
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
                                            <div
                                                className="tooltip tooltip-right tooltip-error"
                                                data-tip="Eliminar colección">
                                                <button
                                                    className="btn btn-xs btn-soft btn-default"
                                                    onClick={(e) => {
                                                        setOpenModal(true);
                                                        setTypeModal('delete-collection');
                                                        setCollectionName(dayGroup.name);
                                                    }}>
                                                    <TrashIcon className="size-3" />
                                                </button>
                                            </div>
                                            <AnimatePresence>
                                                <motion.ul layout className="flex flex-col gap-1 mt-2">
                                                    {dayGroup.requests.map((requestCollection) => (
                                                        <motion.li
                                                            key={requestCollection.id}
                                                            layout
                                                            initial={{ opacity: 1, y: 0, height: 'auto' }}
                                                            exit={{
                                                                opacity: 0,
                                                                y: -50,
                                                                height: 0,
                                                                transition: { duration: 0.3 },
                                                            }}
                                                            transition={{ duration: 0.3 }}
                                                            title={requestCollection.url}
                                                            className="relative p-1 cursor-pointer bg-base-100 hover:bg-base-content/5 px-2 rounded transition-colors duration-200"
                                                            onClick={() =>
                                                                setFormState({
                                                                    method: requestCollection.method,
                                                                    url: requestCollection.url,
                                                                    headers:
                                                                        (requestCollection.headers as {
                                                                            key: string;
                                                                            value: string;
                                                                        }[]) || [],
                                                                    body: requestCollection.body || '',
                                                                })
                                                            }>
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex text-xs text-base-content/60 w-full ">
                                                                    {getTime24hFromDate(requestCollection.created_at)}
                                                                </div>
                                                                <div
                                                                    className="tooltip tooltip-left tooltip-error"
                                                                    data-tip="Eliminar petición de la colección">
                                                                    <button
                                                                        className="btn btn-xs btn-soft btn-default"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setTypeModal('delete-collection-by-id');
                                                                            setRequest(requestCollection);
                                                                            setOpenModal(true);
                                                                        }}>
                                                                        <TrashIcon className="size-3 text-base-content/70" />{' '}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-row items-center gap-2 text-xs">
                                                                <span
                                                                    className={`font-semibold badge badge-soft badge-sm rounded-sm ${
                                                                        requestCollection.method === 'GET'
                                                                            ? 'badge-success'
                                                                            : requestCollection.method === 'POST'
                                                                              ? 'badge-primary'
                                                                              : requestCollection.method === 'PUT'
                                                                                ? 'badge-warning'
                                                                                : requestCollection.method === 'DELETE'
                                                                                  ? 'badge-error'
                                                                                  : 'badge-secondary'
                                                                    }`}>
                                                                    {requestCollection.method}
                                                                </span>
                                                                <span className="text-base-content/60 text-xs text-ellipsis overflow-hidden whitespace-nowrap w-[210px]">
                                                                    {requestCollection.url}
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

            <dialog className="modal" open={openModal}>
                <div className="modal-box">
                    <h3
                        className={`flex items-center gap-2 font-bold text-lg border-b border-base-content/15 pb-2 ${
                            componentsModal(typeModal, collectionName, request?.id).icon === 'delete'
                                ? 'text-error'
                                : typeModal === 'save-collection'
                                  ? 'text-success'
                                  : 'text-success'
                        }`}>
                        {componentsModal(typeModal, collectionName, request?.id).icon === 'delete' ? (
                            <Trash2Icon className="size-5" />
                        ) : typeModal === 'save-collection' ? (
                            <SaveIcon className="size-5" />
                        ) : (
                            <FolderPlusIcon className="size-5" />
                        )}
                        {componentsModal(typeModal, collectionName, request?.id).title}
                    </h3>
                    <div className="modal-action">
                        <form method="dialog" className="flex flex-col gap-2 w-full">
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={() => {
                                    setOpenModal(false);
                                }}>
                                ✕
                            </button>
                            <p className="py-4 text-base-content/80 text-center font-light">
                                {componentsModal(typeModal, collectionName, request?.id).description}
                            </p>
                            {typeModal === 'add-collection' && (
                                <div className="flex flex-col gap-2 items-start w-full">
                                    <input
                                        type="text"
                                        className="input input-bordered w-full"
                                        placeholder="Nombre de la colección"
                                        value={collectionName}
                                        onChange={(e) => setCollectionName(e.target.value)}
                                    />
                                </div>
                            )}
                            {typeModal === 'save-collection' && (
                                <div className="flex flex-col gap-2 items-start w-full">
                                    <select
                                        className="select select-bordered w-full"
                                        value={collectionName}
                                        onChange={(e) => setCollectionName(e.target.value)}>
                                        <option disabled value="">
                                            Selecciona una colección
                                        </option>
                                        {groupedCollections.map((collection) => (
                                            <option key={collection.id} value={collection.name}>
                                                {collection.name}
                                            </option>
                                        ))}
                                    </select>
                                    {groupedCollections.length === 0 && (
                                        <p className="text-sm text-center text-base-content/60">
                                            No hay colecciones, crea una para guardar la solicitud.
                                        </p>
                                    )}
                                </div>
                            )}
                            <footer className="flex justify-end gap-2 pt-4 mt-8 border-t border-base-content/15">
                                <button
                                    className={`btn-sm ${typeModal === 'save-collection' ? 'btn btn-success' : typeModal === 'add-collection' ? 'btn btn-success' : 'btn btn-error'}`}
                                    onClick={handleTypeModal}
                                    disabled={
                                        typeModal === 'save-collection'
                                            ? !collectionName || groupedCollections.length === 0
                                            : typeModal === 'add-collection'
                                              ? !collectionName && groupedCollections.length === 0
                                              : false
                                    }>
                                    {typeModal === 'save-collection'
                                        ? 'Guardar'
                                        : typeModal === 'add-collection'
                                          ? 'Crear'
                                          : 'Aceptar'}
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
        case 'add-collection':
            infoModal = {
                title: 'Nueva colección',
                description: 'Introduce el nombre de la colección',
                icon: 'add',
            };
            break;
        case 'save-collection':
            infoModal = {
                title: 'Guardar en colección',
                description: 'Elige una colección',
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
                description: '¿Estás seguro de que quieres eliminar el historial de esta fecha?',
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
