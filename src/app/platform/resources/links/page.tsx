// app/links/page.tsx
'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import {
    Plus,
    Search,
    AlertCircle,
    Trash2,
    Edit,
    Folder,
    Tag,
    Save,
    Link as LinkIcon,
} from 'lucide-react';
import { Link } from '@prisma/client'; // Importa el tipo Link de Prisma
import {
    getLinks,
    createLink,
    updateLink,
    deleteLink,
    CreateUpdateLinkPayload,
} from '@/services/link.service';
import { toast, Toaster } from 'react-hot-toast';
import LinkCard from './components/LinkCard'; // Asegúrate de que LinkCard también tenga estilos consistentes

export default function LinksPage() {
    const [links, setLinks] = useState<Link[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Estado para búsqueda y filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Estados para el modal de creación/edición
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const formModalRef = useRef<HTMLDialogElement>(null);
    const [currentLink, setCurrentLink] = useState<Link | null>(null); // Null para crear, Link para editar
    const [formData, setFormData] = useState<CreateUpdateLinkPayload>({
        title: '',
        url: '',
        description: '',
        category: '',
        sharerId: '', // Este campo probablemente necesita un valor por defecto o ser opcional
        thumbnailUrl: '',
        created_at: new Date(),
        updated_at: new Date(),
        tags: [],
    });
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    // Estados para el modal de eliminación
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const deleteConfirmModalRef = useRef<HTMLDialogElement>(null);
    const [linkToDelete, setLinkToDelete] = useState<Link | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    // --- Cargar Links al inicio ---
    useEffect(() => {
        const fetchLinks = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedLinks = await getLinks();
                if (fetchedLinks) {
                    setLinks(fetchedLinks);
                }
            } catch (err: any) {
                console.error('Error fetching links:', err);
                setError(err.message || 'No se pudieron cargar los enlaces.');
            } finally {
                setLoading(false);
            }
        };
        fetchLinks();
    }, []);

    // --- Lógica de filtrado y búsqueda ---
    const filteredLinks = useMemo(() => {
        let currentLinks = links;

        if (searchTerm) {
            currentLinks = currentLinks.filter(
                (l) =>
                    l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    l.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (l.description?.toLowerCase() || '').includes(
                        searchTerm.toLowerCase()
                    ) ||
                    (l.category?.toLowerCase() || '').includes(
                        searchTerm.toLowerCase()
                    ) ||
                    l.tags.some((tag) =>
                        tag.toLowerCase().includes(searchTerm.toLowerCase())
                    )
            );
        }

        if (selectedCategory) {
            currentLinks = currentLinks.filter(
                (l) => l.category === selectedCategory
            );
        }

        if (selectedTag) {
            currentLinks = currentLinks.filter((l) =>
                l.tags.includes(selectedTag)
            );
        }

        return currentLinks;
    }, [links, searchTerm, selectedCategory, selectedTag]);

    // --- Obtener categorías y tags únicos para los filtros laterales ---
    const { uniqueCategories, uniqueTags } = useMemo(() => {
        const categories = new Set<string>();
        const tags = new Set<string>();

        links.forEach((link) => {
            if (link.category) categories.add(link.category);
            if (link.tags) link.tags.forEach((tag) => tags.add(tag));
        });

        return {
            uniqueCategories: Array.from(categories).sort(),
            uniqueTags: Array.from(tags).sort(),
        };
    }, [links]);

    // --- Manejo del modal de creación/edición ---
    const handleOpenCreateModal = () => {
        setCurrentLink(null); // Para crear, no hay link actual
        setFormData({
            title: '',
            url: '',
            description: '',
            category: '',
            sharerId: '', // Asegúrate de manejar este campo si es obligatorio
            thumbnailUrl: '',
            created_at: new Date(),
            updated_at: new Date(),
            tags: [],
        }); // Reset form
        setIsFormModalOpen(true);
        formModalRef.current?.showModal();
        setSaveError(null);
    };

    const handleOpenEditModal = (link: Link) => {
        setCurrentLink(link); // Establecer el link actual para editar
        setFormData({
            title: link.title,
            url: link.url,
            description: link.description,
            category: link.category,
            tags: link.tags,
            sharerId: link.sharerId,
            thumbnailUrl: link.thumbnailUrl,
            created_at: link.created_at,
            updated_at: link.updated_at,
        });
        setIsFormModalOpen(true);
        formModalRef.current?.showModal();
        setSaveError(null);
    };

    const handleCloseFormModal = () => {
        setIsFormModalOpen(false);
        formModalRef.current?.close();
    };

    const handleFormInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData((prev) => ({
            ...prev,
            tags: value
                .split(',')
                .map((tag) => tag.trim())
                .filter(Boolean),
        }));
    };

    const handleSaveLink = async () => {
        if (!formData.title.trim() || !formData.url.trim()) {
            setSaveError('Título y URL son obligatorios.');
            return;
        }

        setIsSaving(true);
        setSaveError(null);

        try {
            if (currentLink) {
                // Editar enlace existente
                const updated = await updateLink(currentLink.id, formData);
                if (updated) {
                    setLinks((prev) =>
                        prev.map((l) => (l.id === updated.id ? updated : l))
                    );
                }
                toast.success('Enlace actualizado exitosamente!');
            } else {
                // Crear nuevo enlace
                const created = await createLink(formData);
                if (created) {
                    setLinks((prev) => [created, ...prev]);
                }
                toast.success('Enlace guardado exitosamente!');
            }
            handleCloseFormModal();
        } catch (err: any) {
            console.error('Error saving link:', err);
            setSaveError(err.message || 'Error al guardar el enlace.');
            toast.error(err.message || 'Error al guardar el enlace.');
        } finally {
            setIsSaving(false);
        }
    };

    // --- Manejo del modal de eliminación ---
    const handleOpenDeleteConfirm = (link: Link) => {
        setLinkToDelete(link);
        setIsDeleteConfirmOpen(true);
        deleteConfirmModalRef.current?.showModal();
        setDeleteError(null);
    };

    const handleCloseDeleteConfirm = () => {
        setIsDeleteConfirmOpen(false);
        setLinkToDelete(null);
        deleteConfirmModalRef.current?.close();
    };

    const handleDeleteConfirmed = async () => {
        if (!linkToDelete) return;

        setIsDeleting(true);
        setDeleteError(null);

        try {
            await deleteLink(linkToDelete.id);
            setLinks((prev) => prev.filter((l) => l.id !== linkToDelete.id));
            toast.success('Enlace eliminado exitosamente!');
            handleCloseDeleteConfirm();
        } catch (err: any) {
            console.error('Error deleting link:', err);
            setDeleteError(err.message || 'Error al eliminar el enlace.');
            toast.error(err.message || 'Error al eliminar el enlace.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex flex-col min-h-[calc(100svh-4rem)] bg-neutral/30">
            <Toaster position="top-right" />
            <div className="flex-1 max-w-(--max-width) mx-auto w-full">
                <header className="flex flex-col sm:flex-row items-center justify-between mb-6 bg-white/5 border-b border-gray-700 px-4 py-2">
                    <div>
                        <h1 className="text-2xl font-bold text-secondary">
                            Enlaces Guardados
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400">
                            Colecciona y organiza tus recursos web favoritos
                        </p>
                    </div>
                    <button
                        className="btn btn-success gap-1 mt-4 sm:mt-0"
                        onClick={handleOpenCreateModal}>
                        <Plus className="w-4 h-4" />
                        Nuevo Enlace
                    </button>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-y-auto h-[calc(100svh-10.5rem)] pb-4 px-4 ">
                    <div className="md:col-span-1 bg-neutral/40 p-4 rounded-md">
                        <div className="sticky top-4 space-y-4">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                                <input
                                    type="search"
                                    placeholder="Buscar enlaces..."
                                    className="input input-bordered w-full pl-9"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            </div>
                            <div className="bg-neutral/40 rounded-md border border-gray-700 p-4">
                                <h3 className="font-medium mb-3 ">
                                    Categorías
                                </h3>
                                <div className="space-y-2">
                                    <button
                                        className={`btn w-full justify-start gap-2 font-normal ${selectedCategory === null ? 'btn-active btn-soft' : 'btn-ghost'}`}
                                        onClick={() =>
                                            setSelectedCategory(null)
                                        }>
                                        <Folder className="h-4 w-4" />
                                        Todas
                                        <span className="ml-auto text-zinc-500 dark:text-zinc-400 text-xs">
                                            {links.length}
                                        </span>
                                    </button>
                                    {uniqueCategories.map((category) => (
                                        <button
                                            key={category}
                                            className={`btn w-full justify-start gap-2 font-normal ${selectedCategory === category ? 'btn-active btn-soft' : 'btn-ghost'}`}
                                            onClick={() =>
                                                setSelectedCategory(category)
                                            }>
                                            <Folder className="h-4 w-4" />
                                            {category}
                                            <span className="ml-auto text-zinc-500 dark:text-zinc-400 text-xs">
                                                {
                                                    links.filter(
                                                        (l) =>
                                                            l.category ===
                                                            category
                                                    ).length
                                                }
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-neutral/40 rounded-md border border-gray-700 p-4">
                                <h3 className="font-medium mb-3 ">Etiquetas</h3>
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
                    <div className="md:col-span-3 space-y-4 bg-neutral/40 p-4 rounded-md">
                        {loading && (
                            <div className="text-center text-zinc-400 mt-8">
                                Cargando enlaces...
                            </div>
                        )}
                        {error && (
                            <div className="alert alert-error bg-red-800 text-red-200 border-red-700 p-3 rounded-md text-sm flex items-center gap-2 mt-8">
                                <AlertCircle className="size-4 text-red-400" />
                                <p>{error}</p>
                            </div>
                        )}
                        {!loading && !error && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredLinks.length === 0 ? (
                                    <p className="col-span-full text-center text-zinc-500 text-lg mt-8">
                                        {searchTerm ||
                                        selectedCategory ||
                                        selectedTag
                                            ? 'No se encontraron enlaces que coincidan con los filtros.'
                                            : 'Aún no hay enlaces guardados.'}
                                    </p>
                                ) : (
                                    filteredLinks.map((link) => (
                                        <LinkCard
                                            key={link.id}
                                            link={link}
                                            onDelete={handleOpenDeleteConfirm}
                                            onEdit={handleOpenEditModal}
                                        />
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <dialog
                ref={formModalRef}
                className={`modal ${isFormModalOpen ? 'modal-open' : ''}`}>
                <div className="modal-box shadow-xl max-w-2xl w-full bg-base-300">
                    <h3 className="font-bold text-xl text-zinc-50 mb-4 flex items-center gap-2">
                        {currentLink ? (
                            <>
                                <Edit className="size-6 text-blue-500" /> Editar
                                Enlace
                            </>
                        ) : (
                            <>
                                <Plus className="size-6 text-blue-500" /> Nuevo
                                Enlace
                            </>
                        )}
                    </h3>
                    <form method="dialog">
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={handleCloseFormModal}>
                            ✕
                        </button>
                    </form>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="label items-start text-sm">
                                <span className="label-text text-zinc-300">
                                    Título
                                    <span className="text-red-500">*</span>
                                </span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Ej: Documentación de React Hooks"
                                className="input input-bordered w-full"
                                value={formData.title}
                                onChange={handleFormInputChange}
                                disabled={isSaving}
                            />
                        </div>
                        <div>
                            <label className="label items-start text-sm">
                                <span className="label-text text-zinc-300">
                                    URL <span className="text-red-500">*</span>
                                </span>
                            </label>
                            <input
                                type="url"
                                name="url"
                                placeholder="https://example.com/mi-recurso"
                                className="input input-bordered w-full"
                                value={formData.url}
                                onChange={handleFormInputChange}
                                disabled={isSaving}
                            />
                        </div>
                        <div>
                            <label className="label items-start text-sm">
                                <span className="label-text text-zinc-300">
                                    Thumbnail URL (opcional)
                                </span>
                            </label>
                            <input
                                type="url"
                                name="thumbnailUrl"
                                placeholder="https://example.com/mi-recurso"
                                className="input input-bordered w-full"
                                value={formData.thumbnailUrl || ''}
                                onChange={handleFormInputChange}
                                disabled={isSaving}
                            />
                        </div>
                        <div>
                            <label className="label items-start text-sm">
                                <span className="label-text text-zinc-300">
                                    {/* Ajustado color de texto */}
                                    Descripción (opcional)
                                </span>
                            </label>
                            <textarea
                                name="description"
                                placeholder="Una breve descripción del contenido del enlace."
                                className="textarea textarea-bordered w-full resize-y"
                                value={formData.description || ''}
                                onChange={handleFormInputChange}
                                rows={2}
                                disabled={isSaving}></textarea>
                        </div>
                        <div>
                            <label className="label items-start text-sm">
                                <span className="label-text text-zinc-300">
                                    {/* Ajustado color de texto */}
                                    Categoría (opcional)
                                </span>
                            </label>
                            <input
                                type="text"
                                name="category"
                                placeholder="Ej: Tutoriales, Herramientas, Docs"
                                className="input input-bordered w-full"
                                value={formData.category || ''}
                                onChange={handleFormInputChange}
                                disabled={isSaving}
                            />
                        </div>
                        <div>
                            <label className="label items-start text-sm">
                                <span className="label-text text-zinc-300">
                                    Etiquetas (separadas por comas, opcional)
                                </span>
                            </label>
                            <input
                                type="text"
                                name="tags"
                                placeholder="Ej: css, tailwind, animaciones"
                                className="input input-bordered w-full"
                                value={formData.tags.join(', ')}
                                onChange={handleTagsChange}
                                disabled={isSaving}
                            />
                        </div>

                        {saveError && (
                            <div className="alert alert-error bg-red-800 text-red-200 border-red-700 p-3 rounded-md text-sm flex items-center gap-2">
                                <AlertCircle className="size-4 text-red-400" />
                                <p>{saveError}</p>
                            </div>
                        )}

                        <div className="modal-action mt-4">
                            <button
                                type="button"
                                onClick={handleSaveLink}
                                className={`btn btn-success  ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={
                                    isSaving ||
                                    !formData.title.trim() ||
                                    !formData.url.trim()
                                }>
                                {isSaving ? (
                                    'Guardando...'
                                ) : (
                                    <>
                                        <Save className="size-5 mr-2" />
                                        {currentLink
                                            ? 'Actualizar Enlace'
                                            : 'Guardar Enlace'}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>

            <dialog
                ref={deleteConfirmModalRef}
                className={`modal ${isDeleteConfirmOpen ? 'modal-open' : ''}`}>
                <div className="modal-box  shadow-xl">
                    <h3 className="font-bold text-xl text-zinc-50 mb-4 flex items-center gap-2">
                        <Trash2 className="size-6 text-error" /> Confirmar
                        Eliminación
                    </h3>
                    <form method="dialog">
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={handleCloseDeleteConfirm}>
                            ✕
                        </button>
                    </form>
                    {linkToDelete && (
                        <p className="mb-4 text-zinc-400">
                            ¿Estás seguro de que quieres eliminar el enlace "
                            <strong className="text-red-400">
                                {linkToDelete.title}
                            </strong>
                            "? Esta acción no se puede deshacer.
                        </p>
                    )}
                    {deleteError && (
                        <div className="alert alert-error bg-red-800 text-red-200 border-red-700 p-3 rounded-md text-sm flex items-center gap-2 mb-4">
                            <AlertCircle className="size-4 text-red-400" />
                            <p>{deleteError}</p>
                        </div>
                    )}
                    <div className="modal-action justify-end mt-4">
                        <button
                            type="button"
                            onClick={handleCloseDeleteConfirm}
                            className="btn btn-soft ">
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleDeleteConfirmed}
                            className={`btn btn-error  ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
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
        </div>
    );
}
