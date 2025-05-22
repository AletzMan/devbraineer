// services/link.service.ts
import axios from 'axios';
import { Link } from '@prisma/client'; // Importa el tipo Link de Prisma

// Define un tipo para el payload de creación/actualización, excluyendo ID y fechas
export type CreateUpdateLinkPayload = Omit<Link, 'id' | 'createdAt' | 'updatedAt'>;

export type LinkResponse = {
    message: string;
    status: number;
    response: Link[];
};

export type LinkResponseDelete = {
    message: string;
    status: number;
    data: Link;
};

export type LinkResponseCreate = {
    message: string;
    status: number;
    data: Link;
};

export type LinkResponseUpdate = {
    message: string;
    status: number;
    response: Link;
};

// Función para obtener todos los enlaces
export const getLinks = async (): Promise<Link[] | undefined> => {
    try {
        const response = await axios.get<LinkResponse>('/api/links');
        if (response.status === 200) {
            return response.data.response;
        }
        return undefined;
    } catch (error: any) {
        console.error('Failed to fetch links:', error);
        throw new Error(error.response?.data?.message || 'Error fetching links');
    }
};

// Función para crear un nuevo enlace
export const createLink = async (linkData: CreateUpdateLinkPayload): Promise<Link | undefined> => {
    try {
        const response = await axios.post<LinkResponseCreate>('/api/links', linkData);
        if (response.status === 201) {
            return response.data.data;
        }
        return undefined;
    } catch (error: any) {
        console.error('Failed to create link:', error);
        throw new Error(error.response?.data?.message || 'Error creating link');
    }
};

// Función para actualizar un enlace por ID
export const updateLink = async (
    id: string,
    updateData: Partial<CreateUpdateLinkPayload>
): Promise<Link | undefined> => {
    try {
        const response = await axios.put<LinkResponseUpdate>(`/api/links/${id}`, updateData);
        if (response.status === 200) {
            return response.data.response;
        }
        return undefined;
    } catch (error: any) {
        console.error(`Failed to update link with ID ${id}:`, error);
        throw new Error(error.response?.data?.message || 'Error updating link');
    }
};

// Función para eliminar un enlace por ID
export const deleteLink = async (id: string): Promise<LinkResponseDelete | undefined> => {
    try {
        const response = await axios.delete<LinkResponseDelete>(`/api/links/${id}`);
        if (response.status === 200) {
            return response.data;
        }
        return undefined;
    } catch (error: any) {
        console.error(`Failed to delete link with ID ${id}:`, error);
        throw new Error(error.response?.data?.message || 'Error deleting link');
    }
};
