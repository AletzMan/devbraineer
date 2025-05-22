'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { RequestForm } from './components/RequestForm';
import { ResponseViewer } from './components/ResponseViewer';
import HeaderSection from '../../componentes/HeaderSection';
import { getHistoryFromLocalStorage, saveHistoryToLocalStorage } from '@/lib/storage';
import { RequestHistory } from '@prisma/client';
import { useAuth } from '@clerk/nextjs';
import SideBarHistory from './components/SideBarHistory';

export default function HttpClientPage() {
    const { userId } = useAuth();
    const [response, setResponse] = useState({
        status: 0,
        statusText: '',
        headers: {},
        body: {},
        time: 0,
        size: 0,
    });

    const [history, setHistory] = useState<RequestHistory[]>([]);

    const [formState, setFormState] = useState<{
        method: string;
        url: string;
        headers: { key: string; value: string }[];
        body: string;
    } | null>(null);

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

            const res = await axios.post('/api/proxy', {
                method,
                url,
                headers: formattedHeaders,
                body: body ? JSON.parse(body) : undefined,
            });

            const responseData = res.data.data;
            setResponse({
                status: responseData.status,
                statusText: responseData.statusText,
                headers: responseData.headers,
                body: responseData.data,
                time: responseData.time,
                size: responseData.size,
            });

            saveHistoryToLocalStorage({
                method,
                url,
                headers,
                body,
                response: JSON.stringify(responseData),
                created_at: new Date(),
                id: crypto.randomUUID(),
                userId: userId || '',
            });

            setHistory((prev) => [
                ...prev,
                {
                    method,
                    url,
                    headers,
                    body,
                    response: JSON.stringify(responseData),
                    created_at: new Date(),
                    id: crypto.randomUUID(),
                    userId: userId || '',
                },
            ]);
        } catch (err: any) {
            setResponse({
                status: 0,
                statusText: 'Error de red o JSON inválido',
                headers: {},
                body: { message: err.message },
                time: 0,
                size: 0,
            });
        }
    };

    return (
        <div className="max-w-(--max-width) mx-auto flex flex-col h-[calc(100svh-3.8rem)] flex-grow overflow-y-auto scrollbar-thin">
            <HeaderSection title="HTTP Client" description="Envía y gestiona tus peticiones HTTP con facilidad." />
            <div className="grid grid-cols-[300px_1fr_1fr] gap-2 p-2 max-md:flex max-md:flex-col">
                <SideBarHistory history={history} setHistory={setHistory} setFormState={setFormState} />
                <div className="flex flex-col gap-2 ">
                    <section className="bg-base-100 shadow-md rounded-sm p-4 space-y-4">
                        <RequestForm onSend={sendRequest} initialValues={formState || undefined} />
                    </section>
                </div>
                <section className="bg-base-100 shadow-md rounded-sm p-4 ">
                    <ResponseViewer response={response} />
                </section>
            </div>
        </div>
    );
}
