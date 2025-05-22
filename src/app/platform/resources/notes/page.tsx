'use client';
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, TrashIcon, PencilIcon } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import HeaderSection from '../../componentes/HeaderSection';
import {
    createNote,
    CreateNotePayload,
    deleteNote,
    getNoteByUser,
    getNotes,
    updateNote,
} from '@/services/notes.service';
import { Note } from '@prisma/client';
import { toast } from 'react-hot-toast';

const noteColors = ['primary', 'success', 'error', 'warning', 'accent', 'info', 'neutral'];

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
        return notes.filter(note => 
            note.title.toLowerCase().includes(query) || 
            note.content.toLowerCase().includes(query)
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

    const handleAddNote = async () => {
        if (!newNote.title.trim() || !newNote.content.trim()) return;
        try {
            if (!userId) return;
            const noteData: CreateNotePayload = {
                title: newNote.title,
                content: newNote.content,
                color: newNote.color,
                userId: userId,
            };

            const newNoteObj = await createNote(noteData);
            setNotes([...notes, newNoteObj]);
            setNewNote({ title: '', content: '', color: '' });
            setIsModalOpen(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error creating note');
        }
    };

    const handleUpdateNote = async (updatedNote: Note) => {
        try {
            const updatedNoteObj = await updateNote(updatedNote.id, updatedNote);
            if (updatedNoteObj) {
                setNotes(notes.map((note) => (note.id === updatedNote.id ? { ...note, ...updatedNote } : note)));
                setEditingNote(null);
                setIsModalOpen(false);
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

    return (
        <div className="flex flex-col h-full">
            <HeaderSection title="Notas" description="Gestiona tus notas y recordatorios aquí" />
            <div className="flex-grow p-4 space-y-6">
                <div className="flex justify-between items-center">
                    <button onClick={() => setIsModalOpen(true)} className="btn btn-primary btn-sm">
                        <PlusIcon className="w-4 h-4 mr-2" />
                        Nueva nota
                    </button>
                </div>

                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-base-100 p-4 rounded-lg shadow max-w-xl">
                        <div className="space-y-4 bg-primary p-2 rounded-lg">
                            <div className="flex items-center gap-2 bg-base-200 p-2 rounded-lg">
                                {noteColors.map((color, index) => (
                                    <button
                                        key={index}
                                        className={`size-6 rounded-full bg-${color} shadow-sm hover:scale-110 transition-all cursor-pointer`}
                                        onClick={() => {
                                            if (editingNote) {
                                                setEditingNote({ ...editingNote, color });
                                            } else {
                                                setNewNote({ ...newNote, color });
                                            }
                                        }}
                                    />
                                ))}
                            </div>
                            <input
                                type="text"
                                placeholder="Título de la nota"
                                value={editingNote ? editingNote.title : newNote.title}
                                onChange={(e) =>
                                    editingNote
                                        ? setEditingNote({ ...editingNote, title: e.target.value })
                                        : setNewNote({ ...newNote, title: e.target.value, color: newNote.color })
                                }
                                className="input input-bordered w-full"
                            />
                            <textarea
                                placeholder="Contenido de la nota..."
                                value={editingNote ? editingNote.content : newNote.content}
                                onChange={(e) =>
                                    editingNote
                                        ? setEditingNote({ ...editingNote, content: e.target.value })
                                        : setNewNote({ ...newNote, content: e.target.value, color: newNote.color })
                                }
                                className="textarea textarea-bordered w-full h-32"
                            />
                            <div className="space-y-2">
                                <label className="label">
                                    <span className="label-text">Color de la nota</span>
                                </label>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => {
                                        if (editingNote) {
                                            setEditingNote(null);
                                        } else {
                                            setNewNote({ title: '', content: '', color: '' });
                                        }
                                        setIsModalOpen(false);
                                    }}
                                    className="btn btn-ghost">
                                    Cancelar
                                </button>
                                <button
                                    onClick={editingNote ? () => handleUpdateNote(editingNote) : handleAddNote}
                                    className="btn btn-primary">
                                    {editingNote ? 'Actualizar' : 'Guardar'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

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
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="btn btn-primary btn-sm">
                            <PlusIcon className="w-4 h-4 mr-2" />
                            Nueva nota
                        </button>
                    </div>

                    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
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
                                    <div className={`p-4 rounded-lg bg-${note.color} text-white`}>
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
                                                <button
                                                    onClick={() => {
                                                        setEditingNote(note);
                                                        setIsModalOpen(true);
                                                    }}
                                                    className="btn btn-ghost btn-sm hover:scale-105 transition-transform">
                                                    <PencilIcon className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteNote(note.id.toString())}
                                                    className="btn btn-error btn-sm hover:scale-105 transition-transform">
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
