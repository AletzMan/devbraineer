// app/snippets/page.tsx (o donde esté tu SnippetsPage)
'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { Plus, Search, AlertCircle, Check, Trash2, Folder, Tag, Save, Code, X } from 'lucide-react';
import { Snippet } from '@prisma/client'; // Importa el tipo Snippet de Prisma
import { getSnippets, createSnippet, deleteSnippet, CreateSnippetPayload } from '@/services/snippet.service';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast'; // Para notificaciones
import SnippetCard from './components/SnippetCard';
import { languages } from '../../constants';
import HeaderSection from '../../componentes/HeaderSection';
import { CodeBlock } from 'react-code-block';
import { themes } from 'prism-react-renderer';
import { r } from 'node_modules/framer-motion/dist/types.d-CtuPurYT';
import { LayoutSubSection } from '../../componentes/LayoutSubSection';

export default function SnippetsPage() {
    const [snippets, setSnippets] = useState<Snippet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Estado para búsqueda y filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Estados para el modal de nuevo snippet
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const createModalRef = useRef<HTMLDialogElement>(null);
    const [newSnippetData, setNewSnippetData] = useState<CreateSnippetPayload>({
        title: '',
        description: '',
        code: '',
        language: '',
        category: '',
        tags: [],
        authorId: '',
        created_at: new Date(),
        updated_at: new Date(),
    });
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    // Estados para el modal de eliminación
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const deleteConfirmModalRef = useRef<HTMLDialogElement>(null);
    const [snippetToDelete, setSnippetToDelete] = useState<Snippet | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
    const codeModalRef = useRef<HTMLDialogElement>(null);
    const [snippetToView, setSnippetToView] = useState<Snippet | null>(null);

    // --- Cargar Snippets al inicio ---
    useEffect(() => {
        const fetchSnippets = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedSnippets = await getSnippets();
                setSnippets(fetchedSnippets || []);
            } catch (err: any) {
                console.error('Error fetching snippets:', err);
                setError(err.message || 'No se pudieron cargar los snippets.');
            } finally {
                setLoading(false);
            }
        };
        fetchSnippets();
    }, []); // Se ejecuta una sola vez al montar el componente

    // --- Lógica de filtrado y búsqueda ---
    const filteredSnippets = useMemo(() => {
        let currentSnippets = snippets;

        // Filtrar por término de búsqueda
        if (searchTerm) {
            currentSnippets = currentSnippets.filter(
                (s) =>
                    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (s.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                    s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    s.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (s.category?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                    s.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Filtrar por categoría seleccionada
        if (selectedCategory) {
            currentSnippets = currentSnippets.filter((s) => s.category === selectedCategory);
        }

        // Filtrar por etiqueta seleccionada
        if (selectedTag) {
            currentSnippets = currentSnippets.filter((s) => s.tags.includes(selectedTag));
        }

        return currentSnippets;
    }, [snippets, searchTerm, selectedCategory, selectedTag]);

    // --- Obtener categorías y tags únicos para los filtros laterales ---
    const { uniqueCategories, uniqueTags } = useMemo(() => {
        const categories = new Set<string>();
        const tags = new Set<string>();

        snippets.forEach((s) => {
            if (s.category) categories.add(s.category);
            s.tags.forEach((tag) => tags.add(tag));
        });

        return {
            uniqueCategories: Array.from(categories).sort(),
            uniqueTags: Array.from(tags).sort(),
        };
    }, [snippets]);

    // --- Manejo del modal de creación ---
    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true);
        createModalRef.current?.showModal();
        setNewSnippetData({
            title: '',
            description: '',
            code: '',
            language: '',
            category: '',
            tags: [],
            authorId: '',
            created_at: new Date(),
            updated_at: new Date(),
        }); // Reset form
        setSaveError(null);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
        createModalRef.current?.close();
    };

    const handleCreateInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setNewSnippetData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewSnippetData((prev) => ({
            ...prev,
            tags: value
                .split(',')
                .map((tag) => tag.trim())
                .filter(Boolean), // Divide por comas y elimina vacíos
        }));
    };

    const handleSaveNewSnippet = async () => {
        if (!newSnippetData.title.trim() || !newSnippetData.code.trim() || !newSnippetData.language.trim()) {
            setSaveError('Título, código y lenguaje son obligatorios.');
            return;
        }

        setIsSaving(true);
        setSaveError(null);

        try {
            const savedSnippet = await createSnippet(newSnippetData);
            if (savedSnippet) {
                setSnippets((prev) => [savedSnippet, ...prev]); // Añadir al inicio de la lista
            }
            toast.success('Snippet guardado exitosamente!');
            handleCloseCreateModal();
        } catch (err: any) {
            console.error('Error saving snippet:', err);
            setSaveError(err.message || 'Error al guardar el snippet.');
            toast.error(err.message || 'Error al guardar el snippet.');
        } finally {
            setIsSaving(false);
        }
    };

    // --- Manejo del modal de eliminación ---
    const handleOpenDeleteConfirm = (snippet: Snippet) => {
        setSnippetToDelete(snippet);
        setIsDeleteConfirmOpen(true);
        deleteConfirmModalRef.current?.showModal();
        setDeleteError(null);
    };

    const handleCloseDeleteConfirm = () => {
        setIsDeleteConfirmOpen(false);
        setSnippetToDelete(null);
        deleteConfirmModalRef.current?.close();
    };

    const handleDeleteConfirmed = async () => {
        if (!snippetToDelete) return;

        setIsDeleting(true);
        setDeleteError(null);

        try {
            await deleteSnippet(snippetToDelete.id);
            setSnippets((prev) => prev.filter((s) => s.id !== snippetToDelete.id));
            toast.success('Snippet eliminado exitosamente!');
            handleCloseDeleteConfirm();
        } catch (err: any) {
            console.error('Error deleting snippet:', err);
            setDeleteError(err.message || 'Error al eliminar el snippet.');
            toast.error(err.message || 'Error al eliminar el snippet.');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleOpenEditModal = (snippet: Snippet) => {
        //setEditingSnippet(snippet);
        //editModalRef.current?.showModal();
    };

    const handleOpenCodeModal = (snippet: Snippet) => {
        setSnippetToView(snippet);
        codeModalRef.current?.showModal();
    };

    const handleCloseCodeModal = () => {
        setSnippetToView(null);
        codeModalRef.current?.close();
    };

    return (
        <LayoutSubSection>
            <Toaster position="top-right" />
            <div className="flex flex-col gap-2 flex-1 max-w-(--max-width) w-full mx-auto bg">
                <button className="btn btn-success max-w-fit self-start" onClick={handleOpenCreateModal}>
                    <Plus className="w-4 h-4" />
                    Nuevo Snippet
                </button>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-4 overflow-y-auto h-full w-full ">
                    <div className="bg-base-200 border border-base-300 rounded-sm  p-4">
                        <div className="sticky top-4 space-y-4">
                            <label className="input input-sm w-full border-1 border-base-content/15">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                                <input
                                    type="search"
                                    placeholder="Buscar snippets..."
                                    className="w-full pl-9"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </label>
                            <div className=" bg-base-100 border border-base-300 rounded-md  p-4">
                                <h3 className="font-medium mb-3 border-b border-base-content/15 pb-2 border-dashed">
                                    Categorías
                                </h3>
                                <div className="space-y-2">
                                    <button
                                        className={`btn w-full justify-start gap-2 font-normal border-0 ${selectedCategory === null ? 'btn-active btn-soft bg-info/30' : 'btn-ghost bg-base-content/5'}`}
                                        onClick={() => setSelectedCategory(null)}>
                                        <Folder className="h-4 w-4" />
                                        Todas
                                        <span className="badge badge-default bg-base/40 border-0 badge-sm ml-auto">
                                            {snippets.length}
                                        </span>
                                    </button>
                                    {uniqueCategories.map((category) => (
                                        <button
                                            key={category}
                                            className={`btn w-full justify-start gap-2 font-normal border-0 ${selectedCategory === category ? 'btn-active btn-soft bg-info/30' : 'btn-ghost bg-base-content/5'}`}
                                            onClick={() => setSelectedCategory(category)}>
                                            <Folder className="h-4 w-4" />
                                            {category}
                                            <span className="badge badge-default bg-base/40 border-0 badge-sm ml-auto">
                                                {snippets.filter((s) => s.category === category).length}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className=" bg-base-100 border border-base-300 rounded-md p-4">
                                <h3 className="font-medium mb-3 border-b border-base-content/15 pb-2 border-dashed">
                                    Etiquetas
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        className={`btn btn-sm btn-soft btn-info gap-1 h-7 ${selectedTag === null ? 'btn-active' : 'btn-ghost'}`}
                                        onClick={() => setSelectedTag(null)}>
                                        <Tag className="h-3 w-3" />
                                        Todas
                                    </button>
                                    {uniqueTags.map((tag) => (
                                        <button
                                            key={tag}
                                            className={`btn btn-sm btn-soft btn-info gap-1 h-7 ${selectedTag === tag ? 'btn-active' : 'btn-ghost'}`}
                                            onClick={() => setSelectedTag(tag)}>
                                            <Tag className="h-3 w-3" />
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-3 space-y-4 bg-base-100 border border-base-300 rounded-sm p-4 bg-lines">
                        {loading && <div className="text-center text-zinc-400 mt-8">Cargando snippets...</div>}
                        {error && (
                            <div className="alert alert-error bg-red-800 text-red-200 border-red-700 p-3 rounded-md text-sm flex items-center gap-2 mt-8">
                                <AlertCircle className="size-4 text-red-400" />
                                <p>{error}</p>
                            </div>
                        )}
                        {!loading && !error && (
                            <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4">
                                {filteredSnippets.length === 0 ? (
                                    <p className="col-span-full text-center text-zinc-500 text-lg mt-8">
                                        {searchTerm || selectedCategory || selectedTag
                                            ? 'No se encontraron snippets que coincidan con los filtros.'
                                            : 'Aún no hay snippets guardados.'}
                                    </p>
                                ) : (
                                    filteredSnippets.map((snippet) => (
                                        <SnippetCard
                                            key={snippet.id}
                                            snippet={snippet}
                                            onDelete={handleOpenDeleteConfirm}
                                            onEdit={handleOpenEditModal}
                                            onOpenCodeModal={handleOpenCodeModal}
                                        />
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <dialog ref={createModalRef} className={`modal ${isCreateModalOpen ? 'modal-open' : ''}`}>
                <div className="modal-box p-6 rounded-lg shadow-xl max-w-2xl w-full bg-base-300">
                    <h3 className="font-bold text-xl  mb-4 flex items-center gap-2">
                        <Plus className="size-6 text-blue-500" /> Crear Nuevo Snippet
                    </h3>
                    <form method="dialog">
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={handleCloseCreateModal}>
                            ✕
                        </button>
                    </form>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="flex flex-col gap-1 label items-start text-sm">
                                <span className="label-text">
                                    Título
                                    <span className="text-red-500">*</span>
                                </span>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Ej: Función para Debounce"
                                    className="input input-sm w-full"
                                    value={newSnippetData.title}
                                    onChange={handleCreateInputChange}
                                    disabled={isSaving}
                                />
                            </label>
                        </div>
                        <label className="flex flex-col gap-1 label items-start text-sm">
                            <span className="label-text">
                                Lenguaje <span className="text-red-500">*</span>
                            </span>
                            <select
                                name="language"
                                className="select select-sm capitalize  w-full"
                                value={newSnippetData.language}
                                onChange={handleCreateInputChange}
                                disabled={isSaving}>
                                <option value="" disabled>
                                    Selecciona un lenguaje
                                </option>
                                {languages.map((language) => (
                                    <option className="capitalize" key={language} value={language}>
                                        {language}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="flex flex-col gap-1 label items-start text-sm">
                            <span className="label-text text-zinc-700 dark:text-zinc-300">
                                Código <span className="text-red-500">*</span>
                            </span>
                            <textarea
                                name="code"
                                placeholder={`function sum(a, b) {\n  return a + b;\n}`}
                                className="textarea w-full h-48 font-mono text-sm resize-y"
                                value={newSnippetData.code}
                                onChange={handleCreateInputChange}
                                disabled={isSaving}></textarea>
                        </label>
                        <label className="flex flex-col gap-1 label items-start text-sm">
                            <span className="label-text ">Descripción (opcional)</span>
                            <textarea
                                name="description"
                                placeholder="Una breve explicación del snippet."
                                className="textarea w-full resize-none"
                                value={newSnippetData.description || ''}
                                onChange={handleCreateInputChange}
                                rows={2}
                                disabled={isSaving}></textarea>
                        </label>
                        <label className="flex flex-col gap-1 label items-start text-sm">
                            <span className="label-text ">Categoría (opcional)</span>
                            <input
                                type="text"
                                name="category"
                                placeholder="Ej: Frontend, Backend, Utilidades"
                                className="input input-sm w-full  resize-none"
                                value={newSnippetData.category || ''}
                                onChange={handleCreateInputChange}
                                disabled={isSaving}
                            />
                        </label>
                        <label className="flex flex-col gap-1 label items-start text-sm">
                            <span className="label-text ">Etiquetas (separadas por comas, opcional)</span>
                            <input
                                type="text"
                                name="tags"
                                placeholder="Ej: react, hooks, forms"
                                className="input input-sm w-full "
                                value={newSnippetData.tags.join(', ')}
                                onChange={handleTagsChange}
                                disabled={isSaving}
                            />
                        </label>

                        {saveError && (
                            <div className="alert alert-error bg-red-800 text-red-200 border-red-700 p-3 rounded-md text-sm flex items-center gap-2">
                                <AlertCircle className="size-4 text-red-400" />
                                <p>{saveError}</p>
                            </div>
                        )}

                        <div className="modal-action mt-4">
                            <button
                                type="button"
                                onClick={handleSaveNewSnippet}
                                className={`btn btn-success${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={
                                    isSaving ||
                                    !newSnippetData.title.trim() ||
                                    !newSnippetData.code.trim() ||
                                    !newSnippetData.language.trim()
                                }>
                                {isSaving ? (
                                    'Guardando...'
                                ) : (
                                    <>
                                        <Save className="size-5 mr-2" /> Guardar Snippet
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
            {/* --- Modal de Confirmación de Eliminación --- */}
            <dialog ref={deleteConfirmModalRef} className={`modal ${isDeleteConfirmOpen ? 'modal-open' : ''}`}>
                <div className="modal-box  p-6 rounded-lg shadow-xl">
                    <h3 className="font-bold text-xl text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
                        <Trash2 className="size-6 text-error" /> Confirmar Eliminación
                    </h3>
                    <form method="dialog">
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={handleCloseDeleteConfirm}>
                            ✕
                        </button>
                    </form>
                    {snippetToDelete && (
                        <p className="my-6 flex flex-col gap-1 items-center text-zinc-600 dark:text-zinc-400">
                            ¿Estás seguro de que quieres eliminar el snippet?
                            <strong className="text-error">{snippetToDelete.title}</strong>
                            Esta acción no se puede deshacer.
                        </p>
                    )}

                    {deleteError && (
                        <div className="alert alert-error bg-red-800 text-red-200 border-red-700 p-3 rounded-md text-sm flex items-center gap-2 mb-4">
                            <AlertCircle className="size-4 text-error" />
                            <p>{deleteError}</p>
                        </div>
                    )}

                    <div className="modal-action justify-end mt-4">
                        <button type="button" onClick={handleCloseDeleteConfirm} className="btn btn-soft ">
                            <X className="size-4" />
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleDeleteConfirmed}
                            className={`btn btn-error ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isDeleting}>
                            {isDeleting ? (
                                'Eliminando...'
                            ) : (
                                <>
                                    <Trash2 className="size-5 mr-2" /> Eliminar
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </dialog>
            <dialog className="modal" ref={codeModalRef}>
                <div className="modal-box max-w-full h-[calc(100svh-4rem)]">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 mb-2"
                        onClick={handleCloseCodeModal}>
                        ✕
                    </button>
                    <CodeBlock code={snippetToView?.code || ''} language={'typescript'} theme={themes.oneDark}>
                        <CodeBlock.Code className="bg-neutral-900 !p-6 mt-6 rounded-b-sm shadow-lg border-1 w-full h-[calc(100svh-9rem)] border-gray-800 overflow-y-auto scrollbar-thin">
                            <div className="table-row">
                                <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
                                <CodeBlock.LineContent className="table-cell">
                                    <CodeBlock.Token />
                                </CodeBlock.LineContent>
                            </div>
                        </CodeBlock.Code>
                    </CodeBlock>
                </div>
            </dialog>
        </LayoutSubSection>
    );
}
