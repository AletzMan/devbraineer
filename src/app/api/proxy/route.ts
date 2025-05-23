import { auth } from '@clerk/nextjs/server';
import { BadRequestError, NotAuthorizedError, ServerError } from '../_services/errors';
import axios from 'axios';
import { SuccessCreate } from '../_services/successfulResponses';

function headersToObject(headers: Headers): Record<string, string> {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
        result[key] = value;
    });
    return result;
}

export async function POST(request: Request) {
    const start = performance.now();
    try {
        const { url, method, body, headers } = await request.json(); // ← Asegúrate que `url`, `method`, `headers`, `body` vengan aquí
        if (!url) return BadRequestError('URL is required');

        const { userId } = await auth();
        if (!userId) return NotAuthorizedError();

        const axiosResponse = await axios({
            method: method || 'GET',
            url,
            headers: headersToObject(new Headers(headers || {})), // ← transforma si viene como objeto Headers
            data: body || undefined,
            validateStatus: () => true,
            transformResponse: [
                (data, headers) => {
                    const contentType = headers['content-type'] || '';
                    if (contentType.includes('application/json')) {
                        try {
                            return JSON.parse(data);
                        } catch {
                            return data;
                        }
                    }
                    return data;
                },
            ],
        });
        const end = performance.now();
        const rawData = JSON.stringify(axiosResponse.data);
        const sizeInBytes = new TextEncoder().encode(rawData).length;
        const sizeInKB = (sizeInBytes / 1024).toFixed(2);

        const cleanResponse = {
            status: axiosResponse.status,
            statusText: axiosResponse.statusText,
            headers: axiosResponse.headers,
            data: axiosResponse.data,
            time: end - start,
            size: sizeInKB,
        };
        console.log(cleanResponse);
        return SuccessCreate(cleanResponse);
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        return ServerError();
    }
}
