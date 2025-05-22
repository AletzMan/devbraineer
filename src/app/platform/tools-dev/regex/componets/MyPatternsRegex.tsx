'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { RegexPattern } from '@prisma/client';
import { getRegexPatterns, createRegexPattern, deleteRegexPatternById } from '@/services/pattern.service';
import { PlusCircle, Search, Save, AlertCircle, Check, Trash2, X } from 'lucide-react';
import axios from 'axios';
import PatternRegex from './PatternRegex';

interface MyPatternsPageProps {
    setPattern: (pattern: string) => void;
    setActiveTab: (tab: 'tester' | 'patterns' | 'myPatterns') => void;
}

export default function MyPatternsPage({ setPattern, setActiveTab }: MyPatternsPageProps) {
    const [patterns, setPatterns] = useState<RegexPattern[]>([]);
    const [loadingPatterns, setLoadingPatterns] = useState(true);
    const [patternsError, setPatternsError] = useState<string | null>(null);

    const [newPattern, setNewPattern] = useState<RegexPattern>({
        id: '',
        name: '',
        pattern: '',
        description: '',
        userId: null,
        created_at: new Date(),
        updated_at: new Date(),
    });
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDialogElement>(null);

    // --- ESTADOS PARA ELIMINAR ---
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [patternToDelete, setPatternToDelete] = useState<RegexPattern | null>(null);
    const deleteConfirmModalRef = useRef<HTMLDialogElement>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);

    useEffect(() => {
        const fetchPatterns = async () => {
            try {
                setLoadingPatterns(true);
                setPatternsError(null);

                const loadedPatterns = await getRegexPatterns();

                const validatedPatterns: RegexPattern[] = loadedPatterns.filter((p): p is RegexPattern => {
                    const isValid =
                        p !== null &&
                        p !== undefined &&
                        typeof p === 'object' &&
                        'id' in p &&
                        p.id !== null &&
                        p.id !== undefined;
                    if (!isValid) {
                        console.warn('Patrón inválido descartado al cargar (falta ID o es null/undefined):', p);
                    }
                    return isValid;
                });
                setPatterns(validatedPatterns);
            } catch (err) {
                console.error('Error al cargar patrones:', err);
                setPatternsError('No se pudieron cargar los patrones. Intenta de nuevo.');
                setPatterns([]);
            } finally {
                setLoadingPatterns(false);
            }
        };

        fetchPatterns();
    }, []);

    const filteredPatterns = useMemo(() => {
        if (!Array.isArray(patterns)) {
            console.warn("El estado 'patterns' no es un array:", patterns);
            return [];
        }

        const searchFiltered = searchTerm
            ? patterns.filter(
                  (pattern) =>
                      pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      (pattern.description?.toLowerCase() || '').includes(searchTerm.toLowerCase())
              )
            : patterns;

        return searchFiltered.filter((item) => {
            const isValid =
                item !== null &&
                item !== undefined &&
                typeof item === 'object' &&
                'id' in item &&
                item.id !== null &&
                item.id !== undefined;
            if (!isValid) {
                console.warn('Elemento inválido detectado en filteredPatterns (sin ID o null/undefined):', item);
            }
            return isValid;
        });
    }, [patterns, searchTerm]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewPattern((prev) => ({ ...prev, [name]: value }));
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
        modalRef.current?.showModal();
        setNewPattern({
            id: '',
            name: '',
            pattern: '',
            description: '',
            userId: null,
            created_at: new Date(),
            updated_at: new Date(),
        });
        setSaveError(null);
        setSaveSuccess(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        modalRef.current?.close();
    };

    const handleSavePattern = async () => {
        if (!newPattern.name.trim() || !newPattern.pattern.trim()) {
            setSaveError('Name and regex pattern are required.');
            return;
        }

        setIsSaving(true);
        setSaveError(null);
        setSaveSuccess(null);

        try {
            const patternToSave = {
                name: newPattern.name.trim(),
                pattern: newPattern.pattern.trim(),
                description: newPattern.description.trim() || undefined,
            };
            const savedPattern = await createRegexPattern(patternToSave);

            // *** CAMBIO CLAVE: Depurar y validar el patrón guardado ***

            // Asegurarse de que el patrón guardado es válido y tiene un ID antes de añadirlo
            const isSavedPatternValid =
                savedPattern !== null &&
                savedPattern !== undefined &&
                typeof savedPattern === 'object' &&
                'id' in savedPattern &&
                savedPattern.id !== null &&
                savedPattern.id !== undefined;

            if (!isSavedPatternValid) {
                console.error("El patrón guardado no tiene una 'id' válida o no es un objeto válido:", savedPattern);
                setSaveError(
                    'El patrón se guardó, pero no se pudo mostrar automáticamente. Intenta recargar la página.'
                );
                setIsSaving(false); // Detener la animación de guardado
                return; // Salir si el patrón no es válido
            }

            setPatterns((prevPatterns) => [...prevPatterns, savedPattern as RegexPattern]); // Asegura el tipo

            setNewPattern({
                id: '',
                name: '',
                pattern: '',
                description: '',
                userId: null,
                created_at: new Date(),
                updated_at: new Date(),
            });
            setSaveSuccess('Pattern saved successfully!');
            // No usamos un setTimeout para el mensaje de éxito, se cerrará con el modal.
            // Esto permite que el usuario vea el patrón nuevo inmediatamente y el modal se cierre.
            setTimeout(() => {
                handleCloseModal();
                setSaveSuccess(null); // Limpia el mensaje de éxito una vez cerrado el modal
            }, 500); // Pequeño retraso para que el usuario vea el mensaje, si es visible
        } catch (err: any) {
            console.error('Error saving pattern:', err);
            if (axios.isAxiosError(err) && err.response && err.response.data) {
                setSaveError(err.response.data.message || err.response.data || 'Error saving pattern.');
            } else {
                setSaveError('Error saving pattern. Please try again.');
            }
            setTimeout(() => {
                setSaveError(null);
            }, 5000); // El error se mantiene visible por 5 segundos
        } finally {
            setIsSaving(false);
        }
    };

    // --- FUNCIONES PARA ELIMINAR ---

    const handleOpenDeleteConfirm = (pattern: RegexPattern) => {
        setPatternToDelete(pattern);
        setIsDeleteConfirmOpen(true);
        deleteConfirmModalRef.current?.showModal();
        setDeleteError(null);
        setDeleteSuccess(null);
    };

    const handleCloseDeleteConfirm = () => {
        setIsDeleteConfirmOpen(false);
        setPatternToDelete(null);
        deleteConfirmModalRef.current?.close();
    };

    const handleDeleteConfirmed = async () => {
        if (!patternToDelete || !patternToDelete.id) {
            setDeleteError('No hay patrón seleccionado para eliminar.');
            return;
        }

        setDeleteError(null);
        setDeleteSuccess(null);

        try {
            await deleteRegexPatternById(patternToDelete.id);

            // Filtra el array de patrones para remover el eliminado
            setPatterns((prevPatterns) => prevPatterns.filter((p) => p.id !== patternToDelete.id));

            setDeleteSuccess('Patrón eliminado exitosamente.');
            setTimeout(() => {
                handleCloseDeleteConfirm();
                setDeleteSuccess(null);
            }, 1000);
        } catch (err: any) {
            console.error('Error al eliminar patrón:', err);
            // Captura el mensaje de error específico si viene del servicio
            setDeleteError(err.message || 'Error al eliminar patrón. Intenta de nuevo.');
            setTimeout(() => {
                setDeleteError(null);
            }, 5000);
        }
    };

    return (
        <div className="flex bg-neutral/50 text-gray-200 overflow-y-auto rounded-sm border-1 border-gray-700 h-[calc(100svh-14.75rem)]">
            <div className="flex flex-col flex-1 gap-2 mx-auto w-full">
                <header className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 bg-neutral/65 border-b-1 border-gray-700">
                    <label className="input flex items-center gap-2 w-full md:w-auto min-w-[20rem]">
                        <Search className="size-5 text-gray-400" />
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar por nombre o descripción..."
                        />
                    </label>
                    <button className="btn btn-success w-full md:w-auto" onClick={handleOpenModal}>
                        <PlusCircle className="size-5 mr-2" /> Agregar Nuevo Patrón
                    </button>
                </header>
                {loadingPatterns && <div className="text-center text-gray-400 mt-8">Cargando patrones...</div>}
                {patternsError && (
                    <div className="alert alert-error bg-red-800 text-red-200 border-red-700 p-3 rounded-md text-sm flex items-center gap-2 mt-8">
                        <AlertCircle className="size-4 text-red-400" />
                        <p>{patternsError}</p>
                    </div>
                )}
                {!loadingPatterns && !patternsError && (
                    <div className="flex flex-col">
                        {filteredPatterns.length === 0 ? (
                            <div className="text-center text-gray-500 text-lg mt-8">
                                {searchTerm
                                    ? 'No se encontraron patrones que coincidan con la búsqueda.'
                                    : 'Aún no hay patrones guardados.'}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                                {filteredPatterns.map(
                                    (
                                        item,
                                        idx // Añadido 'idx' aquí
                                    ) => (
                                        <PatternRegex
                                            key={item.id}
                                            item={item}
                                            index={idx} // Usamos 'idx' para el índice
                                            setPattern={setPattern}
                                            setActiveTab={setActiveTab}
                                            visibleDate={true}
                                            onDelete={() => {
                                                handleOpenDeleteConfirm(item);
                                            }}
                                        />
                                    )
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <dialog ref={modalRef} className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
                <div className="modal-box bg-base-300 text-gray-200 p-6 rounded-lg shadow-xl">
                    <h3 className="font-bold text-xl text-white mb-4 flex items-center gap-2">
                        <PlusCircle className="size-6 text-green-400" /> Agregar Nuevo Patrón
                    </h3>
                    <form method="dialog">
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={handleCloseModal}>
                            ✕
                        </button>
                    </form>
                    <div className="flex flex-col gap-4 w-full">
                        <div>
                            <label className="flex flex-col gap-1 label items-start text-sm">
                                Nombre del patrón
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Ej: Email Válido"
                                    className="input input-sm w-full"
                                    value={newPattern.name}
                                    onChange={handleInputChange}
                                    disabled={isSaving}
                                />
                            </label>
                        </div>
                        <div>
                            <label className="flex flex-col gap-1 label items-start text-sm">
                                Expresión regular
                                <input
                                    type="text"
                                    name="pattern"
                                    placeholder="Ej: ^\\d+$"
                                    className="input input-sm w-full"
                                    value={newPattern.pattern}
                                    onChange={handleInputChange}
                                    disabled={isSaving}
                                />
                            </label>
                        </div>
                        <div>
                            <label className="flex flex-col gap-1 label items-start text-sm">
                                Descripción (opcional)
                                <textarea
                                    name="description"
                                    placeholder="Ej: Coincide con números enteros positivos."
                                    className="textarea textarea-sm w-full resize-none"
                                    value={newPattern.description}
                                    onChange={handleInputChange}
                                    rows={3}
                                    disabled={isSaving}
                                />
                            </label>
                        </div>

                        {saveError && (
                            <div className="alert alert-error bg-red-800 text-red-200 border-red-700 p-3 rounded-md text-sm flex items-center gap-2">
                                <AlertCircle className="size-4 text-red-400" />
                                <p>{saveError}</p>
                            </div>
                        )}
                        {saveSuccess && (
                            <div className="alert alert-success bg-green-800 text-green-200 border-green-700 p-3 rounded-md text-sm flex items-center gap-2">
                                <Check className="size-4 text-green-400" />
                                <p>{saveSuccess}</p>
                            </div>
                        )}

                        <div className="modal-action mt-4">
                            <button
                                type="button"
                                onClick={handleSavePattern}
                                className={`btn btn-success bg-green-600 hover:bg-green-700 text-white font-bold transition duration-300 ease-in-out ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isSaving || !newPattern.name.trim() || !newPattern.pattern.trim()}>
                                {isSaving ? (
                                    'Guardando...'
                                ) : (
                                    <>
                                        <Save className="size-5 mr-2" /> Guardar Patrón
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
            {/* --- MODAL DE CONFIRMACIÓN DE ELIMINACIÓN (SIN CAMBIOS) --- */}
            <dialog ref={deleteConfirmModalRef} className={`modal ${isDeleteConfirmOpen ? 'modal-open' : ''}`}>
                <div className="modal-box bg-base-100 text-gray-200 p-6 rounded-lg shadow-xl">
                    <h3 className="font-bold text-xl text-white mb-4 flex items-center gap-2">
                        <Trash2 className="size-6 text-error" /> Confirmar Eliminación
                    </h3>
                    <form method="dialog">
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={handleCloseDeleteConfirm}>
                            ✕
                        </button>
                    </form>
                    {patternToDelete && (
                        <p className="mb-4">
                            ¿Estás seguro de que quieres eliminar el patrón "
                            <strong className="text-error">{patternToDelete.name}</strong>
                            "? Esta acción no se puede deshacer.
                        </p>
                    )}

                    {deleteError && (
                        <div className="alert alert-error bg-red-800 text-red-200 border-red-700 p-3 rounded-md text-sm flex items-center gap-2 mb-4">
                            <AlertCircle className="size-4 text-red-400" />
                            <p>{deleteError}</p>
                        </div>
                    )}
                    {deleteSuccess && (
                        <div className="alert alert-success bg-green-800 text-green-200 border-green-700 p-3 rounded-md text-sm flex items-center gap-2 mb-4">
                            <Check className="size-4 text-green-400" />
                            <p>{deleteSuccess}</p>
                        </div>
                    )}

                    <div className="modal-action justify-end mt-4">
                        <button type="button" onClick={handleCloseDeleteConfirm} className="btn btn-soft">
                            <X className="size-5 mr-2" /> Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleDeleteConfirmed}
                            className="btn btn-error font-bold transition duration-300 ease-in-out">
                            <Trash2 className="size-5 mr-2" /> Eliminar
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
