import axios from 'axios';
import { Snippet } from '@prisma/client';

// Define un tipo para el payload de creación, excluyendo ID y fechas
export type CreateSnippetPayload = Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>;

export type SnippetResponseCreate = {
    error?: string;
    message?: string;
    data?: Snippet;
};

export type SnippetResponseGet = {
    error?: string;
    message?: string;
    response?: Snippet[];
};

export type SnippetResponseDelete = {
    error?: string;
    message?: string;
    data?: Snippet;
};

// Función para obtener todos los snippets
export const getSnippets = async (): Promise<Snippet[] | undefined> => {
    try {
        const response = await axios.get<SnippetResponseGet>('/api/snippets');
        if (response.status === 200) {
            return response.data.response as Snippet[];
        }
        return undefined;
    } catch (error: any) {
        console.error('Failed to fetch snippets:', error);
        throw new Error(error.response?.data?.message || 'Error fetching snippets');
    }
};

// Función para crear un nuevo snippet
export const createSnippet = async (snippetData: CreateSnippetPayload): Promise<Snippet | undefined> => {
    try {
        const response = await axios.post<SnippetResponseCreate>('/api/snippets', snippetData);
        if (response.status === 201) {
            return response.data.data as Snippet;
        }
        return undefined;
    } catch (error: any) {
        console.error('Failed to create snippet:', error);
        throw new Error(error.response?.data?.message || 'Error creating snippet');
    }
};

// Función para eliminar un snippet por ID
export const deleteSnippet = async (id: string): Promise<Snippet | undefined> => {
    try {
        const response = await axios.delete<SnippetResponseDelete>(`/api/snippets/${id}`);
        if (response.status === 200) {
            return response.data.data as Snippet;
        }
        return undefined;
    } catch (error: any) {
        console.error(`Failed to delete snippet with ID ${id}:`, error);
        throw new Error(error.response?.data?.message || 'Error deleting snippet');
    }
};

// Puedes añadir servicios para actualizar si los necesitas más adelante
/*
export const updateSnippet = async (id: string, updateData: Partial<CreateSnippetPayload>): Promise<Snippet> => {
  try {
    const response = await axios.put(`/api/snippets/${id}`, updateData);
    return response.data;
  } catch (error: any) {
    console.error(`Failed to update snippet with ID ${id}:`, error);
    throw new Error(error.response?.data?.message || 'Error updating snippet');
  }
};
*/
