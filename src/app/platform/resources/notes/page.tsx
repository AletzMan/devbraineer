'use client';
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, TrashIcon, PencilIcon } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import HeaderSection from '../../componentes/HeaderSection';
import { createNote, CreateNotePayload, deleteNote, getNoteByUser, updateNote } from '@/services/notes.service';
import { Note } from '@prisma/client';
import { toast } from 'react-hot-toast';
import { NoteDialog } from './components/NoteDialog';

export default function NotesPage() {
    const { userId } = useAuth();
    const [notes, setNotes] = useState<Note[]>([]);
    const [newNote, setNewNote] = useState({ title: '', content: '', color: 'primary' });
    const [editingNote, setEditingNote] = useState<Note | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Filtrar notas por búsqueda
    const filteredNotes = useMemo(() => {
        if (!searchQuery) return notes;
        const query = searchQuery.toLowerCase();
        return notes.filter(
            (note) => note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query)
        );
    }, [notes, searchQuery]);

    useEffect(() => {
        loadNotes();
    }, [userId]);

    const loadNotes = async () => {
        try {
            setLoading(true);
            setError(null);
            if (userId) {
                const notes = await getNoteByUser(userId);
                setNotes(notes);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error loading notes');
        } finally {
            setLoading(false);
        }
    };

    const handleAddNote = async (data: { title: string; content: string; color: string }): Promise<void> => {
        if (!data.title.trim() || !data.content.trim()) return;
        try {
            if (!userId) return;
            const noteData: CreateNotePayload = {
                title: data.title,
                content: data.content,
                color: data.color,
                userId: userId,
            };

            const newNoteObj = await createNote(noteData);
            setNotes([...notes, newNoteObj]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error creating note');
        }
    };

    const handleUpdateNote = async (note: Note): Promise<void> => {
        try {
            const updatedNoteObj = await updateNote(note.id, note);
            if (updatedNoteObj) {
                setNotes(notes.map((n) => (n.id === note.id ? { ...n, ...note } : n)));
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error updating note');
        }
    };

    const handleDeleteNote = async (id: string) => {
        try {
            await deleteNote(id);
            setNotes(notes.filter((note) => note.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error deleting note');
        }
    };

    const handleSelectEditOrAddNote = (note: Note | null) => {
        if (note) {
            setEditingNote(note);
            setIsModalOpen(true);
        } else {
            setIsModalOpen(true);
        }
    };

    return (
        <section className="flex flex-col h-[calc(100svh-4rem)] scrollbar-thin overflow-y-auto bg-neutral/5">
            <HeaderSection title="Notas" description="Gestiona tus notas y recordatorios aquí" />
            <div className="flex-grow p-4 space-y-6">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Buscar notas..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input input-bordered w-full max-w-md"
                            />
                        </div>
                        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary btn-sm">
                            <PlusIcon className="w-4 h-4 mr-2" />
                            Nueva nota
                        </button>
                    </div>

                    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
                        {filteredNotes.length === 0 ? (
                            <p className="text-gray-400 text-center py-4">No hay notas que coincidan con la búsqueda</p>
                        ) : (
                            filteredNotes.map((note) => (
                                <motion.div
                                    key={note.id}
                                    layout
                                    initial={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <div className={`p-4 rounded-sm bg-${note.color} text-white`}>
                                        <h3 className="font-semibold mb-2">{note.title}</h3>
                                        <p className="text-sm mb-2">
                                            {note.content.substring(0, 100)}
                                            {note.content.length > 100 && '...'}
                                        </p>
                                    </div>
                                    <div className="card-body p-4">
                                        <div className="flex justify-between items-center">
                                            <p className="text-xs text-gray-500">
                                                {new Date(note.updatedAt).toLocaleString()}
                                            </p>
                                            <div className="flex space-x-2">
                                                <div className="tooltip" data-tip="Editar nota">
                                                    <button
                                                        onClick={() => handleSelectEditOrAddNote(note)}
                                                        className="btn btn-info btn-soft btn-xs hover:scale-105 transition-transform">
                                                        <PencilIcon className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="tooltip" data-tip="Eliminar nota">
                                                    <button
                                                        onClick={() => handleDeleteNote(note.id.toString())}
                                                        className="btn btn-error btn-soft btn-xs hover:scale-105 transition-transform">
                                                        <TrashIcon className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <NoteDialog
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={async (data) => {
                    if (editingNote) {
                        await handleUpdateNote({ ...editingNote, ...data });
                        setEditingNote(null);
                    } else {
                        await handleAddNote(data);
                    }
                }}
                note={editingNote}
            />
        </section>
    );
}
