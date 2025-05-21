'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { RequestForm } from './components/RequestForm';
import { ResponseViewer } from './components/ResponseViewer';
import HeaderSection from '../../componentes/HeaderSection';
import { saveRequestToHistory } from '@/services/httpRequest.service';
import {
    getHistoryFromLocalStorage,
    saveHistoryToLocalStorage,
} from '@/lib/storage';
import { RequestHistory } from '@prisma/client';
import head from 'next/head';

export default function HttpClientPage() {
    const [response, setResponse] = useState({
        status: 0,
        statusText: '',
        headers: {},
        body: {},
    });

    const [history, setHistory] = useState<RequestHistory[]>([]);

    const [formState, setFormState] = useState<{
        method: string;
        url: string;
        headers: { key: string; value: string }[];
        body: string;
    } | null>(null);

    console.log(history);

    useEffect(() => {
        const savedHistory = getHistoryFromLocalStorage();
        setHistory(savedHistory);
    }, []);

    const sendRequest = async ({ method, url, headers, body }: any) => {
        try {
            const formattedHeaders: Record<string, string> = {};
            headers.forEach((h: any) => {
                if (h.key && h.value) formattedHeaders[h.key] = h.value;
            });

            const res = await axios({
                method,
                url,
                headers: formattedHeaders,
                data: body ? JSON.parse(body) : undefined,
                validateStatus: () => true, // para mostrar también errores
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

            /*if (res.status >= 200 && res.status < 300) {
                await saveRequestToHistory({
                    method,
                    url,
                    headers,
                    body,
                    response: JSON.stringify(res.data),
                    statusCode: res.status,
                });
            }*/
            setResponse({
                status: res.status,
                statusText: res.statusText,
                headers: res.headers,
                body: res.data,
            });
            saveHistoryToLocalStorage({
                method,
                url,
                headers,
                body,
                response: JSON.stringify(res.data),
                created_at: new Date(),
                id: '',
                userId: '',
            });
            setHistory((prev) => [
                ...prev,
                {
                    method,
                    url,
                    headers,
                    body,
                    response: JSON.stringify(res.data),
                    created_at: new Date(),
                    id: '',
                    userId: '',
                },
            ]);
        } catch (err: any) {
            setResponse({
                status: 0,
                statusText: 'Error de red o JSON inválido',
                headers: {},
                body: { message: err.message },
            });
        }
    };

    return (
        <div className="max-w-(--max-width) mx-auto flex flex-col h-[calc(100svh-3.8rem)] flex-grow overflow-y-auto scrollbar-thin">
            <HeaderSection
                title="HTTP Client"
                description="Envía y gestiona tus peticiones HTTP con facilidad."
            />
            <div className="grid grid-cols-[300px_1fr] gap-2 p-2 max-md:flex max-md:flex-col">
                <aside className="bg-base-100 shadow-md rounded-sm p-4">
                    <h3 className="font-semibold mb-2">
                        Historial de Peticiones
                    </h3>
                    {history.length === 0 ? (
                        <p className="text-sm text-gray-400">
                            Aún no hay historial.
                        </p>
                    ) : (
                        <ul className="divide-y divide-base-300">
                            {history.map((entry, i) => (
                                <li
                                    key={i}
                                    className="py-2 cursor-pointer hover:bg-base-200 px-2 rounded"
                                    onClick={() =>
                                        setFormState({
                                            method: entry.method,
                                            url: entry.url,
                                            headers:
                                                (entry.headers as {
                                                    key: string;
                                                    value: string;
                                                }[]) || [],
                                            body: entry.body || '',
                                        })
                                    }>
                                    <div className="text-sm">
                                        <span className="font-bold">
                                            {entry.method}
                                        </span>{' '}
                                        <span className="text-blue-600">
                                            {entry.url}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {new Date(
                                            entry.created_at
                                        ).toLocaleString()}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </aside>
                <div className="flex flex-col gap-2 ">
                    <section className="bg-base-100 shadow-md rounded-sm p-4 space-y-4">
                        <RequestForm
                            onSend={sendRequest}
                            initialValues={formState || undefined}
                        />
                    </section>
                    <section className="bg-base-100 shadow-md rounded-sm p-4 ">
                        <ResponseViewer response={response} />
                    </section>
                </div>
            </div>
        </div>
    );
}
