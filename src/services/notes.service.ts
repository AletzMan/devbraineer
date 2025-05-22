import axios from 'axios';
import { Note } from '@prisma/client';

// Define un tipo para el payload de creación, excluyendo ID y fechas
export type CreateNotePayload = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;

export type NoteResponseCreate = {
    error?: string;
    message?: string;
    data?: Note;
};

export type NoteResponseGet = {
    error?: string;
    message?: string;
    response?: Note[];
};

export type NoteResponseDelete = {
    error?: string;
    message?: string;
    data?: Note;
};

// Función para obtener todas las notas
export const getNotesById = async (id: string): Promise<Note[]> => {
    try {
        const response = await axios.get<NoteResponseGet>(`/api/notes/${id}`);
        if (response.status === 200) {
            return response.data.response as Note[];
        }
        throw new Error('No notes found');
    } catch (error: any) {
        console.error('Failed to fetch notes:', error);
        throw new Error(error.response?.data?.message || 'Error fetching notes');
    }
};

export const getNotes = async (): Promise<Note[]> => {
    try {
        const response = await axios.get<NoteResponseGet>(`/api/notes`);
        if (response.status === 200) {
            return response.data.response as Note[];
        }
        throw new Error('No notes found');
    } catch (error: any) {
        console.error('Failed to fetch notes:', error);
        throw new Error(error.response?.data?.message || 'Error fetching notes');
    }
};

export const getNoteByUser = async (userId: string): Promise<Note[]> => {
    try {
        const response = await axios.get<NoteResponseGet>(`/api/notes/user/${userId}`);
        if (response.status === 200) {
            return response.data.response as Note[];
        }
        throw new Error('No notes found');
    } catch (error: any) {
        console.error('Failed to fetch notes:', error);
        throw new Error(error.response?.data?.message || 'Error fetching notes');
    }
};
// Función para crear una nueva nota
export const createNote = async (noteData: CreateNotePayload): Promise<Note> => {
    try {
        const response = await axios.post<NoteResponseCreate>('/api/notes', noteData);
        if (response.status === 201) {
            return response.data.data as Note;
        }
        throw new Error('Failed to create note');
    } catch (error: any) {
        console.error('Failed to create note:', error);
        throw new Error(error.response?.data?.message || 'Error creating note');
    }
};

// Función para eliminar una nota por ID
export const deleteNote = async (id: string): Promise<void> => {
    try {
        const response = await axios.delete<NoteResponseDelete>(`/api/notes/${id}`);
        if (response.status !== 200) {
            throw new Error('Failed to delete note');
        }
    } catch (error: any) {
        console.error('Failed to delete note:', error);
        throw new Error(error.response?.data?.message || 'Error deleting note');
    }
};

// Función para actualizar una nota
export const updateNote = async (id: string, updateData: Partial<CreateNotePayload>): Promise<Note> => {
    try {
        const response = await axios.put<NoteResponseCreate>(`/api/notes/${id}`, updateData);
        if (response.status === 200) {
            return response.data.data as Note;
        }
        throw new Error('Failed to update note');
    } catch (error: any) {
        console.error('Failed to update note:', error);
        throw new Error(error.response?.data?.message || 'Error updating note');
    }
};
