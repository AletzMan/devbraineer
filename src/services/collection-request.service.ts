import { Collection, RequestHistory } from '@prisma/client';
import axios from 'axios';

interface RequestCollectionResponse {
    error: boolean;
    message?: string;
    data?: CollectionsResponse;
}

export interface CollectionsResponse {
    name: string;
    id: string;
    userId: string;
    created_at: Date;
    requests: RequestHistory[];
}

interface RequestCollectionsResponse {
    error: boolean;
    message?: string;
    response?: CollectionsResponse[];
}

interface RequestCollectionsData {
    error: boolean;
    message?: string;
    data?: CollectionsResponse;
}

export const addToCollectionService = async (
    request: RequestHistory | undefined,
    name: string
): Promise<CollectionsResponse | undefined> => {
    try {
        const response = await axios.post<RequestCollectionResponse>('/api/collections-request', { request, name });
        if (response.status === 201) {
            return response.data.data;
        }
        return undefined;
    } catch (error) {
        console.error('Error al agregar la petición a la colección:', error);
        return undefined;
    }
};

export const getCollectionsService = async (): Promise<CollectionsResponse[] | undefined> => {
    try {
        const response = await axios.get<RequestCollectionsResponse>('/api/collections-request');
        if (response.status === 200) {
            return response.data.response;
        }
        return undefined;
    } catch (error) {
        console.error('Error al obtener las colecciones:', error);
        return undefined;
    }
};

export const deleteCollectionService = async (name: string): Promise<CollectionsResponse | undefined> => {
    try {
        const response = await axios.delete<RequestCollectionResponse>(`/api/collections-request/byName`, {
            data: { name },
        });

        if (response.status === 200) {
            return response.data.data;
        }
        return undefined;
    } catch (error) {
        console.error('Error al eliminar la colección:', error);
        return undefined;
    }
};

export const deleteCollectionsService = async (): Promise<boolean | undefined> => {
    try {
        const response = await axios.delete<RequestCollectionResponse>('/api/collections-request');
        if (response.status === 200) {
            return true;
        }
        return undefined;
    } catch (error) {
        console.error('Error al eliminar las colecciones:', error);
        return undefined;
    }
};

export const deleteCollectionByIdService = async (id: string): Promise<CollectionsResponse | undefined> => {
    try {
        const response = await axios.delete<RequestCollectionResponse>(`/api/collections-request/requests/${id}`);
        if (response.status === 200) {
            return response.data.data;
        }
        return undefined;
    } catch (error) {
        console.error('Error al eliminar la colección:', error);
        return undefined;
    }
};
