import { RequestHistory } from '@prisma/client';
import axios from 'axios';

interface RequestHistoryResponse {
    error?: string;
    message?: string;
    data?: RequestHistory;
}

interface GetRequestHistoryResponse {
    error?: string;
    message?: string;
    response?: RequestHistory[];
}

export async function saveRequestToHistory({
    method,
    url,
    headers,
    body,
    response,
    statusCode,
}: {
    method: string;
    url: string;
    headers: Record<string, string>;
    body?: string;
    response?: string;
    statusCode?: number;
}): Promise<RequestHistory | undefined> {
    try {
        const res = await axios.post<RequestHistoryResponse>(
            '/api/http-requests',
            {
                method,
                url,
                headers,
                body,
                response,
                statusCode,
            }
        );
        if (res.status === 201) {
            return res.data.data;
        }
        return undefined;
    } catch (error) {
        console.error('Error al guardar la solicitud:', error);
        return undefined;
    }
}

export async function getRequests(): Promise<RequestHistory[] | undefined> {
    try {
        const res =
            await axios.get<GetRequestHistoryResponse>('/api/http-requests');
        if (res.status === 200) {
            return res.data.response;
        }
        return undefined;
    } catch (error) {
        console.error('Error al obtener las solicitudes:', error);
        return undefined;
    }
}
