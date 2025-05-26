'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { RequestForm } from './components/RequestForm';
import { ResponseViewer } from './components/ResponseViewer';
import { getHistoryFromLocalStorage, saveHistoryToLocalStorage } from '@/lib/storage';
import { useAuth } from '@clerk/nextjs';
import SideBarHistory from './components/SideBarHistory';
import { LayoutSubSection } from '../../componentes/LayoutSubSection';
import Splitter from '@ihatecode/react-splitter';
import { useHistory } from './components/hooks/useHistory';
import { Toaster } from 'react-hot-toast';

export default function HttpClientPage() {
    const { userId } = useAuth();
    const { history, setHistory } = useHistory();
    const [sending, setSending] = useState(false);
    const [response, setResponse] = useState({
        status: 0,
        statusText: '',
        headers: {},
        body: {},
        time: 0,
        size: 0,
    });
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

    const sendRequest = async ({ method, url, headers, body, queryParams }: any) => {
        try {
            setSending(true);
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
                headers: headers,
                body: body,
                time: responseData.time,
                size: responseData.size,
            });
            console.log(headers);
            console.log(body);
            saveHistoryToLocalStorage({
                method,
                url,
                headers: headers,
                body: body,
                response: JSON.stringify(responseData.data),
                created_at: new Date(new Date().getTime() - 150000000),
                id: crypto.randomUUID(),
                userId: userId || '',
                collectionId: null,
            });

            const updatedHistory = [
                ...history,
                {
                    method,
                    url,
                    headers: headers,
                    body: body,
                    response: responseData.data,
                    created_at: new Date(new Date().getTime() - 150000000),
                    id: crypto.randomUUID(),
                    userId: userId || '',
                    collectionId: null,
                },
            ];
            setHistory(updatedHistory);
        } catch (err: any) {
            setResponse({
                status: 0,
                statusText: 'Error de red o JSON inválido',
                headers: {},
                body: { message: err.message },
                time: 0,
                size: 0,
            });
        } finally {
            setSending(false);
        }
    };

    return (
        <LayoutSubSection>
            <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
            <div className="grid grid-cols-[375px_1fr] gap-2 max-md:flex max-md:flex-col h-[calc(100svh-6.4rem)]">
                <SideBarHistory setFormState={setFormState} />

                <Splitter
                    className="overflow-hidden h-full"
                    direction="vertical"
                    splitbar={{ color: '#595959', size: 3 }}
                    items={[
                        {
                            min: 200,
                            content: (
                                <section className="bg-base-100 shadow-md rounded-sm p-2 space-y-4 h-full overflow-y-auto scrollbar-thin border border-base-300">
                                    <RequestForm
                                        onSend={sendRequest}
                                        initialValues={formState || undefined}
                                        sending={sending}
                                    />
                                </section>
                            ),
                        },
                        {
                            min: 275,
                            content: (
                                <section className="shadow-md rounded-sm p-2 h-full overflow-y-auto scrollbar-thin bg-base-100 border border-base-300">
                                    <ResponseViewer response={response} />
                                </section>
                            ),
                        },
                    ]}
                />
            </div>
        </LayoutSubSection>
    );
}
